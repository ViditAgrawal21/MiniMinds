
// OverlayService.java
package com.thoughtpro;

import android.app.Service;
import android.content.Context;
import android.content.Intent;

import android.graphics.PixelFormat;
import android.os.Build;
import android.os.IBinder;
import android.os.Handler;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.provider.Settings;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;
import android.view.*;
import android.widget.TextView;
import android.widget.Button;

import java.util.List;

import android.graphics.PixelFormat;

import com.facebook.react.bridge.*;

import java.util.*;

public class OverlayService extends Service {
    private static final String TAG = "OverlayService";
    private WindowManager windowManager;
    private View overlayView;
    private Handler autoHideHandler;
    private static final long AUTO_HIDE_DELAY = 10000; // 10 seconds

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(TAG, "OverlayService started");
        showOverlay();
        return START_NOT_STICKY;
    }

    public void showOverlay() {
        // Check if overlay permission is granted
        if (!Settings.canDrawOverlays(this)) {
            Log.e(TAG, "Overlay permission not granted");
            stopSelf();
            return;
        }

        try {
            windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
            overlayView = LayoutInflater.from(this).inflate(R.layout.overlay_layout, null);

            // Set up overlay text
            TextView overlayText = overlayView.findViewById(R.id.overlayText);
            if (overlayText != null) {
                overlayText.setText("Time for a mindful break! You've been using YouTube for 2 minutes.");
            }

            // Set up close button if it exists
            setupCloseButton();

            // Configure window parameters
            WindowManager.LayoutParams params = createWindowParams();

            // Add overlay to window manager
            windowManager.addView(overlayView, params);
            Log.d(TAG, "Overlay view added successfully");

            // Set up auto-hide timer
            setupAutoHide();

        } catch (Exception e) {
            Log.e(TAG, "Error showing overlay", e);
            stopSelf();
        }
    }

    private WindowManager.LayoutParams createWindowParams() {
        WindowManager.LayoutParams params = new WindowManager.LayoutParams(
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.MATCH_PARENT,
            getOverlayType(),
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE |
            WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL |
            WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
            PixelFormat.TRANSLUCENT
        );

        // Set position
        params.gravity = Gravity.CENTER;
        
        return params;
    }

    private int getOverlayType() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            return WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY;
        } else {
            return WindowManager.LayoutParams.TYPE_PHONE;
        }
    }

    private void setupCloseButton() {
        // Set up close button
        Button closeButton = overlayView.findViewById(R.id.closeButton);
        if (closeButton != null) {
            closeButton.setOnClickListener(v -> hideOverlay());
        }

        // Set up mindful break button
        Button mindfulBreakButton = overlayView.findViewById(R.id.mindfulBreakButton);
        if (mindfulBreakButton != null) {
            mindfulBreakButton.setOnClickListener(v -> {
                // You can add logic here to open a mindfulness activity
                // For now, we'll just hide the overlay
                Log.d(TAG, "User chose to take a mindful break");
                hideOverlay();
            });
        }

        // Also make the overlay background clickable to dismiss
        overlayView.setOnClickListener(v -> hideOverlay());
    }

    private void setupAutoHide() {
        if (autoHideHandler == null) {
            autoHideHandler = new Handler(Looper.getMainLooper());
        }

        // Auto-hide overlay after specified delay
        autoHideHandler.postDelayed(() -> {
            Log.d(TAG, "Auto-hiding overlay after timeout");
            hideOverlay();
        }, AUTO_HIDE_DELAY);
    }

    private void hideOverlay() {
        try {
            if (overlayView != null && windowManager != null) {
                windowManager.removeView(overlayView);
                overlayView = null;
                Log.d(TAG, "Overlay hidden");
            }
        } catch (Exception e) {
            Log.e(TAG, "Error hiding overlay", e);
        } finally {
            stopSelf();
        }
    }

    @Override
    public void onDestroy() {
        Log.d(TAG, "OverlayService destroyed");
        
        if (autoHideHandler != null) {
            autoHideHandler.removeCallbacksAndMessages(null);
        }
        
        try {
            if (overlayView != null && windowManager != null) {
                windowManager.removeView(overlayView);
                overlayView = null;
            }
        } catch (Exception e) {
            Log.e(TAG, "Error removing overlay in onDestroy", e);
        }
        
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
