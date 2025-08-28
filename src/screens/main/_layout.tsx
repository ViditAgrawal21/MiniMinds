import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./WelcomeScreen";
import SelfOrChildScreen from "./selforchild";
import Home from "./homeTab";
import InsightsScreen from "./Insights";
import MindToolsScreen from "./MindTools/MindToolsScreen";
import InterventionsScreen from "./MindTools/InterventionsScreen";
import InterventionDetailScreen from "./MindTools/InterventionDetailScreen";
import JournalHistoryScreen from "./MindTools/JournalHistoryScreen";
import JournalEntriesScreen from "./MindTools/JournalEntriesScreen";
import ADHDScreen from "./MindTools/ADHDScreen";
import AggressiveBehaviourScreen from "./MindTools/AggressiveBehaviourScreen";
import ConductIssueScreen from "./MindTools/ConductIssueScreen";
import InternetSocialMediaScreen from "./MindTools/InternetSocialMediaScreen";
import EatingHabitScreen from "./MindTools/EatingHabitScreen";
import IntrovertChildScreen from "./MindTools/IntrovertChildScreen";
import FamilyRelationshipScreen from "./MindTools/FamilyRelationshipScreen";
import SleepScreen from "./MindTools/SleepScreen";
import SelfCareHygieneScreen from "./MindTools/SelfCareHygieneScreen";
import AddictionsScreen from "./MindTools/AddictionsScreen";
import SubstanceAddictionScreen from "./MindTools/SubstanceAddictionScreen";
import CommonPsychologicalScreen from "./MindTools/CommonPsychologicalScreen";
import EnvironmentIssuesScreen from "./MindTools/EnvironmentIssuesScreen";
import FriendshipAndRelationshipScreen from "./MindTools/FriendshipAndRelationshipScreen";
import FinancialMentalHealthScreen from "./MindTools/FinancialMentalHealthScreen";
import UnrealisticBeautyStandardsScreen from "./MindTools/UnrealisticBeautyStandardsScreen";
import InternetDependenceScreen from "./MindTools/InternetDependenceScreen";
import DarkWebAndOnlyFansScreen from "./MindTools/DarkWebAndOnlyFansScreen";
import GamblingAndGamingAddictionScreen from "./MindTools/GamblingAndGamingAddictionScreen";
import InternetAddictionScreen from "./MindTools/InternetAddictionScreen";
import SocialMentalHealthScreen from "./MindTools/SocialMentalHealthScreen";
import PornAddictionScreen from "./MindTools/PornAddictionScreen";
import EmotionalIntelligenceScreen from "./MindTools/EmotionalIntelligenceScreen";
import BreakupAndReboundScreen from "./MindTools/BreakupAndReboundScreen";
import TraumaLossAndDreamsScreen from "./MindTools/TraumaLossAndDreamsScreen";
import SelfEsteemAndSelfIdentityScreen from "./MindTools/SelfEsteemAndSelfIdentityScreen";
// EQ Strategy Screens
import SelfAwarenessStrategyScreen from "./MindTools/EQStrategies/SelfAwarenessStrategyScreen";
import SelfRegulationStrategyScreen from "./MindTools/EQStrategies/SelfRegulationStrategyScreen";
import MotivationStrategyScreen from "./MindTools/EQStrategies/MotivationStrategyScreen";
import EmpathyStrategyScreen from "./MindTools/EQStrategies/EmpathyStrategyScreen";
import SocialSkillsStrategyScreen from "./MindTools/EQStrategies/SocialSkillsStrategyScreen";
// Strategy Screens
import CommonSuggestionsScreen from "./MindTools/strategies/CommonSuggestionsScreen";
import YogaScreen from "./MindTools/strategies/YogaScreen";
import RelaxationScreen from "./MindTools/strategies/RelaxationScreen";
import CBTScreen from "./MindTools/strategies/CBTScreen";
import REBTScreen from "./MindTools/strategies/REBTScreen";
import ProfilePage from "./profile-page";
import Child1 from "./child/child1";
import Child2 from "./child/child2";
import Child3 from "./child/child3";
import Child4 from "./child/child4";
import Child5 from "./child/child5";
import Child6 from "./child/child6";
import ChildThankYou from "./child/childthankyou";
import Self1 from "./self/self1";
import Self2 from "./self/self2";
import Self3 from "./self/self3";
import Self4 from "./self/self4";
import Self5 from "./self/self5";
import Self6 from "./self/self6";
import SelfThankYou from "./self/selfthankyou";
import ConditionScanScreen from "./conditionsScan/ConditionScansScreen";
import ScanIntro from "./conditionsScan/ScanIntro";
import ScanQuestions from "./conditionsScan/ScanQuestions";
import EQTestScreen from "./EQTest/index";
import EQTestQuestions from "./EQTest/questions";
import EQTestResult from "./EQTest/result";
import ConditionsManagementScreen from "./ConditionsManagement";
import ConditionDetailScreen from "./ConditionDetailScreen";

