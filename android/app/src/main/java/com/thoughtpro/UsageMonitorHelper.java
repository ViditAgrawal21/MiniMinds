package com.thoughtpro;

import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;

import java.util.List;

public class UsageMonitorHelper {
    private static final String TAG = "UsageMonitorHelper";
 public static final String EXTRA_TARGET_PACKAGE = "EXTRA_TARGET_PACKAGE";
    public static final String EXTRA_LIMIT_MS = "EXTRA_LIMIT_MS";


    /**
     * Check if the app has usage stats permission
     */
    public static boolean hasUsageStatsPermission(Context context) {
        try {
            UsageStatsManager usageStatsManager = (UsageStatsManager) context.getSystemService(Context.USAGE_STATS_SERVICE);
            long time = System.currentTimeMillis();
            // Try to query usage stats - if we get null or empty list, we likely don't have permission
            List stats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, time - 1000 * 10, time);
            return stats != null && !stats.isEmpty();
        } catch (Exception e) {
            Log.e(TAG, "Error checking usage stats permission", e);
            return false;
        }
    }

    /**
     * Check if the app has overlay permission
     */
    public static boolean hasOverlayPermission(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return Settings.canDrawOverlays(context);
        }
        return true; // Pre-M versions don't need this permission
    }

    /**
     * Open usage stats settings page
     */
    public static void openUsageStatsSettings(Context context) {
        try {
            Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
        } catch (Exception e) {
            Log.e(TAG, "Error opening usage stats settings", e);
        }
    }

    /**
     * Open overlay permission settings page
     */
    public static void openOverlaySettings(Context context) {
        try {
            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
            intent.setData(Uri.parse("package:" + context.getPackageName()));
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
        } catch (Exception e) {
            Log.e(TAG, "Error opening overlay settings", e);
        }
    }

    /**
     * Open battery optimization settings to request ignore battery optimization
     */
    public static void openBatteryOptimizationSettings(Context context) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                intent.setData(Uri.parse("package:" + context.getPackageName()));
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(intent);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error opening battery optimization settings", e);
        }
    }

    /**
     * Start the usage monitor service
     */
    // public static void startUsageMonitorService(Context context) {
    //     try {
    //         Intent serviceIntent = new Intent(context, UsageMonitorService.class);
    //         if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    //             context.startForegroundService(serviceIntent);
    //         } else {
    //             context.startService(serviceIntent);
    //         }
    //         Log.d(TAG, "Usage monitor service started");
    //     } catch (Exception e) {
    //         Log.e(TAG, "Error starting usage monitor service", e);
    //     }
    // }

   public static void startUsageMonitorService(Context context, String targetPackage, long limitMs) {
            Intent serviceIntent = new Intent(context, UsageMonitorService.class);
            serviceIntent.putExtra(EXTRA_TARGET_PACKAGE, targetPackage);
            serviceIntent.putExtra(EXTRA_LIMIT_MS, limitMs);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(serviceIntent);

            } else {
                context.startService(serviceIntent);
            }
             Log.d(TAG, "Usage monitor service started");
        }

    /**
     * Stop the usage monitor service
     */
    public static void stopUsageMonitorService(Context context) {
        try {
            Intent serviceIntent = new Intent(context, UsageMonitorService.class);
            context.stopService(serviceIntent);
            Log.d(TAG, "Usage monitor service stopped");
        } catch (Exception e) {
            Log.e(TAG, "Error stopping usage monitor service", e);
        }
    }

    /**
     * Check if all required permissions are granted
     */
    public static boolean areAllPermissionsGranted(Context context) {
        return hasUsageStatsPermission(context) && hasOverlayPermission(context);
    }
}
