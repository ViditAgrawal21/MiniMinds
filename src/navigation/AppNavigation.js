import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your screens here
import SplashScreen from '../screens/auth/splashScreen/splash';
import LoginScreen from '../screens/auth/loginScreen/login';
import OnBoardingScreen from '../screens/auth/onboardingScreen/onboarding';
import HomeScreen from '../screens/home/home';
import WelcomeScreen from '../screens/main/WelcomeScreen';
import SelfOrChildScreen from '../screens/main/selforchild';

// Import Language Screen
import LanguageSelectScreen from '../screens/main/languageSelect/languageSelectScreen';

// Import Self Assessment Screen
import SelfOnboardingScreen from '../screens/main/self/SelfOnboarding';
import SelfThankYouScreen from '../screens/main/self/selfthankyou';
import { LanguageProvider } from 'src/context/LanguageContext';

// Import the main tab navigator
import MainTabNavigator from './MainTabNavigator';
import GeneralSettings from '@/screens/main/GeneralSettingsScreen/GeneralSettings';
import UpgradeToPremium from '@/screens/main/UpgradetoPremiumScreen/UpgradeToPremium';
import EditProfile from '@/screens/main/EditProfileScreen/EditProfile';

// Import HomeTab related screens
import MentalHealthAssessment from '@/screens/main/homeTab/MentalHealthAssessment';

// Import ConditionsScan related screens
import ConditionScansScreen from '@/screens/main/conditionsScan/ConditionScansScreen';
import ScanIntro from '@/screens/main/conditionsScan/ScanIntro';
import ScanQuestions from '@/screens/main/conditionsScan/ScanQuestions';
import ScanResult from '@/screens/main/conditionsScan/ScanResult';

// Import EQ Test related screens
import EQTest from '@/screens/main/EQTest/index';
import EQTestQuestions from '@/screens/main/EQTest/questions';
import EQTestResult from '@/screens/main/EQTest/result';

// Import MindTools main screen
import MindToolsScreen from '@/screens/main/MindTools/MindToolsScreen';

// Import all MindTools category screens
import AngerManagementScreen from '@/screens/main/MindTools/AngerManagementScreen';
import StressScreen from '@/screens/main/MindTools/StressScreen';
import InternetSocialMediaScreen from '@/screens/main/MindTools/InternetSocialMediaScreen';
import FamilyRelationshipScreen from '@/screens/main/MindTools/FamilyRelationshipScreen';
import SleepScreen from '@/screens/main/MindTools/SleepScreen';
import SuicidalBehaviourScreen from '@/screens/main/MindTools/SuicidalBehaviourScreen';

// Import Insights Sleep Tracking Screen
import SleepTrackingScreen from '@/screens/main/sleepScreen';
import SexLifeScreen from '@/screens/main/MindTools/SexLifeScreen';
import AddictionsScreen from '@/screens/main/MindTools/AddictionsScreen';
import CommonPsychologicalScreen from '@/screens/main/MindTools/CommonPsychologicalScreen';
import EnvironmentIssuesScreen from '@/screens/main/MindTools/EnvironmentIssuesScreen';
import FinancialMentalHealthScreen from '@/screens/main/MindTools/FinancialMentalHealthScreen';
import PhysicalFitnessScreen from '@/screens/main/MindTools/PhysicalFitnessScreen';
import InternetDependenceScreen from '@/screens/main/MindTools/InternetDependenceScreen';
import ProfessionalMentalHealthScreen from '@/screens/main/MindTools/ProfessionalMentalHealthScreen';
import SocialMentalHealthScreen from '@/screens/main/MindTools/SocialMentalHealthScreen';
import YoungsterIssuesScreen from '@/screens/main/MindTools/YoungsterIssuesScreen';
import EmotionalIntelligenceScreen from '@/screens/main/MindTools/EmotionalIntelligenceScreen';
import JobInsecurityScreen from '@/screens/main/MindTools/JobInsecurityScreen';

// Import intervention-related screens
import InterventionsScreen from '@/screens/main/MindTools/InterventionsScreen';
import InterventionDetailScreen from '@/screens/main/MindTools/InterventionDetailScreen';
import JournalEntriesScreen from '@/screens/main/MindTools/JournalEntriesScreen';
import JournalHistoryScreen from '@/screens/main/MindTools/JournalHistoryScreen';

