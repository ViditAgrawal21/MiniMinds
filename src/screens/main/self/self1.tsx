import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { saveData, getData } from "@/utils/storageUtils";
import { t } from "@/i18n/locales/i18n"; // Import translation function
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import TitleText from "@/components/common/TitleText";
import LabelText from "@/components/common/LabelText";
import InputField from "@/components/common/InputField";
import DatePicker from "@/components/common/DatePicker";
import RadioButtonGroup from "@/components/common/RadioButtonGroup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height: screenHeight } = Dimensions.get("window");

const Self1 = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [gender, setGender] = useState("");

  // Define gender keys that will be consistent across translations
  const GENDER_KEYS = {
    MALE: "MALE",
    FEMALE: "FEMALE",
    NON_BINARY: "NON_BINARY",
    PREFER_NOT_TO_SAY: "PREFER_NOT_TO_SAY",
    OTHER: "OTHER"
  };

  // Map display options to their keys
  const genderOptionsMap = [
    { key: GENDER_KEYS.MALE, display: t("self1.male", "Male") },
    { key: GENDER_KEYS.FEMALE, display: t("self1.female", "Female") },
    { key: GENDER_KEYS.NON_BINARY, display: t("self1.nonBinary", "Non-binary") },
    { key: GENDER_KEYS.PREFER_NOT_TO_SAY, display: t("self1.preferNotToSay", "Prefer not to say") },
    { key: GENDER_KEYS.OTHER, display: t("self1.otherSpecify", "Other (please specify)") }
  ];

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await getData<{
          name: string;
          dob: string;
          gender: string;
        }>("Self1");
        if (savedData) {
          setName(savedData.name || "");
          setDob(savedData.dob ? new Date(savedData.dob) : null);
          setGender(savedData.gender || "");
        }
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    };
    loadSavedData();
  }, []);

  const handleSaveAndProceed = async () => {
    const data = {
      name,
      dob: dob ? dob.toISOString() : "",
      gender,
    };

    try {
      await saveData("Self1", data);
      // Also save to profile storage
      const profileData = {
        name: name || "User",
        imageUri: null,
        avatarGender: null,
        avatarIndex: null,
        selectedGender: gender // This will now be the gender key
      };
      await AsyncStorage.setItem("profile_v1", JSON.stringify(profileData));

      // Save to onboardingResponses
      const storedResponses = await AsyncStorage.getItem("onboardingResponses");
      const parsedResponses = storedResponses ? JSON.parse(storedResponses) : {};
      const updatedResponses = {
        ...parsedResponses,
        ...data
      };
      await AsyncStorage.setItem("onboardingResponses", JSON.stringify(updatedResponses));

      // @ts-ignore
      navigation.navigate("Self2");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TitleText>{t("self1.title", "Let's get to know you!!")}</TitleText>

        <LabelText>
          {t("self1.nameQuestion", "What should we call you?")}
        </LabelText>
        <InputField
          placeholder=""
          value={name}
          onChangeText={setName}
          accessibilityLabel={t("self1.nameInput", "Name Input")}
        />

        <LabelText>{t("self1.dobQuestion", "What is your DOB?")}</LabelText>
        <DatePicker
          date={dob}
          onDateChange={(_, selectedDate) =>
            selectedDate && setDob(selectedDate)
          }
        />

        <LabelText>
          {t("self1.genderQuestion", "What gender do you identify with?")}
        </LabelText>
        <RadioButtonGroup
          options={genderOptionsMap.map(g => g.display)}
          selectedValue={gender ? (genderOptionsMap.find(g => g.key === gender)?.display || "") : ""}
          onValueChange={(value) => {
            const selectedOption = genderOptionsMap.find(g => g.display === value);
            setGender(selectedOption?.key || "");
          }}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={t("self1.saveAndProceed", "Save & Proceed")}
          callback={handleSaveAndProceed}
        />
        <SecondaryButton
          label={t("self1.back", "Back")}
          callback={goBack}
          customStyle={styles.secondaryButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default Self1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: screenHeight * 0.03,
    paddingBottom: 20,
  },
  buttonContainer: {
    height: screenHeight * 0.15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  secondaryButton: {
    width: "88%",
  },
});
