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
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useLanguage } from "../../../../context/LanguageContext";
import { getPremiumStatus } from "../../../../utils/premiumUtils";
import CustomIcon from "../../../../components/CustomIcon";

interface CBTIntervention {
  // Format from translation files (cbtInterventions section)
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

interface CBTData {
  condition: string;
  intervention_type: string;
  interventions: CBTIntervention[];
}

export default function CBTScreen({ navigation, route }: any) {
  const { locale, t } = useLanguage(); // Use language context
  const [cbtInterventions, setCbtInterventions] = useState<CBTIntervention[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [conditionName, setConditionName] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedCBT, setSelectedCBT] = useState<CBTIntervention | null>(null);
  const [modalAnimation] = useState(new Animated.Value(0));
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);

  const { condition } = route.params || {};

  // Language change detection - update condition name when language changes
  useEffect(() => {
    setConditionName(getConditionDisplayName(condition));
  }, [locale, condition]);

  // Comprehensive translation mapping for common CBT intervention terms
  const cbtTranslations = {
    // Common CBT titles
    "Thought Record": {
      en: "Thought Record",
      hi: "विचार रिकॉर्ड",
      mr: "विचार रेकॉर्ड",
    },
    "Cognitive Restructuring": {
      en: "Cognitive Restructuring",
      hi: "संज्ञानात्मक पुनर्गठन",
      mr: "संज्ञानात्मक पुनर्रचना",
    },
    "Behavioral Activation": {
      en: "Behavioral Activation",
      hi: "व्यवहारिक सक्रियता",
      mr: "वर्तणूक सक्रियता",
    },
    "Activity Scheduling": {
      en: "Activity Scheduling",
      hi: "गतिविधि योजना",
      mr: "क्रियाकलाप नियोजन",
    },
    "Problem Solving": {
      en: "Problem Solving",
      hi: "समस्या समाधान",
      mr: "समस्या निराकरण",
    },
    "Exposure Therapy": {
      en: "Exposure Therapy",
      hi: "एक्सपोज़र थेरेपी",
      mr: "एक्सपोजर थेरपी",
    },
    "Mindfulness Practice": {
      en: "Mindfulness Practice",
      hi: "सचेतन अभ्यास",
      mr: "सचेतन अभ्यास",
    },
    "Grounding Techniques": {
      en: "Grounding Techniques",
      hi: "ग्राउंडिंग तकनीक",
      mr: "ग्राउंडिंग तंत्र",
    },
    "Challenging Negative Thoughts": {
      en: "Challenging Negative Thoughts",
      hi: "नकारात्मक विचारों को चुनौती देना",
      mr: "नकारात्मक विचारांना आव्हान देणे",
    },
    "Identify Cognitive Distortions": {
      en: "Identify Cognitive Distortions",
      hi: "संज्ञानात्मक विकृतियों की पहचान करें",
      mr: "संज्ञानात्मक विकृती ओळखा",
    },
    "Daily Mood Tracking": {
      en: "Daily Mood Tracking",
      hi: "दैनिक मूड ट्रैकिंग",
      mr: "दैनिक मूड ट्रॅकिंग",
    },
    "Relaxation Training": {
      en: "Relaxation Training",
      hi: "विश्राम प्रशिक्षण",
      mr: "विश्रांति प्रशिक्षण",
    },

    // Common CBT terms
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
    behavior: {
      en: "behavior",
      hi: "व्यवहार",
      mr: "वर्तन",
    },
    cognitive: {
      en: "cognitive",
      hi: "संज्ञानात्मक",
      mr: "संज्ञानात्मक",
    },
    distortion: {
      en: "distortion",
      hi: "विकृति",
      mr: "विकृती",
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
    exercise: {
      en: "exercise",
      hi: "अभ्यास",
      mr: "व्यायाम",
    },
    journal: {
      en: "journal",
      hi: "डायरी",
      mr: "नोंदणी",
    },
    tracking: {
      en: "tracking",
      hi: "ट्रैकिंग",
      mr: "ट्रॅकिंग",
    },

    // Common phrases that might appear in CBT descriptions
    "Identify negative thoughts": {
      en: "Identify negative thoughts",
      hi: "नकारात्मक विचारों की पहचान करें",
      mr: "नकारात्मक विचार ओळखा",
    },
    "Challenge your thinking": {
      en: "Challenge your thinking",
      hi: "अपनी सोच को चुनौती दें",
      mr: "तुमच्या विचारांना आव्हान द्या",
    },
    "Record your thoughts": {
      en: "Record your thoughts",
      hi: "अपने विचार लिखें",
      mr: "तुमचे विचार लिहा",
    },
    "Practice daily": {
      en: "Practice daily",
      hi: "दैनिक अभ्यास करें",
      mr: "रोज सराव करा",
    },
    "Monitor your mood": {
      en: "Monitor your mood",
      hi: "अपने मूड की निगरानी करें",
      mr: "तुमच्या मूडचे निरीक्षण करा",
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

  // Enhanced helper function to get localized CBT text with dynamic translation support
  const getLocalizedCBTText = (
    cbt: CBTIntervention,
    field: "title" | "description",
  ): string => {
    const currentLocale = locale as "en" | "hi" | "mr";
    const originalText =
      field === "title" ? getCBTTitle(cbt) : getCBTDescription(cbt);

    // First, try to get from common translations mapping (exact match only)
    const commonTranslation =
      cbtTranslations[originalText as keyof typeof cbtTranslations];
    if (commonTranslation) {
      return commonTranslation[currentLocale];
    }

    // Try case-insensitive exact match
    const lowerCaseText = originalText.toLowerCase();
    const caseInsensitiveMatch = Object.keys(cbtTranslations).find(
      (key) => key.toLowerCase() === lowerCaseText,
    );
    if (caseInsensitiveMatch) {
      const translation =
        cbtTranslations[caseInsensitiveMatch as keyof typeof cbtTranslations];
      return translation[currentLocale];
    }

    // For longer descriptions, try to translate individual words and phrases
    if (field === "description" && originalText.length > 50) {
      let translatedText = originalText;

      // Try to translate common phrases within the description
      Object.entries(cbtTranslations).forEach(([englishText, translations]) => {
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
      const wordMatch = Object.keys(cbtTranslations).find(
        (key) => key.toLowerCase() === lowerCaseWord,
      );
      if (wordMatch) {
        const translation =
          cbtTranslations[wordMatch as keyof typeof cbtTranslations];
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
      setSelectedCBT(null);
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
      "social-media-issues": "socialMediaIssuesScreen.headerTitle",
      "professional-mental-health": "scanIntro.professionalMentalHealth.title",
      "sex-life": "scanIntro.sexLife.title",
      sleep: "scanIntro.sleep.title",
      "social-mental-health": "scanIntro.socialMentalHealth.title",
      "youngster-issues": "scanIntro.youngsterIssues.title",
      "job-insecurity": "scanIntro.jobInsecurity.title",
      "adhd": "adhdScreen.title",
      "aggressive-behaviour": "aggressiveBehaviourScreen.title",
      "conduct-issues": "conductIssues.headerTitle",
      "substance-addiction": "substanceAddictionScreen.headerTitle",
      "trauma-loss-and-dreams": "traumaLossAndDreamsScreen.headerTitle",
      "eating-habits": "Eating Habits",
      "introvert-child": "Introvert Child",
      "breakupAndRebound": "Breakup and Rebound",
      "dating-sites-and-complications": "Dating Sites and Complications",
      "friendship-and-relationship": "friendshipAndRelationshipScreen.headerTitle",
      "exam-stress-fear-of-failure": "examStressScreen.headerTitle",
      "unrealistic-beauty-standards": "unrealisticBeautyStandardsScreen.headerTitle",
      "self-esteem-and-self-identity": "selfEsteemAndSelfIdentityScreen.headerTitle",
      "abusive-language-back-answering": "Abusive Language & Back Answering",
      "gambling-and-gaming-addiction": "Gambling and Gaming Addiction",
      "internet-addiction": "Internet Addiction",
    };
    const translationKey = conditionKeyMap[condition];
    return translationKey ? t(translationKey) : condition;
  };

  // Get CBT data from translation files instead of static JSON files
  const getCBTData = (condition: string): CBTData | null => {
    // Handle Eating Habits data from comprehensive data file
    if (condition === "eating-habits") {
      try {
        const eatingData = require("../../../../assets/data/behaviour/EatingHabits_comprehensive_data.json");
        const cbtCards = eatingData.interventions?.cbt?.cards;

        if (!cbtCards || !Array.isArray(cbtCards)) {
          console.error("No CBT interventions found in Eating Habits data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = cbtCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "",
          description:
            card.description?.[localeField] || card.description?.english || "",
          xp: card.xp || 0,
        }));

        return {
          condition: "eating-habits",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Eating Habits CBT data:", error);
        return null;
      }
    }

     // Handle Introvert Child data from comprehensive data file
     if (condition === "introvert-child") {
      try {
        const IntrovertChildData = require("../../../../assets/data/behaviour/IntrovertChild_comprehensive_data.json");
        const cbtCards = IntrovertChildData.interventions?.cbt?.cards;

        if (!cbtCards || !Array.isArray(cbtCards)) {
          console.error("No CBT interventions found in Introvert Child data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = cbtCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "",
          description:
            card.description?.[localeField] || card.description?.english || "",
          xp: card.xp || 0,
        }));

        return {
          condition: "introvert-child",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Introvert Child CBT data:", error);
        return null;
      }
    }
    
    // Handle Conduct Issues data from comprehensive data file
    if (condition === "conduct-issues") {
      try {
        const conductData = require("../../../../assets/data/behaviour/ConductIssues_Complete_comprehensive_data.json");
        const cbtCards = conductData.interventions?.cbt?.cards;

        if (!cbtCards || !Array.isArray(cbtCards)) {
          console.error("No CBT interventions found in Conduct Issues data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = cbtCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "",
          description:
            card.description?.[localeField] || card.description?.english || "",
          xp: card.xp || 0,
        }));

        return {
          condition: "conduct-issues",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Conduct Issues CBT data:", error);
        return null;
      }
    }
    // Handle ADHD data from ADHD comprehensive data file
    if (condition === "adhd") {
      try {
        const adhdData = require("../../../../assets/data/behaviour/ADHD_comprehensive_data.json");
        const cbtCards = adhdData.interventions?.cbt?.cards;

        if (!cbtCards || !Array.isArray(cbtCards)) {
          console.error("No CBT interventions found in ADHD data");
          return null;
        }

        // Map locale codes to ADHD data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi"
        };
        const adhdLocaleField = localeMap[locale] || "english";

        const interventions = cbtCards.map((card: any) => ({
          title: card.title?.[adhdLocaleField] || card.title?.english || "",
          description: card.description?.[adhdLocaleField] || card.description?.english || "",
          xp: card.xp || 0,
        }));

        return {
          condition: "adhd",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading ADHD CBT data:", error);
        return null;
      }
    }

    // Handle Porn Addiction CBT data (localized en/hi/mr)
    if (condition === "porn-addiction") {
      try {
        const data = require("../../../../assets/data/Internet & Social Media Issues/PornAddiction_comprehensive_data.json");
        const cards = data?.cbt?.cards;

        if (!cards || !Array.isArray(cards)) {
          console.error("No CBT interventions found in Porn Addiction data");
          return null;
        }

        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const interventions = cards.map((card: any) => ({
          title: card.title?.[localeKey] || card.title?.en || "",
          description: card.description?.[localeKey] || card.description?.en || "",
          xp: card.xp || 0,
        }));

        return {
          condition: "porn-addiction",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Porn Addiction CBT data:", error);
        return null;
      }
    }

    // Handle Abusive Language & Back Answering CBT data (top-level locale)
if (condition === "abusive-language-back-answering") {
  try {
    const data = require("../../../../assets/data/Parenting/AbusiveLanguageBackAnswering_comprehensive_data.json");
    const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
    const dataset = data[localeKey] || data["en"];
    const list = dataset?.cbt;

    if (!list || !Array.isArray(list)) {
      console.error("No CBT interventions found in Abusive Language & Back Answering data");
      return null;
    }

    const interventions = list.map((item: any) => ({
      title: item.title || "",
      description: item.description || "",
      xp: item.xp || 0,
    }));

    return {
      condition: "abusive-language-back-answering",
      intervention_type: "CBT",
      interventions,
    };
  } catch (error) {
    console.error("Error loading Abusive Language & Back Answering CBT data:", error);
    return null;
  }
}

      // Handle Exam stress and fear of failure CBT data (top-level locale)
if (condition === "exam-stress-fear-of-failure") {
  try {
    const data = require("../../../../assets/data/Parenting/ExamStressFearOfFailure_comprehensive_data.json");
    const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
    const dataset = data[localeKey] || data["en"];
    const list = dataset?.cbt;

    if (!list || !Array.isArray(list)) {
      console.error("No CBT interventions found in Exam stress and fear of failure data");
      return null;
    }

    const interventions = list.map((item: any) => ({
      title: item.title || "",
      description: item.description || "",
      xp: item.xp || 0,
    }));

    return {
      condition: "exam-stress-fear-of-failure",
      intervention_type: "CBT",
      interventions,
    };
  } catch (error) {
    console.error("Error loading Exam stress and fear of failure CBT data:", error);
    return null;
  }
}


      // Handle Dating Sites and Complications CBT data (localized en/hi/mr in cards)
      if (condition === "dating-sites-and-complications") {
        try {
          const data = require("../../../../assets/data/Emotion/dating_sites_complications_comprehensive_data.json");
          const cards = data?.cbt?.cards;

          if (!cards || !Array.isArray(cards)) {
            console.error("No CBT interventions found in Dating Sites and Complications data");
            return null;
          }

          const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
          const interventions = cards.map((card: any) => ({
            title: card.title?.[localeKey] || card.title?.en || "",
            description: card.description?.[localeKey] || card.description?.en || "",
            xp: card.xp || 0,
          }));

          return {
            condition: "dating-sites-and-complications",
            intervention_type: "CBT",
            interventions,
          };
        } catch (error) {
          console.error("Error loading Dating Sites and Complications CBT data:", error);
          return null;
        }
      }

      // Handle Friendship and Relationship CBT data (fallback to 10 common suggestions)
      if (condition === "friendship-and-relationship") {
        try {
          const data = require("../../../../assets/data/Emotion/friendship_relationship_interventions.json");
          const list = data?.["10_common_suggestions"]; // array directly

          if (!list || !Array.isArray(list)) {
            console.error("No CBT interventions found in Friendship and Relationship data");
            return null;
          }

          const interventions = list.map((item: any) => ({
            title:
              (typeof item.title === "string" ? item.title : item.title?.en) || "",
            description:
              (typeof item.description === "string"
                ? item.description
                : item.description?.en) || "",
            xp: item.xp || 0,
          }));

          return {
            condition: "friendship-and-relationship",
            intervention_type: "CBT",
            interventions,
          };
        } catch (error) {
          console.error("Error loading Friendship and Relationship CBT data:", error);
          return null;
        }
      }
      

    // Handle Parenting from Child's View CBT data (top-level locale)
    if (condition === "parenting-from-child-view") {
      try {
        const data = require("../../../../assets/data/Parenting/ChildPointOfView_comprehensive_data.json");
        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = data[localeKey] || data["en"];
        const list = dataset?.commonSuggestions; // CBT not provided separately; fallback to commonSuggestions-like CBT

        if (!list || !Array.isArray(list)) {
          return null;
        }

        const interventions = list.map((item: any) => ({
          title: item.title || "",
          description: item.description || "",
          xp: item.xp || 0,
        }));

        return {
          condition: "parenting-from-child-view",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        return null;
      }
    }

    // Handle Breakup & Rebound CBT data (support many shapes)
    if (condition === "breakupAndRebound") {
      try {
        const raw = require("../../../../assets/data/Emotion/breakup_rebound_10_common_suggestions.json");

        // Try localized top-level dataset first
        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = raw[localeKey] || raw["en"] || raw;

        // Candidate shapes: dataset.commonSuggestions, interventions.cbt.cards, interventions.cbt, suggestions, top-level arrays
        const itemsCandidate =
          dataset?.commonSuggestions ||
          dataset?.interventions?.cbt?.cards ||
          dataset?.interventions?.cbt ||
          raw?.interventions?.cbt?.cards ||
          raw?.interventions?.cbt ||
          raw?.suggestions ||
          raw?.interventions ||
          null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items) || items.length === 0) {
          console.error("No CBT data array found for Breakup & Rebound", { candidate: itemsCandidate });
          try {
            Alert.alert(
              "Debug: breakup&rebound CBT",
              `no items candidate: ${JSON.stringify(itemsCandidate?.slice?.(0,3) || itemsCandidate || null)}\nlocaleKey: ${localeKey}`,
            );
          } catch (e) {}
          return null;
        }

        const interventions = items.map((item: any) => {
          // translations object preferred
          if (item.translations && typeof item.translations === 'object') {
            const chosen = item.translations[localeKey] || item.translations['en'] || item.translations['english'] || {};
            return {
              title: chosen.title || chosen.heading || "",
              description: chosen.description || chosen.body || "",
              xp: item.xp || item.XP || 0,
            };
          }

          // title/description may be objects keyed by language or plain strings
          const titleObj = item.title || item.Title || {};
          const descObj = item.description || item.Description || {};

          const title = (typeof titleObj === 'object' && (titleObj[localeKey] || titleObj['english'] || titleObj['en'])) || (typeof titleObj === 'string' ? titleObj : '');
          const description = (typeof descObj === 'object' && (descObj[localeKey] || descObj['english'] || descObj['en'])) || (typeof descObj === 'string' ? descObj : '');

          return {
            title: title || "",
            description: description || "",
            xp: item.xp || item.XP || 0,
          };
        });

        return {
          condition: "breakupAndRebound",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Breakup & Rebound CBT data:", error);
        return null;
      }
    }

    // Handle Parenting from Parents' View CBT data (top-level locale)
    if (condition === "parenting-from-parents-view") {
      try {
        const data = require("../../../../assets/data/Parenting/ParentsPointOfView_comprehensive_data.json");
        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = data[localeKey] || data["en"];
        const list = dataset?.commonSuggestions; // same fallback strategy

        if (!list || !Array.isArray(list)) {
          return null;
        }

        const interventions = list.map((item: any) => ({
          title: item.title || "",
          description: item.description || "",
          xp: item.xp || 0,
        }));

        return {
          condition: "parenting-from-parents-view",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        return null;
      }
    }
    // Handle Aggressive Behaviour data from comprehensive data file
    if (condition === "aggressive-behaviour") {
      try {
        const aggressiveData = require("../../../../assets/data/behaviour/AggressiveBehaviour_comprehensive_data.json");
        const cbtCards = aggressiveData.interventions?.cbt?.cards;

        if (!cbtCards || !Array.isArray(cbtCards)) {
          console.error("No CBT interventions found in Aggressive Behaviour data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi"
        };
        const localeField = localeMap[locale] || "english";

        const interventions = cbtCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "",
          description: card.description?.[localeField] || card.description?.english || "",
          xp: card.xp || 0,
        }));

        return {
          condition: "aggressive-behaviour",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Aggressive Behaviour CBT data:", error);
        return null;
      }
    }

    // Handle Internet Addiction data from comprehensive data file
    if (condition === "internet-addiction") {
      try {
        const InternetData = require("../../../../assets/data/Internet & Social Media Issues/InternetAddiction_comprehensive_data.json");
        const cbtCards = InternetData.cbt?.cards;

        if (!cbtCards || !Array.isArray(cbtCards)) {
        console.error("No CBT interventions found in Internet Addiction data");
          return null;
        }

        const interventions = cbtCards.map((card: any) => ({
          title: card.title?.[locale] || card.title?.en || "No title",
          description:
            card.description?.[locale] || card.description?.en ||
            "No description",
          xp: card.xp || 2,
        }));

        return {
          condition: "internet-addiction",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Internet Addiction data:", error);
        return null;
      }
    }

    // Handle Gambling and Gaming Addiction data from comprehensive data file
    if (condition === "gambling-and-gaming-addiction") {
      try {
        const aggressiveData = require("../../../../assets/data/Internet & Social Media Issues/GamblingAndGamingAddiction_comprehensive_data.json");
        const cbtCards = aggressiveData.interventions?.cbt?.cards;
        
        if (!cbtCards || !Array.isArray(cbtCards)) {
          console.error("No CBT interventions found in Gambling and Gaming Addiction data");
          return null;
        }
        
        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi", 
          "mr": "marathi"
        };
        const localeField = localeMap[locale] || "english";

        const interventions = cbtCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "",
          description: card.description?.[localeField] || card.description?.english || "",
          xp: card.xp || 0,
        }));
        
        return {
          condition: "gambling-and-gaming-addiction",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Gambling and Gaming Addiction CBT data:", error);
        return null;
      }
    }

    // Handle Self-Esteem & Identity CBT data
    if (condition === "self-esteem-and-self-identity") {
      try {
        const data = require(
          "../../../../assets/data/Emotion/self_esteem_self_identity_interventions.json",
        );

        const items = data.interventions;
        if (!items || !Array.isArray(items)) {
          console.error("No interventions array found in Self-Esteem & Identity data");
          return null;
        }

        // Normalize locale (handles values like 'en', 'en-US', etc.)
        const localeKey = (locale || "").slice(0, 2);
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";

        // Filter only CBT-category items from the array
        const cbtItems = items.filter((it: any) => {
          const cat = (it.category || "").toString().toLowerCase();
          return cat === "cbt" || cat === "c-b-t";
        });

        if (!cbtItems || cbtItems.length === 0) {
          console.error("No CBT interventions found in Self-Esteem & Identity data");
          return null;
        }

        const interventions = cbtItems.map((item: any) => {
          const translations = item.translations || {};
          const chosen = translations[lang] || translations["en"] || {};
          return {
            title: chosen.title || "",
            description: chosen.description || "",
            xp: item.xp || 0,
          };
        });

        return {
          condition: "self-esteem-and-self-identity",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Self-Esteem & Identity CBT data:", error);
        return null;
      }
    }

    // Handle Social Media issues CBT/REBT data
    if (condition === "social-media-issues") {
      try {
        const data = require(
          "../../../../assets/data/Internet & Social Media Issues/SocialMediaComprehensiveData.json",
        );

        // The comprehensive file stores cards under interventions.<type>.cards
        // (cbt, rebt, commonSuggestions, etc.). Prefer CBT, then REBT, then fallbacks.
        const items =
          data?.interventions?.cbt?.cards ||
          data?.interventions?.commonSuggestions?.cards ||
          data?.interventions?.cbt ||
          null;

        if (!items || !Array.isArray(items)) {
          console.error("No CBT interventions array found in Social Media Issues data");
          return null;
        }

        // Normalize locale and map to asset fields (english/hindi/marathi)
        const localeKey = ((locale || "").slice(0, 2) || "en").toLowerCase();
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
        const localeFieldMap: { [k: string]: string } = { en: "english", hi: "hindi", mr: "marathi" };
        const localeField = localeFieldMap[lang] || "english";

        const interventions = items.map((item: any) => {
          if (item.translations && typeof item.translations === "object") {
            const translations = item.translations || {};
            const chosen = translations[lang] || translations[localeField] || translations["en"] || translations["english"] || {};
            return {
              title: chosen.title || chosen.heading || "",
              description: chosen.description || chosen.body || "",
              xp: item.xp || item.XP || 0,
            } as any;
          }

          const titleObj = item.title || item.Title || {};
          const descObj = item.description || item.Description || {};

          const title =
            (typeof titleObj === "object" && (titleObj[localeField] || titleObj[lang] || titleObj["english"] || titleObj["en"])) ||
            (typeof titleObj === "string" ? titleObj : "");

          const description =
            (typeof descObj === "object" && (descObj[localeField] || descObj[lang] || descObj["english"] || descObj["en"])) ||
            (typeof descObj === "string" ? descObj : "");

          return {
            title: title || "",
            description: description || "",
            xp: item.xp || item.XP || 0,
          } as any;
        });

        return {
          condition: "social-media-issues",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Social Media Issues CBT data:", error);
        return null;
      }
    }

    // Handle Trauma, Loss and Dreams data from comprehensive JSON file for CBT
    if (condition === "trauma-loss-and-dreams") {
      try {
        const data = require(
          "../../../../assets/data/Emotion/trauma_loss_dreams_10_common_suggestions.json",
        );
        const items = (() => {
          // direct array
          if (Array.isArray(data?.interventions)) return data.interventions;

          // interventions as an object with a 10CommonSuggestions node
          if (data?.interventions && typeof data.interventions === "object") {
            const interventionsObj: any = data.interventions;
            const commonNode =
              interventionsObj["CBT"] ||
              interventionsObj["CBT"] ||
              interventionsObj["CBT"] ||
              null;

            if (commonNode) {
              // languages may be keyed by short codes (en/hi/mr)
              const languages = commonNode.languages || commonNode.language || {};
              const localeKeyInner = (locale || "").slice(0, 2);
              const langInner = ["en", "hi", "mr"].includes(localeKeyInner) ? localeKeyInner : "en";
              const langNode = languages[langInner] || languages["en"] || languages["english"] || null;

              if (langNode && Array.isArray(langNode.suggestions)) return langNode.suggestions;

              // fallback: common node might include suggestions directly
              if (Array.isArray(commonNode.suggestions)) return commonNode.suggestions;
            }
          }

          // top-level suggestions array
          if (Array.isArray(data?.suggestions)) return data.suggestions;

          // fall back to known REBT-shaped paths
          return (
            data?.socialMediaIssuesScreen?.strategies?.rebt?.rebtSuggestionsList ||
            data?.strategies?.rebt?.rebtSuggestionsList ||
            null
          );
        })();

        if (!items || !Array.isArray(items)) {
          console.error("No CBT data array found in Trauma, Loss and Dreams data");
          return null;
        }

        // Normalize locale and map to the language field names used in this file
        const localeKey = (locale || "").slice(0, 2);
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
        const localeFieldMap: { [k: string]: string } = { en: "english", hi: "hindi", mr: "marathi" };
        const localeField = localeFieldMap[lang] || "english";

        const interventions = items.map((item: any) => {
          // Prefer unified `translations` object if present
          if (item.translations && typeof item.translations === "object") {
            const translations = item.translations || {};
            const chosen = translations[lang] || translations[localeField] || translations["en"] || {};
            return {
              title: chosen.title || chosen.heading || "",
              description: chosen.description || chosen.body || "",
              xp: item.xp || item.XP || 0,
            };
          }

          // The asset commonly uses 'english'/'hindi'/'marathi' keys under title/description
          const titleObj = item.title || item.Title || {};
          const descObj = item.description || item.Description || {};

          const title = (typeof titleObj === "object" && (titleObj[localeField] || titleObj[lang] || titleObj["english"] || titleObj["en"])) || (typeof titleObj === "string" ? titleObj : "");
          const description = (typeof descObj === "object" && (descObj[localeField] || descObj[lang] || descObj["english"] || descObj["en"])) || (typeof descObj === "string" ? descObj : "");

          return {
            title: title || "",
            description: description || "",
            xp: item.xp || item.XP || 0,
          };
        });

        return {
          condition: "trauma-loss-and-dreams",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Trauma, Loss and Dreams CBT data:", error);
        return null;
      }
    }

    // handle Unrealistic Beauty Standards data from comprehensive JSON file for CBT
    if (condition === "unrealistic-beauty-standards") {
      try {
        const data = require(
          "../../../../assets/data/Emotion/unrealistic_beauty_standards_10_common_suggestions.json",
        );

        // Prefer interventions.commonSuggestions.cards (this file), then fall back
        // to other common shapes used across assets.
        const itemsCandidate =
          data?.interventions?.commonSuggestions?.cards ||
          data?.interventions?.commonSuggestions ||
          data?.interventions?.cards ||
          data?.interventions ||
          data?.suggestions ||
          null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No CBT data array found in Unrealistic Beauty Standards data");
          return null;
        }

        // Normalize locale and map to the language field names used in this file
        const localeKey = ((locale || "").slice(0, 2) || "en").toLowerCase();
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
        const localeFieldMap: { [k: string]: string } = { en: "english", hi: "hindi", mr: "marathi" };
        const localeField = localeFieldMap[lang] || "english";

        const interventions = items.map((item: any) => {
          // Prefer unified `translations` object if present
          if (item.translations && typeof item.translations === "object") {
            const translations = item.translations || {};
            const chosen = translations[lang] || translations[localeField] || translations["en"] || translations["english"] || {};
            return {
              title: chosen.title || chosen.heading || "",
              description: chosen.description || chosen.body || "",
              xp: item.xp || item.XP || 0,
            } as any;
          }

          // The asset commonly uses 'english'/'hindi'/'marathi' keys under title/description
          const titleObj = item.title || item.Title || {};
          const descObj = item.description || item.Description || {};

          const title =
            (typeof titleObj === "object" && (titleObj[localeField] || titleObj[lang] || titleObj["english"] || titleObj["en"])) ||
            (typeof titleObj === "string" ? titleObj : "");

          const description =
            (typeof descObj === "object" && (descObj[localeField] || descObj[lang] || descObj["english"] || descObj["en"])) ||
            (typeof descObj === "string" ? descObj : "");

          return {
            title: title || "",
            description: description || "",
            xp: item.xp || item.XP || 0,
          } as any;
        });

        return {
          condition: "unrealistic-beauty-standards",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Unrealistic Beauty Standards CBT data:", error);
        return null;
      }
    }

    // handle Substance Addiction data from comprehensive JSON file for CBT
    if (condition === "substance-addiction") {
      try {
        const data = require(
          "../../../../assets/data/behaviour/SubstanceAddiction_comprehensive_data.json",
        );

        // Prefer the shape used across comprehensive files: interventions.<type>.cards
        // Fall back to a variety of common shapes used in other assets.
        const itemsCandidate =
          data?.interventions?.cbt?.cards ||
          data?.interventions?.cbt ||
          data?.interventions?.CBT?.cards ||
          data?.interventions?.CBT ||
          data?.interventions?.commonSuggestions?.cards ||
          data?.commonSuggestions ||
          data?.interventions?.cards ||
          data?.interventions ||
          data?.suggestions ||
          null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No CBT data array found in Substance Addiction data");
          return null;
        }

        // Normalize locale and map to the language field names used in this file
        const localeKey = ((locale || "").slice(0, 2) || "en").toLowerCase();
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
        const localeFieldMap: { [k: string]: string } = { en: "english", hi: "hindi", mr: "marathi" };
        const localeField = localeFieldMap[lang] || "english";

        const interventions = items.map((item: any) => {
          // Prefer unified `translations` object if present
          if (item.translations && typeof item.translations === "object") {
            const translations = item.translations || {};
            const chosen = translations[lang] || translations[localeField] || translations["en"] || translations["english"] || {};
            return {
              title: chosen.title || chosen.heading || "",
              description: chosen.description || chosen.body || "",
              xp: item.xp || item.XP || 0,
            };
          }

          // The asset commonly uses 'english'/'hindi'/'marathi' keys under title/description
          const titleObj = item.title || item.Title || {};
          const descObj = item.description || item.Description || {};

          const title =
            (typeof titleObj === "object" && (titleObj[localeField] || titleObj[lang] || titleObj["english"] || titleObj["en"])) ||
            (typeof titleObj === "string" ? titleObj : "");

          const description =
            (typeof descObj === "object" && (descObj[localeField] || descObj[lang] || descObj["english"] || descObj["en"])) ||
            (typeof descObj === "string" ? descObj : "");

          return {
            title: title || "",
            description: description || "",
            xp: item.xp || item.XP || 0,
          };
        });

        return {
          condition: "substance-addiction",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Substance Addiction CBT data:", error);
        return null;
      }
    }

    // Handle Suicidal Behaviour CBT data from comprehensive JSON file
    if (condition === "suicidal-behavior") {
      try {
        const data = require("../../../../assets/data/behaviour/Suicidal_Behaviour_comprehensive_data.json");

        const itemsCandidate =
          data?.interventions?.cbt?.cards ||
          data?.interventions?.cbt ||
          data?.interventions?.commonSuggestions?.cards ||
          data?.interventions?.cards ||
          data?.interventions ||
          null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No CBT data array found in Suicidal Behaviour data");
          return null;
        }

        const localeKey = ((locale || "").slice(0, 2) || "en").toLowerCase();
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
        const localeFieldMap: { [k: string]: string } = { en: "english", hi: "hindi", mr: "marathi" };
        const localeField = localeFieldMap[lang] || "english";

        const interventions = items.map((item: any) => {
          if (item.translations && typeof item.translations === "object") {
            const translations = item.translations || {};
            const chosen = translations[lang] || translations[localeField] || translations["en"] || translations["english"] || {};
            return {
              title: chosen.title || chosen.heading || "",
              description: chosen.description || chosen.body || "",
              xp: item.xp || item.XP || 0,
            };
          }

          return {
            title: item.title?.[localeField] || item.title?.english || item.title || "",
            description: item.description?.[localeField] || item.description?.english || item.description || "",
            xp: item.xp || item.XP || 0,
          };
        });

        return {
          condition: "suicidal-behavior",
          intervention_type: "CBT",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Suicidal Behaviour CBT data:", error);
        return null;
      }
    }


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
    const interventions = t(`cbtInterventions.${translationKey}`, {
      returnObjects: true,
    });

    if (!Array.isArray(interventions)) {
      console.error(`No CBT interventions found for: ${translationKey}`);
      return null;
    }

    return {
      condition: translationKey,
      intervention_type: "CBT",
      interventions: interventions as CBTIntervention[],
    };
  };

  const loadCBTInterventions = useCallback(async () => {
    try {
      setLoading(true);

      if (!condition) {
        console.error("No condition parameter provided");
        return;
      }

      const data = getCBTData(condition);

      if (!data) {
        console.error(`No CBT data found for condition: ${condition}`);
        Alert.alert(
          t("cbtScreen.error.title"),
          t("cbtScreen.error.noCBTData"),
          [
            {
              text: t("cbtScreen.error.ok"),
              onPress: () => navigation.goBack(),
            },
          ],
        );
        return;
      }

      setCbtInterventions(data.interventions || []);
      setConditionName(getConditionDisplayName(condition));
    } catch (error) {
      console.error("Error loading CBT interventions:", error);
      Alert.alert(
        t("cbtScreen.error.title"),
        t("cbtScreen.error.failedToLoad"),
        [
          {
            text: t("cbtScreen.error.ok"),
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } finally {
      setLoading(false);
    }
  }, [condition, navigation]);

  useEffect(() => {
    loadCBTInterventions();
  }, [loadCBTInterventions]);

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

  const handleAddToTaskList = (cbt: CBTIntervention) => {
    setSelectedCBT(cbt);
    showModal();
  };

  const getCBTTitle = (cbt: CBTIntervention): string => {
    // Translation files use 'title', legacy files use 'Title'
    return cbt.title || cbt.Title || t("cbtScreen.defaultTitle");
  };

  const getCBTDescription = (cbt: CBTIntervention): string => {
    // Translation files use 'description', legacy files use 'Description'
    const desc = cbt.description || cbt.Description || "";
    return formatDescription(desc);
  };

  const getCBTXP = (cbt: CBTIntervention): number => {
    // Translation files use 'xp', legacy files use 'XP'
    return cbt.xp || cbt.XP || 5;
  };

  const handleTaskFrequencySelect = async (frequency: string) => {
    if (!selectedCBT) return;

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
          t("cbtScreen.error.title"),
          t("cbtScreen.error.invalidFrequency"),
        );
        return;
      }

      // Create a new intervention in the format expected by InterventionsScreen
      // Get the translation keys for proper dynamic translation
      const translationKeyMap: { [key: string]: string } = {
        "anger-management": "angerManagement",
        addictions: "addictions",
        "self-esteem-and-self-identity": "selfEsteemAndSelfIdentity",
        "common-psychological-issues": "commonPsychologicalIssues",
        "conduct-issues": "conductIssues",
        "environment-issues": "environmentIssues",
        "family-relationship": "familyRelationship",
        "financial-mental-health": "financialMentalHealth",
        "general-physical-fitness": "generalPhysicalFitness",
        "internet-dependence": "internetDependence",
        "internet-social-media": "internetSocialMedia",
        "social-media-issues": "socialMediaIssues",
        "professional-mental-health": "professionalMentalHealth",
        "sex-life": "sexLife",
        sleep: "sleep",
        "social-mental-health": "socialMentalHealth",
        stress: "stress",
        "suicidal-behavior": "suicidalBehavior",
        "youngster-issues": "youngsterIssues",
        "job-insecurity": "jobInsecurity",
        "trauma-loss-and-dreams": "traumaLossAndDreams",
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
        "social-media-issues": "socialMediaIssuesScreen.headerTitle",
        "professional-mental-health":
          "scanIntro.professionalMentalHealth.title",
        "sex-life": "scanIntro.sexLife.title",
        sleep: "scanIntro.sleep.title",
        "social-mental-health": "scanIntro.socialMentalHealth.title",
        "youngster-issues": "scanIntro.youngsterIssues.title",
        "job-insecurity": "scanIntro.jobInsecurity.title",
        "substance-addiction": "substanceAddictionScreen.headerTitle",
        "unrealistic-beauty-standards": "unrealisticBeautyStandardsScreen.headerTitle",
      };

      const translationKey = translationKeyMap[condition];
      const currentCBTIndex = cbtInterventions.findIndex(
        (c) => c === selectedCBT,
      );

      // Store translation keys for dynamic lookup
      const originalTitleKey = translationKey
        ? `cbtInterventions.${translationKey}.${currentCBTIndex}.title`
        : undefined;
      const originalSubtitleKey = "cbtScreen.task.subtitleFrom";
      const originalDescriptionKey = translationKey
        ? `cbtInterventions.${translationKey}.${currentCBTIndex}.description`
        : undefined;
      const conditionDisplayKey = conditionKeyMap[condition];

      // Create translation objects for all languages - proper implementation
      const getTitleForLanguage = (lang: "en" | "hi" | "mr"): string => {
        if (originalTitleKey) {
          try {
            // Note: For React Native CLI, we'll use the current translation system
            // without forcing language switches which can be complex
            const translatedTitle = t(originalTitleKey);
            return translatedTitle !== originalTitleKey
              ? translatedTitle
              : getLocalizedCBTText(selectedCBT, "title");
          } catch {
            return getLocalizedCBTText(selectedCBT, "title"); // Fallback to original
          }
        }
        return getLocalizedCBTText(selectedCBT, "title");
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
            // Note: For React Native CLI, we'll use the current translation system
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
        en: t("cbtScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("en"),
        }),
        hi: t("cbtScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("hi"),
        }),
        mr: t("cbtScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("mr"),
        }),
      };

      // Create description translations if we have an original description key
      const getDescriptionForLanguage = (lang: "en" | "hi" | "mr"): string => {
        if (lang === "en") {
          return getCBTDescription(selectedCBT); // Always use original English text
        }
        // For other languages, use dynamic translation
        return getLocalizedCBTText(selectedCBT, "description");
      };

      const descriptionTranslations = {
        en: getDescriptionForLanguage("en"),
        hi: getDescriptionForLanguage("hi"),
        mr: getDescriptionForLanguage("mr"),
      };

      const newIntervention: SavedIntervention = {
        id: Date.now().toString(),
        title: getLocalizedCBTText(selectedCBT, "title"),
        subtitle: t("cbtScreen.task.subtitleFrom", { conditionName }),
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
          "cbt",
          "cognitive-therapy",
        ],
        xp: getCBTXP(selectedCBT),
        date: new Date().toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
        isSelected: false,
        isCompleted: false,
        fullDescription: selectedCBT.description || selectedCBT.Description || "", // Save original English description
        condition: conditionName,
        interventionType: "CBT",
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
          t("cbtScreen.success.title"),
          t("cbtScreen.success.message", {
            cbtTitle: getLocalizedCBTText(selectedCBT, "title"),
            frequency: frequency.toLowerCase(),
          }),
          [{ text: t("cbtScreen.success.ok") }],
        );
      }, 300);
    } catch (error) {
      console.error("Error saving CBT intervention:", error);
      setTimeout(() => {
        Alert.alert(
          t("cbtScreen.error.title"),
          t("cbtScreen.error.failedToSave"),
        );
      }, 300);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={styles.loadingText}>{t("cbtScreen.loading")}</Text>
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
        <Text style={styles.headerTitle}>{t("cbtScreen.header.title")}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Condition Title */}
        <Text style={styles.conditionTitle}>{conditionName}</Text>
        <Text style={styles.subtitle}>{t("cbtScreen.subtitle")}</Text>

        {/* CBT Interventions List */}
        <View style={styles.cbtContainer}>
          {cbtInterventions.map((cbt, index) => {
            const shouldBlur = index >= 5 && !hasPremiumAccess; // Show first 5 cards normally, blur the rest unless premium

            if (shouldBlur) {
              return (
                <View key={index} style={styles.blurWrapper}>
                  <View style={[styles.cbtCard, styles.completelyBlurredCard]}>
                    {/* XP Badge */}
                    <View style={[styles.xpBadge, styles.blurredXpBadge]}>
                      <CustomIcon type="IO" name="bulb-outline" size={12} color="#FFFFFF" />
                      <Text style={styles.xpText}>
                        {getCBTXP(cbt)} {t("cbtScreen.xpLabel")}
                      </Text>
                    </View>

                    <Text style={[styles.cbtTitle, styles.blurredText]}>
                      {getLocalizedCBTText(cbt, "title")}
                    </Text>
                    <Text style={[styles.cbtDescription, styles.blurredText]}>
                      {getLocalizedCBTText(cbt, "description")}
                    </Text>
                    <Pressable
                      style={[styles.addButton, styles.completelyDisabledButton]}
                      disabled={true}
                    >
                      <Text style={[styles.addButtonText, styles.completelyDisabledText]}>
                        {t("cbtScreen.addToTherapyPlan")}
                      </Text>
                      <CustomIcon type="IO" name="add-circle" size={20} color="#E5E7EB" />
                    </Pressable>
                  </View>
                </View>
              );
            }

            return (
              <View key={index} style={styles.cbtCard}>
                {/* XP Badge */}
                <View style={styles.xpBadge}>
                  <CustomIcon type="IO" name="bulb-outline" size={12} color="#FFFFFF" />
                  <Text style={styles.xpText}>
                    {getCBTXP(cbt)} {t("cbtScreen.xpLabel")}
                  </Text>
                </View>

                <Text style={styles.cbtTitle}>
                  {getLocalizedCBTText(cbt, "title")}
                </Text>
                <Text style={styles.cbtDescription}>
                  {getLocalizedCBTText(cbt, "description")}
                </Text>
                <Pressable
                  style={styles.addButton}
                  onPress={() => handleAddToTaskList(cbt)}
                >
                  <Text style={styles.addButtonText}>
                    {t("cbtScreen.addToTherapyPlan")}
                  </Text>
                  <CustomIcon type="IO" name="add-circle" size={20} color="#3B82F6" />
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
                accessibilityLabel={t("cbtScreen.modal.title")}
              >
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {t("cbtScreen.modal.title")}
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    {t("cbtScreen.modal.subtitle")}
                  </Text>
                </View>

                {/* Task Frequency Options */}
                <View style={styles.frequencyOptions}>
                  {[
                    {
                      key: "Daily",
                      icon: "today-outline",
                      color: "#3B82F6",
                      description: t("cbtScreen.frequency.daily"),
                    },
                    {
                      key: "Weekly",
                      icon: "calendar-outline",
                      color: "#1D4ED8",
                      description: t("cbtScreen.frequency.weekly"),
                    },
                    {
                      key: "Bi-Weekly",
                      icon: "calendar-number-outline",
                      color: "#1E40AF",
                      description: t("cbtScreen.frequency.biWeekly"),
                    },
                    {
                      key: "Monthly",
                      icon: "calendar-clear-outline",
                      color: "#1E3A8A",
                      description: t("cbtScreen.frequency.monthly"),
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
                      accessibilityLabel={t("cbtScreen.frequency.practice", {
                        frequency: option.key,
                      })}
                      accessibilityHint={option.description}
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
                          {t("cbtScreen.frequency.practice", {
                            frequency: option.key,
                          })}
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
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={t("cbtScreen.modal.cancel")}
                >
                  <Text style={styles.cancelButtonText}>
                    {t("cbtScreen.modal.cancel")}
                  </Text>
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
  cbtContainer: {
    paddingBottom: 30,
  },
  cbtCard: {
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
    borderLeftColor: "#3B82F6",
  },
  xpBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#3B82F6",
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
  cbtTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
    lineHeight: 24,
    marginRight: 80,
  },
  cbtDescription: {
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
    borderColor: "#3B82F6",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3B82F6",
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
  // Blur effect styles (simulating blur without expo-blur)
  blurWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
