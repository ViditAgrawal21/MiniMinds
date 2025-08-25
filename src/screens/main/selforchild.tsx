import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "@/i18n/locales/i18n"; // Import the translation function
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";

const { height: screenHeight } = Dimensions.get("window");

const SelfOrChildScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedUser, setSelectedUser] = useState("");

  const handleSaveAndProceed = async () => {
    // Default to Self if no selection is made
    const userType = selectedUser || "Self";

    try {
      // Get existing responses
      const storedResponses = await AsyncStorage.getItem("onboardingResponses");
      const responses = storedResponses ? JSON.parse(storedResponses) : {};

      // Store the onboarding type
      const updatedResponses = {
        ...responses,
        onboardingType: userType.toLowerCase()
      };

      await AsyncStorage.setItem(
        "onboardingResponses",
        JSON.stringify(updatedResponses)
      );

      // Navigate based on selection
      if (userType === "Child") {
        navigation.navigate("Child1");
      } else {
        navigation.navigate("Self1");
      }
    } catch (error) {
      console.error("Error saving onboarding type:", error);
      // Navigate anyway in case of error
      navigation.navigate(userType === "Child" ? "Child1" : "Self1");
    }
  };

  const goBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('selfOrChildScreen.title')}</Text>
      <Text style={styles.subtitle}>{t('selfOrChildScreen.subtitle')}</Text>

      {/* Options */}
      <Pressable
        style={[
          styles.option,
          selectedUser === "Self" && styles.selectedOption,
        ]}
        onPress={() => setSelectedUser("Self")}
      >
        <Text
          style={[
            styles.optionText,
            selectedUser === "Self" && styles.selectedOptionText,
          ]}
        >
          {t('selfOrChildScreen.optionSelf')}
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.option,
          selectedUser === "Child" && styles.selectedOption,
        ]}
        onPress={() => setSelectedUser("Child")}
      >
        <Text
          style={[
            styles.optionText,
            selectedUser === "Child" && styles.selectedOptionText,
          ]}
        >
          {t('selfOrChildScreen.optionChild')}
        </Text>
      </Pressable>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <PrimaryButton label={t('selfOrChildScreen.saveButton')} callback={handleSaveAndProceed} />
        <SecondaryButton label={t('selfOrChildScreen.backButton')} callback={goBack} />
      </View>
    </View>
  );
};

export default SelfOrChildScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: screenHeight * 0.03,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#D27AD5",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "300",
    color: "#5F6368",
    marginBottom: 40,
    marginTop: -5,
    textAlign: "center",
    fontFamily: "Poppins-Light",
  },
  option: {
    width: "100%",
    paddingVertical: 50,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#C841CC",
    backgroundColor: "#FFF",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedOption: {
    backgroundColor: "#AB47BC",
    shadowColor: "#AB47BC",
    shadowOpacity: 0.3,
    elevation: 6,
  },
  optionText: {
    fontSize: 25,
    fontWeight: "400",
    color: "#D27AD5",
    fontFamily: "Poppins-Regular",
  },
  selectedOptionText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
  },
  buttonContainer: {
    height: screenHeight * 0.15,
    justifyContent: "center",
    marginTop: 80,
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
  },
  secondaryButton: {
    borderWidth: 3,
    borderColor: "#AB47BC",
    backgroundColor: "#FFFFFF",
    paddingVertical: 5,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 7,
  },
  secondaryButtonText: {
    color: "#D27AD5",
    fontSize: 20,
    fontFamily: "Poppins-Regular",
  },
});
