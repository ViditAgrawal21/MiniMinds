// app/screens/MindToolsScreen.tsx
import React, { useState, useCallback, use } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "../../../components/CustomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { t } from "../../../i18n/locales/i18n"; // Import the translation function
// Premium access control imports
import { canAccessFeature } from "../../../utils/premiumUtils";
import MoodSelector from "../../../components/MoodSelector";
//import Interventions from "../../../components/Interventions/Interventions";
import MindfulPlaylist from "../../../components/MindfulPlaylist/MindfulPlaylist";
import { useExitConfirmation } from "../../../hooks/useExitConfirmation";

// Define your navigation stack param list
type RootStackParamList = {
  InterventionsScreen: undefined;
  JournalHistoryScreen: undefined;
  ADHDScreen: undefined;
  AggressiveBehaviourScreen: undefined;
  ConductIssueScreen: undefined;
  IntrovertChildScreen: undefined;
  EatingHabitScreen: undefined;
  AngerManagementScreen: undefined;
  StressScreen: undefined;
  InternetSocialMediaScreen: undefined;
  FamilyRelationshipScreen: undefined;
  SleepScreen: undefined;
  SuicidalBehaviourScreen: undefined;
  SexLifeScreen: undefined;
  AddictionsScreen: undefined;
  CommonPsychologicalScreen: undefined;
  EnvironmentIssuesScreen: undefined;
  FinancialMentalHealthScreen: undefined;
  PhysicalFitnessScreen: undefined;
  InternetDependenceScreen: undefined;
  ProfessionalMentalHealthScreen: undefined;
  SocialMentalHealthScreen: undefined;
  YoungsterIssuesScreen: undefined;
  JobInsecurityScreen: undefined;
  EmotionalIntelligenceScreen: undefined;
  BreakupAndReboundScreen: undefined;
  AbusiveLanguageBackAnsweringScreen: undefined;
  DarkWebAndOnlyFansScreen: undefined;
  DatingSitesAndComplicationsScreen: undefined;
  ExamStressScreen: undefined;
  FriendshipAndRelationshipScreen: undefined;
  GamblingAndGamingAddictionScreen: undefined;
  InternetAddictionScreen: undefined;
  ParentingFromChildViewScreen: undefined;
  ParentingFromParentsViewScreen: undefined;
  PornAddictionScreen: undefined;
  SelfCareHygieneScreen: undefined;
  SelfEsteemAndSelfIdentityScreen: undefined;
  SocialMediaIssuesScreen: undefined;
  SubstanceAddictionScreen: undefined;
  TraumaLossAndDreamsScreen: undefined;
  UnrealisticBeautyStandardsScreen: undefined;
  Upgrade: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MindToolsScreen() {
  const [dailyTasksCount, setDailyTasksCount] = useState(0);
  const [interventionsCount, setInterventionsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // Premium access dialog state
  const [dialogVisible, setDialogVisible] = useState(false);
  const [blockedPlan, setBlockedPlan] = useState<"basic" | "premium" | null>(
    null,
  );
  const navigation = useNavigation<NavigationProp>();

  // Exit confirmation hook
  const { ExitConfirmationModal } = useExitConfirmation();


  // Define category access requirements (same as condition scans)
  const categoryAccessMap: Record<string, "free" | "basic" | "premium"> = {
    // FREE categories
    "Anger Management": "free",
    Stress: "free",
    "Internet & Social Media": "free",
    // Miniminds free categories
    BreakupAndRebound: "free",
    AbusiveLanguageBackAnswering: "free",
    ExamStress: "free",
    DarkWebAndOnlyFans: "free",
    FriendshipAndRelationship: "free",
    DatingSitesAndComplications: "free",
    GamblingAndGamingAddiction: "free",
    InternetAddiction: "free",
    ParentingFromChildView: "free",
    ParentingFromParentsView: "free",
    PornAddiction: "free",
    SelfCareHygiene: "free",
    SelfEsteemAndSelfIdentity: "free",
    SocialMediaIssues: "free",
    SubstanceAddiction: "free",
    TraumaLossAndDreams: "free",
    UnrealisticBeautyStandards: "free",

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
    "Job Insecurity": "premium",
    "Youngster Issues": "premium",
    "Emotional Intelligence": "premium",
    "Eating Habits": "free",
    "Introvert Child": "free",
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
    console.log("Attempting to navigate to InterventionsScreen");
    navigation.navigate("InterventionsScreen");
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

    // if (!canAccess) {
    //   // Track which plan blocked access so we can show correct copy (basic -> needs premium, premium -> needs ultra)
    //   setBlockedPlan(requiredPlan === "basic" ? "basic" : "premium");
    //   setDialogVisible(true);
    //   return;
    // }

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
      case "Job Insecurity":
        navigation.navigate("JobInsecurityScreen");
        break;
      case "Youngster Issues":
        navigation.navigate("YoungsterIssuesScreen");
        break;
      case "Emotional Intelligence":
        navigation.navigate("EmotionalIntelligenceScreen");
        break;
      case "Introvert Child":
        navigation.navigate("IntrovertChildScreen");
        break;
      case "Eating Habits":
        navigation.navigate("EatingHabitScreen");
        break;
      case "BreakupAndRebound":
        navigation.navigate("BreakupAndReboundScreen");
        break;
      case "AbusiveLanguageBackAnswering":
        navigation.navigate("AbusiveLanguageBackAnsweringScreen");
        break;
      case "DarkWebAndOnlyFans":
        navigation.navigate("DarkWebAndOnlyFansScreen");
        break;
      case "DatingSitesAndComplications":
        navigation.navigate("DatingSitesAndComplicationsScreen");
        break;
      case "ExamStress":
        navigation.navigate("ExamStressScreen");
        break;
      case "FriendshipAndRelationship":
        navigation.navigate("FriendshipAndRelationshipScreen");
        break;
      case "GamblingAndGamingAddiction":
        navigation.navigate("GamblingAndGamingAddictionScreen");
        break;
      case "InternetAddiction":
        navigation.navigate("InternetAddictionScreen");
        break;
      case "ParentingFromChildView":
        navigation.navigate("ParentingFromChildViewScreen");
        break;
      case "ParentingFromParentsView":
        navigation.navigate("ParentingFromParentsViewScreen");
        break;
      case "PornAddiction":
        navigation.navigate("PornAddictionScreen");
        break;
      case "SelfCareHygiene":
        navigation.navigate("SelfCareHygieneScreen");
        break;
      case "SelfEsteemAndSelfIdentity":
        navigation.navigate("SelfEsteemAndSelfIdentityScreen");
        break;
      case "SocialMediaIssues":
        navigation.navigate("SocialMediaIssuesScreen");
        break;
      case "SubstanceAddiction":
        navigation.navigate("SubstanceAddictionScreen");
        break;
      case "TraumaLossAndDreams":
        navigation.navigate("TraumaLossAndDreamsScreen");
        break;
      case "UnrealisticBeautyStandards":
        navigation.navigate("UnrealisticBeautyStandardsScreen");
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
                  <CustomIcon type="IO" name="happy-outline" size={24} color="#000000" />
                </View>
                <Text style={styles.taskNumber}>
                  {isLoading ? t("mindToolsScreen.loading") : dailyTasksCount}
                </Text>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
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
                  <CustomIcon type="IO" name="calendar-outline" size={24} color="#000000" />
                </View>
                <Text style={styles.taskNumber}>
                  {isLoading
                    ? t("mindToolsScreen.loading")
                    : interventionsCount}
                </Text>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
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
                <CustomIcon type="IO" name="journal-outline" size={28} color="#000000" />
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
                <CustomIcon type="IO" name="chevron-forward" size={20} color="#000000" />
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
            {/* Row 1 - ADHD Card */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => navigation.navigate("ADHDScreen")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="flash" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
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
              onPress={() => navigation.navigate("AggressiveBehaviourScreen")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="warning" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
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
              onPress={() => navigation.navigate("ConductIssueScreen")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO"
                    name="warning-outline"
                    size={24}
                    color="#000000"
                  />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
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
                  <CustomIcon type="IO" name="restaurant" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.eatingHabits.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.eatingHabits.description")}
              </Text>
            </Pressable>

            {/* Introvert Child - New Card */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("Introvert Child")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="person-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.introvertChild.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.introvertChild.description")}
              </Text>
            </Pressable>

            {/* Row 3 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("BreakupAndRebound")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="heart-dislike" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.breakupandrebound.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.breakupandrebound.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("AbusiveLanguageBackAnswering")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="warning-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.abusiveLanguageBackAnswering.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.abusiveLanguageBackAnswering.description")}
              </Text>
            </Pressable>

            {/* Row 4 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("ExamStress")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="document-text-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.examstressscreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.examstressscreen.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("DarkWebAndOnlyFans")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="lock-closed-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.darkwebandonlyfansscreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.darkwebandonlyfansscreen.description")}
              </Text>
            </Pressable>

            {/* Row 5 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("FriendshipAndRelationship")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="people-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.friendshipandrelationshipscreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.friendshipandrelationshipscreen.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("DatingSitesAndComplications")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="people-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.datingsitesandcomplicationsscreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.datingsitesandcomplicationsscreen.description")}
              </Text>
            </Pressable>

            {/* Row 6 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("GamblingAndGamingAddiction")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="game-controller-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.gamblingandgamingaddictionscreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.gamblingandgamingaddictionscreen.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("InternetAddiction")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="wifi-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.internetaddictionscreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.internetaddictionscreen.description")}
              </Text>
            </Pressable>

            {/* Row 7 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("ParentingFromChildView")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="person-circle-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.parentingfromchildviewscreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.parentingfromchildviewscreen.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("ParentingFromParentsView")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="people-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.parentingfromparentsviewscreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.parentingfromparentsviewscreen.description")}
              </Text>
            </Pressable>

            {/* Row 8 */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("PornAddiction")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="eye-off-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.pornaddictionscreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.pornaddictionscreen.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => handleCategoryPress("SelfCareHygiene")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="medkit-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.selfcarehygienescreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.selfcarehygienescreen.description")}
              </Text>
            </Pressable>

            {/* Job Insecurity - Full Width Card with Regular Design
            <Pressable
              style={styles.jobInsecurityCard}
              onPress={() => handleCategoryPress("Job Insecurity")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="briefcase-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.jobInsecurity.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.jobInsecurity.description")}
              </Text>
            </Pressable> */}

            {/* Self Esteem & Self Identity Card */}
            <Pressable
              style={styles.categoryCard}
              onPress={() => navigation.navigate("SelfEsteemAndSelfIdentityScreen")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="person-circle-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.selfesteemandselfidentityscreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.selfesteemandselfidentityscreen.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => navigation.navigate("SocialMediaIssuesScreen")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="share-social-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.socialmediaissuesscreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.socialmediaissuesscreen.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => navigation.navigate("SubstanceAddictionScreen")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="medkit-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.SubstanceAddictionScreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.SubstanceAddictionScreen.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => navigation.navigate("TraumaLossAndDreamsScreen")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="moon-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.TraumaLossAndDreamsScreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.TraumaLossAndDreamsScreen.description")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.categoryCard}
              onPress={() => navigation.navigate("UnrealisticBeautyStandardsScreen")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="happy-outline" size={24} color="#000000" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#000000" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.UnrealisticBeautyStandardsScreen.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.UnrealisticBeautyStandardsScreen.description")}
              </Text>
            </Pressable>

            {/* Row 9 - Full Width Emotional Intelligence Card */}
            <Pressable
              style={styles.emotionalIntelligenceCard}
              onPress={() => handleCategoryPress("Emotional Intelligence")}
            >
              <View style={styles.eqCardHeader}>
                <View style={styles.eqIconContainer}>
                  <CustomIcon type="IO" name="heart" size={32} color="#000000" />
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
                  <CustomIcon type="IO" name="chevron-forward" size={20} color="#000000" />
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

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("BreakupAndRebound")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="heart-dislike" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.breakupandreboundscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.breakupandreboundscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("DarkWebAndOnlyFans")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.darkwebandonlyfansscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.darkwebandonlyfansscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("DatingSitesAndComplications")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.datingsitesandcomplicationsscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.datingsitesandcomplicationsscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("ExamStress")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.examstressscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.examstressscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("FriendshipAndRelationship")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.friendshipandrelationshipscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.friendshipandrelationshipscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("GamblingAndGamingAddiction")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.gamblingandgamingaddictionscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.gamblingandgamingaddictionscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("InternetAddiction")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.internetaddictionscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.internetaddictionscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("ParentingFromChildView")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.parentingfromchildviewscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.parentingfromchildviewscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("ParentingFromParentsView")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.parentingfromparentsviewscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.parentingfromparentsviewscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("PornAddiction")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.pornaddictionscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.pornaddictionscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("SelfCareHygiene")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.selfcarehygienescreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.selfcarehygienescreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("SelfEsteemAndSelfIdentity")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.selfesteemandselfidentityscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.selfesteemandselfidentityscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("SocialMediaIssues")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.socialmediaissuesscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.socialmediaissuesscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("SubstanceAddiction")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.substanceaddictionscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.substanceaddictionscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("TraumaLossAndDreams")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.traumalossanddreamsscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.traumalossanddreamsscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("UnrealisticBeautyStandards")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.unrealisticbeautystandardsscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.unrealisticbeautystandardsscreen.description")}
                </Text>
              </Pressable>

              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("AbusiveLanguageBackAnswering")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="help-outline" size={24} color="#7c3aed" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#6b7280" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.abusivelanguagebackansweringscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.abusivelanguagebackansweringscreen.description")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Exit Confirmation Modal */}
      <ExitConfirmationModal />
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
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: "#ffffff",
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
    backgroundColor: "#ffffff",
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
  // Job Insecurity Full-width Card Styles (Regular card design but rectangular)
  jobInsecurityCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f5f9",
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
