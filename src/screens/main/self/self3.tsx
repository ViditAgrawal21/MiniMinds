import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import TitleText from "@/components/common/TitleText";
import LabelText from "@/components/common/LabelText";
import RadioButtonGroup from "@/components/common/RadioButtonGroup";
import ProgressBar from "../../../components/ProgressBar";
import { t } from "@/i18n/locales/i18n"; // Import translation function

const { height: screenHeight } = Dimensions.get("window");

// Add type definitions for translation keys
type TimeKey = "self3.lessThan1Hour" | "self3.oneToThreeHours" | "self3.threeToFiveHours" | "self3.fivePlusHours";
type EffectKey = "self3.positive" | "self3.neutral" | "self3.sometimesNegative" | "self3.oftenNegative";

export default function Self3() {
  const navigation = useNavigation();
  const [socialMediaTimeKey, setSocialMediaTimeKey] = useState<TimeKey | "">("");
  const [socialMediaEffectKey, setSocialMediaEffectKey] = useState<EffectKey | "">("");

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const storedResponses = await AsyncStorage.getItem("onboardingResponses");
        if (storedResponses) {
          const parsedResponses = JSON.parse(storedResponses);
          setSocialMediaTimeKey(parsedResponses.socialMediaTimeKey || "");
          setSocialMediaEffectKey(parsedResponses.socialMediaEffectKey || "");
        }
      } catch (error) {
        console.error("Error loading saved responses:", error);
      }
    };

    loadSavedData();
  }, []);

  const saveResponses = async () => {
    try {
      // Define weights for each option using translation keys
      const timeWeights: Record<TimeKey, number> = {
        "self3.lessThan1Hour": 10,
        "self3.oneToThreeHours": 7,
        "self3.threeToFiveHours": 4,
        "self3.fivePlusHours": 0
      };

      const effectWeights: Record<EffectKey, number> = {
        "self3.positive": 10,
        "self3.neutral": 7,
        "self3.sometimesNegative": 4,
        "self3.oftenNegative": 0
      };

      // Calculate scores based on weights, with 50% for unanswered questions
      const timeScore = socialMediaTimeKey ? timeWeights[socialMediaTimeKey] : 5; // 50% of max 10
      const effectScore = socialMediaEffectKey ? effectWeights[socialMediaEffectKey] : 5; // 50% of max 10

      // Calculate total score (max possible score = 20)
      const totalScore = timeScore + effectScore;
      const self3Score = totalScore;

      const responses = {
        socialMediaTimeKey,
        socialMediaEffectKey,
        self3Score,
        self3RawScore: totalScore
      };

      const storedResponses = await AsyncStorage.getItem("onboardingResponses");
      const parsedResponses = storedResponses ? JSON.parse(storedResponses) : {};

      const updatedResponses = {
        ...parsedResponses,
        ...responses,
      };

      await AsyncStorage.setItem(
        "onboardingResponses",
        JSON.stringify(updatedResponses),
      );

      // @ts-ignore
      navigation.navigate("Self4");
    } catch (error) {
      console.error("Error saving responses:", error);
    }
  };

  const goBack = () => navigation.goBack();
  const navigateTo = () => {
    // @ts-ignore
    navigation.navigate("Self4");
  };

  // Options with their translation keys
  const timeOptionsWithKeys = [
    { key: "self3.lessThan1Hour", text: t("self3.lessThan1Hour", "Less than 1 hour") },
    { key: "self3.oneToThreeHours", text: t("self3.oneToThreeHours", "1-3 hours") },
    { key: "self3.threeToFiveHours", text: t("self3.threeToFiveHours", "3-5 hours") },
    { key: "self3.fivePlusHours", text: t("self3.fivePlusHours", "5+ hours") }
  ];

  const effectOptionsWithKeys = [
    { key: "self3.positive", text: t("self3.positive", "Positive") },
    { key: "self3.neutral", text: t("self3.neutral", "Neutral") },
    { key: "self3.sometimesNegative", text: t("self3.sometimesNegative", "Sometimes Negative") },
    { key: "self3.oftenNegative", text: t("self3.oftenNegative", "Often Negative") }
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ width: "70%", alignSelf: "center" }}>
          <ProgressBar progress={2 / 5} />
        </View>
        
        <TitleText>
          {t("self3.title", "How is your Digital Wellbeing?")}
        </TitleText>

        <LabelText>
          {t(
            "self3.timeQuestion",
            "How much time do you spend on social media?",
          )}
        </LabelText>
        <RadioButtonGroup
          options={timeOptionsWithKeys.map(o => o.text)}
          selectedValue={socialMediaTimeKey ? t(socialMediaTimeKey as string, "") : ""}
          onValueChange={(value) => {
            const option = timeOptionsWithKeys.find(o => o.text === value);
            if (option) setSocialMediaTimeKey(option.key as TimeKey);
          }}
        />

        <LabelText>
          {t("self3.feelingQuestion", "How does social media make you feel?")}
        </LabelText>
        <RadioButtonGroup
          options={effectOptionsWithKeys.map(o => o.text)}
          selectedValue={socialMediaEffectKey ? t(socialMediaEffectKey as string, "") : ""}
          onValueChange={(value) => {
            const option = effectOptionsWithKeys.find(o => o.text === value);
            if (option) setSocialMediaEffectKey(option.key as EffectKey);
          }}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={t("self3.saveAndProceed", "Save & Proceed")}
          callback={saveResponses}
        />
        <View style={styles.secondaryButtonContainer}>
          <SecondaryButton
            label={t("self3.back", "Back")}
            callback={goBack}
            customStyle={styles.secondaryButton}
          />
          <SecondaryButton
            label={t("self3.skip", "Skip")}
            callback={navigateTo}
            customStyle={styles.secondaryButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

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
