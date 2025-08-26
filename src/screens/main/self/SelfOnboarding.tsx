import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveData, getData } from "../../../utils/storageUtils";
import { t } from "../../../i18n/locales/i18n";
import PrimaryButton from "../../../components/common/PrimaryButton";
import SecondaryButton from "../../../components/common/SecondaryButton";
import TitleText from "../../../components/common/TitleText";
import LabelText from "../../../components/common/LabelText";
import InputField from "../../../components/common/InputField";
import DatePicker from "../../../components/common/DatePicker";
import RadioButtonGroup from "../../../components/common/RadioButtonGroup";
import HorizontalRadioButtonGroup from "../../../components/common/HorizontalRadioButtonGroup";
import ProgressBar from "../../../components/ProgressBar";

const { height: screenHeight } = Dimensions.get("window");

// Type definitions for all translation keys
type GenderKey = "MALE" | "FEMALE" | "NON_BINARY" | "PREFER_NOT_TO_SAY" | "OTHER";
type LifeStatusKey = "self2.goingSmoothly" | "self2.mostlyOkay" | "self2.feelingBitOff" | "self2.difficult";
type WorkLifeKey = "self2.veryManageable" | "self2.somewhatManageable" | "self2.bitOverwhelming" | "self2.veryOverwhelming";
type FeelingKey = "self2.refreshed" | "self2.bitBurntOut";
type TimeKey = "self3.lessThan1Hour" | "self3.oneToThreeHours" | "self3.threeToFiveHours" | "self3.fivePlusHours";
type EffectKey = "self3.positive" | "self3.neutral" | "self3.sometimesNegative" | "self3.oftenNegative";
type LikelihoodKey = "self4Screen.veryUnlikely" | "self4Screen.unlikely" | "self4Screen.neutral" | "self4Screen.likely" | "self4Screen.veryLikely";
type LikelihoodKey5 = "self5Screen.veryUnlikely" | "self5Screen.unlikely" | "self5Screen.neutral" | "self5Screen.likely" | "self5Screen.veryLikely";

