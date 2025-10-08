// Updated ScanIntro.tsx - Dynamic Intro Loading
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import PrimaryButton from "@/components/common/PrimaryButton";
import { t } from "@/i18n/locales/i18n";
import { useLanguage } from "@/context/LanguageContext";
import i18n from "@/i18n/locales/i18n";
import { RootStackParamList } from "@/navigation/types";
import { questionDataLoader } from "@/data/questionData";

const { height: screenHeight } = Dimensions.get("window");

type ScanIntroScreenProps = NativeStackScreenProps<RootStackParamList, 'ScanIntro'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Dynamic scan data - loaded from question database
const getScanData = () => {
  const allScans = questionDataLoader.getAllScanNames();
  
  return allScans.map(scanName => {
    const normalized = scanName
      .split(' ')
      .map((word, idx) => 
        idx === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('')
      .replace(/[^a-zA-Z0-9]/g, '');
    
    return {
      name: scanName,
      questionScreen: `${normalized}Question`
    };
  });
};

// Dynamic translation keys - generated from scan names
const getTranslationKeys = (): { [key: string]: string } => {
  const allScans = questionDataLoader.getAllScanNames();
  const keys: { [key: string]: string } = {};
  
  allScans.forEach(scanName => {
    const normalized = scanName
      .split(' ')
      .map((word, idx) => 
        idx === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('')
      .replace(/[^a-zA-Z0-9]/g, '');
    
    keys[scanName] = normalized;
  });
  
  return keys;
};

export default function ScanIntro() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScanIntroScreenProps['route']>();
  const { scanName } = route.params || {};
  // Try to read locale from LanguageProvider; if the provider isn't mounted
  // fall back to the i18n singleton language to avoid runtime errors.
  let locale = i18n?.language || 'en';
  try {
    const maybe = useLanguage();
    if (maybe && maybe.locale) {
      locale = maybe.locale;
    }
  } catch (e) {
    // If useLanguage throws because provider is missing, we already have a safe fallback.
  }
  
  console.log("ScanIntro scanName", scanName);
  console.log("Current locale:", locale);
  
  // Get scan data dynamically
  const scanData = getScanData();
  const translationKeys = getTranslationKeys();
  
  // Find the scan info
  const scanInfo = scanData.find((item) => item.name === scanName);
  
  // Get translation key for this scan
  const translationKey = translationKeys[scanName || ""];
  
  // Get intro data from the loader
  const introData = questionDataLoader.getIntroData(scanName || "");
  
  const dataForUI = {
    name: scanName,
    title: introData?.title || scanName || "",
    overview: introData?.overview || "",
    questionScreen: scanInfo?.questionScreen,
  };
  
  console.log("Translated data:", dataForUI);

  /** Go to the first question screen in this scan */
  function handleTakeTest() {
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

        {/* Info boxes */}
        <View style={styles.infoContainer}>
          {/* Questions */}
            <View style={styles.infoBox}>
              <Text style={styles.infoNumber}>
                {/* Compute question count from the question data structure */}
                {(() => {
                  try {
                    const qsets = questionDataLoader.getQuestionsForScan(scanName || "", locale);
                    if (Array.isArray(qsets) && qsets.length > 0) {
                      // qsets[0] is an object where the value is the array of question pairs
                      const firstSet = qsets[0];
                      const pairs = Object.values(firstSet)[0] as any[];
                      const count = (pairs || []).reduce((sum, pair) => sum + (Array.isArray(pair) ? pair.length : 0), 0);
                      return String(count);
                    }
                  } catch (e) {
                    // fallback
                    console.warn('Could not compute question count for', scanName, e);
                  }
                  return '0';
                })()}
              </Text>
              <Text style={styles.infoLabel}>{t("scanIntro.ui.questionsLabel", "Questions")}</Text>
            </View>

            {/* Approximate time */}
            <View style={styles.infoBox}>
              <View style={styles.infoRow}>
                <Text style={styles.infoNumber}>
                  {(() => {
                    try {
                      const qsets = questionDataLoader.getQuestionsForScan(scanName || "", locale);
                      if (Array.isArray(qsets) && qsets.length > 0) {
                        const firstSet = qsets[0];
                        const pairs = Object.values(firstSet)[0] as any[];
                        const count = (pairs || []).reduce((sum, pair) => sum + (Array.isArray(pair) ? pair.length : 0), 0);
                        // Estimate 30 seconds per question
                        const secondsPerQuestion = 30;
                        const totalSeconds = Math.max(0, count * secondsPerQuestion);
                        const minutes = Math.max(1, Math.round(totalSeconds / 60));
                        return String(minutes);
                      }
                    } catch (e) {
                      console.warn('Could not compute estimated time for', scanName, e);
                    }
                    return '1';
                  })()}
                </Text>
                <Text style={styles.infoLabelPurple}>{t("scanIntro.ui.timeUnit", "min")}</Text>
              </View>
              <Text style={styles.infoSmallLabel}>{t("scanIntro.ui.timeLabel", "Approx time")}</Text>
            </View>
        </View>

        {/* Overview */}
  <Text style={styles.sectionTitle}>{t("scanIntro.ui.overviewTitle", "Overview")}</Text>
        <Text style={styles.overviewText}>{dataForUI.overview}</Text>

        {/* CTA */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            label={t("scanIntro.ui.takeTestButton", "Take Test")}
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