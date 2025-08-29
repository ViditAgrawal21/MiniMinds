import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  Platform,
  Button,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Share from "react-native-share";
import { t } from "@/i18n/locales/i18n"; // Import the translation function
import { getTranslatedScanName } from "../../../utils/scanNameTranslations"; // Import the shared translation utility
import {
  saveScanResultBasic as saveScanResult,
  getScanResultsHistory,
} from "@/services/database"; // Import the saveScanResult, and getScanResultsHistory functions
import { testDatabaseSave, logDatabaseInfo } from "@/utils/databaseDebug";

import RecommendedInterventions from "./../../../components/RecommendedInterventions";
import PrimaryButton from "./../../../components/common/PrimaryButton";
import SecondaryButton from "./../../../components/common/SecondaryButton";
import { interventionsData } from "@/components/interventionScanDBCall";
import { SafeAreaView } from "react-native-safe-area-context";

// Type definitions for intervention images
type InterventionImageSet = {
  primary: any;
  secondary: any;
  tertiary: any;
};

type InterventionImages = {
  [key: string]: InterventionImageSet;
};

// ────────────────────────────────────────────────────────────────
// Custom images for Primary / Secondary / Tertiary interventions
// (Fourth "Call a Professional" card keeps its default image)
// ────────────────────────────────────────────────────────────────
const defaultImages: InterventionImageSet = {
  primary: require("../../../assets/images/watchman.png"),
  secondary: require("../../../assets/images/watchman.png"),
  tertiary: require("../../../assets/images/watchman.png"),
};