const SelfOnboarding = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5; // 5 self screens only

  // Step 1 (Self1) states
  const [name, setName] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [gender, setGender] = useState<GenderKey | "">("");

  // Step 2 (Self2) states
  const [lifeStatusKey, setLifeStatusKey] = useState<LifeStatusKey | "">("");
  const [workLifeKey, setWorkLifeKey] = useState<WorkLifeKey | "">("");
  const [feelingKey, setFeelingKey] = useState<FeelingKey | "">("");

  // Step 3 (Self3) states
  const [socialMediaTimeKey, setSocialMediaTimeKey] = useState<TimeKey | "">("");
  const [socialMediaEffectKey, setSocialMediaEffectKey] = useState<EffectKey | "">("");

  // Step 4 (Self4) states
  const [irritabilityKey, setIrritabilityKey] = useState<LikelihoodKey | "">("");
  const [muscleTensionKey, setMuscleTensionKey] = useState<LikelihoodKey | "">("");
  const [anxietySleepKey, setAnxietySleepKey] = useState<LikelihoodKey | "">("");

  // Step 5 (Self5) states
  const [response1Key, setResponse1Key] = useState<LikelihoodKey5 | "">("");
  const [response2Key, setResponse2Key] = useState<LikelihoodKey5 | "">("");

  // Gender options
  const GENDER_KEYS = {
    MALE: "MALE",
    FEMALE: "FEMALE",
    NON_BINARY: "NON_BINARY",
    PREFER_NOT_TO_SAY: "PREFER_NOT_TO_SAY",
    OTHER: "OTHER"
  };

  const genderOptionsMap = [
    { key: GENDER_KEYS.MALE, display: t("self1.male", "Male") },
    { key: GENDER_KEYS.FEMALE, display: t("self1.female", "Female") },
    { key: GENDER_KEYS.NON_BINARY, display: t("self1.nonBinary", "Non-binary") },
    { key: GENDER_KEYS.PREFER_NOT_TO_SAY, display: t("self1.preferNotToSay", "Prefer not to say") },
    { key: GENDER_KEYS.OTHER, display: t("self1.otherSpecify", "Other (please specify)") }
  ];

  // Self2 options
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

  // Self3 options
  const timeOptionsWithKeys = [
    { key: "self3.lessThan1Hour", text: t("self3.lessThan1Hour", "Less than 1 hour") },
    { key: "self3.oneToThreeHours", text: t("self3.oneToThreeHours", "1-3 hours") },
    { key: "self3.threeToFiveHours", text: t("self3.threeToFiveHours", "3-5 hours") },
    { key: "self3.fivePlusHours", text: t("self3.fivePlusHours", "5+ hours") }
  ];

  const effectOptionsWithKeys = [
    { key: "self3.positive", text: t("self3.positive", "Positive") },
    { key: "self3.neutral", text: t("self3.neutral", "Neutral") },
    { key: "self3.sometimesNegative", text: t("self3.sometimesNegative", "Sometimes negative") },
    { key: "self3.oftenNegative", text: t("self3.oftenNegative", "Often negative") }
  ];

  // Self4 & Self5 likelihood options
  const likelihoodOptions = [
    t("self4Screen.veryUnlikely", "Very Unlikely"),
    t("self4Screen.unlikely", "Unlikely"),
    t("self4Screen.neutral", "Neutral"),
    t("self4Screen.likely", "Likely"),
    t("self4Screen.veryLikely", "Very Likely")
  ];

  const likelihoodOptions5 = [
    t("self5Screen.veryUnlikely", "Very Unlikely"),
    t("self5Screen.unlikely", "Unlikely"),
    t("self5Screen.neutral", "Neutral"),
    t("self5Screen.likely", "Likely"),
    t("self5Screen.veryLikely", "Very Likely")
  ];

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // Load Self1 data
        const savedData = await getData<{
          name: string;
          dob: string;
          gender: string;
        }>("Self1");
        if (savedData) {
          setName(savedData.name || "");
          setDob(savedData.dob ? new Date(savedData.dob) : null);
          setGender(savedData.gender as GenderKey || "");
        }

        // Load onboarding responses
        const storedResponses = await AsyncStorage.getItem("onboardingResponses");
        if (storedResponses) {
          const parsedResponses = JSON.parse(storedResponses);
          
          // Self2 data
          setLifeStatusKey(parsedResponses.lifeStatusKey || "");
          setWorkLifeKey(parsedResponses.workLifeKey || "");
          setFeelingKey(parsedResponses.feelingKey || "");
          
          // Self3 data
          setSocialMediaTimeKey(parsedResponses.socialMediaTimeKey || "");
          setSocialMediaEffectKey(parsedResponses.socialMediaEffectKey || "");
          
          // Self4 data
          const screen6Responses = parsedResponses.screen6 || {};
          setIrritabilityKey(screen6Responses.irritabilityKey || "");
          setMuscleTensionKey(screen6Responses.muscleTensionKey || "");
          setAnxietySleepKey(screen6Responses.anxietySleepKey || "");
          
          // Self5 data
          const screen11Responses = parsedResponses.screen11 || {};
          setResponse1Key(screen11Responses.overwhelmedKey || "");
          setResponse2Key(screen11Responses.physicalSymptomsKey || "");
        }
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    };
    loadSavedData();
  }, []);

  const calculateScores = () => {
    // Self2 scoring
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

    // Self3 scoring
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

    // Self4 scoring
    const likelihoodWeights: Record<LikelihoodKey, number> = {
      "self4Screen.veryUnlikely": 10,
      "self4Screen.unlikely": 8,
      "self4Screen.neutral": 5,
      "self4Screen.likely": 3,
      "self4Screen.veryLikely": 0
    };

    // Self5 scoring
    const likelihoodWeights5: Record<LikelihoodKey5, number> = {
      "self5Screen.veryUnlikely": 10,
      "self5Screen.unlikely": 8,
      "self5Screen.neutral": 5,
      "self5Screen.likely": 3,
      "self5Screen.veryLikely": 0
    };

    const overwhelmedWeights: Record<LikelihoodKey5, number> = {
      "self5Screen.veryUnlikely": 15,
      "self5Screen.unlikely": 11,
      "self5Screen.neutral": 7,
      "self5Screen.likely": 3,
      "self5Screen.veryLikely": 0
    };

    // Calculate scores
    const self2Score = (lifeStatusKey ? lifeStatusWeights[lifeStatusKey] : 5) +
                      (workLifeKey ? workLifeWeights[workLifeKey] : 5) +
                      (feelingKey ? feelingWeights[feelingKey] : 2.5);
    
    const self3Score = (socialMediaTimeKey ? timeWeights[socialMediaTimeKey] : 5) +
                      (socialMediaEffectKey ? effectWeights[socialMediaEffectKey] : 5);
    
    const self4Score = (irritabilityKey ? likelihoodWeights[irritabilityKey] : 5) +
                      (muscleTensionKey ? likelihoodWeights[muscleTensionKey] : 5) +
                      (anxietySleepKey ? likelihoodWeights[anxietySleepKey] : 5);
    
    const self5Score = (response1Key ? overwhelmedWeights[response1Key] : 7.5) +
                      (response2Key ? likelihoodWeights5[response2Key] : 5);

    const totalOnboardingScore = self2Score + self3Score + self4Score + self5Score;

    return {
      self2Score,
      self3Score,
      self4Score,
      self5Score,
      totalOnboardingScore
    };
  };

  const handleNext = async () => {
    try {
      const scores = calculateScores();

      if (currentStep === 1) {
        // Save Self1 data
        const data = {
          name,
          dob: dob ? dob.toISOString() : "",
          gender,
        };
        await saveData("Self1", data);
        
        // Save to profile storage
        const profileData = {
          name: name || "User",
          imageUri: null,
          avatarGender: null,
          avatarIndex: null,
          selectedGender: gender
        };
        await AsyncStorage.setItem("profile_v1", JSON.stringify(profileData));

      } else if (currentStep === 2) {
        // Save Self2 data
        const responses = {
          lifeStatusKey,
          workLifeKey,
          feelingKey,
          self2Score: scores.self2Score,
          self2RawScore: scores.self2Score
        };
        const storedResponses = await AsyncStorage.getItem("onboardingResponses");
        const parsedResponses = storedResponses ? JSON.parse(storedResponses) : {};
        await AsyncStorage.setItem("onboardingResponses", JSON.stringify({
          ...parsedResponses,
          ...responses
        }));

      } else if (currentStep === 3) {
        // Save Self3 data
        const responses = {
          socialMediaTimeKey,
          socialMediaEffectKey,
          self3Score: scores.self3Score,
          self3RawScore: scores.self3Score
        };
        const storedResponses = await AsyncStorage.getItem("onboardingResponses");
        const parsedResponses = storedResponses ? JSON.parse(storedResponses) : {};
        await AsyncStorage.setItem("onboardingResponses", JSON.stringify({
          ...parsedResponses,
          ...responses
        }));

      } else if (currentStep === 4) {
        // Save Self4 data
        const responses = {
          screen6: {
            irritabilityKey,
            muscleTensionKey,
            anxietySleepKey
          },
          self4Score: scores.self4Score,
          self4RawScore: scores.self4Score
        };
        const storedResponses = await AsyncStorage.getItem("onboardingResponses");
        const parsedResponses = storedResponses ? JSON.parse(storedResponses) : {};
        await AsyncStorage.setItem("onboardingResponses", JSON.stringify({
          ...parsedResponses,
          ...responses
        }));

      } else if (currentStep === 5) {
        // Save Self5 data and final score
        const responses = {
          screen11: {
            overwhelmedKey: response1Key,
            physicalSymptomsKey: response2Key
          },
          self5Score: scores.self5Score,
          self5RawScore: scores.self5Score,
          overallScore: scores.totalOnboardingScore
        };
        const storedResponses = await AsyncStorage.getItem("onboardingResponses");
        const parsedResponses = storedResponses ? JSON.parse(storedResponses) : {};
        await AsyncStorage.setItem("onboardingResponses", JSON.stringify({
          ...parsedResponses,
          ...responses
        }));
      }

      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Complete onboarding - go to thank you screen
        // @ts-ignore
        navigation.navigate("SelfThankYou");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View>
            <TitleText>{t("self1.title", "Let's get to know you!!")}</TitleText>
            
            <LabelText>{t("self1.nameQuestion", "What should we call you?")}</LabelText>
            <InputField
              placeholder=""
              value={name}
              onChangeText={setName}
              accessibilityLabel={t("self1.nameInput", "Name Input")}
            />

            <LabelText>{t("self1.dobQuestion", "What is your DOB?")}</LabelText>
            <DatePicker
              date={dob}
              onDateChange={(_, selectedDate) => selectedDate && setDob(selectedDate)}
            />

            <LabelText>{t("self1.genderQuestion", "What gender do you identify with?")}</LabelText>
            <RadioButtonGroup
              options={genderOptionsMap.map(g => g.display)}
              selectedValue={gender ? (genderOptionsMap.find(g => g.key === gender)?.display || "") : ""}
              onValueChange={(value) => {
                const selectedOption = genderOptionsMap.find(g => g.display === value);
                setGender(selectedOption?.key as GenderKey || "");
              }}
            />
          </View>
        );

      case 2:
        return (
          <View>
            <TitleText>{t("self2.title", "How is Life Lately?")}</TitleText>
            
            <LabelText>{t("self2.lifeStatusQuestion", "Is life lately going smoothly or feeling a bit off?")}</LabelText>
            <RadioButtonGroup
              options={lifeOptionsWithKeys.map(o => o.text)}
              selectedValue={lifeStatusKey ? t(lifeStatusKey as string, "") : ""}
              onValueChange={(value) => {
                const option = lifeOptionsWithKeys.find(o => o.text === value);
                if (option) setLifeStatusKey(option.key as LifeStatusKey);
              }}
            />

            <LabelText>{t("self2.workLifeQuestion", "Is work/life balance feeling manageable, or is it a bit overwhelming?")}</LabelText>
            <RadioButtonGroup
              options={workLifeOptionsWithKeys.map(o => o.text)}
              selectedValue={workLifeKey ? t(workLifeKey as string, "") : ""}
              onValueChange={(value) => {
                const option = workLifeOptionsWithKeys.find(o => o.text === value);
                if (option) setWorkLifeKey(option.key as WorkLifeKey);
              }}
            />

            <LabelText>{t("self2.feelingQuestion", "Have you been feeling lately?")}</LabelText>
            <RadioButtonGroup
              options={feelingOptionsWithKeys.map(o => o.text)}
              selectedValue={feelingKey ? t(feelingKey as string, "") : ""}
              onValueChange={(value) => {
                const option = feelingOptionsWithKeys.find(o => o.text === value);
                if (option) setFeelingKey(option.key as FeelingKey);
              }}
            />
          </View>
        );

      case 3:
        return (
          <View>
            <TitleText>{t("self3.title", "Digital Wellbeing")}</TitleText>
            
            <LabelText>{t("self3.timeQuestion", "How much time do you spend on social media daily?")}</LabelText>
            <RadioButtonGroup
              options={timeOptionsWithKeys.map(o => o.text)}
              selectedValue={socialMediaTimeKey ? t(socialMediaTimeKey as string, "") : ""}
              onValueChange={(value) => {
                const option = timeOptionsWithKeys.find(o => o.text === value);
                if (option) setSocialMediaTimeKey(option.key as TimeKey);
              }}
            />

            <LabelText>{t("self3.effectQuestion", "How does social media generally make you feel?")}</LabelText>
            <RadioButtonGroup
              options={effectOptionsWithKeys.map(o => o.text)}
              selectedValue={socialMediaEffectKey ? t(socialMediaEffectKey as string, "") : ""}
              onValueChange={(value) => {
                const option = effectOptionsWithKeys.find(o => o.text === value);
                if (option) setSocialMediaEffectKey(option.key as EffectKey);
              }}
            />
          </View>
        );

      case 4:
        return (
          <View>
            <TitleText>{t("self4Screen.title", "Physical & Emotional Indicators")}</TitleText>
            
            <LabelText>{t("self4Screen.irritabilityQuestion", "How likely are you to feel irritable or on edge?")}</LabelText>
            <HorizontalRadioButtonGroup
              options={likelihoodOptions}
              selectedValue={irritabilityKey ? t(irritabilityKey as string, "") : ""}
              onValueChange={(value) => {
                const keys: LikelihoodKey[] = ["self4Screen.veryUnlikely", "self4Screen.unlikely", "self4Screen.neutral", "self4Screen.likely", "self4Screen.veryLikely"];
                const index = likelihoodOptions.indexOf(value);
                if (index !== -1) setIrritabilityKey(keys[index]);
              }}
            />

            <LabelText>{t("self4Screen.muscleTensionQuestion", "How likely are you to experience muscle tension?")}</LabelText>
            <HorizontalRadioButtonGroup
              options={likelihoodOptions}
              selectedValue={muscleTensionKey ? t(muscleTensionKey as string, "") : ""}
              onValueChange={(value) => {
                const keys: LikelihoodKey[] = ["self4Screen.veryUnlikely", "self4Screen.unlikely", "self4Screen.neutral", "self4Screen.likely", "self4Screen.veryLikely"];
                const index = likelihoodOptions.indexOf(value);
                if (index !== -1) setMuscleTensionKey(keys[index]);
              }}
            />

            <LabelText>{t("self4Screen.anxietySleepQuestion", "How likely are you to have difficulty sleeping due to anxiety?")}</LabelText>
            <HorizontalRadioButtonGroup
              options={likelihoodOptions}
              selectedValue={anxietySleepKey ? t(anxietySleepKey as string, "") : ""}
              onValueChange={(value) => {
                const keys: LikelihoodKey[] = ["self4Screen.veryUnlikely", "self4Screen.unlikely", "self4Screen.neutral", "self4Screen.likely", "self4Screen.veryLikely"];
                const index = likelihoodOptions.indexOf(value);
                if (index !== -1) setAnxietySleepKey(keys[index]);
              }}
            />
          </View>
        );

      case 5:
        return (
          <View>
            <TitleText>{t("self5Screen.title", "Stress & Physical Symptoms")}</TitleText>
            
            <LabelText>{t("self5Screen.overwhelmedQuestion", "How likely are you to feel overwhelmed by daily tasks?")}</LabelText>
            <HorizontalRadioButtonGroup
              options={likelihoodOptions5}
              selectedValue={response1Key ? t(response1Key as string, "") : ""}
              onValueChange={(value) => {
                const keys: LikelihoodKey5[] = ["self5Screen.veryUnlikely", "self5Screen.unlikely", "self5Screen.neutral", "self5Screen.likely", "self5Screen.veryLikely"];
                const index = likelihoodOptions5.indexOf(value);
                if (index !== -1) setResponse1Key(keys[index]);
              }}
            />

            <LabelText>{t("self5Screen.physicalSymptomsQuestion", "How likely are you to experience physical symptoms of stress?")}</LabelText>
            <HorizontalRadioButtonGroup
              options={likelihoodOptions5}
              selectedValue={response2Key ? t(response2Key as string, "") : ""}
              onValueChange={(value) => {
                const keys: LikelihoodKey5[] = ["self5Screen.veryUnlikely", "self5Screen.unlikely", "self5Screen.neutral", "self5Screen.likely", "self5Screen.veryLikely"];
                const index = likelihoodOptions5.indexOf(value);
                if (index !== -1) setResponse2Key(keys[index]);
              }}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <ProgressBar progress={currentStep / totalSteps} />
        </View>

        {renderStep()}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={currentStep === totalSteps ? t("common.complete", "Complete") : t("common.saveAndProceed", "Save & Proceed")}
          callback={handleNext}
        />
        
        {currentStep < totalSteps && (
          <View style={styles.secondaryButtonContainer}>
            <SecondaryButton
              label={t("common.back", "Back")}
              callback={handleBack}
              customStyle={styles.secondaryButton}
            />
            {currentStep > 1 && (
              <SecondaryButton
                label={t("common.skip", "Skip")}
                callback={handleSkip}
                customStyle={styles.secondaryButton}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SelfOnboarding;

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
  progressBarContainer: {
    width: "70%",
    alignSelf: "center",
    marginBottom: 20,
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
    marginTop: 10,
  },
  secondaryButton: {
    width: "48%",
  },
  thankYouContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  thankYouTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  thankYouMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    lineHeight: 24,
  },
});
