import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, View, Alert, NativeModules, Platform, FlatList, Pressable } from 'react-native';

const { UsageStats } = NativeModules;

interface AppUsageData {
  packageName: string;
  totalTimeInForeground: number;
}

interface PermissionsStatus {
  usageStats: boolean;
  overlay: boolean;
  allGranted: boolean;
}

export const startMonitor = async (targetPackage: string) => {
  try {
    const lm = Math.max(1, parseInt(String(1), 10) || 1)
    const result = await UsageStats.startMonitoring(targetPackage,lm);
    Alert.alert('Success', result);
    return { success: true, message: result };
  } catch (error: any) {
    Alert.alert('Error', error?.message || 'Unknown error');
    return { success: false, error: error?.message || 'Unknown error' };
  }
};

export const stopMonitor = async () => {
  try {
    const result = await UsageStats.stopMonitoring();
    Alert.alert('Success', result);
    return { success: true, message: result };
  } catch (error: any) {
    Alert.alert('Error', error?.message || 'Unknown error');
    return { success: false, error: error?.message || 'Unknown error' };
  }
};

export const checkPermissions = async () => {
  try {
    const result = await UsageStats.checkPermissions();
    const permissions = JSON.parse(result);
    return { success: true, permissions };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Unknown error' };
  }
};


export const getAppList = async () => {
  if (Platform.OS !== "android") return;
    try {
      const list = await UsageStats.getInstalledApps();
      return list
    } catch (e: any) {
      console.warn("getInstalledApps failed:", e?.message);

    }
};

export const requestUsagePermission = () => UsageStats.openUsageStatsSettings();
export const requestOverlayPermission = () => UsageStats.openOverlaySettings();
export const requestBatteryOptimization = () => UsageStats.openBatteryOptimizationSettings();

export const fetchUsageStats = async (): Promise<AppUsageData[]> => {
  try {
    const data = await UsageStats.getUsageStats();
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching usage stats:', error);
    return [];
  }
};

export const showOverlay = () => UsageStats.showOverlay();
export const removeOverlay = () => UsageStats.removeOverlay();

interface AppInfo {
  packageName: string;
  appName: string;
}