const interventionImages: InterventionImages = {
  Addictions: {
    primary: require("../../../assets/images/interventionsimages/Addictions/50kb images/primaryinterventionaddictionsunderstandingaddictionaddictions.jpg"),
    secondary: require("../../../assets/images/interventionsimages/Addictions/50kb images/secondaryinterventionaddictions.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/Addictions/50kb images/tertiaryinterventionaddictions.jpg"),
  },
  "Internet and Social Media Issue": {
    primary: require("../../../assets/images/interventionsimages/InternetandSocialMediaIssue/50kb images/primaryinterventioninternetandsocialmediaissuescyberbullyingdedruzinufbnslevugmlluuniilcouoaiallonletiginternetandsocialmediaissue.jpg"),
    secondary: require("../../../assets/images/interventionsimages/InternetandSocialMediaIssue/50kb images/secondaryinterventioninternetandsocialmediaissue.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/InternetandSocialMediaIssue/50kb images/tertiaryinterventioninternetandsocialmediaissue.jpg"),
  },
  "Professional Mental Health": {
    primary: require("../../../assets/images/interventionsimages/ProfessionalMentalHealth/50kb images/primaryinterventionprofessionalmentalhealth.jpg"),
    secondary: require("../../../assets/images/interventionsimages/ProfessionalMentalHealth/50kb images/secondaryinterventionprofessionalmentalhealth.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/ProfessionalMentalHealth/50kb images/tertiaryinterventionprofessionalmentalhealth5professionalmentalhealth.jpg"),
  },
  "Sex Life": {
    primary: require("../../../assets/images/interventionsimages/SexLife/50kb images/primaryinterventionsexlifecommunicationshaicenidconsentcontraceptioncomfortcomfortsexlife.jpg"),
    secondary: require("../../../assets/images/interventionsimages/SexLife/50kb images/secondaryinterventionsexlifevutevicicsexlife.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/SexLife/50kb images/tertiaryinterventionsexlife.jpg"),
  },
  "Social Mental Health": {
    primary: require("../../../assets/images/interventionsimages/SocialMentalHealth/50kb images/primaryinterventionsocialmentalhealth.jpg"),
    secondary: require("../../../assets/images/interventionsimages/SocialMentalHealth/50kb images/secondaryinterventionhealthmentalsocialsocialmentalhealth.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/SocialMentalHealth/50kb images/tertiaryinterventionsocialmentalhealth.jpg"),
  },
  "Suicidal Behaviour": {
    primary: require("../../../assets/images/interventionsimages/suicidalbehavior/50kb images/primaryinterventionsuicidalbehavior.jpg"),
    secondary: require("../../../assets/images/interventionsimages/suicidalbehavior/50kb images/secondaryinterventionsuicidalbehavior.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/suicidalbehavior/50kb images/tertiaryinterventionsuicidalbehavior1suicidalbehavior.jpg"),
  },
  "Youngster Issues": {
    primary: require("../../../assets/images/interventionsimages/YoungsterIssues/50kb images/primaryiintervent710youngsterissues.jpg"),
    secondary: require("../../../assets/images/interventionsimages/YoungsterIssues/50kb images/secondaryinterventionyoungsterissues.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/YoungsterIssues/50kb images/tertiaryinterventionyoungsterissues.jpg"),
  },
  Stress: {
    primary: require("../../../assets/images/interventionsimages/Stress/50kb images/primaryinterventioncareerrelatedstress.jpg"),
    secondary: require("../../../assets/images/interventionsimages/Stress/50kb images/secondaryinterventionstress.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/Stress/50kb images/tertiaryinterventioncareerrelatedstress.jpg"),
  },
  Sleep: {
    primary: require("../../../assets/images/interventionsimages/Sleep/50kb images/primarvinterventionnonorganicsleepdisorderunspecified4cstcausesoftreatmentsisordersoptionscausesleep.jpg"),
    secondary: require("../../../assets/images/interventionsimages/Sleep/50kb images/secondaryinterventioasleepzzzsleep.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/Sleep/50kb images/tertiaryinterventionsleep.jpg"),
  },
  "Internet Dependence": {
    primary: require("../../../assets/images/interventionsimages/InternetDependence/50kb images/primaryinterventioninternetdependence.jpg"),
    secondary: require("../../../assets/images/interventionsimages/InternetDependence/50kb images/secondaryinterventioninternetdependenceaguideforparentsandeducatorsgetyourfreecopynowinternetdependence.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/InternetDependence/50kb images/tertiaryinterventioninternetsocialmediadependencyinternetdependence.jpg"),
  },
  "General Physical Fitness": {
    primary: require("../../../assets/images/interventionsimages/GeneralPhysicalFitness/50kb images/primaryinterventiongeneralphysicalfitness.jpg"),
    secondary: require("../../../assets/images/interventionsimages/GeneralPhysicalFitness/50kb images/secondaryinterventiongeneralphysicalfitness.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/GeneralPhysicalFitness/50kb images/tertiaryinterventiongeneralphysicalfitness.jpg"),
  },
  "Financial Mental Health": {
    primary: require("../../../assets/images/interventionsimages/FinancialMentalHealth/50kb images/primaryinterventionfinancialinstabilitymentalhealthfinancialmentalhealth.jpg"),
    secondary: require("../../../assets/images/interventionsimages/FinancialMentalHealth/50kb images/secondaryinterventionfinancialinstabilitymentalhealthfinancialmentalhealth.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/FinancialMentalHealth/50kb images/tertiaryintervemtionfinancialinstabilitymentalhealthfinancialmentalhealth.jpg"),
  },
  "Family and Relationship": {
    primary: require("../../../assets/images/interventionsimages/FamilyandRelaitonship/50kb images/primaryinterventionfamilyandrelationshifamilyandrelaitonship.jpg"),
    secondary: require("../../../assets/images/interventionsimages/FamilyandRelaitonship/50kb images/secondaryinterventionforfamilyandrelationshiptfamilyandrelaitonship.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/FamilyandRelaitonship/50kb images/tertiaryinterventionforfamilyandrelationshipripfamilyandrelaitonship.jpg"),
  },
  "Environment Issues": {
    primary: require("../../../assets/images/interventionsimages/EnvironmentIssuesaffectingmentalwellbeing/50kb images/primaryinterventionenvironmentaffectingmentalwellbeienvironmentissuesaffectingmentalwellbeing.jpg"),
    secondary: require("../../../assets/images/interventionsimages/EnvironmentIssuesaffectingmentalwellbeing/50kb images/secondaryinterventionenvironmentissuesaffectingmentalwellbeingvenvironmentissuesaffectingmentalwellbeing.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/EnvironmentIssuesaffectingmentalwellbeing/50kb images/tertiaryinterventionenvironnnmentissuesaffectingmentalwellbeienvironmentissuesaffectingmentalwellbeing.jpg"),
  },
  "Common Psychological Issues": {
    primary: require("../../../assets/images/interventionsimages/CommonPsychologicalIssues/50kb images/primaryinterventioncommonpsychologicalissuesakhdanxietyvihsdoreledepressioneejijojodptsdbodnoosderoccdbicommonpsychologicalissues.jpg"),
    secondary: require("../../../assets/images/interventionsimages/CommonPsychologicalIssues/50kb images/secondaryinterventioncommonpsychologicalissuesanxietydepressiontraumaphobiascommonpsychologicalissues.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/CommonPsychologicalIssues/50kb images/tertiaryinterventioncommonpsychologicalissues.jpg"),
  },
  "Anger Management": {
    primary: require("../../../assets/images/interventionsimages/AngerManagement/50kb images/primaryinterventionangermanagement.jpg"),
    secondary: require("../../../assets/images/interventionsimages/AngerManagement/50kb images/secondaryinterventionangermanagement.jpg"),
    tertiary: require("../../../assets/images/interventionsimages/AngerManagement/50kb images/tertiaryinterventionangermanagement.jpg"),
  },
};

