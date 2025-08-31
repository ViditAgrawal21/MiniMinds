/* app/screens/Insights/index.tsx */

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import CustomIcon from "@/components/CustomIcon";
import { LinearGradient } from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "@/i18n/locales/i18n"; // Import the translation function
import { getTotalXP } from "@/utils/xpSystem"; // Import XP utility

import FilterDropdown from "../../../components/FilterDropdown";
import { getAllScanResults } from "@/services/database";

/* ---------- helpers ---------- */

type ScoreBand = "Normal" | "Low Risk" | "Moderate Risk" | "Severe Risk";
const scoreBand = (s: number): ScoreBand =>
  s <= 25
    ? (t("insights.scoreBands.normal") as ScoreBand)
    : s <= 50
      ? (t("insights.scoreBands.lowRisk") as ScoreBand)
      : s <= 75
        ? (t("insights.scoreBands.moderateRisk") as ScoreBand)
        : (t("insights.scoreBands.severeRisk") as ScoreBand);

type Item = {
  scanTitle: string;
  date: string;
  score: number;
  tiers: string[];
};

const monthMap: Record<string, string> = {
  [t("insights.months.january")]: "01",
  [t("insights.months.february")]: "02",
  [t("insights.months.march")]: "03",
  [t("insights.months.april")]: "04",
  [t("insights.months.may")]: "05",
  [t("insights.months.june")]: "06",
  [t("insights.months.july")]: "07",
  [t("insights.months.august")]: "08",
  [t("insights.months.september")]: "09",
  [t("insights.months.october")]: "10",
  [t("insights.months.november")]: "11",
  [t("insights.months.december")]: "12",
};

const CHART_PAGE_SIZE = 4;
const { width: screenWidth } = Dimensions.get("window");

/* ---------- helper functions ---------- */

// Function to translate scan types
const translateScanType = (scanType: string): string => {
  const translationKey = `insights.scanTypes.${scanType}` as const;
  const translated = t(translationKey);
  // If translation key doesn't exist, return original scan type
  return translated === translationKey ? scanType : translated;
};

/* ---------- component ---------- */

