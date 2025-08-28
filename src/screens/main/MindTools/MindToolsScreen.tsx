// app/screens/MindToolsScreen.tsx
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "../../../components/CustomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { t } from "../../../i18n/locales/i18n"; // Import the translation function
// Premium access control imports
import { canAccessFeature } from "../../../utils/premiumUtils";

import MoodSelector from "../../../components/MoodSelector";
//import Interventions from "../../../components/Interventions/Interventions";
import MindfulPlaylist from "../../../components/MindfulPlaylist/MindfulPlaylist";

export default function MindToolsScreen({ navigation }: any) {
  const [dailyTasksCount, setDailyTasksCount] = useState(0);
  const [interventionsCount, setInterventionsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // Premium access dialog state
  const [dialogVisible, setDialogVisible] = useState(false);
  const [blockedPlan, setBlockedPlan] = useState<"basic" | "premium" | null>(
    null,
  );

  // Define category access requirements (same as condition scans)
  const categoryAccessMap: Record<string, "free" | "basic" | "premium"> = {
    // FREE categories
    "Anger Management": "free",
    Stress: "free",
    "Internet & Social Media": "free",

    // BASIC categories
    "Family & Relationship": "basic",
    Sleep: "basic",
    "Suicidal Behaviour": "basic",
    "Sex Life": "basic",

    // PREMIUM categories
    Addictions: "premium",
    "Common Psychological": "premium",
    "Environment Issues": "premium",
    "Financial Mental Health": "premium",
    "Physical Fitness": "premium",
    "Internet Dependence": "premium",
    "Professional Mental Health": "premium",
    "Social Mental Health": "premium",
    "Youngster Issues": "premium",
    "Emotional Intelligence": "premium",
  };

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

  const handleCategoryPress = async (categoryName: string) => {
    console.log(`${categoryName} pressed`);
    
    // Check if category requires premium access
    const requiredPlan = categoryAccessMap[categoryName];
    if (!requiredPlan) {
      console.warn(`No access plan defined for category: ${categoryName}`);
      return;
    }

    // Check premium access
    const canAccess = await canAccessFeature(requiredPlan);
    
    if (!canAccess) {
      // Track which plan blocked access so we can show correct copy (basic -> needs premium, premium -> needs ultra)
      setBlockedPlan(requiredPlan === "basic" ? "basic" : "premium");
      setDialogVisible(true);
      return;
    }

    // User has access, proceed with navigation
    switch (categoryName) {
      case "Anger Management":
        navigation.navigate("AngerManagementScreen");
        break;
      case "Stress":
        navigation.navigate("StressScreen");
        break;
      case "Internet & Social Media":
        navigation.navigate("InternetSocialMediaScreen");
        break;
      case "Family & Relationship":
        navigation.navigate("FamilyRelationshipScreen");
        break;
      case "Sleep":
        navigation.navigate("SleepScreen");
        break;
      case "Suicidal Behaviour":
        navigation.navigate("SuicidalBehaviourScreen");
        break;
      case "Sex Life":
        navigation.navigate("SexLifeScreen");
        break;
      case "Addictions":
        navigation.navigate("AddictionsScreen");
        break;
      case "Common Psychological":
        navigation.navigate("CommonPsychologicalScreen");
        break;
      case "Environment Issues":
        navigation.navigate("EnvironmentIssuesScreen");
        break;
      case "Financial Mental Health":
        navigation.navigate("FinancialMentalHealthScreen");
        break;
      case "Physical Fitness":
        navigation.navigate("PhysicalFitnessScreen");
        break;
      case "Internet Dependence":
        navigation.navigate("InternetDependenceScreen");
        break;
      case "Professional Mental Health":
        navigation.navigate("ProfessionalMentalHealthScreen");
        break;
      case "Social Mental Health":
        navigation.navigate("SocialMentalHealthScreen");
        break;
      case "Youngster Issues":
        navigation.navigate("YoungsterIssuesScreen");
        break;
      case "Emotional Intelligence":
        navigation.navigate("EmotionalIntelligenceScreen");
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
              onPress={() => handleCategoryPress("Anger Management")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="flame-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.angerManagement.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.angerManagement.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Stress")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="pulse-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.stress.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.stress.description")}
              </Text>
            </Pressable>

            {/* Row 2 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Internet & Social Media")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO"
                    name="phone-portrait-outline"
                    size={24}
                    color="#1f2937"
                  />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.internetSocialMedia.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t(
                  "mindToolsScreen.categories.internetSocialMedia.description",
                )}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Family & Relationship")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="people-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.familyRelationship.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.familyRelationship.description")}
              </Text>
            </Pressable>

            {/* Row 3 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Sleep")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="moon-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.sleep.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.sleep.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Suicidal Behaviour")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO"
                    name="heart-dislike-outline"
                    size={24}
                    color="#1f2937"
                  />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.suicidalBehaviour.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.suicidalBehaviour.description")}
              </Text>
            </Pressable>

            {/* Row 4 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Sex Life")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="heart-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.sexLife.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.sexLife.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Addictions")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="ban-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.addictions.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.addictions.description")}
              </Text>
            </Pressable>

            {/* Row 5 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Common Psychological")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="medical-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.commonPsychological.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t(
                  "mindToolsScreen.categories.commonPsychological.description",
                )}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Environment Issues")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="leaf-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.environmentIssues.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.environmentIssues.description")}
              </Text>
            </Pressable>

            {/* Row 6 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Financial Mental Health")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="card-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.financialMentalHealth.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t(
                  "mindToolsScreen.categories.financialMentalHealth.description",
                )}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Physical Fitness")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="fitness-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.physicalFitness.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.physicalFitness.description")}
              </Text>
            </Pressable>

            {/* Row 7 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Internet Dependence")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="wifi-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.internetDependence.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.internetDependence.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Professional Mental Health")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO"
                    name="briefcase-outline"
                    size={24}
                    color="#1f2937"
                  />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.professionalMentalHealth.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t(
                  "mindToolsScreen.categories.professionalMentalHealth.description",
                )}
              </Text>
            </Pressable>

            {/* Row 8 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Social Mental Health")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO"
                    name="chatbubbles-outline"
                    size={24}
                    color="#1f2937"
                  />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.socialMentalHealth.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.socialMentalHealth.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Youngster Issues")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="school-outline" size={24} color="#1f2937" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.youngsterIssues.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.youngsterIssues.description")}
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
                    {t(
                      "mindToolsScreen.categories.emotionalIntelligence.title",
                    )}
                  </Text>
                  <Text style={styles.eqCardDescription}>
                    {t(
                      "mindToolsScreen.categories.emotionalIntelligence.description",
                    )}
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

      {/* Upgrade dialog */}
      <Modal
        visible={dialogVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setDialogVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.dialogTitle}>
              {blockedPlan
                ? t(`mindToolsScreen.upgradeDialog.${blockedPlan}.title`)
                : t("upgradeDialog.title")}
            </Text>
            
            <Text style={styles.dialogText}>
              {blockedPlan
                ? t(`mindToolsScreen.upgradeDialog.${blockedPlan}.message`)
                : t("upgradeDialog.message")}
            </Text>
            
            <View style={styles.dialogActions}>
              <Pressable 
                style={styles.cancelButton}
                onPress={() => setDialogVisible(false)}
              >
                <Text style={styles.cancelButtonText}>
                  {blockedPlan
                    ? t("mindToolsScreen.upgradeDialog.cancelButton")
                    : t("upgradeDialog.cancelButton")}
                </Text>
              </Pressable>
              <Pressable
                style={styles.upgradeButton}
                onPress={() => {
                  setDialogVisible(false);
                  // Navigate to unified upgrade screen route name used elsewhere (ConditionScans uses "Upgrade")
                  navigation.navigate("Upgrade");
                }}
              >
                <Text style={styles.upgradeButtonLabel}>
                  {blockedPlan
                    ? t("mindToolsScreen.upgradeDialog.upgradeButton")
                    : t("upgradeDialog.upgradeButton")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  upgradeButton: {
    backgroundColor: "#AB47BC",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  upgradeButtonLabel: {
    color: "#ffffff",
    fontWeight: "600",
    textAlign: 'center',
  },
  // Modal styles for upgrade popup
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#1f2937',
  },
  dialogText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6b7280',
    lineHeight: 20,
  },
  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f9fafb',
  },
  cancelButtonText: {
    color: '#6b7280',
    fontWeight: '600',
    textAlign: 'center',
  },
});
