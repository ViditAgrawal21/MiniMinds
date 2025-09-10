# ThoughtPro Home Tab - Complete Documentation

## 📋 Overview

The Home Tab serves as the central dashboard for the ThoughtPro mental health app, providing users with:
- **Wellness Score Dashboard** - Real-time mental health tracking
- **Digital Wellness Monitoring** - App usage insights and mindful breaks
- **Intervention System** - Quick access to mental health tools
- **Mind Tools** - Rotating selection of wellness exercises
- **Service Cards** - Navigation to comprehensive assessments and tools

## 🎯 Core Architecture

### State Management Structure
```typescript
interface HomeTabState {
  wellnessScore: number;           // Combined onboarding + XP score
  xpEarned: number;               // Points from intervention completion
  currentAvatar: string;          // User's wellness avatar
  lastMoodUpdate: Date;           // Mood selector timestamp
  monitoringEnabled: boolean;     // Digital wellness tracking status
  activeInterventions: string[];  // Currently available intervention types
}
```

### Navigation Flow
```
Home Tab
├── Profile Screen
├── Mental Health Assessment
├── EQ Test (Premium)
├── Mood Journal
├── Interventions Hub
├── Mindful Playlist
├── Digital Wellness Settings
├── Mind Tools (Rotating)
├── Guardian Management
└── Subscription Management
```

---

## 🏠 Main Home Tab Screen

### Visual Layout
```
┌─────────────────────────────────────┐
│ [☰] ThoughtPro           [👤]      │ ← Header with Profile
├─────────────────────────────────────┤
│                                     │
│     🎯 Wellness Score: 85%          │ ← Dynamic Score Display
│     Avatar: [Happy Character]        │
│                                     │
├─────────────────────────────────────┤
│ 📱 Digital Wellness                 │ ← Monitoring Status
│ [📊 View Usage] [⚙️ Settings]       │
├─────────────────────────────────────┤
│ 🎭 Today's Mood: [😊 Content]       │ ← Mood Selector
│ Last updated: 31 Oct 2024          │
├─────────────────────────────────────┤
│ 🛠️ Quick Interventions              │ ← Intervention Buttons
│ [🔔 Watchman] [☕ Break] [🧘 Meditation] [😌 Relax]
├─────────────────────────────────────┤
│ 🧠 Mind Tools (Rotating)            │ ← Daily Exercises
│ [Current Tool Display]              │
├─────────────────────────────────────┤
│ 📋 Service Cards                    │ ← Main Navigation
│ [Mental Health] [EQ Test] [Journal] │
│ [Playlist] [Guardians] [Premium]   │
└─────────────────────────────────────┘
```

### Key Components

#### 1. **Wellness Score System**
- **Purpose**: Central health metric combining multiple factors
- **Calculation**: `onboardingScore + xpScore + moodContribution`
- **Range**: 0-100 with dynamic avatar representation
- **Updates**: Real-time when interventions are completed

#### 2. **Digital Wellness Monitor**
- **Android Integration**: Native app usage tracking
- **Mindful Breaks**: Customizable notification system
- **Privacy**: All data stored locally on device
- **Settings**: Fully customizable monitoring preferences

#### 3. **Mood Selector**
- **States**: Frustrated, Stressed, Content, Calm, Excited
- **Persistence**: Saved with timestamp to AsyncStorage
- **Impact**: Contributes to overall wellness score
- **Visual**: Emoji-based selection interface

#### 4. **Quick Interventions**
- **Watchman**: Mindfulness reminder system
- **Give me a Break**: Instant stress relief exercises
- **Meditation**: Guided meditation sessions
- **Relaxation**: Progressive muscle relaxation
- **XP Reward**: Each completion adds to wellness score

---

## 📊 Connected Screens - Detailed Breakdown

### 1. Mental Health Assessment Screen

**Purpose**: Comprehensive 6-question mental health evaluation

**Navigation**: Home → Service Cards → Mental Health Assessment

