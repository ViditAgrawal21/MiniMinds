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
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "../../../components/CustomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLanguage } from "../../../context/LanguageContext";
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
  BullyingScreen: undefined;
  SelfHarmBehaviourScreen: undefined;
  AcademicStressScreen: undefined;
  SpecialNeedsScreen: undefined;
  GoodParentingScreen: undefined;
  LonelinessAndDepressionScreen: undefined;
  AnxietyIssuesScreen: undefined;
  BunkingScreen: undefined;
  LearningDisabilityScreen: undefined;
  UnrealisticBeautyStandardsScreen: undefined;
  EarlySexualAnxietyScreen: undefined;
  EmotionalSexEducationScreen: undefined;
  SexualOrientationIssuesScreen: undefined;
  Upgrade: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MindToolsScreen() {
  const { t } = useLanguage();
  const [dailyTasksCount, setDailyTasksCount] = useState(0);
  const [interventionsCount, setInterventionsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // Premium access dialog state
  const [dialogVisible, setDialogVisible] = useState(false);
  const [blockedPlan, setBlockedPlan] = useState<"basic" | "premium" | null>(
    null,
  );
  // Filter state
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  // Debug: print navigation state once when screen mounts to verify available routes
  React.useEffect(() => {
    try {
      // This will print the current navigation state to Metro console
      // so you can confirm whether nested routes like "BunkingScreen" exist.
      // Remove after debugging.
      // eslint-disable-next-line no-console
      console.log('MindToolsScreen navigation state:', navigation.getState());
    } catch (e) {
      // ignore if navigation doesn't support getState in this context
    }
  }, [navigation]);

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
    FriendshipAndRelationship: "free",
    DatingSitesAndComplications: "free",
    GamblingAndGamingAddiction: "free",
    InternetAddiction: "free",
    Bullying: "free",
    Bunking: "free",
    LearningDisability: "free",
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

  // Category filters mapping
  const filterOptions = [
    "All",
    "Behaviour Issues",
    "Schooling and Academics",
    "Internet & Social Media Issues",
    "Parenting Issues",
    "Psychological Issues",
    "Emotional Issues",
    "Sex Life",
  ];

  // Category to filter mapping
  const categoryToFilter: Record<string, string> = {
    // Behaviour Issues
    "ADHD": "Behaviour Issues",
    "ConductIssues": "Behaviour Issues",
    "AggressiveBehaviour": "Behaviour Issues",
    "SelfCareHygiene": "Behaviour Issues",
    "SelfHarmBehaviour": "Behaviour Issues",
    "Introvert Child": "Behaviour Issues",
    "Eating Habits": "Behaviour Issues",
    "SubstanceAddiction": "Behaviour Issues",
    
    // Schooling and Academics
    "Bullying": "Schooling and Academics",
    "AcademicStress": "Schooling and Academics",
    "Bunking": "Schooling and Academics",
    "LearningDisability": "Schooling and Academics",
    "ExamStress": "Schooling and Academics",
    
    // Internet & Social Media Issues
    "InternetAddiction": "Internet & Social Media Issues",
    "GamblingAndGamingAddiction": "Internet & Social Media Issues",
    "PornAddiction": "Internet & Social Media Issues",
    "DatingSitesAndComplications": "Internet & Social Media Issues",
    "SocialMediaIssues": "Internet & Social Media Issues",
    "DarkWebAndOnlyFans": "Internet & Social Media Issues",
    
    // Parenting Issues
    "AbusiveLanguageBackAnswering": "Parenting Issues",
    "ParentingFromChildView": "Parenting Issues",
    "ParentingFromParentsView": "Parenting Issues",
    "ConductIssuesParenting": "Parenting Issues",
    "SpecialNeeds": "Parenting Issues",
    "GoodParenting": "Parenting Issues",
    
    // Psychological Issues
    "LonelinessAndDepression": "Psychological Issues",
    "AnxietyIssues": "Psychological Issues",
    "AutismAndIntellectualDisability": "Psychological Issues",
    "LearningDisabilityPsych": "Psychological Issues",
    "Suicidal Behaviour": "Psychological Issues",
    
    // Emotional Issues
    "FriendshipAndRelationship": "Emotional Issues",
    "BreakupAndRebound": "Emotional Issues",
    "SelfEsteemAndSelfIdentity": "Emotional Issues",
    "TraumaLossAndDreams": "Emotional Issues",
    "UnrealisticBeautyStandards": "Emotional Issues",
    
    // Sex Life
    "EmotionalSexEducation": "Sex Life",
    "SexualOrientationIssues": "Sex Life",
    "SexualAnxiety": "Sex Life",
    "EarlySexualAnxiety": "Sex Life",
  };

  // Helper function to check if a category should be displayed
  const shouldShowCategory = (categoryKey: string): boolean => {
    if (selectedFilter === "All") return true;
    return categoryToFilter[categoryKey] === selectedFilter;
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
    const navigateToRoute = (routeName: string, params?: any) => {
      // climb navigator hierarchy to find a navigator that knows this route
      let navRef: any = navigation as any;
      while (navRef) {
        try {
          const state = typeof navRef.getState === "function" ? navRef.getState() : null;
          if (state && Array.isArray(state.routeNames) && state.routeNames.includes(routeName)) {
            navRef.navigate(routeName, params);
            return;
          }
        } catch (e) {
          // ignore and continue climbing
        }
        navRef = typeof navRef.getParent === "function" ? navRef.getParent() : null;
      }

      // fallback: try the original navigation (may still error but we've tried)
      try {
        (navigation as any).navigate(routeName, params);
      } catch (e) {
        console.warn(`Failed to navigate to ${routeName}:`, e);
        Alert.alert(
          t("mindToolsScreen.navigation"),
          t("mindToolsScreen.navigateTo") + ` ${categoryName}`,
        );
      }
    };

    switch (categoryName) {
      case "Anger Management":
        navigateToRoute("AngerManagementScreen");
        break;
      case "Stress":
        navigateToRoute("StressScreen");
        break;
      case "Internet & Social Media":
        navigateToRoute("InternetSocialMediaScreen");
        break;
      case "Family & Relationship":
        navigateToRoute("FamilyRelationshipScreen");
        break;
      case "Sleep":
        navigateToRoute("SleepScreen");
        break;
      case "Suicidal Behaviour":
        navigateToRoute("SuicidalBehaviourScreen");
        break;
      case "Sex Life":
        navigateToRoute("SexLifeScreen");
        break;
      case "Addictions":
        navigateToRoute("AddictionsScreen");
        break;
      case "Common Psychological":
        navigateToRoute("CommonPsychologicalScreen");
        break;
      case "Environment Issues":
        navigateToRoute("EnvironmentIssuesScreen");
        break;
      case "Financial Mental Health":
        navigateToRoute("FinancialMentalHealthScreen");
        break;
      case "Physical Fitness":
        navigateToRoute("PhysicalFitnessScreen");
        break;
      case "Internet Dependence":
        navigateToRoute("InternetDependenceScreen");
        break;
      case "Professional Mental Health":
        navigateToRoute("ProfessionalMentalHealthScreen");
        break;
      case "Social Mental Health":
        navigateToRoute("SocialMentalHealthScreen");
        break;
      case "Job Insecurity":
        navigateToRoute("JobInsecurityScreen");
        break;
      case "Youngster Issues":
        navigateToRoute("YoungsterIssuesScreen");
        break;
      case "Emotional Intelligence":
        navigateToRoute("EmotionalIntelligenceScreen");
        break;
      case "Introvert Child":
        navigateToRoute("IntrovertChildScreen");
        break;
      case "Eating Habits":
        navigateToRoute("EatingHabitScreen");
        break;
      case "BreakupAndRebound":
        navigateToRoute("BreakupAndReboundScreen");
        break;
      case "AbusiveLanguageBackAnswering":
        navigateToRoute("AbusiveLanguageBackAnsweringScreen");
        break;
      case "DatingSitesAndComplications":
        navigateToRoute("DatingSitesAndComplicationsScreen");
        break;
      case "ExamStress":
        navigateToRoute("ExamStressScreen");
        break;
      case "FriendshipAndRelationship":
        navigateToRoute("FriendshipAndRelationshipScreen");
        break;
      case "GamblingAndGamingAddiction":
        navigateToRoute("GamblingAndGamingAddictionScreen");
        break;
      case "InternetAddiction":
        navigateToRoute("InternetAddictionScreen");
        break;
      case "ParentingFromChildView":
        navigateToRoute("ParentingFromChildViewScreen");
        break;
      case "ParentingFromParentsView":
        navigateToRoute("ParentingFromParentsViewScreen");
        break;
      case "PornAddiction":
        navigateToRoute("PornAddictionScreen");
        break;
      case "SelfCareHygiene":
        navigateToRoute("SelfCareHygieneScreen");
        break;
      case "SelfEsteemAndSelfIdentity":
        navigateToRoute("SelfEsteemAndSelfIdentityScreen");
        break;
      case "SocialMediaIssues":
        navigateToRoute("SocialMediaIssuesScreen");
        break;
      case "SubstanceAddiction":
        navigateToRoute("SubstanceAddictionScreen");
        break;
      case "TraumaLossAndDreams":
        navigateToRoute("TraumaLossAndDreamsScreen");
        break;
      case "UnrealisticBeautyStandards":
        navigateToRoute("UnrealisticBeautyStandardsScreen");
        break;
      default:
        Alert.alert(
          t("mindToolsScreen.navigation"),
          t("mindToolsScreen.navigateTo") + ` ${categoryName}`,
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
                  <CustomIcon type="IO" name="happy-outline" size={24} color="#CB6C46" />
                </View>
                <Text style={styles.taskNumber}>
                  {isLoading ? t("mindToolsScreen.loading") : dailyTasksCount}
                </Text>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#2B395E" />
              </View>
              <Text style={styles.taskTitle}>
                {t("mindToolsScreen.dailyTasksTitle")}
              </Text>
              <Text style={styles.taskDescription}>
                {isLoading
                  ? t("mindToolsScreen.dailyTasksDescriptionLoading")
                  : dailyTasksCount === 1
                    ? t("mindToolsScreen.dailyTasksDescriptionSingular").replace('{{count}}', dailyTasksCount.toString())
                    : t("mindToolsScreen.dailyTasksDescriptionPlural").replace('{{count}}', dailyTasksCount.toString())}
              </Text>
            </Pressable>

            {/* Total Interventions in Progress */}
            <Pressable
              style={[styles.taskCard, isLoading && styles.taskCardLoading]}
              onPress={() => handleTaskPress("All")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="calendar-outline" size={24} color="#CB6C46" />
                </View>
                <Text style={styles.taskNumber}>
                  {isLoading
                    ? t("mindToolsScreen.loading")
                    : interventionsCount}
                </Text>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#2B395E" />
              </View>
              <Text style={styles.taskTitle}>
                {t("mindToolsScreen.totalInterventionsTitle")}
              </Text>
              <Text style={styles.taskDescription}>
                {isLoading
                  ? t("mindToolsScreen.totalInterventionsDescriptionLoading")
                  : interventionsCount === 1
                    ? t("mindToolsScreen.totalInterventionsDescriptionSingular").replace('{{count}}', interventionsCount.toString())
                    : t("mindToolsScreen.totalInterventionsDescriptionPlural").replace('{{count}}', interventionsCount.toString())}
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
                <CustomIcon type="IO" name="journal-outline" size={28} color="#CB6C46" />
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
                <CustomIcon type="IO" name="chevron-forward" size={20} color="#2B395E" />
              </View>
            </View>
          </Pressable>
        </View>

        {/* Mental Health Conditions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("mindToolsScreen.mentalHealthConditions")}
          </Text>

          {/* Filter Dropdown */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setFilterDropdownVisible(!filterDropdownVisible)}
            >
              <CustomIcon type="IO" name="filter" size={20} color="#FF8C00" />
              <Text style={styles.filterButtonText}>{selectedFilter}</Text>
              <CustomIcon
                type="IO"
                name={filterDropdownVisible ? "chevron-up" : "chevron-down"}
                size={20}
                color="#FF8C00"
              />
            </TouchableOpacity>

            {filterDropdownVisible && (
              <View style={styles.filterDropdown}>
                <ScrollView style={styles.filterScrollView}>
                  {filterOptions.map((filter) => (
                    <TouchableOpacity
                      key={filter}
                      style={[
                        styles.filterOption,
                        selectedFilter === filter && styles.filterOptionSelected,
                      ]}
                      onPress={() => {
                        setSelectedFilter(filter);
                        setFilterDropdownVisible(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.filterOptionText,
                          selectedFilter === filter && styles.filterOptionTextSelected,
                        ]}
                      >
                        {filter}
                      </Text>
                      {selectedFilter === filter && (
                        <CustomIcon type="IO" name="checkmark" size={20} color="#FF8C00" />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.categoriesGrid}>
            {/* Row 1 - ADHD Card */}
            {shouldShowCategory("ADHD") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("ADHDScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="flash" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.adhd.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.adhd.description")}
                </Text>
              </Pressable>
            )}

            {shouldShowCategory("AggressiveBehaviour") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("AggressiveBehaviourScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="warning" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.aggressiveBehaviour.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.aggressiveBehaviour.description")}
                </Text>
              </Pressable>
            )}

            {/* Row 2 */}
            {shouldShowCategory("ConductIssues") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("ConductIssueScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO"
                      name="warning-outline"
                      size={24}
                      color="#FF8C00"
                    />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.conductIssues.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.conductIssues.description")}
                </Text>
              </Pressable>
            )}

            {shouldShowCategory("Eating Habits") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("Eating Habits")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="restaurant" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.eatingHabits.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.eatingHabits.description")}
                </Text>
              </Pressable>
            )}

            {/* Introvert Child - New Card */}
            {shouldShowCategory("Introvert Child") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("Introvert Child")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="person-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.introvertChild.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.introvertChild.description")}
                </Text>
              </Pressable>
            )}

            {/* Row 3 */}
            {shouldShowCategory("BreakupAndRebound") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("BreakupAndRebound")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="heart-dislike" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.breakupandrebound.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.breakupandrebound.description")}
                </Text>
              </Pressable>
            )}

            {shouldShowCategory("AbusiveLanguageBackAnswering") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("AbusiveLanguageBackAnswering")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="warning-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.abusiveLanguageBackAnswering.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.abusiveLanguageBackAnswering.description")}
                </Text>
              </Pressable>
            )}

            {/* Row 4 */}
            {shouldShowCategory("ExamStress") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("ExamStress")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="document-text-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.examstressscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.examstressscreen.description")}
                </Text>
              </Pressable>
            )}

            {/* Row 5 */}
            {shouldShowCategory("FriendshipAndRelationship") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("FriendshipAndRelationship")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="people-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.friendshipandrelationshipscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.friendshipandrelationshipscreen.description")}
                </Text>
              </Pressable>
            )}

            {shouldShowCategory("DatingSitesAndComplications") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("DatingSitesAndComplications")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="people-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.datingsitesandcomplicationsscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.datingsitesandcomplicationsscreen.description")}
                </Text>
              </Pressable>
            )}

            {/* Row 6 */}
            {shouldShowCategory("GamblingAndGamingAddiction") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("GamblingAndGamingAddiction")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="game-controller-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.gamblingandgamingaddictionscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.gamblingandgamingaddictionscreen.description")}
                </Text>
              </Pressable>
            )}

            {shouldShowCategory("InternetAddiction") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("InternetAddiction")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="wifi-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.internetaddictionscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.internetaddictionscreen.description")}
                </Text>
              </Pressable>
            )}

            {/* Row 7 */}
            {shouldShowCategory("ParentingFromChildView") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("ParentingFromChildView")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="happy-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.parentingfromchildviewscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.parentingfromchildviewscreen.description")}
                </Text>
              </Pressable>
            )}

            {shouldShowCategory("ParentingFromParentsView") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("ParentingFromParentsView")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="people-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.parentingfromparentsviewscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.parentingfromparentsviewscreen.description")}
                </Text>
              </Pressable>
            )}

            {/* Row 8 */}
            {shouldShowCategory("PornAddiction") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("PornAddiction")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="eye-off-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.pornaddictionscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.pornaddictionscreen.description")}
                </Text>
              </Pressable>
            )}

            {shouldShowCategory("SelfCareHygiene") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => handleCategoryPress("SelfCareHygiene")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="medkit-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.selfcarehygienescreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.selfcarehygienescreen.description")}
                </Text>
              </Pressable>
            )}

            {/* Job Insecurity - Full Width Card with Regular Design
            <Pressable
              style={styles.jobInsecurityCard}
              onPress={() => handleCategoryPress("Job Insecurity")}
            >
              <View style={styles.taskHeader}>
                <View style={styles.taskIconContainer}>
                  <CustomIcon type="IO" name="briefcase-outline" size={24} color="#FF8C00" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
              </View>
              <Text style={styles.categoryTitle}>
                {t("mindToolsScreen.categories.jobInsecurity.title")}
              </Text>
              <Text style={styles.categoryDescription}>
                {t("mindToolsScreen.categories.jobInsecurity.description")}
              </Text>
            </Pressable> */}

            {/* Self Esteem & Self Identity Card */}
            {shouldShowCategory("SelfEsteemAndSelfIdentity") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("SelfEsteemAndSelfIdentityScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="ribbon-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.selfesteemandselfidentityscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.selfesteemandselfidentityscreen.description")}
                </Text>
              </Pressable>
            )}

            {shouldShowCategory("SocialMediaIssues") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("SocialMediaIssuesScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="share-social-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.socialmediaissuesscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.socialmediaissuesscreen.description")}
                </Text>
              </Pressable>
            )}

            {shouldShowCategory("SubstanceAddiction") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("SubstanceAddictionScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="medkit-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.substanceaddictionscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.substanceaddictionscreen.description")}
                </Text>
              </Pressable>
            )}

            {shouldShowCategory("TraumaLossAndDreams") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("TraumaLossAndDreamsScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="moon-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.traumalossanddreamsscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.traumalossanddreamsscreen.description")}
                </Text>
              </Pressable>
            )}

            {shouldShowCategory("UnrealisticBeautyStandards") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("UnrealisticBeautyStandardsScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="happy-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.unrealisticbeautystandardsscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.unrealisticbeautystandardsscreen.description")}
                </Text>
              </Pressable>
            )}

            {/* Bullying Card - visible in main grid */}
            {shouldShowCategory("Bullying") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("BullyingScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="hand-left-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.bullyingscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.bullyingscreen.description")}
                </Text>
              </Pressable>
            )}

            {/* Suicidal Behaviour Card */}
            {shouldShowCategory("Suicidal Behaviour") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("SuicidalBehaviourScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="heart-dislike" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.suicidalBehaviour.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.suicidalBehaviour.description")}
                </Text>
              </Pressable>
            )}

            {/* Academic Stress */}
            {shouldShowCategory("AcademicStress") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("AcademicStressScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="school" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>{t("mindToolsScreen.categories.academicStress.title")}</Text>
                <Text style={styles.categoryDescription}>{t("mindToolsScreen.categories.academicStress.description")}</Text>
              </Pressable>
            )}

            {/* Dealing with children of special Needs */}
            {shouldShowCategory("SpecialNeeds") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("SpecialNeedsScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="people-circle" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>{t("mindToolsScreen.categories.specialNeeds.title")}</Text>
                <Text style={styles.categoryDescription}>{t("mindToolsScreen.categories.specialNeeds.description")}</Text>
              </Pressable>
            )}

            {/* Good Parenting */}
            {shouldShowCategory("GoodParenting") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("GoodParentingScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="heart" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>{t("mindToolsScreen.categories.goodParenting.title")}</Text>
                <Text style={styles.categoryDescription}>{t("mindToolsScreen.categories.goodParenting.description")}</Text>
              </Pressable>
            )}

            {/* Loneliness and Depression */}
            {shouldShowCategory("LonelinessAndDepression") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("LonelinessAndDepressionScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="person" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>{t("mindToolsScreen.categories.lonelinessAndDepression.title")}</Text>
                <Text style={styles.categoryDescription}>{t("mindToolsScreen.categories.lonelinessAndDepression.description")}</Text>
              </Pressable>
            )}

            {/* Anxiety Issues */}
            {shouldShowCategory("AnxietyIssues") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("AnxietyIssuesScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="pulse" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>{t("mindToolsScreen.categories.anxietyIssues.title")}</Text>
                <Text style={styles.categoryDescription}>{t("mindToolsScreen.categories.anxietyIssues.description")}</Text>
              </Pressable>
            )}

            {/* Self Harm Behaviour Card - new */}
            {shouldShowCategory("SelfHarmBehaviour") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("SelfHarmBehaviourScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="bandage-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.selfharmbehaviour.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.selfharmbehaviour.description")}
                </Text>
              </Pressable>
            )}

            {/* Bunking Card - visible in main grid */}
            {shouldShowCategory("Bunking") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("BunkingScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="school-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.bunkingscreen.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.bunkingscreen.description")}
                </Text>
              </Pressable>
            )}

            {/* Learning Disability Card - visible in main grid */}
            {shouldShowCategory("LearningDisability") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("LearningDisabilityScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="book-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.learningdisability.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.learningdisability.description")}
                </Text>
              </Pressable>
            )}

            {/* Early Sexual Anxiety Information and Inclusion Card */}
            {shouldShowCategory("EarlySexualAnxiety") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("EarlySexualAnxietyScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="information-circle-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#2B395E" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.earlySexualAnxiety.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.earlySexualAnxiety.description")}
                </Text>
              </Pressable>
            )}

            {/* Emotional Sex Education Card */}
            {shouldShowCategory("EmotionalSexEducation") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("EmotionalSexEducationScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="heart-circle-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#2B395E" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.emotionalSexEducation.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.emotionalSexEducation.description")}
                </Text>
              </Pressable>
            )}

            {/* Sexual Orientation Issues Card */}
            {shouldShowCategory("SexualOrientationIssues") && (
              <Pressable
                style={styles.categoryCard}
                onPress={() => navigation.navigate("SexualOrientationIssuesScreen")}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="people-circle-outline" size={24} color="#FF8C00" />
                  </View>
                  <CustomIcon type="IO" name="chevron-forward" size={16} color="#2B395E" />
                </View>
                <Text style={styles.categoryTitle}>
                  {t("mindToolsScreen.categories.sexualOrientationIssues.title")}
                </Text>
                <Text style={styles.categoryDescription}>
                  {t("mindToolsScreen.categories.sexualOrientationIssues.description")}
                </Text>
              </Pressable>
            )}

            {/* Row 9 - Full Width Emotional Intelligence Card */}
            {shouldShowCategory("Emotional Intelligence") && (
              <Pressable
                style={styles.emotionalIntelligenceCard}
                onPress={() => handleCategoryPress("Emotional Intelligence")}
              >
                <View style={styles.eqCardHeader}>
                  <View style={styles.eqIconContainer}>
                    <CustomIcon type="IO" name="heart" size={32} color="#CB6C46" />
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
                    <CustomIcon type="IO" name="chevron-forward" size={20} color="#2B395E" />
                  </View>
                </View>
              </Pressable>
            )}
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

      {/* Exit Confirmation Modal */}
      <ExitConfirmationModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E4E1FE",
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
    color: "#2B395E",
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
    color: "#2B395E",
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2B395E",
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
    color: "#2B395E",
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
    color: "#2B395E",
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
    borderColor: "#CB6C46",
    shadowColor: "#CB6C46",
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
    color: "#2B395E",
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
    backgroundColor: "#CB6C46",
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
    color: '#2B395E',
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
  // Filter dropdown styles
  filterContainer: {
    marginBottom: 16,
    position: 'relative',
    zIndex: 1000,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF8C00',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2B395E',
  },
  filterDropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF8C00',
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1001,
  },
  filterScrollView: {
    maxHeight: 280,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  filterOptionSelected: {
    backgroundColor: '#FFF5E6',
  },
  filterOptionText: {
    fontSize: 15,
    color: '#2B395E',
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: '#FF8C00',
    fontWeight: '600',
  },
});

