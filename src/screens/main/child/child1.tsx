import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function
import { saveData, getData } from "@/utils/storageUtils";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import ScreenContainer from "@/components/common/ScreenContainer";
import TitleText from "@/components/common/TitleText";
import LabelText from "@/components/common/LabelText";
import InputField from "@/components/common/InputField";
import DatePicker from "@/components/common/DatePicker";
import RadioButtonGroup from "@/components/common/RadioButtonGroup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height: screenHeight } = Dimensions.get("window");

const Child1 = () => {
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
    { key: GENDER_KEYS.MALE, display: t("child1Screen.genderOptionMale") },
    { key: GENDER_KEYS.FEMALE, display: t("child1Screen.genderOptionFemale") },
    { key: GENDER_KEYS.NON_BINARY, display: t("child1Screen.genderOptionNonBinary") },
    { key: GENDER_KEYS.PREFER_NOT_TO_SAY, display: t("child1Screen.genderOptionPreferNotToSay") },
    { key: GENDER_KEYS.OTHER, display: t("child1Screen.genderOptionOther") }
  ];

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await getData<{
          name: string;
          dob: string;
          gender: string;
        }>("Child1");
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
      await saveData("Child1", data);
      // Also save to profile storage
      const profileData = {
        name: name || "User",
        imageUri: null,
        avatarGender: null,
        avatarIndex: null,
        selectedGender: gender // This will now be the gender key
      };
      await AsyncStorage.setItem("profile_v1", JSON.stringify(profileData));
      // @ts-ignore
      navigation.navigate("Child2");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const goBack = () => navigation.goBack();

  return (
    <ScreenContainer>
      <ScrollView>
        <TitleText>{t("child1Screen.title")}</TitleText>

        <LabelText>{t("child1Screen.nameLabel")}</LabelText>
        <InputField
          placeholder=""
          value={name}
          onChangeText={setName}
          accessibilityLabel={t("child1Screen.nameAccessibilityLabel")}
        />

        <LabelText>{t("child1Screen.dobLabel")}</LabelText>
        <DatePicker
          date={dob}
          onDateChange={(_, selectedDate) =>
            selectedDate && setDob(selectedDate)
          }
        />

        <LabelText>{t("child1Screen.genderLabel")}</LabelText>
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
          label={t("child1Screen.saveButton")}
          callback={handleSaveAndProceed}
        />
        <SecondaryButton
          label={t("child1Screen.backButton")}
          callback={goBack}
          customStyle={styles.secondaryButton}
        />
      </View>
    </ScreenContainer>
  );
};

export default Child1;

const styles = StyleSheet.create({
  buttonContainer: {
    height: screenHeight * 0.15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  secondaryButton: {
    width: "88%", //test commit
  },
});