**Functionality**:
```typescript
interface AssessmentQuestion {
  id: string;
  text: string;
  options: AnswerOption[];
  scoreWeight: number;
}

// Six Assessment Areas:
const assessmentQuestions = [
  {
    q1: "Work stress and overwhelm frequency",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scoring: [5, 4, 3, 2, 1] // Reverse scoring for negative questions
  },
  {
    q2: "Work-life balance quality", 
    options: ["Very well", "Well", "Neutral", "Poorly", "Very poorly"],
    scoring: [5, 4, 3, 2, 1]
  },
  {
    q3: "Sleep quality and satisfaction",
    options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
    scoring: [5, 4, 3, 2, 1]
  },
  {
    q4: "Relationship quality (family, colleagues, partner)",
    options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
    scoring: [5, 4, 3, 2, 1]
  },
  {
    q5: "Financial burden frequency",
    options: ["Never", "Rarely", "Once a week", "Several times a week", "Daily"],
    scoring: [5, 4, 3, 2, 1]
  },
  {
    q6: "Social media/internet impact on daily life",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scoring: [5, 4, 3, 2, 1]
  }
];
```

**Screen Flow**:
```
Assessment Start
↓
Question 1/6 (Work Stress)
↓
Question 2/6 (Work-Life Balance)  
↓
Question 3/6 (Sleep Quality)
↓
Question 4/6 (Relationships)
↓
Question 5/6 (Financial Burden)
↓
Question 6/6 (Digital Impact)
↓
Results Screen (Score + Contribution to Wellness)
↓
Back to Home
```

**Scoring System**:
- **Total Possible**: 30 points
- **Score Calculation**: Sum of all question responses
- **Wellness Contribution**: Mapped to percentage contribution
- **Result Display**: "Your mental health score is X out of 30. This contributes Y points to your overall health score."

### 2. EQ Test Screen (Premium Feature)

**Purpose**: Emotional Intelligence assessment across 5 dimensions

**Navigation**: Home → Service Cards → EQ Test (Requires Ultra Subscription)

**Functionality**:
```typescript
interface EQTestDimension {
  name: string;
  questionCount: number;
  description: string;
}

const eqDimensions = [
  {
    name: "Self-Awareness",
    questionCount: 8,
    description: "Understanding your emotions and their impact"
  },
  {
    name: "Self-Regulation", 
    questionCount: 8,
    description: "Managing and controlling emotional responses"
  },
  {
    name: "Motivation",
    questionCount: 8, 
    description: "Drive to achieve and pursue goals"
  },
  {
    name: "Empathy",
    questionCount: 8,
    description: "Understanding and relating to others' emotions"
  },
  {
    name: "Social Skills",
    questionCount: 8,
    description: "Managing relationships and social interactions"
  }
];
```

**Test Structure**:
```
EQ Test Start (Premium Check)
↓
Dimension 1: Self-Awareness (8 questions)
↓
Dimension 2: Self-Regulation (8 questions)
↓
Dimension 3: Motivation (8 questions)
↓
Dimension 4: Empathy (8 questions)
↓
Dimension 5: Social Skills (8 questions)
↓
Comprehensive Results Dashboard
├── Overall EQ Score
├── Dimension Breakdown
├── Strengths Identification
├── Improvement Recommendations
└── Progress Tracking
```

**Premium Features**:
- **Detailed Analytics**: Comprehensive scoring across all dimensions
- **Progress Tracking**: Historical EQ development over time
- **Personalized Insights**: Custom recommendations based on results
- **Expert Content**: Advanced emotional intelligence resources

### 3. Mood Journal Screen

**Purpose**: Detailed mood tracking and journaling

**Navigation**: Home → Service Cards → Mood Journal

**Features**:
```typescript
interface MoodEntry {
  id: string;
  mood: MoodType;
  intensity: number; // 1-5 scale
  timestamp: Date;
  note?: string;
  triggers?: string[];
  activities?: string[];
}

enum MoodType {
  FRUSTRATED = "frustrated",
  STRESSED = "stressed", 
  CONTENT = "content",
  CALM = "calm",
  EXCITED = "excited"
}
```

**Screen Components**:
```
Mood Journal Dashboard
├── Current Mood Display
├── Mood History Calendar
├── Weekly/Monthly Trends
├── Trigger Pattern Analysis
├── Activity Correlation Insights
└── Export/Share Options
```

### 4. Interventions Hub

**Purpose**: Central access to all intervention tools and exercises

**Navigation**: Home → Service Cards → Interventions OR Quick Intervention Buttons

