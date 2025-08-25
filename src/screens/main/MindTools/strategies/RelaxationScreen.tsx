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
    
    // DISABLED: Single-word translations that were causing title truncation issues
    // These were converting proper titles like "Yoga" to "yoga", "Exercise" to "exercise", etc.
    // The case-insensitive matching was problematic for ADHD data and other sources
    // that use proper capitalization in their titles.
    //
    // If single-word translations are needed in the future, they should:
    // 1. Preserve original capitalization when no translation is needed
    // 2. Only apply when the exact context requires translation
    // 3. Be more selective about which words need translation
    //
    // Commented out problematic translations:
    // meditation, breathing, relaxation, mindfulness, yoga, pranayama, asana,
    // visualization, therapy, technique, practice, exercise
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
      "friendship-and-relationship": "friendshipAndRelationshipScreen.headerTitle",
      "self-esteem-and-self-identity": "selfEsteemAndSelfIdentityScreen.headerTitle",
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
      "trauma-loss-and-dreams": "traumaLossAndDreamsScreen.headerTitle",
      "unrealistic-beauty-standards": "unrealisticBeautyStandardsScreen.headerTitle",
      "breakupAndRebound": "breakupAndReboundScreen.title",
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
      "friendship-and-relationship": "friendshipAndRelationship",
      "self-esteem-and-self-identity": "selfEsteemAndSelfIdentity",
      "internet-dependence": "internetDependence",
      "environment-issues": "environmentIssues",
      "financial-mental-health": "financialMentalHealth",
      "internet-social-media": "internetAndSocialMediaIssue",
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
    
    // Special handling for comprehensive data files (can proceed without translation key)
    if (condition === "friendship-and-relationship" || condition === "self-esteem-and-self-identity" || condition === "self-care-hygiene" || condition === "eating-habits" || condition === "introvert-child" || condition === "conduct-issues" || condition === "adhd" || condition === "aggressive-behaviour" || condition === "substance-addiction" || condition === "breakupAndRebound" || condition === "trauma-loss-and-dreams" || condition === "unrealistic-beauty-standards" || condition === "dark-web-onlyfans" || condition === "gambling-and-gaming-addiction" || condition === "internet-addiction" || condition === "porn-addiction") {
      // Continue to special handling sections below
    } else if (!translationKey) {
      console.error(`No translation key found for condition: ${condition}`);
      return null;
    }
    
    // Special handling for Friendship and Relationship interventions
    if (condition === "friendship-and-relationship") {
      try {
        const friendshipData = require("../../../../assets/data/Emotion/friendship_relationship_interventions.json");
        if (friendshipData?.translations) {
          const currentLanguage = getCurrentLanguage();
          const languageData = friendshipData.translations[currentLanguage];
          
          if (languageData?.relaxation) {
            const interventions = languageData.relaxation.map((item: any) => ({
              title: item.title || "Untitled",
              description: item.description || "No description",
              xp: item.xp || 5,
            }));

            return {
              condition: "friendship-and-relationship",
              intervention_type: "Relaxation",
              interventions: interventions,
            };
          }
        }
      } catch (error) {
        console.error("Error loading Friendship and Relationship relaxation data:", error);
      }
    }
    
    // Special handling for Self-esteem and Self-identity interventions
    if (condition === "self-esteem-and-self-identity") {
      try {
        const selfEsteemData = require("../../../../assets/data/Emotion/self_esteem_self_identity_interventions.json");
        if (selfEsteemData?.interventions) {
          const currentLanguage = getCurrentLanguage();
          
          // Filter interventions by category "Relaxation"
          const relaxationInterventions = selfEsteemData.interventions
            .filter((item: any) => item.category === "Relaxation")
            .map((item: any) => ({
              title: item.translations[currentLanguage]?.title || item.translations.en?.title || "Untitled",
              description: item.translations[currentLanguage]?.description || item.translations.en?.description || "No description",
              xp: item.xp || 5,
            }));

          return {
            condition: "self-esteem-and-self-identity",
            intervention_type: "Relaxation",
            interventions: relaxationInterventions,
          };
        }
      } catch (error) {
        console.error("Error loading Self-esteem and Self-identity relaxation data:", error);
      }
    }
    
    // Special handling for Self-Care Hygiene comprehensive data
    if (condition === "self-care-hygiene") {
      try {
        const selfCareHygieneData = require("../../../../assets/data/behaviour/SelfCareHygiene_comprehensive_data.json");
        if (selfCareHygieneData?.interventions?.relaxation?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const selfCareRelaxationCards = selfCareHygieneData.interventions.relaxation.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.english || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: translationKey || "self-care-hygiene",
            intervention_type: "Relaxation", 
            interventions: selfCareRelaxationCards,
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
        if (conductData?.interventions?.relaxation?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const conductRelaxationCards = conductData.interventions.relaxation.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.english || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: translationKey,
            intervention_type: "Relaxation", 
            interventions: conductRelaxationCards,
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
        if (adhdData?.interventions?.relaxation?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const adhdRelaxationCards = adhdData.interventions.relaxation.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.english || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: translationKey,
            intervention_type: "Relaxation", 
            interventions: adhdRelaxationCards,
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
        if (aggressiveData?.interventions?.relaxation?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const aggressiveRelaxationCards = aggressiveData.interventions.relaxation.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.english || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: translationKey,
            intervention_type: "Relaxation", 
            interventions: aggressiveRelaxationCards,
          };
        }
      } catch (error) {
        console.error("Error loading Aggressive Behaviour comprehensive data:", error);
      }
    }
    
    // Special handling for Eating Habits - use the comprehensive data file
    if (condition === "eating-habits") {
      try {
        const eatingHabitsData = require("../../../../assets/data/behaviour/EatingHabits_comprehensive_data.json");
        if (eatingHabitsData && eatingHabitsData.interventions && eatingHabitsData.interventions.relaxation) {
          const { cards } = eatingHabitsData.interventions.relaxation;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Eating Habits data format to the expected format
          const interventions = cards.map((card: any) => ({
            title: card.title[currentLang],
            description: card.description[currentLang],
            xp: card.xp,
          }));

          return {
            condition: translationKey || "eating-habits",
            intervention_type: "Relaxation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Eating Habits comprehensive relaxation data:", error);
      }
    }
    
    // Special handling for Introvert Child comprehensive data
    if (condition === "introvert-child") {
      try {
        const introvertChildData = require("../../../../assets/data/behaviour/IntrovertChild_comprehensive_data.json");
        if (introvertChildData?.interventions?.relaxation?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const introvertChildRelaxationCards = introvertChildData.interventions.relaxation.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.english || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: translationKey || "introvert-child",
            intervention_type: "Relaxation", 
            interventions: introvertChildRelaxationCards,
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
        if (substanceAddictionData?.relaxation) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const substanceAddictionRelaxationCards = substanceAddictionData.relaxation.map((item: any) => ({
            title: item.title?.[dataLanguage] || item.title?.english || "Untitled",
            description: item.description?.[dataLanguage] || item.description?.english || "No description",
            xp: item.xp || 0,
          }));
          
          return {
            condition: translationKey || "substance-addiction",
            intervention_type: "Relaxation", 
            interventions: substanceAddictionRelaxationCards,
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
        if (breakupReboundData?.relaxationTechniques?.techniques) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi", 
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const breakupReboundRelaxationCards = breakupReboundData.relaxationTechniques.techniques.map((item: any) => ({
            title: item.title?.[dataLanguage] || item.title?.english || "Untitled",
            description: item.description?.[dataLanguage] || item.description?.english || "No description",
            xp: item.xp || 0,
          }));
          
          return {
            condition: translationKey || "breakupAndRebound",
            intervention_type: "Relaxation",
            interventions: breakupReboundRelaxationCards,
          };
        }
      } catch (error) {
        console.error("Error loading Breakup and Rebound comprehensive data:", error);
      }
    }
    
    // Special handling for Trauma, Loss and Dreams - create appropriate relaxation techniques
    if (condition === "trauma-loss-and-dreams") {
      try {
        const currentLanguage = getCurrentLanguage();
        const languageMap: { [key: string]: string } = {
          en: "english",
          hi: "hindi", 
          mr: "marathi",
        };
        const dataLanguage = languageMap[currentLanguage] || "english";
        
        // Create relaxation techniques specifically for trauma, loss and dreams
        const traumaRelaxationTechniques = [
          {
            title: {
              english: "Progressive Muscle Relaxation for Trauma",
              hindi: "आघात के लिए प्रगतिशील मांसपेशी शिथिलीकरण",
              marathi: "आघातासाठी प्रगतीशील स्नायू शिथिलीकरण"
            },
            description: {
              english: "A gentle body-based relaxation technique that helps release trauma-related tension stored in muscles, promoting safety and grounding.",
              hindi: "एक कोमल शरीर-आधारित शिथिलीकरण तकनीक जो मांसपेशियों में संग्रहीत आघात-संबंधी तनाव को मुक्त करने में मदद करती है, सुरक्षा और ग्राउंडिंग को बढ़ावा देती है।",
              marathi: "एक सौम्य शरीर-आधारित शिथिलीकरण तंत्र जे स्नायूंमध्ये साठवलेल्या आघात-संबंधित तणावाला मुक्त करण्यास मदत करते, सुरक्षा आणि ग्राउंडिंगला प्रोत्साहन देते."
            },
            xp: 4
          },
          {
            title: {
              english: "Safe Place Visualization",
              hindi: "सुरक्षित स्थान दृश्यकरण",
              marathi: "सुरक्षित स्थान दृश्यीकरण"
            },
            description: {
              english: "A calming visualization exercise that creates an internal safe space, helping manage anxiety and provide comfort during difficult emotions.",
              hindi: "एक शांत करने वाला दृश्यकरण अभ्यास जो एक आंतरिक सुरक्षित स्थान बनाता है, चिंता का प्रबंधन करने और कठिन भावनाओं के दौरान आराम प्रदान करने में मदत करता है।",
              marathi: "एक शांत करणारा दृश्यीकरण अभ्यास जो अंतर्गत सुरक्षित जागा निर्माण करतो, चिंता व्यवस्थापित करण्यास आणि कठीण भावनांदरम्यान आराम प्रदान करण्यास मदत करतो."
            },
            xp: 3
          },
          {
            title: {
              english: "Grief and Loss Breathing Space",
              hindi: "दुःख और हानि सांस स्थान",
              marathi: "दुःख आणि नुकसान श्वसन जागा"
            },
            description: {
              english: "A mindful breathing practice specifically designed to create space for grief, allowing natural healing while maintaining emotional stability.",
              hindi: "दुःख के लिए स्थान बनाने के लिए विशेष रूप से डिज़ाइन किया गया एक सचेत सांस अभ्यास, भावनात्मक स्थिरता बनाए रखते हुए प्राकृतिक उपचार की अनुमति देता है।",
              marathi: "दुःखासाठी जागा निर्माण करण्यासाठी खासून डिझाइन केलेली जागरूक श्वसन पद्धती, भावनिक स्थिरता राखून नैसर्गिक उपचाराला अनुमती देते."
            },
            xp: 3
          },
          {
            title: {
              english: "Body Scan for Trauma Recovery",
              hindi: "आघात वसूली के लिए शरीर स्कैन",
              marathi: "आघात पुनर्प्राप्तीसाठी शरीर स्कॅन"
            },
            description: {
              english: "A gentle body awareness practice that helps reconnect with physical sensations safely, rebuilding trust and comfort in your body.",
              hindi: "एक कोमल शरीर जागरूकता अभ्यास जो शारीरिक संवेदनाओं के साथ सुरक्षित रूप से पुन: जुड़ने में मदद करता है, आपके शरीर में विश्वास और आराम का पुनर्निर्माण करता है।",
              marathi: "एक सौम्य शारीरिक जागरूकता सराव जो शारीरिक संवेदनांशी सुरक्षितपणे पुन्हा जोडण्यास मदत करतो, तुमच्या शरीरात विश्वास आणि आराम पुनर्निर्माण करतो."
            },
            xp: 4
          },
          {
            title: {
              english: "Dream Integration Relaxation",
              hindi: "स्वप्न एकीकरण शिथिलीकरण",
              marathi: "स्वप्न एकीकरण शिथिलीकरण"
            },
            description: {
              english: "A relaxation technique designed to process and integrate dream content, transforming nightmares into healing imagery and peaceful sleep.",
              hindi: "स्वप्न सामग्री को संसाधित और एकीकृत करने के लिए डिज़ाइन की गई एक शिथिलीकरण तकनीक, दुःस्वप्न को उपचार छवियों और शांतिपूर्ण नींद में बदलती है।",
              marathi: "स्वप्न सामग्री प्रक्रिया करून एकत्रित करण्यासाठी डिझाइन केलेले शिथिलीकरण तंत्र, दुःस्वप्नांना उपचारात्मक प्रतिमा आणि शांत झोपेत रूपांतरित करते."
            },
            xp: 5
          }
        ];
        
        const traumaRelaxationCards = traumaRelaxationTechniques.map((item: any) => ({
          title: item.title?.[dataLanguage] || item.title?.english || "Untitled",
          description: item.description?.[dataLanguage] || item.description?.english || "No description",
          xp: item.xp || 0,
        }));
        
        return {
          condition: translationKey || "trauma-loss-and-dreams",
          intervention_type: "Relaxation",
          interventions: traumaRelaxationCards,
        };
      } catch (error) {
        console.error("Error creating Trauma, Loss and Dreams relaxation data:", error);
      }
    }
    
    // Special handling for Unrealistic Beauty Standards - use our consolidated JSON file
    if (condition === "unrealistic-beauty-standards") {
      try {
        const beautyStandardsData = require("../../../../assets/data/Emotion/unrealistic_beauty_standards_10_common_suggestions.json");
        if (beautyStandardsData && beautyStandardsData.relaxationTechniques) {
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the beauty standards relaxation data format to the expected format
          const interventions = beautyStandardsData.relaxationTechniques.techniques.map((item: any) => ({
            title: item.title[currentLang],
            description: item.description[currentLang],
            xp: item.xp,
          }));

          return {
            condition: "unrealistic-beauty-standards",
            intervention_type: "Relaxation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Unrealistic Beauty Standards relaxation data:", error);
      }
    }
    
    // Special handling for Gambling and Gaming Addiction - use the comprehensive data file
    if (condition === "gambling-and-gaming-addiction") {
      try {
        const gamblingData = null // require commented due to space in path;
        if (gamblingData && gamblingData.interventions && gamblingData.interventions.relaxation) {
          const { cards } = gamblingData.interventions.relaxation;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Gambling and Gaming Addiction data format to the expected format
          const interventions = cards.map((card: any) => ({
            title: card.title[currentLang],
            description: card.description[currentLang],
            xp: card.xp,
          }));

          return {
            condition: "gambling-and-gaming-addiction",
            intervention_type: "Relaxation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Gambling and Gaming Addiction relaxation data:", error);
      }
    }
    
    // Special handling for Internet Addiction - use the comprehensive data file
    if (condition === "internet-addiction") {
      try {
        const internetData = null // require commented due to space in path;
        if (internetData?.relaxation?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "en",
            hi: "hi",
            mr: "mr",
          };
          const dataLanguage = languageMap[currentLanguage] || "en";
          
          const interventions = internetData.relaxation.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.en || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.en || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: "internet-addiction",
            intervention_type: "Relaxation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Internet Addiction relaxation data:", error);
      }
    }
    
    // Special handling for Porn Addiction - use the comprehensive data file
    if (condition === "porn-addiction") {
      try {
        const pornData = null // require commented due to space in path;
        if (pornData?.relaxation?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "en",
            hi: "hi",
            mr: "mr",
          };
          const dataLanguage = languageMap[currentLanguage] || "en";
          
          const interventions = pornData.relaxation.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.en || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.en || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: "porn-addiction",
            intervention_type: "Relaxation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Porn Addiction relaxation data:", error);
      }
    }
    
    // Special handling for Dark Web and OnlyFans comprehensive data
    if (condition === "dark-web-onlyfans") {
      try {
        const darkWebData = null // require commented due to space in path;
        if (darkWebOnlyFansData?.interventions?.relaxation?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const dataLanguage = languageMap[currentLanguage] || "english";
          
          const darkWebRelaxationCards = darkWebOnlyFansData.interventions.relaxation.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.english || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.english || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: translationKey || "dark-web-onlyfans",
            intervention_type: "Relaxation", 
            interventions: darkWebRelaxationCards,
          };
        }
      } catch (error) {
        console.error("Error loading Dark Web and OnlyFans comprehensive data:", error);
      }
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
      interventions: interventions,
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
        "friendship-and-relationship": "friendshipAndRelationship",
        "self-esteem-and-self-identity": "selfEsteemAndSelfIdentity",
        adhd: "adhd",
        "aggressive-behaviour": "aggressiveBehaviour",
        "conduct-issues": "conductIssues",
        "eating-habits": "eatingHabits",
        "introvert-child": "introvertChild",
        "self-care-hygiene": "selfCareHygiene",
        "substance-addiction": "substanceAddiction",
        "trauma-loss-and-dreams": "traumaLossAndDreams",
        "unrealistic-beauty-standards": "unrealisticBeautyStandards",
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
        "friendship-and-relationship": "friendshipAndRelationshipScreen.headerTitle",
        "self-esteem-and-self-identity": "selfEsteemAndSelfIdentityScreen.headerTitle",
        adhd: "adhdScreen.headerTitle",
        "aggressive-behaviour": "aggressiveBehaviourScreen.english.headerTitle",
        "conduct-issues": "conductIssues.headerTitle",
        "eating-habits": "eatingHabitsScreen.headerTitle",
        "introvert-child": "introvertChildScreen.headerTitle",
        "self-care-hygiene": "selfCareHygieneScreen.headerTitle",
        "substance-addiction": "substanceAddictionScreen.headerTitle",
        "trauma-loss-and-dreams": "traumaLossAndDreamsScreen.headerTitle",
        "unrealistic-beauty-standards": "unrealisticBeautyStandardsScreen.headerTitle",
        "breakupAndRebound": "breakupAndReboundScreen.title",
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
            // Force language-specific translation
            const oldLocale = getCurrentLanguage();
            changeLanguage(lang);
            const translatedDescription = t(originalDescriptionKey);
            changeLanguage(oldLocale); // Restore original locale
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
    
    // If we have pre-translated content from comprehensive data files (Card Title/Card Description),
    // return it directly without applying additional translation logic
    if (relaxation["Card Title"] || relaxation["Card Description"]) {
      return field === "description" ? formatDescription(originalText) : originalText;
    }
    
    // Skip dynamic translation attempts for conditions that use comprehensive JSON data files
    const comprehensiveDataConditions = [
      "friendship-and-relationship",
      "self-esteem-and-self-identity", 
      "self-care-hygiene",
      "eating-habits",
      "introvert-child",
      "conduct-issues",
      "adhd",
      "aggressive-behaviour",
      "substance-addiction",
      "breakupAndRebound",
      "trauma-loss-and-dreams",
      "unrealistic-beauty-standards"
    ];
    
    // For comprehensive data conditions, return the original text directly (it's already translated)
    if (comprehensiveDataConditions.includes(condition)) {
      return field === "description" ? formatDescription(originalText) : originalText;
    }
    
    // Only try dynamic translation for conditions that have translation keys
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
    
    // DISABLED: Partial matching and word translation to prevent title/description truncation
    // These features were causing issues where:
    // - "Progressive Muscle Relaxation" was truncated to just "relaxation"
    // - "Breathing Exercise" was truncated to just "exercise"
    // - "Meditation Practice" was truncated to just "meditation" or "practice"
    // - Descriptions were being cut down to single words
    // 
    // If partial matching is needed in the future, it should be implemented with:
    // 1. Exact phrase matching only (not word-within-phrase)
    // 2. Whitelist of specific phrases that are safe to translate
    // 3. More sophisticated logic to avoid truncation
    
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
