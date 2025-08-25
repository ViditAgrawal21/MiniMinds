// app/screens/MindToolsScreen.tsx
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "@/components/CustomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

import MoodSelector from "../../../components/MoodSelector";
//import Interventions from "../../../components/Interventions/Interventions";
import MindfulPlaylist from "../../../components/MindfulPlaylist/MindfulPlaylist";

export default function MindToolsScreen({ navigation }: any) {
  const [dailyTasksCount, setDailyTasksCount] = useState(0);
  const [interventionsCount, setInterventionsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadCounts = useCallback(async () => {
    setIsLoading(true);
    try {
      // Load all storage items in parallel for better performance
      const tabs = ["Daily", "Weekly", "Bi-weekly", "Monthly"];
      const storageKeys = tabs.map((tab) => `interventions_${tab}`);
      
      // Get all intervention data in parallel
      const storagePromises = storageKeys.map((key) =>
        AsyncStorage.getItem(key),
      );
      const storageResults = await Promise.all(storagePromises);
      
      let dailyCount = 0;
      let totalCount = 0;

      storageResults.forEach((result, index) => {
        if (result) {
          try {
            const parsed = JSON.parse(result);
            const count = Array.isArray(parsed) ? parsed.length : 0;
            
            if (tabs[index] === "Daily") {
              dailyCount = count;
            }
            totalCount += count;
          } catch (parseError) {
            console.error(`Error parsing ${storageKeys[index]}:`, parseError);
          }
        }
      });

      setDailyTasksCount(dailyCount);
      setInterventionsCount(totalCount);
    } catch (error) {
      console.error("Error loading counts:", error);
      // Set default values on error
      setDailyTasksCount(0);
      setInterventionsCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh counts whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadCounts();
    }, [loadCounts]),
  );

  const handleTaskPress = (taskType: string) => {
    console.log(`${taskType} task pressed`);
    console.log("Navigation object:", navigation);
    // Navigate to interventions screen
    if (navigation) {
      console.log("Attempting to navigate to InterventionsScreen");
      navigation.navigate("InterventionsScreen", {
        sourceScreen: "MindTools",
      });
    } else {
      console.log("Navigation object is null/undefined");
    }
  };

  const handleJournalPress = () => {
    console.log("Journal pressed - Navigating to JournalHistoryScreen");
    navigation.navigate("JournalHistoryScreen");
  };

  const handleCategoryPress = (categoryName: string) => {
    console.log(`${categoryName} pressed`);
    switch (categoryName) {
      case "ADHD":
        navigation.navigate("ADHDScreen");
        break;
      case "Aggressive Behaviour":
        navigation.navigate("AggressiveBehaviourScreen");
        break;
      case "Conduct Issues":
        navigation.navigate("ConductIssueScreen");
        break;
      case "Eating Habits":
        navigation.navigate("EatingHabitScreen");
        break;
      case "Introvert Child":
        navigation.navigate("IntrovertChildScreen");
        break;
      case "Self-care hygiene":
        navigation.navigate("SelfCareHygieneScreen");
        break;
      case "Substance Addiction":
        navigation.navigate("SubstanceAddictionScreen");
        break;
      case "Dealing with trauma, loss, and dreams":
        navigation.navigate("TraumaLossAndDreamsScreen");
        break;
      case "Friendship and relationship":
        navigation.navigate("FriendshipAndRelationshipScreen");
        break;
      case "Self-esteem and self-identity":
        navigation.navigate("SelfEsteemAndSelfIdentityScreen");
        break;
      case "Unrealistic beauty standards and obesity":
        navigation.navigate("UnrealisticBeautyStandardsScreen");
        break;
      case "Dark Web and OnlyFans":
        navigation.navigate("DarkWebAndOnlyFansScreen");
        break;
      case "Gambling and gaming addiction":
        navigation.navigate("GamblingAndGamingAddictionScreen");
        break;
      case "Internet addiction":
        navigation.navigate("InternetAddictionScreen");
        break;
      case "Social Mental Health":
        navigation.navigate("SocialMentalHealthScreen");
        break;
      case "Porn Addiction":
        navigation.navigate("PornAddictionScreen");
        break;
      case "Emotional Intelligence":
        navigation.navigate("EmotionalIntelligenceScreen");
        break;
      case "Breakup and rebound":
        navigation.navigate("BreakupAndReboundScreen");
        break;
      default:
        Alert.alert(
          t("mindToolsScreen.navigation"),
          t("mindToolsScreen.navigateTo", { categoryName }),
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <MoodSelector />

        {/* Assigned Tasks Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("mindToolsScreen.assignedTasks")}
          </Text>

          <View style={styles.tasksGrid}>
            {/* Daily Tasks to Be Completed */}
            <Pressable
              style={[styles.taskCard, isLoading && styles.taskCardLoading]}
              onPress={() => handleTaskPress("Daily")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="happy-outline" size={24} color="#1f2937" />
                </View>
                <Text style={styles.taskNumber}>
                  {isLoading ? t("mindToolsScreen.loading") : dailyTasksCount}
                </Text>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.taskTitle}>
                {t("mindToolsScreen.dailyTasksTitle")}
              </Text>
              <Text style={styles.taskDescription}>
                {isLoading
                  ? t("mindToolsScreen.dailyTasksDescriptionLoading")
                  : dailyTasksCount === 1
                    ? t("mindToolsScreen.dailyTasksDescriptionSingular", {
                        count: dailyTasksCount,
                      })
                    : t("mindToolsScreen.dailyTasksDescriptionPlural", {
                        count: dailyTasksCount,
                      })}
              </Text>
            </Pressable>

            {/* Total Interventions in Progress */}
            <Pressable
              style={[styles.taskCard, isLoading && styles.taskCardLoading]}
              onPress={() => handleTaskPress("All")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="calendar-outline" size={24} color="#1f2937" />
                </View>
                <Text style={styles.taskNumber}>
                  {isLoading
                    ? t("mindToolsScreen.loading")
                    : interventionsCount}
                </Text>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.taskTitle}>
                {t("mindToolsScreen.totalInterventionsTitle")}
              </Text>
              <Text style={styles.taskDescription}>
                {isLoading
                  ? t("mindToolsScreen.totalInterventionsDescriptionLoading")
                  : interventionsCount === 1
                    ? t(
                        "mindToolsScreen.totalInterventionsDescriptionSingular",
                        {
                          count: interventionsCount,
                        },
                      )
                    : t("mindToolsScreen.totalInterventionsDescriptionPlural", {
                        count: interventionsCount,
                      })}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* View Journal History Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("mindToolsScreen.viewJournalHistory")}
          </Text>

          <Pressable style={styles.journalCard} onPress={handleJournalPress}>
            <View style={styles.journalContent}>
              <View style={styles.journalIconContainer}>
                <CustomIcon type="IO" name="journal-outline" size={28} color="#8b5cf6" />
              </View>
              <View style={styles.journalTextContainer}>
                <Text style={styles.journalTitle}>
                  {t("mindToolsScreen.journalTitle")}
                </Text>
                <Text style={styles.journalSubtitle}>
                  {t("mindToolsScreen.journalSubtitle")}
                </Text>
              </View>
              <View style={styles.journalArrow}>
                <CustomIcon type="IO" name="chevron-forward" size={20} color="#6b7280" />
              </View>
            </View>
          </Pressable>
        </View>

        {/* Mental Health Conditions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("mindToolsScreen.mentalHealthConditions")}
          </Text>

          <View style={styles.categoriesGrid}>
            {/* Row 1 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("ADHD")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="flash-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.adhd.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.adhd.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Aggressive Behaviour")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="shield-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.aggressiveBehaviour.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.aggressiveBehaviour.description")}
              </Text>
            </Pressable>

            {/* Row 2 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Conduct Issues")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO"
                    name="library-outline"
                    size={24}
                    color="#1f2937"
                  />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.conductIssues.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.conductIssues.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Eating Habits")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="restaurant-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.eatingHabits.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.eatingHabits.description")}
              </Text>
            </Pressable>

            {/* Row 3 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Introvert Child")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="person-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.introvertChild.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.introvertChild.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Self-care hygiene")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="heart" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.selfCareHygiene.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.selfCareHygiene.description")}
              </Text>
            </Pressable>

            {/* Row 4 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Substance Addiction")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="shield-checkmark-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.substanceAddiction.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.substanceAddiction.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Breakup and rebound")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="heart-dislike-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.breakupAndRebound.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.breakupAndRebound.description")}
              </Text>
            </Pressable>

            {/* Row 5 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Dealing with trauma, loss, and dreams")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="heart-half-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.traumaLossAndDreams.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.traumaLossAndDreams.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Friendship and relationship")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="people-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.friendshipAndRelationship.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.friendshipAndRelationship.description")}
              </Text>
            </Pressable>

            {/* Row 6 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Self-esteem and self-identity")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="heart" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.selfEsteemAndSelfIdentity.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.selfEsteemAndSelfIdentity.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Unrealistic beauty standards and obesity")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="body-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.unrealisticBeautyStandards.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.unrealisticBeautyStandards.description")}
              </Text>
            </Pressable>

            {/* Row 7 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Dark Web and OnlyFans")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="warning-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.darkWebAndOnlyFans.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.darkWebAndOnlyFans.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Gambling and gaming addiction")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO"
                    name="game-controller-outline"
                    size={24}
                    color="#1f2937"
                  />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.gamblingAndGamingAddiction.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.gamblingAndGamingAddiction.description")}
              </Text>
            </Pressable>

            {/* Row 8 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Internet addiction")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO"
                    name="wifi-outline"
                    size={24}
                    color="#1f2937"
                  />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.internetAddiction.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.internetAddiction.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Porn Addiction")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="warning-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.pornAddiction.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.pornAddiction.description")}
              </Text>
            </Pressable>

            {/* Row 9 - Full Width Emotional Intelligence Card */}
            <Pressable
              style={styles.emotionalIntelligenceCard}
              onPress={() => handleCategoryPress("Emotional Intelligence")}
            >
              <View style={styles.eqCardHeader}>
                <View style={styles.eqIconContainer}>
                  <CustomIcon type="IO" name="heart" size={32} color="#8b5cf6" />
                </View>
                <View style={styles.eqTextContainer}>
                  <Text style={styles.eqCardTitle}>
                    {t("mindToolsScreen.categories.emotionalIntelligence.title")}
                  </Text>
                  <Text style={styles.eqCardDescription}>
                    {t("mindToolsScreen.categories.emotionalIntelligence.description")}
                  </Text>
                </View>
                <View style={styles.eqArrowContainer}>
                  <CustomIcon type="IO" name="chevron-forward" size={20} color="#6b7280" />
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        <MindfulPlaylist />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9ff",
  },
  content: {
    paddingBottom: 32,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 16,
  },
  tasksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  taskCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  taskCardLoading: {
    opacity: 0.7,
    backgroundColor: "#f9fafb",
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  taskIconContainer: {
    marginRight: 8,
  },
  taskNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
    lineHeight: 18,
  },
  taskDescription: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 16,
  },
  journalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  journalContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  journalIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  journalTextContainer: {
    flex: 1,
  },
  journalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
    lineHeight: 20,
  },
  journalSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 17,
  },
  journalArrow: {
    marginLeft: 12,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
    lineHeight: 18,
  },
  categoryDescription: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 16,
  },
  // Full-width Emotional Intelligence Card Styles
  emotionalIntelligenceCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    borderWidth: 2,
    borderColor: "#8b5cf6",
    shadowColor: "#8b5cf6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  eqCardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  eqIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  eqTextContainer: {
    flex: 1,
  },
  eqCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
    lineHeight: 24,
  },
  eqCardDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  eqArrowContainer: {
    marginLeft: 12,
    padding: 4,
  },
});