**Available Interventions**:

#### A. **Watchman System**
```typescript
interface WatchmanConfig {
  enabled: boolean;
  interval: number; // minutes between reminders
  workingHours: {
    start: string; // "09:00"
    end: string;   // "17:00"
  };
  reminderTypes: WatchmanReminder[];
}

enum WatchmanReminder {
  POSTURE_CHECK = "posture",
  BREATHING_EXERCISE = "breathing",
  EYE_REST = "eye_rest",
  MINDFUL_MOMENT = "mindful",
  HYDRATION = "water",
  MOVEMENT_BREAK = "movement"
}
```

**Screen Flow**:
```
Watchman Setup
├── Enable/Disable Toggle
├── Reminder Frequency Slider (15-120 minutes)
├── Working Hours Configuration
├── Reminder Type Selection
├── Notification Preview
└── Save Settings
```

#### B. **Give me a Break**
```typescript
interface BreakExercise {
  id: string;
  title: string;
  duration: number; // seconds
  type: BreakType;
  instructions: string[];
  audioGuide?: string;
}

enum BreakType {
  BREATHING = "breathing",
  STRETCHING = "stretching", 
  MINDFULNESS = "mindfulness",
  PROGRESSIVE_RELAXATION = "relaxation"
}
```

**Available Break Types**:
```
Quick Breaks (2-5 minutes)
├── Box Breathing (4-4-4-4 pattern)
├── Desk Stretches (neck, shoulders, wrists)
├── 5-Minute Mindfulness
├── Eye Rest Exercise
└── Progressive Muscle Relaxation
```

#### C. **Meditation Sessions**
```typescript
interface MeditationSession {
  id: string;
  title: string;
  duration: number; // minutes
  category: MeditationCategory;
  difficulty: "beginner" | "intermediate" | "advanced";
  audioTrack: string;
  description: string;
}

enum MeditationCategory {
  MINDFULNESS = "mindfulness",
  BODY_SCAN = "body_scan",
  LOVING_KINDNESS = "loving_kindness",
  CONCENTRATION = "concentration",
  MOVEMENT = "movement"
}
```

**Meditation Library**:
```
Meditation Categories
├── Mindfulness (5, 10, 15, 20 minute sessions)
├── Body Scan Meditation
├── Loving-Kindness Practice
├── Concentration Training
└── Movement Meditation
```

#### D. **Relaxation Exercises**
```typescript
interface RelaxationExercise {
  id: string;
  name: string;
  technique: RelaxationTechnique;
  duration: number;
  steps: ExerciseStep[];
  backgroundAudio?: string;
}

enum RelaxationTechnique {
  PROGRESSIVE_MUSCLE = "progressive_muscle",
  AUTOGENIC_TRAINING = "autogenic",
  VISUALIZATION = "visualization",
  DEEP_BREATHING = "deep_breathing"
}
```

### 5. Mindful Playlist Screen

**Purpose**: Curated audio content for relaxation and mindfulness

**Navigation**: Home → Service Cards → Mindful Playlist

**Content Categories**:
```typescript
interface PlaylistCategory {
  id: string;
  name: string;
  description: string;
  tracks: AudioTrack[];
}

const playlistCategories = [
  {
    name: "Spiritual Space",
    description: "Spiritual and religious meditation content",
    tracks: [...] // Spiritual audio tracks
  },
  {
    name: "TED Series", 
    description: "Educational talks on mental health and wellbeing",
    tracks: [...] // TED talk audio
  },
  {
    name: "Meditative Sounds",
    description: "Nature sounds, white noise, and ambient music",
    tracks: [...] // Background audio for meditation
  },
  {
    name: "Yoga Flow",
    description: "Guided yoga sessions with audio instruction",
    tracks: [...] // Yoga instruction audio
  },
  {
    name: "Content Space",
    description: "Podcasts and discussions on mental health topics",
    tracks: [...] // Educational podcast content
  }
];
```

**Screen Features**:
```
Mindful Playlist Interface
├── Category Tabs (Spiritual, TED, Sounds, Yoga, Content)
├── Track Listing with Durations
├── Audio Player Controls
├── Download for Offline Access
├── Favorites/Bookmarking
├── Playback History
└── Sleep Timer Functionality
```

