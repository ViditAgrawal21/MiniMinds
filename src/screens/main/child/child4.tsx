import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { t } from "@/i18n/locales/i18n"; // Import translation function
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import ScreenContainer from "@/components/common/ScreenContainer";
import TitleText from "@/components/common/TitleText";
import LabelText from "@/components/common/LabelText";
import RadioButtonGroup from "@/components/common/RadioButtonGroup";
import ProgressBar from "../../../components/ProgressBar";

const { height: screenHeight } = Dimensions.get("window");

export default function ChildScreen4() {
  const navigation = useNavigation();
  const [socialMediaTime, setSocialMediaTime] = useState("");
  const [socialMediaEffect, setSocialMediaEffect] = useState("");

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const storedResponses = await AsyncStorage.getItem(
          "onboardingResponses",
        );
        if (storedResponses) {
          const parsedResponses = JSON.parse(storedResponses);
          setSocialMediaTime(parsedResponses.socialMediaTime || "");
          setSocialMediaEffect(parsedResponses.socialMediaEffect || "");
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
        socialMediaTime,
        socialMediaEffect,
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
      // @ts-ignore
      navigation.navigate("Child5");
    } catch (error) {
      console.error("Error saving responses:", error);
    }
  };

  const goBack = () => navigation.goBack();
  const navigateTo = () => {
    // @ts-ignore
    navigation.navigate("Child5");
  };

  const timeOptions = [
    t("child4Screen.lessThan1Hour", "Less than 1 hour"),
    t("child4Screen.oneToThreeHours", "1-3 hours"),
    t("child4Screen.threeToFiveHours", "3-5 hours"),
    t("child4Screen.fivePlusHours", "5+ hours"),
  ];

  const effectOptions = [
    t("child4Screen.positive", "Positive"),
    t("child4Screen.neutral", "Neutral"),
    t("child4Screen.sometimesNegative", "Sometimes Negative"),
    t("child4Screen.oftenNegative", "Often Negative"),
  ];

  return (
    <ScreenContainer>
      <View style={{ width: "70%", alignSelf: "center" }}>
        <ProgressBar progress={3 / 5} />
      </View>
      <ScrollView>
        <TitleText>
          {t("child4Screen.title", "How is your Digital Wellbeing?")}
        </TitleText>

        <LabelText>
          {t(
            "child4Screen.timeQuestion",
            "How much time do you spend on social media?",
          )}
        </LabelText>
        <RadioButtonGroup
          options={timeOptions}
          selectedValue={socialMediaTime}
          onValueChange={setSocialMediaTime}
        />

        <LabelText>
          {t(
            "child4Screen.feelingQuestion",
            "How does social media make you feel?",
          )}
        </LabelText>
        <RadioButtonGroup
          options={effectOptions}
          selectedValue={socialMediaEffect}
          onValueChange={setSocialMediaEffect}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={t("child4Screen.saveAndProceed", "Save & Proceed")}
          callback={saveResponses}
        />
        <View style={styles.secondaryButtonContainer}>
          <SecondaryButton
            label={t("child4Screen.back", "Back")}
            callback={goBack}
            customStyle={styles.secondaryButton}
          />
          <SecondaryButton
            label={t("child4Screen.skip", "Skip")}
            callback={navigateTo}
            customStyle={styles.secondaryButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: screenHeight * 0.15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
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
