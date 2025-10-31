import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "@/i18n/locales/i18n"; // Import translation function

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function ChildThankYou() {
  const navigation = useNavigation();
  
  const handleComplete = async () => {
    try {
      // Mark first launch as completed
      await AsyncStorage.setItem('hasCompletedFirstLaunch', 'true');
      // Navigate to Tab
      navigation.navigate("Tab" as never);
    } catch (error) {
      console.error("Error marking onboarding completion:", error);
      navigation.navigate("Tab" as never);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("childThankYouScreen.title", "Onboarding Complete!")}</Text>
      <Text style={styles.message}>
        {t("childThankYouScreen.message", "Time to sync your devices for better results")}
      </Text>

      {/* Next Button */}
      <Pressable
        style={styles.primaryButton}
        onPress={handleComplete}
      >
        <Text style={styles.primaryButtonText}>{t("childThankYouScreen.nextButton", "Next")}</Text>
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
    lineHeight: 28,
    marginLeft: 15,
    marginRight: 15,
  },
  primaryButton: {
    padding: 0,
    backgroundColor: "#FF8C00",
    borderRadius: 10,
    marginBottom: 10,
    height: screenHeight * 0.07,
    width: screenWidth * 0.79,
    alignSelf: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
});
