# ThoughtPro Insights Screen - Complete Documentation

## 📋 Overview

The Insights Screen serves as the comprehensive analytics and progress tracking hub for ThoughtPro, featuring a **dual-tab interface** that provides both real-time dashboard metrics and detailed historical analysis of mental health assessments.

## 🎯 Core Architecture

### Dual-Tab System
```typescript
interface InsightsScreenState {
  activeTab: "Dashboard" | "Insights";
  // Dashboard Tab State
  totalXP: number;                    // Aggregated XP from all interventions
  conditionsCount: number;            // Number of tracked mental health conditions
  interventionsCount: number;         // Active interventions across all schedules
  completedTasks: number;            // Completed intervention tasks
  
  // Insights Tab State
  allResults: ScanResult[];          // All historical scan assessments
  filtered: ScanResult[];            // Filtered scan results
  scanFilters: FilterState;          // Active filter criteria
  chartPagination: ChartPaging;      // Chart display pagination
}
```

### Navigation Architecture
```
Insights Screen
├── Dashboard Tab
│   ├── XP Card (Total Experience Points)
│   ├── Tasks Completed Card
│   ├── Interventions Progress Card → InterventionsScreen
│   ├── Conditions Management Card → ConditionsManagement
│   └── Sleep Tracking Card → SleepTrackingScreen
└── Insights Tab
    ├── Filter System (Scan Type, Score Band, Date Range)
    ├── Progress Charts (LineChart with Pagination)
    ├── Summary Analytics
    └── Historical Data Analysis
```

---

## 🏠 Dashboard Tab - Complete Breakdown

### Visual Layout
```
┌─────────────────────────────────────┐
│ [Dashboard] [Insights]              │ ← Tab Navigation
├─────────────────────────────────────┤
│ 🎯 Total XP: 2,450 XP               │ ← Gradient XP Card
│    ⚡ Total Experience               │
├─────────────────────────────────────┤
│ ✅ 12    📊 Progress: ████████▫▫    │ ← Row 1: Completed + Active
│ Tasks     🔹 View   👁 8 Active     │
│ Completed          Interventions    │
├─────────────────────────────────────┤
│ 🧠 3 Conditions  👁 View            │ ← Row 2: Conditions + Sleep
│ Managed                             │
├─────────────────────────────────────┤
│ 🌙 Sleep Tracking                   │ ← Full Width Sleep Card
│ Monitor sleep patterns & quality    │
│ 📊 Sleep Patterns 💚 Quality 📱 Usage │
│                           👁 View    │
└─────────────────────────────────────┘
```

### 1. **XP Card (Gradient Design)**
```typescript
interface XPCard {
  totalXP: number;                   // Aggregated from all conditions
  colors: ["#8B5CF6", "#667EEA"];   // Purple gradient
  calculation: "getTotalXP()";       // From xpSystem utility
  source: "condition interventions"; // CBT, REBT, Yoga, Relaxation completions
  icon: "flash";                     // Lightning bolt icon
}
```

**XP Sources Breakdown**:
- **CBT Interventions**: 10-15 XP per completion
- **REBT Interventions**: 10-15 XP per completion  
- **Yoga Sessions**: 8-12 XP per completion
- **Relaxation Exercises**: 5-10 XP per completion
- **Custom Interventions**: Variable XP based on complexity

### 2. **Tasks Completed Card**
```typescript
interface TasksCompletedCard {
  completedTasks: number;           // Sum across Daily/Weekly/Bi-weekly/Monthly
  checkmarkIcon: "✅";             // Green checkmark container
  pluralization: {
    singular: "{{count}} task completed";
    plural: "{{count}} tasks completed";
  };
  dataSource: "completed_interventions_${tab}"; // AsyncStorage keys
}
```

**Task Completion Flow**:
```
User Completes Intervention
↓
XP Added to Condition
↓
Task Marked as Completed in Tab Storage
↓
Dashboard Counter Updated
↓
Real-time Insights Refresh
```

### 3. **Interventions in Progress Card**
```typescript
interface InterventionsCard {
  interventionsCount: number;       // Active interventions across all schedules
  progressBar: {
    width: interventionsCount > 0 ? "75%" : "0%";
    color: "#8B5CF6";
  };
  navigation: "InterventionsScreen";
  pluralization: {
    singular: "{{count}} intervention active";
    plural: "{{count}} interventions active";
  };
  sourceParams: { sourceScreen: "Insights" };
}
```

