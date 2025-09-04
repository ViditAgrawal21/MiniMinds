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
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguage } from "../../../../context/LanguageContext";
import { getPremiumStatus } from "../../../../utils/premiumUtils";

interface REBTIntervention {
  // Format from translation files (rebtInterventions section)
  title: string;
  description: string;
  xp: number;
  
  // Legacy format from static JSON files (keeping for backward compatibility)
  "Issue Name"?: string;
  "Intervention Sub Type"?: string;
  Title?: string;
  Description?: string;
  XP?: number;
  "Journal Template"?: string;
  extracted_value?: string;
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

interface REBTData {
  condition: string;
  intervention_type: string;
  interventions: REBTIntervention[];
}

export default function REBTScreen({ navigation, route }: any) {
  const { locale, t } = useLanguage(); // Use language context
  const [rebtInterventions, setRebtInterventions] = useState<
    REBTIntervention[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [conditionName, setConditionName] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedREBT, setSelectedREBT] = useState<REBTIntervention | null>(
    null,
  );
  const [modalAnimation] = useState(new Animated.Value(0));
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  
  const { condition } = route.params || {};

  // Language change detection - update condition name when language changes
  useEffect(() => {
    setConditionName(getConditionDisplayName(condition));
  }, [locale, condition]);

  // Comprehensive translation mapping for common REBT intervention terms
  const rebtTranslations = {
    // Common REBT titles
    "Rational Disputing": {
      en: "Rational Disputing",
      hi: "तर्कसंगत खंडन",
      mr: "तर्कसंगत खंडन",
    },
    "ABC Model": {
      en: "ABC Model",
      hi: "ABC मॉडल",
      mr: "ABC मॉडेल",
    },
    "Cognitive Restructuring": {
      en: "Cognitive Restructuring",
      hi: "संज्ञानात्मक पुनर्गठन",
      mr: "संज्ञानात्मक पुनर्रचना",
    },
    "Rational Self-Talk": {
      en: "Rational Self-Talk",
      hi: "तर्कसंगत आत्म-चर्चा",
      mr: "तर्कसंगत स्व-संभाषण",
    },
    "Disputing Irrational Beliefs": {
      en: "Disputing Irrational Beliefs",
      hi: "अतार्किक मान्यताओं का खंडन",
      mr: "अतार्किक समजुतींचा खंडन",
    },
    "Rational Emotive Imagery": {
      en: "Rational Emotive Imagery",
      hi: "तर्कसंगत भावनात्मक कल्पना",
      mr: "तर्कसंगत भावनिक कल्पना",
    },
    "Shame Attacking Exercise": {
      en: "Shame Attacking Exercise",
      hi: "शर्म पर आक्रमण अभ्यास",
      mr: "लाज आक्रमण व्यायाम",
    },
    "Rational Coping Statements": {
      en: "Rational Coping Statements",
      hi: "तर्कसंगत मुकाबला कथन",
      mr: "तर्कसंगत सामना वक्तव्य",
    },
    "Bibliotherapy": {
      en: "Bibliotherapy",
      hi: "पुस्तक चिकित्सा",
      mr: "पुस्तक चिकित्सा",
    },
    "Homework Assignments": {
      en: "Homework Assignments",
      hi: "होमवर्क असाइनमेंट",
      mr: "गृहकार्य नियुक्ती",
    },
    "Risk-Taking Exercises": {
      en: "Risk-Taking Exercises",
      hi: "जोखिम लेने के अभ्यास",
      mr: "जोखीम घेण्याचे व्यायाम",
    },
    "Anti-Musturbation": {
      en: "Anti-Musturbation",
      hi: "विरोधी मस्तुर्बेशन",
      mr: "विरोधी मस्तुर्बेशन",
    },
    
    // Common REBT terms
    rational: {
      en: "rational",
      hi: "तर्कसंगत",
      mr: "तर्कसंगत",
    },
    irrational: {
      en: "irrational",
      hi: "अतार्किक",
      mr: "अतार्किक",
    },
    beliefs: {
      en: "beliefs",
      hi: "मान्यताएं",
      mr: "समजुती",
    },
    disputing: {
      en: "disputing",
      hi: "खंडन",
      mr: "खंडन",
    },
    emotive: {
      en: "emotive",
      hi: "भावनात्मक",
      mr: "भावनिक",
    },
    behavior: {
      en: "behavior",
      hi: "व्यवहार",
      mr: "वर्तन",
    },
    thoughts: {
      en: "thoughts",
      hi: "विचार",
      mr: "विचार",
    },
    feelings: {
      en: "feelings",
      hi: "भावनाएं",
      mr: "भावना",
    },
    consequences: {
      en: "consequences",
      hi: "परिणाम",
      mr: "परिणाम",
    },
    activating: {
      en: "activating",
      hi: "सक्रिय करने वाला",
      mr: "सक्रिय करणारा",
    },
    event: {
      en: "event",
      hi: "घटना",
      mr: "घटना",
    },
    exercise: {
      en: "exercise",
      hi: "अभ्यास",
      mr: "व्यायाम",
    },
    technique: {
      en: "technique",
      hi: "तकनीक",
      mr: "तंत्र",
    },
    therapy: {
      en: "therapy",
      hi: "चिकित्सा",
      mr: "चिकित्सा",
    },
    practice: {
      en: "practice",
      hi: "अभ्यास",
      mr: "सराव",
    },
    
    // Common phrases that might appear in REBT descriptions
    "Challenge irrational beliefs": {
      en: "Challenge irrational beliefs",
      hi: "अतार्किक मान्यताओं को चुनौती दें",
      mr: "अतार्किक समजुतींना आव्हान द्या",
    },
    "Dispute negative thoughts": {
      en: "Dispute negative thoughts",
      hi: "नकारात्मक विचारों का खंडन करें",
      mr: "नकारात्मक विचारांचा खंडन करा",
    },
    "Practice rational thinking": {
      en: "Practice rational thinking",
      hi: "तर्कसंगत सोच का अभ्यास करें",
      mr: "तर्कसंगत विचारांचा सराव करा",
    },
    "Identify the ABC": {
      en: "Identify the ABC",
      hi: "ABC की पहचान करें",
      mr: "ABC ओळखा",
    },
    "Change your belief system": {
      en: "Change your belief system",
      hi: "अपनी मान्यता प्रणाली बदलें",
      mr: "तुमची समजूत प्रणाली बदला",
    },
    "Replace with rational thoughts": {
      en: "Replace with rational thoughts",
      hi: "तर्कसंगत विचारों से बदलें",
      mr: "तर्कसंगत विचारांनी बदला",
    },
    "Practice daily": {
      en: "Practice daily",
      hi: "दैनिक अभ्यास करें",
      mr: "रोज सराव करा",
    },
    "Work on homework": {
      en: "Work on homework",
      hi: "होमवर्क पर काम करें",
      mr: "गृहकार्यावर काम करा",
    },
  };

  // Helper function to format description text
  const formatDescription = (description: string): string => {
    // Remove markdown formatting and simplify for display
    return description
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/^\s*-\s*/gm, "• ")
      .replace(/'/g, "")
      .trim();
  };

  // Enhanced helper function to get localized REBT text with dynamic translation support
  const getLocalizedREBTText = (
    rebt: REBTIntervention,
    field: "title" | "description",
  ): string => {
    const currentLocale = locale as "en" | "hi" | "mr";
    const originalText =
      field === "title" ? getREBTTitle(rebt) : getREBTDescription(rebt);
    
    // First, try to get from common translations mapping (exact match only)
    const commonTranslation =
      rebtTranslations[originalText as keyof typeof rebtTranslations];
    if (commonTranslation) {
      return commonTranslation[currentLocale];
    }
    
    // Try case-insensitive exact match
    const lowerCaseText = originalText.toLowerCase();
    const caseInsensitiveMatch = Object.keys(rebtTranslations).find(
      (key) => key.toLowerCase() === lowerCaseText,
    );
    if (caseInsensitiveMatch) {
      const translation =
        rebtTranslations[caseInsensitiveMatch as keyof typeof rebtTranslations];
      return translation[currentLocale];
    }
    
    // For longer descriptions, try to translate individual words and phrases
    if (field === "description" && originalText.length > 50) {
      let translatedText = originalText;
      
      // Try to translate common phrases within the description
      Object.entries(rebtTranslations).forEach(([englishText, translations]) => {
        if (originalText.includes(englishText)) {
          translatedText = translatedText.replace(
            new RegExp(englishText, "gi"),
            translations[currentLocale],
          );
        }
      });
      
      // If we made any translations, return the processed text
      if (translatedText !== originalText) {
        return translatedText;
      }
    }
    
    // Simplified word translation - only for single words that are common terms
    const trimmedText = originalText.trim();
    if (!trimmedText.includes(" ") && trimmedText.length > 3) {
      const lowerCaseWord = trimmedText.toLowerCase();
      const wordMatch = Object.keys(rebtTranslations).find(
        (key) => key.toLowerCase() === lowerCaseWord,
      );
      if (wordMatch) {
        const translation =
          rebtTranslations[wordMatch as keyof typeof rebtTranslations];
        return translation[currentLocale];
      }
    }
    
    // Finally, fall back to original text (apply formatting for descriptions)
    return field === "description"
      ? formatDescription(originalText)
      : originalText;
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
      setSelectedREBT(null);
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
      "job-insecurity": "scanIntro.jobInsecurity.title",
    };
    const translationKey = conditionKeyMap[condition];
    return translationKey ? t(translationKey) : condition;
  };

