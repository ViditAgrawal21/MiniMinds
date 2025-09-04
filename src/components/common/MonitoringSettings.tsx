import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UsageMonitorHelper } from '@/services/UsageMonitorHelper';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AppInfo {
  packageName: string;
  appName: string;
}

interface MonitoringApp {
  packageName: string;
  name: string;
  limitMinutes: number;
  isActive: boolean;
}

interface MonitoringSettingsProps {
  onClose: () => void;
}

const MonitoringSettings: React.FC<MonitoringSettingsProps> = ({ onClose }) => {
  const [isMonitoringEnabled, setIsMonitoringEnabled] = useState(false);
  const [monitoredApps, setMonitoredApps] = useState<MonitoringApp[]>([]);
  const [availableApps, setAvailableApps] = useState<AppInfo[]>([]);
  const [permissions, setPermissions] = useState<{
    usageStats: boolean;
    overlay: boolean;
    allGranted: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAppPicker, setShowAppPicker] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);

      // Check permissions
      const perms = await UsageMonitorHelper.checkPermissions();
      setPermissions(perms);

      // Load monitoring status
      const monitoringActive = await AsyncStorage.getItem('monitoringActive');
      setIsMonitoringEnabled(monitoringActive === 'true');

      // Load monitored apps list
      const storedMonitoredApps = await AsyncStorage.getItem('monitoredAppsList');
      if (storedMonitoredApps) {
        setMonitoredApps(JSON.parse(storedMonitoredApps));
      } else {
        // Set default apps if none exist
        const defaultApps: MonitoringApp[] = [
          { packageName: "com.google.android.youtube", name: "YouTube", limitMinutes: 30, isActive: false },
          { packageName: "com.instagram.android", name: "Instagram", limitMinutes: 20, isActive: false },
          { packageName: "com.facebook.katana", name: "Facebook", limitMinutes: 20, isActive: false },
        ];
        setMonitoredApps(defaultApps);
        await AsyncStorage.setItem('monitoredAppsList', JSON.stringify(defaultApps));
      }

      // Load available apps for adding new ones
      if (perms.allGranted) {
        const apps = await UsageMonitorHelper.getInstalledApps();
        setAvailableApps(apps);
      }

    } catch (error) {
      console.error('Error loading monitoring settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMonitoring = async (enabled: boolean) => {
    try {
      if (!permissions?.allGranted) {
        Alert.alert(
          'Permissions Required',
          'Please grant Usage Access and Overlay permissions first.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: openPermissionSettings },
          ]
        );
        return;
      }

      if (enabled) {
        // Start monitoring for active apps
        const activeApps = monitoredApps.filter(app => app.isActive);
        if (activeApps.length === 0) {
          Alert.alert('No Apps Selected', 'Please select at least one app to monitor.');
          return;
        }

        // For now, start monitoring the first active app
        const firstApp = activeApps[0];
        await UsageMonitorHelper.startMonitoring(firstApp.packageName, firstApp.limitMinutes);
        await AsyncStorage.setItem('monitoringActive', 'true');
        setIsMonitoringEnabled(true);
        
        Alert.alert('Success', `Monitoring started for ${firstApp.name}`);
      } else {
        // Stop monitoring
        await UsageMonitorHelper.stopMonitoring();
        await AsyncStorage.setItem('monitoringActive', 'false');
        setIsMonitoringEnabled(false);
        
        Alert.alert('Success', 'Monitoring stopped');
      }
    } catch (error) {
      console.error('Error toggling monitoring:', error);
      Alert.alert('Error', 'Failed to toggle monitoring');
    }
  };

  const openPermissionSettings = async () => {
    try {
      if (!permissions?.usageStats) {
        await UsageMonitorHelper.openUsageStatsSettings();
      } else if (!permissions?.overlay) {
        await UsageMonitorHelper.openOverlaySettings();
      }
    } catch (error) {
      console.error('Error opening permission settings:', error);
    }
  };

  const toggleAppMonitoring = async (appIndex: number) => {
    try {
      const updatedApps = [...monitoredApps];
      updatedApps[appIndex].isActive = !updatedApps[appIndex].isActive;
      
      setMonitoredApps(updatedApps);
      await AsyncStorage.setItem('monitoredAppsList', JSON.stringify(updatedApps));

      // If monitoring is currently enabled, restart with new settings
      if (isMonitoringEnabled) {
        await UsageMonitorHelper.stopMonitoring();
        const activeApps = updatedApps.filter(app => app.isActive);
        if (activeApps.length > 0) {
          const firstApp = activeApps[0];
          await UsageMonitorHelper.startMonitoring(firstApp.packageName, firstApp.limitMinutes);
        }
      }
    } catch (error) {
      console.error('Error toggling app monitoring:', error);
    }
  };

  const updateAppLimit = async (appIndex: number, newLimit: number) => {
    try {
      const updatedApps = [...monitoredApps];
      updatedApps[appIndex].limitMinutes = newLimit;
      
      setMonitoredApps(updatedApps);
      await AsyncStorage.setItem('monitoredAppsList', JSON.stringify(updatedApps));
    } catch (error) {
      console.error('Error updating app limit:', error);
    }
  };

  const addNewApp = (app: AppInfo) => {
    const newApp: MonitoringApp = {
      packageName: app.packageName,
      name: app.appName,
      limitMinutes: 30,
      isActive: false,
    };

    const updatedApps = [...monitoredApps, newApp];
    setMonitoredApps(updatedApps);
    AsyncStorage.setItem('monitoredAppsList', JSON.stringify(updatedApps));
    setShowAppPicker(false);
  };

  const removeApp = async (appIndex: number) => {
    try {
      const updatedApps = monitoredApps.filter((_, index) => index !== appIndex);
      setMonitoredApps(updatedApps);
      await AsyncStorage.setItem('monitoredAppsList', JSON.stringify(updatedApps));
    } catch (error) {
      console.error('Error removing app:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D27AD5" />
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Digital Wellness Monitoring</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Icon name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Permissions Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Permissions Status</Text>
        <View style={styles.permissionRow}>
          <Text style={styles.permissionText}>Usage Access</Text>
          <Icon 
            name={permissions?.usageStats ? "check-circle" : "cancel"} 
            size={20} 
            color={permissions?.usageStats ? "#4CAF50" : "#F44336"} 
          />
        </View>
        <View style={styles.permissionRow}>
          <Text style={styles.permissionText}>Display Over Apps</Text>
          <Icon 
            name={permissions?.overlay ? "check-circle" : "cancel"} 
            size={20} 
            color={permissions?.overlay ? "#4CAF50" : "#F44336"} 
          />
        </View>
        {!permissions?.allGranted && (
          <TouchableOpacity onPress={openPermissionSettings} style={styles.permissionButton}>
            <Text style={styles.permissionButtonText}>Grant Permissions</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Master Switch */}
      <View style={styles.section}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Enable Monitoring</Text>
          <Switch
            value={isMonitoringEnabled}
            onValueChange={toggleMonitoring}
            trackColor={{ false: "#ccc", true: "#D27AD5" }}
            thumbColor={isMonitoringEnabled ? "#fff" : "#fff"}
          />
        </View>
      </View>

      {/* Monitored Apps List */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Monitored Apps</Text>
          <TouchableOpacity onPress={() => setShowAppPicker(true)} style={styles.addButton}>
            <Icon name="add" size={20} color="#D27AD5" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={monitoredApps}
          keyExtractor={(item, index) => `${item.packageName}-${index}`}
          renderItem={({ item, index }) => (
            <View style={styles.appRow}>
              <View style={styles.appInfo}>
                <Text style={styles.appName}>{item.name}</Text>
                <Text style={styles.appLimit}>{item.limitMinutes} minutes limit</Text>
              </View>
              <View style={styles.appControls}>
                <Switch
                  value={item.isActive}
                  onValueChange={() => toggleAppMonitoring(index)}
                  trackColor={{ false: "#ccc", true: "#D27AD5" }}
                  thumbColor="#fff"
                  style={styles.appSwitch}
                />
                <TouchableOpacity onPress={() => removeApp(index)} style={styles.removeButton}>
                  <Icon name="delete" size={18} color="#F44336" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          style={styles.appList}
        />
      </View>

      {/* App Picker Modal */}
      <Modal visible={showAppPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add App to Monitor</Text>
              <TouchableOpacity onPress={() => setShowAppPicker(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={availableApps.filter(app => 
                !monitoredApps.some(monitored => monitored.packageName === app.packageName)
              )}
              keyExtractor={(item) => item.packageName}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => addNewApp(item)} style={styles.appPickerRow}>
                  <Text style={styles.appPickerName}>{item.appName}</Text>
                  <Text style={styles.appPickerPackage}>{item.packageName}</Text>
                </TouchableOpacity>
              )}
              style={styles.appPickerList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addButton: {
    padding: 4,
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  permissionText: {
    fontSize: 14,
    color: '#666',
  },
  permissionButton: {
    backgroundColor: '#D27AD5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  appList: {
    maxHeight: 300,
  },
  appRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  appLimit: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  appControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appSwitch: {
    marginRight: 12,
  },
  removeButton: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  appPickerList: {
    padding: 20,
  },
  appPickerRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  appPickerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  appPickerPackage: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default MonitoringSettings;