**Intervention Types Tracked**:
- **Daily Interventions**: Quick daily mental health exercises
- **Weekly Interventions**: Structured weekly therapy sessions
- **Bi-weekly Interventions**: Extended therapy programs
- **Monthly Interventions**: Long-term condition management

### 4. **Conditions Managed Card**
```typescript
interface ConditionsCard {
  conditionsCount: number;          // Number of tracked mental health conditions
  medicalIcon: "medical";           // Medical cross icon
  navigation: "ConditionsManagement";
  conditionTypes: [
    "Anxiety Disorders", "Mood Disorders", "Personality Disorders",
    "OCD Disorders", "Trauma-Related", "Eating Disorders",
    "Substance Use", "Sleep Disorders"
  ];
  pluralization: {
    singular: "{{count}} condition tracked";
    plural: "{{count}} conditions tracked";
  };
}
```

**Condition Management Features**:
- **Condition Creation**: Custom mental health condition tracking
- **XP Tracking**: Individual XP accumulation per condition
- **Intervention Assignment**: Specific therapies for each condition
- **Progress Monitoring**: Historical improvement tracking

### 5. **Sleep Tracking Card (Full-Width)**
```typescript
interface SleepTrackingCard {
  title: "Sleep Tracking";
  subtitle: "Monitor your sleep patterns and quality";
  navigation: "SleepTrackingScreen";
  features: [
    {
      icon: "analytics-outline";
      label: "Sleep Patterns";
      description: "Track sleep duration, bedtime, wake time";
    },
    {
      icon: "heart-outline";
      label: "Quality Tracking";
      description: "Monitor sleep quality and efficiency";
    },
    {
      icon: "phone-portrait-outline";
      label: "App Usage Impact";
      description: "Correlation between device usage and sleep";
    }
  ];
  fullFunctionality: true; // 2,446-line comprehensive screen
}
```

---

## 📊 Insights Tab - Complete Breakdown

### Data Flow Architecture
```
Condition Scans → Result Screen → 6 Strategies → Database Storage → Insights Display
     ↓              ↓                ↓               ↓              ↓
  Assessment    Score Analysis   Intervention    SQLite Save   Analytics View
  Questions     (0-100 scale)    Recommendations  (scan_answers) (Charts/Filters)
```

### 1. **Scan Results System**

#### **Assessment Categories** (15 Total)
```typescript
const scanTypes = [
  "Addictions",                                    // Substance use assessments
  "Anger Management",                              // Anger control evaluations
  "Common Psychological Issues",                   // General mental health
  "Environment Issues Affecting Mental Wellbeing", // Environmental factors
  "Family and Relationship",                       // Relationship assessments
  "Financial Mental Health",                       // Financial stress impact
  "General Physical Fitness",                      // Physical health correlation
  "Internet and Social Media Issue",               // Digital wellness
  "Internet Dependence",                           // Digital addiction
  "Professional Mental Health",                    // Work-related stress
  "Sex Life",                                      // Sexual health assessments
  "Sleep",                                         // Sleep disorder evaluations
  "Social Mental Health",                          // Social interaction health
  "Stress",                                        // General stress assessments
  "Suicidal Behaviour"                            // Crisis risk evaluations
];
```

#### **Scoring System**
```typescript
interface ScoreInterpreterion {
  "Normal": 0-25;      // "Everything seems fine"
  "Low Risk": 26-50;   // "You need to get some help"
  "Moderate Risk": 51-75; // "Moderate indicators present"
  "Severe Risk": 76-100;  // "Severe indicators, professional help recommended"
}
```

### 2. **Result Screen - 6 Strategy Framework**

#### **Strategy Distribution by Score**
```typescript
interface StrategyDistribution {
  "0-25": ["Primary"];                           // 1 strategy
  "26-50": ["Primary", "Secondary1-3"];         // 4 strategies  
  "51-100": ["Primary", "Secondary1-3", "Tertiary1-2", "Professional"]; // 6 strategies
}
```

#### **Complete 6-Strategy Breakdown**

##### **Strategy 1: Primary Information**
```typescript
const primaryStrategy = {
  name: "Information",
  type: "Educational",
  description: "Basic understanding and awareness",
  availability: "All score ranges (0-100)",
  content: "Foundational knowledge about the condition",
  xpReward: "5-10 XP",
  icon: "information-circle"
};
```

