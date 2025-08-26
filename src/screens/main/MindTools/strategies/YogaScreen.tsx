import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  Modal,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "../../../i18n/i18n";
import i18n from "../../../i18n/i18n";

interface YogaIntervention {
  // Format from translation files (yogaInterventions section)
  title?: string;
  description?: string;
  xp?: number;
  
  // Legacy format from static JSON files (keeping for backward compatibility)
  "Issue Name"?: string;
  "Intervention Type"?: string;
  "Intervention Sub Type"?: string;
  "Card Title"?: string;
  "Card Description"?: string;
}

interface SavedIntervention {
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
}

interface YogaData {
  condition: string;
  intervention_type: string;
  interventions: YogaIntervention[];
}

export default function YogaScreen({ navigation, route }: any) {
  const [yogaInterventions, setYogaInterventions] = useState<
    YogaIntervention[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [conditionName, setConditionName] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedYoga, setSelectedYoga] = useState<YogaIntervention | null>(
    null,
  );
  const [modalAnimation] = useState(new Animated.Value(0));
  const [currentLanguage, setCurrentLanguage] = useState(i18n.locale);
  
  const { condition } = route.params || {};

  // Language change detection with improved triggering (unified with InterventionsScreen)
  useEffect(() => {
    const currentLocale = i18n.locale;
    if (currentLanguage !== currentLocale) {
      console.log(
        `Language changed from ${currentLanguage} to ${currentLocale}`,
      );
      setCurrentLanguage(currentLocale);
      setConditionName(getConditionDisplayName(condition));
    }
  }, [currentLanguage, condition]);

  // Additional effect to watch for external language changes
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentLocale = i18n.locale;
      if (currentLanguage !== currentLocale) {
        setCurrentLanguage(currentLocale);
        setConditionName(getConditionDisplayName(condition));
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, [currentLanguage, condition]);

  // Comprehensive translation mapping for common yoga intervention terms
  const yogaTranslations = {
    // Common yoga titles
    "Child's Pose (Balasana)": {
      en: "Child's Pose (Balasana)",
      hi: "बालासन (बच्चे की मुद्रा)",
      mr: "बालासन (मुलाचे आसन)",
    },
    "Cat-Cow Pose (Marjaryasana-Bitilasana)": {
      en: "Cat-Cow Pose (Marjaryasana-Bitilasana)",
      hi: "मार्जरीआसन-बितिलासन (बिल्ली-गाय की मुद्रा)",
      mr: "मार्जरीआसन-बितिलासन (मांजर-गाय आसन)",
    },
    "Forward Bend (Uttanasana)": {
      en: "Forward Bend (Uttanasana)",
      hi: "उत्तानासन (आगे की ओर झुकना)",
      mr: "उत्तानासन (पुढे वाकणे)",
    },
    "Legs Up the Wall Pose (Viparita Karani)": {
      en: "Legs Up the Wall Pose (Viparita Karani)",
      hi: "विपरीत करणी (दीवार पर पैर)",
      mr: "विपरीत करणी (भिंतीवर पाय)",
    },
    "Corpse Pose (Savasana)": {
      en: "Corpse Pose (Savasana)",
      hi: "शवासन (शव की मुद्रा)",
      mr: "शवासन (मृत आसन)",
    },
    "Mindfulness Meditation": {
      en: "Mindfulness Meditation",
      hi: "सचेतन ध्यान",
      mr: "सजग ध्यान",
    },
    "Loving-Kindness Meditation (Metta)": {
      en: "Loving-Kindness Meditation (Metta)",
      hi: "प्रेम-कृपा ध्यान (मेट्टा)",
      mr: "प्रेम-करुणा ध्यान (मेट्टा)",
    },
    "Guided Visualization": {
      en: "Guided Visualization",
      hi: "निर्देशित दृश्यीकरण",
      mr: "मार्गदर्शित दृश्यीकरण",
    },
    "Body Scan Meditation": {
      en: "Body Scan Meditation",
      hi: "शरीर स्कैन ध्यान",
      mr: "शरीर स्कॅन ध्यान",
    },
    "Mountain Pose (Tadasana)": {
      en: "Mountain Pose (Tadasana)",
      hi: "ताड़ासन (पर्वत आसन)",
      mr: "ताडासन (पर्वत आसन)",
    },
    "Tree Pose (Vrikshasana)": {
      en: "Tree Pose (Vrikshasana)",
      hi: "वृक्षासन (वृक्ष आसन)",
      mr: "वृक्षासन (वृक्ष आसन)",
    },
    "Warrior Pose": {
      en: "Warrior Pose",
      hi: "योद्धा आसन",
      mr: "योद्धा आसन",
    },
    "Bridge Pose (Setu Bandhasana)": {
      en: "Bridge Pose (Setu Bandhasana)",
      hi: "सेतु बंधासन (पुल आसन)",
      mr: "सेतु बंधासन (पूल आसन)",
    },
    "Cobra Pose (Bhujangasana)": {
      en: "Cobra Pose (Bhujangasana)",
      hi: "भुजंगासन (कोबरा आसन)",
      mr: "भुजंगासन (नाग आसन)",
    },
    
    // Common meditation types
    "Breath Awareness (Pranayama)": {
      en: "Breath Awareness (Pranayama)",
      hi: "श्वास जागरूकता (प्राणायाम)",
      mr: "श्वास जागरूकता (प्राणायाम)",
    },
    "Deep Breathing": {
      en: "Deep Breathing",
      hi: "गहरी सांस",
      mr: "खोल श्वास",
    },
    "Mindful Breathing": {
      en: "Mindful Breathing",
      hi: "सचेत श्वास",
      mr: "सजग श्वास",
    },
    
    // Common yoga terms
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
    yoga: {
      en: "yoga",
      hi: "योग",
      mr: "योग",
    },
    pranayama: {
      en: "pranayama",
      hi: "प्राणायाम",
      mr: "प्राणायाम",
    },
    asana: {
      en: "asana",
      hi: "आसन",
      mr: "आसन",
    },
    mindfulness: {
      en: "mindfulness",
      hi: "सचेतना",
      mr: "सचेतता",
    },
    visualization: {
      en: "visualization",
      hi: "दृश्यीकरण",
      mr: "दृश्यीकरण",
    },
    practice: {
      en: "practice",
      hi: "अभ्यास",
      mr: "सराव",
    },
    pose: {
      en: "pose",
      hi: "आसन",
      mr: "आसन",
    },
    stretch: {
      en: "stretch",
      hi: "खिंचाव",
      mr: "स्ट्रेच",
    },
  };

  const showModal = () => {
    setShowTaskModal(true);
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShowTaskModal(false);
      setSelectedYoga(null);
    });
  };

  const getConditionDisplayName = (condition: string): string => {
    const conditionKeyMap: { [key: string]: string } = {
      "anger-management": "scanIntro.angerManagement.title",
      stress: "scanIntro.stress.title",
      addictions: "scanIntro.addictions.title",
      "general-physical-fitness": "scanIntro.generalPhysicalFitness.title",
      "suicidal-behavior": "scanIntro.suicidalBehaviour.title",
      "common-psychological-issues":
        "scanIntro.commonPsychologicalIssues.title",
      "family-relationship": "scanIntro.familyAndRelationship.title",
      "internet-dependence": "scanIntro.internetDependence.title",
      "environment-issues":
        "scanIntro.environmentIssuesAffectingMentalWellbeing.title",
      "financial-mental-health": "scanIntro.financialMentalHealth.title",
      "internet-social-media": "scanIntro.internetAndSocialMediaIssue.title",
      "professional-mental-health": "scanIntro.professionalMentalHealth.title",
      "sex-life": "scanIntro.sexLife.title",
      sleep: "scanIntro.sleep.title",
      "social-mental-health": "scanIntro.socialMentalHealth.title",
      "youngster-issues": "scanIntro.youngsterIssues.title",
    };
    const translationKey = conditionKeyMap[condition];
    return translationKey ? t(translationKey) : condition;
  };

  const formatDescription = (description: string): string => {
    // Remove markdown formatting for display
    return description
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markers
      .replace(/^\s*-\s*/gm, "• ") // Convert dashes to bullets
      .replace(/'/g, "") // Remove single quotes at start
      .trim();
  };

  const getYogaTitle = (yoga: YogaIntervention): string => {
    // Translation files use 'title', legacy files use 'Card Title'
    return yoga.title || yoga["Card Title"] || "Untitled Yoga Practice";
  };

  const getYogaDescription = (yoga: YogaIntervention): string => {
    // Translation files use 'description', legacy files use 'Card Description'
    const desc = yoga.description || yoga["Card Description"] || "";
    return formatDescription(desc);
  };

  const getLocalizedYogaText = (
    yoga: YogaIntervention,
    field: "title" | "description",
  ): string => {
    const currentLocale = i18n.locale as "en" | "hi" | "mr";
    const originalText =
      field === "title" ? getYogaTitle(yoga) : getYogaDescription(yoga);
    
    // First, try dynamic translation if we have stored keys (for saved interventions that have this data)
    const yogaIndex = yogaInterventions.findIndex((r) => r === yoga);
    const translationKeyMap: { [key: string]: string } = {
      "anger-management": "angerManagement",
      addictions: "addictions",
      "common-psychological-issues": "commonPsychologicalIssues",
      "environment-issues": "environmentIssues",
      "family-relationship": "familyRelationship",
      "financial-mental-health": "financialMentalHealth",
      "general-physical-fitness": "generalPhysicalFitness",
      "internet-dependence": "internetDependence",
      "internet-social-media": "internetSocialMedia",
      "professional-mental-health": "professionalMentalHealth",
      "sex-life": "sexLife",
      sleep: "sleep",
      "social-mental-health": "socialMentalHealth",
      stress: "stress",
      "suicidal-behavior": "suicidalBehavior",
      "youngster-issues": "youngsterIssues",
    };
    
    const translationKey = translationKeyMap[condition];
    if (translationKey && yogaIndex >= 0) {
      try {
        const dynamicKey = `yogaInterventions.${translationKey}.${yogaIndex}.${field}`;
        const dynamicTranslation = t(dynamicKey);
        console.log(
          `Yoga ${field} translation attempt: key="${dynamicKey}", locale="${currentLocale}", result="${dynamicTranslation}"`,
        );
        if (dynamicTranslation && dynamicTranslation !== dynamicKey) {
          return formatDescription(dynamicTranslation);
        }
      } catch (error) {
        console.log(`Error with dynamic yoga ${field} translation:`, error);
      }
    }
    
    // Second, try to get from common translations mapping (exact match)
    const commonTranslation =
      yogaTranslations[originalText as keyof typeof yogaTranslations];
    if (commonTranslation) {
      const translated = commonTranslation[currentLocale] || originalText;
      return field === "description"
        ? formatDescription(translated)
        : translated;
    }
    
    // Try case-insensitive exact match
    const lowerCaseText = originalText.toLowerCase();
    const caseInsensitiveMatch = Object.keys(yogaTranslations).find(
      (key) => key.toLowerCase() === lowerCaseText,
    );
    if (caseInsensitiveMatch) {
      const translation =
        yogaTranslations[caseInsensitiveMatch as keyof typeof yogaTranslations];
      const translated = translation[currentLocale] || originalText;
      return field === "description"
        ? formatDescription(translated)
        : translated;
    }
    
    // For partial matching, be conservative - only match if the text contains common terms
    for (const [key, translation] of Object.entries(yogaTranslations)) {
      if (
        originalText.toLowerCase().includes(key.toLowerCase()) &&
        key.length > 5
      ) {
        console.log(
          `Partial match found for "${originalText}" with key "${key}"`,
        );
        const translated = translation[currentLocale] || originalText;
        return field === "description"
          ? formatDescription(translated)
          : translated;
      }
    }
    
    // Simplified word translation - only for single words that are common terms
    const trimmedText = originalText.trim();
    if (!trimmedText.includes(" ") && trimmedText.length > 3) {
      const wordTranslation =
        yogaTranslations[
          trimmedText.toLowerCase() as keyof typeof yogaTranslations
        ];
      if (wordTranslation) {
        const translated = wordTranslation[currentLocale] || originalText;
        return field === "description"
          ? formatDescription(translated)
          : translated;
      }
    }
    
    // Finally, fall back to original text (apply formatting for descriptions)
    return field === "description"
      ? formatDescription(originalText)
      : originalText;
  };

  // Get translated yoga data or fall back to static JSON files
  const getYogaData = (condition: string): YogaData | null => {
    // Check if we have translations for this condition
    const translationKeyMap: { [key: string]: string } = {
      "anger-management": "angerManagement",
      addictions: "addictions",
      "common-psychological-issues": "commonPsychologicalIssues",
      "environment-issues": "environmentIssues",
      "family-relationship": "familyRelationship",
      "financial-mental-health": "financialMentalHealth",
      "general-physical-fitness": "generalPhysicalFitness",
      "internet-dependence": "internetDependence",
      "internet-social-media": "internetSocialMedia",
      "professional-mental-health": "professionalMentalHealth",
      "sex-life": "sexLife",
      sleep: "sleep",
      "social-mental-health": "socialMentalHealth",
      stress: "stress",
      "suicidal-behavior": "suicidalBehavior",
      "youngster-issues": "youngsterIssues",
    };

    const translationKey = translationKeyMap[condition];
    
    // If translations exist for this condition, use them
    if (translationKey) {
      try {
        const translatedYogaData = t(`yogaInterventions.${translationKey}`, {
          returnObjects: true,
        });

        if (
          Array.isArray(translatedYogaData) &&
          translatedYogaData.length > 0
        ) {
          // Create translated yoga interventions with proper structure
          const interventions = translatedYogaData.map((yoga: any) => ({
            "Issue Name": condition,
            "Intervention Type": "Yoga",
            "Intervention Sub Type": "Mindfulness",
            "Card Title": yoga.title,
            "Card Description": yoga.description,
            xp: yoga.xp || 3, // Default XP value for yoga practices
          }));

          return {
            condition: condition,
            intervention_type: "Yoga & Meditation",
            interventions: interventions,
          };
        }
      } catch {
        console.log(
          `No translations found for ${condition} yoga, falling back to JSON`,
        );
      }
    }

    // Fall back to static JSON files for conditions without translations
    const dataMap: { [key: string]: YogaData } = {
      "anger-management": require("../../../../Mind Tools/data/anger-management/yoga.json"),
      stress: require("../../../../Mind Tools/data/stress/yoga.json"),
      addictions: require("../../../../Mind Tools/data/addictions/yoga.json"),
      "general-physical-fitness": require("../../../../Mind Tools/data/general-physical-fitness/yoga.json"),
      "suicidal-behavior": require("../../../../Mind Tools/data/suicidal-behavior/yoga.json"),
      "common-psychological-issues": require("../../../../Mind Tools/data/common-psychological-issues/yoga.json"),
      "family-relationship": require("../../../../Mind Tools/data/family-relationship/yoga.json"),
      "internet-dependence": require("../../../../Mind Tools/data/internet-dependence/yoga.json"),
      "environment-issues": require("../../../../Mind Tools/data/environment-issues/yoga.json"),
      "financial-mental-health": require("../../../../Mind Tools/data/financial-mental-health/yoga.json"),
      "internet-social-media": require("../../../../Mind Tools/data/internet-social-media/yoga.json"),
      "professional-mental-health": require("../../../../Mind Tools/data/professional-mental-health/yoga.json"),
      "sex-life": require("../../../../Mind Tools/data/sex-life/yoga.json"),
      sleep: require("../../../../Mind Tools/data/sleep/yoga.json"),
      "social-mental-health": require("../../../../Mind Tools/data/social-mental-health/yoga.json"),
      "youngster-issues": require("../../../../Mind Tools/data/youngster-issues/yoga.json"),
    };
    
    return dataMap[condition] || null;
  };

  const loadYogaInterventions = useCallback(async () => {
    try {
      setLoading(true);
      
      if (!condition) {
        console.error("No condition parameter provided");
        return;
      }

      const data = getYogaData(condition);
      
      if (!data) {
        console.error(`No yoga data found for condition: ${condition}`);
        Alert.alert(
          t("yogaScreen.error.title"),
          t("yogaScreen.error.noYogaData"),
          [
            {
              text: t("yogaScreen.error.ok"),
              onPress: () => navigation.goBack(),
            },
          ],
        );
        return;
      }
      
      setYogaInterventions(data.interventions || []);
      setConditionName(getConditionDisplayName(condition));
    } catch (error) {
      console.error("Error loading yoga interventions:", error);
      Alert.alert(
        t("yogaScreen.error.title"),
        t("yogaScreen.error.failedToLoad"),
        [
          {
            text: t("yogaScreen.error.ok"),
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } finally {
      setLoading(false);
    }
  }, [condition, navigation]);

  useEffect(() => {
    loadYogaInterventions();
  }, [loadYogaInterventions]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToTaskList = (yoga: YogaIntervention) => {
    setSelectedYoga(yoga);
    showModal();
  };

  const handleTaskFrequencySelect = async (frequency: string) => {
    if (!selectedYoga) return;
    
    hideModal();
    
    try {
      // Map frequency to the correct tab format
      const tabMap: { [key: string]: string } = {
        Daily: "Daily",
        Weekly: "Weekly",
        "Bi-Weekly": "Bi-weekly",
        Monthly: "Monthly",
      };
      
      const tab = tabMap[frequency];
      if (!tab) {
        Alert.alert(
          t("yogaScreen.error.title"),
          t("yogaScreen.error.invalidFrequency"),
        );
        return;
      }
      
      // Create a new intervention in the format expected by InterventionsScreen
      // Get the translation keys for proper dynamic translation
      const translationKeyMap: { [key: string]: string } = {
        "anger-management": "angerManagement",
        addictions: "addictions",
        "common-psychological-issues": "commonPsychologicalIssues",
        "environment-issues": "environmentIssues",
        "family-relationship": "familyRelationship",
        "financial-mental-health": "financialMentalHealth",
        "general-physical-fitness": "generalPhysicalFitness",
        "internet-dependence": "internetDependence",
        "internet-social-media": "internetSocialMedia",
        "professional-mental-health": "professionalMentalHealth",
        "sex-life": "sexLife",
        sleep: "sleep",
        "social-mental-health": "socialMentalHealth",
        stress: "stress",
        "suicidal-behavior": "suicidalBehavior",
        "youngster-issues": "youngsterIssues",
      };

      const conditionKeyMap: { [key: string]: string } = {
        "anger-management": "scanIntro.angerManagement.title",
        stress: "scanIntro.stress.title",
        addictions: "scanIntro.addictions.title",
        "general-physical-fitness": "scanIntro.generalPhysicalFitness.title",
        "suicidal-behavior": "scanIntro.suicidalBehaviour.title",
        "common-psychological-issues":
          "scanIntro.commonPsychologicalIssues.title",
        "environment-issues":
          "scanIntro.environmentIssuesAffectingMentalWellbeing.title",
        "family-relationship": "scanIntro.familyAndRelationship.title",
        "financial-mental-health": "scanIntro.financialMentalHealth.title",
        "internet-dependence": "scanIntro.internetDependence.title",
        "internet-social-media": "scanIntro.internetAndSocialMediaIssue.title",
        "professional-mental-health":
          "scanIntro.professionalMentalHealth.title",
        "sex-life": "scanIntro.sexLife.title",
        sleep: "scanIntro.sleep.title",
        "social-mental-health": "scanIntro.socialMentalHealth.title",
        "youngster-issues": "scanIntro.youngsterIssues.title",
      };

      const translationKey = translationKeyMap[condition];
      const currentYogaIndex = yogaInterventions.findIndex(
        (y) => y === selectedYoga,
      );
      
      // Store translation keys for dynamic lookup
      const originalTitleKey = translationKey
        ? `yogaInterventions.${translationKey}.${currentYogaIndex}.title`
        : undefined;
      const originalSubtitleKey = "yogaScreen.task.subtitleFrom";
      const originalDescriptionKey = translationKey
        ? `yogaInterventions.${translationKey}.${currentYogaIndex}.description`
        : undefined;
      const conditionDisplayKey = conditionKeyMap[condition];
      
      // Create translation objects for all languages - proper implementation
      const getTitleForLanguage = (lang: "en" | "hi" | "mr"): string => {
        if (originalTitleKey) {
          try {
            // Force language-specific translation
            const oldLocale = i18n.locale;
            i18n.locale = lang;
            const translatedTitle = t(originalTitleKey);
            i18n.locale = oldLocale; // Restore original locale
            return translatedTitle !== originalTitleKey
              ? translatedTitle
              : getLocalizedYogaText(selectedYoga, "title");
          } catch {
            return getLocalizedYogaText(selectedYoga, "title"); // Fallback to original
          }
        }
        return getLocalizedYogaText(selectedYoga, "title");
      };

      const titleTranslations = {
        en: getTitleForLanguage("en"),
        hi: getTitleForLanguage("hi"),
        mr: getTitleForLanguage("mr"),
      };
      
      // For subtitle, get the condition name in each language
      const getConditionNameForLanguage = (
        lang: "en" | "hi" | "mr",
      ): string => {
        if (conditionDisplayKey) {
          try {
            // Force language-specific translation
            const oldLocale = i18n.locale;
            i18n.locale = lang;
            const translatedCondition = t(conditionDisplayKey);
            i18n.locale = oldLocale; // Restore original locale
            return translatedCondition !== conditionDisplayKey
              ? translatedCondition
              : conditionName;
          } catch {
            return conditionName; // Fallback to original
          }
        }
        return conditionName;
      };

      const subtitleTranslations = {
        en: t("yogaScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("en"),
        }),
        hi: t("yogaScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("hi"),
        }),
        mr: t("yogaScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("mr"),
        }),
      };

      // Create description translations if we have an original description key
      const getDescriptionForLanguage = (lang: "en" | "hi" | "mr"): string => {
        if (originalDescriptionKey) {
          try {
            // Force language-specific translation
            const oldLocale = i18n.locale;
            i18n.locale = lang;
            const translatedDescription = t(originalDescriptionKey);
            i18n.locale = oldLocale; // Restore original locale
            return translatedDescription !== originalDescriptionKey
              ? translatedDescription
              : getLocalizedYogaText(selectedYoga, "description");
          } catch {
            return getLocalizedYogaText(selectedYoga, "description"); // Fallback to original
          }
        }
        return getLocalizedYogaText(selectedYoga, "description");
      };

      const descriptionTranslations = {
        en: getDescriptionForLanguage("en"),
        hi: getDescriptionForLanguage("hi"),
        mr: getDescriptionForLanguage("mr"),
      };

      const newIntervention: SavedIntervention = {
        id: Date.now().toString(),
        title: getLocalizedYogaText(selectedYoga, "title"),
        subtitle: t("yogaScreen.task.subtitleFrom", { conditionName }),
        // Store translation data for dynamic language switching
        titleTranslations,
        subtitleTranslations,
        descriptionTranslations,
        originalTitleKey,
        originalSubtitleKey,
        originalDescriptionKey,
        conditionKey: conditionDisplayKey,
        tags: [
          condition.replace(/\s+/g, "-").toLowerCase(),
          "yoga",
          "meditation",
        ],
        xp: selectedYoga.xp || selectedYoga["xp"] || 5,
        date: new Date().toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
        isSelected: false,
        isCompleted: false,
        fullDescription: getLocalizedYogaText(selectedYoga, "description"),
        condition: conditionName,
        interventionType: t("yogaScreen.task.interventionType"),
      };
      
      // Load existing interventions for this tab
      const storageKey = `interventions_${tab}`;
      let existingInterventions: SavedIntervention[] = [];
      
      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (stored && stored !== "null") {
          const parsedData = JSON.parse(stored);
          if (Array.isArray(parsedData)) {
            existingInterventions = parsedData;
          }
        }
      } catch (error) {
        console.error("Error loading existing interventions:", error);
      }
      
      // Add the new intervention
      const updatedInterventions = [...existingInterventions, newIntervention];
      
      // Save back to AsyncStorage
      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify(updatedInterventions),
      );
      
      setTimeout(() => {
        Alert.alert(
          t("yogaScreen.success.title"),
          t("yogaScreen.success.message", {
            yogaTitle: getLocalizedYogaText(selectedYoga, "title"),
            frequency: frequency.toLowerCase(),
          }),
          [{ text: t("yogaScreen.success.ok") }],
        );
      }, 300);
    } catch (error) {
      console.error("Error saving yoga intervention:", error);
      setTimeout(() => {
        Alert.alert(
          t("yogaScreen.error.title"),
          t("yogaScreen.error.failedToSave"),
        );
      }, 300);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={styles.loadingText}>{t("yogaScreen.loading")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>{t("yogaScreen.header.title")}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Condition Title */}
        <Text style={styles.conditionTitle}>{conditionName}</Text>
        <Text style={styles.subtitle}>{t("yogaScreen.subtitle")}</Text>
        
        {/* Yoga Interventions List */}
        <View style={styles.yogaContainer}>
          {yogaInterventions.map((yoga, index) => (
            <View key={index} style={styles.yogaCard}>
              {/* XP Badge */}
              <View style={styles.xpBadge}>
                <Ionicons name="flower-outline" size={12} color="#FFFFFF" />
                <Text style={styles.xpText}>
                  {yoga.xp || yoga["xp"] || 5} XP
                </Text>
              </View>
              
              <Text style={styles.yogaTitle}>
                {getLocalizedYogaText(yoga, "title")}
              </Text>
              <Text style={styles.yogaDescription}>
                {getLocalizedYogaText(yoga, "description")}
              </Text>
              <Pressable
                style={styles.addButton}
                onPress={() => handleAddToTaskList(yoga)}
              >
                <Text style={styles.addButtonText}>
                  {t("yogaScreen.addToPractice")}
                </Text>
                <Ionicons name="add-circle" size={20} color="#10B981" />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Custom Task Frequency Modal */}
      <Modal
        visible={showTaskModal}
        transparent={true}
        animationType="none"
        onRequestClose={hideModal}
        statusBarTranslucent={true}
      >
        <Animated.View
          style={[
            styles.modalOverlay,
            {
              opacity: modalAnimation,
            },
          ]}
        >
          <Pressable style={styles.modalOverlayTouchable} onPress={hideModal}>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [
                    {
                      scale: modalAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      }),
                    },
                    {
                      translateY: modalAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                  opacity: modalAnimation,
                },
              ]}
            >
              <Pressable onPress={() => {}} style={styles.modalContent}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {t("yogaScreen.modal.title")}
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    {t("yogaScreen.modal.subtitle")}
                  </Text>
                </View>

                {/* Task Frequency Options */}
                <View style={styles.frequencyOptions}>
                  {[
                    {
                      key: "Daily",
                      icon: "sunny-outline",
                      color: "#10B981",
                      description: t("yogaScreen.frequency.daily"),
                    },
                    {
                      key: "Weekly",
                      icon: "calendar-outline",
                      color: "#3B82F6",
                      description: t("yogaScreen.frequency.weekly"),
                    },
                    {
                      key: "Bi-Weekly",
                      icon: "calendar-number-outline",
                      color: "#8B5CF6",
                      description: t("yogaScreen.frequency.biWeekly"),
                    },
                    {
                      key: "Monthly",
                      icon: "calendar-clear-outline",
                      color: "#F59E0B",
                      description: t("yogaScreen.frequency.monthly"),
                    },
                  ].map((option, index) => (
                    <Pressable
                      key={option.key}
                      style={({ pressed }) => [
                        styles.frequencyOption,
                        { borderColor: option.color },
                        pressed && {
                          backgroundColor: option.color + "10",
                          transform: [{ scale: 0.98 }],
                        },
                      ]}
                      onPress={() => handleTaskFrequencySelect(option.key)}
                    >
                      <View
                        style={[
                          styles.frequencyIconContainer,
                          { backgroundColor: option.color },
                        ]}
                      >
                        <Ionicons
                          name={option.icon as any}
                          size={24}
                          color="#FFFFFF"
                        />
                      </View>
                      <View style={styles.frequencyTextContainer}>
                        <Text style={styles.frequencyText}>
                          {option.key} Practice
                        </Text>
                        <Text style={styles.frequencyDescription}>
                          {option.description}
                        </Text>
                      </View>
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#9CA3AF"
                      />
                    </Pressable>
                  ))}
                </View>

                {/* Cancel Button */}
                <Pressable
                  style={({ pressed }) => [
                    styles.cancelButton,
                    pressed && {
                      backgroundColor: "#E5E7EB",
                      transform: [{ scale: 0.98 }],
                    },
                  ]}
                  onPress={hideModal}
                >
                  <Text style={styles.cancelButtonText}>
                    {t("yogaScreen.modal.cancel")}
                  </Text>
                </Pressable>
              </Pressable>
            </Animated.View>
          </Pressable>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6b7280",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  conditionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  yogaContainer: {
    paddingBottom: 30,
  },
  yogaCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },
  xpBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#10B981",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  xpText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 4,
  },
  yogaTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
    lineHeight: 24,
    marginRight: 80, // Add margin to prevent overlap with XP badge
  },
  yogaDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#10B981",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#10B981",
    marginRight: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlayTouchable: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  frequencyOptions: {
    marginBottom: 20,
  },
  frequencyOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  frequencyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  frequencyTextContainer: {
    flex: 1,
  },
  frequencyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  frequencyDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 18,
  },
  cancelButton: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
});
