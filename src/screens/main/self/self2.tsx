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

const Self2 = () => {
  const navigation = useNavigation();

  // Add type definitions for translation keys
  type LifeStatusKey = "self2.goingSmoothly" | "self2.mostlyOkay" | "self2.feelingBitOff" | "self2.difficult";
  type WorkLifeKey = "self2.veryManageable" | "self2.somewhatManageable" | "self2.bitOverwhelming" | "self2.veryOverwhelming";
  type FeelingKey = "self2.refreshed" | "self2.bitBurntOut";

  // Update state types to use keys
  const [lifeStatusKey, setLifeStatusKey] = useState<LifeStatusKey | "">("");
  const [workLifeKey, setWorkLifeKey] = useState<WorkLifeKey | "">("");
  const [feelingKey, setFeelingKey] = useState<FeelingKey | "">("");

  // Load saved data from AsyncStorage
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const storedResponses = await AsyncStorage.getItem(
          "onboardingResponses",
        );
        if (storedResponses) {
          const parsedResponses = JSON.parse(storedResponses);
          setLifeStatusKey(parsedResponses.lifeStatusKey || "");
          setWorkLifeKey(parsedResponses.workLifeKey || "");
          setFeelingKey(parsedResponses.feelingKey || "");
        }
      } catch (error) {
        console.error("Error loading saved responses:", error);
      }
    };

    loadSavedData();
  }, []);

  // Save responses to AsyncStorage
  const saveResponses = async () => {
    try {
      // Define weights for each option using translation keys
      const lifeStatusWeights: Record<LifeStatusKey, number> = {
        "self2.goingSmoothly": 10,
        "self2.mostlyOkay": 7,
        "self2.feelingBitOff": 4,
        "self2.difficult": 0
      };

      const workLifeWeights: Record<WorkLifeKey, number> = {
        "self2.veryManageable": 10,
        "self2.somewhatManageable": 7,
        "self2.bitOverwhelming": 4,
        "self2.veryOverwhelming": 0
      };

      const feelingWeights: Record<FeelingKey, number> = {
        "self2.refreshed": 5,
        "self2.bitBurntOut": 0
      };

      // Calculate scores based on weights, with 50% for unanswered questions
      const lifeStatusScore = lifeStatusKey ? lifeStatusWeights[lifeStatusKey] : 5; // 50% of max 10
      const workLifeScore = workLifeKey ? workLifeWeights[workLifeKey] : 5; // 50% of max 10
      const feelingScore = feelingKey ? feelingWeights[feelingKey] : 2.5; // 50% of max 5

      // Calculate total score (max possible score = 25)
      const totalScore = lifeStatusScore + workLifeScore + feelingScore;
      const self2Score = totalScore;

      const responses = {
        lifeStatusKey,
        workLifeKey,
        feelingKey,
        self2Score,
        self2RawScore: totalScore
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
      navigation.navigate("Self3");
    } catch (error) {
      console.error("Error saving responses:", error);
    }
  };

  // For the 'Skip' button or for going back
  const goBack = () => navigation.goBack();
  const navigateTo = () => {
    // @ts-ignore
    navigation.navigate("Self3");
  };

  // Options with their translation keys
  const lifeOptionsWithKeys = [
    { key: "self2.goingSmoothly", text: t("self2.goingSmoothly", "Going smoothly") },
    { key: "self2.mostlyOkay", text: t("self2.mostlyOkay", "Mostly okay") },
    { key: "self2.feelingBitOff", text: t("self2.feelingBitOff", "Feeling a bit off") },
    { key: "self2.difficult", text: t("self2.difficult", "Difficult") }
  ];

  const workLifeOptionsWithKeys = [
    { key: "self2.veryManageable", text: t("self2.veryManageable", "Very manageable") },
    { key: "self2.somewhatManageable", text: t("self2.somewhatManageable", "Somewhat manageable") },
    { key: "self2.bitOverwhelming", text: t("self2.bitOverwhelming", "A bit overwhelming") },
    { key: "self2.veryOverwhelming", text: t("self2.veryOverwhelming", "Very overwhelming") }
  ];

  const feelingOptionsWithKeys = [
    { key: "self2.refreshed", text: t("self2.refreshed", "Refreshed") },
    { key: "self2.bitBurntOut", text: t("self2.bitBurntOut", "A bit burnt out") }
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Example progress bar: 1/5 completed in overall onboarding */}
        <View style={{ width: "70%", alignSelf: "center" }}>
          <ProgressBar progress={1 / 5} />
        </View>

        <TitleText>{t("self2.title", "How is Life Lately?")}</TitleText>

        <LabelText>
          {t(
            "self2.lifeStatusQuestion",
            "Is life lately going smoothly or feeling a bit off?",
          )}
        </LabelText>
        <RadioButtonGroup
          options={lifeOptionsWithKeys.map(o => o.text)}
          selectedValue={lifeStatusKey ? t(lifeStatusKey as string, "") : ""}
          onValueChange={(value) => {
            const option = lifeOptionsWithKeys.find(o => o.text === value);
            if (option) setLifeStatusKey(option.key as LifeStatusKey);
          }}
        />

        <LabelText>
          {t(
            "self2.workLifeQuestion",
            "Is work/life balance feeling manageable, or is it a bit overwhelming?",
          )}
        </LabelText>
        <RadioButtonGroup
          options={workLifeOptionsWithKeys.map(o => o.text)}
          selectedValue={workLifeKey ? t(workLifeKey as string, "") : ""}
          onValueChange={(value) => {
            const option = workLifeOptionsWithKeys.find(o => o.text === value);
            if (option) setWorkLifeKey(option.key as WorkLifeKey);
          }}
        />

        <LabelText>
          {t("self2.feelingQuestion", "Have you been feeling lately?")}
        </LabelText>
        <RadioButtonGroup
          options={feelingOptionsWithKeys.map(o => o.text)}
          selectedValue={feelingKey ? t(feelingKey as string, "") : ""}
          onValueChange={(value) => {
            const option = feelingOptionsWithKeys.find(o => o.text === value);
            if (option) setFeelingKey(option.key as FeelingKey);
          }}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={t("self2.saveAndProceed", "Save & Proceed")}
          callback={saveResponses}
        />
        <View style={styles.secondaryButtonContainer}>
          <SecondaryButton
            label={t("self2.back", "Back")}
            callback={goBack}
            customStyle={styles.secondaryButton}
          />
          <SecondaryButton
            label={t("self2.skip", "Skip")}
            callback={navigateTo}
            customStyle={styles.secondaryButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Self2;

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
