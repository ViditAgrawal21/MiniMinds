package com.thoughtpro;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class UsageMonitorModule extends ReactContextBaseJavaModule {
    private static final String TAG = "UsageMonitorModule";
    private final ReactApplicationContext context;

    public UsageMonitorModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "UsageMonitor";
    }

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
    //         promise.resolve("Service started successfully");
            
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
            promise.resolve("Service stopped successfully");
            
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
}