const MentalHealthAssessment: React.FC = () => {
  const [apps, setApps] = useState<AppUsageData[]>([]);
  const [permissions, setPermissions] = useState<PermissionsStatus | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [selected, setSelected] = useState<AppInfo | null>(null);

  const loadStats = async () => {
    const data = await fetchUsageStats();
    setApps(data);
  };

  const checkPermissionStatus = async () => {
    const result = await checkPermissions();
    if (result.success) {
      setPermissions(result.permissions);
    }
  };

  const handleStartMonitoring = async () => {
    if(selected && selected.packageName) {
      const result = await startMonitor(selected.packageName);
      if (result.success) {
        setIsMonitoring(true);
      }
    } else {
      Alert.alert(
        'App not selected',
        'Please select an app to monitor',
        [
          { text: 'Cancel', style: 'cancel' },        
        ]
      );
    }

  };

  const handleStopMonitoring = async () => {
    const result = await stopMonitor();
    if (result.success) {
      setIsMonitoring(false);
    }
  };

  const requestAllPermissions = async () => {
    await checkPermissionStatus();
    
    if (!permissions?.usageStats) {
      Alert.alert(
        'Usage Stats Permission Required',
        'Please grant usage stats permission for YouTube monitoring to work.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: requestUsagePermission }
        ]
      );
      return;
    }
    
    if (!permissions?.overlay) {
      Alert.alert(
        'Overlay Permission Required',
        'Please grant overlay permission to show mindful break notifications.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: requestOverlayPermission }
        ]
      );
      return;
    }

    Alert.alert('Success', 'All permissions are granted! You can now start monitoring.');
  };


  const [appList, setAppList] = useState<AppInfo[]>([])

  const getApps = async () => {
    try {
      const list = await getAppList()
      setAppList(JSON.parse(list)) 
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    checkPermissionStatus();
    getApps()
    
    return () => {
      removeOverlay();
    };
  }, []);

  console.log('appList',appList)

  return (
    <ScrollView style={{ padding: 20, backgroundColor:"#111827" }}>
      <Text style={{  color:'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
       Usage Monitor
      </Text>

      {/* Permissions Section */}
      <View style={{ backgroundColor: '#111827', padding: 15, borderRadius: 10, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color:'white' }}>Permissions Status</Text>
        
        {permissions && (
          <View style={{ backgroundColor:"#111827" }}>
            <Text style={{ color: permissions.usageStats ? 'green' : 'red', marginBottom: 5 }}>
              ✓ Usage Stats: {permissions.usageStats ? 'Granted' : 'Not Granted'}
            </Text>
            <Text style={{ color: permissions.overlay ? 'green' : 'red', marginBottom: 10 }}>
              ✓ Overlay: {permissions.overlay ? 'Granted' : 'Not Granted'}
            </Text>
          </View>
        )}
        
        <Button 
          title={permissions?.allGranted ? "Refresh Permissions" : "Grant All Permissions"} 
          onPress={requestAllPermissions} 
        />
      </View>

      {/* Individual Permission Buttons */}
      <View style={{ marginBottom: 20, backgroundColor:"#111827"  }}>
        <Button title="Grant Usage Stats Permission" onPress={requestUsagePermission} />
        <View style={{ height: 10 }} />
        <Button title="Grant Overlay Permission" onPress={requestOverlayPermission} />
        <View style={{ height: 10 }} />
        <Button title="Battery Optimization Settings" onPress={requestBatteryOptimization} />
      </View>

      {/* Monitoring Control */}
      <View style={{ backgroundColor:"#111827" , padding: 15, borderRadius: 10, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color:'white' }}>
         {selected ? selected.appName : "App"} Monitoring Control
        </Text>
        
        <Text style={{ marginBottom: 10, color: isMonitoring ? 'green' : 'orange' }}>
          Status: {isMonitoring ? 'Monitoring Active' : 'Monitoring Stopped'}
        </Text>
        
        {permissions?.allGranted ? (
          <>
            <Button 
              title={isMonitoring ? "Stop Monitoring" : "Start Monitoring"} 
              onPress={isMonitoring ? handleStopMonitoring : handleStartMonitoring}
              color={isMonitoring ? 'red' : 'green'}
            />
            <Text style={{ fontSize: 12, color: 'gray', marginTop: 10 }}>
              {isMonitoring 
                ? 'Service is running in background. It will show overlay when YouTube is used for 2 minutes.'
                : 'Start monitoring to track YouTube usage and show mindful break reminders.'
              }
            </Text>
          </>
        ) : (
          <Text style={{ color: 'red', textAlign: 'center' }}>
            Please grant all permissions before starting monitoring
          </Text>
        )}
      </View>

      {/* Test Overlay */}
      <View style={{ marginBottom: 20, backgroundColor:"#111827"  }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color:'white' }}>Test Overlay</Text>
        <Button title="Show Test Overlay" onPress={showOverlay} />
        <View style={{ height: 10 }} />
        <Button title="Remove Overlay" onPress={removeOverlay} />
      </View>

      {/* Usage Stats */}
      <View style={{ marginBottom: 20, backgroundColor:"#111827"  }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color:'white' }}>App Usage Stats</Text>
        <Button title="Load Usage Stats" onPress={loadStats} />
      </View>


      {appList && appList.length > 0 ? (
        <View style={{ backgroundColor:"#111827" , padding: 15, borderRadius: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color:'white' }}>
            Apps:
          </Text>
          {appList && Array.isArray(appList) && appList.length && appList.map((item, index) => {
            console.log(item)
            return (
              <Pressable
              key={item.packageName}
              onPress={() => setSelected(item)}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 12,
                borderRadius: 10,
                marginBottom: 8,
                backgroundColor:
                  selected?.packageName === item.packageName
                    ? "#0ea5e9"
                    : "#111827",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                {item.appName || item.packageName.split(".").pop()}
              </Text>
              <Text style={{ color: "#9ca3af", marginTop: 4 }}>
                {item.packageName}
              </Text>
            </Pressable>
          )})}

          </View> ):
          null}

      {apps.length > 0 && (
        <View style={{ backgroundColor:"#111827" , padding: 15, borderRadius: 10 }}>
          <Text style={{color:'white', fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
            Today's App Usage:
          </Text>
          {apps.slice(0, 10).map((item, index) => (
            <Text key={index} style={{ marginTop: 8, fontSize: 14, color:'white' }}>
              {item.packageName.split('.').pop()} — {(item.totalTimeInForeground / 60000).toFixed(1)} mins
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default MentalHealthAssessment;
