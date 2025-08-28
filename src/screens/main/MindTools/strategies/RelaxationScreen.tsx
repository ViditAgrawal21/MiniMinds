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
import CustomIcon from "../../../../components/CustomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t, getCurrentLanguage } from "../../../../i18n/locales";

interface RelaxationIntervention {
  // Format from translation files (relaxationInterventions section)
  title: string;
  description: string;
  xp: number;
  
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

interface RelaxationData {
  condition: string;
  intervention_type: string;
  interventions: RelaxationIntervention[];
}

export default function RelaxationScreen({ navigation, route }: any) {
  const [relaxationInterventions, setRelaxationInterventions] = useState<
    RelaxationIntervention[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [conditionName, setConditionName] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedRelaxation, setSelectedRelaxation] =
    useState<RelaxationIntervention | null>(null);
  const [modalAnimation] = useState(new Animated.Value(0));
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  
  const { condition } = route.params || {};

    // Language change detection with improved triggering (unified with InterventionsScreen)
  useEffect(() => {
    const currentLocale = getCurrentLanguage();
    if (currentLanguage !== currentLocale) {
      console.log(
        `Language changed from ${currentLanguage} to ${currentLocale}`,
      );
      setCurrentLanguage(currentLocale);
      loadRelaxationInterventions(); // Reload interventions when language changes
    }
  }, [currentLanguage, condition]);

  // Additional effect to watch for external language changes
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentLocale = getCurrentLanguage();
      if (currentLanguage !== currentLocale) {
        setCurrentLanguage(currentLocale);
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, [currentLanguage, condition]);

  // Comprehensive translation mapping for common relaxation intervention terms
  const relaxationTranslations = {
    // Common relaxation titles
    "Mindful Breathing (Pranayama)": {
      en: "Mindful Breathing (Pranayama)",
      hi: "सचेत श्वास (प्राणायाम)",
      mr: "सजग श्वास (प्राणायाम)",
    },
    "Yoga Poses (Asanas)": {
      en: "Yoga Poses (Asanas)",
      hi: "योग आसन (आसन)",
      mr: "योग पोझ (आसन)",
    },
    "Mindfulness Meditation": {
      en: "Mindfulness Meditation",
      hi: "सचेतन ध्यान",
      mr: "सजग ध्यान",
    },
    "Progressive Muscle Relaxation": {
      en: "Progressive Muscle Relaxation",
      hi: "प्रगतिशील मांसपेशी आराम",
      mr: "प्रगतिशील स्नायू विश्रांती",
    },
    "Deep Breathing Exercise": {
      en: "Deep Breathing Exercise",
      hi: "गहरी सांस का अभ्यास",
      mr: "खोल श्वास व्यायाम",
    },
    "Deep Breathing (Pranayama)": {
      en: "Deep Breathing (Pranayama)",
      hi: "गहरी सांस (प्राणायाम)",
      mr: "खोल श्वास (प्राणायाम)",
    },
    "Breathing Exercise (Pranayama)": {
      en: "Breathing Exercise (Pranayama)",
      hi: "सांस का अभ्यास (प्राणायाम)",
      mr: "श्वास व्यायाम (प्राणायाम)",
    },
    "Body Scan Meditation": {
      en: "Body Scan Meditation",
      hi: "शरीर स्कैन ध्यान",
      mr: "शरीर स्कॅन ध्यान",
    },
    "Loving-Kindness Meditation": {
      en: "Loving-Kindness Meditation",
      hi: "मैत्री भावना ध्यान",
      mr: "प्रेमळ दयाळू ध्यान",
    },
    "Visualization Technique": {
      en: "Visualization Technique",
      hi: "दृश्यीकरण तकनीक",
      mr: "दृश्यीकरण तंत्र",
    },
    "Guided Relaxation": {
      en: "Guided Relaxation",
      hi: "निर्देशित आराम",
      mr: "मार्गदर्शित विश्रांती",
    },
    "Nature Sound Therapy": {
      en: "Nature Sound Therapy",
      hi: "प्राकृतिक ध्वनि चिकित्सा",
      mr: "निसर्ग आवाज थेरपी",
    },
    Aromatherapy: {
      en: "Aromatherapy",
      hi: "अरोमाथेरेपी",
      mr: "सुगंध चिकित्सा",
    },
    "Gentle Stretching": {
      en: "Gentle Stretching",
      hi: "सौम्य खिंचाव",
      mr: "मंद स्ट्रेचिंग",
    },
    
    // Common interventions that might appear in relaxation
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
    
    // Common phrases that might appear in relaxation descriptions
    "Practice deep breathing": {
      en: "Practice deep breathing",
      hi: "गहरी सांस लें",
      mr: "खोल श्वास घ्या",
    },
    "Focus on your breathing": {
      en: "Focus on your breathing",
      hi: "अपनी सांसों पर ध्यान दें",
      mr: "तुमच्या श्वासावर लक्ष केंद्रित करा",
    },
    "Practice relaxation techniques": {
      en: "Practice relaxation techniques",
      hi: "आराम की तकनीक अभ्यास करें",
      mr: "विश्रांति तंत्र सराव करा",
    },
    "Take time for yourself": {
      en: "Take time for yourself",
      hi: "अपने लिए समय निकालें",
      mr: "स्वतःसाठी वेळ काढा",
    },
    "Practice mindful awareness": {
      en: "Practice mindful awareness",
      hi: "सचेत जागरूकता का अभ्यास करें",
      mr: "सजग जागरूकतेचा सराव करा",
    },
    
    // Common relaxation terms
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
      mr: "विश्रांती",
    },
    mindfulness: {
      en: "mindfulness",
      hi: "सचेतना",
      mr: "सचेतता",
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
    visualization: {
      en: "visualization",
      hi: "दृश्यीकरण",
      mr: "दृश्यीकरण",
    },
    therapy: {
      en: "therapy",
      hi: "चिकित्सा",
      mr: "चिकित्सा",
    },
    technique: {
      en: "technique",
      hi: "तकनीक",
      mr: "तंत्र",
    },
    practice: {
      en: "practice",
      hi: "अभ्यास",
      mr: "सराव",
    },
    exercise: {
      en: "exercise",
      hi: "व्यायाम",
      mr: "व्यायाम",
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
      setSelectedRelaxation(null);
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

  // Get relaxation data from translation files instead of static JSON files
  const getRelaxationData = (condition: string): RelaxationData | null => {
    // Map URL-style condition names to camelCase keys used in translation files
    const conditionKeyMap: { [key: string]: string } = {
      "anger-management": "angerManagement",
      stress: "stress",
      addictions: "addictions",
      "general-physical-fitness": "generalPhysicalFitness",
      "suicidal-behavior": "suicidalBehavior",
      "common-psychological-issues": "commonPsychologicalIssues",
      "family-relationship": "familyRelationship",
      "internet-dependence": "internetDependence",
      "environment-issues": "environmentIssues",
      "financial-mental-health": "financialMentalHealth",
      "internet-social-media": "internetAndSocialMediaIssue",
      "professional-mental-health": "professionalMentalHealth",
      "sex-life": "sexLife",
      sleep: "sleep",
      "social-mental-health": "socialMentalHealth",
      "youngster-issues": "youngsterIssues",
    };
    
    const translationKey = conditionKeyMap[condition];
    if (!translationKey) {
      console.error(`No translation key found for condition: ${condition}`);
      return null;
    }
    
    // Get the interventions from the translation file
    const interventions = t(`relaxationInterventions.${translationKey}`, {
      returnObjects: true,
    });
    
    if (!Array.isArray(interventions)) {
      console.error(`No relaxation interventions found for: ${translationKey}`);
      return null;
    }
    
    return {
      condition: translationKey,
      intervention_type: "Relaxation",
      interventions: interventions as RelaxationIntervention[],
    };
  };

  const loadRelaxationInterventions = useCallback(async () => {
    try {
      setLoading(true);
      
      if (!condition) {
        console.error("No condition parameter provided");
        return;
      }

      const data = getRelaxationData(condition);
      
      if (!data) {
        console.error(`No relaxation data found for condition: ${condition}`);
        Alert.alert(
          t("relaxationScreen.error.title"),
          t("relaxationScreen.error.noRelaxationData"),
          [
            {
              text: t("relaxationScreen.error.ok"),
              onPress: () => navigation.goBack(),
            },
          ],
        );
        return;
      }
      
      setRelaxationInterventions(data.interventions || []);
      setConditionName(getConditionDisplayName(condition));
    } catch (error) {
      console.error("Error loading relaxation interventions:", error);
      Alert.alert(
        t("relaxationScreen.error.title"),
        t("relaxationScreen.error.failedToLoad"),
        [
          {
            text: t("relaxationScreen.error.ok"),
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } finally {
      setLoading(false);
    }
  }, [condition, navigation]);

  useEffect(() => {
    loadRelaxationInterventions();
  }, [loadRelaxationInterventions]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToTaskList = (relaxation: RelaxationIntervention) => {
    setSelectedRelaxation(relaxation);
    showModal();
  };

  const formatDescription = (description: string): string => {
    // Remove markdown formatting for display
    return description
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markers
      .replace(/^\s*-\s*/gm, "• ") // Convert dashes to bullets
      .replace(/'/g, "") // Remove single quotes at start
      .trim();
  };

  const getRelaxationTitle = (relaxation: RelaxationIntervention): string => {
    // Translation files use 'title', legacy files use 'Card Title'
    return (
      relaxation.title ||
      relaxation["Card Title"] ||
      "Untitled Relaxation Technique"
    );
  };

  const getRelaxationDescription = (
    relaxation: RelaxationIntervention,
  ): string => {
    // Translation files use 'description', legacy files use 'Card Description'
    const desc = relaxation.description || relaxation["Card Description"] || "";
    return formatDescription(desc);
  };

  const handleTaskFrequencySelect = async (frequency: string) => {
    if (!selectedRelaxation) return;
    
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
          t("relaxationScreen.error.title"),
          t("relaxationScreen.error.invalidFrequency"),
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
        "internet-social-media": "internetAndSocialMediaIssue",
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
      const currentRelaxationIndex = relaxationInterventions.findIndex(
        (r) => r === selectedRelaxation,
      );
      
      // Store translation keys for dynamic lookup
      const originalTitleKey = translationKey
        ? `relaxationInterventions.${translationKey}.${currentRelaxationIndex}.title`
        : undefined;
      const originalSubtitleKey = "relaxationScreen.task.subtitleFrom";
      const originalDescriptionKey = translationKey
        ? `relaxationInterventions.${translationKey}.${currentRelaxationIndex}.description`
        : undefined;
      const conditionDisplayKey = conditionKeyMap[condition];
      
      // Create translation objects for all languages - simplified implementation
      const getTitleForLanguage = (lang: "en" | "hi" | "mr"): string => {
        if (originalTitleKey) {
          try {
            const translatedTitle = t(originalTitleKey);
            return translatedTitle !== originalTitleKey
              ? translatedTitle
              : getRelaxationTitle(selectedRelaxation);
          } catch {
            return getRelaxationTitle(selectedRelaxation); // Fallback to original
          }
        }
        return getRelaxationTitle(selectedRelaxation);
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
            const translatedCondition = t(conditionDisplayKey);
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
        en: t("relaxationScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("en"),
        }),
        hi: t("relaxationScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("hi"),
        }),
        mr: t("relaxationScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("mr"),
        }),
      };

      // Create description translations if we have an original description key
      const getDescriptionForLanguage = (lang: "en" | "hi" | "mr"): string => {
        if (originalDescriptionKey) {
          try {
            const translatedDescription = t(originalDescriptionKey);
            return translatedDescription !== originalDescriptionKey
              ? translatedDescription
              : getRelaxationDescription(selectedRelaxation);
          } catch {
            return getRelaxationDescription(selectedRelaxation); // Fallback to original
          }
        }
        return getRelaxationDescription(selectedRelaxation);
      };

      const descriptionTranslations = {
        en: getDescriptionForLanguage("en"),
        hi: getDescriptionForLanguage("hi"),
        mr: getDescriptionForLanguage("mr"),
      };

      const newIntervention: SavedIntervention = {
        id: Date.now().toString(),
        title: getRelaxationTitle(selectedRelaxation),
        subtitle: t("relaxationScreen.task.subtitleFrom", { conditionName }),
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
          "relaxation",
          "mindfulness",
        ],
        xp: selectedRelaxation.xp,
        date: new Date().toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
        isSelected: false,
        isCompleted: false,
        fullDescription: getRelaxationDescription(selectedRelaxation),
        condition: conditionName,
        interventionType: t("relaxationScreen.task.interventionType"),
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
          t("relaxationScreen.success.title"),
          t("relaxationScreen.success.message", {
            relaxationTitle: getRelaxationTitle(selectedRelaxation),
            frequency: frequency.toLowerCase(),
          }),
          [{ text: t("relaxationScreen.success.ok") }],
        );
      }, 300);
    } catch (error) {
      console.error("Error saving relaxation intervention:", error);
      setTimeout(() => {
        Alert.alert(
          t("relaxationScreen.error.title"),
          t("relaxationScreen.error.failedToSave"),
        );
      }, 300);
    }
  };

  // Enhanced helper function to get localized relaxation text with dynamic translation support
  const getLocalizedRelaxationText = (
    relaxation: RelaxationIntervention,
    field: "title" | "description",
  ): string => {
    const currentLocale = getCurrentLanguage() as "en" | "hi" | "mr";
    const originalText =
      field === "title"
        ? getRelaxationTitle(relaxation)
        : getRelaxationDescription(relaxation);
    
    // First, try dynamic translation if we have stored keys (for saved interventions that have this data)
    const relaxationIndex = relaxationInterventions.findIndex(
      (r) => r === relaxation,
    );
    const translationKeyMap: { [key: string]: string } = {
      "anger-management": "angerManagement",
      addictions: "addictions",
      "common-psychological-issues": "commonPsychologicalIssues",
      "environment-issues": "environmentIssues",
      "family-relationship": "familyRelationship",
      "financial-mental-health": "financialMentalHealth",
      "general-physical-fitness": "generalPhysicalFitness",
      "internet-dependence": "internetDependence",
      "internet-social-media": "internetAndSocialMediaIssue",
      "professional-mental-health": "professionalMentalHealth",
      "sex-life": "sexLife",
      sleep: "sleep",
      "social-mental-health": "socialMentalHealth",
      stress: "stress",
      "suicidal-behavior": "suicidalBehavior",
      "youngster-issues": "youngsterIssues",
    };
    
    const translationKey = translationKeyMap[condition];
    if (translationKey && relaxationIndex >= 0) {
      try {
        const dynamicKey = `relaxationInterventions.${translationKey}.${relaxationIndex}.${field}`;
        const dynamicTranslation = t(dynamicKey);
        console.log(
          `Relaxation ${field} translation attempt: key="${dynamicKey}", locale="${currentLocale}", result="${dynamicTranslation}"`,
        );
        if (dynamicTranslation && dynamicTranslation !== dynamicKey) {
          return formatDescription(dynamicTranslation);
        }
      } catch (error) {
        console.log(
          `Error with dynamic relaxation ${field} translation:`,
          error,
        );
      }
    }
    
    // Second, try to get from common translations mapping (exact match)
    const commonTranslation =
      relaxationTranslations[
        originalText as keyof typeof relaxationTranslations
      ];
    if (commonTranslation) {
      const translated = commonTranslation[currentLocale] || originalText;
      return field === "description"
        ? formatDescription(translated)
        : translated;
    }
    
    // Try case-insensitive exact match
    const lowerCaseText = originalText.toLowerCase();
    const caseInsensitiveMatch = Object.keys(relaxationTranslations).find(
      (key) => key.toLowerCase() === lowerCaseText,
    );
    if (caseInsensitiveMatch) {
      const translation =
        relaxationTranslations[
          caseInsensitiveMatch as keyof typeof relaxationTranslations
        ];
      const translated = translation[currentLocale] || originalText;
      return field === "description"
        ? formatDescription(translated)
        : translated;
    }
    
    // For partial matching, be conservative - only match if the text contains common terms
    for (const [key, translation] of Object.entries(relaxationTranslations)) {
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
        relaxationTranslations[
          trimmedText.toLowerCase() as keyof typeof relaxationTranslations
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={styles.loadingText}>{t("relaxationScreen.loading")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>
          {t("relaxationScreen.header.title")}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Condition Title */}
        <Text style={styles.conditionTitle}>{conditionName}</Text>
        <Text style={styles.subtitle}>{t("relaxationScreen.subtitle")}</Text>
        
        {/* Relaxation Interventions List */}
        <View style={styles.relaxationContainer}>
          {relaxationInterventions.map((relaxation, index) => (
            <View key={index} style={styles.relaxationCard}>
              {/* XP Badge */}
              <View style={styles.xpBadge}>
                <CustomIcon type="IO" name="leaf-outline" size={12} color="#FFFFFF" />
                <Text style={styles.xpText}>{relaxation.xp} XP</Text>
              </View>
              
              <Text style={styles.relaxationTitle}>
                {getLocalizedRelaxationText(relaxation, "title")}
              </Text>
              <Text style={styles.relaxationDescription}>
                {getLocalizedRelaxationText(relaxation, "description")}
              </Text>
              <Pressable
                style={styles.addButton}
                onPress={() => handleAddToTaskList(relaxation)}
              >
                <Text style={styles.addButtonText}>
                  {t("relaxationScreen.addToRoutine")}
                </Text>
                <CustomIcon type="IO" name="add-circle" size={20} color="#6366F1" />
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
                    {t("relaxationScreen.modal.title")}
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    {t("relaxationScreen.modal.subtitle")}
                  </Text>
                </View>

                {/* Task Frequency Options */}
                <View style={styles.frequencyOptions}>
                  {[
                    {
                      key: "Daily",
                      icon: "moon-outline",
                      color: "#6366F1",
                      description: t("relaxationScreen.frequency.daily"),
                    },
                    {
                      key: "Weekly",
                      icon: "calendar-outline",
                      color: "#8B5CF6",
                      description: t("relaxationScreen.frequency.weekly"),
                    },
                    {
                      key: "Bi-Weekly",
                      icon: "calendar-number-outline",
                      color: "#A855F7",
                      description: t("relaxationScreen.frequency.biWeekly"),
                    },
                    {
                      key: "Monthly",
                      icon: "calendar-clear-outline",
                      color: "#EC4899",
                      description: t("relaxationScreen.frequency.monthly"),
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
                        <CustomIcon type="IO"
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
                      <CustomIcon type="IO"
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
                    {t("relaxationScreen.modal.cancel")}
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
  relaxationContainer: {
    paddingBottom: 30,
  },
  relaxationCard: {
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
    borderLeftColor: "#6366F1",
  },
  xpBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#6366F1",
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
  relaxationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
    lineHeight: 24,
    marginRight: 80, // Add margin to prevent overlap with XP badge
  },
  relaxationDescription: {
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
    borderColor: "#6366F1",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6366F1",
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
