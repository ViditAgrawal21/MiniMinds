import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { t } from '@/i18n/locales/i18n';

interface UseExitConfirmationReturn {
  showExitModal: boolean;
  ExitConfirmationModal: React.FC;
  handleCancelExit: () => void;
}

export const useExitConfirmation = (): UseExitConfirmationReturn => {
  const [showExitModal, setShowExitModal] = useState(false);

  // Handle back button press for exit confirmation
  const handleBackPress = () => {
    setShowExitModal(true);
    return true; // Prevent default back behavior
  };

  // Handle exit confirmation
  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  // Set up back handler when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      
      return () => backHandler.remove();
    }, [])
  );

  // Additional useEffect for consistency (as in original code)
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
    return () => backHandler.remove();
  }, []);

  const ExitConfirmationModal: React.FC = () => (
    <Modal
      transparent={true}
      visible={showExitModal}
      animationType="fade"
      onRequestClose={handleCancelExit}
    >
      <View style={styles.exitModalOverlay}>
        <View style={styles.exitModalContainer}>
          <View style={styles.exitModalContent}>
            <Text style={styles.exitModalTitle}>
              {t("homeTab.exitAppTitle") || "Exit App"}
            </Text>
            <Text style={styles.exitModalMessage}>
              {t("homeTab.exitAppMessage") || "Are you sure you want to exit the app?"}
            </Text>
            <View style={styles.exitModalButtons}>
              <TouchableOpacity
                style={[styles.exitModalButton, styles.exitCancelButton]}
                onPress={handleCancelExit}
                activeOpacity={0.8}
              >
                <Text style={styles.exitCancelButtonText}>
                  {t("homeTab.cancel") || "Cancel"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.exitModalButton, styles.exitConfirmButton]}
                onPress={handleExitApp}
                activeOpacity={0.8}
              >
                <Text style={styles.exitConfirmButtonText}>
                  {t("homeTab.exit") || "Exit"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  return {
    showExitModal,
    ExitConfirmationModal,
    handleCancelExit,
  };
};

const styles = StyleSheet.create({
  exitModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  exitModalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 0,
    width: "85%",
    maxWidth: 350,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  exitModalContent: {
    padding: 24,
    alignItems: "center",
  },
  exitModalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2C3E50",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginBottom: 16,
  },
  exitModalMessage: {
    fontSize: 16,
    color: "#555555",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  exitModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },
  exitModalButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  exitCancelButton: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  exitConfirmButton: {
    backgroundColor: "#DC3545",
    shadowColor: "#DC3545",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  exitCancelButtonText: {
    color: "#6C757D",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
  },
  exitConfirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
  },
});