##### **Strategy 2: Secondary Part 1 - Common Suggestions**
```typescript
const secondaryPart1 = {
  name: "10 Common Suggestions",
  type: "General Strategies",
  description: "Practical daily management techniques",
  availability: "Score > 25",
  content: "General strategies & suggestions for condition management",
  mindToolsConnection: "Common Suggestions category",
  xpReward: "10-15 XP"
};
```

##### **Strategy 3: Secondary Part 2 - Yoga & Meditation**
```typescript
const secondaryPart2 = {
  name: "Yoga & Meditation",
  type: "Mindfulness Practices",
  description: "Mindfulness & meditation techniques",
  availability: "Score > 25",
  content: "Yoga poses, breathing exercises, meditation for condition",
  mindToolsConnection: "Yoga category in Mind Tools",
  xpReward: "8-12 XP"
};
```

##### **Strategy 4: Secondary Part 3 - Relaxation Techniques**
```typescript
const secondaryPart3 = {
  name: "Relaxation Techniques", 
  type: "Stress Management",
  description: "Stress relief & breathing exercises",
  availability: "Score > 25",
  content: "Progressive muscle relaxation, deep breathing, stress relief",
  mindToolsConnection: "Relaxation category in Mind Tools",
  xpReward: "5-10 XP"
};
```

##### **Strategy 5: Tertiary Part 1 - CBT**
```typescript
const tertiaryPart1 = {
  name: "CBT (Cognitive Behavioral Therapy)",
  type: "Professional Therapy Technique",
  description: "Cognitive behavioral therapy techniques",
  availability: "Score > 50",
  content: "Thought challenging, behavioral activation, cognitive restructuring",
  mindToolsConnection: "CBT category in Mind Tools",
  xpReward: "15-20 XP"
};
```

##### **Strategy 6: Tertiary Part 2 - REBT**
```typescript
const tertiaryPart2 = {
  name: "REBT (Rational Emotive Behavior Therapy)",
  type: "Professional Therapy Technique", 
  description: "Rational emotive behavior therapy",
  availability: "Score > 50",
  content: "Identifying irrational beliefs, developing rational thinking patterns",
  mindToolsConnection: "REBT category in Mind Tools",
  xpReward: "15-20 XP"
};
```

##### **Strategy 6: Professional Mental Health Support**
```typescript
const professionalSupport = {
  name: "Professional Mental Health Support",
  type: "Expert Consultation",
  description: "Connect with mental health professionals",
  availability: "Score > 50",
  content: "Professional guidance for personalized support",
  action: "💬 Connect with Mental Health Expert",
  recommendation: "Strongly recommended for severe symptoms"
};
```

### 3. **Mind Tools Integration**

#### **Strategy → Mind Tools Mapping**
```typescript
interface StrategyMindToolsMapping {
  "Common Suggestions": {
    screenDestination: "MindToolsScreen";
    category: "Common Psychological";
    interventionTypes: ["General Strategies", "Daily Tips"];
  };
  "Yoga & Meditation": {
    screenDestination: "MindToolsScreen";
    category: "Yoga Flow";
    interventionTypes: ["Asana Sequences", "Breathing Exercises", "Meditation"];
  };
  "Relaxation Techniques": {
    screenDestination: "MindToolsScreen";
    category: "Relaxation";
    interventionTypes: ["Progressive Muscle Relaxation", "Deep Breathing"];
  };
  "CBT": {
    screenDestination: "MindToolsScreen";
    category: "CBT Interventions";
    interventionTypes: ["Thought Records", "Behavioral Activation", "Exposure"];
  };
  "REBT": {
    screenDestination: "MindToolsScreen";
    category: "REBT Interventions";
    interventionTypes: ["Belief Challenging", "Rational Thinking"];
  };
}
```

#### **Mind Tools Screen Structure**
```typescript
interface MindToolsCategories {
  freeCategories: ["Anger Management", "Stress", "Internet & Social Media"];
  basicCategories: ["Family & Relationship", "Sleep", "Suicidal Behaviour", "Sex Life"];
  premiumCategories: [
    "Addictions", "Common Psychological", "Environment Issues",
    "Financial Mental Health", "Physical Fitness", "Internet Dependence",
    "Professional Mental Health", "Social Mental Health", "Job Insecurity",
    "Youngster Issues", "Emotional Intelligence"
  ];
}
```