// Import strategy screens
import CBTScreen from '@/screens/main/MindTools/strategies/CBTScreen';
import REBTScreen from '@/screens/main/MindTools/strategies/REBTScreen';
import CommonSuggestionsScreen from '@/screens/main/MindTools/strategies/CommonSuggestionsScreen';
import RelaxationScreen from '@/screens/main/MindTools/strategies/RelaxationScreen';
import YogaScreen from '@/screens/main/MindTools/strategies/YogaScreen';

// Import EQ strategy screens
import EmpathyStrategyScreen from '@/screens/main/MindTools/EQStrategies/EmpathyStrategyScreen';
import MotivationStrategyScreen from '@/screens/main/MindTools/EQStrategies/MotivationStrategyScreen';
import SelfAwarenessStrategyScreen from '@/screens/main/MindTools/EQStrategies/SelfAwarenessStrategyScreen';
import SelfRegulationStrategyScreen from '@/screens/main/MindTools/EQStrategies/SelfRegulationStrategyScreen';
import SocialSkillsStrategyScreen from '@/screens/main/MindTools/EQStrategies/SocialSkillsStrategyScreen';
import PrivacyNoticeScreen from '@/screens/main/PrivacyNoticeScreen';
import PremiumScreen from '@/screens/PremiumScreen';