  const loadREBTInterventions = useCallback(async () => {
    // Get REBT data from translation files instead of static JSON files
    const getREBTData = (condition: string): REBTData | null => {
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
        "internet-social-media": "internetSocialMedia",
        "professional-mental-health": "professionalMentalHealth",
        "sex-life": "sexLife",
        sleep: "sleep",
        "social-mental-health": "socialMentalHealth",
        "youngster-issues": "youngsterIssues",
        "job-insecurity": "jobInsecurity",
      };
      
      const translationKey = conditionKeyMap[condition];
      if (!translationKey) {
        console.error(`No translation key found for condition: ${condition}`);
        return null;
      }
      
      // Get the interventions from the translation file
      const interventions = t(`rebtInterventions.${translationKey}`, {
        returnObjects: true,
      });
      
      if (!Array.isArray(interventions)) {
        console.error(`No REBT interventions found for: ${translationKey}`);
        return null;
      }
      
      return {
        condition: translationKey,
        intervention_type: "REBT",
        interventions: interventions as REBTIntervention[],
      };
    };

    try {
      setLoading(true);
      
      if (!condition) {
        console.error("No condition parameter provided");
        return;
      }

      const data = getREBTData(condition);
      
      if (!data) {
        console.error(`No REBT data found for condition: ${condition}`);
        Alert.alert(
          t("rebtScreen.error.title"),
          t("rebtScreen.error.noREBTData"),
          [
            {
              text: t("rebtScreen.error.ok"),
              onPress: () => navigation.goBack(),
            },
          ],
        );
        return;
      }
      
      setRebtInterventions(data.interventions || []);
      setConditionName(getConditionDisplayName(condition));
    } catch (error) {
      console.error("Error loading REBT interventions:", error);
      Alert.alert(
        t("rebtScreen.error.title"),
        t("rebtScreen.error.failedToLoad"),
        [
          {
            text: t("rebtScreen.error.ok"),
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } finally {
      setLoading(false);
    }
  }, [condition, navigation]);

  useEffect(() => {
    loadREBTInterventions();
  }, [loadREBTInterventions]);

  // Check premium status when component mounts and when screen is focused
  useFocusEffect(
    useCallback(() => {
      const checkPremiumStatus = async () => {
        try {
          const premiumStatus = await getPremiumStatus();
          setHasPremiumAccess(premiumStatus.isPremium);
        } catch (error) {
          console.error("Error checking premium status:", error);
          setHasPremiumAccess(false);
        }
      };

      checkPremiumStatus();
    }, [])
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToTaskList = (rebt: REBTIntervention) => {
    setSelectedREBT(rebt);
    showModal();
  };

  const getREBTTitle = (rebt: REBTIntervention): string => {
    // Translation files use 'title', legacy files use 'Title'
    return rebt.title || rebt.Title || t("rebtScreen.defaultTitle");
  };

  const getREBTDescription = (rebt: REBTIntervention): string => {
    // Translation files use 'description', legacy files use 'Description'
    const desc = rebt.description || rebt.Description || "";
    return formatDescription(desc);
  };

  const getREBTXP = (rebt: REBTIntervention): number => {
    // Translation files use 'xp', legacy files use 'XP'
    return rebt.xp || rebt.XP || 5;
  };

  const handleTaskFrequencySelect = async (frequency: string) => {
    if (!selectedREBT) return;
    
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
          t("rebtScreen.error.title"),
          t("rebtScreen.error.invalidFrequency"),
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
        "job-insecurity": "jobInsecurity",
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
        "job-insecurity": "scanIntro.jobInsecurity.title",
      };

      const translationKey = translationKeyMap[condition];
      const currentREBTIndex = rebtInterventions.findIndex(
        (r) => r === selectedREBT,
      );
      
      // Store translation keys for dynamic lookup
      const originalTitleKey = translationKey
        ? `rebtInterventions.${translationKey}.${currentREBTIndex}.title`
        : undefined;
      const originalSubtitleKey = "rebtScreen.task.subtitleFrom";
      const originalDescriptionKey = translationKey
        ? `rebtInterventions.${translationKey}.${currentREBTIndex}.description`
        : undefined;
      const conditionDisplayKey = conditionKeyMap[condition];
      
      // Create translation objects for all languages - simplified implementation
      const getTitleForLanguage = (lang: "en" | "hi" | "mr"): string => {
        if (originalTitleKey) {
          try {
            const translatedTitle = t(originalTitleKey);
            return translatedTitle !== originalTitleKey
              ? translatedTitle
              : getLocalizedREBTText(selectedREBT, "title");
          } catch {
            return getLocalizedREBTText(selectedREBT, "title"); // Fallback to original
          }
        }
        return getLocalizedREBTText(selectedREBT, "title");
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
        en: t("rebtScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("en"),
        }),
        hi: t("rebtScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("hi"),
        }),
        mr: t("rebtScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("mr"),
        }),
      };

