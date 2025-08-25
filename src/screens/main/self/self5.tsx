import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import TitleText from "@/components/common/TitleText";
import LabelText from "@/components/common/LabelText";
import HorizontalRadioButtonGroup from "@/components/common/HorizontalRadioButtonGroup"; // Updated to use HorizontalRadioButtonGroup
import ProgressBar from "../../../components/ProgressBar";
import { t } from "@/i18n/locales/i18n"; // Import translation function

const { height: screenHeight } = Dimensions.get("window");

// Add type definitions for translation keys
type LikelihoodKey = "self5Screen.veryUnlikely" | "self5Screen.unlikely" | "self5Screen.neutral" | "self5Screen.likely" | "self5Screen.veryLikely";

export default function Self5() {
  const navigation = useNavigation();

  // Individual states for each question using keys
  const [response1Key, setResponse1Key] = useState<LikelihoodKey | "">("");
  const [response2Key, setResponse2Key] = useState<LikelihoodKey | "">("");

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const storedResponses = await AsyncStorage.getItem("onboardingResponses");
        if (storedResponses) {
          const parsedResponses = JSON.parse(storedResponses);
          const screen11Responses = parsedResponses.screen11 || {};
          setResponse1Key(screen11Responses.overwhelmedKey || "");
          setResponse2Key(screen11Responses.physicalSymptomsKey || "");
        }
      } catch (error) {
        console.error("Error loading saved responses:", error);
      }
    };

    loadSavedData();
  }, []);

  const saveResponses = async () => {
    try {
      // Define weights for likelihood options using translation keys
      const likelihoodWeights: Record<LikelihoodKey, number> = {
        "self5Screen.veryUnlikely": 10,
        "self5Screen.unlikely": 8,
        "self5Screen.neutral": 5,
        "self5Screen.likely": 3,
        "self5Screen.veryLikely": 0
      };

      // Special weights for the first question (15 points max)
      const overwhelmedWeights: Record<LikelihoodKey, number> = {
        "self5Screen.veryUnlikely": 15,
        "self5Screen.unlikely": 11,
        "self5Screen.neutral": 7,
        "self5Screen.likely": 3,
        "self5Screen.veryLikely": 0
      };

      // Calculate scores based on weights, with 50% for unanswered questions
      const response1Score = response1Key ? overwhelmedWeights[response1Key] : 7.5; // 50% of max 15
      const response2Score = response2Key ? likelihoodWeights[response2Key] : 5; // 50% of max 10

      // Calculate total score (max possible score = 25)
      const totalScore = response1Score + response2Score;
      const self5Score = totalScore;

      const responses = {
        screen11: {
          overwhelmedKey: response1Key,
          physicalSymptomsKey: response2Key
        },
        self5Score,
        self5RawScore: totalScore
      };

      const storedResponses = await AsyncStorage.getItem("onboardingResponses");
      const parsedResponses = storedResponses ? JSON.parse(storedResponses) : {};

      // Calculate overall onboarding score from all sections
      const self2RawScore = parsedResponses.self2RawScore || 0;
      const self3RawScore = parsedResponses.self3RawScore || 0;
      const self4RawScore = parsedResponses.self4RawScore || 0;
      
      // Total max scores per section:
      // Self2 = 25 (Life & Work Balance)
      // Self3 = 20 (Digital Wellbeing)
      // Self4 = 30 (Anxiety Indicators)
      // Self5 = 25 (Stress & Physical Symptoms)
      // Total possible = 100 points
      // Higher score = Better wellness state
      const totalOnboardingScore = self2RawScore + self3RawScore + self4RawScore + totalScore;
      const overallScore = totalOnboardingScore;

      const updatedResponses = {
        ...parsedResponses,
        ...responses,
        overallOnboardingScore: overallScore
      };

      await AsyncStorage.setItem(
        "onboardingResponses",
        JSON.stringify(updatedResponses),
      );

      // @ts-ignore
      navigation.navigate("SelfThankYou");
    } catch (error) {
      console.error("Error saving responses:", error);
    }
  };

  const goBack = () => navigation.goBack();
  const navigateTo = () => {
    // @ts-ignore
    navigation.navigate("SelfThankYou");
  };

  // Options with their translation keys
  const optionsWithKeys = [
    { key: "self5Screen.veryUnlikely", text: t("self5Screen.veryUnlikely", "Very Unlikely") },
    { key: "self5Screen.unlikely", text: t("self5Screen.unlikely", "Unlikely") },
    { key: "self5Screen.neutral", text: t("self5Screen.neutral", "Neutral") },
    { key: "self5Screen.likely", text: t("self5Screen.likely", "Likely") },
    { key: "self5Screen.veryLikely", text: t("self5Screen.veryLikely", "Very Likely") }
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ width: "70%", alignSelf: "center" }}>
          <ProgressBar progress={4 / 5} />
        </View>
        
        <TitleText>
          {t("self5Screen.title", "How likely are you to...")}
        </TitleText>

        <LabelText>
          {t(
            "self5Screen.overwhelmedQuestion",
            "Feel overwhelmed by your responsibilities or tasks.",
          )}
        </LabelText>
        <HorizontalRadioButtonGroup
          options={optionsWithKeys.map(o => o.text)}
          selectedValue={response1Key ? t(response1Key as string, "") : ""}
          onValueChange={(value) => {
            const option = optionsWithKeys.find(o => o.text === value);
            if (option) setResponse1Key(option.key as LikelihoodKey);
          }}
        />

        <LabelText>
          {t(
            "self5Screen.physicalSymptomsQuestion",
            "Experience physical symptoms like sweating, trembling, or rapid heartbeat when anxious.",
          )}
        </LabelText>
        <HorizontalRadioButtonGroup
          options={optionsWithKeys.map(o => o.text)}
          selectedValue={response2Key ? t(response2Key as string, "") : ""}
          onValueChange={(value) => {
            const option = optionsWithKeys.find(o => o.text === value);
            if (option) setResponse2Key(option.key as LikelihoodKey);
          }}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={t("self5Screen.saveAndProceed", "Save & Proceed")}
          callback={saveResponses}
        />
        <View style={styles.secondaryButtonContainer}>
          <SecondaryButton
            label={t("self5Screen.back", "Back")}
            callback={goBack}
            customStyle={styles.secondaryButton}
          />
          <SecondaryButton
            label={t("self5Screen.skip", "Skip")}
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
