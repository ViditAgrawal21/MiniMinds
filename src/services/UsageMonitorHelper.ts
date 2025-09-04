/**
 * React Native Usage Monitor Integration
 * 
 * This file demonstrates how to use the native usage monitoring modules
 * in your React Native app.
 */

import { NativeModules, Platform } from 'react-native';

// Type definitions for our native modules
interface UsageStatsModule {
  openUsageSettings(): void;
  openOverlayPermission(): void;
  getUsageStats(): Promise<string>;
  showOverlay(): void;
  removeOverlay(): void;
  startMonitoring(packageName: string, limitMinutes: number): Promise<string>;
  stopMonitoring(): Promise<string>;
  checkPermissions(): Promise<string>;
  openUsageStatsSettings(): Promise<string>;
  openOverlaySettings(): Promise<string>;
  openBatteryOptimizationSettings(): Promise<string>;
  getInstalledApps(): Promise<string>;
}

interface UsageMonitorModule {
  startMonitoring(packageName: string, limitMinutes: number): Promise<string>;
  stopMonitoring(): Promise<string>;
  checkPermissions(): Promise<string>;
  openUsageStatsSettings(): Promise<string>;
  openOverlaySettings(): Promise<string>;
  openBatteryOptimizationSettings(): Promise<string>;
}

// Get the native modules
const { UsageStats, UsageMonitor } = NativeModules as {
  UsageStats: UsageStatsModule;
  UsageMonitor: UsageMonitorModule;
};

// Usage Monitor Helper Class
export class UsageMonitorHelper {
  
  /**
   * Check if all required permissions are granted
   */
  static async checkPermissions(): Promise<{usageStats: boolean, overlay: boolean, allGranted: boolean}> {
    if (Platform.OS !== 'android') {
      return { usageStats: false, overlay: false, allGranted: false };
    }
    try {
      const result = await UsageStats.checkPermissions();
      return JSON.parse(result);
    } catch (error) {
      console.error('Error checking permissions:', error);
      throw error;
    }
  }

  /**
   * Start monitoring a specific app
   * @param packageName - The package name of the app to monitor (e.g., "com.youtube.android")
   * @param limitMinutes - Time limit in minutes
   */
  static async startMonitoring(packageName: string, limitMinutes: number): Promise<string> {
    if (Platform.OS !== 'android') {
      return Promise.resolve("Not supported on this platform");
    }
    try {
      const result = await UsageMonitor.startMonitoring(packageName, limitMinutes);
      return result;
    } catch (error) {
      console.error('Error starting monitoring:', error);
      throw error;
    }
  }

  /**
   * Stop monitoring
   */
  static async stopMonitoring(): Promise<string> {
    if (Platform.OS !== 'android') {
      return Promise.resolve("Not supported on this platform");
    }
    try {
      const result = await UsageMonitor.stopMonitoring();
      return result;
    } catch (error) {
      console.error('Error stopping monitoring:', error);
      throw error;
    }
  }

  /**
   * Get usage statistics for all apps
   */
  static async getUsageStats(): Promise<Array<{packageName: string, totalTimeInForeground: number}>> {
    if (Platform.OS !== 'android') {
      return Promise.resolve([]);
    }
    try {
      const result = await UsageStats.getUsageStats();
      return JSON.parse(result);
    } catch (error) {
      console.error('Error getting usage stats:', error);
      throw error;
    }
  }

  /**
   * Get list of all installed apps
   */
  static async getInstalledApps(): Promise<Array<{packageName: string, appName: string}>> {
    if (Platform.OS !== 'android') {
      return Promise.resolve([]);
    }
    try {
      const result = await UsageStats.getInstalledApps();
      return JSON.parse(result);
    } catch (error) {
      console.error('Error getting installed apps:', error);
      throw error;
    }
  }

  /**
   * Open device settings for usage stats permission
   */
  static async openUsageStatsSettings(): Promise<void> {
    if (Platform.OS !== 'android') {
      return Promise.resolve();
    }
    try {
      await UsageStats.openUsageStatsSettings();
    } catch (error) {
      console.error('Error opening usage stats settings:', error);
      throw error;
    }
  }

  /**
   * Open device settings for overlay permission
   */
  static async openOverlaySettings(): Promise<void> {
    if (Platform.OS !== 'android') {
      return Promise.resolve();
    }
    try {
      await UsageStats.openOverlaySettings();
    } catch (error) {
      console.error('Error opening overlay settings:', error);
      throw error;
    }
  }

  /**
   * Open battery optimization settings
   */
  static async openBatteryOptimizationSettings(): Promise<void> {
    if (Platform.OS !== 'android') {
      return Promise.resolve();
    }
    try {
      await UsageStats.openBatteryOptimizationSettings();
    } catch (error) {
      console.error('Error opening battery optimization settings:', error);
      throw error;
    }
  }

  /**
   * Show overlay manually (for testing)
   */
  static showOverlay(): void {
    if (Platform.OS !== 'android') {
      return;
    }
    UsageStats.showOverlay();
  }

  /**
   * Remove overlay manually
   */
  static removeOverlay(): void {
    if (Platform.OS !== 'android') {
      return;
    }
    UsageStats.removeOverlay();
  }
}

// Example usage component
export const UsageMonitorExample = () => {
  
  const checkAndRequestPermissions = async () => {
    try {
      const permissions = await UsageMonitorHelper.checkPermissions();
      
      if (!permissions.usageStats) {
        console.log('Usage stats permission not granted');
        await UsageMonitorHelper.openUsageStatsSettings();
      }
      
      if (!permissions.overlay) {
        console.log('Overlay permission not granted');
        await UsageMonitorHelper.openOverlaySettings();
      }
      
      return permissions.allGranted;
    } catch (error) {
      console.error('Error checking permissions:', error);
      return false;
    }
  };

  const startYouTubeMonitoring = async () => {
    try {
      const hasPermissions = await checkAndRequestPermissions();
      
      if (hasPermissions) {
        // Monitor YouTube for 2 minutes
        await UsageMonitorHelper.startMonitoring('com.google.android.youtube', 2);
        console.log('Started monitoring YouTube');
      } else {
        console.log('Permissions not granted');
      }
    } catch (error) {
      console.error('Error starting YouTube monitoring:', error);
    }
  };

  const getAppUsage = async () => {
    try {
      const stats = await UsageMonitorHelper.getUsageStats();
      console.log('Usage stats:', stats);
    } catch (error) {
      console.error('Error getting usage stats:', error);
    }
  };

  const listInstalledApps = async () => {
    try {
      const apps = await UsageMonitorHelper.getInstalledApps();
      console.log('Installed apps:', apps);
    } catch (error) {
      console.error('Error getting installed apps:', error);
    }
  };

  return null; // This is just an example helper, no UI needed
};

export default UsageMonitorHelper;