### 6. Digital Wellness Settings

**Purpose**: Configure app usage monitoring and mindful break system

**Navigation**: Home → Digital Wellness → Settings

**Configuration Options**:
```typescript
interface DigitalWellnessConfig {
  monitoring: {
    enabled: boolean;
    appsToMonitor: string[]; // Package names
    dailyLimits: Record<string, number>; // App to minutes mapping
    breakReminders: boolean;
    breakInterval: number; // minutes
  };
  overlay: {
    enabled: boolean;
    position: OverlayPosition;
    opacity: number;
    autoHide: boolean;
  };
  notifications: {
    usageAlerts: boolean;
    breakReminders: boolean;
    dailySummary: boolean;
    weeklyReport: boolean;
  };
}
```

**Settings Categories**:
```
Digital Wellness Configuration
├── App Monitoring
│   ├── Enable/Disable Tracking
│   ├── Select Apps to Monitor
│   ├── Set Daily Usage Limits
│   └── Usage Alert Thresholds
├── Break Reminder System
│   ├── Reminder Frequency (15-120 min)
│   ├── Working Hours Configuration
│   ├── Break Duration Settings
│   └── Reminder Message Customization
├── Overlay Display
│   ├── Show/Hide Overlay
│   ├── Position Configuration
│   ├── Opacity Settings
│   └── Auto-hide Behavior
└── Notification Preferences
    ├── Usage Alert Notifications
    ├── Break Reminder Notifications
    ├── Daily Summary Reports
    └── Weekly Usage Reports
```

### 7. Guardian Management System

**Purpose**: Family/caregiver monitoring and communication system

**Navigation**: Home → Service Cards → Guardian Management

**Core Functionality**:
```typescript
interface Guardian {
  id: string;
  name: string;
  email: string;
  phone?: string;
  relationship: GuardianRelationship;
  permissions: GuardianPermission[];
  inviteStatus: InviteStatus;
  addedDate: Date;
}

enum GuardianRelationship {
  PARENT = "parent",
  SPOUSE = "spouse", 
  SIBLING = "sibling",
  FRIEND = "friend",
  THERAPIST = "therapist",
  OTHER = "other"
}

enum GuardianPermission {
  VIEW_WELLNESS_SCORE = "view_score",
  VIEW_MOOD_TRENDS = "view_mood",
  RECEIVE_ALERTS = "receive_alerts",
  VIEW_INTERVENTION_USAGE = "view_interventions"
}
```

**Guardian Features**:
```
Guardian Management Dashboard
├── Add New Guardian
│   ├── Personal Information Form
│   ├── Relationship Selection
│   ├── Permission Configuration
│   └── Invitation Sending
├── Existing Guardians List
│   ├── Guardian Profile Cards
│   ├── Permission Management
│   ├── Communication History
│   └── Remove/Block Options
├── Privacy Settings
│   ├── Data Sharing Preferences
│   ├── Alert Trigger Configuration
│   ├── Communication Frequency
│   └── Emergency Contact Setup
└── Guardian App Features
    ├── Guardian Mobile App Access
    ├── Real-time Notifications
    ├── Wellness Report Sharing
    └── Crisis Alert System
```

### 8. Mind Tools (Rotating Daily Content)

**Purpose**: Daily rotating wellness exercises and challenges

**Navigation**: Home → Mind Tools Section (Always Visible)

**Tool Categories**:
```typescript
interface MindTool {
  id: string;
  name: string;
  category: MindToolCategory;
  duration: number; // minutes
  difficulty: ToolDifficulty;
  description: string;
  instructions: string[];
  xpReward: number;
}

enum MindToolCategory {
  BREATHING = "breathing",
  MINDFULNESS = "mindfulness",
  COGNITIVE = "cognitive",
  EMOTIONAL = "emotional",
  PHYSICAL = "physical",
  SOCIAL = "social"
}

enum ToolDifficulty {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate", 
  ADVANCED = "advanced"
}
```

