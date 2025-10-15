package com.miniminds;

import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.content.Context;
import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import android.content.Intent;
import android.provider.Settings;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

import android.view.*;
import android.widget.TextView;
import android.graphics.PixelFormat;
import com.miniminds.R;

import com.facebook.react.bridge.*;

import java.util.*;

public class UsageStatsModule extends ReactContextBaseJavaModule {
    private static final String TAG = "UsageStatsModule";
    private final ReactApplicationContext context;
    private View overlayView;
    private WindowManager windowManager;

    public UsageStatsModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @Override
    public String getName() {
        return "UsageStats";
    }

    @ReactMethod
    public void openUsageSettings() {
        Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    @ReactMethod
    public void openOverlayPermission() {
        Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
        intent.setData(android.net.Uri.parse("package:" + context.getPackageName()));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    @ReactMethod
    public void getUsageStats(Promise promise) {
        UsageStatsManager usm = (UsageStatsManager)
            context.getSystemService(Context.USAGE_STATS_SERVICE);

        long end = System.currentTimeMillis();
        long start = end - 1000 * 60 * 60 * 24;

        List<UsageStats> stats = usm.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, start, end);
        JSONArray result = new JSONArray();

        if (stats != null) {
            for (UsageStats stat : stats) {
                if (stat.getTotalTimeInForeground() > 0) {
                    try {
                        JSONObject obj = new JSONObject();
                        obj.put("packageName", stat.getPackageName());
                        obj.put("totalTimeInForeground", stat.getTotalTimeInForeground());
                        result.put(obj);
                    } catch (Exception e) {
                        promise.reject("PARSE_ERROR", e);
                        return;
                    }
                }
            }
        }

        promise.resolve(result.toString());
    }

    @ReactMethod
    public void showOverlay() {
        try {
            if (!Settings.canDrawOverlays(context)) {
                Log.e(TAG, "Overlay permission not granted");
                return;
            }

            windowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
            overlayView = LayoutInflater.from(context).inflate(R.layout.overlay_layout, null);

            TextView overlayText = overlayView.findViewById(R.id.overlayText);
            if (overlayText != null) {
                overlayText.setText("Time for a mindful break! You've been using this app for too long.");
            }

            WindowManager.LayoutParams params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.MATCH_PARENT,
                WindowManager.LayoutParams.MATCH_PARENT,
                getOverlayType(),
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE |
                WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL |
                WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
                PixelFormat.TRANSLUCENT
            );

            params.gravity = Gravity.CENTER;

            windowManager.addView(overlayView, params);
            Log.d(TAG, "Overlay shown successfully");
            
        } catch (Exception e) {
            Log.e(TAG, "Error showing overlay", e);
        }
    }

    @ReactMethod
    public void removeOverlay() {
        try {
            if (overlayView != null && windowManager != null) {
                windowManager.removeView(overlayView);
                overlayView = null;
                Log.d(TAG, "Overlay removed successfully");
            }
        } catch (Exception e) {
            Log.e(TAG, "Error removing overlay", e);
        }
    }

    private int getOverlayType() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            return WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY;
        } else {
            return WindowManager.LayoutParams.TYPE_PHONE;
        }
    }

    // New methods for the enhanced usage monitoring system

    // @ReactMethod
    // public void startMonitoring(Promise promise) {
    //     try {
    //         // Check permissions first
    //         if (!UsageMonitorHelper.areAllPermissionsGranted(context)) {
    //             promise.reject("PERMISSION_DENIED", "Required permissions not granted");
    //             return;
    //         }
            
    //         // Start the service
    //         UsageMonitorHelper.startUsageMonitorService(context);
    //         promise.resolve("Monitoring service started successfully");
            
    //     } catch (Exception e) {
    //         Log.e(TAG, "Error starting monitoring", e);
    //         promise.reject("START_ERROR", "Failed to start monitoring service", e);
    //     }
    // }


    @ReactMethod