### 4. **Filter System**

#### **Available Filters**
```typescript
interface FilterSystem {
  scanType: {
    options: ["All", ...translatedScanTypes];
    functionality: "Filter by specific assessment type";
  };
  scoreband: {
    options: ["All Scores", "Normal", "Low Risk", "Moderate Risk", "Severe Risk"];
    functionality: "Filter by risk level";
  };
  timeRange: {
    month: ["All", "January", "February", ..., "December"];
    year: ["All", "2023", "2024", "2025"];
    functionality: "Date-based filtering";
  };
}
```

#### **Filter Logic Implementation**
```typescript
const applyFilters = (allResults: ScanResult[], filters: FilterState) => {
  let filtered = [...allResults];
  
  if (filters.scanType) {
    filtered = filtered.filter(result => result.scanTitle === filters.scanType);
  }
  
  if (filters.yearFilter) {
    filtered = filtered.filter(result => result.date.startsWith(filters.yearFilter));
  }
  
  if (filters.monthFilter) {
    const monthNumber = monthMap[filters.monthFilter];
    filtered = filtered.filter(result => result.date.slice(5, 7) === monthNumber);
  }
  
  if (filters.scoreFilter) {
    filtered = filtered.filter(result => scoreBand(result.score) === filters.scoreFilter);
  }
  
  return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
```

### 5. **Progress Charts**

#### **Chart Configuration**
```typescript
interface ChartConfig {
  type: "LineChart";
  library: "react-native-chart-kit";
  pagination: {
    itemsPerPage: 4;
    navigation: "Previous/Next buttons";
  };
  chartConfig: {
    backgroundColor: "#ffffff";
    color: "rgba(171, 71, 188, opacity)"; // Purple theme
    labelColor: "rgba(85, 85, 85, opacity)";
    decimalPlaces: 0;
    propsForDots: {
      r: "5";
      strokeWidth: "2"; 
      stroke: "#AB47BC";
      fill: "#fff";
    };
  };
}
```

#### **Chart Data Structure**
```typescript
interface ChartData {
  labels: string[];    // Formatted dates: "Nov 15", "Dec 02"
  data: number[];      // Scan scores: [23, 45, 38, 52]
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: 4;
  };
}
```

### 6. **Summary Analytics**

#### **Summary Information Display**
```typescript
interface SummaryDisplay {
  resultsCount: {
    text: "Showing {{count}} result{{plural}}.";
    calculation: "filtered.length";
  };
  latestRecommendations: {
    text: "Latest recommended tiers: {{tiers}}";
    source: "latest.tiers.join(', ')";
    tiers: string[]; // From scan result database
  };
  trendAnalysis: {
    scoreImprovement: boolean;
    consistencyMetrics: number;
    riskLevelChanges: string[];
  };
}
```

---

## 🔄 Complete User Journey Flows

### 1. **Assessment to Insights Flow**
```
Mental Health Assessment
↓
10-Question Scan (Condition-Specific)
↓
Score Calculation (0-100)
↓
Result Screen with 6 Strategies
├── Strategy 1: Primary Information
├── Strategy 2: Common Suggestions → Mind Tools
├── Strategy 3: Yoga & Meditation → Mind Tools  
├── Strategy 4: Relaxation → Mind Tools
├── Strategy 5: CBT → Mind Tools (if score > 50)
└── Strategy 6: Professional Help (if score > 50)
↓
Database Storage (SQLite scan_answers table)
↓
Insights Screen Display (Charts & Analytics)
```

### 2. **Dashboard Interaction Flow**
```
Dashboard Tab Load
↓
Data Aggregation
├── XP Calculation (from conditions)
├── Task Counting (from intervention completions)
├── Condition Counting (from AsyncStorage)
└── Sleep Data Preparation
↓
Card Navigation Options
├── Interventions → InterventionsScreen (2,481 lines)
├── Conditions → ConditionsManagement (1,145 lines)
└── Sleep → SleepTrackingScreen (2,446 lines)
```

### 3. **Insights Analysis Flow**
```
Insights Tab Load
↓
Scan Results Retrieval (getAllScanResults)
↓
Filter Application
├── Scan Type Selection
├── Score Band Filtering
└── Date Range Filtering
↓
Chart Visualization
├── Data Pagination (4 items per page)
├── Progress Trend Analysis
└── Score Band Distribution
↓
Summary Generation
```

