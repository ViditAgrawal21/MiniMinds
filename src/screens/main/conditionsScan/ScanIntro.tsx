import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import PrimaryButton from "@/components/common/PrimaryButton";
import { t } from "@/i18n/locales/i18n"; // Import the i18n and t function
import { useLanguage } from "@/context/LanguageContext"; // Import language context
import { RootStackParamList } from "@/navigation/types";

const { height: screenHeight } = Dimensions.get("window");

type ScanIntroScreenProps = NativeStackScreenProps<RootStackParamList, 'ScanIntro'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Static data with scan names and question screens
const scanData = [
  { name: "Addictions", questionScreen: "addictionsQuestion" },
  { name: "Anger Management", questionScreen: "angerManagementQuestion" },
  { name: "Common Psychological Issues", questionScreen: "commonPsychologicalIssuesQuestion" },
  { name: "Environment Issues Affecting Mental Wellbeing", questionScreen: "environmentIssuesAffectingMentalWellbeingQuestion" },
  { name: "Family and Relationship", questionScreen: "familyIssuesQuestion" },
  { name: "Financial Mental Health", questionScreen: "financialMentalHealthQuestion" },
  { name: "General Physical Fitness", questionScreen: "generalPhysicalFitnessQuestion" },
  { name: "Internet and Social Media Issue", questionScreen: "internetAndSocialMediaQuestion" },
  { name: "Internet Dependence", questionScreen: "internetDependenceQuestion" },
  { name: "Professional Mental Health", questionScreen: "professionalMentalHealthQuestion" },
  { name: "Sex Life", questionScreen: "sexLifeQuestion" },
  { name: "Sleep", questionScreen: "sleepQuestion" },
  { name: "Social Mental Health", questionScreen: "socialMentalHealthQuestion" },
  { name: "Stress", questionScreen: "stressQuestion" },
  { name: "Suicidal Behaviour", questionScreen: "suicidalBehaviorQuestion" },
  { name: "Youngster Issues", questionScreen: "youngsterIssuesQuestion" },
];

// Translation key mappings
const translationKeys: { [key: string]: string } = {
  "Addictions": "addictions",
  "Anger Management": "angerManagement", 
  "Common Psychological Issues": "commonPsychologicalIssues",
  "Environment Issues Affecting Mental Wellbeing": "environmentIssuesAffectingMentalWellbeing",
  "Family and Relationship": "familyAndRelationship",
  "Financial Mental Health": "financialMentalHealth", 
  "General Physical Fitness": "generalPhysicalFitness",
  "Internet and Social Media Issue": "internetAndSocialMediaIssue",
  "Internet Dependence": "internetDependence",
  "Professional Mental Health": "professionalMentalHealth",
  "Sex Life": "sexLife",
  "Sleep": "sleep",
  "Social Mental Health": "socialMentalHealth", 
  "Stress": "stress",
  "Suicidal Behaviour": "suicidalBehaviour",
  "Youngster Issues": "youngsterIssues"
};

export default function ScanIntro() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScanIntroScreenProps['route']>();
  const { scanName } = route.params || {};
  const { locale } = useLanguage(); // Get current locale from context
  
  console.log("ScanIntro scanName", scanName);
  console.log("Current locale:", locale);
  
  // Debug - test a simple translation
  console.log("Test translation for addictions title:", t("scanIntro.addictions.title"));
  console.log("Test translation for scanIntro.ui.questionsCount:", t("scanIntro.ui.questionsCount"));
  
  // Find the scan data
  const scanInfo = scanData.find((item) => item.name === scanName);
  
  // Get translation key for this scan
  const translationKey = translationKeys[scanName || ""];
  
  // Get translated data - these calls happen at render time and depend on locale
  const translatedTitle = translationKey 
    ? t(`scanIntro.${translationKey}.title`) 
    : scanName;
  const translatedOverview = translationKey 
    ? t(`scanIntro.${translationKey}.overview`) 
    : "";
  
  const dataForUI = {
    name: scanName,
    title: translatedTitle,
    overview: translatedOverview,
    questionScreen: scanInfo?.questionScreen,
  };
  
  console.log("Translated data:", dataForUI);

  /** Go to the first question screen in this scan */
  function handleTakeTest() {
    // Get the questionScreen from dataForUI to know which question set to load
    if (dataForUI && dataForUI.questionScreen) {
      // @ts-ignore – screen is auto‑registered elsewhere
      navigation.navigate("ScanQuestions", {
        scanName: scanName,
        questionScreen: dataForUI.questionScreen,
      });
    } else {
      console.error("Error: Could not find questionScreen for scan:", scanName);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>{dataForUI.title}</Text>
        </View>

        {/* One‑liner description */}
        {/* <Text style={styles.description}>
          {ScreenIntroData[currentIntroScreenIndex].title}
        </Text> */}

        {/* Info boxes */}
        <View style={styles.infoContainer}>
          {/* Questions */}
          <View style={styles.infoBox}>
            <Text style={styles.infoNumber}>{t("scanIntro.ui.questionsCount")}</Text>
            <Text style={styles.infoLabel}>{t("scanIntro.ui.questionsLabel")}</Text>
          </View>

          {/* Approximate time */}
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.infoNumber}>{t("scanIntro.ui.timeCount")}</Text>
              <Text style={styles.infoLabelPurple}>{t("scanIntro.ui.timeUnit")}</Text>
            </View>
            <Text style={styles.infoSmallLabel}>{t("scanIntro.ui.timeLabel")}</Text>
          </View>
        </View>

        {/* Overview from markdown */}
        <Text style={styles.sectionTitle}>{t("scanIntro.ui.overviewTitle")}</Text>
        <Text style={styles.overviewText}>{dataForUI.overview}</Text>

        {/* CTA */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            label={t("scanIntro.ui.takeTestButton")}
            callback={handleTakeTest}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },

  header: {
    backgroundColor: "#AB47BC",
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Poppins-semibold",
    color: "#FFF",
  },

  description: {
    fontSize: 13,
    fontFamily: "Poppins-regular",
    color: "#4A4A4A",
    textAlign: "center",
    lineHeight: 20,
    padding: 20,
    backgroundColor: "#FFF",
    marginBottom: 20,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  infoBox: {
    width: 160,
    height: 150,
    backgroundColor: "#FFF",
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  infoNumber: {
    fontSize: 46,
    fontFamily: "Poppins-Medium",
    color: "#D27AD5",
  },
  infoLabel: {
    fontSize: 15,
    fontFamily: "Poppins-regular",
    color: "#4A4A4A",
    marginTop: 10,
  },
  infoRow: { flexDirection: "row", alignItems: "baseline" },
  infoLabelPurple: {
    fontSize: 16,
    fontFamily: "Poppins-regular",
    color: "#D27AD5",
    marginLeft: 5,
  },
  infoSmallLabel: {
    fontSize: 15,
    fontFamily: "Poppins-regular",
    color: "#4A4A4A",
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#4A4A4A",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  overviewText: {
    fontSize: 13,
    fontFamily: "Poppins-regular",
    color: "#4A4A4A",
    lineHeight: 20,
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  buttonContainer: {
    height: screenHeight * 0.15,
    justifyContent: "center",
    marginTop: 20,
  },
});
