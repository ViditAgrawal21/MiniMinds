import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Alert,
  Animated,
  BackHandler,
  TextInput,
  Modal,
} from "react-native";
import CustomIcon from "../../../components/CustomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { t } from "../../../i18n/locales/i18n"; // Import the translation function

const { width } = Dimensions.get("window");

type Tab = "Daily" | "Weekly" | "Bi-weekly" | "Monthly";

interface Intervention {
  id: string;
  title: string;
  subtitle: string;
  // Multi-language support for title and subtitle
  titleTranslations?: {
    en: string;
    hi: string;
    mr: string;
  };
  subtitleTranslations?: {
    en: string;
    hi: string;
    mr: string;
  };
  // Multi-language support for description
  descriptionTranslations?: {
    en: string;
    hi: string;
    mr: string;
  };
  // Store original translation keys for dynamic lookup
  originalTitleKey?: string;
  originalSubtitleKey?: string;
  originalDescriptionKey?: string;
  conditionKey?: string;
  tags: string[];
  xp: number;
  date: string;
  isSelected: boolean;
  isCompleted?: boolean;
  fullDescription?: string;
  condition?: string;
  interventionType?: string;
  isCustom?: boolean;
  conditionName?: string;
  customMeta?: {
    createdAt: string;
    locale: string;
  };
}

// ConditionsManagement types
interface ConditionIntervention {
  id: string;
  type: "CBT" | "REBT" | "Yoga" | "Relaxation" | "Common Suggestions";
  name: string;
  xp: number;
  completedAt: string;
  conditionId: string;
}

interface Condition {
  id: string;
  name: string;
  description: string;
  percentage: number;
  xp: number;
  color: string;
  category: string;
  date: string;
  interventions: ConditionIntervention[];
}

