
package com.miniminds;

import android.app.Service;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.usage.UsageStats;
import android.app.usage.UsageEvents;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.miniminds.OverlayService;
import com.miniminds.MainActivity;

public class UsageMonitorService extends Service {
    private static final String TAG = "UsageMonitorService";
    private static final String CHANNEL_ID = "UsageMonitorChannel";
    private static final int NOTIFICATION_ID = 1001;
     public static final String EXTRA_TARGET_PACKAGE = "EXTRA_TARGET_PACKAGE";
    public static final String EXTRA_LIMIT_MS = "EXTRA_LIMIT_MS";


    
    private  String TARGET_PACKAGE;
    private  long USAGE_LIMIT_MS = 2 * 60 * 1000; // 2 minutes
    private final long POLL_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes
    
    private HandlerThread handlerThread;
    private Handler backgroundHandler;
    private Handler mainHandler;
    private long startTime = 0;
    private boolean overlayShown = false;
    private boolean isMonitoring = false;
    private UsageStatsManager usageStatsManager;
    
    
    // Track app usage sessions
    private ConcurrentHashMap<String, Long> appSessionStartTimes = new ConcurrentHashMap<>();

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "Service created");
        
        // Initialize background thread for usage monitoring
        handlerThread = new HandlerThread("UsageMonitorThread");
        handlerThread.start();
        backgroundHandler = new Handler(handlerThread.getLooper());
        mainHandler = new Handler(Looper.getMainLooper());
        
        usageStatsManager = (UsageStatsManager) getSystemService(USAGE_STATS_SERVICE);
        
        createNotificationChannel();
    }


    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(TAG, "in Service");
        if (intent != null) {
            String fromJs = intent.getStringExtra(EXTRA_TARGET_PACKAGE);
            if (fromJs != null && !fromJs.isEmpty()) {
                TARGET_PACKAGE = fromJs;
            }

            if (intent.hasExtra(EXTRA_LIMIT_MS)) {
                USAGE_LIMIT_MS = intent.getLongExtra(EXTRA_LIMIT_MS, USAGE_LIMIT_MS);
            }
        }

        startForeground(NOTIFICATION_ID, createForegroundNotification());

        if (!isMonitoring) {
            isMonitoring = true;
            backgroundHandler.post(pollForegroundApp);
        }
        return START_STICKY;
    }

    

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "App Usage Monitoring",
                NotificationManager.IMPORTANCE_LOW
            );
            channel.setDescription("Monitors app usage for wellness tracking");
            channel.setShowBadge(false);
            
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    private Notification createForegroundNotification() {
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this, 0, notificationIntent, 
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        return new NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("ThoughtHealer Active")
            .setContentText("Monitoring app usage for your wellness")
            .setSmallIcon(android.R.drawable.ic_menu_compass) // You can replace with your app icon
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setCategory(NotificationCompat.CATEGORY_SERVICE)
            .build();
    }

    private Runnable pollForegroundApp = new Runnable() {
        @Override
        public void run() {
            try {
                if (!isMonitoring) return;
                
                String currentApp = getCurrentForegroundApp();
                Log.d(TAG, "Current foreground app: " + currentApp);
                
                if (TARGET_PACKAGE.equals(currentApp)) {
                    handleTargetAppUsage();
                } else {
                    handleNonTargetApp();
                }
                
                // Schedule next check
                if (isMonitoring) {
                    backgroundHandler.postDelayed(this, POLL_INTERVAL_MS);
                }
                
            } catch (Exception e) {
                Log.e(TAG, "Error in polling foreground app", e);
                // Continue monitoring even if there's an error
                if (isMonitoring) {
                    backgroundHandler.postDelayed(this, POLL_INTERVAL_MS);
                }
            }
        }
    };
    
    private String getCurrentForegroundApp() {
        long time = System.currentTimeMillis();
        
        // Try using UsageEvents first (more accurate for recent API levels)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
            UsageEvents usageEvents = usageStatsManager.queryEvents(time - 10000, time);
            UsageEvents.Event event = new UsageEvents.Event();
            String lastForegroundApp = null;
            
            while (usageEvents.hasNextEvent()) {
                usageEvents.getNextEvent(event);
                if (event.getEventType() == UsageEvents.Event.MOVE_TO_FOREGROUND) {
                    lastForegroundApp = event.getPackageName();
                }
            }
            
            if (lastForegroundApp != null) {
                return lastForegroundApp;
            }
        }
        
        // Fallback to UsageStats
        List<UsageStats> stats = usageStatsManager.queryUsageStats(
            UsageStatsManager.INTERVAL_DAILY, time - 10000, time
        );
        
        if (stats != null && !stats.isEmpty()) {
            UsageStats recentStat = Collections.max(stats, 
                Comparator.comparingLong(UsageStats::getLastTimeUsed));
            return recentStat.getPackageName();
        }
        
        return null;
    }
    
    private void handleTargetAppUsage() {
        if (startTime == 0) {
            startTime = System.currentTimeMillis();
            Log.d(TAG, "Started tracking usage");
        }
        
        long elapsed = System.currentTimeMillis() - startTime;
        Log.d(TAG, "usage time: " + (elapsed / 1000) + " seconds");
        
        if (elapsed >= USAGE_LIMIT_MS && !overlayShown) {
            Log.d(TAG, "Usage limit reached, showing overlay");
            overlayShown = true;
            
            // Show overlay on main thread
            mainHandler.post(() -> {
                Intent overlayIntent = new Intent(getApplicationContext(), OverlayService.class);
                startService(overlayIntent);
            });
        }
    }
    
    private void handleNonTargetApp() {
        if (startTime != 0) {
            Log.d(TAG, "User switched away from, resetting timer");
        }
        
    }

    @Override
    public void onDestroy() {
        Log.d(TAG, "Service destroyed");
        isMonitoring = false;
        
        if (backgroundHandler != null) {
            backgroundHandler.removeCallbacks(pollForegroundApp);
        }
        
        if (handlerThread != null) {
            handlerThread.quitSafely();
            try {
                handlerThread.join();
            } catch (InterruptedException e) {
                Log.e(TAG, "Error joining handler thread", e);
            }
        }
        
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
    
    @Override
    public void onTaskRemoved(Intent rootIntent) {
        Log.d(TAG, "Task removed, restarting service");
        // Restart the service when app is swiped away
        Intent restartServiceIntent = new Intent(getApplicationContext(), this.getClass());
        PendingIntent restartPendingIntent = PendingIntent.getService(
            getApplicationContext(), 1, restartServiceIntent, 
            PendingIntent.FLAG_ONE_SHOT | PendingIntent.FLAG_IMMUTABLE
        );
        
        // Schedule restart after a short delay
        mainHandler.postDelayed(() -> {
            try {
                restartPendingIntent.send();
            } catch (PendingIntent.CanceledException e) {
                Log.e(TAG, "Failed to restart service", e);
            }
        }, 1000);
        
        super.onTaskRemoved(rootIntent);
    }
}
