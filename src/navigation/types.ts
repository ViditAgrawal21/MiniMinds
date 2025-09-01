export type RootStackParamList = {
  // Authentication and onboarding flow
  Splash: undefined;
  Login: undefined;
  LanguageSelect: { reset?: boolean } | undefined;
  PrivacyNoticeScreen: undefined;
  WelcomeScreen: undefined;
  SelfOnboarding: undefined;
  SelfThankYou: undefined;
  HomeTab: undefined;
  
  // Main navigation
  MainApp: { screen?: string } | undefined;
  Tab: { initialTab?: string; screen?: string } | undefined;
  MindTools: undefined;
  
  // HomeTab related screens
  MentalHealthAssessment: undefined;
  
  // ConditionsScan related screens
  ConditionScansScreen: undefined;
  
  // Settings and premium screens
  UpgradeToPremium: undefined;
  
  // MindTools category screens
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
  EmotionalIntelligenceScreen: undefined;
  
  // Journal History screen
  JournalHistoryScreen: undefined;
  
  // Intervention related screens
  InterventionsScreen: {
    activeTab?: string;
    sourceScreen?: string;
  } | undefined;
  
  InterventionDetail: {
    intervention: any; // You can replace with proper Intervention type
    previousScreen?: string;
    activeTab?: string;
    sourceScreen?: string;
  };
  
  InterventionDetailScreen: {
    intervention: any; // You can replace with proper Intervention type
    previousScreen?: string;
    activeTab?: string;
    sourceScreen?: string;
  };
  
  // Journal screens
  JournalEntriesScreen: {
    condition?: string;
    conditionId?: string;
    conditionName?: string;
    interventionId?: string;
    interventionTitle?: string;
    interventionType?: string;
    activeTab?: string;
    sourceScreen?: string;
  } | undefined;
  
  // Condition scan screens
  ScanIntro: {
    scanName?: string;
  } | undefined;
  
  ScanQuestions: {
    scanName?: string;
    questionScreen?: string;
  };
  
  ScanResult: {
    scanName?: string;
    totalScore?: number;
  };
  
  // EQ Test screens
  EQTest: undefined;
  EQTestQuestions: {
    testId: number;
    testTitle: string;
  };
  
  EQTestResult: {
    testId: number;
    testTitle: string;
    totalScore?: number;
  };
  
  // Strategy screens
  CommonSuggestionsScreen: {
    condition?: string;
  } | undefined;
  
  REBTScreen: {
    condition?: string;
  } | undefined;
  
  YogaScreen: {
    condition?: string;
  } | undefined;
  
  CBTScreen: {
    condition?: string;
  } | undefined;
  
  RelaxationScreen: {
    condition?: string;
  } | undefined;
  
  // EQ Strategy screens
  EmpathyStrategyScreen: undefined;
  MotivationStrategyScreen: undefined;
  SelfAwarenessStrategyScreen: undefined;
  SelfRegulationStrategyScreen: undefined;
  SocialSkillsStrategyScreen: undefined;
};

export type Intervention = {
  id: string;
  title: string;
  subtitle: string;
  condition: string;
  tags: string[];
  date: string;
  xp: number;
  isCompleted: boolean;
  isSelected?: boolean;
  interventionType?: string;
  fullDescription?: string;
  originalTitleKey?: string;
  originalSubtitleKey?: string;
  conditionKey?: string;
  originalDescriptionKey?: string;
  titleTranslations?: Record<string, string>;
  subtitleTranslations?: Record<string, string>;
  descriptionTranslations?: Record<string, string>;
};
