import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguage } from "src/context/LanguageContext";
import { t } from "@/i18n/locales/i18n";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function SelfThankYou() {
  const navigation = useNavigation();

  const handleComplete = async () => {
    try {
      // Mark first launch as completed
      await AsyncStorage.setItem('hasCompletedFirstLaunch', 'true');
      await AsyncStorage.setItem('hasCompletedSelfAssessment', 'true');
      // Navigate to MainApp (tab navigator)
      navigation.navigate("MainApp" as never);
    } catch (error) {
      console.error("Error marking onboarding completion:", error);
      navigation.navigate("MainApp" as never);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("selfThankYouScreen.title", "Onboarding Complete!")}</Text>
      <Text style={styles.message}>
        {t("selfThankYouScreen.message", "Time to sync your devices for better results")}
      </Text>

      {/* Next Button */}
      <Pressable
        style={styles.primaryButton}
        onPress={handleComplete}
      >
        <Text style={styles.primaryButtonText}>{t("selfThankYouScreen.nextButton", "Next")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 34,
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    color: "#FF8C00",
    marginTop: 26,
    marginBottom: 40,
    textAlign: "center",
  },
  message: {
    fontSize: 20,
    color: "#FF8C00",
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 25,
    marginLeft: 15,
    marginRight: 15,
  },
  primaryButton: {
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 10,
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    height: screenHeight * 0.06,
    width: screenWidth * 0.79,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
});
