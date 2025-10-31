// app/screens/MindToolsScreen.tsx
import React, { useState, useCallback, use, useEffect } from "react";
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
import { hasActiveRedeemCode } from "../../../utils/redeemCodeUtils";

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
  // Redeem code access state
  const [hasRedeemAccess, setHasRedeemAccess] = useState(false);
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

  // Check for redeem code access on screen focus
  useFocusEffect(
    useCallback(() => {
      const checkRedeemCode = async () => {
        const hasAccess = await hasActiveRedeemCode();
        setHasRedeemAccess(hasAccess);
        if (hasAccess) {
          console.log("✅ User has redeem code access - all cards unlocked");
        }
      };
      checkRedeemCode();
    }, [])
  );

  // Helper function to check if a card is visible (free or unlocked via redeem code)
  const freeCards = ["AggressiveBehaviour", "LonelinessAndDepression", "InternetAddiction"];
  const isCardVisible = (cardKey: string): boolean => {
    // If user has redeem code, unlock all cards
    if (hasRedeemAccess) {
      return true;
    }
    // Otherwise, only show free cards
    return freeCards.includes(cardKey);
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
            {/* ========== FREE CARDS - PINNED AT TOP ========== */}
            
            {/* FREE CARD 1 - Aggressive Behaviour */}
            {shouldShowCategory("AggressiveBehaviour") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("AggressiveBehaviour") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("AggressiveBehaviour")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("AggressiveBehaviourScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="warning" size={24} color={!isCardVisible("AggressiveBehaviour") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("AggressiveBehaviour") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("AggressiveBehaviour") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.aggressiveBehaviour.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("AggressiveBehaviour") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.aggressiveBehaviour.description")}
                </Text>
                {!isCardVisible("AggressiveBehaviour") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* FREE CARD 2 - Loneliness and Depression */}
            {shouldShowCategory("LonelinessAndDepression") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("LonelinessAndDepression") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("LonelinessAndDepression")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("LonelinessAndDepressionScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="person" size={24} color={!isCardVisible("LonelinessAndDepression") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("LonelinessAndDepression") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("LonelinessAndDepression") && styles.lockedText]}>{t("mindToolsScreen.categories.lonelinessAndDepression.title")}</Text>
                <Text style={[styles.categoryDescription, !isCardVisible("LonelinessAndDepression") && styles.lockedText]}>{t("mindToolsScreen.categories.lonelinessAndDepression.description")}</Text>
                {!isCardVisible("LonelinessAndDepression") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* FREE CARD 3 - Internet Addiction */}
            {shouldShowCategory("InternetAddiction") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("InternetAddiction") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("InternetAddiction")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    handleCategoryPress("InternetAddiction");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="wifi-outline" size={24} color={!isCardVisible("InternetAddiction") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("InternetAddiction") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("InternetAddiction") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.internetaddictionscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("InternetAddiction") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.internetaddictionscreen.description")}
                </Text>
                {!isCardVisible("InternetAddiction") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* ========== PREMIUM/LOCKED CARDS ========== */}
            
            {/* ADHD Card */}
            {shouldShowCategory("ADHD") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("ADHD") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("ADHD")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("ADHDScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="flash" size={24} color={!isCardVisible("ADHD") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("ADHD") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("ADHD") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.adhd.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("ADHD") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.adhd.description")}
                </Text>
                {!isCardVisible("ADHD") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Row 2 */}
            {shouldShowCategory("ConductIssues") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("ConductIssues") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("ConductIssues")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("ConductIssueScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO"
                      name="warning-outline"
                      size={24}
                      color={!isCardVisible("ConductIssues") ? "#999" : "#FF8C00"}
                    />
                  </View>
                  {!isCardVisible("ConductIssues") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("ConductIssues") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.conductIssues.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("ConductIssues") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.conductIssues.description")}
                </Text>
                {!isCardVisible("ConductIssues") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {shouldShowCategory("Eating Habits") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("Eating Habits") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("Eating Habits")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    handleCategoryPress("Eating Habits");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="restaurant" size={24} color={!isCardVisible("Eating Habits") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("Eating Habits") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("Eating Habits") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.eatingHabits.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("Eating Habits") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.eatingHabits.description")}
                </Text>
                {!isCardVisible("Eating Habits") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Introvert Child - New Card */}
            {shouldShowCategory("Introvert Child") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("Introvert Child") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("Introvert Child")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    handleCategoryPress("Introvert Child");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="person-outline" size={24} color={!isCardVisible("Introvert Child") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("Introvert Child") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("Introvert Child") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.introvertChild.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("Introvert Child") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.introvertChild.description")}
                </Text>
                {!isCardVisible("Introvert Child") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Row 3 */}
            {shouldShowCategory("BreakupAndRebound") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("BreakupAndRebound") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("BreakupAndRebound")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    handleCategoryPress("BreakupAndRebound");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="heart-dislike" size={24} color={!isCardVisible("BreakupAndRebound") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("BreakupAndRebound") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("BreakupAndRebound") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.breakupandrebound.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("BreakupAndRebound") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.breakupandrebound.description")}
                </Text>
                {!isCardVisible("BreakupAndRebound") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {shouldShowCategory("AbusiveLanguageBackAnswering") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("AbusiveLanguageBackAnswering") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("AbusiveLanguageBackAnswering")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    handleCategoryPress("AbusiveLanguageBackAnswering");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="warning-outline" size={24} color={!isCardVisible("AbusiveLanguageBackAnswering") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("AbusiveLanguageBackAnswering") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("AbusiveLanguageBackAnswering") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.abusiveLanguageBackAnswering.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("AbusiveLanguageBackAnswering") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.abusiveLanguageBackAnswering.description")}
                </Text>
                {!isCardVisible("AbusiveLanguageBackAnswering") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Row 4 */}
            {shouldShowCategory("ExamStress") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("ExamStress") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("ExamStress")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    handleCategoryPress("ExamStress");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="document-text-outline" size={24} color={!isCardVisible("ExamStress") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("ExamStress") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("ExamStress") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.examstressscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("ExamStress") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.examstressscreen.description")}
                </Text>
                {!isCardVisible("ExamStress") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Row 5 */}
            {shouldShowCategory("FriendshipAndRelationship") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("FriendshipAndRelationship") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("FriendshipAndRelationship")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    handleCategoryPress("FriendshipAndRelationship");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="people-outline" size={24} color={!isCardVisible("FriendshipAndRelationship") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("FriendshipAndRelationship") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("FriendshipAndRelationship") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.friendshipandrelationshipscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("FriendshipAndRelationship") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.friendshipandrelationshipscreen.description")}
                </Text>
                {!isCardVisible("FriendshipAndRelationship") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {shouldShowCategory("DatingSitesAndComplications") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("DatingSitesAndComplications") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("DatingSitesAndComplications")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    handleCategoryPress("DatingSitesAndComplications");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="people-outline" size={24} color={!isCardVisible("DatingSitesAndComplications") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("DatingSitesAndComplications") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("DatingSitesAndComplications") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.datingsitesandcomplicationsscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("DatingSitesAndComplications") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.datingsitesandcomplicationsscreen.description")}
                </Text>
                {!isCardVisible("DatingSitesAndComplications") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Row 6 */}
            {shouldShowCategory("GamblingAndGamingAddiction") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("GamblingAndGamingAddiction") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("GamblingAndGamingAddiction")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    handleCategoryPress("GamblingAndGamingAddiction");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="game-controller-outline" size={24} color={!isCardVisible("GamblingAndGamingAddiction") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("GamblingAndGamingAddiction") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("GamblingAndGamingAddiction") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.gamblingandgamingaddictionscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("GamblingAndGamingAddiction") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.gamblingandgamingaddictionscreen.description")}
                </Text>
                {!isCardVisible("GamblingAndGamingAddiction") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Row 7 */}
            {shouldShowCategory("ParentingFromChildView") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("ParentingFromChildView") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("ParentingFromChildView")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    handleCategoryPress("ParentingFromChildView");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="happy-outline" size={24} color={!isCardVisible("ParentingFromChildView") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("ParentingFromChildView") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("ParentingFromChildView") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.parentingfromchildviewscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("ParentingFromChildView") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.parentingfromchildviewscreen.description")}
                </Text>
                {!isCardVisible("ParentingFromChildView") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {shouldShowCategory("ParentingFromParentsView") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("ParentingFromParentsView") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("ParentingFromParentsView")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    handleCategoryPress("ParentingFromParentsView");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="people-outline" size={24} color={!isCardVisible("ParentingFromParentsView") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("ParentingFromParentsView") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("ParentingFromParentsView") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.parentingfromparentsviewscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("ParentingFromParentsView") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.parentingfromparentsviewscreen.description")}
                </Text>
                {!isCardVisible("ParentingFromParentsView") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Row 8 */}
            {shouldShowCategory("PornAddiction") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("PornAddiction") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("PornAddiction")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    handleCategoryPress("PornAddiction");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="eye-off-outline" size={24} color={!isCardVisible("PornAddiction") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("PornAddiction") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("PornAddiction") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.pornaddictionscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("PornAddiction") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.pornaddictionscreen.description")}
                </Text>
                {!isCardVisible("PornAddiction") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {shouldShowCategory("SelfCareHygiene") && (
              <Pressable
                style={[
                  styles.categoryCard,
                  !isCardVisible("SelfCareHygiene") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("SelfCareHygiene")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    handleCategoryPress("SelfCareHygiene");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="medkit-outline" size={24} color={!isCardVisible("SelfCareHygiene") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("SelfCareHygiene") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("SelfCareHygiene") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.selfcarehygienescreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("SelfCareHygiene") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.selfcarehygienescreen.description")}
                </Text>
                {!isCardVisible("SelfCareHygiene") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
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
                style={[
                  styles.categoryCard,
                  !isCardVisible("SelfEsteemAndSelfIdentity") && styles.lockedCard
                ]}
                onPress={() => {
                  if (!isCardVisible("SelfEsteemAndSelfIdentity")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("SelfEsteemAndSelfIdentityScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="ribbon-outline" size={24} color={!isCardVisible("SelfEsteemAndSelfIdentity") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("SelfEsteemAndSelfIdentity") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("SelfEsteemAndSelfIdentity") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.selfesteemandselfidentityscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("SelfEsteemAndSelfIdentity") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.selfesteemandselfidentityscreen.description")}
                </Text>
                {!isCardVisible("SelfEsteemAndSelfIdentity") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {shouldShowCategory("SocialMediaIssues") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("SocialMediaIssues") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("SocialMediaIssues")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("SocialMediaIssuesScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="share-social-outline" size={24} color={!isCardVisible("SocialMediaIssues") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("SocialMediaIssues") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("SocialMediaIssues") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.socialmediaissuesscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("SocialMediaIssues") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.socialmediaissuesscreen.description")}
                </Text>
                {!isCardVisible("SocialMediaIssues") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {shouldShowCategory("SubstanceAddiction") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("SubstanceAddiction") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("SubstanceAddiction")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("SubstanceAddictionScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="medkit-outline" size={24} color={!isCardVisible("SubstanceAddiction") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("SubstanceAddiction") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("SubstanceAddiction") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.substanceaddictionscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("SubstanceAddiction") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.substanceaddictionscreen.description")}
                </Text>
                {!isCardVisible("SubstanceAddiction") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {shouldShowCategory("TraumaLossAndDreams") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("TraumaLossAndDreams") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("TraumaLossAndDreams")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("TraumaLossAndDreamsScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="moon-outline" size={24} color={!isCardVisible("TraumaLossAndDreams") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("TraumaLossAndDreams") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("TraumaLossAndDreams") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.traumalossanddreamsscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("TraumaLossAndDreams") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.traumalossanddreamsscreen.description")}
                </Text>
                {!isCardVisible("TraumaLossAndDreams") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {shouldShowCategory("UnrealisticBeautyStandards") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("UnrealisticBeautyStandards") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("UnrealisticBeautyStandards")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("UnrealisticBeautyStandardsScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="happy-outline" size={24} color={!isCardVisible("UnrealisticBeautyStandards") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("UnrealisticBeautyStandards") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("UnrealisticBeautyStandards") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.unrealisticbeautystandardsscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("UnrealisticBeautyStandards") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.unrealisticbeautystandardsscreen.description")}
                </Text>
                {!isCardVisible("UnrealisticBeautyStandards") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Bullying Card - visible in main grid */}
            {shouldShowCategory("Bullying") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("Bullying") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("Bullying")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("BullyingScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="hand-left-outline" size={24} color={!isCardVisible("Bullying") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("Bullying") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("Bullying") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.bullyingscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("Bullying") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.bullyingscreen.description")}
                </Text>
                {!isCardVisible("Bullying") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Suicidal Behaviour Card */}
            {shouldShowCategory("Suicidal Behaviour") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("Suicidal Behaviour") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("Suicidal Behaviour")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("SuicidalBehaviourScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="heart-dislike" size={24} color={!isCardVisible("Suicidal Behaviour") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("Suicidal Behaviour") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("Suicidal Behaviour") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.suicidalBehaviour.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("Suicidal Behaviour") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.suicidalBehaviour.description")}
                </Text>
                {!isCardVisible("Suicidal Behaviour") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Academic Stress */}
            {shouldShowCategory("AcademicStress") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("AcademicStress") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("AcademicStress")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("AcademicStressScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="school" size={24} color={!isCardVisible("AcademicStress") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("AcademicStress") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("AcademicStress") && styles.lockedText]}>{t("mindToolsScreen.categories.academicStress.title")}</Text>
                <Text style={[styles.categoryDescription, !isCardVisible("AcademicStress") && styles.lockedText]}>{t("mindToolsScreen.categories.academicStress.description")}</Text>
                {!isCardVisible("AcademicStress") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Dealing with children of special Needs */}
            {shouldShowCategory("SpecialNeeds") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("SpecialNeeds") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("SpecialNeeds")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("SpecialNeedsScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="people-circle" size={24} color={!isCardVisible("SpecialNeeds") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("SpecialNeeds") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("SpecialNeeds") && styles.lockedText]}>{t("mindToolsScreen.categories.specialNeeds.title")}</Text>
                <Text style={[styles.categoryDescription, !isCardVisible("SpecialNeeds") && styles.lockedText]}>{t("mindToolsScreen.categories.specialNeeds.description")}</Text>
                {!isCardVisible("SpecialNeeds") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Good Parenting */}
            {shouldShowCategory("GoodParenting") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("GoodParenting") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("GoodParenting")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("GoodParentingScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="heart" size={24} color={!isCardVisible("GoodParenting") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("GoodParenting") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("GoodParenting") && styles.lockedText]}>{t("mindToolsScreen.categories.goodParenting.title")}</Text>
                <Text style={[styles.categoryDescription, !isCardVisible("GoodParenting") && styles.lockedText]}>{t("mindToolsScreen.categories.goodParenting.description")}</Text>
                {!isCardVisible("GoodParenting") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Anxiety Issues */}
            {shouldShowCategory("AnxietyIssues") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("AnxietyIssues") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("AnxietyIssues")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("AnxietyIssuesScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="pulse" size={24} color={!isCardVisible("AnxietyIssues") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("AnxietyIssues") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("AnxietyIssues") && styles.lockedText]}>{t("mindToolsScreen.categories.anxietyIssues.title")}</Text>
                <Text style={[styles.categoryDescription, !isCardVisible("AnxietyIssues") && styles.lockedText]}>{t("mindToolsScreen.categories.anxietyIssues.description")}</Text>
                {!isCardVisible("AnxietyIssues") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Self Harm Behaviour Card - new */}
            {shouldShowCategory("SelfHarmBehaviour") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("SelfHarmBehaviour") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("SelfHarmBehaviour")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("SelfHarmBehaviourScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="bandage-outline" size={24} color={!isCardVisible("SelfHarmBehaviour") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("SelfHarmBehaviour") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("SelfHarmBehaviour") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.selfharmbehaviour.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("SelfHarmBehaviour") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.selfharmbehaviour.description")}
                </Text>
                {!isCardVisible("SelfHarmBehaviour") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Bunking Card - visible in main grid */}
            {shouldShowCategory("Bunking") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("Bunking") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("Bunking")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("BunkingScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="school-outline" size={24} color={!isCardVisible("Bunking") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("Bunking") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("Bunking") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.bunkingscreen.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("Bunking") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.bunkingscreen.description")}
                </Text>
                {!isCardVisible("Bunking") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Learning Disability Card - visible in main grid */}
            {shouldShowCategory("LearningDisability") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("LearningDisability") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("LearningDisability")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("LearningDisabilityScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="book-outline" size={24} color={!isCardVisible("LearningDisability") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("LearningDisability") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#FF8C00" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("LearningDisability") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.learningdisability.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("LearningDisability") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.learningdisability.description")}
                </Text>
                {!isCardVisible("LearningDisability") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Early Sexual Anxiety Information and Inclusion Card */}
            {shouldShowCategory("EarlySexualAnxiety") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("EarlySexualAnxiety") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("EarlySexualAnxiety")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("EarlySexualAnxietyScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="information-circle-outline" size={24} color={!isCardVisible("EarlySexualAnxiety") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("EarlySexualAnxiety") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#2B395E" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("EarlySexualAnxiety") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.earlySexualAnxiety.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("EarlySexualAnxiety") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.earlySexualAnxiety.description")}
                </Text>
                {!isCardVisible("EarlySexualAnxiety") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Emotional Sex Education Card */}
            {shouldShowCategory("EmotionalSexEducation") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("EmotionalSexEducation") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("EmotionalSexEducation")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("EmotionalSexEducationScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="heart-circle-outline" size={24} color={!isCardVisible("EmotionalSexEducation") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("EmotionalSexEducation") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#2B395E" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("EmotionalSexEducation") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.emotionalSexEducation.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("EmotionalSexEducation") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.emotionalSexEducation.description")}
                </Text>
                {!isCardVisible("EmotionalSexEducation") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
              </Pressable>
            )}

            {/* Sexual Orientation Issues Card */}
            {shouldShowCategory("SexualOrientationIssues") && (
              <Pressable
                style={[styles.categoryCard, !isCardVisible("SexualOrientationIssues") && styles.lockedCard]}
                onPress={() => {
                  if (!isCardVisible("SexualOrientationIssues")) {
                    setBlockedPlan("basic");
                    setDialogVisible(true);
                  } else {
                    navigation.navigate("SexualOrientationIssuesScreen");
                  }
                }}
              >
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <CustomIcon type="IO" name="people-circle-outline" size={24} color={!isCardVisible("SexualOrientationIssues") ? "#999" : "#FF8C00"} />
                  </View>
                  {!isCardVisible("SexualOrientationIssues") ? (
                    <CustomIcon type="IO" name="lock-closed" size={16} color="#999" />
                  ) : (
                    <CustomIcon type="IO" name="chevron-forward" size={16} color="#2B395E" />
                  )}
                </View>
                <Text style={[styles.categoryTitle, !isCardVisible("SexualOrientationIssues") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.sexualOrientationIssues.title")}
                </Text>
                <Text style={[styles.categoryDescription, !isCardVisible("SexualOrientationIssues") && styles.lockedText]}>
                  {t("mindToolsScreen.categories.sexualOrientationIssues.description")}
                </Text>
                {!isCardVisible("SexualOrientationIssues") && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumBadgeText}>Premium</Text>
                  </View>
                )}
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
  // Locked card styles
  lockedCard: {
    opacity: 0.5,
    backgroundColor: '#f5f5f5',
  },
  lockedText: {
    color: '#999',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF8C00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  premiumBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

