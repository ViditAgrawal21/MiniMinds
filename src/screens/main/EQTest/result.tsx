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
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Share from "react-native-share";
import i18n from "@/i18n/locales/i18n";
import { useLanguage } from "@/context/LanguageContext";
import CustomIcon from "@/components/CustomIcon";

import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";

type RootStackParamList = {
  EQTestResult: {
    testId: number;
    testTitle: string;
    totalScore?: number;
  };
  Tab: { initialTab?: string } | undefined;
};

type ResultScreenRouteProp = RouteProp<RootStackParamList, "EQTestResult">;

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Async Storage key
const getHistoryKey = (testId: number) => `eq_test_${testId}_history`;

// Store result
async function storeEQTestResult(testId: number, score: number): Promise<void> {
  try {
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toTimeString().split(" ")[0];
    const key = getHistoryKey(testId);
    const stored = await AsyncStorage.getItem(key);
    const parsed = stored ? JSON.parse(stored) : [];
    parsed.push({ date, time, score });
    await AsyncStorage.setItem(key, JSON.stringify(parsed));
  } catch (err) {
    console.error("Error storing EQ test result:", err);
  }
}

// Fetch history
async function fetchEQTestResults(
  testId: number,
): Promise<{ date: string; time: string; score: number }[]> {
  try {
    const key = getHistoryKey(testId);
    const stored = await AsyncStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Error fetching EQ test results:", err);
    return [];
  }
}

