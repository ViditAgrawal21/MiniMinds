import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Modal, Alert } from "react-native";
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

  // Auto-hide toast after 3 seconds
  React.useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

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

  const handleDeleteAccount = () => {
    Alert.alert(
      t('generalSettings.deleteAccount'),
      t('generalSettings.deleteAccountConfirmation', 'Are you sure you want to permanently delete your account? This action cannot be undone.'),
      [
        {
          text: t('common.cancel', 'Cancel'),
          style: 'cancel',
        },
        {
          text: t('generalSettings.deleteAccount'),
          style: 'destructive',
          onPress: () => showAccountDeletionInfo(),
        },
      ]
    );
  };

  const handleDeactivateAccount = () => {
    Alert.alert(
      t('generalSettings.deactivateAccount'),
      t('generalSettings.deactivateAccountConfirmation', 'Are you sure you want to deactivate your account? You can reactivate it later by logging in.'),
      [
        {
          text: t('common.cancel', 'Cancel'),
          style: 'cancel',
        },
        {
          text: t('generalSettings.deactivateAccount'),
          style: 'destructive',
          onPress: () => performAccountDeactivation(),
        },
      ]
    );
  };

  const showAccountDeletionInfo = () => {
    Alert.alert(
      t('generalSettings.accountDeletionInfo', 'Account Deletion Process'),
      t('generalSettings.accountDeletionMessage', 'To permanently delete your account and all associated data, please email syneptlabs@gmail.com with your account details. We will verify your identity and process the deletion within 7 business days.'),
      [
        {
          text: t('common.ok', 'OK'),
          style: 'default',
        },
      ]
    );
  };

  const performAccountDeactivation = async () => {
    try {
      // Clear all data for deactivation (similar to logout but mark as deactivated)
      await AuthService.clearAuth();
      
      // Clear Google auth data
      try {
        await GoogleAuthNative.signOut();
      } catch (googleError) {
        console.log("Google sign out error (might not be signed in):", googleError);
      }

      // Clear all app data
      const keysToRemove = [
        'auth_token', 'user_data', 'user_email', 'auth_method', 'is_authenticated',
        'onboardingResponses', 'profile_v1', 'hasCompletedOnboarding', 
        'hasCompletedSelfAssessment', 'hasCompletedFirstLaunch', 'selectedLanguage', 
        'hasSelectedLanguage', 'isLoggedIn', 'language'
      ];

      await AsyncStorage.multiRemove(keysToRemove);
      await clearAllData();
      dispatch(logout());

      showToast(t("generalSettings.accountDeactivated", "Account deactivated successfully."), "success");

      // Navigate to login after a short delay
      setTimeout(() => {
        (navigation as any).reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }, 2000);

    } catch (error) {
      console.error("Account deactivation error:", error);
      showToast(t("generalSettings.deactivationError", "Failed to deactivate account. Please try again."), "error");
    }
  };

  const handleContactSupport = () => {
    Alert.alert(
      t('generalSettings.contactSupport', 'Contact Support'),
      t('generalSettings.contactSupportMessage', 'For support and assistance, please email us at syneptlabs@gmail.com or contact us through our website.'),
      [
        {
          text: t('common.ok', 'OK'),
          style: 'default',
        },
      ]
    );
  };

  const handleViewPrivacyPolicy = () => {
    Alert.alert(
      t('generalSettings.privacyPolicy', 'Privacy Policy'),
      t('generalSettings.privacyPolicyMessage', 'Our privacy policy can be found in the app documentation or by visiting our website. We prioritize your data privacy and security.'),
      [
        {
          text: t('common.ok', 'OK'),
          style: 'default',
        },
      ]
    );
  };

  const handleViewTerms = () => {
    Alert.alert(
      t('generalSettings.termsOfService', 'Terms of Service'),
      t('generalSettings.termsOfServiceMessage', 'Our terms of service can be found in the app documentation or by visiting our website. Please review them for important information about app usage.'),
      [
        {
          text: t('common.ok', 'OK'),
          style: 'default',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CustomIcon type="MI" name="arrow-back" size={24} color={"#000000"}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('generalSettings.heading', 'General Settings')}</Text>
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
      <TouchableOpacity onPress={handleDeleteAccount} style={styles.option}>
        <Text style={styles.optionText}>{t('generalSettings.deleteAccount')}</Text>
        <Text style={styles.optionSubText}>{t('generalSettings.deleteAccountSubText')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeactivateAccount} style={styles.option}>
        <Text style={styles.optionText}>{t('generalSettings.deactivateAccount')}</Text>
        <Text style={styles.optionSubText}>
          {t('generalSettings.deactivateAccountSubText')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogoutPress} style={styles.option}>
        <Text style={styles.optionText}>{t('generalSettings.logOut')}</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>{t('generalSettings.support')}</Text>
      <TouchableOpacity onPress={handleContactSupport} style={styles.option}>
        <Text style={styles.optionText}>{t('generalSettings.contactSupport', 'Contact Support')}</Text>
        <Text style={styles.optionSubText}>{t('generalSettings.contactSupportSubText', 'Get help with your account or app issues')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleViewPrivacyPolicy} style={styles.option}>
        <Text style={styles.optionText}>{t('generalSettings.privacyPolicy', 'Privacy Policy')}</Text>
        <Text style={styles.optionSubText}>{t('generalSettings.privacyPolicySubText', 'View our privacy policy and data handling')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleViewTerms} style={styles.option}>
        <Text style={styles.optionText}>{t('generalSettings.termsOfService', 'Terms of Service')}</Text>
        <Text style={styles.optionSubText}>{t('generalSettings.termsOfServiceSubText', 'View our terms and conditions')}</Text>
      </TouchableOpacity>
      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showLogoutModal}
        onRequestClose={handleLogoutCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {t('generalSettings.confirmLogout', 'Confirm Logout')}
            </Text>
            <Text style={styles.modalMessage}>
              {t('generalSettings.logoutConfirmationMessage', 'Are you sure you want to logout?')}
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleLogoutCancel}
              >
                <Text style={styles.cancelButtonText}>
                  {t('common.cancel', 'Cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogoutConfirm}
              >
                <Text style={styles.confirmButtonText}>
                  {t('generalSettings.logOut', 'Logout')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Toast Notification */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={toastVisible}
        onRequestClose={() => setToastVisible(false)}
      >
        <View style={styles.toastOverlay}>
          <View style={[
            styles.toastContainer, 
            toastType === 'success' ? styles.toastSuccess : 
            toastType === 'error' ? styles.toastError : styles.toastInfo
          ]}>
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        </View>
      </Modal>
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
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginLeft: 15,
    color: "#000000",
    flex: 1,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    color: '#000',
  },
  modalMessage: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  confirmButton: {
    backgroundColor: '#FF8C00',
  },
  cancelButtonText: {
    color: '#666',
    fontFamily: 'Poppins-Medium',
  },
  confirmButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  toastOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 100,
  },
  toastContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    maxWidth: '80%',
  },
  toastSuccess: {
    backgroundColor: '#4CAF50',
  },
  toastError: {
    backgroundColor: '#F44336',
  },
  toastInfo: {
    backgroundColor: '#2196F3',
  },
  toastText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
});