### 4. **Mind Tools Integration Flow**
```
Result Screen Strategy Selection
↓
Strategy Type Identification
├── Common Suggestions → General Mind Tools
├── Yoga & Meditation → Yoga Category
├── Relaxation → Relaxation Category
├── CBT → CBT Interventions
└── REBT → REBT Interventions
↓
Mind Tools Screen Navigation
↓
Category-Specific Intervention Selection
↓
XP Earning (5-20 XP per completion)
↓
Dashboard Update (Real-time)
```

---

## 🎮 Gamification Integration

### XP System Across Insights
```typescript
interface InsightsXPSources {
  scanCompletion: 25;           // Completing any condition scan
  strategyImplementation: {
    primary: 5-10;              // Basic information review
    secondary: 8-15;            // Yoga, relaxation, suggestions
    tertiary: 15-20;            // CBT, REBT professional techniques
  };
  mindToolsCompletion: 8-12;    // Individual mind tool exercises
  consistencyBonus: 15;         // Daily engagement streak
  progressMilestones: 50;       // Achieving score improvements
}
```

### Achievement System
```typescript
const insightsAchievements = [
  {
    name: "Assessment Explorer",
    requirement: "Complete 5 different scan types",
    xpReward: 100
  },
  {
    name: "Progress Tracker", 
    requirement: "Show improvement in any scan over 30 days",
    xpReward: 150
  },
  {
    name: "Strategy Master",
    requirement: "Complete all 6 strategies for any condition",
    xpReward: 200
  },
  {
    name: "Consistency Champion",
    requirement: "Take weekly scans for 4 consecutive weeks",
    xpReward: 250
  }
];
```

---

## 🔧 Technical Implementation

### Database Schema
```sql
-- scan_answers table structure
CREATE TABLE scan_answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scan_title TEXT NOT NULL,           -- Condition name
  answer1_score TEXT,                 -- Individual question scores
  answer2_score TEXT,
  ...
  answer10_score TEXT,
  total_score TEXT,                   -- Final calculated score
  result TEXT,                        -- Comma-separated intervention tiers
  question1 TEXT,                     -- Question content
  ...
  question10 TEXT,
  pair_index INTEGER,                 -- Assessment session identifier
  scan_date TEXT,                     -- Date of assessment
  scan_time TEXT,                     -- Time of assessment
  interventions TEXT,                 -- Recommended interventions JSON
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### State Management
```typescript
interface InsightsReduxState {
  dashboard: {
    xpTotal: number;
    conditions: Condition[];
    interventions: InterventionSchedule;
    completedTasks: number;
    sleepData: SleepSession[];
  };
  insights: {
    scanResults: ScanResult[];
    filters: FilterState;
    chartPagination: ChartPaging;
    selectedScanHistory: ScanResult[];
  };
  navigation: {
    activeTab: "Dashboard" | "Insights";
    lastVisitedScreen: string;
  };
}
```

### AsyncStorage Keys
```typescript
const storageKeys = {
  // Dashboard Data
  CONDITIONS: "conditions",                      // User's tracked conditions
  INTERVENTIONS_DAILY: "interventions_Daily",    // Daily intervention schedule
  INTERVENTIONS_WEEKLY: "interventions_Weekly",  // Weekly intervention schedule
  INTERVENTIONS_BIWEEKLY: "interventions_Bi-weekly", // Bi-weekly schedule
  INTERVENTIONS_MONTHLY: "interventions_Monthly", // Monthly schedule
  COMPLETED_DAILY: "completed_interventions_Daily", // Completed daily tasks
  COMPLETED_WEEKLY: "completed_interventions_Weekly", // Completed weekly tasks
  COMPLETED_BIWEEKLY: "completed_interventions_Bi-weekly", // Completed bi-weekly
  COMPLETED_MONTHLY: "completed_interventions_Monthly", // Completed monthly
  
  // Sleep Tracking
  SLEEP_SESSIONS: "sleep_sessions",              // Sleep tracking data
  SLEEP_PREFERENCES: "sleep_preferences",        // Sleep monitoring settings
};
```

---

## 📱 Screen Specifications

### Responsive Design Breakpoints
```css
/* Tablet View (width > 768px) */
.insights-tablet {
  flex-direction: row;
  dashboard-cards: grid-template-columns: repeat(3, 1fr);
  chart-width: 800px;
}