export default function EQTestResult() {
  const route = useRoute<ResultScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { testId, testTitle, totalScore } = route.params || {};
  
  const { locale } = useLanguage(); // Get locale to trigger re-renders when it changes
  
  // Create a dynamic translation function that forces re-evaluation when locale changes
  const t = React.useCallback(
    (key: string, options?: any) => {
      // Force re-evaluation by using locale in the function
      return i18n.t(key, { ...options, _locale: locale });
    },
    [locale],
  );

  // 4‑band category helper
  const getCategory = React.useCallback((score: number) => {
    if (score <= 25) {
      return {
        rangeLabel: t("eqTest.results.categories.developing.range"),
        heading: t("eqTest.results.categories.developing.label"),
        paragraph: t("eqTest.results.categories.developing.description"),
      };
    } else if (score <= 50) {
      return {
        rangeLabel: t("eqTest.results.categories.emerging.range"),
        heading: t("eqTest.results.categories.emerging.label"),
        paragraph: t("eqTest.results.categories.emerging.description"),
      };
    } else if (score <= 75) {
      return {
        rangeLabel: t("eqTest.results.categories.established.range"),
        heading: t("eqTest.results.categories.established.label"),
        paragraph: t("eqTest.results.categories.established.description"),
      };
    } else {
      return {
        rangeLabel: t("eqTest.results.categories.advanced.range"),
        heading: t("eqTest.results.categories.advanced.label"),
        paragraph: t("eqTest.results.categories.advanced.description"),
      };
    }
  }, [t]);

  // Gets EQ test title from test ID
  const getEQTestTitle = React.useCallback((testId: number): string => {
    switch (testId) {
      case 1:
        return t("eqTest.tests.empathy.title");
      case 2:
        return t("eqTest.tests.motivation.title");
      case 3:
        return t("eqTest.tests.selfAwareness.title");
      case 4:
        return t("eqTest.tests.selfRegulation.title");
      case 5:
        return t("eqTest.tests.socialSkills.title");
      default:
        return t("eqTest.title");
    }
  }, [t]);

  // EQ Test recommendation data
  const getEQRecommendations = React.useCallback((testId: number, score: number) => {
    const recommendations = {
      1: { // Empathy
        title: t("eqTest.recommendations.empathy.title"),
        description: t("eqTest.recommendations.empathy.description"),
        strategyScreen: "EmpathyStrategyScreen",
        icon: "heart-outline",
        color: "#FF6B6B",
      },
      2: { // Motivation
        title: t("eqTest.recommendations.motivation.title"),
        description: t("eqTest.recommendations.motivation.description"),
        strategyScreen: "MotivationStrategyScreen",
        icon: "trending-up-outline",
        color: "#4ECDC4",
      },
      3: { // Self-Awareness
        title: t("eqTest.recommendations.selfAwareness.title"),
        description: t("eqTest.recommendations.selfAwareness.description"),
        strategyScreen: "SelfAwarenessStrategyScreen",
        icon: "eye-outline",
        color: "#45B7D1",
      },
      4: { // Self-Regulation
        title: t("eqTest.recommendations.selfRegulation.title"),
        description: t("eqTest.recommendations.selfRegulation.description"),
        strategyScreen: "SelfRegulationStrategyScreen",
        icon: "shield-checkmark-outline",
        color: "#96CEB4",
      },
      5: { // Social Skills
        title: t("eqTest.recommendations.socialSkills.title"),
        description: t("eqTest.recommendations.socialSkills.description"),
        strategyScreen: "SocialSkillsStrategyScreen",
        icon: "people-outline",
        color: "#FCEA2B",
      },
    };

    return recommendations[testId as keyof typeof recommendations] || null;
  }, [t]);

  // Final score & category
  const categoryInfo = getCategory(totalScore ?? 0);

  // Show modal for Developing & Emerging
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (totalScore && totalScore <= 50) setModalVisible(true);
  }, [totalScore]);

  // Progress‑chart data
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Recommendation states
  const [recommendationVisible, setRecommendationVisible] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null);

  // Paging state (show 4 at a time)
  const PAGE_SIZE = 4;
  const [page, setPage] = useState(0);

  // Store & load history
  useEffect(() => {
    (async () => {
      if (testId && totalScore !== undefined) {
        setIsLoading(true);
        await storeEQTestResult(testId, totalScore);
        const history = await fetchEQTestResults(testId);
        history.sort(
          (a, b) =>
            new Date(`${a.date} ${a.time}`).getTime() -
            new Date(`${b.date} ${b.time}`).getTime(),
        );

        // Format dates for chart labels
        const labels = history.map((h) => {
          const date = new Date(`${h.date} ${h.time}`);
          return `${date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`;
        });

        // Get scores
        const scores = history.map((h) => Number(h.score));

        setChartLabels(labels);
        setChartData(scores);
        setIsLoading(false);
      }
    })();
  }, [testId, totalScore]);

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
          <h1 style="color:#AB47BC;">${
            testTitle || getEQTestTitle(testId || 0)
          } ${t("eqTest.results.actions.generateReport")}</h1>
          <h2>${t("eqTest.results.yourScore")}: ${totalScore}</h2>
          <h3>${categoryInfo.heading}</h3>
          <p>${categoryInfo.paragraph}</p>
        </body></html>
      `;
      const file = await RNHTMLtoPDF.convert({
        html,
        fileName: `${testTitle || getEQTestTitle(testId || 0)}Report`,
        directory: "Documents",
      });
      await Share.open({
        url: "file://" + file.filePath,
        type: "application/pdf",
        title: `${t("eqTest.title")} ${t(
          "eqTest.results.actions.generateReport",
        )} PDF`,
        showAppsToView: true,
      });
    } catch (err) {
      console.error("PDF share error:", err);
    }
  };

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
            {t("eqTest.results.loadingHistoryData")}
          </Text>
        </View>
      );
    }

    if (chartData.length === 0) {
      return (
        <Text style={styles.infoText}>
          {t("eqTest.results.firstTestMessage")}
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
              <Text style={styles.pageBtnTxt}>◀</Text>
            </Pressable>
            <Text style={styles.pageIndicator}>
              {page + 1}/{totalPages}
            </Text>
            <Pressable
              onPress={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              style={[
                styles.pageBtn,
                page === totalPages - 1 && styles.pageBtnDisabled,
              ]}
            >
              <Text style={styles.pageBtnTxt}>▶</Text>
            </Pressable>
          </View>
        )}
      </>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Score box */}
      <View style={styles.scoreBox}>
        <Text style={styles.scoreBoxTitle}>
          {testTitle || getEQTestTitle(testId || 0)}
        </Text>
        <Text style={styles.scoreNumber}>{totalScore}</Text>
        <Text style={styles.scoreSubtitle}>{categoryInfo.heading}</Text>
        <View style={styles.rangeContainer}>
          {[
            {
              range: t("eqTest.results.categories.developing.range"),
              label: t("eqTest.results.categories.developing.label"),
              isActive: (totalScore ?? 0) <= 25,
            },
            {
              range: t("eqTest.results.categories.emerging.range"),
              label: t("eqTest.results.categories.emerging.label"),
              isActive: (totalScore ?? 0) > 25 && (totalScore ?? 0) <= 50,
            },
            {
              range: t("eqTest.results.categories.established.range"),
              label: t("eqTest.results.categories.established.label"),
              isActive: (totalScore ?? 0) > 50 && (totalScore ?? 0) <= 75,
            },
            {
              range: t("eqTest.results.categories.advanced.range"),
              label: t("eqTest.results.categories.advanced.label"),
              isActive: (totalScore ?? 0) > 75,
            },
          ].map(({ range, label, isActive }) => (
            <View style={styles.rangeRow} key={range}>
              {isActive ? (
                <View style={styles.activeRangeBox}>
                  <Text style={styles.rangeText}>
                    {range} : {label}
                  </Text>
                </View>
              ) : (
                <Text style={styles.rangeText}>
                  {range} : {label}
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
          {t("eqTest.results.progressOverTime")}
        </Text>
      </View>

      {/* Info section */}
      <Text style={styles.infoTitle}>
        {t("eqTest.results.aboutThisComponent")}
      </Text>
      <Text style={styles.infoText}>
        {testId === 1 && t("eqTest.results.componentDescriptions.empathy")}
        {testId === 2 && t("eqTest.results.componentDescriptions.motivation")}
        {testId === 3 &&
          t("eqTest.results.componentDescriptions.selfAwareness")}
        {testId === 4 &&
          t("eqTest.results.componentDescriptions.selfRegulation")}
        {testId === 5 && t("eqTest.results.componentDescriptions.socialSkills")}
      </Text>

      {/* Recommendation Section */}
      {testId && totalScore !== undefined && (
        <View style={styles.recommendationSection}>
          <Text style={styles.recommendationTitle}>
            {t("eqTest.results.recommendations.title")}
          </Text>
          <Text style={styles.recommendationSubtitle}>
            {t("eqTest.results.recommendations.subtitle")}
          </Text>
          
          {(() => {
            const recommendation = getEQRecommendations(testId, totalScore);
            if (!recommendation) return null;
            
            return (
              <TouchableOpacity
                style={[styles.recommendationCard, { borderLeftColor: recommendation.color }]}
                onPress={() => {
                  setSelectedRecommendation(recommendation);
                  setRecommendationVisible(true);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.recommendationIconContainer}>
                  <CustomIcon type="IO" 
                    name={recommendation.icon as any} 
                    size={32} 
                    color={recommendation.color} 
                  />
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationCardTitle}>
                    {recommendation.title}
                  </Text>
                  <Text style={styles.recommendationCardDescription} numberOfLines={3}>
                    {recommendation.description}
                  </Text>
                  <View style={styles.recommendationActions}>
                    <Text style={[styles.viewStrategiesText, { color: recommendation.color }]}>
                      {t("eqTest.results.recommendations.viewStrategies")}
                    </Text>
                    <CustomIcon type="IO" 
                      name="arrow-forward" 
                      size={16} 
                      color={recommendation.color} 
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })()}
        </View>
      )}

      {/* Recommendation Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={recommendationVisible}
        onRequestClose={() => setRecommendationVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.recommendationModalContent}>
            {selectedRecommendation && (
              <>
                <View style={styles.modalHeader}>
                  <CustomIcon type="IO" 
                    name={selectedRecommendation.icon} 
                    size={40} 
                    color={selectedRecommendation.color} 
                  />
                  <Text style={styles.modalRecommendationTitle}>
                    {selectedRecommendation.title}
                  </Text>
                </View>
                
                <Text style={styles.modalRecommendationDescription}>
                  {selectedRecommendation.description}
                </Text>
                
                <Text style={styles.modalScoreContext}>
                  {t("eqTest.results.recommendations.scoreContext", {
                    score: totalScore,
                    category: categoryInfo.heading
                  })}
                </Text>

                <View style={styles.modalActions}>
                  <Pressable
                    style={[styles.modalActionButton, styles.secondaryModalButton]}
                    onPress={() => setRecommendationVisible(false)}
                  >
                    <Text style={styles.secondaryModalButtonText}>
                      {t("eqTest.results.recommendations.close")}
                    </Text>
                  </Pressable>
                  
                  <Pressable
                    style={[
                      styles.modalActionButton, 
                      styles.primaryModalButton,
                      { backgroundColor: selectedRecommendation.color }
                    ]}
                    onPress={() => {
                      setRecommendationVisible(false);
                      navigation.navigate(selectedRecommendation.strategyScreen);
                    }}
                  >
                    <Text style={styles.primaryModalButtonText}>
                      {t("eqTest.results.recommendations.viewStrategies")}
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {" "}
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{categoryInfo.heading}</Text>
            <Text style={styles.modalMessage}>
              {categoryInfo.heading ===
              t("eqTest.results.categories.developing.label")
                ? t("eqTest.results.categories.developing.modalMessage")
                : t("eqTest.results.categories.emerging.modalMessage")}
            </Text>
            <Button
              title={t("eqTest.results.actions.close")}
              onPress={() => setModalVisible(false)}
              color="#666"
            />
          </View>
        </View>
      </Modal>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={t("eqTest.results.actions.backToTests")}
          callback={() => navigation.navigate("Tab", { initialTab: "Home" })}
        />
        <SecondaryButton
          label={t("eqTest.results.actions.generateReport")}
          callback={handleShare}
          customStyle={styles.secondaryButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

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
  scoreBoxTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  scoreNumber: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#fff",
  },
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
  rangeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  rangeText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
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

  chartContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  chart: {
    borderRadius: 8,
  },

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
  modalMessage: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 15,
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

  // Recommendation styles
  recommendationSection: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#AB47BC",
    textAlign: "center",
    marginBottom: 8,
  },
  recommendationSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  recommendationCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recommendationIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  recommendationCardDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  recommendationActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  viewStrategiesText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  
  // Recommendation modal styles
  recommendationModalContent: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  modalRecommendationTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginTop: 12,
  },
  modalRecommendationDescription: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 16,
  },
  modalScoreContext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
    fontStyle: "italic",
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  modalActionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryModalButton: {
    backgroundColor: "#AB47BC",
  },
  secondaryModalButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  primaryModalButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryModalButtonText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
});
