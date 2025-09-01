import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import CustomIcon from "@/components/CustomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

interface ActivityLog {
  id: string;
  title: string;
  type: string;
  timeAgo: string;
  xp: number;
  completedAt: string;
  interventionType?: "CBT" | "REBT" | "Other";
}

interface Intervention {
  id: string;
  type: "CBT" | "REBT" | "Other";
  name: string;
  xp: number;
  completedAt: string;
  conditionId: string;
}

interface Condition {
  id: string;
  name: string;
  description: string;
  percentage: number;
  xp: number;
  color: string;
  category: string;
  date: string;
  interventions: Intervention[];
}

interface ConditionDetailScreenProps {
  condition: Condition;
  onBack: () => void;
}

// XP System Functions
const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 1000) + 1;
};

const calculateLevelProgress = (xp: number): number => {
  return ((xp % 1000) / 1000) * 100;
};

export default function ConditionDetailScreen({
  condition,
  onBack,
}: ConditionDetailScreenProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load activity logs for this specific condition
        const activityLogsKey = `${condition.name
          .toLowerCase()
          .replace(/\s+/g, "_")}_activity_logs`;
        const activityLogsData = await AsyncStorage.getItem(activityLogsKey);

        if (activityLogsData) {
          const logs: ActivityLog[] = JSON.parse(activityLogsData);
          // Sort by completion time (most recent first)
          const sortedLogs = logs.sort(
            (a, b) =>
              new Date(b.completedAt).getTime() -
              new Date(a.completedAt).getTime(),
          );
          setActivityLogs(sortedLogs);
        } else {
          // If no specific logs exist, create some sample activity
          setActivityLogs([]);
        }
      } catch (error) {
        console.error("Error loading condition data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 2000); // Refresh every 2 seconds
    return () => clearInterval(interval);
  }, [condition.id, condition.name]);

  const calculateTimeAgo = (completedAt: string) => {
    const now = new Date();
    const completed = new Date(completedAt);
    const diffInMs = now.getTime() - completed.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        if (diffInMinutes <= 0) return t("conditionDetail.time.justNow");
        return diffInMinutes === 1
          ? t("conditionDetail.time.minuteAgoSingular", {
              count: diffInMinutes,
            })
          : t("conditionDetail.time.minuteAgoPlural", {
              count: diffInMinutes,
            });
      }
      return diffInHours === 1
        ? t("conditionDetail.time.hourAgoSingular", {
            count: diffInHours,
          })
        : t("conditionDetail.time.hourAgoPlural", {
            count: diffInHours,
          });
    }
    return diffInDays === 1
      ? t("conditionDetail.time.dayAgoSingular", {
          count: diffInDays,
        })
      : t("conditionDetail.time.dayAgoPlural", {
          count: diffInDays,
        });
  };

  const getCurrentLevel = () => {
    return calculateLevel(condition.xp);
  };

  const getXPToNextLevel = () => {
    return condition.xp % 1000;
  };

  const getProgressPercentage = () => {
    return calculateLevelProgress(condition.xp);
  };

  const getTherapyTypes = () => {
    // Return all 5 strategy types that are tracked
    return [
      t("conditionDetail.interventionTypes.cbt"),
      t("conditionDetail.interventionTypes.rebt"),
      t("conditionDetail.interventionTypes.yoga"),
      t("conditionDetail.interventionTypes.relaxation"),
      t("conditionDetail.interventionTypes.commonSuggestions"),
    ];
  };

  const getConditionIcon = () => {
    // Return appropriate icon based on condition category
    const iconMap: Record<string, string> = {
      "Anxiety Disorders": "heart-outline",
      "Mood Disorders": "happy-outline",
      "Personality Disorders": "person-outline",
      "Obsessive-Compulsive Disorders": "reload-outline",
      "Trauma-Related Disorders": "shield-outline",
      "Eating Disorders": "nutrition-outline",
      "Substance Use Disorders": "medical-outline",
      "Sleep Disorders": "moon-outline",
    };

    return iconMap[condition.category] || "medical-outline";
  };

  const therapyTypes = getTherapyTypes();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>{condition.name}</Text>
        <View style={styles.xpContainer}>
          <CustomIcon type="IO" name="flash" size={16} color="#8b5cf6" />
          <Text style={styles.xpText}>{condition.xp} XP</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === "overview" && styles.activeTab]}
          onPress={() => setActiveTab("overview")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "overview" && styles.activeTabText,
            ]}
          >
            {t("conditionDetail.tabs.overview")}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === "activity" && styles.activeTab]}
          onPress={() => setActiveTab("activity")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "activity" && styles.activeTabText,
            ]}
          >
            {t("conditionDetail.tabs.activityLogs")}
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "overview" ? (
          <View style={styles.overviewContent}>
            {/* Progress Section */}
            <Text style={styles.sectionTitle}>
              {t("conditionDetail.overview.progressTitle")}
            </Text>
            <View style={styles.progressHeader}>
              <Text style={styles.progressPercentage}>
                {getProgressPercentage().toFixed(1)}%
              </Text>
              <View style={styles.levelContainer}>
                <Text style={styles.levelText}>
                  {t("conditionDetail.overview.levelPrefix")}{" "}
                  {getCurrentLevel()}
                </Text>
                <Text style={styles.levelSubtext}>
                  {t("conditionDetail.overview.xpToNextLevel", {
                    xp: getXPToNextLevel(),
                  })}
                </Text>
              </View>
            </View>

            {/* Category Info */}
            <View style={styles.categoryContainer}>
              <View style={styles.categoryCard}>
                <CustomIcon type="IO"
                  name={getConditionIcon() as any}
                  size={24}
                  color="#8b5cf6"
                />
                <Text style={styles.categoryTitle}>
                  {t("conditionDetail.overview.category")}
                </Text>
                <Text style={styles.categoryText}>{condition.category}</Text>
              </View>
              <View style={styles.categoryCard}>
                <CustomIcon type="IO" name="calendar-outline" size={24} color="#8b5cf6" />
                <Text style={styles.categoryTitle}>
                  {t("conditionDetail.overview.started")}
                </Text>
                <Text style={styles.categoryText}>{condition.date}</Text>
              </View>
            </View>

            {/* Sessions */}
            <View style={styles.sessionsContainer}>
              <View style={styles.sessionsRow}>
                {therapyTypes.slice(0, 3).map((therapy) => (
                  <View key={therapy} style={styles.sessionCard}>
                    <Text style={styles.sessionTitle}>{therapy}</Text>
                    <Text style={styles.sessionCount}>
                      {
                        activityLogs.filter((log) => log.type === therapy)
                          .length
                      }
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.sessionsRow}>
                {therapyTypes.slice(3, 5).map((therapy) => (
                  <View
                    key={therapy}
                    style={[styles.sessionCard, styles.sessionCardWide]}
                  >
                    <Text style={styles.sessionTitle}>{therapy}</Text>
                    <Text style={styles.sessionCount}>
                      {
                        activityLogs.filter((log) => log.type === therapy)
                          .length
                      }
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Chart Placeholder */}
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>
                {t("conditionDetail.overview.progressChart")}
              </Text>
              <View style={styles.chartPlaceholder}>
                <View style={styles.chartContent}>
                  <CustomIcon type="IO" name="trending-up" size={48} color="#8b5cf6" />
                  <Text style={styles.chartText}>
                    {activityLogs.length > 0
                      ? activityLogs.length === 1
                        ? t("conditionDetail.overview.chartDataSingular", {
                            count: activityLogs.length,
                          })
                        : t("conditionDetail.overview.chartDataPlural", {
                            count: activityLogs.length,
                          })
                      : t("conditionDetail.overview.chartNoData")}
                  </Text>
                </View>
              </View>
            </View>

            {/* Description */}
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                {t("conditionDetail.overview.aboutCondition")}
              </Text>
              <Text style={styles.descriptionText}>
                {condition.description}
              </Text>
            </View>

            {/* View Statistics */}
            <Pressable style={styles.statisticsButton}>
              <Text style={styles.statisticsButtonText}>
                {t("conditionDetail.overview.viewStatistics")}
              </Text>
              <CustomIcon type="IO" name="arrow-forward" size={16} color="#8b5cf6" />
            </Pressable>
          </View>
        ) : (
          <View style={styles.activityContent}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityTitle}>
                {t("conditionDetail.activity.title")}
              </Text>
              <View style={styles.activityStats}>
                <Text style={styles.activityStatsText}>
                  {t("conditionDetail.activity.totalAndXP", {
                    total: activityLogs.length,
                    xp: activityLogs.reduce((sum, log) => sum + log.xp, 0),
                  })}
                </Text>
              </View>
            </View>

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                  {t("conditionDetail.activity.loading")}
                </Text>
              </View>
            ) : activityLogs.length === 0 ? (
              <View style={styles.emptyStateContainer}>
                <CustomIcon type="IO" name="clipboard-outline" size={64} color="#d1d5db" />
                <Text style={styles.emptyStateTitle}>
                  {t("conditionDetail.activity.emptyTitle")}
                </Text>
                <Text style={styles.emptyStateText}>
                  {t("conditionDetail.activity.emptyMessage")}
                </Text>
              </View>
            ) : (
              activityLogs.map((log) => (
                <View key={log.id} style={styles.activityItem}>
                  <View style={styles.activityLeft}>
                    <Text style={styles.activityItemTitle}>{log.title}</Text>
                    <Text style={styles.activityItemTime}>
                      {calculateTimeAgo(log.completedAt)}
                    </Text>
                  </View>
                  <View style={styles.activityRight}>
                    <Text style={styles.activityType}>{log.type}</Text>
                    <Text style={styles.activityXp}>+{log.xp} XP</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: "#f8f9ff",
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    flex: 1,
    marginLeft: 8,
  },
  xpContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  xpText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8b5cf6",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#f3f4f6",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  activeTabText: {
    color: "#1a1a1a",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  overviewContent: {
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: "700",
    color: "#8b5cf6",
  },
  levelContainer: {
    alignItems: "flex-end",
  },
  levelText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  levelSubtext: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "right",
  },
  categoryContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 8,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
  },
  sessionsContainer: {
    marginBottom: 32,
  },
  sessionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  sessionCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  sessionCardWide: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
    textAlign: "center",
  },
  sessionCount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  chartContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 120,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  chartContent: {
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
  },
  chartText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  descriptionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  statisticsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  statisticsButtonText: {
    fontSize: 16,
    color: "#8b5cf6",
    fontWeight: "500",
  },
  activityContent: {
    paddingBottom: 32,
  },
  activityHeader: {
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  activityStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  activityStatsText: {
    fontSize: 14,
    color: "#6b7280",
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: "#6b7280",
  },
  emptyStateContainer: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  activityLeft: {
    flex: 1,
  },
  activityItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  activityItemTime: {
    fontSize: 14,
    color: "#6b7280",
  },
  activityRight: {
    alignItems: "flex-end",
  },
  activityType: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8b5cf6",
    backgroundColor: "#f3e8ff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  activityXp: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10b981",
  },
});