public void startMonitoring(String packageName, int limitMinutes, Promise promise) {
    try {
        if (!UsageMonitorHelper.areAllPermissionsGranted(context)) {
            promise.reject("PERMISSION_DENIED", "Required permissions not granted");
            return;
        }
        long limitMs = Math.max(1, limitMinutes) * 60L * 1000L;
        UsageMonitorHelper.startUsageMonitorService(context, packageName, limitMs);
        promise.resolve("Monitoring service started");
    } catch (Exception e) {
        promise.reject("START_ERROR", "Failed to start monitoring service", e);
    }
}

    @ReactMethod
    public void stopMonitoring(Promise promise) {
        try {
            UsageMonitorHelper.stopUsageMonitorService(context);
            promise.resolve("Monitoring service stopped successfully");
            
        } catch (Exception e) {
            Log.e(TAG, "Error stopping monitoring", e);
            promise.reject("STOP_ERROR", "Failed to stop monitoring service", e);
        }
    }

    @ReactMethod
    public void checkPermissions(Promise promise) {
        try {
            boolean hasUsageStats = UsageMonitorHelper.hasUsageStatsPermission(context);
            boolean hasOverlay = UsageMonitorHelper.hasOverlayPermission(context);
            
            // Create result object
            String result = "{\"usageStats\":" + hasUsageStats + ",\"overlay\":" + hasOverlay + ",\"allGranted\":" + (hasUsageStats && hasOverlay) + "}";
            promise.resolve(result);
            
        } catch (Exception e) {
            Log.e(TAG, "Error checking permissions", e);
            promise.reject("CHECK_ERROR", "Failed to check permissions", e);
        }
    }

    @ReactMethod
    public void openUsageStatsSettings(Promise promise) {
        try {
            UsageMonitorHelper.openUsageStatsSettings(context);
            promise.resolve("Settings opened");
            
        } catch (Exception e) {
            Log.e(TAG, "Error opening usage stats settings", e);
            promise.reject("SETTINGS_ERROR", "Failed to open usage stats settings", e);
        }
    }

    @ReactMethod
    public void openOverlaySettings(Promise promise) {
        try {
            UsageMonitorHelper.openOverlaySettings(context);
            promise.resolve("Settings opened");
            
        } catch (Exception e) {
            Log.e(TAG, "Error opening overlay settings", e);
            promise.reject("SETTINGS_ERROR", "Failed to open overlay settings", e);
        }
    }

    @ReactMethod
    public void openBatteryOptimizationSettings(Promise promise) {
        try {
            UsageMonitorHelper.openBatteryOptimizationSettings(context);
            promise.resolve("Settings opened");
            
        } catch (Exception e) {
            Log.e(TAG, "Error opening battery optimization settings", e);
            promise.reject("SETTINGS_ERROR", "Failed to open battery optimization settings", e);
        }
    }


    @ReactMethod
public void getInstalledApps(Promise promise) {
    try {
        PackageManager pm = context.getPackageManager();

        Intent mainIntent = new Intent(Intent.ACTION_MAIN, null);
        mainIntent.addCategory(Intent.CATEGORY_LAUNCHER);

        // Get all launchable activities (i.e., user-facing apps)
        java.util.List<ResolveInfo> infos = pm.queryIntentActivities(mainIntent, 0);

        // Build [{ packageName, appName }]
        org.json.JSONArray result = new org.json.JSONArray();

        // Use a set to avoid duplicates if multiple activities map to same package
        java.util.HashSet<String> seen = new java.util.HashSet<>();

        for (ResolveInfo ri : infos) {
            if (ri.activityInfo == null || ri.activityInfo.packageName == null) continue;

            String pkg = ri.activityInfo.packageName;
            if (!seen.add(pkg)) continue;

            CharSequence labelCs = ri.loadLabel(pm);
            String label = (labelCs != null) ? labelCs.toString() : pkg;

            org.json.JSONObject obj = new org.json.JSONObject();
            obj.put("packageName", pkg);
            obj.put("appName", label);
            result.put(obj);
        }

        // Sort A→Z by appName (client could sort too, but this keeps it predictable)
        java.util.List<Object> list = new java.util.ArrayList<>();
        for (int i = 0; i < result.length(); i++) list.add(result.get(i));
        java.util.Collections.sort(list, (a, b) -> {
            org.json.JSONObject ja = (org.json.JSONObject) a;
            org.json.JSONObject jb = (org.json.JSONObject) b;
            String la = ja.optString("appName", ja.optString("packageName"));
            String lb = jb.optString("appName", jb.optString("packageName"));
            return la.compareToIgnoreCase(lb);
        });
        org.json.JSONArray sorted = new org.json.JSONArray();
        for (Object o : list) sorted.put(o);

        promise.resolve(sorted.toString());
    } catch (Exception e) {
        Log.e(TAG, "getInstalledApps failed", e);
        promise.reject("GET_APPS_ERROR", "Failed to list installed apps", e);
    }
}

}
