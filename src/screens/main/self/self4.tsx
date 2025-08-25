import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import TitleText from "@/components/common/TitleText";
import LabelText from "@/components/common/LabelText";
import HorizontalRadioButtonGroup from "@/components/common/HorizontalRadioButtonGroup";
import ProgressBar from "../../../components/ProgressBar";
import { t } from "@/i18n/locales/i18n"; // Import translation function

const { height: screenHeight } = Dimensions.get("window");

// Add type definitions for translation keys
type LikelihoodKey = "self4Screen.veryUnlikely" | "self4Screen.unlikely" | "self4Screen.neutral" | "self4Screen.likely" | "self4Screen.veryLikely";

export default function Self4() {
  const navigation = useNavigation();

  // Individual states for each question using keys
  const [irritabilityKey, setIrritabilityKey] = useState<LikelihoodKey | "">("");
  const [muscleTensionKey, setMuscleTensionKey] = useState<LikelihoodKey | "">("");
  const [anxietySleepKey, setAnxietySleepKey] = useState<LikelihoodKey | "">("");

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const storedResponses = await AsyncStorage.getItem("onboardingResponses");
        if (storedResponses) {
          const parsedResponses = JSON.parse(storedResponses);
          const screen6Responses = parsedResponses.screen6 || {};
          setIrritabilityKey(screen6Responses.irritabilityKey || "");
          setMuscleTensionKey(screen6Responses.muscleTensionKey || "");
          setAnxietySleepKey(screen6Responses.anxietySleepKey || "");
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
        "self4Screen.veryUnlikely": 10,
        "self4Screen.unlikely": 8,
        "self4Screen.neutral": 5,
        "self4Screen.likely": 3,
        "self4Screen.veryLikely": 0
      };

      // Calculate scores based on weights, with 50% for unanswered questions
      const irritabilityScore = irritabilityKey ? likelihoodWeights[irritabilityKey] : 5; // 50% of max 10
      const muscleTensionScore = muscleTensionKey ? likelihoodWeights[muscleTensionKey] : 5; // 50% of max 10
      const anxietySleepScore = anxietySleepKey ? likelihoodWeights[anxietySleepKey] : 5; // 50% of max 10

      // Calculate total score (max possible score = 30)
      const totalScore = irritabilityScore + muscleTensionScore + anxietySleepScore;
      const self4Score = totalScore;

      const responses = {
        screen6: {
          irritabilityKey,
          muscleTensionKey,
          anxietySleepKey
        },
        self4Score,
        self4RawScore: totalScore
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

      //@ts-ignore
      navigation.navigate("Self5");
    } catch (error) {
      console.error("Error saving responses:", error);
    }
  };

  const goBack = () => navigation.goBack();
  const navigateTo = () => {
    // @ts-ignore
    navigation.navigate("Self5");
  };

  // Options with their translation keys
  const optionsWithKeys = [
    { key: "self4Screen.veryUnlikely", text: t("self4Screen.veryUnlikely", "Very Unlikely") },
    { key: "self4Screen.unlikely", text: t("self4Screen.unlikely", "Unlikely") },
    { key: "self4Screen.neutral", text: t("self4Screen.neutral", "Neutral") },
    { key: "self4Screen.likely", text: t("self4Screen.likely", "Likely") },
    { key: "self4Screen.veryLikely", text: t("self4Screen.veryLikely", "Very Likely") }
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ width: "70%", alignSelf: "center" }}>
          <ProgressBar progress={3 / 5} />
        </View>
        
        <TitleText>
          {t("self4Screen.title", "How likely are you to...")}
        </TitleText>

        <LabelText>
          {t(
            "self4Screen.irritabilityQuestion",
            "Be irritable or easily annoyed.",
          )}
        </LabelText>
        <HorizontalRadioButtonGroup
          options={optionsWithKeys.map(o => o.text)}
          selectedValue={irritabilityKey ? t(irritabilityKey as string, "") : ""}
          onValueChange={(value) => {
            const option = optionsWithKeys.find(o => o.text === value);
            if (option) setIrritabilityKey(option.key as LikelihoodKey);
          }}
        />

        <LabelText>
          {t(
            "self4Screen.muscleTensionQuestion",
            "Experience tension or pain in your muscles without physical exertion.",
          )}
        </LabelText>
        <HorizontalRadioButtonGroup
          options={optionsWithKeys.map(o => o.text)}
          selectedValue={muscleTensionKey ? t(muscleTensionKey as string, "") : ""}
          onValueChange={(value) => {
            const option = optionsWithKeys.find(o => o.text === value);
            if (option) setMuscleTensionKey(option.key as LikelihoodKey);
          }}
        />

        <LabelText>
          {t(
            "self4Screen.anxietySleepQuestion",
            "Have difficulty falling asleep or staying asleep due to anxiety.",
          )}
        </LabelText>
        <HorizontalRadioButtonGroup
          options={optionsWithKeys.map(o => o.text)}
          selectedValue={anxietySleepKey ? t(anxietySleepKey as string, "") : ""}
          onValueChange={(value) => {
            const option = optionsWithKeys.find(o => o.text === value);
            if (option) setAnxietySleepKey(option.key as LikelihoodKey);
          }}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={t("self4Screen.saveAndProceed", "Save & Proceed")}
          callback={saveResponses}
        />
        <View style={styles.secondaryButtonContainer}>
          <SecondaryButton
            label={t("self4Screen.back", "Back")}
            callback={goBack}
            customStyle={styles.secondaryButton}
          />
          <SecondaryButton
            label={t("self4Screen.skip", "Skip")}
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