// Function to map intervention tags to condition names
const mapTagsToConditionName = (tags: string[]): string | null => {
  // Create a mapping from tags/categories to condition names
  // These must match exactly the "Issue Name" values in the intervention data
  const tagToConditionMap: Record<string, string> = {
    // Direct condition name matches (exact from data)
    "anger management": "Anger Management",
    "social mental health": "Social Mental Health",
    "common psychological issues": "Common Psychological Issues",
    "professional mental health": "Professional Mental Health",
    "financial mental health": "Financial Mental Health",
    stress: "Stress",
    addictions: "Addictions",
    sleep: "Sleep",
    "suicidal behavior": "suicidal behavior", // Exact match from data
    "suicidal behaviour": "suicidal behavior", // Alternative spelling
    "sex life": "Sex Life",
    "family and relaitonship": "Family and Relaitonship", // Exact match from data (note typo)
    "family relationship": "Family and Relaitonship", // Alternative mapping
    "family and relationship": "Family and Relaitonship", // Alternative mapping
    "internet dependence": "Internet Dependence",
    "internet social media": "Internet and Social Media Issue",
    "internet and social media": "Internet and Social Media Issue",
    "internet-&-social-media": "Internet and Social Media Issue",
    "internet-social-media": "Internet and Social Media Issue",
    "internet & social media": "Internet and Social Media Issue",
    "environment issues affecting mental wellbeing":
      "Environment Issues affecting mental wellbeing", // Exact match
    "environment issues": "Environment Issues affecting mental wellbeing", // Short form
    "youngster issues": "Youngster Issues",
    "general physical fitness": "General Physical Fitness",
    
    // Alternative mappings for common terms
    anger: "Anger Management",
    anxiety: "Common Psychological Issues",
    depression: "Common Psychological Issues",
    "social anxiety": "Social Mental Health",
    "work stress": "Professional Mental Health",
    "job stress": "Professional Mental Health",
    career: "Professional Mental Health",
    money: "Financial Mental Health",
    finance: "Financial Mental Health",
    financial: "Financial Mental Health",
    relationship: "Family and Relaitonship",
    family: "Family and Relaitonship",
    // Note: Removed standalone "internet" mapping to avoid conflicts
    "social media": "Internet and Social Media Issue",
    environment: "Environment Issues affecting mental wellbeing",
    youth: "Youngster Issues",
    teen: "Youngster Issues",
    fitness: "General Physical Fitness",
    exercise: "General Physical Fitness",
    physical: "General Physical Fitness",
  };

  // First check for exact matches with full tag combinations
  for (const tag of tags) {
    // Normalize the tag by replacing hyphens, underscores, and ampersands with spaces
    const normalizedTag = tag
      .toLowerCase()
      .trim()
      .replace(/[-_&]/g, " ") // Replace hyphens, underscores, and ampersands with spaces
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim();
    // Create a Title Case version for direct comparisons
    const titleCaseTag = normalizedTag
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    if (titleCaseTag === "Common Psychological Issues")
      return "Common Psychological Issues";
    if (titleCaseTag === "Environment Issues affecting mental wellbeing")
      return "Environment Issues affecting mental wellbeing";
    if (titleCaseTag === "Family and Relaitonship")
      return "Family and Relaitonship";
    if (titleCaseTag === "Financial Mental Health")
      return "Financial Mental Health";
    if (titleCaseTag === "General Physical Fitness")
      return "General Physical Fitness";
    if (titleCaseTag === "Internet and Social Media Issue")
      return "Internet and Social Media Issue";
    if (titleCaseTag === "Internet Dependence") return "Internet Dependence";
    if (titleCaseTag === "Professional Mental Health")
      return "Professional Mental Health";
    if (titleCaseTag === "Sex Life") return "Sex Life";
    if (titleCaseTag === "Sleep") return "Sleep";
    if (titleCaseTag === "Social Mental Health") return "Social Mental Health";
    if (titleCaseTag === "Stress") return "Stress";
    if (titleCaseTag === "Suicidal behavior" || titleCaseTag === "Suicidal Behavior") return "suicidal behavior";
    if (titleCaseTag === "Youngster Issues") return "Youngster Issues";
  }

  // Then check for partial matches but prioritize more specific ones
  const sortedEntries = Object.entries(tagToConditionMap).sort(
    (a, b) => b[0].length - a[0].length,
  );
  
  for (const tag of tags) {
    const normalizedTag = tag
      .toLowerCase()
      .trim()
      .replace(/[-_&]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    for (const [key, condition] of sortedEntries) {
      if (normalizedTag.includes(key) || key.includes(normalizedTag)) {
        // Special handling for internet-related conditions
        if (
          key.includes("social media") &&
          normalizedTag.includes("internet")
        ) {
          return "Internet and Social Media Issue";
        }
        if (key === "internet" && normalizedTag.includes("social media")) {
          return "Internet and Social Media Issue";
        }
        return condition;
      }
    }
  }

  return null;
};

// Function to determine intervention type from title/subtitle
const determineInterventionType = (
  title: string,
  subtitle: string,
): "CBT" | "REBT" | "Yoga" | "Relaxation" | "Common Suggestions" => {
  const combined = `${title} ${subtitle}`.toLowerCase();
  
  if (
    combined.includes("cbt") ||
    combined.includes("cognitive behavioral") ||
    combined.includes("cognitive restructuring")
  ) {
    return "CBT";
  }
  if (
    combined.includes("rebt") ||
    combined.includes("rational emotive") ||
    combined.includes("rational-emotive")
  ) {
    return "REBT";
  }
  if (
    combined.includes("yoga") ||
    combined.includes("meditation") ||
    combined.includes("pranayama") ||
    combined.includes("asana")
  ) {
    return "Yoga";
  }
  if (
    combined.includes("relaxation") ||
    combined.includes("breathing") ||
    combined.includes("mindfulness")
  ) {
    return "Relaxation";
  }
  
  return "Common Suggestions";
};

// Function to sync completed intervention to ConditionsManagement
const syncInterventionToConditionsManagement = async (
  intervention: Intervention,
): Promise<void> => {
  try {
  // Prefer explicit conditionName for custom interventions
  const conditionName = intervention.conditionName || mapTagsToConditionName(intervention.tags);
    if (!conditionName) {
      console.log("No condition mapping found for tags:", intervention.tags);
      return;
    }

    // Get current conditions from ConditionsManagement
    const storedConditions = await AsyncStorage.getItem("conditions");
    let conditions: Condition[] = storedConditions
      ? JSON.parse(storedConditions)
      : [];

    // Find or create the condition
    let conditionIndex = conditions.findIndex((c) => c.name === conditionName);
    
    if (conditionIndex === -1) {
      // Create new condition if it doesn't exist
      const newCondition: Condition = {
        id: Date.now().toString(),
        name: conditionName,
        description: `Managing ${conditionName}`,
        percentage: 0,
        xp: 0,
        color: "#8b5cf6",
        category: "Automatically Created",
        date: new Date().toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
        interventions: [],
      };
      conditions.push(newCondition);
      conditionIndex = conditions.length - 1;
    }

    // Create intervention for ConditionsManagement
    const interventionType = determineInterventionType(
      intervention.title,
      intervention.subtitle,
    );
    
    const newConditionIntervention: ConditionIntervention = {
      id: intervention.id,
      type: interventionType,
      name: intervention.title,
      xp: intervention.xp,
      completedAt: new Date().toISOString(),
      conditionId: conditions[conditionIndex].id,
    };

    // Add intervention to condition
    conditions[conditionIndex].interventions.push(newConditionIntervention);
    conditions[conditionIndex].xp += intervention.xp;

    // Calculate new percentage based on total XP (simple calculation)
    conditions[conditionIndex].percentage = Math.min(
      Math.floor(conditions[conditionIndex].xp / 100) * 10,
      100,
    );

    // Save updated conditions
    await AsyncStorage.setItem("conditions", JSON.stringify(conditions));

    // Add to activity log
    await addToConditionActivityLog(
      conditions[conditionIndex],
      newConditionIntervention,
    );

    console.log(
      `Successfully synced intervention "${intervention.title}" to condition "${conditionName}"`,
    );
  } catch (error) {
    console.error("Error syncing intervention to ConditionsManagement:", error);
  }
};

// Function to add intervention to condition activity log
const addToConditionActivityLog = async (
  condition: Condition,
  intervention: ConditionIntervention,
): Promise<void> => {
  try {
    const activityLogsKey = `${condition.name
      .toLowerCase()
      .replace(/\s+/g, "_")}_activity_logs`;

    const existingLogs = await AsyncStorage.getItem(activityLogsKey);
    const logs = existingLogs ? JSON.parse(existingLogs) : [];

    const newLog = {
      id: intervention.id,
      title: `${intervention.type} - ${intervention.name}`,
      type: intervention.type,
      timeAgo: "Just now",
      xp: intervention.xp,
      completedAt: intervention.completedAt,
      interventionType: intervention.type,
    };

    logs.unshift(newLog);
    await AsyncStorage.setItem(activityLogsKey, JSON.stringify(logs));

    console.log(`Added to activity log for ${condition.name}:`, newLog.title);
  } catch (error) {
    console.error("Error adding to condition activity log:", error);
  }
};

export default function InterventionsScreen({ navigation, route }: any) {
  const [activeTab, setActiveTab] = useState<Tab>(
    route?.params?.activeTab || "Daily",
  );
  const scrollViewRef = useRef<ScrollView>(null);

  // Track the source screen for proper back navigation
  const sourceScreen = route?.params?.sourceScreen || "MindTools";

  const [interventions, setInterventions] = useState<
    Record<Tab, Intervention[]>
  >({
    Daily: [],
    Weekly: [],
    "Bi-weekly": [],
    Monthly: [],
  });

  const [completedInterventions, setCompletedInterventions] = useState<
    Record<Tab, Intervention[]>
  >({
    Daily: [],
    Weekly: [],
    "Bi-weekly": [],
    Monthly: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  // XP Popup animation states
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const xpPopupScale = useRef(new Animated.Value(0)).current;
  const xpPopupOpacity = useRef(new Animated.Value(0)).current;

  // Add Intervention modal/state
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [existingConditions, setExistingConditions] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [isCreatingNewCondition, setIsCreatingNewCondition] = useState(false);
  const [newConditionName, setNewConditionName] = useState("");
  const [newConditionDescription, setNewConditionDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newXp, setNewXp] = useState<number | null>(null);
  const [newFrequency, setNewFrequency] = useState<Tab | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showConditionDropdown, setShowConditionDropdown] = useState(false);

  // Handle hardware back button for Android and navigation back button
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Navigate back to the source screen
        if (sourceScreen === "MindTools") {
          navigation.navigate("Tab", { screen: "MindTools" });
        } else if (sourceScreen === "homeTab") {
          navigation.navigate("Tab", { screen: "Home" });
        } else if (sourceScreen === "Insights") {
          navigation.navigate("Tab", { screen: "Insights" });
        } else {
          // Fallback to standard back navigation
          navigation.goBack();
        }
        return true; // Prevent default back action
      };

      // Add hardware back button listener for Android
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => backHandler.remove();
    }, [navigation, sourceScreen]),
  );

  // Language change detection with improved triggering
  useEffect(() => {
    const currentLocale = "en";
    if (currentLanguage !== currentLocale) {
      console.log(
        `Language changed from ${currentLanguage} to ${currentLocale}`,
      );
      setCurrentLanguage(currentLocale);
      // Force re-render when language changes by updating state
      setInterventions((prev) => ({ ...prev }));
      setCompletedInterventions((prev) => ({ ...prev }));
    }
  }, [currentLanguage]); // Watch current language state

  // Additional effect to watch for external language changes
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentLocale = "en";
      if (currentLanguage !== currentLocale) {
        setCurrentLanguage(currentLocale);
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, [currentLanguage]);

  const tabs = useMemo<Tab[]>(
    () => ["Daily", "Weekly", "Bi-weekly", "Monthly"],
    [],
  );

  // Enhanced translation mapping for common intervention terms
  const interventionTranslations = {
    // Common intervention titles
    "Daily Meditation": {
      en: "Daily Meditation",
      hi: "दैनिक ध्यान",
      mr: "दैनिक ध्यान",
    },
    "Breathing Exercise": {
      en: "Breathing Exercise",
      hi: "सांस की अभ्यास",
      mr: "श्वास व्यायाम",
    },
    "Mindfulness Practice": {
      en: "Mindfulness Practice",
      hi: "सचेतन अभ्यास",
      mr: "सचेतन अभ्यास",
    },
    "Gratitude Journal": {
      en: "Gratitude Journal",
      hi: "कृतज्ञता डायरी",
      mr: "कृतज्ञता डायरी",
    },
    "Stress Management": {
      en: "Stress Management",
      hi: "तनाव प्रबंधन",
      mr: "तणाव व्यवस्थापन",
    },
    "Anxiety Relief": {
      en: "Anxiety Relief",
      hi: "चिंता राहत",
      mr: "चिंता निवारण",
    },
    "Sleep Hygiene": {
      en: "Sleep Hygiene",
      hi: "नींद की स्वच्छता",
      mr: "झोपेची स्वच्छता",
    },
    "Positive Thinking": {
      en: "Positive Thinking",
      hi: "सकारात्मक सोच",
      mr: "सकारात्मक विचार",
    },
    "Emotional Regulation": {
      en: "Emotional Regulation",
      hi: "भावनात्मक नियंत्रण",
      mr: "भावनात्मक नियंत्रण",
    },
    "Self-Care Routine": {
      en: "Self-Care Routine",
      hi: "स्वयं की देखभाल",
      mr: "स्वयं काळजी",
    },
    "Anger Management": {
      en: "Anger Management",
      hi: "गुस्सा प्रबंधन",
      mr: "राग व्यवस्थापन",
    },
    "Deep Breathing": {
      en: "Deep Breathing",
      hi: "गहरी सांस",
      mr: "खोल श्वास",
    },
    "Progressive Relaxation": {
      en: "Progressive Relaxation",
      hi: "प्रगतिशील आराम",
      mr: "प्रगतिशील विश्रांति",
    },
    "Yoga Practice": {
      en: "Yoga Practice",
      hi: "योग अभ्यास",
      mr: "योग सराव",
    },
    "Mindful Walking": {
      en: "Mindful Walking",
      hi: "सचेत चलना",
      mr: "सजग चालणे",
    },
    "Journal Writing": {
      en: "Journal Writing",
      hi: "डायरी लेखन",
      mr: "नोंदणी लेखन",
    },
    "Cognitive Restructuring": {
      en: "Cognitive Restructuring",
      hi: "संज्ञानात्मक पुनर्गठन",
      mr: "संज्ञानात्मक पुनर्रचना",
    },
    
    // Common subtitles
    "Take 10 minutes to meditate": {
      en: "Take 10 minutes to meditate",
      hi: "10 मिनट ध्यान करें",
      mr: "10 मिनिटे ध्यान करा",
    },
    "Practice deep breathing": {
      en: "Practice deep breathing",
      hi: "गहरी सांस लें",
      mr: "खोल श्वास घ्या",
    },
    "Write down three things you're grateful for": {
      en: "Write down three things you're grateful for",
      hi: "तीन चीजें लिखें जिसके लिए आप कृतज्ञ हैं",
      mr: "तुम्ही कृतज्ञ असलेल्या तीन गोष्टी लिहा",
    },
    "Practice relaxation techniques": {
      en: "Practice relaxation techniques",
      hi: "आराम की तकनीक अभ्यास करें",
      mr: "विश्रांति तंत्र सराव करा",
    },
    "Focus on your breathing for 5 minutes": {
      en: "Focus on your breathing for 5 minutes",
      hi: "5 मिनट तक अपनी सांसों पर ध्यान दें",
      mr: "5 मिनिटे तुमच्या श्वासावर लक्ष केंद्रित करा",
    },
    "Write about your thoughts and feelings": {
      en: "Write about your thoughts and feelings",
      hi: "अपने विचारों और भावनाओं के बारे में लिखें",
      mr: "तुमचे विचार आणि भावना लिहा",
    },
    "Practice letting go of negative thoughts": {
      en: "Practice letting go of negative thoughts",
      hi: "नकारात्मक विचारों को छोड़ने का अभ्यास करें",
      mr: "नकारात्मक विचार सोडण्याचा सराव करा",
    },
    "Take time for yourself today": {
      en: "Take time for yourself today",
      hi: "आज अपने लिए समय निकालें",
      mr: "आज स्वतःसाठी वेळ काढा",
    },
    "Practice mindful awareness": {
      en: "Practice mindful awareness",
      hi: "सचेत जागरूकता का अभ्यास करें",
      mr: "सजग जागरूकतेचा सराव करा",
    },
    "Challenge negative thought patterns": {
      en: "Challenge negative thought patterns",
      hi: "नकारात्मक विचार पैटर्न को चुनौती दें",
      mr: "नकारात्मक विचार पद्धतींना आव्हान द्या",
    },
    
    // Common words that might appear in interventions
    meditation: {
      en: "meditation",
      hi: "ध्यान",
      mr: "ध्यान",
    },
    breathing: {
      en: "breathing",
      hi: "श्वास",
      mr: "श्वास",
    },
    relaxation: {
      en: "relaxation",
      hi: "आराम",
      mr: "विश्रांति",
    },
    mindfulness: {
      en: "mindfulness",
      hi: "सचेतना",
      mr: "सचेतता",
    },
    exercise: {
      en: "exercise",
      hi: "व्यायाम",
      mr: "व्यायाम",
    },
    journal: {
      en: "डायरी",
      hi: "डायरी",
      mr: "नोंदणी",
    },
    practice: {
      en: "practice",
      hi: "अभ्यास",
      mr: "सराव",
    },
    therapy: {
      en: "therapy",
      hi: "चिकित्सा",
      mr: "चिकित्सा",
    },
    // Additional common terms that might appear in interventions
    Identify: {
      en: "Identify",
      hi: "पहचानें",
      mr: "ओळखा",
    },
    Communication: {
      en: "Communication",
      hi: "संवाद",
      mr: "संवाद",
    },
    "Irrational Beliefs": {
      en: "Irrational Beliefs",
      hi: "अतार्किक विश्वास",
      mr: "अतार्किक समज",
    },
    "Family Relationship": {
      en: "Family Relationship",
      hi: "पारिवारिक संबंध",
      mr: "कौटुंबिक नाते",
    },
    identify: {
      en: "identify",
      hi: "पहचानना",
      mr: "ओळखणे",
    },
    communication: {
      en: "communication",
      hi: "संवाद",
      mr: "संवाद",
    },
    beliefs: {
      en: "beliefs",
      hi: "विश्वास",
      mr: "समज",
    },
    irrational: {
      en: "irrational",
      hi: "अतार्किक",
      mr: "अतार्किक",
    },
    family: {
      en: "family",
      hi: "पारिवारिक",
      mr: "कौटुंबिक",
    },
    relationship: {
      en: "relationship",
      hi: "संबंध",
      mr: "नाते",
    },
  };

  // Enhanced helper function to get localized text with dynamic translation support
  const getLocalizedText = (
    intervention: Intervention,
    field: "title" | "subtitle",
  ): string => {
    const currentLocale = "en" as "en" | "hi" | "mr";
    const originalText =
      field === "title" ? intervention.title : intervention.subtitle;

    // For custom interventions always show the user-entered text unchanged across languages
    if (intervention.isCustom) {
      return originalText;
    }
    
    // First, try dynamic translation using stored translation keys
    if (field === "title" && intervention.originalTitleKey) {
      try {
        const dynamicTranslation = t(intervention.originalTitleKey);
        console.log(
          `Title translation attempt: key="${intervention.originalTitleKey}", locale="${currentLocale}", result="${dynamicTranslation}"`,
        );
        if (
          dynamicTranslation &&
          dynamicTranslation !== intervention.originalTitleKey
        ) {
          return dynamicTranslation;
        }
      } catch (error) {
        console.log("Error with dynamic title translation:", error);
      }
    }

    if (
      field === "subtitle" &&
      intervention.originalSubtitleKey &&
      intervention.conditionKey
    ) {
      try {
        const conditionName = t(intervention.conditionKey);
        console.log(
          `Condition translation: key="${intervention.conditionKey}", locale="${currentLocale}", result="${conditionName}"`,
        );
        const dynamicTranslation = t(intervention.originalSubtitleKey, {
          conditionName,
        });
        console.log(
          `Subtitle translation attempt: key="${intervention.originalSubtitleKey}", locale="${currentLocale}", conditionName="${conditionName}", result="${dynamicTranslation}"`,
        );
        if (
          dynamicTranslation &&
          dynamicTranslation !== intervention.originalSubtitleKey
        ) {
          return dynamicTranslation;
        }
      } catch (error) {
        console.log("Error with dynamic subtitle translation:", error);
      }
    }
    
    // Second, try to get from stored translations
    const storedTranslation =
      field === "title"
        ? intervention.titleTranslations?.[currentLocale]
        : intervention.subtitleTranslations?.[currentLocale];
    
    if (storedTranslation && storedTranslation.trim() !== "") {
      return storedTranslation;
    }
    
    // Third, try to get from common translations mapping (exact match only)
    const commonTranslation =
      interventionTranslations[
        originalText as keyof typeof interventionTranslations
      ];
    if (commonTranslation) {
      return commonTranslation[currentLocale];
    }
    
    // Try case-insensitive exact match
    const lowerCaseText = originalText.toLowerCase();
    const caseInsensitiveMatch = Object.keys(interventionTranslations).find(
      (key) => key.toLowerCase() === lowerCaseText,
    );
    if (caseInsensitiveMatch) {
      const translation =
        interventionTranslations[
          caseInsensitiveMatch as keyof typeof interventionTranslations
        ];
      return translation[currentLocale];
    }
    
    // For partial matching, be more conservative - only match if the text is very similar
    for (const [key, translation] of Object.entries(interventionTranslations)) {
      const keyLower = key.toLowerCase();
      const textLower = originalText.toLowerCase();
      
      // Only match if the texts are very similar (exact substring match and similar length)
      if (
        keyLower === textLower ||
        (keyLower.includes(textLower) &&
          Math.abs(keyLower.length - textLower.length) <= 3) ||
        (textLower.includes(keyLower) &&
          Math.abs(keyLower.length - textLower.length) <= 3)
      ) {
        return translation[currentLocale];
      }
    }
    
    // Simplified word translation - only for single words that are common terms
    const trimmedText = originalText.trim();
    if (!trimmedText.includes(" ") && trimmedText.length > 3) {
      const cleanWord = trimmedText.toLowerCase().replace(/[^\w]/g, "");
      const wordTranslation =
        interventionTranslations[
          cleanWord as keyof typeof interventionTranslations
        ];
      
      if (wordTranslation) {
        return wordTranslation[currentLocale];
      }
    }
    
    // Finally, fall back to original text
    return originalText;
  };

  // Helper function to translate tags
  const getLocalizedTag = (tag: string): string => {
    const currentLocale = "en" as "en" | "hi" | "mr";
    
    // Handle common suggestion tag
    if (tag === "common-suggestion") {
      return t("interventionsScreen.tags.commonSuggestion");
    }
    
    // Handle condition-based tags (convert kebab-case back to readable format)
    const readableTag = tag.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    
    // Check if it's a condition name that needs translation
    const conditionKeyMap: { [key: string]: string } = {
      "Anger Management": "scanIntro.angerManagement.title",
      "Stress": "scanIntro.stress.title",
      "Addictions": "scanIntro.addictions.title",
      "General Physical Fitness": "scanIntro.generalPhysicalFitness.title",
      "Suicidal Behavior": "scanIntro.suicidalBehaviour.title",
      "Common Psychological Issues": "scanIntro.commonPsychologicalIssues.title",
      "Environment Issues Affecting Mental Wellbeing": "scanIntro.environmentIssues.title",
      "Family And Relaitonship": "scanIntro.familyRelationship.title",
      "Financial Mental Health": "scanIntro.financialMentalHealth.title",
      "Internet And Social Media Issue": "scanIntro.internetAndSocialMediaIssue.title",
      "Internet Dependence": "scanIntro.internetDependence.title",
      "Professional Mental Health": "scanIntro.professionalMentalHealth.title",
      "Sex Life": "scanIntro.sexLife.title",
      "Sleep": "scanIntro.sleep.title",
      "Social Mental Health": "scanIntro.socialMentalHealth.title",
      "Youngster Issues": "scanIntro.youngsterIssues.title",
    };
    
    const conditionKey = conditionKeyMap[readableTag];
    if (conditionKey) {
      try {
        const translated = t(conditionKey);
        if (translated && translated !== conditionKey) {
          return translated;
        }
      } catch (error) {
        console.log("Error translating condition tag:", error);
      }
    }
    
    // Try to find translation in the intervention translations mapping
    const tagTranslation = interventionTranslations[readableTag as keyof typeof interventionTranslations];
    if (tagTranslation) {
      return tagTranslation[currentLocale];
    }
    
    // Try case-insensitive match
    const lowerCaseTag = readableTag.toLowerCase();
    const caseInsensitiveMatch = Object.keys(interventionTranslations).find(
      (key) => key.toLowerCase() === lowerCaseTag,
    );
    if (caseInsensitiveMatch) {
      const translation = interventionTranslations[caseInsensitiveMatch as keyof typeof interventionTranslations];
      return translation[currentLocale];
    }
    
    // Return the readable tag if no translation found
    return readableTag;
  };

  // Storage keys for AsyncStorage
  const getStorageKey = (tab: Tab) => `interventions_${tab}`;
  const getCompletedStorageKey = (tab: Tab) => `completed_interventions_${tab}`;

  const loadInterventions = useCallback(async () => {
    setIsLoading(true);
    try {
      const savedInterventions: Record<Tab, Intervention[]> = {
        Daily: [],
        Weekly: [],
        "Bi-weekly": [],
        Monthly: [],
      };

      const savedCompletedInterventions: Record<Tab, Intervention[]> = {
        Daily: [],
        Weekly: [],
        "Bi-weekly": [],
        Monthly: [],
      };

      for (const tab of tabs) {
        try {
          // Load regular interventions
          const stored = await AsyncStorage.getItem(getStorageKey(tab));
          if (stored && stored !== "null") {
            const parsedData = JSON.parse(stored);
            if (Array.isArray(parsedData)) {
              savedInterventions[tab] = parsedData;
            } else {
              savedInterventions[tab] = [];
            }
          } else {
            // Start with empty array for all tabs
            savedInterventions[tab] = [];
          }

          // Load completed interventions
          const completedStored = await AsyncStorage.getItem(
            getCompletedStorageKey(tab),
          );
          if (completedStored && completedStored !== "null") {
            const parsedCompletedData = JSON.parse(completedStored);
            if (Array.isArray(parsedCompletedData)) {
              savedCompletedInterventions[tab] = parsedCompletedData;
            } else {
              savedCompletedInterventions[tab] = [];
            }
          } else {
            savedCompletedInterventions[tab] = [];
          }
        } catch (error) {
          console.error(`Error loading ${tab} interventions:`, error);
          savedInterventions[tab] = [];
          savedCompletedInterventions[tab] = [];
        }
      }

      setInterventions(savedInterventions);
      setCompletedInterventions(savedCompletedInterventions);
    } catch (error) {
      console.error("Error loading interventions:", error);
      // Fallback to empty arrays
      setInterventions({
        Daily: [],
        Weekly: [],
        "Bi-weekly": [],
        Monthly: [],
      });
      setCompletedInterventions({
        Daily: [],
        Weekly: [],
        "Bi-weekly": [],
        Monthly: [],
      });
    } finally {
      setIsLoading(false);
    }
  }, [tabs]);

  // Load interventions from AsyncStorage on app start
  useEffect(() => {
    loadInterventions();
  }, [loadInterventions]);

  const loadConditionsList = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem("conditions");
      if (stored) {
        const parsed: Condition[] = JSON.parse(stored);
        setExistingConditions(Array.from(new Set(parsed.map(c=>c.name))).sort());
      } else setExistingConditions([]);
    } catch(e){
      console.warn('Failed to load conditions list', e);
      setExistingConditions([]);
    }
  }, []);

  const openAddModal = () => { setIsAddModalVisible(true); loadConditionsList(); };
  const closeAddModal = () => {
    setIsAddModalVisible(false);
    setSelectedCondition(null); setIsCreatingNewCondition(false);
    setNewConditionName(""); setNewConditionDescription("");
    setNewTitle(""); setNewSubtitle(""); setNewDescription("");
    setNewXp(null); setNewFrequency(null); setIsSaving(false); setShowConditionDropdown(false);
  };
  const validateModal = () => {
    if (isSaving) return false;
    if (isCreatingNewCondition) return !!newConditionName.trim() && !!newTitle.trim() && newXp!==null && newFrequency!==null;
    return !!selectedCondition && !!newTitle.trim() && newXp!==null && newFrequency!==null;
  };
  const getOrCreateCondition = async (name: string): Promise<Condition> => {
    const stored = await AsyncStorage.getItem("conditions");
    let conditions: Condition[] = stored? JSON.parse(stored): [];
    let existing = conditions.find(c=>c.name===name);
    if (existing) return existing;
    const newCond: Condition = { id: Date.now().toString(), name, description: newConditionDescription.trim()||`Managing ${name}`, percentage:0, xp:0, color:'#8b5cf6', category:'Automatically Created', date: new Date().toLocaleDateString('en-US',{month:'numeric',day:'numeric',year:'numeric'}), interventions:[] };
    conditions.push(newCond);
    await AsyncStorage.setItem('conditions', JSON.stringify(conditions));
    return newCond;
  };
  const handleCreateCustomIntervention = async () => {
    if(!validateModal()) { Alert.alert(t('interventionsScreen.error'), t('interventionsScreen.modal.validationError')); return; }
    try {
      setIsSaving(true);
      const locale = "en" as 'en'|'hi'|'mr';
      const conditionDisplay = isCreatingNewCondition ? newConditionName.trim(): (selectedCondition as string);
      const finalCondition = await getOrCreateCondition(conditionDisplay);
      const targetTab = newFrequency as Tab;
      const intervention: Intervention = {
        id: Date.now().toString(),
        title: newTitle.trim(),
        subtitle: newSubtitle.trim(),
        titleTranslations: { en:'', hi:'', mr:'', [locale]: newTitle.trim() },
        subtitleTranslations: { en:'', hi:'', mr:'', [locale]: newSubtitle.trim() },
        descriptionTranslations: { en:'', hi:'', mr:'', [locale]: newDescription.trim() },
        tags: [conditionDisplay.toLowerCase(), 'custom'],
        xp: newXp as number,
        date: new Date().toLocaleDateString('en-US',{month:'numeric',day:'numeric',year:'numeric'}),
        isSelected:false,
        isCompleted:false,
        fullDescription: newDescription.trim(),
        condition: finalCondition.name,
        interventionType: determineInterventionType(newTitle, newSubtitle),
        isCustom:true,
        conditionName: finalCondition.name,
        customMeta: { createdAt: new Date().toISOString(), locale }
      };
      setInterventions(prev => ({...prev, [targetTab]: [...prev[targetTab], intervention]}));
      await saveInterventions(targetTab, [...interventions[targetTab], intervention]);
      Alert.alert(t('interventionsScreen.success'), t('interventionsScreen.interventionCreated'));
      closeAddModal();
    } catch(e){
      console.error('Failed to create custom intervention', e);
      Alert.alert(t('interventionsScreen.error'), t('interventionsScreen.failedToCreate'));
      setIsSaving(false);
    }
  };

  const saveInterventions = async (
    tab: Tab,
    updatedInterventions: Intervention[],
  ) => {
    try {
      const dataToSave = JSON.stringify(updatedInterventions);
      await AsyncStorage.setItem(getStorageKey(tab), dataToSave);
      console.log(
        `Successfully saved ${updatedInterventions.length} interventions for ${tab} tab`,
      );
    } catch (error) {
      console.error("Error saving interventions:", error);
      Alert.alert(
        t("interventionsScreen.error"),
        t("interventionsScreen.failedToSave"),
      );
      throw error;
    }
  };

  const saveCompletedInterventions = async (
    tab: Tab,
    updatedCompletedInterventions: Intervention[],
  ) => {
    try {
      const dataToSave = JSON.stringify(updatedCompletedInterventions);
      await AsyncStorage.setItem(getCompletedStorageKey(tab), dataToSave);
      console.log(
        `Successfully saved ${updatedCompletedInterventions.length} completed interventions for ${tab} tab`,
      );
    } catch (error) {
      console.error("Error saving completed interventions:", error);
      Alert.alert(
        t("interventionsScreen.error"),
        t("interventionsScreen.failedToSaveCompleted"),
      );
      throw error;
    }
  };

  // Sort interventions with unselected ones first, then selected ones
  const getSortedInterventions = (interventionList: Intervention[]) => {
    const unselected = interventionList.filter((item) => !item.isSelected);
    const selected = interventionList.filter((item) => item.isSelected);
    return [...unselected, ...selected];
  };

  // Function to show XP gained popup with animation
  const showXpGainedPopup = (xpAmount: number) => {
    setXpGained(xpAmount);
    setShowXpPopup(true);

    // Reset animation values
    xpPopupScale.setValue(0);
    xpPopupOpacity.setValue(0);

    // Animate in
    Animated.parallel([
      Animated.spring(xpPopupScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(xpPopupOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto hide after 1.5 seconds
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(xpPopupScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(xpPopupOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowXpPopup(false);
      });
    }, 1500);
  };

  const handleBackPress = () => {
    // Navigate back to the source screen with proper routing
    if (sourceScreen === "MindTools") {
      navigation.navigate("Tab", { screen: "MindTools" });
    } else if (sourceScreen === "homeTab") {
      navigation.navigate("Tab", { screen: "Home" });
    } else if (sourceScreen === "InsightsScreen") {
      navigation.navigate("Tab", { screen: "Insights" });
    } else {
      // Fallback to standard back navigation
      navigation.goBack();
    }
  };

  const handleTabPress = (tab: Tab) => {
    setActiveTab(tab);
    const tabIndex = tabs.indexOf(tab);
    scrollViewRef.current?.scrollTo({ x: tabIndex * width, animated: true });
  };

  const handleCardPress = async (tab: Tab, id: string) => {
    const currentInterventions = interventions[tab];
    const interventionToComplete = currentInterventions.find(
      (item) => item.id === id,
    );

    if (interventionToComplete) {
      // Remove from main list
      const updatedInterventions = currentInterventions.filter(
        (item) => item.id !== id,
      );

      // Add to completed list
      const completedIntervention = {
        ...interventionToComplete,
        isCompleted: true,
        isSelected: false,
      };
      const updatedCompletedInterventions = [
        ...completedInterventions[tab],
        completedIntervention,
      ];

      // Update state
      setInterventions((prev) => ({
        ...prev,
        [tab]: updatedInterventions,
      }));

      setCompletedInterventions((prev) => ({
        ...prev,
        [tab]: updatedCompletedInterventions,
      }));

      // Save to AsyncStorage
      await saveInterventions(tab, updatedInterventions);
      await saveCompletedInterventions(tab, updatedCompletedInterventions);

      // Sync to ConditionsManagement
      await syncInterventionToConditionsManagement(completedIntervention);

      // Increment wellness score by XP gained (capped at 100)
      try {
        // await incrementWellnessScore(interventionToComplete.xp);
      } catch (e) {
        console.warn('Failed to increment wellness score', e);
      }

      // Show XP gained popup
      showXpGainedPopup(interventionToComplete.xp);
    }
  };

  const handleDeleteCard = async (tab: Tab, id: string) => {
    Alert.alert(
      t("interventionsScreen.deleteIntervention"),
      t("interventionsScreen.confirmDelete"),
      [
        { text: t("interventionsScreen.cancel"), style: "cancel" },
        {
          text: t("interventionsScreen.delete"),
          style: "destructive",
          onPress: async () => {
            try {
              const currentInterventions = interventions[tab];
              const updatedInterventions = currentInterventions.filter(
                (item) => item.id !== id,
              );

              setInterventions((prev) => ({
                ...prev,
                [tab]: updatedInterventions,
              }));

              await AsyncStorage.setItem(
                getStorageKey(tab),
                JSON.stringify(updatedInterventions),
              );
            } catch (error) {
              console.error("Error deleting intervention:", error);
              loadInterventions();
            }
          },
        },
      ],
    );
  };

  const handleViewIntervention = (intervention: Intervention) => {
    console.log("Viewing intervention:", JSON.stringify(intervention, null, 2));
    navigation.navigate("InterventionDetail", {
      intervention,
      previousScreen: "InterventionsScreen",
      activeTab: activeTab, // Pass the current active tab
      sourceScreen: sourceScreen, // Pass the original source screen
    });
  };

  // Helper function to determine if an intervention should show the journal button
  const shouldShowJournalButton = (intervention: Intervention): boolean => {
    // Journal button should only show for CBT and REBT interventions
    return intervention.tags.some(
      (tag) => tag.toLowerCase() === "cbt" || tag.toLowerCase() === "rebt",
    );
  };

  const handleJournalPress = async (intervention: Intervention) => {
    try {
      console.log("Journal press - intervention tags:", intervention.tags);
      
      // Map intervention tags to condition name
      const conditionName = mapTagsToConditionName(intervention.tags);
      console.log("Mapped condition name:", conditionName);
      
      if (!conditionName) {
        console.error(
          "Unable to determine condition name from tags:",
          intervention.tags,
        );
        Alert.alert(
          t("interventionsScreen.error"),
          t("interventionsScreen.unableToDetermineCondition"),
        );
        return;
      }

      // Check if condition exists in storage, if not create it
      const storedConditions = await AsyncStorage.getItem("conditions");
      let conditions: Condition[] = storedConditions
        ? JSON.parse(storedConditions)
        : [];

      let targetCondition = conditions.find((c) => c.name === conditionName);
      
      if (!targetCondition) {
        console.log("Creating new condition:", conditionName);
        // Create new condition if it doesn't exist
        targetCondition = {
          id: Date.now().toString(),
          name: conditionName,
          description: `Managing ${conditionName}`,
          percentage: 0,
          xp: 0,
          color: "#8b5cf6",
          category: "Automatically Created",
          date: new Date().toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          }),
          interventions: [],
        };
        
        conditions.push(targetCondition);
        await AsyncStorage.setItem("conditions", JSON.stringify(conditions));
      }

      console.log("Navigating to journal for condition:", targetCondition.name);
      
      // Determine intervention type from tags
      const interventionType = determineInterventionType(
        intervention.title,
        intervention.subtitle,
      );

      console.log("Intervention type determined:", interventionType);
      
      // Navigate to journal entries for this condition with intervention context
      navigation.navigate("JournalEntriesScreen", {
        conditionId: targetCondition.id,
        conditionName: targetCondition.name,
        interventionTitle: intervention.title,
        interventionType: interventionType,
      });
    } catch (error) {
      console.error("Error handling journal press:", error);
      Alert.alert(
        t("interventionsScreen.error"),
        t("interventionsScreen.failedToOpenJournal"),
      );
    }
  };

  const handleRefresh = async () => {
    const currentInterventions = interventions[activeTab];
    const currentCompletedInterventions = completedInterventions[activeTab];

    // Reset current interventions to unselected state
    const resetCurrentInterventions = currentInterventions.map((item) => ({
      ...item,
      isSelected: false,
    }));

    // Convert completed interventions back to active interventions
    const restoredInterventions = currentCompletedInterventions.map((item) => ({
      ...item,
      isSelected: false,
      isCompleted: false,
    }));

    // Combine reset current interventions with restored completed interventions
    const updatedInterventions = [
      ...resetCurrentInterventions,
      ...restoredInterventions,
    ];

    setInterventions((prev) => ({
      ...prev,
      [activeTab]: updatedInterventions,
    }));

    // Clear completed interventions since they've been moved back to active
    setCompletedInterventions((prev) => ({
      ...prev,
      [activeTab]: [],
    }));

    await saveInterventions(activeTab, updatedInterventions);
    await saveCompletedInterventions(activeTab, []);

    Alert.alert(
      t("interventionsScreen.refreshed"),
      t("interventionsScreen.allTasksReset"),
    );
  };

  const renderInterventionCard = (
    intervention: Intervention,
    tab: Tab,
    isCompleted = false,
  ) => {
    return (
      <Pressable
        key={intervention.id}
        style={[
          styles.interventionCard,
          intervention.isSelected && styles.selectedCard,
          isCompleted && styles.completedCard,
        ]}
        onPress={() => !isCompleted && handleCardPress(tab, intervention.id)}
        disabled={isCompleted}
      >
        <View style={styles.cardContent}>
          <View style={styles.selectionCircle}>
            <View
              style={[
                styles.circle,
                (intervention.isSelected || isCompleted) &&
                  styles.selectedCircle,
              ]}
            >
              {(intervention.isSelected || isCompleted) && (
                <CustomIcon type="IO" name="checkmark" size={12} color="#ffffff" />
              )}
            </View>
          </View>

          <View style={styles.cardInfo}>
            <Text
              style={[styles.cardTitle, isCompleted && styles.completedText]}
            >
              {getLocalizedText(intervention, "title")}
            </Text>
            <Text
              style={[styles.cardSubtitle, isCompleted && styles.completedText]}
            >
              {getLocalizedText(intervention, "subtitle")}
            </Text>

            <View style={styles.tagsContainer}>
              {intervention.tags.map((tag, index) => (
                <View
                  key={index}
                  style={[styles.tag, isCompleted && styles.completedTag]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      isCompleted && styles.completedTagText,
                    ]}
                  >
                    {getLocalizedTag(tag)}
                  </Text>
                </View>
              ))}
              <View
                style={[styles.xpBadge, isCompleted && styles.completedXpBadge]}
              >
                <Text
                  style={[styles.xpText, isCompleted && styles.completedXpText]}
                >
                  {intervention.xp} {t("interventionsScreen.xpLabel")}
                </Text>
              </View>
              {!isCompleted && (
                <View style={styles.cardButtonsContainer}>
                  <Pressable
                    style={styles.viewButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleViewIntervention(intervention);
                    }}
                  >
                    <CustomIcon type="IO" name="eye-outline" size={14} color="#8b5cf6" />
                    <Text style={styles.viewButtonText}>
                      {t("interventionsScreen.view")}
                    </Text>
                  </Pressable>
                  {shouldShowJournalButton(intervention) && (
                    <Pressable
                      style={styles.journalButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleJournalPress(intervention);
                      }}
                    >
                      <CustomIcon type="IO"
                        name="journal-outline"
                        size={14}
                        color="#10b981"
                      />
                      <Text style={styles.journalButtonText}>
                        {t("interventionsScreen.journal")}
                      </Text>
                    </Pressable>
                  )}
                </View>
              )}
            </View>
          </View>

          <View style={styles.cardRight}>
            <Text
              style={[styles.dateText, isCompleted && styles.completedText]}
            >
              {intervention.date}
            </Text>
            {!isCompleted && (
              <View style={styles.cardActions}>
                <Pressable
                  style={styles.deleteButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleDeleteCard(tab, intervention.id);
                  }}
                >
                  <CustomIcon type="IO" name="trash-outline" size={18} color="#ef4444" />
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  const renderTabContent = (tab: Tab) => {
    const sortedInterventions = getSortedInterventions(interventions[tab]);
    const completedCount = completedInterventions[tab].length;
    const hasActiveInterventions = interventions[tab].length > 0;
    const hasCompletedInterventions = completedCount > 0;
    const allTasksCompleted =
      !hasActiveInterventions && hasCompletedInterventions;

    return (
      <View style={styles.tabContent} key={tab}>
        <ScrollView
          style={styles.cardsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
        >
          {isLoading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                {t("interventionsScreen.loading")}
              </Text>
            </View>
          ) : allTasksCompleted ? (
            <View style={styles.celebratoryContainer}>
              <View style={styles.celebratorySquare}>
                <View style={styles.celebratoryIcon}>
                  <CustomIcon type="IO" name="checkmark-circle" size={80} color="#10b981" />
                </View>
                <Text style={styles.celebratoryTitle}>
                  {t("interventionsScreen.allTasksCompleted")}
                </Text>
                <Text style={styles.celebratorySubtitle}>
                  {t("interventionsScreen.congratulationsMessage", {
                    tab: t(`interventionsScreen.tabs.${tab.toLowerCase()}`),
                  })}
                </Text>
                <View style={styles.celebratoryBadge}>
                  <Text style={styles.celebratoryBadgeText}>
                    {t("interventionsScreen.tasksCompleted", {
                      count: completedCount,
                    })}
                  </Text>
                </View>
              </View>

              <View style={styles.completedSectionHeader}>
                <Text style={styles.completedSectionTitle}>
                  {t("interventionsScreen.completed", {
                    count: completedCount,
                  })}
                </Text>
              </View>
              {completedInterventions[tab].map((intervention) =>
                renderInterventionCard(intervention, tab, true),
              )}
            </View>
          ) : (
            <>
              {sortedInterventions.map((intervention) =>
                renderInterventionCard(intervention, tab, false),
              )}
              {!hasActiveInterventions && !hasCompletedInterventions && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>
                    {t("interventionsScreen.noInterventionsFound", {
                      tab: t(`interventionsScreen.tabs.${tab.toLowerCase()}`),
                    })}
                  </Text>
                </View>
              )}

              {hasCompletedInterventions && (
                <>
                  <View style={styles.completedSectionHeader}>
                    <Text style={styles.completedSectionTitle}>
                      {t("interventionsScreen.completed", {
                        count: completedCount,
                      })}
                    </Text>
                  </View>
                  {completedInterventions[tab].map((intervention) =>
                    renderInterventionCard(intervention, tab, true),
                  )}
                </>
              )}
            </>
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>{t("interventionsScreen.title")}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => handleTabPress(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {t(`interventionsScreen.tabs.${tab.toLowerCase()}`)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const tabIndex = Math.round(
            event.nativeEvent.contentOffset.x / width,
          );
          setActiveTab(tabs[tabIndex]);
        }}
        style={styles.contentContainer}
      >
        {tabs.map((tab) => renderTabContent(tab))}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Pressable style={styles.refreshButton} onPress={handleRefresh}>
          <CustomIcon type="IO" name="refresh" size={24} color="#8b5cf6" />
        </Pressable>
        <Pressable style={styles.addButton} accessibilityLabel={t('interventionsScreen.addTooltip')} onPress={openAddModal}>
          <CustomIcon type="IO" name="add" size={30} color="#ffffff" />
        </Pressable>
      </View>

      

      {/* XP Gained Popup */}
      {showXpPopup && (
        <View style={styles.xpPopupContainer}>
          <Animated.View
            style={[
              styles.xpPopup,
              {
                transform: [{ scale: xpPopupScale }],
                opacity: xpPopupOpacity,
              },
            ]}
          >
            <View style={styles.xpPopupIconContainer}>
              <CustomIcon type="IO" name="star" size={32} color="#fbbf24" />
            </View>
            <Text style={styles.xpPopupText}>
              {t("interventionsScreen.xpGained", { xp: xpGained })}
            </Text>
            <Text style={styles.xpPopupSubtext}>
              {t("interventionsScreen.greatJob")}
            </Text>
          </Animated.View>
        </View>
      )}
      <Modal
        visible={isAddModalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeAddModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeAddModal}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t("interventionsScreen.modal.title")}</Text>
              <Pressable style={styles.closeButton} onPress={closeAddModal}>
                <CustomIcon type="IO" name="close" size={22} color="#1a1a1a" />
              </Pressable>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true}>
              <Text style={styles.fieldLabel}>{t("interventionsScreen.modal.conditionLabel")}</Text>
              <View style={styles.dropdown}>
                <Pressable
                  style={[
                    styles.dropdownButton,
                    { borderColor: showConditionDropdown ? "#8b5cf6" : "#e5e7eb" },
                  ]}
                  onPress={() => {
                    console.log("Dropdown button pressed, current state:", showConditionDropdown);
                    setShowConditionDropdown((p) => !p);
                  }}
                >
                  <Text style={[styles.dropdownText, !selectedCondition && !isCreatingNewCondition && styles.placeholderText]}>
                    {isCreatingNewCondition
                      ? t("interventionsScreen.modal.newConditionOption")
                      : selectedCondition ||
                        t(
                          "interventionsScreen.modal.selectConditionPlaceholder",
                        )}
                  </Text>
                  <CustomIcon type="IO"
                    name={showConditionDropdown ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#6b7280"
                  />
                </Pressable>
                {showConditionDropdown && (
                  <View style={styles.dropdownMenu}>
                    <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
                      {existingConditions.length === 0 && (
                        <View style={styles.dropdownOption}>
                          <Text style={[styles.dropdownOptionText, { color: "#6b7280", fontStyle: "italic" }]}>
                            {t("interventionsScreen.noConditions")}
                          </Text>
                        </View>
                      )}
                      {existingConditions.map((name) => (
                        <Pressable
                          key={name}
                          style={[styles.dropdownOption, selectedCondition === name && { backgroundColor: "#f3f4f6" }]}
                          onPress={() => {
                            console.log("Selecting condition:", name);
                            setSelectedCondition(name);
                            setIsCreatingNewCondition(false);
                            setShowConditionDropdown(false);
                          }}
                        >
                          <Text style={styles.dropdownOptionText}>{name}</Text>
                        </Pressable>
                      ))}
                      <Pressable
                        style={[styles.dropdownOption, { borderBottomWidth: 0 }]}
                        onPress={() => {
                          console.log("Creating new condition");
                          setIsCreatingNewCondition(true);
                          setSelectedCondition(null);
                          setShowConditionDropdown(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownOptionText,
                            { fontWeight: "600", color: "#8b5cf6" },
                          ]}
                        >
                          + {t("interventionsScreen.modal.newConditionOption")}
                        </Text>
                      </Pressable>
                    </ScrollView>
                  </View>
                )}
              </View>
              {isCreatingNewCondition && (
                <>
                  <Text style={styles.fieldLabel}>
                    {t("interventionsScreen.modal.newConditionNameLabel")}
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    value={newConditionName}
                    onChangeText={setNewConditionName}
                    placeholder={t(
                      "interventionsScreen.modal.newConditionNameLabel",
                    )}
                    placeholderTextColor="#9ca3af"
                  />
                  <Text style={styles.fieldLabel}>
                    {t(
                      "interventionsScreen.modal.newConditionDescriptionLabel",
                    )}
                  </Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={newConditionDescription}
                    onChangeText={setNewConditionDescription}
                    multiline
                    placeholder={t(
                      "interventionsScreen.modal.newConditionDescriptionLabel",
                    )}
                    placeholderTextColor="#9ca3af"
                  />
                </>
              )}
              <Text style={styles.fieldLabel}>
                {t("interventionsScreen.modal.titleLabel")} *
              </Text>
              <TextInput
                style={styles.textInput}
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder={t("interventionsScreen.modal.titleLabel")}
                placeholderTextColor="#9ca3af"
              />
              <Text style={styles.fieldLabel}>
                {t("interventionsScreen.modal.subtitleLabel")}
              </Text>
              <TextInput
                style={styles.textInput}
                value={newSubtitle}
                onChangeText={setNewSubtitle}
                placeholder={t("interventionsScreen.modal.subtitleLabel")}
                placeholderTextColor="#9ca3af"
              />
              <Text style={styles.fieldLabel}>
                {t("interventionsScreen.modal.descriptionLabel")}
              </Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={newDescription}
                onChangeText={setNewDescription}
                multiline
                placeholder={t("interventionsScreen.modal.descriptionLabel")}
                placeholderTextColor="#9ca3af"
              />
              <Text style={styles.fieldLabel}>
                {t("interventionsScreen.modal.xpLabel")} *
              </Text>
              <View style={styles.xpContainer}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((v) => {
                  const selected = newXp === v;
                  return (
                    <Pressable
                      key={v}
                      style={[styles.xpButton, selected && styles.selectedXpButton]}
                      onPress={() => setNewXp(v)}
                    >
                      <Text
                        style={[
                          styles.xpButtonText,
                          selected && styles.selectedXpButtonText,
                        ]}
                      >
                        {v}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <Text style={styles.fieldLabel}>
                {t("interventionsScreen.modal.frequencyLabel")} *
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {tabs.map((tab) => {
                  const active = newFrequency === tab;
                  return (
                    <Pressable
                      key={tab}
                      style={[styles.frequencyChip, active && styles.frequencyChipActive]}
                      onPress={() => setNewFrequency(tab)}
                    >
                      <Text
                        style={[
                          styles.frequencyChipText,
                          active && styles.frequencyChipTextActive,
                        ]}
                      >
                        {t(`interventionsScreen.tabs.${tab.toLowerCase()}`)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <Pressable
                disabled={!validateModal()}
                style={[styles.saveButton, !validateModal() && { opacity: 0.5 }]}
                onPress={handleCreateCustomIntervention}
              >
                <Text style={styles.saveButtonText}>
                  {isSaving ? "..." : t("interventionsScreen.modal.saveButton")}
                </Text>
              </Pressable>
              <View style={{height:16}} />
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#ffffff",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    justifyContent: "space-between",
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    flex: 1,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    minWidth: 0,
  },
  activeTab: {
    borderBottomColor: "#8b5cf6",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#6b7280",
    textAlign: "center",
  },
  activeTabText: {
    color: "#8b5cf6",
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    width: width,
    flex: 1,
  },
  cardsList: {
    flex: 1,
  },
  cardsContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  interventionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCard: {
    borderColor: "#8b5cf6",
    backgroundColor: "#faf5ff",
  },
  completedCard: {
    opacity: 0.7,
    backgroundColor: "#f9fafb",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  selectionCircle: {
    marginRight: 12,
    marginTop: 2,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCircle: {
    borderColor: "#8b5cf6",
    backgroundColor: "#8bcf6",
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },
  completedTag: {
    backgroundColor: "#e5e7eb",
  },
  completedTagText: {
    color: "#9ca3af",
  },
  xpBadge: {
    backgroundColor: "#8b5cf6",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  xpText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
  },
  completedXpBadge: {
    backgroundColor: "#9ca3af",
  },
  completedXpText: {
    color: "#ffffff",
  },
  cardRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 60,
  },
  dateText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  completedText: {
    color: "#9ca3af",
  },
  cardActions: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    padding: 4,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  viewButtonText: {
    fontSize: 12,
    color: "#8b5cf6",
    fontWeight: "500",
    marginLeft: 4,
  },
  cardButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  journalButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdfa",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 4,
  },
  journalButtonText: {
    fontSize: 12,
    color: "#10b981",
    fontWeight: "500",
    marginLeft: 4,
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    fontStyle: "italic",
  },
  actionButtons: {
    position: "absolute",
    bottom: 30,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  refreshButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width:0, height:4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  frequencyChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    borderWidth:1,
    borderColor:'#e5e7eb',
  },
  frequencyChipActive: {
    backgroundColor:'#8b5cf6',
    borderColor:'#8b5cf6',
  },
  frequencyChipText: {
    fontSize:14,
    fontWeight:'500',
    color:'#374151'
  },
  frequencyChipTextActive: {
    color:'#ffffff'
  },
  // Celebratory styles
  celebratoryContainer: {
    flex: 1,
  },
  celebratorySquare: {
    backgroundColor: "#f0fdf4",
    borderRadius: 20,
    padding: 40,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#10b981",
    shadowColor: "#10b981",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  celebratoryIcon: {
    marginBottom: 20,
  },
  celebratoryTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#065f46",
    textAlign: "center",
    marginBottom: 12,
  },
  celebratorySubtitle: {
    fontSize: 16,
    color: "#047857",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  celebratoryBadge: {
    backgroundColor: "#10b981",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  celebratoryBadgeText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  completedSectionHeader: {
    paddingVertical: 16,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    marginTop: 24,
  },
  completedSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6b7280",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    maxWidth: 400,
    maxHeight: "85%",
    overflow: "visible",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  closeButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 8,
    marginTop: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1a1a1a",
    backgroundColor: "#ffffff",
    marginBottom: 8,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  dropdownRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    marginBottom: 16,
    zIndex: 1000,
  },
  dropdownHalf: {
    flex: 1,
    zIndex: 1000,
  },
  dropdown: {
    position: "relative",
    zIndex: 1000,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#ffffff",
  },
  dropdownText: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  placeholderText: {
    color: "#9ca3af",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    marginTop: 4,
    zIndex: 10000,
    elevation: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    maxHeight: 160,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  dropdownOptionText: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  xpContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  xpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  selectedXpButton: {
    backgroundColor: "#8b5cf6",
    borderColor: "#8b5cf6",
  },
  xpButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  selectedXpButtonText: {
    color: "#ffffff",
  },
  saveButton: {
    backgroundColor: "#8b5cf6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  // XP Popup Styles
  xpPopupContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    pointerEvents: "none",
  },
  xpPopup: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 160,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 3,
    borderColor: "#fbbf24",
  },
  xpPopupIconContainer: {
    marginBottom: 8,
  },
  xpPopupText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#8b5cf6",
    marginBottom: 4,
  },
  xpPopupSubtext: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
});