import WatchmanIntervention from "./watchman/WatchmanIntervention";
import GiveMeABreakIntervention from "./watchman/GiveMeABreakIntervention";
import RewardMeIntervention from "./watchman/RewardMeIntervention";
import ColdBlockIntervention from "./watchman/ColdBlockIntervention";
import MotivatingReelIntervention from "./watchman/MotivatingReelIntervention";
import UpgradeToPremium from "./profile-page/UpgradeToPremium";
import LanguageSelectScreen from "./languageSelect/languageSelectScreen";
import PrivacyNoticeScreen from "./PrivacyNoticeScreen";
import MoodReflectIntervention from "./watchman/MoodReflectIntervention";
import JournalReflectIntervention from "./watchman/JournalReflectIntervention.tsx";
import ReportReflectIntervention from "./watchman/ReportReflectIntervention";
import DailyQuotaIntervention from "./watchman/DailyQuotaIntervention";
import Just5MinsPlease from "./watchman/Just5MinsPlease";
import DNDAtWorkIntervention from "./watchman/DNDAtWorkIntervention";
import FocusPomodoroIntervention from "./watchman/FocusPomodoroIntervention";
import BeginnersLuckIntervention from "./watchman/BeginnersLuckIntervention";
import OverspendAlertIntervention from "./watchman/OverspendAlertIntervention";
import FearOfFinancialLossIntervention from "./watchman/FearOfFinancialLossIntervention";
import ImpulsePurchaseAlertIntervention from "./watchman/ImpulsePurchaseAlertIntervention";
import EcommerceOathType from "./watchman/EcommerceOathType";
import EcommerceGuardianIntervention from "./watchman/EcommerceGuardianIntervention";
import OverspendWatchmanIntervention from "./watchman/OverspendWatchmanIntervention";
import GuardianAngelIntervention from "./watchman/GuardianAngelIntervention";
import RequestBlockIntervention from "./watchman/RequestBlockIntervention";
import SendReportIntervention from "./watchman/SendReportIntervention";
import RequestACallIntervention from "./watchman/RequestACallIntervention";
import ShareAchievementIntervention from "./watchman/ShareAchievementIntervention";
import AppOCDAwareIntervention from "./watchman/AppOCDAwareIntervention";
import SleepyIntervention from "./watchman/SleepyIntervention";
import DecreaseBrightnessIntervention from "./watchman/DecreaseBrightnessIntervention";
import CallAFriendIntervention from "./watchman/CallAFriendIntervention";
import SetupYourCircleIntervention from "./watchman/SetupYourCircleIntervention";
import MaintainBirthdayListIntervention from "./watchman/MaintainBirthdayListIntervention";
import RegisterAt7CupsIntervention from "./watchman/RegisterAt7CupsIntervention";
import MakeYourHabiticaTeamIntervention from "./watchman/MakeYourHabiticaTeamIntervention";
import PlayMusicIntervention from "./watchman/PlayMusicIntervention";
import PlayPokemonGoIntervention from "./watchman/PlayPokemonGoIntervention";
import MentalHealthAssessment from "./homeTab/MentalHealthAssessment";
import CustomIcon from "@Components/CustomIcon.tsx";
import { LanguageProvider } from "src/context/LanguageContext.tsx";
import { ScanProvider } from "src/context/ScanContext.tsx";
import ProfileHeader from "@Components/ProfileHeader.tsx";
import EditProfile from "@Components/EditProfile.tsx";
import GeneralSettings from "@/screens/main/GeneralSettingsScreen/GeneralSettings.tsx";
import GuardianSettings from "@Components/GuardianSettings.tsx";
import GuardianListScreen from "@Components/GuardianList.tsx";
import EditGuardian from "@Components/EditGuardian.tsx";
import AddGuardian from "@Components/AddGuardian.tsx";

