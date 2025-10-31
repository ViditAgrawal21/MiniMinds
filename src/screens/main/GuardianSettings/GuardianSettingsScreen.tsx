import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "@/components/CustomIcon";
import { t } from "@/i18n/locales/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GuardianSettingsScreenProps {
  navigation?: any;
}

export default function GuardianSettingsScreen({ navigation }: GuardianSettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  React.useEffect(() => {
    loadNotificationSettings();
  }, []);

  const loadNotificationSettings = async () => {
    try {
      const value = await AsyncStorage.getItem("guardianNotifications");
      if (value !== null) {
        setNotificationsEnabled(value === "true");
      }
    } catch (error) {
      console.error("Error loading notification settings:", error);
    }
  };

  const toggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    try {
      await AsyncStorage.setItem("guardianNotifications", value.toString());
    } catch (error) {
      console.error("Error saving notification settings:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <CustomIcon type="IO" name="arrow-back" size={24} color="#2B395E" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>
            {t("guardianSettings.title", "Guardian Settings")}
          </Text>
          <Text style={styles.headerSubtitle}>
            {t(
              "guardianSettings.subtitle",
              "Add Guardian, Edit Guardian, Password"
            )}
          </Text>
        </View>
      </View>

      {/* Guardian Control Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t("guardianSettings.guardianControl", "Guardian Control")}
        </Text>
        <View style={styles.controlCard}>
          <Text style={styles.controlText}>
            {t(
              "guardianSettings.notificationText",
              "Would you like the notifications to be"
            )}
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: "#D1D1D6", true: "#FF9920" }}
            thumbColor={notificationsEnabled ? "#FF8C00" : "#F4F3F4"}
            ios_backgroundColor="#D1D1D6"
          />
        </View>
      </View>

      {/* Guardian Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t("guardianSettings.settings", "Guardian Settings")}
        </Text>
        
        <TouchableOpacity
          style={styles.settingCard}
          onPress={() => navigation.navigate("GuardianList" as never)}
        >
          <View>
            <Text style={styles.settingTitle}>
              {t("guardianSettings.addEditGuardian", "Add / Edit Guardian")}
            </Text>
            <Text style={styles.settingDescription}>
              {t(
                "guardianSettings.editDetails",
                "Edit details of the existing guardian"
              )}
            </Text>
          </View>
          <CustomIcon type="IO" name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2B395E",
    fontFamily: "Poppins-SemiBold",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    fontFamily: "Poppins-Regular",
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2B395E",
    marginBottom: 12,
    fontFamily: "Poppins-SemiBold",
  },
  controlCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  controlText: {
    fontSize: 14,
    color: "#2B395E",
    flex: 1,
    marginRight: 12,
    fontFamily: "Poppins-Regular",
  },
  settingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2B395E",
    marginBottom: 4,
    fontFamily: "Poppins-SemiBold",
  },
  settingDescription: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
});