**Daily Rotation System**:
```
Mind Tools Rotation Algorithm
├── Daily Tool Selection (Based on user progress)
├── Difficulty Progression (Adapts to user skill level)
├── Category Balancing (Ensures variety across categories)
├── Personalization (Based on assessment results)
└── Streak Tracking (Encourages daily engagement)

Current Tool Categories:
├── Breathing Exercises
│   ├── Box Breathing Tutorial
│   ├── 4-7-8 Breathing Technique
│   ├── Alternate Nostril Breathing
│   └── Belly Breathing Practice
├── Mindfulness Challenges
│   ├── 5-Minute Present Moment
│   ├── Mindful Eating Exercise
│   ├── Body Awareness Scan
│   └── Thought Observation Practice
├── Cognitive Exercises
│   ├── Gratitude Journaling
│   ├── Cognitive Restructuring
│   ├── Problem-Solving Framework
│   └── Goal Setting Workshop
├── Emotional Regulation
│   ├── Emotion Identification
│   ├── Emotional Release Techniques
│   ├── Self-Compassion Practice
│   └── Stress Response Management
├── Physical Wellness
│   ├── Desk Yoga Sequences
│   ├── Progressive Relaxation
│   ├── Energy Boosting Movements
│   └── Tension Release Exercises
└── Social Connection
    ├── Communication Skills Practice
    ├── Boundary Setting Exercises
    ├── Empathy Building Activities
    └── Relationship Reflection Tools
```

### 9. Subscription Management (Premium Features)

**Purpose**: Manage subscription tiers and premium content access

**Navigation**: Home → Service Cards → Premium/Subscription

**Subscription Tiers**:
```typescript
interface SubscriptionTier {
  id: string;
  name: string;
  price: string;
  features: SubscriptionFeature[];
  billingCycle: BillingCycle;
}

enum SubscriptionFeature {
  EQ_TEST_ACCESS = "eq_test",
  ADVANCED_ANALYTICS = "analytics",
  UNLIMITED_GUARDIANS = "guardians",
  PREMIUM_CONTENT = "content",
  PRIORITY_SUPPORT = "support",
  EXPORT_DATA = "export"
}

const subscriptionTiers = [
  {
    id: "free",
    name: "Basic",
    price: "Free",
    features: [
      "Basic wellness tracking",
      "Limited interventions",
      "1 Guardian connection",
      "Basic mood tracking"
    ]
  },
  {
    id: "premium", 
    name: "Premium",
    price: "$4.99/month",
    features: [
      "All Basic features",
      "Extended intervention library",
      "Up to 3 Guardian connections",
      "Detailed mood analytics",
      "Premium audio content"
    ]
  },
  {
    id: "ultra",
    name: "Ultra",
    price: "$9.99/month", 
    features: [
      "All Premium features",
      "Full EQ Test access",
      "Unlimited Guardian connections",
      "Advanced wellness analytics",
      "Priority customer support",
      "Data export capabilities"
    ]
  }
];
```

**Subscription Management Screen**:
```
Subscription Dashboard
├── Current Plan Display
├── Feature Comparison Table
├── Upgrade/Downgrade Options
├── Billing History
├── Payment Method Management
├── Auto-renewal Settings
├── Cancellation Options
└── Premium Feature Showcase
```

---

## 🔄 User Journey Flows

### Primary User Pathways

#### 1. **Daily Check-in Flow**
```
Home Screen Load
↓
Wellness Score Review (automatic)
↓
Mood Selector Update (if stale)
↓
Digital Wellness Status Check
↓
Complete Recommended Intervention (+XP)
↓
Wellness Score Update (real-time)
```

#### 2. **Intervention Completion Flow**
```
Home → Quick Intervention Button
↓
Intervention Type Selection
├── Watchman → Setup Reminders → Background Running
├── Break → Exercise Selection → Guided Session → XP Reward
├── Meditation → Session Selection → Audio Playback → XP Reward
└── Relaxation → Technique Selection → Guided Practice → XP Reward
↓
Return to Home (Updated Wellness Score)
```

#### 3. **Assessment Flow**
```
Home → Service Cards → Assessment Selection
↓
Assessment Type Choice
├── Mental Health Assessment (6 questions) → Score Contribution
└── EQ Test (Premium, 40 questions) → Comprehensive Analysis
↓
Results Review
↓
Wellness Score Integration
↓
Return to Home Dashboard
```

