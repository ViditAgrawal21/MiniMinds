import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import ScreenContainer from "@/components/common/ScreenContainer";
import TitleText from "@/components/common/TitleText";
import LabelText from "@/components/common/LabelText";
import RadioButtonGroup from "@/components/common/RadioButtonGroup";
import ProgressBar from "../../../components/ProgressBar";

const { height: screenHeight } = Dimensions.get("window");

const ChildScreen3 = () => {
  const navigation = useNavigation();
  const [meetingPreference, setMeetingPreference] = useState("");
  const [freeTimeActivity, setFreeTimeActivity] = useState("");

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const storedResponses = await AsyncStorage.getItem(
          "onboardingResponses",
        );
        if (storedResponses) {
          const parsedResponses = JSON.parse(storedResponses);
          setMeetingPreference(parsedResponses.meetingPreference || "");
          setFreeTimeActivity(parsedResponses.freeTimeActivity || "");
        }
      } catch (error) {
        console.error("Error loading saved responses:", error);
      }
    };
    loadSavedData();
  }, []);

  const saveResponses = async () => {
    try {
      const responses = {
        meetingPreference,
        freeTimeActivity,
      };
      const storedResponses = await AsyncStorage.getItem("onboardingResponses");
      const parsedResponses = storedResponses
        ? JSON.parse(storedResponses)
        : {};
      const updatedResponses = {
        ...parsedResponses,
        ...responses,
      };
      await AsyncStorage.setItem(
        "onboardingResponses",
        JSON.stringify(updatedResponses),
      );
      // Navigate to the next screen
      // @ts-ignore
      navigation.navigate("Child4");
    } catch (error) {
      console.error("Error saving responses:", error);
    }
  };

  const goBack = () => navigation.goBack();
  const navigateTo = () => {
    // @ts-ignore
    navigation.navigate("Child4");
  };

  const meetingOptions = [
    t("child3Screen.meetingOptionLoveNew"),
    t("child3Screen.meetingOptionCloseFriends"),
    t("child3Screen.meetingOptionDepends"),
  ];

  const freeTimeOptions = [
    t("child3Screen.freeTimeOptionFriends"),
    t("child3Screen.freeTimeOptionScrolling"),
    t("child3Screen.freeTimeOptionSchoolWork"),
  ];

  return (
    <ScreenContainer>
      <View style={{ width: "70%", alignSelf: "center" }}>
        <ProgressBar progress={2 / 5} />
      </View>
      <ScrollView>
        <TitleText>{t("child3Screen.title")}</TitleText>

        <LabelText>{t("child3Screen.meetingLabel")}</LabelText>
        <RadioButtonGroup
          options={meetingOptions}
          selectedValue={meetingPreference} // Consider if this should store the key or English value
          onValueChange={setMeetingPreference}
        />

        <LabelText>{t("child3Screen.freeTimeLabel")}</LabelText>
        <RadioButtonGroup
          options={freeTimeOptions}
          selectedValue={freeTimeActivity} // Consider if this should store the key or English value
          onValueChange={setFreeTimeActivity}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={t("child3Screen.saveButton")}
          callback={saveResponses}
        />
        <View style={styles.secondaryButtonContainer}>
          <SecondaryButton
            label={t("child3Screen.backButton")}
            callback={goBack}
            customStyle={styles.secondaryButton}
          />
          <SecondaryButton
            label={t("child3Screen.skipButton")}
            callback={navigateTo}
            customStyle={styles.secondaryButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ChildScreen3;

const styles = StyleSheet.create({
  buttonContainer: {
    height: screenHeight * 0.15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
    width: "100%",
  },
  secondaryButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "88%",
  },
  secondaryButton: {
    width: "48%",
  },
});