// Import other screens as you create them
// import ProfileScreen from '../screens/main/profile-page/profile';
// import SettingsScreen from '../screens/main/settingsScreen/settings';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [initialRoute, setInitialRoute] = useState('Splash');
  const [initialParams, setInitialParams] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Handle deep links when app is opened from a killed state
    const handleInitialURL = async () => {
      try {
        const url = await Linking.getInitialURL();
        if (url) {
          handleDeepLink(url);
        }
        
        // Check app state to determine initial route
        await checkAppState();
      } catch (e) {
        console.error('Error getting initial URL:', e);
      } finally {
        setIsReady(true);
      }
    };

    // Check if this is first launch or returning user
    const checkAppState = async () => {
      try {
        const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const hasCompletedSelfAssessment = await AsyncStorage.getItem('hasCompletedSelfAssessment');
        const hasSelectedLanguage = await AsyncStorage.getItem('selectedLanguage');
        const hasCompletedFirstLaunch = await AsyncStorage.getItem('hasCompletedFirstLaunch');

        console.log("hasCompletedOnboarding:", hasCompletedOnboarding);
        console.log("isLoggedIn:", isLoggedIn);
        console.log("hasCompletedSelfAssessment:", hasCompletedSelfAssessment);
        console.log("hasSelectedLanguage:", hasSelectedLanguage);
        console.log("hasCompletedFirstLaunch:", hasCompletedFirstLaunch);

        if (!hasCompletedOnboarding) {
          // First time user - start with splash, then login
          setInitialRoute('Splash');
        } else if (!isLoggedIn) {
          // User has seen splash but not logged in
          setInitialRoute('Login');
        } else if (!hasSelectedLanguage) {
          // User is logged in but hasn't selected language
          setInitialRoute('LanguageSelect');
        } else if (hasCompletedFirstLaunch === null && hasSelectedLanguage && !hasCompletedSelfAssessment) {
          // User has selected language but is first launch and hasn't completed self-assessment
          // This should go through: Privacy -> Welcome -> SelfOnboarding
          setInitialRoute('PrivacyNoticeScreen');
        } else if (!hasCompletedSelfAssessment) {
          // User has completed everything except self-assessment (return user)
          setInitialRoute('SelfOnboarding');
        } else {
          // User has completed everything - go to main app
          setInitialRoute('MainApp');
        }
      } catch (error) {
        console.error('Error checking app state:', error);
        setInitialRoute('Splash');
      }
    };

    // Parse the URL and set initial route
    const handleDeepLink = url => {
      // Add your deep link handling logic here
      console.log('Deep link received:', url);
    };

    // Set up listeners for when the app is already running
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      handleDeepLink(url);
    });

    handleInitialURL();

    return () => {
      linkingSubscription.remove();
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <LanguageProvider>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false}}>
        
      {/* Authentication Flow */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      
      {/* Language Selection */}
      <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} />
      
      {/* Privacy Notice Screen */}
      <Stack.Screen name="PrivacyNoticeScreen" component={PrivacyNoticeScreen} />
      
      {/* Welcome Screen */}
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      
      {/* Self Assessment Flow */}
      <Stack.Screen name="SelfOnboarding" component={SelfOnboardingScreen} />
      <Stack.Screen name="SelfThankYou" component={SelfThankYouScreen} />
      
      {/* Main App - This contains the tab navigation and all main screens */}
      <Stack.Screen name="MainApp" component={MainTabNavigator} />

      {/* HomeTab related screens */}
      <Stack.Screen name="MentalHealthAssessment" component={MentalHealthAssessment} />

      {/* ConditionsScan related screens */}
      <Stack.Screen name="ConditionScansScreen" component={ConditionScansScreen} />
      <Stack.Screen name="ScanIntro" component={ScanIntro} />
      <Stack.Screen name="ScanQuestions" component={ScanQuestions} />
      <Stack.Screen name="ScanResult" component={ScanResult} />

      {/* EQ Test related screens */}
      <Stack.Screen name="EQTest" component={EQTest} />
      <Stack.Screen name="EQTestQuestions" component={EQTestQuestions} />
      <Stack.Screen name="EQTestResult" component={EQTestResult} />

      {/* MindTools main screen */}
      <Stack.Screen name="MindToolsScreen" component={MindToolsScreen} />

      {/* MindTools category screens */}
      <Stack.Screen name="AngerManagementScreen" component={AngerManagementScreen} />
      <Stack.Screen name="StressScreen" component={StressScreen} />
      <Stack.Screen name="InternetSocialMediaScreen" component={InternetSocialMediaScreen} />
      <Stack.Screen name="FamilyRelationshipScreen" component={FamilyRelationshipScreen} />
      <Stack.Screen name="SleepScreen" component={SleepScreen} />
      <Stack.Screen name="SuicidalBehaviourScreen" component={SuicidalBehaviourScreen} />
      
      {/* Insights Sleep Tracking Screen */}
      <Stack.Screen name="SleepTrackingScreen" component={SleepTrackingScreen} />
      <Stack.Screen name="SexLifeScreen" component={SexLifeScreen} />
      <Stack.Screen name="AddictionsScreen" component={AddictionsScreen} />
      <Stack.Screen name="CommonPsychologicalScreen" component={CommonPsychologicalScreen} />
      <Stack.Screen name="EnvironmentIssuesScreen" component={EnvironmentIssuesScreen} />
      <Stack.Screen name="FinancialMentalHealthScreen" component={FinancialMentalHealthScreen} />
      <Stack.Screen name="PhysicalFitnessScreen" component={PhysicalFitnessScreen} />
      <Stack.Screen name="InternetDependenceScreen" component={InternetDependenceScreen} />
      <Stack.Screen name="ProfessionalMentalHealthScreen" component={ProfessionalMentalHealthScreen} />
      <Stack.Screen name="SocialMentalHealthScreen" component={SocialMentalHealthScreen} />
      <Stack.Screen name="YoungsterIssuesScreen" component={YoungsterIssuesScreen} />
      <Stack.Screen name="EmotionalIntelligenceScreen" component={EmotionalIntelligenceScreen} />
      <Stack.Screen name="JobInsecurityScreen" component={JobInsecurityScreen} />

      {/* MindTools intervention-related screens */}
      <Stack.Screen name="InterventionsScreen" component={InterventionsScreen} />
      <Stack.Screen name="InterventionDetailScreen" component={InterventionDetailScreen} />
      <Stack.Screen name="JournalEntriesScreen" component={JournalEntriesScreen} />
      <Stack.Screen name="JournalHistoryScreen" component={JournalHistoryScreen} />

      {/* MindTools strategy screens */}
      <Stack.Screen name="CBTScreen" component={CBTScreen} />
      <Stack.Screen name="REBTScreen" component={REBTScreen} />
      <Stack.Screen name="CommonSuggestionsScreen" component={CommonSuggestionsScreen} />
      <Stack.Screen name="RelaxationScreen" component={RelaxationScreen} />
      <Stack.Screen name="YogaScreen" component={YogaScreen} />

      {/* MindTools EQ strategy screens */}
      <Stack.Screen name="EmpathyStrategyScreen" component={EmpathyStrategyScreen} />
      <Stack.Screen name="MotivationStrategyScreen" component={MotivationStrategyScreen} />
      <Stack.Screen name="SelfAwarenessStrategyScreen" component={SelfAwarenessStrategyScreen} />
      <Stack.Screen name="SelfRegulationStrategyScreen" component={SelfRegulationStrategyScreen} />
      <Stack.Screen name="SocialSkillsStrategyScreen" component={SocialSkillsStrategyScreen} />

      {/* Legacy/Optional Screens */}
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="selforchild" component={SelfOrChildScreen} />
      <Stack.Screen name="generalsettings" component={GeneralSettings} />
      <Stack.Screen name="UpgradeToPremium" component={PremiumScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />

      
    </Stack.Navigator>
    </LanguageProvider>
  );
};

export default AppNavigation;
