import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getCurrentLanguage, changeLanguage } from "@/utils/i18nHelpers";
import { t } from "@/i18n/locales/i18n";
import { useLanguage } from "@/context/LanguageContext";
import {
  ComprehensiveReportData,
  categorizeScore,
} from "@/utils/eqTestUtils";

interface ComprehensiveReportProps {
  data: ComprehensiveReportData;
  onClose: () => void;
}

const { width: screenWidth } = Dimensions.get("window");

const ComprehensiveReport: React.FC<ComprehensiveReportProps> = ({
  data,
  onClose,
}) => {
  const { locale } = useLanguage(); // Get locale to trigger re-renders when it changes
  
  // Create a dynamic translation function that forces re-evaluation when locale changes
  const tWithLocale = React.useCallback(
    (key: string, options?: any) => {
      // Ensure i18n locale is updated
      if (getCurrentLanguage() !== locale) {
        changeLanguage(locale);
      }
      // Use the standard t function
      return t(key, options);
    },
    [locale],
  );
  
  const testKeys = [
    "empathy",
    "motivation",
    "selfAwareness",
    "selfRegulation",
    "socialSkills",
  ];
  const testColors = ["#B0C4DD", "#F1AB6B", "#F0818B", "#D27AD5", "#78C2AD"];

  // Prepare chart data
  const chartLabels = testKeys.map((key) => t(`eqTest.tests.${key}.title`));
  const chartData = testKeys.map((key) => {
    const status = data[key as keyof ComprehensiveReportData] as any;
    return status.latestScore || 0;
  });

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(45, 62, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(45, 62, 80, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#2D3E50",
    },
  };

  const overallCategory = categorizeScore(data.overallScore);
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "High":
        return "#4CAF50";
      case "Medium":
        return "#FF9800";
      case "Low":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {t("eqTest.comprehensiveReport.title")}
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>
            {t("eqTest.results.actions.close")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Overall Score Card */}
      <View style={styles.overallScoreCard}>
        <Text style={styles.overallScoreTitle}>
          {t("eqTest.comprehensiveReport.overallScore")}
        </Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreNumber}>{data.overallScore}</Text>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: getCategoryColor(overallCategory) },
            ]}
          >
            <Text style={styles.categoryText}>
              {t(
                `eqTest.comprehensiveReport.categories.${overallCategory.toLowerCase()}`,
              )}
            </Text>
          </View>
        </View>
        <Text style={styles.scoreSubtitle}>
          {t(
            `eqTest.comprehensiveReport.categoryDescriptions.${overallCategory.toLowerCase()}`,
          )}
        </Text>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>
          {t("eqTest.comprehensiveReport.chartTitle")}
        </Text>
        <LineChart
          data={{
            labels: chartLabels.map((label) => label.split(" ")[0]), // Shorten labels for mobile
            datasets: [
              {
                data: chartData,
                color: (opacity = 1) => `rgba(45, 62, 80, ${opacity})`,
                strokeWidth: 3,
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Individual Test Results */}
      <View style={styles.testsContainer}>
        <Text style={styles.testsTitle}>
          {t("eqTest.comprehensiveReport.individualResults")}
        </Text>
        {testKeys.map((testKey, index) => {
          const status = data[testKey as keyof ComprehensiveReportData] as any;
          const category = categorizeScore(status.latestScore || 0);
          const score = status.latestScore || 0;

          // Determine score level for detailed description
          let scoreLevel = "low";
          if (score >= 60) {
            scoreLevel = "high";
          } else if (score >= 30) {
            scoreLevel = "medium";
          }

          return (
            <View key={testKey} style={styles.testCard}>
              <View style={styles.testHeader}>
                <View
                  style={[
                    styles.testColorIndicator,
                    { backgroundColor: testColors[index] },
                  ]}
                />
                <Text style={styles.testTitle}>
                  {t(`eqTest.tests.${testKey}.title`)}
                </Text>
                <View
                  style={[
                    styles.testCategoryBadge,
                    { backgroundColor: getCategoryColor(category) },
                  ]}
                >
                  <Text style={styles.testCategoryText}>
                    {t(
                      `eqTest.comprehensiveReport.categories.${category.toLowerCase()}`,
                    )}
                  </Text>
                </View>
              </View>
              <Text style={styles.testScore}>{score}/100</Text>
              <Text style={styles.testDate}>
                {t("eqTest.comprehensiveReport.completedOn")}:{" "}
                {status.lastCompletedDate}
              </Text>

              {/* Detailed Description based on score */}
              <View style={styles.testDescriptionContainer}>
                <Text style={styles.testDescription}>
                  {t(
                    `eqTest.comprehensiveReport.detailedDescriptions.${testKey}.${scoreLevel}`,
                  )}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Recommendations */}
      <View style={styles.recommendationsContainer}>
        <Text style={styles.recommendationsTitle}>
          {t("eqTest.comprehensiveReport.recommendations")}
        </Text>
        <Text style={styles.recommendationsText}>
          {t("eqTest.comprehensiveReport.recommendationText.eqMuscle")}
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {t("eqTest.comprehensiveReport.disclaimer")}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#2D3E50",
    flex: 1,
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#2D3E50",
  },
  overallScoreCard: {
    margin: 20,
    padding: 20,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    alignItems: "center",
  },
  overallScoreTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#2D3E50",
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  scoreNumber: {
    fontSize: 36,
    fontFamily: "Poppins-Bold",
    color: "#2D3E50",
    marginRight: 15,
  },
  categoryBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },
  scoreSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
  },
  chartContainer: {
    margin: 20,
    marginTop: 0,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#2D3E50",
    marginBottom: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  testsContainer: {
    margin: 20,
    marginTop: 0,
  },
  testsTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#2D3E50",
    marginBottom: 15,
  },
  testCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  testHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  testColorIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
  },
  testTitle: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    color: "#2D3E50",
    flex: 1,
  },
  testCategoryBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  testCategoryText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
  },
  testScore: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#2D3E50",
    marginBottom: 4,
  },
  testDate: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#666666",
  },
  testDescriptionContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  testDescription: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#555555",
    lineHeight: 18,
    textAlign: "justify",
  },
  recommendationsContainer: {
    margin: 20,
    marginTop: 0,
    padding: 16,
    backgroundColor: "#F0F8FF",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  recommendationsTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#2D3E50",
    marginBottom: 8,
  },
  recommendationsText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    lineHeight: 20,
  },
  footer: {
    margin: 20,
    marginTop: 0,
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
  },
  footerText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    textAlign: "center",
    lineHeight: 18,
  },
});

export default ComprehensiveReport;