/* Mobile View (width <= 768px) */
.insights-mobile {
  flex-direction: column;
  dashboard-cards: grid-template-columns: repeat(2, 1fr);
  chart-width: screenWidth - 40px;
}
```

### Animation Specifications
```typescript
const animations = {
  tabSwitching: {
    duration: 200,
    easing: "ease-in-out",
    property: "transform"
  },
  chartLoading: {
    duration: 300,
    type: "fade-in",
    delay: 100
  },
  cardExpansion: {
    duration: 150,
    scale: [1, 1.02, 1],
    shadowOpacity: [0.1, 0.2, 0.1]
  }
};
```

---

## 🔐 Privacy & Security

### Data Protection
```typescript
interface DataProtection {
  scanResults: {
    encryption: "AES-256";
    storage: "local SQLite only";
    retention: "2 years";
    sharing: "user-controlled";
  };
  personalMetrics: {
    anonymization: "automatic";
    aggregation: "statistical only";
    consent: "explicit required";
  };
}
```

### Professional Help Integration
```typescript
interface ProfessionalHelpFeatures {
  riskAssessment: {
    triggerScores: [51, 76];          // Moderate & Severe risk levels
    autoRecommendation: true;
    crisisDetection: {
      keywords: ["suicide", "harm", "hopeless"];
      immediateAlert: true;
      emergencyContacts: true;
    };
  };
  referralSystem: {
    localProviders: true;
    telehealth: true;
    insurance: "accepted";
    emergency: "24/7 hotlines";
  };
}
```

---

## 🎯 Success Metrics

### Engagement Analytics
```typescript
interface InsightsMetrics {
  assessmentCompletion: {
    scanStarted: number;
    scanCompleted: number;
    completionRate: number;
  };
  strategyUtilization: {
    primaryViewed: number;
    secondaryEngaged: number;
    tertiaryCompleted: number;
    professionalConnected: number;
  };
  progressTracking: {
    repeatScans: number;
    improvementRate: number;
    consistencyScore: number;
  };
  mindToolsIntegration: {
    strategyToMindToolsNavigation: number;
    mindToolsCompletion: number;
    xpEarned: number;
  };
}
```

### Clinical Effectiveness
```typescript
interface ClinicalOutcomes {
  scoreImprovement: {
    averageImprovement: number;
    timeToImprovement: number; // days
    sustainedImprovement: number; // percentage
  };
  riskReduction: {
    severeToModerate: number;
    moderateToLow: number;
    lowToNormal: number;
  };
  professionalReferral: {
    referralRate: number;
    followThroughRate: number;
    outcomeTracking: boolean;
  };
}
```

---

## 🚀 Future Enhancements

### Planned Features
1. **AI-Powered Insights**: Machine learning trend analysis and personalized recommendations
2. **Comparative Analytics**: Anonymous peer comparison for motivation
3. **Intervention Effectiveness**: Correlation analysis between strategies and outcomes
4. **Professional Dashboard**: Dedicated interface for mental health providers
5. **Crisis Prevention**: Advanced risk detection with immediate intervention
6. **Integration APIs**: Connect with external health platforms and EHR systems

### Technical Roadmap
1. **Real-time Sync**: Cloud synchronization for multi-device access
2. **Advanced Filtering**: Natural language search and complex filter combinations
3. **Export Capabilities**: Comprehensive PDF reports for professional sharing
4. **Predictive Modeling**: Forecast mental health trends and intervention needs
5. **Voice Integration**: Voice-activated scan completion and progress queries

---

## 📞 Support Integration

### Help System
- **Contextual Tooltips**: In-app guidance for complex features
- **Video Tutorials**: Step-by-step assessment and interpretation guides
- **FAQ Integration**: Embedded help for common questions
- **Live Chat**: Real-time support for technical issues

### Professional Resources
- **Provider Directory**: Searchable mental health professional database
- **Emergency Contacts**: Crisis intervention resources by location
- **Educational Content**: Mental health literacy and self-care resources
- **Support Groups**: Community resources and peer support connections

---

*This comprehensive documentation covers the complete Insights screen ecosystem, including the dual-tab interface, 6-strategy intervention system, Mind Tools integration, and the full data flow from condition scans to actionable insights. The screen serves as the analytical heart of ThoughtPro, providing users with both immediate dashboard metrics and deep historical analysis of their mental health journey.*