interface TabItemProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onPress: () => void;
}

const screenWidth = Dimensions.get("window").width; // Get screen width
const tabItemWidth = screenWidth / 4; // Adjust for 4 items

function Tab({
  route,
  navigation,
}: {
  route?: { params?: { screen?: string } };
  navigation?: any;
}) {
  const initialTab = route?.params?.screen;
  const [activeTab, setActiveTab] = useState<undefined | string>(initialTab);
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<any>(null);

  React.useEffect(() => {
    if (route?.params?.screen) {
      setActiveTab(route.params.screen);
    }
  }, [route?.params?.screen]);

  // Remove font loading logic as we'll use system fonts for React Native CLI
  const fontsLoaded = true; // Always true since we're not loading custom fonts

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Render the screen based on the active tab and current screen
  const renderScreen = () => {
    if (currentScreen === "ConditionsManagement") {
      return (
        <ConditionsManagementScreen
          onBack={() => setCurrentScreen(null)}
          navigation={{
            navigate: (screen: string, condition?: any) => {
              if (screen === "ConditionDetail" && condition) {
                setSelectedCondition(condition);
                setCurrentScreen("ConditionDetail");
              } else {
                setCurrentScreen(screen);
              }
            },
          }}
        />
      );
    }

    if (currentScreen === "ConditionDetail" && selectedCondition) {
      return (
        <ConditionDetailScreen
          condition={selectedCondition}
          onBack={() => {
            setCurrentScreen("ConditionsManagement");
            setSelectedCondition(null);
          }}
        />
      );
    }

    switch (activeTab) {
      case "Home":
        return <Home />;
      case "Insights":
        return (
          <InsightsScreen
            navigation={{
              ...navigation,
              navigate: (screen: string) => {
                if (screen === "ConditionsManagement") {
                  setCurrentScreen(screen);
                } else {
                  navigation.navigate(screen);
                }
              },
            }}
          />
        );
      case "MindTools":
        return <MindToolsScreen navigation={navigation} />;
      case "Profile":
        return <ProfilePage />;
      default:
        return <Home />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Render the selected screen */}
      <View
        style={[
          styles.screen,
          (currentScreen === "ConditionsManagement" ||
            currentScreen === "ConditionDetail") &&
            styles.fullScreen,
        ]}
      >
        {/* {renderScreen()} */}
      </View>

      {/* Custom Bottom Tab Navigation - Hidden when on ConditionsManagement or ConditionDetail */}
      {currentScreen !== "ConditionsManagement" &&
        currentScreen !== "ConditionDetail" && (
          <View style={styles.tabBar}>
            <TabItem
              label={t("navigation.home", "Home")}
              icon={
                <CustomIcon
                  type="IO"
                  name="home-outline"
                  size={30}
                  color={activeTab === "Home" ? "white" : "#888"}
                />
              }
              isActive={activeTab === "Home"}
              onPress={() => setActiveTab("Home")}
            />
            <TabItem
              label={t("navigation.insights", "Insights")}
              icon={
                <CustomIcon
                  type="FA5"
                  name="chart-bar"
                  size={30}
                  color={activeTab === "Insights" ? "white" : "#888"}
                />
              }
              isActive={activeTab === "Insights"}
              onPress={() => setActiveTab("Insights")}
            />
            <TabItem
              label={t("navigation.mindTools", "Mind Tools")}
              icon={
                <CustomIcon
                  type="IO"
                  name="grid-outline"
                  size={30}
                  color={activeTab === "MindTools" ? "white" : "#888"}
                />
              }
              isActive={activeTab === "MindTools"}
              onPress={() => setActiveTab("MindTools")}
            />
            <TabItem
              label={t("navigation.profile", "Profile")}
              icon={
                <CustomIcon
                  type="IO"
                  name="person-outline"
                  size={30}
                  color={activeTab === "Profile" ? "white" : "#888"}
                />
              }
              isActive={activeTab === "Profile"}
              onPress={() => setActiveTab("Profile")}
            />
          </View>
        )}
    </View>
  );
}