const getInterventionImages = (scanName: string): InterventionImageSet => {
  if (!scanName) return defaultImages;

  // Try exact match first
  if (interventionImages[scanName]) {
    return interventionImages[scanName];
  }

  // Try case-insensitive match
  const normalizedScanName = scanName.toLowerCase();
  const matchingKey = Object.keys(interventionImages).find(
    (key) => key.toLowerCase() === normalizedScanName,
  );

  if (matchingKey) {
    return interventionImages[matchingKey];
  }

  console.warn(`No matching images found for scan name: ${scanName}`);
  return defaultImages;
};

// Type definitions for navigation
type ScanResultNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScanResult'>;
type ScanResultRouteProp = RouteProp<RootStackParamList, 'ScanResult'>;

export interface ScanResultScreenProps {
  navigation: ScanResultNavigationProp;
  route: ScanResultRouteProp;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// 4‑band category helper
function getCategory(score: number, conditionName?: string) {
  if (score <= 25) {
    return {
      rangeLabel: t("scanResult.scoreCategories.normal.range"),
      heading: t("scanResult.scoreCategories.normal.label"),
      paragraph: t("scanResult.scoreCategories.normal.description"),
    };
  } else if (score <= 50) {
    return {
      rangeLabel: t("scanResult.scoreCategories.low.range"),
      heading: t("scanResult.scoreCategories.low.label"),
      paragraph: t("scanResult.scoreCategories.low.description"),
    };
  } else if (score <= 75) {
    return {
      rangeLabel: t("scanResult.scoreCategories.moderate.range"),
      heading: t("scanResult.scoreCategories.moderate.label"),
      paragraph: t("scanResult.scoreCategories.moderate.description", {
        conditionName: conditionName || t("scanResult.ui.defaultConditionName"),
      }),
    };
  } else {
    return {
      rangeLabel: t("scanResult.scoreCategories.severe.range"),
      heading: t("scanResult.scoreCategories.severe.label"),
      paragraph: t("scanResult.scoreCategories.severe.description", {
        conditionName: conditionName || t("scanResult.ui.defaultConditionName"),
      }),
    };
  }
}

export default function AddictionScanResult() {
  const navigation = useNavigation<ScanResultNavigationProp>();
  const route = useRoute<ScanResultRouteProp>();
  const { scanName, totalScore } = route.params || {};

  // Safety check for required parameters
  if (!scanName || totalScore === undefined) {
    console.error("ScanResult: scanName and totalScore are required but not provided");
    return null;
  }

  //   if (!answersSoFar) {
  //     return (
  //       <ScrollView contentContainerStyle={styles.container}>
  //         <Text style={styles.infoText}>
  //           No answers provided. Please complete the questionnaire.
  //         </Text>
  //       </ScrollView>
  //     );
  //   }

  // Final score & category
  //   const rawTotal = Object.values(answersSoFar).reduce(
  //     (sum, n) => sum + (typeof n === "number" ? n : 0),
  //     0,
  //   );
  //   const totalScore = computeFinalScore(rawTotal);
  const categoryInfo = getCategory(
    totalScore ?? 0,
    getTranslatedScanName(scanName || ""),
  );

  // Show modal for all score ranges
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (totalScore !== undefined && totalScore !== null) setModalVisible(true);
  }, [totalScore]);

  // Reset modal state when screen comes into focus (returning from strategy screens)
  useFocusEffect(
    React.useCallback(() => {
      console.log("ScanResult screen focused - resetting states");
      // Don't reset modalVisible here as it should show on first load
      // But ensure any stuck modals are cleared on subsequent visits
    }, [])
  );

  // Progress‑chart data
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);
  const [filteredInterventions, setFilteredInterventions] = useState<any>(null);

  // Paging state (show 4 at a time)
  const PAGE_SIZE = 4;
  const [page, setPage] = useState(0);

  // Get interventions based on scan name and score
  useEffect(() => {
    if (scanName && totalScore !== undefined) {
      console.log("Finding interventions for:", scanName, "Score:", totalScore);

      // Helper function to normalize strings for better matching
      const normalizeString = (str: string) => {
        if (!str) return "";
        return str
          .toLowerCase()
          .replace(/\s+/g, "") // Remove all spaces
          .replace(/[^a-z0-9]/g, ""); // Remove non-alphanumeric
      };

      // Enhanced scan name to condition mapping
      const getScanNameMapping = (scanName: string): string => {
        // Direct mappings for exact matches
        const directMappings: Record<string, string> = {
          Addictions: "Addictions",
          "Anger Management": "Anger Management",
          "Common Psychological Issues": "Common Psychological Issues",
          "Common Psychological": "Common Psychological Issues",
          "Environment Issues": "Environment Issues",
          "Family and Relationship": "Family and Relationship",
          "Family & Relationship": "Family and Relationship",
          "Financial Mental Health": "Financial Mental Health",
          "General Physical Fitness": "General Physical Fitness",
          "Physical Fitness": "General Physical Fitness",
          "Internet and Social Media Issue": "Internet and Social Media Issue",
          "Internet & Social Media": "Internet and Social Media Issue",
          "Internet Social Media": "Internet and Social Media Issue",
          "Internet Dependence": "Internet Dependence",
          "Professional Mental Health": "Professional Mental Health",
          "Sex Life": "Sex Life",
          Sleep: "Sleep",
          "Social Mental Health": "Social Mental Health",
          Stress: "Stress",
          "Suicidal Behaviour": "Suicidal Behaviour",
          "Suicidal Behavior": "Suicidal Behaviour",
          "Youngster Issues": "Youngster Issues",
        };

        // Try direct mapping first
        if (directMappings[scanName]) {
          return directMappings[scanName];
        }

        // Try case-insensitive exact match
        const keys = Object.keys(directMappings);
        const exactMatch = keys.find(
          (key) => key.toLowerCase() === scanName.toLowerCase(),
        );
        if (exactMatch) {
          return directMappings[exactMatch];
        }

        // Try partial matching
        const partialMatch = keys.find(
          (key) =>
            key.toLowerCase().includes(scanName.toLowerCase()) ||
            scanName.toLowerCase().includes(key.toLowerCase()),
        );
        if (partialMatch) {
          return directMappings[partialMatch];
        }

        // Return original if no mapping found
        console.warn(`No mapping found for scan name: ${scanName}`);
        return scanName;
      };

      const mappedScanName = getScanNameMapping(scanName);
      console.log(`Mapped "${scanName}" to "${mappedScanName}"`);

      // Try to find a matching intervention by the mapped scan name
      let matchFound = false;
      let interventionData;

      // 1. Try exact match with mapped name
      if (interventionsData[mappedScanName as keyof typeof interventionsData]) {
        interventionData =
          interventionsData[mappedScanName as keyof typeof interventionsData];
        console.log("Found exact match for mapped scan name:", mappedScanName);
        matchFound = true;
      }

      // 2. Try case-insensitive match
      if (!matchFound) {
        const keys = Object.keys(interventionsData);
        const caseInsensitiveMatch = keys.find(
          (key) => key.toLowerCase() === mappedScanName.toLowerCase(),
        );

        if (caseInsensitiveMatch) {
          interventionData =
            interventionsData[
              caseInsensitiveMatch as keyof typeof interventionsData
            ];
          console.log("Found case-insensitive match:", caseInsensitiveMatch);
          matchFound = true;
        }
      }

      // 3. Try normalized match (no spaces, special chars)
      if (!matchFound) {
        const normalizedScanName = normalizeString(mappedScanName);
        const keys = Object.keys(interventionsData);
        const normalizedMatch = keys.find(
          (key) => normalizeString(key) === normalizedScanName,
        );

        if (normalizedMatch) {
          interventionData =
            interventionsData[
              normalizedMatch as keyof typeof interventionsData
            ];
          console.log("Found normalized match:", normalizedMatch);
          matchFound = true;
        }
      }

      // 4. Try fuzzy match (substring)
      if (!matchFound) {
        const keys = Object.keys(interventionsData);
        const fuzzyMatch = keys.find(
          (key) =>
            key.toLowerCase().includes(mappedScanName.toLowerCase()) ||
            mappedScanName.toLowerCase().includes(key.toLowerCase()),
        );

        if (fuzzyMatch) {
          interventionData =
            interventionsData[fuzzyMatch as keyof typeof interventionsData];
          console.log("Found fuzzy match:", fuzzyMatch);
          matchFound = true;
        }
      }

      if (matchFound && interventionData) {
        // Create a result object with the structure expected by the RecommendedInterventions component
        const result = {
          scan_title: mappedScanName,
          interventionData: {
            name: interventionData.name,
            interventions: [] as any[],
          },
        };

        // Filter interventions based on score ranges
        if (totalScore >= 0 && totalScore <= 25) {
          // Show only Primary intervention
          const primaryIntervention = interventionData.interventions.find(
            (item: any) => item.name === "Primary",
          );
          if (primaryIntervention) {
            result.interventionData.interventions.push(primaryIntervention);
          }
          console.log("Score range 0-25: Showing Primary intervention only");
        } else if (totalScore > 25 && totalScore <= 50) {
          // Show Primary and Secondary interventions
          const filteredInterventions = interventionData.interventions.filter(
            (item: any) =>
              [
                "Primary",
                "Secondary Part 1",
                "Secondary Part 2",
                "Secondary Part 3",
              ].includes(item.name),
          );
          result.interventionData.interventions = filteredInterventions;
          console.log(
            "Score range 25-50: Showing Primary and Secondary interventions",
          );
        } else if (totalScore > 50) {
          // Show Primary, Secondary, and Tertiary interventions
          const filteredInterventions = interventionData.interventions.filter(
            (item: any) =>
              [
                "Primary",
                "Secondary Part 1",
                "Secondary Part 2",
                "Secondary Part 3",
                "Tertiary Part 1",
                "Tertiary Part 2",
                "call",
              ].includes(item.name) ||
              item.name.includes("Tertiary") ||
              item.name.includes("call"),
          );
          result.interventionData.interventions = filteredInterventions;

          // Ensure we have a professional help "call" intervention for scores > 50
          const hasCallItem = filteredInterventions.some((item: any) =>
            item.name.includes("call"),
          );

          if (!hasCallItem) {
            // Add a default call professional intervention
            result.interventionData.interventions.push({
              name: "call",
              type: [
                {
                  name: t("scanResult.interventions.professionalHelp.name"),
                  component: () => {
                    const InfoComponent = () => (
                      <View>
                        <Text>
                          {t(
                            "scanResult.interventions.professionalHelp.description",
                          )}
                        </Text>
                      </View>
                    );
                    return <InfoComponent />;
                  },
                },
              ],
            });
            console.log("Added default professional help card");
          }

          console.log(
            "Score range 50-100: Showing Primary, Secondary, Tertiary interventions, and Professional Help",
          );
        }

        // Set the filtered interventions for use in the component
        setFilteredInterventions(result);
        console.log(
          `Filtered to ${result.interventionData.interventions.length} interventions for "${mappedScanName}"`,
        );
      } else {
        console.warn(
          `No matching intervention found for scan name: ${scanName} (mapped: ${mappedScanName})`,
        );
        console.log(
          "Available intervention options:",
          Object.keys(interventionsData).join(", "),
        );

        // Create a default set of interventions as fallback
        const defaultInterventions = createDefaultInterventions(totalScore);
        const result = {
          scan_title: mappedScanName,
          interventionData: {
            name: mappedScanName || "Scan Result",
            interventions: defaultInterventions,
          },
        };

        setFilteredInterventions(result);
        console.log(
          "Created default interventions as fallback for:",
          mappedScanName,
        );
      }
    }
  }, [scanName, totalScore]);

  // Helper function to create default interventions based on score
  const createDefaultInterventions = (score: number) => {
    const defaultInterventions = [];

    // Primary intervention (always included)
    defaultInterventions.push({
      name: t("scanResult.interventions.primary.name"),
      type: [
        {
          name: t("scanResult.interventions.primary.name"),
          component: () => {
            const InfoComponent = () => (
              <View>
                <Text>
                  {t("scanResult.interventions.primary.description", { score })}
                </Text>
              </View>
            );
            return <InfoComponent />;
          },
        },
      ],
    });

    // Add Secondary for scores > 25
    if (score > 25) {
      defaultInterventions.push({
        name: t("scanResult.interventions.secondaryPart1.name"),
        type: [
          {
            name: t("scanResult.interventions.secondaryPart1.name"),
            component: () => {
              const InfoComponent = () => (
                <View>
                  <Text>
                    {t("scanResult.interventions.secondaryPart1.description")}
                  </Text>
                </View>
              );
              return <InfoComponent />;
            },
          },
        ],
      });

      defaultInterventions.push({
        name: t("scanResult.interventions.secondaryPart2.name"),
        type: [
          {
            name: t("scanResult.interventions.secondaryPart2.name"),
            component: () => {
              const InfoComponent = () => (
                <View>
                  <Text>
                    {t("scanResult.interventions.secondaryPart2.description")}
                  </Text>
                </View>
              );
              return <InfoComponent />;
            },
          },
        ],
      });

      defaultInterventions.push({
        name: t("scanResult.interventions.secondaryPart3.name"),
        type: [
          {
            name: t("scanResult.interventions.secondaryPart3.name"),
            component: () => {
              const InfoComponent = () => (
                <View>
                  <Text>
                    {t("scanResult.interventions.secondaryPart3.description")}
                  </Text>
                </View>
              );
              return <InfoComponent />;
            },
          },
        ],
      });
    }

    // Add Tertiary and Professional Help for scores > 50
    if (score > 50) {
      defaultInterventions.push({
        name: t("scanResult.interventions.tertiaryPart1.name"),
        type: [
          {
            name: t("scanResult.interventions.tertiaryPart1.name"),
            component: () => {
              const InfoComponent = () => (
                <View>
                  <Text>
                    {t("scanResult.interventions.tertiaryPart1.description")}
                  </Text>
                </View>
              );
              return <InfoComponent />;
            },
          },
        ],
      });

      defaultInterventions.push({
        name: t("scanResult.interventions.tertiaryPart2.name"),
        type: [
          {
            name: t("scanResult.interventions.tertiaryPart2.name"),
            component: () => {
              const InfoComponent = () => (
                <View>
                  <Text>
                    {t("scanResult.interventions.tertiaryPart2.description")}
                  </Text>
                </View>
              );
              return <InfoComponent />;
            },
          },
        ],
      });

      defaultInterventions.push({
        name: "call",
        type: [
          {
            name: t("scanResult.interventions.professionalHelp.name"),
            component: () => {
              const InfoComponent = () => (
                <View>
                  <Text>
                    {t("scanResult.interventions.professionalHelp.description")}
                  </Text>
                </View>
              );
              return <InfoComponent />;
            },
          },
        ],
      });
    }

    return defaultInterventions;
  };

  // On new data, default to last page (most recent)
  useEffect(() => {
    const pages = Math.max(1, Math.ceil(chartLabels.length / PAGE_SIZE));
    setPage(pages - 1);
  }, [chartLabels]);

  // Share‑PDF handler
  const handleShare = async () => {
    try {
      const html = `
        <html><body style="font-family:sans-serif;margin:20px;">
          <h1 style="color:#AB47BC;">${getTranslatedScanName(
            scanName || "",
          )} ${t("scanResult.htmlReport.reportHeader")}</h1>
          <h2>${t("scanResult.htmlReport.scorePrefix")}${totalScore}</h2>
          <h3>${categoryInfo.heading}</h3>
          <p>${categoryInfo.paragraph}</p>
        </body></html>
      `;
      const file = await RNHTMLtoPDF.convert({
        html,
        fileName: t("scanResult.pdfReport.fileName"),
        directory: "Documents",
      });
      await Share.open({
        url: "file://" + file.filePath,
        type: "application/pdf",
        title: t("scanResult.pdfReport.shareTitle"),
        showAppsToView: true,
      });
    } catch (err) {
      console.error(t("scanResult.errors.pdfShareError"), err);
    }
  };

  //   Store & load history
  //   useEffect(() => {
  //     (async () => {
  //       await storeAddictionScanResult(totalScore);
  //       const history = await fetchAddictionScanResults();
  //       history.sort(
  //         (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  //       );
  //       setChartLabels(history.map((h) => h.date));
  //       setChartData(history.map((h) => Number(h.score)));
  //     })();
  //   }, [totalScore]);

  // Save the current scan result when the component mounts
  useEffect(() => {
    const saveResult = async () => {
      if (scanName && totalScore) {
        try {
          console.log('=== ScanResult: Attempting to save result ===');
          console.log('Scan Name:', scanName);
          console.log('Total Score:', totalScore);
          await saveScanResult(scanName, totalScore);
          console.log('=== ScanResult: Save successful ===');
        } catch (error) {
          console.error('=== ScanResult: Save failed ===');
          console.error(t("scanResult.errors.savingResultError"), error);
          
          // Test database functionality
          console.log('=== Running database test ===');
          await testDatabaseSave();
        }
      }
    };

    saveResult();
  }, [scanName, totalScore]);

  // Update the chart data fetching logic to use scan results
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchScanHistory = async () => {
      try {
        setIsLoading(true);
        if (scanName) {
          const history = await getScanResultsHistory(scanName as string);
          if (history.length === 0) {
            return;
          }

          // Format dates for chart labels
          const labels = history.map((h) => {
            const date = new Date(`${h.scan_date} ${h.scan_time}`);
            return `${date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}`;
          });

          // Get scores directly from the results and convert to numbers
          const scores = history.map((h) => Number(h.total_score) || 0);

          if (scores.length > 0) {
            setChartLabels(labels);
            setChartData(scores);
          }
        }
      } catch (error) {
        console.error(t("scanResult.errors.fetchingHistoryError"), error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScanHistory();
  }, [scanName]);

  // Compute pagedLabels / pagedData
  const { pagedLabels, pagedData, totalPages } = useMemo(() => {
    const total = chartLabels.length;
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return {
      pagedLabels: chartLabels.slice(start, end),
      pagedData: chartData.slice(start, end),
      totalPages: pages,
    };
  }, [chartLabels, chartData, page]);

  const renderChart = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#AB47BC" />
          <Text style={styles.loadingText}>
            {t("scanResult.ui.loadingHistoryText")}
          </Text>
        </View>
      );
    }

    if (chartData.length === 0) {
      return (
        <Text style={styles.infoText}>
          {t("scanResult.ui.firstScanMessage")}
        </Text>
      );
    }

    return (
      <>
        <LineChart
          data={{
            labels: pagedLabels,
            datasets: [
              {
                data: pagedData,
                color: (opacity = 1) => `rgba(171, 71, 188, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(171, 71, 188, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(85, 85, 85, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#AB47BC",
            },
            propsForLabels: {
              fontSize: 10,
              rotation: -45,
            },
          }}
          fromZero
          bezier
          style={{
            marginVertical: 8,
            marginLeft: -40,
            borderRadius: 8,
            paddingBottom: 20,
          }}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          withDots={true}
          segments={4}
          yAxisLabel=""
          yAxisSuffix=""
        />
        {chartData.length >= 2 && (
          <View style={styles.pagerRow}>
            <Pressable
              onPress={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              style={[styles.pageBtn, page === 0 && styles.pageBtnDisabled]}
            >
              <Text style={styles.pageBtnTxt}>
                {t("scanResult.ui.pageNavigationPrevious")}
              </Text>
            </Pressable>
            <Text style={styles.pageIndicator}>
              {page + 1}
              {t("scanResult.ui.pageIndicatorSeparator")}
              {totalPages}
            </Text>
            <Pressable
              onPress={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              style={[
                styles.pageBtn,
                page === totalPages - 1 && styles.pageBtnDisabled,
              ]}
            >
              <Text style={styles.pageBtnTxt}>
                {t("scanResult.ui.pageNavigationNext")}
              </Text>
            </Pressable>
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Score box */}
        <View style={styles.scoreBox}>
          <Text style={styles.scoreBoxTitle}>
            {getTranslatedScanName(scanName || "")}
          </Text>
          <Text style={styles.scoreNumber}>{totalScore}</Text>
          <Text style={styles.scoreSubtitle}>{categoryInfo.heading}</Text>
          <View style={styles.rangeContainer}>
            {[
              {
                range: t("scanResult.scoreCategories.normal.range"),
                label: t("scanResult.scoreCategories.normal.label"),
                isActive: (totalScore ?? 0) <= 25,
              },
              {
                range: t("scanResult.scoreCategories.low.range"),
                label: t("scanResult.scoreCategories.low.label"),
                isActive: (totalScore ?? 0) > 25 && (totalScore ?? 0) <= 50,
              },
              {
                range: t("scanResult.scoreCategories.moderate.range"),
                label: t("scanResult.scoreCategories.moderate.label"),
                isActive: (totalScore ?? 0) > 50 && (totalScore ?? 0) <= 75,
              },
              {
                range: t("scanResult.scoreCategories.severe.range"),
                label: t("scanResult.scoreCategories.severe.label"),
                isActive: (totalScore ?? 0) > 75,
              },
            ].map(({ range, label, isActive }) => (
              <View style={styles.rangeRow} key={range}>
                {isActive ? (
                  <View style={styles.activeRangeBox}>
                    <Text style={styles.rangeText}>
                      {range} : {label}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.rangeText}>
                    {range} : {label}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <Text style={styles.categoryParagraph}>{categoryInfo.paragraph}</Text>

        {/* Chart + Pager */}
        <View style={styles.chartContainer}>
          {renderChart()}
          <Text style={styles.shiftText}>
            {t("scanResult.ui.progressOverTimeTitle")}
          </Text>
        </View>

        {/* Info & interventions */}
        <Text style={styles.infoTitle}>
          {t("scanResult.ui.whatShouldIKnowTitle")}
        </Text>
        <Text style={styles.infoText}>
          {t("scanResult.ui.impactDescription", {
            scanName: getTranslatedScanName(scanName || ""),
            currentStage: categoryInfo.heading,
          })}
          {categoryInfo.heading === t("scanResult.scoreCategories.normal.label")
            ? t("scanResult.ui.noWorryMessage")
            : ""}
        </Text>

        {filteredInterventions && (
          <RecommendedInterventions
            recommendedInterventions={filteredInterventions}
            images={getInterventionImages(scanName || "")}
            scanName={scanName}
            totalScore={totalScore}
            navigation={navigation}
          />
        )}

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            console.log("Modal close requested");
            setModalVisible(false);
          }}
          hardwareAccelerated={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{categoryInfo.heading}</Text>
              <Text style={styles.modalDoctorInfo}>
                {(() => {
                  const score = totalScore ?? 0;
                  const conditionName = getTranslatedScanName(scanName || "");
                  
                  if (score <= 25) {
                    return t("scanResult.modal.normalRecommendation");
                  } else if (score <= 50) {
                    return t("scanResult.modal.lowRecommendation", {
                      conditionName,
                    });
                  } else if (score <= 75) {
                    return t("scanResult.modal.moderateRecommendation", {
                      conditionName,
                    });
                  } else {
                    return t("scanResult.modal.severeRecommendation", {
                      conditionName,
                    });
                  }
                })()}
              </Text>
              <Button
                title={t("scanResult.modal.closeButton")}
                onPress={() => setModalVisible(false)}
                color="#666"
              />
            </View>
          </View>
        </Modal>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            label={t("scanResult.buttons.saveAndExit")}
            callback={() => navigation.navigate("MainApp")}
          />
          <SecondaryButton
            label={t("scanResult.buttons.share")}
            callback={handleShare}
            customStyle={styles.secondaryButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  infoText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 20,
    lineHeight: 20,
  },

  scoreBox: {
    backgroundColor: "#9C27B0",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
    marginBottom: 25,
    marginTop: 20,
    elevation: 4,
    marginHorizontal: 20,
  },
  scoreBoxTitle: { fontSize: 18, fontWeight: "700", color: "#fff" },
  scoreNumber: { fontSize: 60, fontWeight: "bold", color: "#fff" },
  scoreSubtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 8,
    marginBottom: 15,
    textAlign: "center",
  },

  rangeContainer: {
    backgroundColor: "#AB47BC",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  rangeRow: { flexDirection: "row", alignItems: "center", marginVertical: 2 },
  rangeText: { color: "#fff", fontSize: 14, textAlign: "center" },
  activeRangeBox: {
    backgroundColor: "#CE93D8",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  categoryParagraph: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    marginBottom: 20,
    textAlign: "center",
    marginHorizontal: 20,
  },

  chartContainer: { marginBottom: 20, alignItems: "center" },
  chart: { borderRadius: 8 },

  pagerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  pageBtn: {
    borderWidth: 1,
    borderColor: "#AB47BC",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginHorizontal: 8,
  },
  pageBtnDisabled: {
    opacity: 0.3,
  },
  pageBtnTxt: {
    fontSize: 16,
    color: "#AB47BC",
  },
  pageIndicator: {
    fontSize: 12,
    color: "#AB47BC",
  },

  shiftText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#AB47BC",
    textAlign: "center",
    marginVertical: 10,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#AB47BC",
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },

  buttonContainer: {
    height: screenHeight * 0.15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  secondaryButton: {
    width: "80%",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: { elevation: 5 },
    }),
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#AB47BC",
    marginBottom: 10,
  },
  modalDoctorInfo: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 10,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },
});