export default function InsightsScreen({
  navigation,
}: {
  navigation?: { navigate: (screen: string) => void };
} = {}) {
  /* state */
  const [activeTab, setActiveTab] = useState<"Dashboard" | "Insights">(
    "Dashboard",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [allResults, setAllResults] = useState<Item[]>([]);
  const [filtered, setFiltered] = useState<Item[]>([]);

  // Dashboard state
  const [conditionsCount, setConditionsCount] = useState(4);
  const [interventionsCount, setInterventionsCount] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(6);

  const [scanF, setScanF] = useState<string | null>(null);
  const [scoreF, setScoreF] = useState<ScoreBand | null>(null);
  const [monthF, setMonthF] = useState<string | null>(null);
  const [yearF, setYearF] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  // Dashboard data loading
  const loadDashboardData = useCallback(async () => {
    try {
      // Load conditions
      const storedConditions = await AsyncStorage.getItem("conditions");
      if (storedConditions) {
        const conditions = JSON.parse(storedConditions);
        setConditionsCount(conditions.length);
      }

      // Calculate total XP using utility function
      const totalXpValue = await getTotalXP();
      setTotalXP(totalXpValue);

      // Load interventions count from all tabs
      const tabs = ["Daily", "Weekly", "Bi-weekly", "Monthly"];
      let totalInterventions = 0;
      let totalCompleted = 0;

      for (const tab of tabs) {
        try {
          const interventions = await AsyncStorage.getItem(
            `interventions_${tab}`,
          );
          const completed = await AsyncStorage.getItem(
            `completed_interventions_${tab}`,
          );

          if (interventions) {
            const parsedInterventions = JSON.parse(interventions);
            totalInterventions += Array.isArray(parsedInterventions)
              ? parsedInterventions.length
              : 0;
          }

          if (completed) {
            const parsedCompleted = JSON.parse(completed);
            totalCompleted += Array.isArray(parsedCompleted)
              ? parsedCompleted.length
              : 0;
          }
        } catch (error) {
          console.error(`Error loading ${tab} data:`, error);
        }
      }

      setInterventionsCount(totalInterventions);
      setCompletedTasks(totalCompleted);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  }, []);

  /* load once */
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        // Load insights data
        const rows = await getAllScanResults();
        console.log("Insights: Retrieved scan results:", rows.length, "items");
        console.log("Insights: Sample result:", rows[0]);
        
        const mapped: Item[] = rows.map((r) => ({
          scanTitle: r.scan_title,
          date: r.scan_date,
          score: Number(r.total_score), // Convert string score to number
          tiers: r.result ? r.result.split(",").map((t: string) => t.trim()) : [],
        }));
        mapped.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        console.log("Insights: Mapped results:", mapped.length, "items");
        setAllResults(mapped);
        if (mapped.length) setScanF(mapped[mapped.length - 1].scanTitle);

        // Load dashboard data
        await loadDashboardData();
      } catch (err) {
        console.error("Error fetching scan results:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [loadDashboardData]);

  /* unique scan list with translations */
  const scanTypes = useMemo(
    () => Array.from(new Set(allResults.map((i) => i.scanTitle))),
    [allResults],
  );

  const translatedScanTypes = useMemo(
    () => scanTypes.map((scanType) => translateScanType(scanType)),
    [scanTypes],
  );

  /* apply filters */
  useEffect(() => {
    let res = [...allResults];
    if (scanF) res = res.filter((i) => i.scanTitle === scanF);
    if (yearF) res = res.filter((i) => i.date.startsWith(yearF));
    if (monthF)
      res = res.filter((i) => i.date.slice(5, 7) === monthMap[monthF]);
    if (scoreF) res = res.filter((i) => scoreBand(i.score) === scoreF);
    setFiltered(res);
    setPage(0);
  }, [allResults, scanF, yearF, monthF, scoreF]);

  /* chart paging */
  const { labels, data, totalPages } = useMemo(() => {
    const total = filtered.length;
    if (!total) return { labels: [], data: [], totalPages: 0 };
    const pages = Math.ceil(total / CHART_PAGE_SIZE);
    const current = Math.min(page, pages - 1);
    const start = current * CHART_PAGE_SIZE;
    const end = start + CHART_PAGE_SIZE;
    return {
      labels: filtered.map((r) => r.date).slice(start, end),
      data: filtered.map((r) => r.score).slice(start, end),
      totalPages: pages,
    };
  }, [filtered, page]);

  const latest = filtered[filtered.length - 1];

  /* ---------- render ---------- */

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>{t("insights.title")}</Text>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === "Dashboard" && styles.activeTab]}
          onPress={() => setActiveTab("Dashboard")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Dashboard" && styles.activeTabText,
            ]}
          >
            {t("insights.tabs.dashboard")}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === "Insights" && styles.activeTab]}
          onPress={() => setActiveTab("Insights")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Insights" && styles.activeTabText,
            ]}
          >
            {t("insights.tabs.insights")}
          </Text>
        </Pressable>
      </View>

      {/* Tab Content */}
      {activeTab === "Dashboard" ? (
        <ScrollView
          style={styles.dashboardScrollContainer}
          contentContainerStyle={styles.dashboardContentContainer}
        >
          <View style={styles.cardsGrid}>
            {/* Row 1 */}
            <View style={styles.row}>
              {/* XP Card */}
              <LinearGradient
                colors={["#8B5CF6", "#667EEA"]}
                style={styles.xpCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.xpHeader}>
                  <CustomIcon type="IO" name="flash" size={20} color="white" />
                  <Text style={styles.xpNumber}>
                    {totalXP} {t("insights.dashboard.xpLabel")}
                  </Text>
                </View>
                <Text style={styles.xpSubtitle}>
                  {t("insights.dashboard.totalExperience")}
                </Text>
              </LinearGradient>

              {/* Task Completed Card */}
              <View style={styles.whiteCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.checkmarkContainer}>
                    <CustomIcon type="IO" name="checkmark" size={16} color="white" />
                  </View>
                  <Text style={styles.bigNumber}>{completedTasks}</Text>
                </View>
                <Text style={styles.cardTitle}>
                  {t("insights.dashboard.tasksCompleted")}
                </Text>
                <Text style={styles.cardSubtitle}>
                  {completedTasks === 1
                    ? t("insights.dashboard.taskCompletedSingular", {
                        count: completedTasks,
                      })
                    : t("insights.dashboard.taskCompletedPlural", {
                        count: completedTasks,
                      })}
                </Text>
              </View>
            </View>

            {/* Row 2 */}
            <View style={styles.row}>
              {/* Interventions in Progress Card */}
              <Pressable
                style={styles.whiteCard}
                onPress={() => (navigation as any)?.navigate("InterventionsScreen", {
                  sourceScreen: "Insights",
                })}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.bigNumber}>{interventionsCount}</Text>
                  <View style={styles.viewIconContainer}>
                    <CustomIcon type="IO" name="eye-outline" size={12} color="#8b5cf6" />
                    <Text style={styles.viewText}>
                      {t("insights.dashboard.view")}
                    </Text>
                  </View>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: interventionsCount > 0 ? "75%" : "0%" },
                      ]}
                    />
                  </View>
                </View>
                <Text style={styles.cardTitle}>
                  {t("insights.dashboard.interventionsInProgress")}
                </Text>
                <Text style={styles.cardSubtitle}>
                  {interventionsCount === 1
                    ? t("insights.dashboard.interventionsActiveSingular", {
                        count: interventionsCount,
                      })
                    : t("insights.dashboard.interventionsActivePlural", {
                        count: interventionsCount,
                      })}
                </Text>
              </Pressable>

              {/* Conditions Card */}
              <Pressable
                style={styles.whiteCard}
                onPress={() => navigation?.navigate("ConditionsManagement")}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.brainIconContainer}>
                    <CustomIcon type="IO" name="medical" size={16} color="#8b5cf6" />
                  </View>
                  <Text style={styles.bigNumber}>{conditionsCount}</Text>
                  <View style={styles.viewIconContainer}>
                    <CustomIcon type="IO" name="eye-outline" size={12} color="#8b5cf6" />
                    <Text style={styles.viewText}>
                      {t("insights.dashboard.view")}
                    </Text>
                  </View>
                </View>
                <Text style={styles.cardTitle}>
                  {t("insights.dashboard.conditionsManaged")}
                </Text>
                <Text style={styles.cardSubtitle}>
                  {conditionsCount === 1
                    ? t("insights.dashboard.conditionsTrackedSingular", {
                        count: conditionsCount,
                      })
                    : t("insights.dashboard.conditionsTrackedPlural", {
                        count: conditionsCount,
                      })}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Filters */}
          <View style={styles.filtersContainer}>
            <Text style={styles.filterHeading}>
              {t("insights.filters.scanType")}
            </Text>
            <FilterDropdown
              label={
                scanF ? translateScanType(scanF) : t("insights.filters.all")
              }
              options={[t("insights.filters.all"), ...translatedScanTypes]}
              onSelect={(v) => {
                if (v === t("insights.filters.all")) {
                  setScanF(null);
                } else {
                  // Find the original scan type from the translated name
                  const originalScanType = scanTypes.find(
                    (scanType) => translateScanType(scanType) === v,
                  );
                  setScanF(originalScanType || null);
                }
              }}
            />

            <Text style={styles.filterHeading}>
              {t("insights.filters.conditionScore")}
            </Text>
            <FilterDropdown
              label={scoreF ?? t("insights.filters.allScores")}
              options={[
                t("insights.filters.allScores"),
                t("insights.scoreBands.normal"),
                t("insights.scoreBands.lowRisk"),
                t("insights.scoreBands.moderateRisk"),
                t("insights.scoreBands.severeRisk"),
              ]}
              onSelect={(v) =>
                setScoreF(
                  v === t("insights.filters.allScores")
                    ? null
                    : (v as ScoreBand),
                )
              }
            />

            <View style={styles.row}>
              <View style={styles.duration}>
                <Text style={styles.filterHeading}>
                  {t("insights.filters.month")}
                </Text>
                <FilterDropdown
                  label={monthF ?? t("insights.filters.all")}
                  options={[
                    t("insights.filters.all"),
                    ...Object.keys(monthMap),
                  ]}
                  onSelect={(v) =>
                    setMonthF(v === t("insights.filters.all") ? null : v)
                  }
                />
              </View>
              <View style={styles.duration}>
                <Text style={styles.filterHeading}>
                  {t("insights.filters.year")}
                </Text>
                <FilterDropdown
                  label={yearF ?? t("insights.filters.all")}
                  options={[
                    t("insights.filters.all"),
                    t("insights.years.2023"),
                    t("insights.years.2024"),
                    t("insights.years.2025"),
                  ]}
                  onSelect={(v) =>
                    setYearF(v === t("insights.filters.all") ? null : v)
                  }
                />
              </View>
            </View>
          </View>

          {/* Content */}
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#AB47BC"
              style={{ marginTop: 40 }}
            />
          ) : !allResults.length ? (
            <Text style={styles.centeredMessage}>
              {t("insights.messages.noScanResults")}
            </Text>
          ) : (
            <>
              {/* Chart */}
              <View style={styles.chartContainer}>
                {data.length ? (
                  <>
                    <LineChart
                      data={{ labels, datasets: [{ data }] }}
                      width={screenWidth - 40}
                      height={250}
                      chartConfig={{
                        backgroundColor: "#ffffff",
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: 0,
                        color: (opacity = 1) =>
                          `rgba(171, 71, 188, ${opacity})`,
                        labelColor: (opacity = 1) =>
                          `rgba(85, 85, 85, ${opacity})`,
                        propsForDots: {
                          r: "5",
                          strokeWidth: "2",
                          stroke: "#AB47BC",
                          fill: "#fff",
                        },
                        propsForBackgroundLines: {
                          stroke: "#E0E0E0",
                          strokeWidth: 1,
                        },
                      }}
                      bezier={false}
                      style={styles.chart}
                    />
                    {totalPages > 1 && (
                      <View style={styles.pagerRow}>
                        <Pressable
                          onPress={() => setPage((p) => Math.max(0, p - 1))}
                          disabled={page === 0}
                          style={[
                            styles.pageBtn,
                            page === 0 && styles.pageBtnDisabled,
                          ]}
                        >
                          <Text style={styles.pageBtnTxt}>
                            {t("insights.chart.pageNavigationPrevious")}
                          </Text>
                        </Pressable>
                        <Text style={styles.pageIndicator}>
                          {page + 1}
                          {t("insights.chart.pageIndicatorSeparator")}
                          {totalPages}
                        </Text>
                        <Pressable
                          onPress={() =>
                            setPage((p) => Math.min(totalPages - 1, p + 1))
                          }
                          disabled={page === totalPages - 1}
                          style={[
                            styles.pageBtn,
                            page === totalPages - 1 && styles.pageBtnDisabled,
                          ]}
                        >
                          <Text style={styles.pageBtnTxt}>
                            {t("insights.chart.pageNavigationNext")}
                          </Text>
                        </Pressable>
                      </View>
                    )}
                  </>
                ) : (
                  <Text style={styles.centeredMessage}>
                    {t("insights.messages.noResultsMatchFilters")}
                  </Text>
                )}{" "}
                <Text style={styles.chartTitle}>
                  {scanF
                    ? t("insights.chart.scanScoreOverTime", {
                        scanType: translateScanType(scanF),
                      })
                    : t("insights.chart.scoreOverTime")}
                </Text>
              </View>

              {/* Summary */}
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>
                  {t("insights.summary.title")}
                </Text>
                <Text style={styles.summaryText}>
                  {t("insights.summary.showingResults", {
                    count: filtered.length,
                    plural: filtered.length === 1 ? "" : "s",
                  })}
                </Text>
                {latest?.tiers?.length ? (
                  <Text style={styles.summaryText}>
                    {t("insights.summary.latestRecommendedTiers", {
                      tiers: latest.tiers.join(", "),
                    })}
                  </Text>
                ) : null}
              </View>
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

/* ---------- styles ---------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  scrollContent: { paddingBottom: 40 },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },

  /* Tab Styles */
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#AB47BC",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#fff",
  },

  /* Dashboard Styles */
  dashboardScrollContainer: {
    flex: 1,
  },
  dashboardContentContainer: {
    padding: 20,
    paddingTop: 10,
  },
  cardsGrid: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  xpCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  whiteCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  xpHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  xpNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  xpSubtitle: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
  },
  brainIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  viewIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    marginLeft: "auto",
  },
  viewText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#8b5cf6",
  },
  bigNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 2,
    lineHeight: 18,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 16,
  },
  progressBarContainer: {
    marginVertical: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    width: "75%",
    backgroundColor: "#8B5CF6",
    borderRadius: 3,
  },

  /* Insights Styles */
  filtersContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  filterHeading: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 8,
  },
  duration: { width: "48%" },
  chartContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingVertical: 15,
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  chart: { borderRadius: 8 },
  chartTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#AB47BC",
    textAlign: "center",
    marginTop: 15,
  },
  pagerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  pageBtn: {
    borderWidth: 1,
    borderColor: "#AB47BC",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginHorizontal: 8,
  },
  pageBtnDisabled: { opacity: 0.3 },
  pageBtnTxt: { fontSize: 16, color: "#AB47BC" },
  pageIndicator: { fontSize: 12, color: "#AB47BC", fontWeight: "bold" },
  centeredMessage: {
    textAlign: "center",
    marginTop: 50,
    marginHorizontal: 20,
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  summaryContainer: {
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#AB47BC",
    marginBottom: 10,
    textAlign: "center",
  },
  summaryText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 5,
    textAlign: "center",
  },
});