const TabItem: React.FC<TabItemProps> = ({
  label,
  icon,
  isActive,
  onPress,
}) => {
  const positionValue = React.useRef(new Animated.Value(0)).current; // Initial position

  React.useEffect(() => {
    // Trigger animation when the tab becomes active/inactive
    Animated.spring(positionValue, {
      toValue: isActive ? -10 : 0,
      useNativeDriver: true,
    }).start();
  }, [isActive, positionValue]);

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY: positionValue }],
          zIndex: isActive ? 1 : 0,
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.tabItem, isActive && styles.activeTabItem]}
        onPress={onPress}
      >
        {icon}
        <Text
          style={[styles.tabLabel, isActive && styles.activeTabLabel]}
          numberOfLines={1}
          // adjustsFontSizeToFit
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
export default function Layout() {
  const Stack = createStackNavigator();
  const [initialRoute, setInitialRoute] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const checkAppState = async () => {
      try {
        // Check if app was installed before
        const hasCompletedFirstLaunch = await AsyncStorage.getItem(
          "hasCompletedFirstLaunch",
        );

        if (hasCompletedFirstLaunch === null) {
          // First time install - start with language selection
          setInitialRoute("LanguageSelectScreen");
        } else {
          // Not first install - check if language is selected
          const selectedLanguage =
            await AsyncStorage.getItem("selectedLanguage");
          if (!selectedLanguage) {
            // No language selected yet
            setInitialRoute("LanguageSelectScreen");
          } else {
            // Language selected - go directly to Tab
            setInitialRoute("Tab");
          }
        }
      } catch (error) {
        console.error("Error checking app state:", error);
        // On error, default to language selection
        setInitialRoute("LanguageSelectScreen");
      } finally {
        setLoading(false);
      }
    };

    checkAppState();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#AB47BC" />
      </View>
    );
  }

  return (
    <LanguageProvider>
      <ScanProvider>
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
              name="Tab"
              component={Tab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LanguageSelectScreen"
              component={LanguageSelectScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PrivacyNoticeScreen"
              component={PrivacyNoticeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="selforchild"
              component={SelfOrChildScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Child1"
              component={Child1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Child2"
              component={Child2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Child3"
              component={Child3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Child4"
              component={Child4}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Child5"
              component={Child5}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Child6"
              component={Child6}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChildThankYou"
              component={ChildThankYou}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Self1"
              component={Self1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Self2"
              component={Self2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Self3"
              component={Self3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Self4"
              component={Self4}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Self5"
              component={Self5}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Self6"
              component={Self6}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelfThankYou"
              component={SelfThankYou}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ConditionScansScreen"
              component={ConditionScanScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileHeader"
              component={() => (
                <ProfileHeader
                  fallbackName="User Name"
                  fallbackImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                />
              )}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GeneralSettings"
              component={GeneralSettings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GuardianSettings"
              component={GuardianSettings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UpgradeToPremium"
              component={UpgradeToPremium}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WatchmanIntervention"
              component={WatchmanIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GiveMeABreakIntervention"
              component={GiveMeABreakIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RewardMeIntervention"
              component={RewardMeIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ColdBlockIntervention"
              component={ColdBlockIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MotivatingReelIntervention"
              component={MotivatingReelIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MoodReflectIntervention"
              component={MoodReflectIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="JournalReflectIntervention"
              component={JournalReflectIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ReportReflectIntervention"
              component={ReportReflectIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DailyQuotaIntervention"
              component={DailyQuotaIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Just5MinsPlease"
              component={Just5MinsPlease}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DNDAtWorkIntervention"
              component={DNDAtWorkIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FocusPomodoroIntervention"
              component={FocusPomodoroIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BeginnersLuckIntervention"
              component={BeginnersLuckIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OverspendAlertIntervention"
              component={OverspendAlertIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FearOfFinancialLossIntervention"
              component={FearOfFinancialLossIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ImpulsePurchaseAlertIntervention"
              component={ImpulsePurchaseAlertIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EcommerceOathType"
              component={EcommerceOathType}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EcommerceGuardianIntervention"
              component={EcommerceGuardianIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OverspendWatchmanIntervention"
              component={OverspendWatchmanIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GuardianAngelIntervention"
              component={GuardianAngelIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RequestBlockIntervention"
              component={RequestBlockIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SendReportIntervention"
              component={SendReportIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RequestACallIntervention"
              component={RequestACallIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShareAchievementIntervention"
              component={ShareAchievementIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AppOCDAwareIntervention"
              component={AppOCDAwareIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SleepyIntervention"
              component={SleepyIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DecreaseBrightnessIntervention"
              component={DecreaseBrightnessIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CallAFriendIntervention"
              component={CallAFriendIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SetupYourCircleIntervention"
              component={SetupYourCircleIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MaintainBirthdayListIntervention"
              component={MaintainBirthdayListIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterAt7CupsIntervention"
              component={RegisterAt7CupsIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MakeYourHabiticaTeamIntervention"
              component={MakeYourHabiticaTeamIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlayMusicIntervention"
              component={PlayMusicIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlayPokemonGoIntervention"
              component={PlayPokemonGoIntervention}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GuardianList"
              component={GuardianListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditGuardian"
              component={EditGuardian}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddGuardian"
              component={AddGuardian}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ScanQuestions"
              component={ScanQuestions}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ScanIntro"
              component={ScanIntro}
              options={{ headerShown: false }}
            />
          
            <Stack.Screen
              name="EQTestScreen"
              component={EQTestScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EQTestQuestions"
              component={EQTestQuestions}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EQTestResult"
              component={EQTestResult}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MentalHealthAssessment"
              component={MentalHealthAssessment}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="InterventionsScreen"
              component={InterventionsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="InterventionDetail"
              component={InterventionDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="JournalHistoryScreen"
              component={JournalHistoryScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="JournalEntriesScreen"
              component={JournalEntriesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ADHDScreen"
              component={ADHDScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AggressiveBehaviourScreen"
              component={AggressiveBehaviourScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ConductIssueScreen"
              component={ConductIssueScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="InternetSocialMediaScreen"
              component={InternetSocialMediaScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EatingHabitScreen"
              component={EatingHabitScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IntrovertChildScreen"
              component={IntrovertChildScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FamilyRelationshipScreen"
              component={FamilyRelationshipScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SleepScreen"
              component={SleepScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelfCareHygieneScreen"
              component={SelfCareHygieneScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddictionsScreen"
              component={AddictionsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SubstanceAddictionScreen"
              component={SubstanceAddictionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CommonPsychologicalScreen"
              component={CommonPsychologicalScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EnvironmentIssuesScreen"
              component={EnvironmentIssuesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FriendshipAndRelationshipScreen"
              component={FriendshipAndRelationshipScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FinancialMentalHealthScreen"
              component={FinancialMentalHealthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UnrealisticBeautyStandardsScreen"
              component={UnrealisticBeautyStandardsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="InternetDependenceScreen"
              component={InternetDependenceScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DarkWebAndOnlyFansScreen"
              component={DarkWebAndOnlyFansScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GamblingAndGamingAddictionScreen"
              component={GamblingAndGamingAddictionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="InternetAddictionScreen"
              component={InternetAddictionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SocialMentalHealthScreen"
              component={SocialMentalHealthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PornAddictionScreen"
              component={PornAddictionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EmotionalIntelligenceScreen"
              component={EmotionalIntelligenceScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BreakupAndReboundScreen"
              component={BreakupAndReboundScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TraumaLossAndDreamsScreen"
              component={TraumaLossAndDreamsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelfEsteemAndSelfIdentityScreen"
              component={SelfEsteemAndSelfIdentityScreen}
              options={{ headerShown: false }}
            />
            {/* EQ Strategy Screens */}
            <Stack.Screen
              name="SelfAwarenessStrategyScreen"
              component={SelfAwarenessStrategyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelfRegulationStrategyScreen"
              component={SelfRegulationStrategyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MotivationStrategyScreen"
              component={MotivationStrategyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EmpathyStrategyScreen"
              component={EmpathyStrategyScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SocialSkillsStrategyScreen"
              component={SocialSkillsStrategyScreen}
              options={{ headerShown: false }}
            />
            {/* Strategy Screens */}
            <Stack.Screen
              name="CommonSuggestionsScreen"
              component={CommonSuggestionsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="YogaScreen"
              component={YogaScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RelaxationScreen"
              component={RelaxationScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CBTScreen"
              component={CBTScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="REBTScreen"
              component={REBTScreen}
              options={{ headerShown: false }}
            />
        </Stack.Navigator>
      </ScanProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  screen: {
    flex: 1,
    marginBottom: 80,
  },
  fullScreen: {
    marginBottom: 0,
  },

  // Header Section
  header: {
    position: "relative",
    alignItems: "center",
    marginBottom: 60,
  },
  outerCircle: {
    position: "absolute",
    width: "200%",
    height: 430,
    backgroundColor: "#E1BEE7",
    borderBottomLeftRadius: 350,
    borderBottomRightRadius: 350,
    top: -325,
  },
  middleCircle: {
    position: "absolute",
    width: "190%",
    height: 420,
    backgroundColor: "#C381CC",
    borderBottomLeftRadius: 340,
    borderBottomRightRadius: 340,
    top: -335,
  },
  innerCircle: {
    position: "absolute",
    width: "180%",
    height: 410,
    backgroundColor: "#A63BAA",
    borderBottomLeftRadius: 330,
    borderBottomRightRadius: 330,
    top: -350, // Positioned on top
  },

  profileInfo: {
    marginTop: 30,
    alignItems: "center",
    zIndex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: "#D27AD5",
  },
  profileName: {
    marginTop: -3,
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
  },
  editProfileButton: {
    marginTop: -3,
    backgroundColor: "#C841CC",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  editProfileButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
  },
  quoteCard: {
    marginHorizontal: 25,
    marginTop: -45,
    backgroundColor: "#F3E5F5",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  quoteTitle: {
    fontSize: 12,
    color: "#9C27B0",
    fontWeight: "600",
  },
  quoteText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#0000000",
    textAlign: "center",
    marginTop: 5,
  },

  // Menu Section
  menuContainer: {
    marginTop: 3,
    marginLeft: 15,
    marginRight: 15,
  },
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    width: "90%",
    marginRight: 10,
    marginLeft: 10,
  },
  menuItemText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },

  // Tab Bar Section
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#F3E5F5",
    height: 80,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    overflow: "visible",
    paddingBottom: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    // paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "#F3E5F5",
    width: tabItemWidth,
    // overflow: "visible",
    minWidth: 80,
  },
  activeTabItem: {
    backgroundColor: "#D27AD5",
    shadowColor: "#A63BAA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    position: "relative",
    // overflow: "visible",
  },

  tabLabel: {
    fontSize: 10,
    // overflow: "visible",
    color: "#888",
    marginTop: 4,
    fontWeight: "400",
    textAlign: "center",
    minWidth: 80,
  },
  activeTabLabel: {
    color: "white",
    // overflow: "visible",
  },

  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  screenText: {
    fontSize: 13,
    color: "#333",
    marginTop: 60,
  },
  squareContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginBottom: -10,
    marginTop: -15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