#### 4. **Guardian Setup Flow**
```
Home → Service Cards → Guardian Management
↓
Add Guardian
├── Contact Information Input
├── Relationship Definition
├── Permission Configuration
└── Invitation Sending
↓
Guardian App Installation (Guardian's device)
↓
Connection Establishment
↓
Ongoing Monitoring and Communication
```

---

## 🎮 Gamification System

### XP and Wellness Score Integration

```typescript
interface GamificationSystem {
  xpSources: XPSource[];
  levelSystem: LevelDefinition[];
  achievements: Achievement[];
  streakTracking: StreakTracker;
}

enum XPSource {
  INTERVENTION_COMPLETE = 10,     // Base XP for intervention completion
  DAILY_MOOD_UPDATE = 5,          // XP for mood tracking
  ASSESSMENT_COMPLETE = 25,       // XP for completing assessments
  STREAK_BONUS = 15,              // Additional XP for consecutive days
  MIND_TOOL_COMPLETE = 8,         // XP for daily mind tool completion
  GUARDIAN_INTERACTION = 3        // XP for guardian communication
}

interface WellnessScoreCalculation {
  baseScore: number;              // From initial onboarding (0-40)
  xpContribution: number;         // From intervention completion
  moodContribution: number;       // From mood tracking consistency
  assessmentContribution: number; // From health assessments
  streakBonus: number;           // From daily engagement streaks
}
```

### Achievement System
```
Available Achievements
├── Intervention Master (Complete 50 interventions)
├── Mood Tracker (30-day mood tracking streak)
├── Assessment Expert (Complete all assessment types)
├── Digital Wellness Guru (1 week under usage limits)
├── Meditation Novice (Complete 10 meditation sessions)
├── Guardian Angel (Connect with first guardian)
├── Premium Explorer (Explore all premium features)
└── Wellness Warrior (Maintain 90+ wellness score for 7 days)
```

---

## 🔧 Technical Implementation

### Data Flow Architecture
```
User Interaction
↓
React Component State Update
↓
Redux Action Dispatch
↓
Reducer State Modification
↓
AsyncStorage Persistence (for critical data)
↓
SQLite Storage (for historical data)
↓
Component Re-render (real-time updates)
```

### Storage Strategy
```typescript
// AsyncStorage (Key-Value, Immediate Access)
const asyncStorageKeys = {
  WELLNESS_SCORE: '@wellness_score',
  CURRENT_MOOD: '@current_mood', 
  XP_EARNED: '@xp_earned',
  USER_PREFERENCES: '@user_preferences',
  ONBOARDING_COMPLETE: '@onboarding_complete'
};

// SQLite (Relational, Historical Data)
const sqliteTables = [
  'mood_entries',           // Historical mood tracking
  'intervention_sessions',  // Completed intervention records
  'assessment_results',     // Assessment scores and dates
  'usage_statistics',       // App usage monitoring data
  'guardian_interactions'   // Communication logs
];
```

### Native Module Integration (Android)
```java
// UsageMonitorHelper.java - Android Usage Tracking
public class UsageMonitorHelper {
    public void requestUsageStatsPermission(Context context);
    public List<AppUsageInfo> getAppUsageStats(long startTime, long endTime);
    public void showBreakReminder(String message, int duration);
    public boolean hasOverlayPermission(Context context);
    public void enableUsageMonitoring(boolean enabled);
}
```

---

## 📱 Screen Specifications

### Responsive Design Elements

#### Home Screen Dimensions
```css
/* Main Layout */
.home-container {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.wellness-score-card {
  height: 200px;
  border-radius: 15px;
  shadow-elevation: 8;
  margin-bottom: 20px;
}

.service-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.intervention-buttons {
  flex-direction: row;
  justify-content: space-around;
  margin: 15px 0;
}
```

#### Component Specifications
```typescript
// Header Component
interface HeaderProps {
  title: string;
  showProfile: boolean;
  onProfilePress: () => void;
  backgroundColor?: string;
}

// Wellness Score Component  
interface WellnessScoreProps {
  score: number;
  maxScore: number;
  avatar: string;
  trend: "up" | "down" | "stable";
  onPress: () => void;
}

// Service Card Component
interface ServiceCardProps {
  title: string;
  icon: string;
  description: string;
  isPremium: boolean;
  onPress: () => void;
  disabled?: boolean;
}
```

