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
import CustomIcon from "@/components/CustomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "@/i18n/locales/i18n";
import { getCurrentLanguage, getShortLanguageCode, getLanguageForAPI, changeLanguage } from "@/utils/i18nHelpers";

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
  const [cbtInterventions, setCbtInterventions] = useState<CBTIntervention[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [conditionName, setConditionName] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedCBT, setSelectedCBT] = useState<CBTIntervention | null>(null);
  const [modalAnimation] = useState(new Animated.Value(0));
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  
  const { condition } = route.params || {};

  // Language change detection with improved triggering (unified with InterventionsScreen)
  useEffect(() => {
    const currentLocale = getCurrentLanguage();
    if (currentLanguage !== currentLocale) {
      setCurrentLanguage(currentLocale);
      setConditionName(getConditionDisplayName(condition));
    }
  }, [currentLanguage, condition]);

  // Additional effect to watch for external language changes
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentLocale = getCurrentLanguage();
      if (currentLanguage !== currentLocale) {
        setCurrentLanguage(currentLocale);
        setConditionName(getConditionDisplayName(condition));
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, [currentLanguage, condition]);

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
    const currentLocale = getCurrentLanguage() as "en" | "hi" | "mr";
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
    
    // DISABLED: Phrase replacement and word translation to prevent title/description truncation
    // These features were causing issues where:
    // - "Behavioral Therapy" could be truncated to just "therapy" 
    // - "Cognitive Processing" could be truncated to just "cognitive"
    // - Descriptions were being cut down to single words or having unwanted replacements
    // 
    // If phrase translation is needed in the future, it should be implemented with:
    // 1. Exact phrase matching only (not word-within-phrase)
    // 2. Whitelist of specific phrases that are safe to translate
    // 3. More sophisticated logic to avoid truncation
    
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
      "professional-mental-health": "scanIntro.professionalMentalHealth.title",
      "sex-life": "scanIntro.sexLife.title",
      sleep: "scanIntro.sleep.title",
      "social-mental-health": "scanIntro.socialMentalHealth.title",
      "youngster-issues": "scanIntro.youngsterIssues.title",
      adhd: "adhdScreen.headerTitle",
      "aggressive-behaviour": "aggressiveBehaviourScreen.english.headerTitle",
      "conduct-issues": "conductIssues.headerTitle",
      "eating-habits": "eatingHabitsScreen.headerTitle",
      "introvert-child": "introvertChildScreen.headerTitle",
      "self-care-hygiene": "selfCareHygieneScreen.headerTitle",
      "substance-addiction": "substanceAddictionScreen.headerTitle",
      "breakupAndRebound": "breakupAndReboundScreen.title",
      "trauma-loss-and-dreams": "traumaLossAndDreamsScreen.headerTitle",
      "friendship-and-relationship": "friendshipAndRelationshipScreen.headerTitle",
      "self-esteem-and-self-identity": "selfEsteemAndSelfIdentityScreen.headerTitle",
      "dark-web-onlyfans": "Dark Web and OnlyFans",
      "gambling-and-gaming-addiction": "Gambling and Gaming Addiction",
      "internet-addiction": "Internet Addiction",
      "porn-addiction": "Porn Addiction",
    };
    const translationKey = conditionKeyMap[condition];
    
    // Return hardcoded strings directly without translation for new conditions
    if (condition === "dark-web-onlyfans") {
      return "Dark Web and OnlyFans";
    }
    if (condition === "gambling-and-gaming-addiction") {
      return "Gambling and Gaming Addiction";
    }
    if (condition === "internet-addiction") {
      return "Internet Addiction";
    }
    if (condition === "porn-addiction") {
      return "Porn Addiction";
    }
    
    return translationKey ? t(translationKey) : condition;
  };

  // Get CBT data from translation files instead of static JSON files
  const getCBTData = (condition: string): CBTData | null => {
    // Map URL-style condition names to camelCase keys used in translation files
    const conditionKeyMap: { [key: string]: string } = {
      "anger-management": "angerManagement",
      stress: "stress",
      addictions: "addictions",
      "general-physical-fitness": "generalPhysicalFitness",
      "suicidal-behavior": "suicidalBehavior",
      "common-psychological-issues": "commonPsychologicalIssues",
      "family-relationship": "familyRelationship",
      "friendship-and-relationship": "friendshipAndRelationship",
      "self-esteem-and-self-identity": "selfEsteemAndSelfIdentity",
      "internet-dependence": "internetDependence",
      "environment-issues": "environmentIssues",
      "financial-mental-health": "financialMentalHealth",
      "internet-social-media": "internetSocialMedia",
      "professional-mental-health": "professionalMentalHealth",
      "sex-life": "sexLife",
      sleep: "sleep",
      "social-mental-health": "socialMentalHealth",
      "youngster-issues": "youngsterIssues",
      adhd: "adhd",
      "aggressive-behaviour": "aggressiveBehaviour",
      "conduct-issues": "conductIssues",
      "eating-habits": "eatingHabits",
      "introvert-child": "introvertChild",
      "self-care-hygiene": "selfCareHygiene",
      "substance-addiction": "substanceAddiction",
      "breakupAndRebound": "breakupAndRebound",
      "trauma-loss-and-dreams": "traumaLossAndDreams",
      "unrealistic-beauty-standards": "unrealisticBeautyStandards",
      "dark-web-onlyfans": "darkWebAndOnlyFans",
      "gambling-and-gaming-addiction": "gamblingAndGamingAddiction",
      "internet-addiction": "internetAddiction",
      "porn-addiction": "pornAddiction",
    };
    
    const translationKey = conditionKeyMap[condition];
    
    // Special handling for conditions with specific data files
    if (condition === "self-care-hygiene" || condition === "introvert-child" || condition === "conduct-issues" || condition === "aggressive-behaviour" || condition === "substance-addiction" || condition === "adhd" || condition === "eating-habits" || condition === "friendship-and-relationship" || condition === "self-esteem-and-self-identity" || condition === "breakupAndRebound" || condition === "trauma-loss-and-dreams" || condition === "unrealistic-beauty-standards" || condition === "dark-web-onlyfans" || condition === "gambling-and-gaming-addiction" || condition === "internet-addiction" || condition === "porn-addiction") {
      // Continue to special handling sections below
    } else if (!translationKey) {
      console.error(`No translation key found for condition: ${condition}`);
      return null;
    }
    
    // Special handling for Self-Care Hygiene comprehensive data
    if (condition === "self-care-hygiene") {
      try {
        const selfCareHygieneData = require("../../../../assets/data/behaviour/SelfCareHygiene_comprehensive_data.json");
        if (selfCareHygieneData?.interventions?.cbtInterventions?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const selfCareCbtCards = selfCareHygieneData.interventions.cbtInterventions.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.english || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: translationKey,
            intervention_type: "CBT", 
            interventions: selfCareCbtCards,
          };
        }
      } catch (error) {
        console.error("Error loading Self-Care Hygiene comprehensive data:", error);
      }
    }
    
    // Special handling for Conduct Issues comprehensive data
    if (condition === "conduct-issues") {
      try {
        const conductData = require("../../../../assets/data/behaviour/ConductIssues_Complete_comprehensive_data.json");
        if (conductData?.interventions?.cbt?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const conductCbtCards = conductData.interventions.cbt.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.english || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: translationKey,
            intervention_type: "CBT", 
            interventions: conductCbtCards,
          };
        }
      } catch (error) {
        console.error("Error loading Conduct Issues comprehensive data:", error);
      }
    }
    
    // Special handling for ADHD comprehensive data
    if (condition === "adhd") {
      try {
        const adhdData = require("../../../../assets/data/behaviour/ADHD_comprehensive_data.json");
        if (adhdData?.interventions?.cbt?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const adhdCbtCards = adhdData.interventions.cbt.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.english || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: translationKey,
            intervention_type: "CBT", 
            interventions: adhdCbtCards,
          };
        }
      } catch (error) {
        console.error("Error loading ADHD comprehensive data:", error);
      }
    }

    // Special handling for Aggressive Behaviour comprehensive data
    if (condition === "aggressive-behaviour") {
      try {
        const aggressiveData = require("../../../../assets/data/behaviour/AggressiveBehaviour_comprehensive_data.json");
        if (aggressiveData?.interventions?.cbt?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const aggressiveCbtCards = aggressiveData.interventions.cbt.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.english || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: "aggressiveBehaviour",
            intervention_type: "CBT", 
            interventions: aggressiveCbtCards,
          };
        }
      } catch (error) {
        console.error("Error loading Aggressive Behaviour comprehensive data:", error);
      }
    }

    // Special handling for Eating Habits comprehensive data
    if (condition === "eating-habits") {
      try {
        const eatingHabitsData = require("../../../../assets/data/behaviour/EatingHabits_comprehensive_data.json");
        if (eatingHabitsData?.interventions?.cbt?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const eatingHabitsCbtCards = eatingHabitsData.interventions.cbt.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.english || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: "eatingHabits",
            intervention_type: "CBT", 
            interventions: eatingHabitsCbtCards,
          };
        }
      } catch (error) {
        console.error("Error loading Eating Habits comprehensive data:", error);
      }
    }

    // Special handling for Introvert Child comprehensive data
    if (condition === "introvert-child") {
      try {
        const introvertChildData = require("../../../../assets/data/behaviour/IntrovertChild_comprehensive_data.json");
        if (introvertChildData?.interventions?.cbt?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const introvertChildCbtCards = introvertChildData.interventions.cbt.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.english || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: "introvertChild",
            intervention_type: "CBT", 
            interventions: introvertChildCbtCards,
          };
        }
      } catch (error) {
        console.error("Error loading Introvert Child comprehensive data:", error);
      }
    }

    // Special handling for Substance Addiction comprehensive data
    if (condition === "substance-addiction") {
      try {
        const substanceAddictionData = require("../../../../assets/data/behaviour/SubstanceAddiction_comprehensive_data.json");
        if (substanceAddictionData?.cbtInterventions) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const substanceAddictionCbtCards = substanceAddictionData.cbtInterventions.map((item: any) => ({
            title: item.title?.[dataLanguage] || item.title?.english || "Untitled",
            description: item.description?.[dataLanguage] || item.description?.english || "No description",
            xp: item.xp || 0,
          }));
          
          return {
            condition: "substanceAddiction",
            intervention_type: "CBT", 
            interventions: substanceAddictionCbtCards,
          };
        }
      } catch (error) {
        console.error("Error loading Substance Addiction comprehensive data:", error);
      }
    }

    // Special handling for Breakup and Rebound comprehensive data
    if (condition === "breakupAndRebound") {
      try {
        const breakupReboundData = require("../../../../assets/data/Emotion/breakup_rebound_10_common_suggestions.json");
        if (breakupReboundData?.cbt) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const breakupReboundCbtCards = breakupReboundData.cbt.map((item: any) => ({
            title: item.title?.[dataLanguage] || item.title?.english || "Untitled",
            description: item.description?.[dataLanguage] || item.description?.english || "No description",
            xp: item.xp || 0,
          }));
          
          return {
            condition: "breakupAndRebound",
            intervention_type: "CBT",
            interventions: breakupReboundCbtCards,
          };
        }
      } catch (error) {
        console.error("Error loading Breakup and Rebound comprehensive data:", error);
      }
    }
    
    // Special handling for Trauma, Loss and Dreams - create appropriate CBT interventions
    if (condition === "trauma-loss-and-dreams") {
      try {
        const currentLanguage = getCurrentLanguage();
        const languageMap: { [key: string]: string } = {
          en: "english",
          hi: "hindi",
          mr: "marathi",
        };
        const dataLanguage = languageMap[currentLanguage] || "english";
        
        // Create CBT interventions specifically for trauma, loss and dreams
        const traumaCbtInterventions = [
          {
            title: {
              english: "Cognitive Restructuring for Trauma",
              hindi: "आघात के लिए संज्ञानात्मक पुनर्गठन",
              marathi: "आघातासाठी संज्ञानात्मक पुनर्रचना"
            },
            description: {
              english: "Learn to identify and challenge negative thought patterns that result from traumatic experiences, replacing them with more balanced and realistic thinking.",
              hindi: "आघातजन्य अनुभवों से उत्पन्न होने वाले नकारात्मक विचार पैटर्न की पहचान करना और उन्हें चुनौती देना सीखें, उन्हें अधिक संतुलित और यथार्थवादी सोच से बदलें।",
              marathi: "आघातजन्य अनुभवांमुळे निर्माण होणाऱ्या नकारात्मक विचार पद्धतींची ओळख करून त्यांना आव्हान देणे शिका, त्यांना अधिक संतुलित आणि वास्तववादी विचारसरणीने बदला."
            },
            xp: 5
          },
          {
            title: {
              english: "Exposure Therapy for Avoidance",
              hindi: "बचाव के लिए एक्सपोजर थेरेपी",
              marathi: "टाळाटाळीसाठी एक्सपोजर थेरपी"
            },
            description: {
              english: "Gradual, controlled exposure to trauma-related triggers in a safe environment to reduce avoidance behaviors and anxiety responses.",
              hindi: "बचाव व्यवहार और चिंता प्रतिक्रियाओं को कम करने के लिए सुरक्षित वातावरण में आघात-संबंधित ट्रिगर्स के लिए क्रमिक, नियंत्रित एक्सपोजर।",
              marathi: "टाळाटाळीचे वर्तन आणि चिंता प्रतिक्रिया कमी करण्यासाठी सुरक्षित वातावरणात आघात-संबंधित ट्रिगर्सचे क्रमिक, नियंत्रित एक्सपोजर."
            },
            xp: 4
          },
          {
            title: {
              english: "Grief Processing Techniques",
              hindi: "दुःख प्रसंस्करण तकनीकें",
              marathi: "दुःख प्रक्रिया तंत्रे"
            },
            description: {
              english: "CBT techniques specifically designed to help process grief and loss, including behavioral activation and meaning-making exercises.",
              hindi: "दुःख और हानि को संसाधित करने में मदद के लिए विशेष रूप से डिज़ाइन की गई CBT तकनीकें, जिसमें व्यवहारिक सक्रियण और अर्थ निर्माण अभ्यास शामिल हैं।",
              marathi: "दुःख आणि नुकसान प्रक्रिया करण्यास मदत करण्यासाठी खासून डिझाइन केलेली CBT तंत्रे, ज्यात वर्तणूक सक्रियीकरण आणि अर्थ निर्माण व्यायाम समाविष्ट आहेत."
            },
            xp: 4
          },
          {
            title: {
              english: "Dream Analysis and Reprocessing",
              hindi: "स्वप्न विश्लेषण और पुनः प्रसंस्करण",
              marathi: "स्वप्न विश्लेषण आणि पुनः प्रक्रिया"
            },
            description: {
              english: "Cognitive techniques to analyze and reprocess traumatic dreams and nightmares, transforming them into less distressing experiences.",
              hindi: "आघातजन्य स्वप्नों और दुःस्वप्नों का विश्लेषण और पुनः प्रसंस्करण करने के लिए संज्ञानात्मक तकनीकें, उन्हें कम परेशान करने वाले अनुभवों में बदलना।",
              marathi: "आघातजन्य स्वप्न आणि दुःस्वप्नांचे विश्लेषण आणि पुनः प्रक्रिया करण्यासाठी संज्ञानात्मक तंत्रे, त्यांना कमी त्रासदायक अनुभवांमध्ये रूपांतरित करणे."
            },
            xp: 5
          },
          {
            title: {
              english: "Behavioral Activation for Depression",
              hindi: "अवसाद के लिए व्यवहारिक सक्रियण",
              marathi: "नैराश्यासाठी वर्तणूक सक्रियीकरण"
            },
            description: {
              english: "Structured approach to increase meaningful activities and rebuild motivation after trauma and loss, combating depression and isolation.",
              hindi: "आघात और हानि के बाद अर्थपूर्ण गतिविधियों को बढ़ाने और प्रेरणा को पुनर्निर्माण करने के लिए संरचित दृष्टिकोण, अवसाद और अलगाव से निपटना।",
              marathi: "आघात आणि नुकसानानंतर अर्थपूर्ण क्रियाकलाप वाढवण्यासाठी आणि प्रेरणा पुनर्निर्माण करण्यासाठी संरचित दृष्टिकोन, नैराश्य आणि एकाकीपणाशी लढा."
            },
            xp: 4
          }
        ];
        
        const traumaCbtCards = traumaCbtInterventions.map((item: any) => ({
          title: item.title?.[dataLanguage] || item.title?.english || "Untitled",
          description: item.description?.[dataLanguage] || item.description?.english || "No description",
          xp: item.xp || 0,
        }));
        
        return {
          condition: "traumaLossAndDreams",
          intervention_type: "CBT",
          interventions: traumaCbtCards,
        };
      } catch (error) {
        console.error("Error creating Trauma, Loss and Dreams CBT data:", error);
      }
    }
    
    // Special handling for Gambling and Gaming Addiction - use the comprehensive data file
    if (condition === "gambling-and-gaming-addiction") {
      try {
        const gamblingData = null // require commented due to space in path;
        if (gamblingData?.interventions?.cbt?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const gamblingCbtCards = gamblingData.interventions.cbt.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.english || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: "gamblingAndGamingAddiction",
            intervention_type: "CBT", 
            interventions: gamblingCbtCards,
          };
        }
      } catch (error) {
        console.error("Error loading Gambling and Gaming Addiction comprehensive data:", error);
      }
    }
    
    // Special handling for Internet Addiction - use the comprehensive data file
    if (condition === "internet-addiction") {
      try {
        const internetData = null // require commented due to space in path;
        if (internetData?.cbt?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "en",
            hi: "hi",
            mr: "mr",
          };
          const dataLanguage = languageMap[currentLanguage] || "en";
          
          const internetCbtCards = internetData.cbt.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.en || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.en || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: "internetAddiction",
            intervention_type: "CBT", 
            interventions: internetCbtCards,
          };
        }
      } catch (error) {
        console.error("Error loading Internet Addiction comprehensive data:", error);
      }
    }
    
    // Special handling for Porn Addiction - use the comprehensive data file
    if (condition === "porn-addiction") {
      try {
        const pornData = null // require commented due to space in path;
        if (pornData?.cbt?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "en",
            hi: "hi",
            mr: "mr",
          };
          const dataLanguage = languageMap[currentLanguage] || "en";
          
          const pornCbtCards = pornData.cbt.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.en || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.en || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: "pornAddiction",
            intervention_type: "CBT", 
            interventions: pornCbtCards,
          };
        }
      } catch (error) {
        console.error("Error loading Porn Addiction comprehensive data:", error);
      }
    }
    
    // Special handling for Friendship and Relationship interventions
    if (condition === "friendship-and-relationship") {
      try {
        const friendshipData = require("../../../../assets/data/Emotion/friendship_relationship_interventions.json");
        if (friendshipData?.["10_common_suggestions"]) {
          // Create CBT interventions based on common suggestions for relationships
          const cbtInterventions = [
            {
              title: "Communication Skills Training",
              description: "Practice active listening and assertive communication techniques to improve relationship interactions. Learn to express your needs clearly while respecting others' perspectives.",
              xp: 6
            },
            {
              title: "Cognitive Restructuring for Relationships",
              description: "Identify and challenge negative thought patterns about relationships. Replace assumptions like 'They don't care about me' with balanced thinking based on evidence.",
              xp: 6
            },
            {
              title: "Conflict Resolution Strategies", 
              description: "Learn structured approaches to resolve disagreements constructively. Practice compromise, problem-solving, and finding win-win solutions in relationships.",
              xp: 6
            },
            {
              title: "Boundary Setting Exercises",
              description: "Develop healthy boundaries in relationships through behavioral experiments. Practice saying no respectfully and maintaining personal space when needed.",
              xp: 6
            },
            {
              title: "Trust Building Activities",
              description: "Engage in small, consistent actions that build trust over time. Practice transparency, honesty, and reliability in your relationships.",
              xp: 6
            }
          ];
          
          return {
            condition: "friendshipAndRelationship",
            intervention_type: "CBT",
            interventions: cbtInterventions,
          };
        }
      } catch (error) {
        console.error("Error loading Friendship and Relationship CBT data:", error);
      }
    }
    
    // Special handling for Self-esteem and Self-identity interventions
    if (condition === "self-esteem-and-self-identity") {
      try {
        const selfEsteemData = require("../../../../assets/data/Emotion/self_esteem_self_identity_interventions.json");
        if (selfEsteemData?.interventions) {
          const currentLanguage = getCurrentLanguage();
          const cbtInterventions = selfEsteemData.interventions.filter((item: any) => item.category === "CBT");
          
          const selfEsteemCbtCards = cbtInterventions.map((item: any) => ({
            title: item.translations[currentLanguage]?.title || item.translations.en?.title || "Untitled",
            description: item.translations[currentLanguage]?.description || item.translations.en?.description || "No description",
            xp: item.xp || 4,
            category: item.category || "CBT",
            id: item.id || "",
            journalTemplate: item.translations[currentLanguage]?.journalTemplate || item.translations.en?.journalTemplate || {}
          }));
          
          return {
            condition: "selfEsteemAndSelfIdentity",
            intervention_type: "CBT",
            interventions: selfEsteemCbtCards,
          };
        }
      } catch (error) {
        console.error("Error loading Self-esteem and Self-identity CBT data:", error);
      }
    }
    
    // Special handling for Unrealistic Beauty Standards - use our consolidated JSON file
    if (condition === "unrealistic-beauty-standards") {
      try {
        const beautyStandardsData = require("../../../../assets/data/Emotion/unrealistic_beauty_standards_10_common_suggestions.json");
        if (beautyStandardsData && beautyStandardsData.cbtTechniques) {
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the beauty standards CBT data format to the expected format
          const interventions = beautyStandardsData.cbtTechniques.techniques.map((item: any) => ({
            title: item.title[currentLang],
            description: item.description[currentLang],
            xp: item.xp,
          }));

          return {
            condition: "unrealistic-beauty-standards",
            intervention_type: "CBT Interventions",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Unrealistic Beauty Standards CBT data:", error);
      }
    }
    
    // Special handling for Dark Web and OnlyFans - use our comprehensive JSON file
    if (condition === "dark-web-onlyfans") {
      try {
        const darkWebData = null // require commented due to space in path;
        if (darkWebData && darkWebData.interventions && darkWebData.interventions.cbt) {
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the dark web CBT data format to the expected format
          const interventions = darkWebData.interventions.cbt.cards.map((item: any) => ({
            title: item.title[currentLang],
            description: item.description[currentLang],
            xp: item.xp,
          }));

          return {
            condition: "dark-web-onlyfans",
            intervention_type: "CBT Interventions",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Dark Web and OnlyFans CBT data:", error);
      }
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
      interventions: interventions,
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
        "breakupAndRebound": "breakupAndRebound",
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
        "breakupAndRebound": "breakupAndReboundScreen.title",
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
            // Force language-specific translation
            const oldLocale = getCurrentLanguage();
            changeLanguage(lang);
            const translatedTitle = t(originalTitleKey);
            changeLanguage(oldLocale); // Restore original locale
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
            // Force language-specific translation
            const oldLocale = getCurrentLanguage();
            changeLanguage(lang);
            const translatedCondition = t(conditionDisplayKey);
            changeLanguage(oldLocale); // Restore original locale
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
        if (originalDescriptionKey) {
          try {
            // Force language-specific translation
            const oldLocale = getCurrentLanguage();
            changeLanguage(lang);
            const translatedDescription = t(originalDescriptionKey);
            changeLanguage(oldLocale); // Restore original locale
            return translatedDescription !== originalDescriptionKey
              ? translatedDescription
              : getLocalizedCBTText(selectedCBT, "description");
          } catch {
            return getLocalizedCBTText(selectedCBT, "description"); // Fallback to original
          }
        }
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
        fullDescription: getLocalizedCBTText(selectedCBT, "description"),
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
          {cbtInterventions.map((cbt, index) => (
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
                >
                  <Text style={styles.cancelButtonText}>
                    {t("cbtScreen.modal.cancel")}
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
});
