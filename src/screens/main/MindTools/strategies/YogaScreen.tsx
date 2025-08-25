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
      "introvert-child": "introvertChildScreen.headerTitle",
      "self-care-hygiene": "selfCareHygieneScreen.headerTitle",
      "substance-addiction": "substanceAddictionScreen.headerTitle",
      "trauma-loss-and-dreams": "traumaLossAndDreamsScreen.headerTitle",
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
    const currentLocale = getCurrentLanguage() as "en" | "hi" | "mr";
    const originalText =
      field === "title" ? getYogaTitle(yoga) : getYogaDescription(yoga);
    
    // If we have pre-translated content from comprehensive data files (Card Title/Card Description),
    // return it directly without applying additional translation logic
    if (yoga["Card Title"] || yoga["Card Description"]) {
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
      "unrealistic-beauty-standards",
      "dark-web-onlyfans"
    ];
    
    // For comprehensive data conditions, return the original text directly (it's already translated)
    if (comprehensiveDataConditions.includes(condition)) {
      return field === "description" ? formatDescription(originalText) : originalText;
    }
    
    // Only try dynamic translation for conditions that have translation keys
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
    
    // DISABLED: Partial matching and word translation to prevent title/description truncation
    // These features were causing issues where:
    // - "Guided Meditation" was truncated to just "meditation"
    // - "Practice Regularly" was truncated to just "practice"
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

  // Get translated yoga data or fall back to static JSON files
  const getYogaData = (condition: string): YogaData | null => {
    // Check if we have translations for this condition
    const translationKeyMap: { [key: string]: string } = {
      "anger-management": "angerManagement",
      addictions: "addictions",
      "common-psychological-issues": "commonPsychologicalIssues",
      "environment-issues": "environmentIssues",
      "family-relationship": "familyRelationship",
      "friendship-and-relationship": "friendshipAndRelationship",
      "self-esteem-and-self-identity": "selfEsteemAndSelfIdentity",
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
      adhd: "adhd", // Add ADHD to translation mapping
      "aggressive-behaviour": "aggressiveBehaviour", // Add aggressive behaviour to translation mapping
      "conduct-issues": "conductIssues", // Add conduct issues to translation mapping
      "introvert-child": "introvertChild", // Add introvert child to translation mapping
      "substance-addiction": "substanceAddiction", // Add substance addiction to translation mapping
      "breakupAndRebound": "breakupAndRebound", // Add breakup and rebound to translation mapping
      "trauma-loss-and-dreams": "traumaLossAndDreams", // Add trauma, loss and dreams to translation mapping
      "unrealistic-beauty-standards": "unrealisticBeautyStandards", // Add unrealistic beauty standards to translation mapping
      "gambling-and-gaming-addiction": "gamblingAndGamingAddiction", // Add gambling and gaming addiction to translation mapping
      "internet-addiction": "internetAddiction", // Add internet addiction to translation mapping
    };

    const translationKey = translationKeyMap[condition];
    
    // Special handling for Friendship and Relationship interventions
    if (condition === "friendship-and-relationship") {
      try {
        const friendshipData = require("../../../../assets/data/Emotion/friendship_relationship_interventions.json");
        if (friendshipData?.translations) {
          const currentLanguage = getCurrentLanguage();
          const languageData = friendshipData.translations[currentLanguage];
          
          if (languageData?.yoga_meditation) {
            const interventions = languageData.yoga_meditation.map((item: any) => ({
              "Issue Name": "Friendship and Relationship",
              "Intervention Type": "Secondary",
              "Intervention Sub Type": "Yoga And Meditation Techniques",
              "Card Title": item.title || "Untitled",
              "Card Description": item.description || "No description",
              xp: item.xp || 5,
              title: item.title || "Untitled",
              description: item.description || "No description",
            }));

            return {
              condition: "friendship-and-relationship",
              intervention_type: "Yoga & Meditation",
              interventions: interventions,
            };
          }
        }
      } catch (error) {
        console.error("Error loading Friendship and Relationship yoga data:", error);
      }
    }
    
    // Special handling for Self-esteem and Self-identity interventions
    if (condition === "self-esteem-and-self-identity") {
      try {
        const selfEsteemData = require("../../../../assets/data/Emotion/self_esteem_self_identity_interventions.json");
        if (selfEsteemData?.interventions) {
          const currentLanguage = getCurrentLanguage();
          
          // Filter interventions by category "Yoga"
          const yogaInterventions = selfEsteemData.interventions
            .filter((item: any) => item.category === "Yoga")
            .map((item: any) => ({
              "Issue Name": "Self-esteem and Self-identity",
              "Intervention Type": "Secondary",
              "Intervention Sub Type": "Yoga And Meditation Techniques",
              "Card Title": item.translations[currentLanguage]?.title || item.translations.en?.title || "Untitled",
              "Card Description": item.translations[currentLanguage]?.description || item.translations.en?.description || "No description",
              xp: item.xp || 5,
              title: item.translations[currentLanguage]?.title || item.translations.en?.title || "Untitled",
              description: item.translations[currentLanguage]?.description || item.translations.en?.description || "No description",
            }));

          return {
            condition: "self-esteem-and-self-identity",
            intervention_type: "Yoga & Meditation",
            interventions: yogaInterventions,
          };
        }
      } catch (error) {
        console.error("Error loading Self-esteem and Self-identity yoga data:", error);
      }
    }
    
    // Special handling for Self-Care Hygiene - use the comprehensive data file
    if (condition === "self-care-hygiene") {
      try {
        const selfCareHygieneData = require("../../../../assets/data/behaviour/SelfCareHygiene_comprehensive_data.json");
        if (selfCareHygieneData && selfCareHygieneData.interventions && selfCareHygieneData.interventions.yogaAndMeditation) {
          const { cards } = selfCareHygieneData.interventions.yogaAndMeditation;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Self-Care Hygiene data format to the expected format
          const interventions = cards.map((card: any) => ({
            "Issue Name": "Self-Care Hygiene",
            "Intervention Type": "Secondary",
            "Intervention Sub Type": "Yoga And Meditation Techniques",
            "Card Title": card.title[currentLang],
            "Card Description": card.description[currentLang],
            xp: card.xp,
          }));

          return {
            condition: "self-care-hygiene",
            intervention_type: "Yoga & Meditation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Self-Care Hygiene comprehensive yoga data:", error);
      }
    }
    
    // Special handling for Introvert Child - use the comprehensive data file
    if (condition === "introvert-child") {
      try {
        const introvertChildData = require("../../../../assets/data/behaviour/IntrovertChild_comprehensive_data.json");
        if (introvertChildData && introvertChildData.interventions && introvertChildData.interventions.yogaMeditation) {
          const { cards } = introvertChildData.interventions.yogaMeditation;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Introvert Child data format to the expected format
          const interventions = cards.map((card: any) => ({
            "Issue Name": "Introvert Child",
            "Intervention Type": "Primary",
            "Intervention Sub Type": "Yoga And Meditation Techniques",
            "Card Title": card.title[currentLang],
            "Card Description": card.description[currentLang],
            xp: card.xp,
          }));

          return {
            condition: "introvert-child",
            intervention_type: "Yoga & Meditation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Introvert Child comprehensive yoga data:", error);
      }
    }

    // Special handling for Substance Addiction - use the comprehensive data file
    if (condition === "substance-addiction") {
      try {
        const substanceAddictionData = require("../../../../assets/data/behaviour/SubstanceAddiction_comprehensive_data.json");
        if (substanceAddictionData && substanceAddictionData.yogaAndMeditation) {
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Substance Addiction data format to the expected format
          const interventions = substanceAddictionData.yogaAndMeditation.map((item: any) => ({
            "Issue Name": "Substance Addiction",
            "Intervention Type": "Primary",
            "Intervention Sub Type": "Yoga And Meditation Techniques",
            "Card Title": item.title[currentLang],
            "Card Description": item.description[currentLang],
            xp: item.xp,
          }));

          return {
            condition: "substance-addiction",
            intervention_type: "Yoga & Meditation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Substance Addiction comprehensive yoga data:", error);
      }
    }
    
    // Special handling for ADHD - use the comprehensive data file
    if (condition === "adhd") {
      try {
        const adhdData = require("../../../../assets/data/behaviour/ADHD_comprehensive_data.json");
        if (adhdData && adhdData.interventions && adhdData.interventions.yoga) {
          const { cards } = adhdData.interventions.yoga;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive ADHD data format to the expected format
          const interventions = cards.map((card: any) => ({
            "Issue Name": "ADHD",
            "Intervention Type": "Secondary",
            "Intervention Sub Type": "Yoga And Meditation Techniques",
            "Card Title": card.title[currentLang],
            "Card Description": card.description[currentLang],
            xp: card.xp,
          }));

          return {
            condition: "adhd",
            intervention_type: "Yoga & Meditation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading ADHD comprehensive yoga data:", error);
      }
    }
    
    // Special handling for Conduct Issues - use the comprehensive data file
    if (condition === "conduct-issues") {
      try {
        const conductData = require("../../../../assets/data/behaviour/ConductIssues_Complete_comprehensive_data.json");
        if (conductData && conductData.interventions && conductData.interventions.yogaAndMeditation) {
          const { cards } = conductData.interventions.yogaAndMeditation;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Conduct Issues data format to the expected format
          const interventions = cards.map((card: any) => ({
            "Issue Name": "Conduct Issues",
            "Intervention Type": "Secondary",
            "Intervention Sub Type": "Yoga And Meditation Techniques",
            "Card Title": card.title[currentLang],
            "Card Description": card.description[currentLang],
            xp: card.xp,
          }));

          return {
            condition: "conduct-issues",
            intervention_type: "Yoga & Meditation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Conduct Issues comprehensive yoga data:", error);
      }
    }
    
    // Special handling for Dark Web and OnlyFans - use the comprehensive data file
    if (condition === "dark-web-onlyfans") {
      try {
        const darkWebData = null // require commented due to space in path;
        if (darkWebData && darkWebData.interventions && darkWebData.interventions.yoga) {
          const { cards } = darkWebData.interventions.yoga;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Dark Web and OnlyFans data format to the expected format
          const interventions = cards.map((card: any) => ({
            "Issue Name": "Dark Web and OnlyFans",
            "Intervention Type": "Secondary",
            "Intervention Sub Type": "Yoga And Meditation Techniques",
            "Card Title": card.title[currentLang],
            "Card Description": card.description[currentLang],
            xp: card.xp,
          }));

          return {
            condition: "dark-web-onlyfans",
            intervention_type: "Yoga & Meditation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Dark Web and OnlyFans comprehensive yoga data:", error);
      }
    }
    
    // Special handling for Aggressive Behaviour - use the comprehensive data file
    if (condition === "aggressive-behaviour") {
      try {
        const aggressiveData = require("../../../../assets/data/behaviour/AggressiveBehaviour_comprehensive_data.json");
        if (aggressiveData && aggressiveData.interventions && aggressiveData.interventions.yogaAndMeditation) {
          const { cards } = aggressiveData.interventions.yogaAndMeditation;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Aggressive Behaviour data format to the expected format
          const interventions = cards.map((card: any) => ({
            "Issue Name": "Aggressive Behaviour",
            "Intervention Type": "Secondary",
            "Intervention Sub Type": "Yoga And Meditation Techniques",
            "Card Title": card.title[currentLang],
            "Card Description": card.description[currentLang],
            xp: card.xp,
          }));

          return {
            condition: "aggressive-behaviour",
            intervention_type: "Yoga & Meditation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Aggressive Behaviour comprehensive yoga data:", error);
      }
    }
    
    // Special handling for Eating Habits - use the comprehensive data file
    if (condition === "eating-habits") {
      try {
        const eatingHabitsData = require("../../../../assets/data/behaviour/EatingHabits_comprehensive_data.json");
        if (eatingHabitsData && eatingHabitsData.interventions && eatingHabitsData.interventions.yogaMeditation) {
          const { cards } = eatingHabitsData.interventions.yogaMeditation;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Eating Habits data format to the expected format
          const interventions = cards.map((card: any) => ({
            "Issue Name": "Eating Habits",
            "Intervention Type": "Secondary",
            "Intervention Sub Type": "Yoga And Meditation Techniques",
            "Card Title": card.title[currentLang],
            "Card Description": card.description[currentLang],
            xp: card.xp,
          }));

          return {
            condition: "eating-habits",
            intervention_type: "Yoga & Meditation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Eating Habits comprehensive yoga data:", error);
      }
    }
    
    // Special handling for Gambling and Gaming Addiction - use the comprehensive data file
    if (condition === "gambling-and-gaming-addiction") {
      try {
        const gamblingData = null // require commented due to space in path;
        if (gamblingData && gamblingData.interventions && gamblingData.interventions.yoga) {
          const { cards } = gamblingData.interventions.yoga;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Gambling and Gaming Addiction data format to the expected format
          const interventions = cards.map((card: any) => ({
            "Issue Name": "Gambling and Gaming Addiction",
            "Intervention Type": "Secondary",
            "Intervention Sub Type": "Yoga And Meditation Techniques",
            "Card Title": card.title[currentLang],
            "Card Description": card.description[currentLang],
            xp: card.xp,
          }));

          return {
            condition: "gambling-and-gaming-addiction",
            intervention_type: "Yoga & Meditation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Gambling and Gaming Addiction comprehensive yoga data:", error);
      }
    }
    
    // Special handling for Internet Addiction - use the comprehensive data file
    if (condition === "internet-addiction") {
      try {
        const internetData = null // require commented due to space in path;
        if (internetData?.yoga?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "en",
            hi: "hi",
            mr: "mr",
          };
          const dataLanguage = languageMap[currentLanguage] || "en";
          
          const interventions = internetData.yoga.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.en || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.en || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: "internet-addiction",
            intervention_type: "Yoga",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Internet Addiction comprehensive yoga data:", error);
      }
    }
    
    // Special handling for Porn Addiction - use the comprehensive data file
    if (condition === "porn-addiction") {
      try {
        const pornData = null // require commented due to space in path;
        if (pornData?.yoga?.cards) {
          const currentLanguage = getCurrentLanguage();
          const languageMap: { [key: string]: string } = {
            en: "en",
            hi: "hi",
            mr: "mr",
          };
          const dataLanguage = languageMap[currentLanguage] || "en";
          
          const interventions = pornData.yoga.cards.map((card: any) => ({
            title: card.title?.[dataLanguage] || card.title?.en || "Untitled",
            description: card.description?.[dataLanguage] || card.description?.en || "No description",
            xp: card.xp || 0,
          }));
          
          return {
            condition: "porn-addiction",
            intervention_type: "Yoga",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Porn Addiction comprehensive yoga data:", error);
      }
    }
    
    // Special handling for Breakup and Rebound - use the comprehensive data file
    if (condition === "breakupAndRebound") {
      try {
        const breakupReboundData = require("../../../../assets/data/Emotion/breakup_rebound_10_common_suggestions.json");
        if (breakupReboundData && breakupReboundData.yogaAndMeditation && breakupReboundData.yogaAndMeditation.techniques) {
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the breakup rebound yoga data format to the expected format
          const interventions = breakupReboundData.yogaAndMeditation.techniques.map((item: any) => ({
            "Issue Name": "Breakup and Rebound",
            "Intervention Type": "Secondary",
            "Intervention Sub Type": "Yoga And Meditation Techniques",
            "Card Title": item.title[currentLang],
            "Card Description": item.description[currentLang],
            xp: item.xp,
          }));

          return {
            condition: "breakupAndRebound",
            intervention_type: "Yoga & Meditation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Breakup and Rebound comprehensive yoga data:", error);
      }
    }
    
    // Special handling for Trauma, Loss and Dreams - create appropriate yoga interventions
    if (condition === "trauma-loss-and-dreams") {
      try {
        // Get current language for proper translation
        const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                          getCurrentLanguage() === "mr" ? "marathi" : "english";
        
        // Create yoga interventions specifically for trauma, loss and dreams
        const traumaYogaInterventions = [
          {
            title: {
              english: "Grounding Breathing Technique",
              hindi: "ग्राउंडिंग सांस तकनीक",
              marathi: "ग्राउंडिंग श्वसन तंत्र"
            },
            description: {
              english: "A calming breath practice that helps connect you to the present moment, reducing anxiety and trauma responses through deep, mindful breathing.",
              hindi: "एक शांत करने वाली सांस अभ्यास जो आपको वर्तमान क्षण से जोड़ने में मदद करती है, गहरी, सचेत सांस के माध्यम से चिंता और आघात प्रतिक्रियाओं को कम करती है।",
              marathi: "एक शांत करणारी श्वसन पद्धती जी तुम्हाला सध्याच्या क्षणाशी जोडण्यास मदत करते, खोल, जागरूक श्वासाद्वारे चिंता आणि आघात प्रतिक्रिया कमी करते."
            },
            xp: 3
          },
          {
            title: {
              english: "Trauma-Informed Yoga Poses",
              hindi: "आघात-सूचित योग आसन",
              marathi: "आघात-सूचित योग आसने"
            },
            description: {
              english: "Gentle yoga postures designed specifically for trauma recovery, focusing on safety, choice, and rebuilding trust with your body.",
              hindi: "आघात की वसूली के लिए विशेष रूप से डिज़ाइन किए गए कोमल योग आसन, सुरक्षा, पसंद, और अपने शरीर के साथ विश्वास पुनर्निर्माण पर ध्यान केंद्रित करते हैं।",
              marathi: "आघात पुनर्प्राप्तीसाठी खासून डिझाइन केलेली सौम्य योग मुद्रा, सुरक्षा, निवड आणि तुमच्या शरीराशी विश्वास पुनर्निर्माण यावर लक्ष केंद्रित करते."
            },
            xp: 4
          },
          {
            title: {
              english: "Restorative Meditation for Loss",
              hindi: "हानि के लिए पुनर्स्थापनात्मक ध्यान",
              marathi: "नुकसानासाठी पुनर्संचयी ध्यान"
            },
            description: {
              english: "A gentle meditation practice that helps process grief and loss, allowing emotions to flow while maintaining a sense of inner stability.",
              hindi: "एक कोमल ध्यान अभ्यास जो दुःख और हानि को संसाधित करने में मदद करता है, आंतरिक स्थिरता की भावना बनाए रखते हुए भावनाओं को प्रवाहित होने देता है।",
              marathi: "एक सौम्य ध्यान पद्धती जी दुःख आणि नुकसान प्रक्रिया करण्यास मदत करते, अंतर्गत स्थिरतेची भावना राखून भावनांना वाहू देते."
            },
            xp: 3
          },
          {
            title: {
              english: "Dream Processing Visualization",
              hindi: "स्वप्न प्रसंस्करण दृश्यकरण",
              marathi: "स्वप्न प्रक्रिया दृश्यीकरण"
            },
            description: {
              english: "A guided visualization technique that helps process and understand dreams, transforming disturbing dream content into healing insights.",
              hindi: "एक निर्देशित दृश्यकरण तकनीक जो स्वप्नों को संसाधित और समझने में मदद करती है, परेशान करने वाली स्वप्न सामग्री को उपचार अंतर्दृष्टि में बदलती है।",
              marathi: "एक मार्गदर्शित दृश्यीकरण तंत्र जे स्वप्नांना प्रक्रिया करून समजून घेण्यास मदत करते, त्रासदायक स्वप्न सामग्रीला उपचारात्मक अंतर्दृष्टीत रूपांतरित करते."
            },
            xp: 4
          },
          {
            title: {
              english: "Heart Chakra Healing Practice",
              hindi: "हृदय चक्र उपचार अभ्यास",
              marathi: "हृदय चक्र उपचार सराव"
            },
            description: {
              english: "A focused practice on opening and healing the heart chakra, helping to process emotional pain and restore capacity for love and connection.",
              hindi: "हृदय चक्र को खोलने और ठीक करने पर केंद्रित अभ्यास, भावनात्मक दर्द को संसाधित करने और प्रेम और संबंध की क्षमता को बहाल करने में मदत करता है।",
              marathi: "हृदय चक्र उघडण्यावर आणि बरे करण्यावर केंद्रित सराव, भावनिक वेदना प्रक्रिया करण्यास आणि प्रेम व जोडणीची क्षमता पुनर्संचयित करण्यास मदत करते."
            },
            xp: 5
          }
        ];
        
        // Transform to expected format
        const interventions = traumaYogaInterventions.map((item: any) => ({
          "Issue Name": "Trauma, Loss and Dreams",
          "Intervention Type": "Primary",
          "Intervention Sub Type": "Yoga And Meditation Techniques",
          "Card Title": item.title[currentLang],
          "Card Description": item.description[currentLang],
          xp: item.xp,
        }));

        return {
          condition: "trauma-loss-and-dreams",
          intervention_type: "Yoga & Meditation",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error creating Trauma, Loss and Dreams yoga data:", error);
      }
    }
    
    // Special handling for Unrealistic Beauty Standards - use our consolidated JSON file
    if (condition === "unrealistic-beauty-standards") {
      try {
        const beautyStandardsData = require("../../../../assets/data/Emotion/unrealistic_beauty_standards_10_common_suggestions.json");
        if (beautyStandardsData && beautyStandardsData.yogaAndMeditation) {
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the beauty standards yoga data format to the expected format
          const interventions = beautyStandardsData.yogaAndMeditation.techniques.map((item: any) => ({
            "Issue Name": "Unrealistic Beauty Standards",
            "Intervention Type": "Secondary",
            "Intervention Sub Type": "Yoga And Meditation Techniques",
            "Card Title": item.title[currentLang],
            "Card Description": item.description[currentLang],
            xp: item.xp,
            title: item.title[currentLang],
            description: item.description[currentLang],
          }));

          return {
            condition: "unrealistic-beauty-standards",
            intervention_type: "Yoga & Meditation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Unrealistic Beauty Standards yoga data:", error);
      }
    }
    
    // Special handling for Unrealistic Beauty Standards - use our consolidated JSON file
    if (condition === "unrealistic-beauty-standards") {
      try {
        const beautyStandardsData = require("../../../../assets/data/Emotion/unrealistic_beauty_standards_10_common_suggestions.json");
        if (beautyStandardsData && beautyStandardsData.yogaAndMeditation) {
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the beauty standards yoga data format to the expected format
          const interventions = beautyStandardsData.yogaAndMeditation.techniques.map((item: any) => ({
            "Issue Name": "Unrealistic Beauty Standards",
            "Intervention Type": "Secondary",
            "Intervention Sub Type": "Yoga And Meditation Techniques",
            "Card Title": item.title[currentLang],
            "Card Description": item.description[currentLang],
            xp: item.xp,
            title: item.title[currentLang],
            description: item.description[currentLang],
          }));

          return {
            condition: "unrealistic-beauty-standards",
            intervention_type: "Yoga & Meditation",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Unrealistic Beauty Standards yoga data:", error);
      }
    }
    
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
      "anger-management": { exercises: [] } as YogaData, // require commented due to space in path
      stress: { exercises: [] } as YogaData, // require commented due to space in path
      addictions: { exercises: [] } as YogaData, // require commented due to space in path
      "general-physical-fitness": { exercises: [] } as YogaData, // require commented due to space in path
      "suicidal-behavior": { exercises: [] } as YogaData, // require commented due to space in path
      "common-psychological-issues": { exercises: [] } as YogaData, // require commented due to space in path
      "family-relationship": { exercises: [] } as YogaData, // require commented due to space in path
      "internet-dependence": { exercises: [] } as YogaData, // require commented due to space in path
      "environment-issues": { exercises: [] } as YogaData, // require commented due to space in path
      "financial-mental-health": { exercises: [] } as YogaData, // require commented due to space in path
      "internet-social-media": { exercises: [] } as YogaData, // require commented due to space in path
      "professional-mental-health": { exercises: [] } as YogaData, // require commented due to space in path
      "sex-life": { exercises: [] } as YogaData, // require commented due to space in path
      sleep: { exercises: [] } as YogaData, // require commented due to space in path
      "social-mental-health": { exercises: [] } as YogaData, // require commented due to space in path
      "youngster-issues": { exercises: [] } as YogaData, // require commented due to space in path
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
        "friendship-and-relationship": "friendshipAndRelationship",
        "self-esteem-and-self-identity": "selfEsteemAndSelfIdentity",
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
        adhd: "adhd",
        "aggressive-behaviour": "aggressiveBehaviour",
        "conduct-issues": "conductIssues",
        "introvert-child": "introvertChild",
        "self-care-hygiene": "selfCareHygiene",
        "substance-addiction": "substanceAddiction",
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
        "friendship-and-relationship": "friendshipAndRelationshipScreen.headerTitle",
        "self-esteem-and-self-identity": "selfEsteemAndSelfIdentityScreen.headerTitle",
        "financial-mental-health": "scanIntro.financialMentalHealth.title",
        "internet-dependence": "scanIntro.internetDependence.title",
        "internet-social-media": "scanIntro.internetAndSocialMediaIssue.title",
        "professional-mental-health":
          "scanIntro.professionalMentalHealth.title",
        "sex-life": "scanIntro.sexLife.title",
        sleep: "scanIntro.sleep.title",
        "social-mental-health": "scanIntro.socialMentalHealth.title",
        "youngster-issues": "scanIntro.youngsterIssues.title",
        adhd: "adhdScreen.headerTitle",
        "aggressive-behaviour": "aggressiveBehaviourScreen.english.headerTitle",
        "conduct-issues": "conductIssues.headerTitle",
        "introvert-child": "introvertChildScreen.headerTitle",
        "self-care-hygiene": "selfCareHygieneScreen.headerTitle",
        "substance-addiction": "substanceAddictionScreen.headerTitle",
        "trauma-loss-and-dreams": "traumaLossAndDreamsScreen.headerTitle",
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
            const oldLocale = getCurrentLanguage();
            changeLanguage(lang);
            const translatedTitle = t(originalTitleKey);
            changeLanguage(oldLocale); // Restore original locale
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
            const oldLocale = getCurrentLanguage();
            changeLanguage(lang);
            const translatedDescription = t(originalDescriptionKey);
            changeLanguage(oldLocale); // Restore original locale
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
          <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
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
                <CustomIcon type="IO" name="flower-outline" size={12} color="#FFFFFF" />
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
                <CustomIcon type="IO" name="add-circle" size={20} color="#10B981" />
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