      // Create description translations if we have an original description key
      const getDescriptionForLanguage = (lang: "en" | "hi" | "mr"): string => {
        if (lang === "en") {
          return getREBTDescription(selectedREBT); // Always use original English text
        }
        // For other languages, use dynamic translation
        return getLocalizedREBTText(selectedREBT, "description");
      };

      const descriptionTranslations = {
        en: getDescriptionForLanguage("en"),
        hi: getDescriptionForLanguage("hi"),
        mr: getDescriptionForLanguage("mr"),
      };

      const newIntervention: SavedIntervention = {
        id: Date.now().toString(),
        title: getLocalizedREBTText(selectedREBT, "title"),
        subtitle: t("rebtScreen.task.subtitleFrom", { conditionName }),
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
          "rebt",
          "rational-therapy",
        ],
        xp: getREBTXP(selectedREBT),
        date: new Date().toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
        isSelected: false,
        isCompleted: false,
        fullDescription: selectedREBT.description || selectedREBT.Description || "", // Save original English description
        condition: conditionName,
        interventionType: "REBT",
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
          t("rebtScreen.success.title"),
          t("rebtScreen.success.message", {
            cbtTitle: getLocalizedREBTText(selectedREBT, "title"),
            frequency: frequency.toLowerCase(),
          }),
          [{ text: t("rebtScreen.success.ok") }],
        );
      }, 300);
    } catch (error) {
      console.error("Error saving REBT intervention:", error);
      setTimeout(() => {
        Alert.alert(
          t("rebtScreen.error.title"),
          t("rebtScreen.error.failedToSave"),
        );
      }, 300);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={styles.loadingText}>{t("rebtScreen.loading")}</Text>
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
        <Text style={styles.headerTitle}>{t("rebtScreen.header.title")}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Condition Title */}
        <Text style={styles.conditionTitle}>{conditionName}</Text>
        <Text style={styles.subtitle}>{t("rebtScreen.subtitle")}</Text>
        
        {/* REBT Interventions List */}
        <View style={styles.rebtContainer}>
          {rebtInterventions.map((rebt, index) => {
            const shouldBlur = index >= 5 && !hasPremiumAccess; // Show first 5 cards normally, blur the rest unless premium
            
            if (shouldBlur) {
              return (
                <View key={index} style={styles.blurWrapper}>
                  <View style={[styles.rebtCard, styles.completelyBlurredCard]}>
                    {/* XP Badge */}
                    <View style={[styles.xpBadge, styles.blurredXpBadge]}>
                      <CustomIcon type="IO" name="flash-outline" size={12} color="#FFFFFF" />
                      <Text style={styles.xpText}>{getREBTXP(rebt)} XP</Text>
                    </View>
                    
                    <Text style={[styles.rebtTitle, styles.blurredText]}>
                      {getLocalizedREBTText(rebt, "title")}
                    </Text>
                    <Text style={[styles.rebtDescription, styles.blurredText]}>
                      {getLocalizedREBTText(rebt, "description")}
                    </Text>
                    <Pressable
                      style={[styles.addButton, styles.completelyDisabledButton]}
                      disabled={true}
                    >
                      <Text style={[styles.addButtonText, styles.completelyDisabledText]}>
                        {t("rebtScreen.addToTherapyPlan")}
                      </Text>
                      <CustomIcon type="IO" name="add-circle" size={20} color="#E5E7EB" />
                    </Pressable>
                  </View>
                </View>
              );
            }
            
            return (
                            <View key={index} style={styles.rebtCard}>
                {/* XP Badge */}
                <View style={styles.xpBadge}>
                  <CustomIcon type="IO" name="flash-outline" size={12} color="#FFFFFF" />
                  <Text style={styles.xpText}>{getREBTXP(rebt)} XP</Text>
                </View>
                
                <Text style={styles.rebtTitle}>{getLocalizedREBTText(rebt, "title")}</Text>
                <Text style={styles.rebtDescription}>
                  {getLocalizedREBTText(rebt, "description")}
                </Text>
                <Pressable
                  style={styles.addButton}
                  onPress={() => handleAddToTaskList(rebt)}
                >
                  <Text style={styles.addButtonText}>
                    {t("rebtScreen.addToTherapyPlan")}
                  </Text>
                  <CustomIcon type="IO" name="add-circle" size={20} color="#7C3AED" />
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Custom Task Frequency Modal */}
      <Modal
        visible={showTaskModal}
        transparent={true}
        animationType="slide"
        onRequestClose={hideModal}
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalOverlayTouchable} onPress={hideModal}>
            <View style={styles.modalContainer}>
              <Pressable 
                onPress={(e) => e.stopPropagation()} 
                style={styles.modalContent}
                accessible={true}
                accessibilityLabel={t("rebtScreen.modal.title")}
              >
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{t("rebtScreen.modal.title")}</Text>
                  <Text style={styles.modalSubtitle}>
                    {t("rebtScreen.modal.subtitle")}
                  </Text>
                </View>

                {/* Task Frequency Options */}
                <View style={styles.frequencyOptions}>
                  {[
                    {
                      key: "Daily",
                      icon: "flash-outline",
                      color: "#7C3AED",
                      description: t("rebtScreen.frequency.daily"),
                    },
                    {
                      key: "Weekly",
                      icon: "calendar-outline",
                      color: "#6D28D9",
                      description: t("rebtScreen.frequency.weekly"),
                    },
                    {
                      key: "Bi-Weekly",
                      icon: "calendar-number-outline",
                      color: "#5B21B6",
                      description: t("rebtScreen.frequency.biWeekly"),
                    },
                    {
                      key: "Monthly",
                      icon: "calendar-clear-outline",
                      color: "#4C1D95",
                      description: t("rebtScreen.frequency.monthly"),
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
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel={t("rebtScreen.frequency.practice", { frequency: option.key })}
                      accessibilityHint={option.description}
                    >
                      <View
                        style={[
                          styles.frequencyIconContainer,
                          { backgroundColor: option.color },
                        ]}
                      >
                        <CustomIcon 
                          type="IO"
                          name={option.icon as any}
                          size={24}
                          color="#FFFFFF"
                        />
                      </View>
                      <View style={styles.frequencyTextContainer}>
                        <Text style={styles.frequencyText}>
                          {t("rebtScreen.frequency.practice", { frequency: option.key })}
                        </Text>
                        <Text style={styles.frequencyDescription}>
                          {option.description}
                        </Text>
                      </View>
                      <CustomIcon 
                        type="IO"
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
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={t("rebtScreen.modal.cancel")}
                >
                  <Text style={styles.cancelButtonText}>{t("rebtScreen.modal.cancel")}</Text>
                </Pressable>
              </Pressable>
            </View>
          </Pressable>
        </View>
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
  rebtContainer: {
    paddingBottom: 30,
  },
  rebtCard: {
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
    borderLeftColor: "#7C3AED",
  },
  xpBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#7C3AED",
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
  rebtTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
    lineHeight: 24,
    marginRight: 80,
  },
  rebtDescription: {
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
    borderColor: "#7C3AED",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7C3AED",
    marginRight: 8,
  },
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
  // Blur effect styles
  blurWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  blurredCard: {
    opacity: 0.7,
  },
  completelyBlurredCard: {
    opacity: 0.3,
    backgroundColor: "#F9FAFB",
  },
  blurredXpBadge: {
    backgroundColor: "#9CA3AF",
  },
  blurredText: {
    color: "#D1D5DB",
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
  },
  completelyDisabledButton: {
    opacity: 0.3,
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },
  disabledButtonText: {
    color: "#9CA3AF",
  },
  completelyDisabledText: {
    color: "#D1D5DB",
  },
});
