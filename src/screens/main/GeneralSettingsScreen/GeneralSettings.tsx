import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomIcon from "@Components/CustomIcon";
import { logout } from "../../../redux/Slices/authSlice";
import { AuthService } from "../../../services/authService";
import GoogleAuthNative from "../../../services/googleAuthNative";
import { clearAllData } from "../../../utils/storageUtils";
import { t } from "../../../i18n/locales/i18n";

export default function GeneralSettings() {
  const [notifications, setNotifications] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const [toastVisible, setToastVisible] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastType, setToastType] = React.useState<'success' | 'error' | 'info'>('info');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const handleLogoutPress = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false);
    
    try {
      // Clear all authentication data
      await AuthService.clearAuth();
      
      // Clear Google auth data
      try {
        await GoogleAuthNative.signOut();
      } catch (googleError) {
        console.log("Google sign out error (might not be signed in):", googleError);
      }

      // Clear specific app data keys
      const keysToRemove = [
        // Authentication keys
        'auth_token',
        'user_data',
        'user_email',
        'auth_method',
        'is_authenticated',
        
        // Onboarding and profile data
        'onboardingResponses',
        'profile_v1',
        'hasCompletedOnboarding',
        'hasCompletedSelfAssessment',
        'hasCompletedFirstLaunch',
        'selectedLanguage',
        'hasSelectedLanguage',
        'isLoggedIn',
        
        // Language settings
        'language',
        
        // Any temporary passwords or OTP tracking
      ];

      // Get all keys first to find any dynamic keys like OTP requests
      const allKeys = await AsyncStorage.getAllKeys();
      const dynamicKeysToRemove = allKeys.filter(key => 
        key.startsWith('reg_pw:') || 
        key.startsWith('last_otp_request_') ||
        key.startsWith('temp_')
      );

      // Combine all keys to remove
      const allKeysToRemove = [...keysToRemove, ...dynamicKeysToRemove];

      // Remove specific keys
      await AsyncStorage.multiRemove(allKeysToRemove);

      // Clear all remaining AsyncStorage data as a fallback
      await clearAllData();

      // Clear Redux state
      dispatch(logout());

      // Show success toast
      showToast(t("generalSettings.logoutSuccess", "You have been logged out successfully."), "success");

      // Reset navigation stack and go to login after a short delay
      setTimeout(() => {
        (navigation as any).reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }, 2000);

    } catch (error) {
      console.error("Logout error:", error);
      showToast(t("generalSettings.logoutError", "Failed to logout completely. Please try again."), "error");
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CustomIcon type="MI" name="arrow-back" size={24} color={"#000000"}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>{t('generalSettings.notifications')}</Text>
      <View style={styles.settingRow}>
        <Text style={styles.settingRowText}>{t('generalSettings.notificationToggle')}</Text>
        <Switch
          value={notifications}
          onValueChange={(value) => setNotifications(value)}
        />
      </View>

      <Text style={styles.sectionTitle}>{t('generalSettings.accountSettings')}</Text>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>{t('generalSettings.deleteAccount')}</Text>
        <Text style={styles.optionSubText}>{t('generalSettings.deleteAccountSubText')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>{t('generalSettings.deactivateAccount')}</Text>
        <Text style={styles.optionSubText}>
          {t('generalSettings.deactivateAccountSubText')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogoutPress} style={styles.option}>
        <Text style={styles.optionText}>{t('generalSettings.logOut')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
      <Text style={styles.sectionTitle}>{t('generalSettings.support')}</Text>
      <Text style={styles.optionSubText}>{t('generalSettings.help')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    marginTop: 10,
    marginBottom: 5,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: -15,
    borderBottomWidth: 1,
    borderBottomColor: "#908A9421",
  },
  settingRowText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000000",
  },
  option: {
    paddingVertical: 15,
    marginTop: -12,
    borderBottomWidth: 1,
    borderBottomColor: "#908A9421",
  },
  optionText: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  },
  optionSubText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#666",
    marginTop: -5,
  },
});
