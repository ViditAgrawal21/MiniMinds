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
    const currentLocale = getCurrentLanguage() as "en" | "hi" | "mr";
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
    
    // DISABLED: Phrase replacement and word translation to prevent title/description truncation
    // These features were causing issues where:
    // - "Rational Thinking" could be truncated to just "rational"
    // - "Belief Analysis" could be truncated to just "beliefs"
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
          if (selfCareHygieneData?.interventions?.rebtInterventions?.cards) {
            const currentLanguage = getCurrentLanguage();
            const languageMap: { [key: string]: string } = {
              en: "english",
              hi: "hindi",
              mr: "marathi",
            };
            const dataLanguage = languageMap[currentLanguage] || "english";
            
            const selfCareRebtCards = selfCareHygieneData.interventions.rebtInterventions.cards.map((card: any) => ({
              title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
              description: card.description?.[dataLanguage] || card.description?.english || "No description",
              xp: card.xp || 0,
            }));
            
            return {
              condition: translationKey,
              intervention_type: "REBT", 
              interventions: selfCareRebtCards,
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
          if (conductData?.interventions?.rebt?.cards) {
            const currentLanguage = getCurrentLanguage();
            const languageMap: { [key: string]: string } = {
              en: "english",
              hi: "hindi",
              mr: "marathi",
            };
            const dataLanguage = languageMap[currentLanguage] || "english";
            
            const conductRebtCards = conductData.interventions.rebt.cards.map((card: any) => ({
              title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
              description: card.description?.[dataLanguage] || card.description?.english || "No description",
              xp: card.xp || 0,
            }));
            
            return {
              condition: translationKey,
              intervention_type: "REBT", 
              interventions: conductRebtCards,
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
          if (adhdData?.interventions?.rebt?.cards) {
            const currentLanguage = getCurrentLanguage();
            const languageMap: { [key: string]: string } = {
              en: "english",
              hi: "hindi",
              mr: "marathi",
            };
            const dataLanguage = languageMap[currentLanguage] || "english";
            
            const adhdRebtCards = adhdData.interventions.rebt.cards.map((card: any) => ({
              title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
              description: card.description?.[dataLanguage] || card.description?.english || "No description",
              xp: card.xp || 0,
            }));
            
            return {
              condition: translationKey,
              intervention_type: "REBT", 
              interventions: adhdRebtCards,
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
          if (aggressiveData?.interventions?.rebt?.cards) {
            const currentLanguage = getCurrentLanguage();
            const languageMap: { [key: string]: string } = {
              en: "english",
              hi: "hindi",
              mr: "marathi",
            };
            const dataLanguage = languageMap[currentLanguage] || "english";
            
            const aggressiveRebtCards = aggressiveData.interventions.rebt.cards.map((card: any) => ({
              title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
              description: card.description?.[dataLanguage] || card.description?.english || "No description",
              xp: card.xp || 0,
            }));
            
            return {
              condition: "aggressiveBehaviour",
              intervention_type: "REBT", 
              interventions: aggressiveRebtCards,
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
          if (eatingHabitsData?.interventions?.rebt?.cards) {
            const currentLanguage = getCurrentLanguage();
            const languageMap: { [key: string]: string } = {
              en: "english",
              hi: "hindi",
              mr: "marathi",
            };
            const dataLanguage = languageMap[currentLanguage] || "english";
            
            const eatingHabitsRebtCards = eatingHabitsData.interventions.rebt.cards.map((card: any) => ({
              title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
              description: card.description?.[dataLanguage] || card.description?.english || "No description",
              xp: card.xp || 0,
            }));
            
            return {
              condition: "eatingHabits",
              intervention_type: "REBT", 
              interventions: eatingHabitsRebtCards,
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
          if (introvertChildData?.interventions?.rebt?.cards) {
            const currentLanguage = getCurrentLanguage();
            const languageMap: { [key: string]: string } = {
              en: "english",
              hi: "hindi",
              mr: "marathi",
            };
            const dataLanguage = languageMap[currentLanguage] || "english";
            
            const introvertChildRebtCards = introvertChildData.interventions.rebt.cards.map((card: any) => ({
              title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
              description: card.description?.[dataLanguage] || card.description?.english || "No description",
              xp: card.xp || 0,
            }));
            
            return {
              condition: "introvertChild",
              intervention_type: "REBT", 
              interventions: introvertChildRebtCards,
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
          if (substanceAddictionData?.rebtInterventions) {
            const currentLanguage = getCurrentLanguage();
            const languageMap: { [key: string]: string } = {
              en: "english",
              hi: "hindi",
              mr: "marathi",
            };
            const dataLanguage = languageMap[currentLanguage] || "english";
            
            const substanceAddictionRebtCards = substanceAddictionData.rebtInterventions.map((item: any) => ({
              title: item.title?.[dataLanguage] || item.title?.english || "Untitled",
              description: item.description?.[dataLanguage] || item.description?.english || "No description",
              xp: item.xp || 0,
            }));
            
            return {
              condition: "substanceAddiction",
              intervention_type: "REBT", 
              interventions: substanceAddictionRebtCards,
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
          if (breakupReboundData?.rebt) {
            const currentLanguage = getCurrentLanguage();
            const languageMap: { [key: string]: string } = {
              en: "english",
              hi: "hindi",
              mr: "marathi",
            };
            const dataLanguage = languageMap[currentLanguage] || "english";
            
            const breakupReboundRebtCards = breakupReboundData.rebt.map((item: any) => ({
              title: item.title?.[dataLanguage] || item.title?.english || "Untitled",
              description: item.description?.[dataLanguage] || item.description?.english || "No description",
              xp: item.xp || 0,
            }));
            
            return {
              condition: "breakupAndRebound",
              intervention_type: "REBT",
              interventions: breakupReboundRebtCards,
            };
          }
        } catch (error) {
          console.error("Error loading Breakup and Rebound comprehensive data:", error);
        }
      }
      
      // Special handling for Trauma, Loss and Dreams - create appropriate REBT interventions
      if (condition === "trauma-loss-and-dreams") {
        try {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          // Create REBT interventions specifically for trauma, loss and dreams
          const traumaRebtInterventions = [
            {
              title: {
                english: "Disputing Trauma-Related Irrational Beliefs",
                hindi: "आघात-संबंधी अतार्किक विश्वासों का खंडन",
                marathi: "आघात-संबंधित अतार्किक समजुतींचे खंडन"
              },
              description: {
                english: "Learn to identify and challenge irrational beliefs formed after trauma (e.g., 'I'm unsafe everywhere', 'It's my fault'), replacing them with rational, evidence-based thoughts.",
                hindi: "आघात के बाद बनी अतार्किक मान्यताओं की पहचान करना और उन्हें चुनौती देना सीखें (जैसे 'मैं कहीं भी सुरक्षित नहीं हूं', 'यह मेरी गलती है'), उन्हें तर्कसंगत, साक्ष्य-आधारित विचारों से बदलें।",
                marathi: "आघातानंतर निर्माण झालेल्या अतार्किक समजुतींची ओळख करून त्यांना आव्हान देणे शिका (जसे 'मी कुठेही सुरक्षित नाही', 'ही माझी चूक आहे'), त्यांना तर्कसंगत, पुरावा-आधारित विचारांनी बदला."
              },
              xp: 5
            },
            {
              title: {
                english: "Rational Thinking About Loss",
                hindi: "हानि के बारे में तर्कसंगत सोच",
                marathi: "नुकसानाबद्दल तर्कसंगत चिंतन"
              },
              description: {
                english: "Challenge absolutistic thinking about loss (e.g., 'I'll never be happy again', 'I can't live without them') and develop more flexible, realistic perspectives on grief and recovery.",
                hindi: "हानि के बारे में पूर्णतावादी सोच को चुनौती दें (जैसे 'मैं फिर कभी खुश नहीं रहूंगा', 'मैं उनके बिना नहीं रह सकता') और दुःख और वसूली पर अधिक लचीले, यथार्थवादी दृष्टिकोण विकसित करें।",
                marathi: "नुकसानाबद्दल निरपेक्ष विचारसरणीला आव्हान द्या (जसे 'मी पुन्हा कधी आनंदी होणार नाही', 'मी त्यांच्याशिवाय जगू शकत नाही') आणि दुःख आणि पुनर्प्राप्तीवर अधिक लवचिक, वास्तववादी दृष्टिकोन विकसित करा."
              },
              xp: 4
            },
            {
              title: {
                english: "Self-Acceptance After Trauma",
                hindi: "आघात के बाद स्व-स्वीकृति",
                marathi: "आघातानंतर स्व-स्वीकृति"
              },
              description: {
                english: "Practice unconditional self-acceptance despite experiencing trauma, recognizing that your worth as a person is not diminished by what happened to you.",
                hindi: "आघात का अनुभव करने के बावजूद बिना शर्त स्व-स्वीकृति का अभ्यास करें, यह पहचानते हुए कि एक व्यक्ति के रूप में आपका मूल्य आपके साथ जो हुआ उससे कम नहीं हुआ है।",
                marathi: "आघाताचा अनुभव झाल्यानंतरही बिनशर्त स्व-स्वीकृतीचा सराव करा, हे ओळखून की एक व्यक्ती म्हणून तुमची किंमत तुमच्यासोबत जे घडले त्यामुळे कमी झालेली नाही."
              },
              xp: 4
            },
            {
              title: {
                english: "Rational Emotive Dream Work",
                hindi: "तर्कसंगत भावनात्मक स्वप्न कार्य",
                marathi: "तर्कसंगत भावनात्मक स्वप्न कार्य"
              },
              description: {
                english: "Apply REBT principles to understand and process disturbing dreams, identifying the irrational beliefs that contribute to nightmare distress and developing rational alternatives.",
                hindi: "परेशान करने वाले स्वप्नों को समझने और संसाधित करने के लिए REBT सिद्धांतों का प्रयोग करें, दुःस्वप्न की परेशानी में योगदान देने वाली अतार्किक मान्यताओं की पहचान करें और तर्कसंगत विकल्प विकसित करें।",
                marathi: "त्रासदायक स्वप्नांना समजून घेण्यासाठी आणि प्रक्रिया करण्यासाठी REBT तत्त्वांचा वापर करा, दुःस्वप्नांच्या त्रासात योगदान देणाऱ्या अतार्किक समजुतींची ओळख करा आणि तर्कसंगत पर्याय विकसित करा."
              },
              xp: 5
            },
            {
              title: {
                english: "Frustration Tolerance Building",
                hindi: "निराशा सहनशीलता निर्माण",
                marathi: "निराशा सहनशीलता निर्माण"
              },
              description: {
                english: "Develop high frustration tolerance for the recovery process, accepting that healing from trauma and loss takes time and involves setbacks, without demanding immediate relief.",
                hindi: "रिकवरी प्रक्रिया के लिए उच्च निराशा सहनशीलता विकसित करें, यह स्वीकार करते हुए कि आघात और हानि से उपचार में समय लगता है और इसमें असफलताएं शामिल हैं, तत्काल राहत की मांग के बिना।",
                marathi: "पुनर्प्राप्ती प्रक्रियेसाठी उच्च निराशा सहनशीलता विकसित करा, हे स्वीकारून की आघात आणि नुकसानापासून बरे होण्यास वेळ लागतो आणि त्यात अडथळे येतात, तत्काळ आरामाची मागणी न करता."
              },
              xp: 4
            }
          ];
          
          const traumaRebtCards = traumaRebtInterventions.map((item: any) => ({
            title: item.title?.[dataLanguage] || item.title?.english || "Untitled",
            description: item.description?.[dataLanguage] || item.description?.english || "No description",
            xp: item.xp || 0,
          }));
          
          return {
            condition: "traumaLossAndDreams",
            intervention_type: "REBT",
            interventions: traumaRebtCards,
          };
        } catch (error) {
          console.error("Error creating Trauma, Loss and Dreams REBT data:", error);
        }
      }
      
      // Special handling for Gambling and Gaming Addiction - use the comprehensive data file
      if (condition === "gambling-and-gaming-addiction") {
        try {
        const gamblingData = null // require commented due to space in path;
          if (gamblingData?.interventions?.rebt?.cards) {
            const currentLanguage = getCurrentLanguage();
            const languageMap: { [key: string]: string } = {
              en: "english",
              hi: "hindi",
              mr: "marathi",
            };
            const dataLanguage = languageMap[currentLanguage] || "english";
            
            const gamblingRebtCards = gamblingData.interventions.rebt.cards.map((card: any) => ({
              title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
              description: card.description?.[dataLanguage] || card.description?.english || "No description",
              xp: card.xp || 0,
            }));
            
            return {
              condition: "gamblingAndGamingAddiction",
              intervention_type: "REBT", 
              interventions: gamblingRebtCards,
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
          if (internetData?.rebt?.cards) {
            const currentLanguage = getCurrentLanguage();
            const languageMap: { [key: string]: string } = {
              en: "en",
              hi: "hi",
              mr: "mr",
            };
            const dataLanguage = languageMap[currentLanguage] || "en";
            
            const internetRebtCards = internetData.rebt.cards.map((card: any) => ({
              title: card.title?.[dataLanguage] || card.title?.en || "Untitled",
              description: card.description?.[dataLanguage] || card.description?.en || "No description",
              xp: card.xp || 0,
            }));
            
            return {
              condition: "internetAddiction",
              intervention_type: "REBT", 
              interventions: internetRebtCards,
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
          if (pornData?.rebt?.cards) {
            const currentLanguage = getCurrentLanguage();
            const languageMap: { [key: string]: string } = {
              en: "en",
              hi: "hi",
              mr: "mr",
            };
            const dataLanguage = languageMap[currentLanguage] || "en";
            
            const pornRebtCards = pornData.rebt.cards.map((card: any) => ({
              title: card.title?.[dataLanguage] || card.title?.en || "Untitled",
              description: card.description?.[dataLanguage] || card.description?.en || "No description",
              xp: card.xp || 0,
            }));
            
            return {
              condition: "pornAddiction",
              intervention_type: "REBT", 
              interventions: pornRebtCards,
            };
          }
        } catch (error) {
          console.error("Error loading Porn Addiction comprehensive data:", error);
          // Return fallback REBT techniques for porn addiction
          return {
            condition: "pornAddiction",
            intervention_type: "REBT",
            interventions: [
              {
                title: "Disputing Sexual Entitlement Beliefs",
                description: "Challenge irrational beliefs like 'I deserve sexual gratification whenever I want it' or 'I can't control my urges'. Replace with rational thoughts about healthy sexuality and self-control.",
                xp: 5
              },
              {
                title: "ABC Model for Urge Management",
                description: "Identify the Activating event (trigger), irrational Beliefs ('I must watch now'), and emotional Consequences (shame, compulsion). Develop rational responses to break the cycle.",
                xp: 5
              },
              {
                title: "Rational Self-Acceptance",
                description: "Practice unconditional self-acceptance despite past behaviors. You are not defined by your addiction - you are a person working toward recovery.",
                xp: 4
              },
              {
                title: "Frustration Tolerance Building",
                description: "Develop high frustration tolerance for urges and recovery setbacks. Accept that discomfort is temporary and manageable without acting on impulses.",
                xp: 4
              },
              {
                title: "Disputing Shame and Guilt",
                description: "Challenge self-condemning beliefs that create shame spirals. Replace 'I'm disgusting/worthless' with 'I made mistakes but I'm working to change'.",
                xp: 4
              }
            ]
          };
        }
      }
      
      // Special handling for Friendship and Relationship interventions
      if (condition === "friendship-and-relationship") {
        try {
          const friendshipData = require("../../../../assets/data/Emotion/friendship_relationship_interventions.json");
          if (friendshipData?.["10_common_suggestions"]) {
            // Create REBT interventions based on common relationship patterns
            const rebtInterventions = [
              {
                title: "Disputing Relationship 'Shoulds'",
                description: "Challenge irrational beliefs like 'My friend should always be available' or 'My partner must read my mind.' Replace these demands with preferences and realistic expectations.",
                xp: 6
              },
              {
                title: "Rational Thinking About Rejection",
                description: "Dispute catastrophic thoughts about relationship conflicts. Transform 'If they're upset with me, our friendship is ruined' into 'Disagreements are normal and can be resolved.'",
                xp: 6
              },
              {
                title: "Acceptance in Relationships",
                description: "Practice unconditional self-acceptance regardless of relationship status. You are worthy of love whether single or partnered, whether conflicts arise or not.",
                xp: 6
              },
              {
                title: "Managing Relationship Anxiety",
                description: "Use the ABC model to address relationship fears. Identify activating events (late text response), beliefs (they don't care), and emotional consequences (anxiety).",
                xp: 6
              },
              {
                title: "Rational Romance and Friendship",
                description: "Develop healthy relationship philosophies based on mutual respect rather than neediness or possession. Practice giving love freely without demanding it in return.",
                xp: 6
              }
            ];
            
            return {
              condition: "friendshipAndRelationship", 
              intervention_type: "REBT",
              interventions: rebtInterventions,
            };
          }
        } catch (error) {
          console.error("Error loading Friendship and Relationship REBT data:", error);
        }
      }
      
      // Special handling for Self-esteem and Self-identity interventions
      if (condition === "self-esteem-and-self-identity") {
        try {
          const selfEsteemData = require("../../../../assets/data/Emotion/self_esteem_self_identity_interventions.json");
          if (selfEsteemData?.interventions) {
            const currentLanguage = getCurrentLanguage();
            const rebtInterventions = selfEsteemData.interventions.filter((item: any) => item.category === "REBT");
            
            const selfEsteemRebtCards = rebtInterventions.map((item: any) => ({
              title: item.translations[currentLanguage]?.title || item.translations.en?.title || "Untitled",
              description: item.translations[currentLanguage]?.description || item.translations.en?.description || "No description",
              xp: item.xp || 4,
              category: item.category || "REBT",
              id: item.id || "",
              journalTemplate: item.translations[currentLanguage]?.journalTemplate || item.translations.en?.journalTemplate || {}
            }));
            
            return {
              condition: "selfEsteemAndSelfIdentity",
              intervention_type: "REBT",
              interventions: selfEsteemRebtCards,
            };
          }
        } catch (error) {
          console.error("Error loading Self-esteem and Self-identity REBT data:", error);
        }
      }
      
      // Special handling for Unrealistic Beauty Standards - use our consolidated JSON file
      if (condition === "unrealistic-beauty-standards") {
        try {
          const beautyStandardsData = require("../../../../assets/data/Emotion/unrealistic_beauty_standards_10_common_suggestions.json");
          if (beautyStandardsData && beautyStandardsData.rebtTechniques) {
            
            // Get current language for proper translation
            const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                              getCurrentLanguage() === "mr" ? "marathi" : "english";
            
            // Transform the beauty standards REBT data format to the expected format
            const interventions = beautyStandardsData.rebtTechniques.techniques.map((item: any) => ({
              title: item.title[currentLang],
              description: item.description[currentLang],
              xp: item.xp,
            }));

            return {
              condition: "unrealistic-beauty-standards",
              intervention_type: "REBT Interventions",
              interventions: interventions,
            };
          }
        } catch (error) {
          console.error("Error loading Unrealistic Beauty Standards REBT data:", error);
        }
      }
      
      // Special handling for Dark Web and OnlyFans - use our comprehensive JSON file
      if (condition === "dark-web-onlyfans") {
        try {
        const darkWebData = null // require commented due to space in path;
          if (darkWebData && darkWebData.interventions && darkWebData.interventions.rebt) {
            
            // Get current language for proper translation
            const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                              getCurrentLanguage() === "mr" ? "marathi" : "english";
            
            // Transform the dark web REBT data format to the expected format
            const interventions = darkWebData.interventions.rebt.cards.map((item: any) => ({
              title: item.title[currentLang],
              description: item.description[currentLang],
              xp: item.xp,
            }));

            return {
              condition: "dark-web-onlyfans",
              intervention_type: "REBT Interventions",
              interventions: interventions,
            };
          }
        } catch (error) {
          console.error("Error loading Dark Web and OnlyFans REBT data:", error);
        }
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
        interventions: interventions,
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
        "eating-habits": "eatingHabits",
        "introvert-child": "introvertChild",
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
        "eating-habits": "eatingHabitsScreen.headerTitle",
        "introvert-child": "introvertChildScreen.headerTitle",
        "breakupAndRebound": "breakupAndReboundScreen.title",
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
        if (originalDescriptionKey) {
          try {
            // Force language-specific translation
            const oldLocale = getCurrentLanguage();
            changeLanguage(lang);
            const translatedDescription = t(originalDescriptionKey);
            changeLanguage(oldLocale); // Restore original locale
            return translatedDescription !== originalDescriptionKey
              ? translatedDescription
              : getLocalizedREBTText(selectedREBT, "description");
          } catch {
            return getLocalizedREBTText(selectedREBT, "description"); // Fallback to original
          }
        }
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
        fullDescription: getLocalizedREBTText(selectedREBT, "description"),
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
          {rebtInterventions.map((rebt, index) => (
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
                <Text style={styles.addButtonText}>{t("rebtScreen.addToTherapyPlan")}</Text>
                <CustomIcon type="IO" name="add-circle" size={20} color="#7C3AED" />
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
                          {t("rebtScreen.frequency.practice", { frequency: option.key })}
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
                  <Text style={styles.cancelButtonText}>{t("rebtScreen.modal.cancel")}</Text>
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
});