---

## 🔐 Privacy and Security

### Data Protection Measures

#### Local Storage Security
```typescript
interface DataSecurityConfig {
  encryption: {
    enabled: boolean;
    algorithm: "AES-256";
    keyDerivation: "PBKDF2";
  };
  anonymization: {
    personalData: boolean;
    usageData: boolean;
    assessmentData: boolean;
  };
  retention: {
    moodData: "90_days";
    interventionData: "1_year"; 
    assessmentData: "2_years";
    usageData: "30_days";
  };
}
```

#### Guardian Privacy Controls
```typescript
interface GuardianPrivacySettings {
  dataSharing: {
    wellnessScore: boolean;
    moodTrends: boolean;
    interventionUsage: boolean;
    assessmentResults: boolean;
    appUsageData: boolean;
  };
  alertTriggers: {
    lowWellnessScore: number;     // Threshold for alerts
    missedDays: number;           // Days without app usage
    concerningMoods: MoodType[];  // Mood types that trigger alerts
    emergencyKeywords: string[];  // Keywords in notes that trigger immediate alerts
  };
  communicationPreferences: {
    alertFrequency: "immediate" | "daily" | "weekly";
    reportFrequency: "weekly" | "monthly";
    contactMethods: ("email" | "sms" | "app_notification")[];
  };
}
```

---

## 🎯 Success Metrics and Analytics

### User Engagement Tracking
```typescript
interface EngagementMetrics {
  dailyActiveUsers: number;
  interventionCompletionRate: number;
  averageSessionDuration: number;
  wellnessScoreImprovement: number;
  moodTrackingConsistency: number;
  guardianEngagementRate: number;
  premiumConversionRate: number;
  userRetentionRate: {
    day7: number;
    day30: number;
    day90: number;
  };
}
```

### Wellness Outcome Measures
```typescript
interface WellnessOutcomes {
  scoreImprovement: {
    average: number;
    percentileDistribution: number[];
    timeToImprovement: number; // days
  };
  interventionEffectiveness: {
    mostEffective: InterventionType[];
    leastEffective: InterventionType[];
    userPreferences: InterventionType[];
  };
  moodStabilization: {
    variabilityReduction: number;
    positiveShiftFrequency: number;
    stressReductionIndicators: number;
  };
}
```

---

## 🚀 Future Enhancement Roadmap

### Planned Features
1. **AI-Powered Recommendations**: Machine learning for personalized intervention suggestions
2. **Voice Integration**: Voice-activated mood check-ins and guided exercises
3. **Wearable Integration**: Heart rate and sleep data from fitness trackers
4. **Social Features**: Peer support groups and wellness challenges
5. **Professional Integration**: Direct connection with mental health professionals
6. **Advanced Analytics**: Predictive modeling for mental health trends
7. **Offline Mode**: Full functionality without internet connection
8. **Multi-language Expansion**: Additional language support beyond current three

### Technical Improvements
1. **Performance Optimization**: Reduced app load times and battery usage
2. **Enhanced Security**: Biometric authentication and end-to-end encryption
3. **Cross-platform Sync**: Real-time data synchronization across devices
4. **API Integration**: Integration with health platforms and EHR systems
5. **Advanced Gamification**: More sophisticated reward systems and challenges

---

## 📞 Support and Resources

### User Support Channels
- **In-App Help**: Contextual help tooltips and guided tutorials
- **FAQ Section**: Comprehensive frequently asked questions
- **Video Tutorials**: Step-by-step feature demonstrations
- **Email Support**: Direct support for technical issues
- **Community Forum**: User community for peer support
- **Crisis Resources**: Emergency mental health contact information

### Guardian Resources
- **Guardian App**: Dedicated mobile app for caregivers
- **Training Materials**: How to effectively support app users
- **Communication Guidelines**: Best practices for mental health conversations
- **Emergency Protocols**: When and how to escalate concerns
- **Privacy Education**: Understanding data sharing and user rights

---

*This documentation provides a comprehensive overview of the ThoughtPro Home Tab and all connected screens. Each screen has been analyzed for functionality, user experience, and technical implementation details to ensure complete understanding of the application's capabilities.*
