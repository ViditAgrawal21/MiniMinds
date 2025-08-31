import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "@/i18n/locales/i18n";
import CustomIcon from "@/components/CustomIcon";

const PrivacyNoticeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleAccept = () => {
    setHasAccepted(true);
  };

  const handlePrivacyPolicyLink = () => {
    Linking.openURL("https://thoughthealer.org/terms&condition.html");
  };

  const handleProceed = async () => {
    try {
      // Check if this is first launch
      const hasCompletedFirstLaunch = await AsyncStorage.getItem(
        "hasCompletedFirstLaunch",
      );

      if (hasCompletedFirstLaunch === null) {
        // First time - go to onboarding
        navigation.navigate("WelcomeScreen" as never);
      } else {
        // Not first time - go directly to Tab
        navigation.navigate("PrivacyNoticeScreen" as never);
      }
    } catch (error) {
      console.error("Error in privacy notice navigation:", error);
      // Navigate to welcome screen as fallback
      navigation.navigate("PrivacyNoticeScreen" as never);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.content}
      >
        {/* Privacy Icon */}
        <View style={styles.iconContainer}>
          <CustomIcon type="IO" name="shield-checkmark" size={80} color="#4CAF50" />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {t("privacyNotice.title", "Privacy TLDR")}
        </Text>

        {/* Privacy Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            {t(
              "privacyNotice.message",
              "All your personal data including mood entries, journal entries, assessment results, and app usage patterns are stored and processed locally on your device. We prioritize your privacy and data security by ensuring that sensitive information never leaves your phone. Only subscription details and basic account information are stored on our servers to manage your premium features. Your mental health data remains completely private and under your control.",
            )}
          </Text>
        </View>

        {/* Detailed Points */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <CustomIcon type="IO" name="phone-portrait" size={24} color="#2196F3" />
            <Text style={styles.detailText}>
              {t("privacyNotice.localStorage", "All personal data stored locally on your device")}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <CustomIcon type="IO" name="shield" size={24} color="#FF9800" />
            <Text style={styles.detailText}>
              {t("privacyNotice.dataProtection", "End-to-end encryption for sensitive data")}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <CustomIcon type="IO" name="cloud-offline" size={24} color="#9C27B0" />
            <Text style={styles.detailText}>
              {t("privacyNotice.offlineFirst", "Works completely offline - no data transmission required")}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <CustomIcon type="IO" name="lock-closed" size={24} color="#F44336" />
            <Text style={styles.detailText}>
              {t("privacyNotice.noTracking", "No tracking, no analytics, no data collection")}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <CustomIcon type="IO" name="card" size={24} color="#4CAF50" />
            <Text style={styles.detailText}>
              {t("privacyNotice.subscriptionOnly", "Only subscription details stored on secure servers")}
            </Text>
          </View>
        </View>

        {/* Privacy Policy Link */}
        <TouchableOpacity style={styles.privacyPolicyButton} onPress={handlePrivacyPolicyLink}>
          <CustomIcon type="IO" name="document-text" size={20} color="#A63BAA" />
          <Text style={styles.privacyPolicyText}>
            {t("privacyNotice.readFullPolicy", "Read Full Privacy Policy")}
          </Text>
          <CustomIcon type="IO" name="open" size={16} color="#A63BAA" />
        </TouchableOpacity>

        {/* Accept Button */}
        <TouchableOpacity 
          style={[styles.acceptButton, hasAccepted && styles.acceptButtonActive]} 
          onPress={handleAccept}
          disabled={hasAccepted}
        >
          <CustomIcon type="IO" 
            name={hasAccepted ? "checkmark-circle" : "checkmark-circle-outline"} 
            size={20} 
            color={hasAccepted ? "white" : "#666"} 
          />
          <Text style={[styles.acceptButtonText, hasAccepted && styles.acceptButtonTextActive]}>
            {hasAccepted ? t("privacyNotice.accepted", "Accepted") : t("privacyNotice.accept", "I Accept")}
          </Text>
        </TouchableOpacity>

        {/* Proceed Button */}
        <TouchableOpacity 
          style={[styles.proceedButton, !hasAccepted && styles.proceedButtonDisabled]} 
          onPress={handleProceed}
          disabled={!hasAccepted}
        >
          <Text style={[styles.proceedButtonText, !hasAccepted && styles.proceedButtonTextDisabled]}>
            {t("privacyNotice.proceed", "Proceed")}
          </Text>
          <CustomIcon type="IO" 
            name="arrow-forward" 
            size={20} 
            color={hasAccepted ? "white" : "#ccc"} 
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 24,
    marginTop: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  messageContainer: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  detailsContainer: {
    width: "100%",
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 12,
    fontFamily: "Poppins-Regular",
    flex: 1,
  },
  privacyPolicyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#A63BAA",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  privacyPolicyText: {
    fontSize: 16,
    color: "#A63BAA",
    marginHorizontal: 8,
    fontFamily: "Poppins-Bold",
  },
  acceptButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#ddd",
    minWidth: 150,
  },
  acceptButtonActive: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  acceptButtonText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
    fontFamily: "Poppins-Bold",
  },
  acceptButtonTextActive: {
    color: "white",
  },
  proceedButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A63BAA",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#A63BAA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    minWidth: 200,
    marginBottom: 20,
  },
  proceedButtonDisabled: {
    backgroundColor: "#ccc",
    elevation: 0,
    shadowOpacity: 0,
  },
  proceedButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
    fontFamily: "Poppins-Bold",
  },
  proceedButtonTextDisabled: {
    color: "#999",
  },
});

export default PrivacyNoticeScreen;
