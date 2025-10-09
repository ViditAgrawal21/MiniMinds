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
import { useLanguage } from "../../../../context/LanguageContext";

interface RelaxationIntervention {
  // Format from translation files (relaxationInterventions section)
  title: string;
  description: string;
  xp: number;
  // Keep the original translations object from comprehensive JSON assets when present
  translations?: {
    [lang: string]: {
      title?: string;
      description?: string;
      journalTemplate?: any;
    };
  };
  
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
  const { locale, t } = useLanguage(); // Use language context
  const [relaxationInterventions, setRelaxationInterventions] = useState<
    RelaxationIntervention[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [conditionName, setConditionName] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedRelaxation, setSelectedRelaxation] =
    useState<RelaxationIntervention | null>(null);
  const [modalAnimation] = useState(new Animated.Value(0));
  
  const { condition } = route.params || {};

  // Language change detection - update condition name when language changes
  useEffect(() => {
    setConditionName(getConditionDisplayName(condition));
    loadRelaxationInterventions(); // Reload interventions when language changes
  }, [locale, condition]);

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
      "social-media-issues": "socialMediaIssuesScreen.headerTitle",
      "job-insecurity": "scanIntro.jobInsecurity.title",
      "professional-mental-health": "scanIntro.professionalMentalHealth.title",
      "sex-life": "scanIntro.sexLife.title",
      sleep: "scanIntro.sleep.title",
      "social-mental-health": "scanIntro.socialMentalHealth.title",
      "youngster-issues": "scanIntro.youngsterIssues.title",
      "adhd": "adhdScreen.title",
      "eating-habits": "Eating Habits",
      "aggressive-behaviour": "aggressiveBehaviourScreen.title",
      "conduct-issues": "conductIssues.headerTitle",
      "introvert-child": "Introvert Child",
      "abusive-language-back-answering": "Abusive Language & Back Answering",
      "breakupAndRebound": "Breakup and Rebound",
      "trauma-loss-and-dreams": "Trauma, Loss and Dreams",
      "unrealistic-beauty-standards": "Unrealistic Beauty Standards",
      "substance-addiction": "scanIntro.substanceAddiction.title",
      "exam-stress-fear-of-failure": "examStressScreen.headerTitle",
      "friendship-and-relationship": "Frendship and Relationship",
      "gambling-and-gaming-addiction": "Gambling and Gaming Addiction",
      "internet-addiction": "Internet Addiction",
      "self-esteem-and-self-identity": "selfEsteemAndSelfIdentityScreen.headerTitle",
      "dating-sites-and-complications": "Dating Sites and Complications",
    };
    const translationKey = conditionKeyMap[condition];
    return translationKey ? t(translationKey) : condition;
  };

  // Get relaxation data from translation files instead of static JSON files
  const getRelaxationData = (condition: string): RelaxationData | null => {
    // Handle Eating Habits data from comprehensive data file
    if (condition === "eating-habits") {
      try {
        const eatingData = require("../../../../assets/data/behaviour/EatingHabits_comprehensive_data.json");
        const relaxationCards = eatingData.interventions?.relaxation?.cards;

        if (!relaxationCards || !Array.isArray(relaxationCards)) {
          console.error("No relaxation interventions found in Eating Habits data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = relaxationCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "",
          description:
            card.description?.[localeField] || card.description?.english || "",
          xp: card.xp || 0,
        }));

        return {
          condition: "eating-habits",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Eating Habits relaxation data:", error);
        return null;
      }
    }
     // Handle Introvert Child data from comprehensive data file
     if (condition === "introvert-child") {
      try {
        const IntrovertChildData = require("../../../../assets/data/behaviour/IntrovertChild_comprehensive_data.json");
        const relaxationCards = IntrovertChildData.interventions?.relaxation?.cards;

        if (!relaxationCards || !Array.isArray(relaxationCards)) {
          console.error("No relaxation interventions found in Introvert Child data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = relaxationCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "",
          description:
            card.description?.[localeField] || card.description?.english || "",
          xp: card.xp || 0,
        }));

        return {
          condition: "introvert-child",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Introvert Child relaxation data:", error);
        return null;
      }
    }

    // Handle Breakup & Rebound data from comprehensive data file
     if (condition === "breakupAndRebound") {
      try {
        const IntrovertChildData = require("../../../../assets/data/Emotion/breakup_rebound_10_common_suggestions.json");
        const relaxationCards = IntrovertChildData.interventions?.relaxation?.cards;

        if (!relaxationCards || !Array.isArray(relaxationCards)) {
          console.error("No relaxation interventions found in Breakup & Rebound data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = relaxationCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "",
          description:
            card.description?.[localeField] || card.description?.english || "",
          xp: card.xp || 0,
        }));

        return {
          condition: "breakupAndRebound",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Breakup & Rebound relaxation data:", error);
        return null;
      }
    }

    // Handle Conduct Issues data from comprehensive data file
    if (condition === "conduct-issues") {
      try {
        const conductData = require("../../../../assets/data/behaviour/ConductIssues_Complete_comprehensive_data.json");
        const relaxationCards = conductData.interventions?.relaxation?.cards;

        if (!relaxationCards || !Array.isArray(relaxationCards)) {
          console.error("No relaxation interventions found in Conduct Issues data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = relaxationCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "",
          description:
            card.description?.[localeField] || card.description?.english || "",
          xp: card.xp || 0,
        }));

        return {
          condition: "conduct-issues",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Conduct Issues relaxation data:", error);
        return null;
      }
    }
    // Handle ADHD data from ADHD comprehensive data file
    if (condition === "adhd") {
      try {
        const adhdData = require("../../../../assets/data/behaviour/ADHD_comprehensive_data.json");
        const relaxationCards = adhdData.interventions?.relaxation?.cards;
        
        if (!relaxationCards || !Array.isArray(relaxationCards)) {
          console.error("No relaxation interventions found in ADHD data");
          return null;
        }

        // Map locale codes to ADHD data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi", 
          "mr": "marathi"
        };
        const adhdLocaleField = localeMap[locale] || "english";
        
        const interventions = relaxationCards.map((card: any) => ({
          title: card.title?.[adhdLocaleField] || card.title?.english || "",
          description: card.description?.[adhdLocaleField] || card.description?.english || "",
          xp: card.xp || 0,
        }));
        
        return {
          condition: "adhd",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading ADHD relaxation data:", error);
        return null;
      }
    }

    // Handle Porn Addiction relaxation data (localized en/hi/mr)
    if (condition === "porn-addiction") {
      try {
        const data = require("../../../../assets/data/Internet & Social Media Issues/PornAddiction_comprehensive_data.json");
        const cards = data?.relaxation?.cards;

        if (!cards || !Array.isArray(cards)) {
          console.error("No relaxation interventions found in Porn Addiction data");
          return null;
        }

        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const interventions = cards.map((card: any) => ({
          title: card.title?.[localeKey] || card.title?.en || "",
          description:
            card.description?.[localeKey] || card.description?.en || "",
          xp: card.xp || 0,
        }));

        return {
          condition: "porn-addiction",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Porn Addiction relaxation data:", error);
        return null;
      }
    }

    // Handle Self Care & Hygine data from comprehensive JSON file
    if (condition === "self-care-hygiene") {
      try {
        const InternetData = require("../../../../assets/data/behaviour/SelfCareHygiene_comprehensive_data.json");
        const yogaCards = InternetData?.relaxation?.cards || []; // fallback if no dedicated yoga

        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const interventions = yogaCards.map((card: any) => ({
          title: card.title?.[localeKey] || card.title?.en || "No title",
          description:
            card.description?.[localeKey] || card.description?.en ||
            "No description",
          xp: card.xp || 5,
        }));

        return {
          condition: "self-care-hygiene",
          intervention_type: "Yoga & Meditation Techniques",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Self Care & Hygine relaxation data:", error);
        return null;
      }
    }

    // Handle Friendship and Relationship relaxation data (array-based file)
    if (condition === "friendship-and-relationship") {
      try {
        const data = require("../../../../assets/data/Emotion/friendship_relationship_interventions.json");
        const list = data?.relaxation; // this file stores an array directly

        if (!list || !Array.isArray(list)) {
          console.error("No relaxation interventions found in Friendship and Relationship data");
          return null;
        }

        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const interventions = list.map((item: any) => ({
          // Support both localized object and plain string values
          title:
            (typeof item.title === "string"
              ? item.title
              : item.title?.[localeKey] || item.title?.en) || "",
          description:
            (typeof item.description === "string"
              ? item.description
              : item.description?.[localeKey] || item.description?.en) || "",
          xp: item.xp || 0,
        }));

        return {
          condition: "friendship-and-relationship",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Friendship and Relationship relaxation data:", error);
        return null;
      }
    }

    

    // Handle Parenting from Child's View relaxation data (top-level locale)
    if (condition === "parenting-from-child-view") {
      try {
        const data = require("../../../../assets/data/Parenting/ChildPointOfView_comprehensive_data.json");
        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = data[localeKey] || data["en"];
        const list = dataset?.relaxationStrategies;

        if (!list || !Array.isArray(list)) {
          console.error(
            "No relaxation interventions found in Parenting from Child's View data",
          );
          return null;
        }

        const interventions = list.map((item: any) => ({
          title: item.title || "",
          description: item.description || "",
          xp: item.xp || 0,
        }));

        return {
          condition: "parenting-from-child-view",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error(
          "Error loading Parenting from Child's View relaxation data:",
          error,
        );
        return null;
      }
    }

     // Handle from Abusive Language and Back Answering relaxation data (top-level locale)
     if (condition === "abusive-language-back-answering") {
      try {
        const data = require("../../../../assets/data/Parenting/AbusiveLanguageBackAnswering_comprehensive_data.json");
        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = data[localeKey] || data["en"];
        const list = dataset?.relaxation;

        if (!list || !Array.isArray(list)) {
          console.error(
            "No relaxation interventions found in Abusive Language and Back Answering  data",
          );
          return null;
        }

        const interventions = list.map((item: any) => ({
          title: item.title || "",
          description: item.description || "",
          xp: item.xp || 0,
        }));

        return {
          condition: "abusive-language-back-answering",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error(
          "Error loading Abusive Language and Back Answering relaxation data:",
          error,
        );
        return null;
      }
    }

    // Handle from Exam Stress relaxation data (top-level locale)
     if (condition === "exam-stress-fear-of-failure") {
      try {
        const data = require("../../../../assets/data/Parenting/ExamStressFearOfFailure_comprehensive_data.json");
        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = data[localeKey] || data["en"];
        const list = dataset?.relaxation;

        if (!list || !Array.isArray(list)) {
          console.error(
            "No relaxation interventions found in Exam stress and fear of failure  data",
          );
          return null;
        }

        const interventions = list.map((item: any) => ({
          title: item.title || "",
          description: item.description || "",
          xp: item.xp || 0,
        }));

        return {
          condition: "exam-stress-fear-of-failure",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error(
          "Error loading Exam stress and fear of failure relaxation data:",
          error,
        );
        return null;
      }
    }

    // Handle from Dating Sites and Complications relaxation data (localized en/hi/mr in cards)
    if (condition === "dating-sites-and-complications") {
      try {
        const data = require("../../../../assets/data/Emotion/dating_sites_complications_comprehensive_data.json");
        const cards = data?.relaxation?.cards;

        if (!cards || !Array.isArray(cards)) {
          console.error(
            "No relaxation interventions found in Dating Sites and Complications data",
          );
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
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error(
          "Error loading Dating Sites and Complications relaxation data:",
          error,
        );
        return null;
      }
    }

    // Handle Parenting from Parents' View relaxation data (top-level locale)
    if (condition === "parenting-from-parents-view") {
      try {
        const data = require("../../../../assets/data/Parenting/ParentsPointOfView_comprehensive_data.json");
        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = data[localeKey] || data["en"];
        const list = dataset?.relaxationTechniques;

        if (!list || !Array.isArray(list)) {
          console.error(
            "No relaxation interventions found in Parenting from Parents View data",
          );
          return null;
        }

        const interventions = list.map((item: any) => ({
          title: item.title || "",
          description: item.description || "",
          xp: item.xp || 0,
        }));

        return {
          condition: "parenting-from-parents-view",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error(
          "Error loading Parenting from Parents View relaxation data:",
          error,
        );
        return null;
      }
    }
    // Handle Aggressive Behaviour data from comprehensive data file
    if (condition === "aggressive-behaviour") {
      try {
        const aggressiveData = require("../../../../assets/data/behaviour/AggressiveBehaviour_comprehensive_data.json");
        const relaxationCards = aggressiveData.interventions?.relaxation?.cards;
        
        if (!relaxationCards || !Array.isArray(relaxationCards)) {
          console.error("No relaxation interventions found in Aggressive Behaviour data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi", 
          "mr": "marathi"
        };
        const localeField = localeMap[locale] || "english";
        
        const interventions = relaxationCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "",
          description: card.description?.[localeField] || card.description?.english || "",
          xp: card.xp || 0,
        }));
        
        return {
          condition: "aggressive-behaviour",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Aggressive Behaviour relaxation data:", error);
        return null;
      }
    }

    // Handle Gambling and Gaming Addiction data from comprehensive data file
    if (condition === "gambling-and-gaming-addiction") {
      try {
        const aggressiveData = require("../../../../assets/data/Internet & Social Media Issues/GamblingAndGamingAddiction_comprehensive_data.json");
        const relaxationCards = aggressiveData.interventions?.relaxation?.cards;
        
        if (!relaxationCards || !Array.isArray(relaxationCards)) {
          console.error("No relaxation interventions found in Gambling and Gaming Addiction data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi", 
          "mr": "marathi"
        };
        const localeField = localeMap[locale] || "english";
        
        const interventions = relaxationCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "",
          description: card.description?.[localeField] || card.description?.english || "",
          xp: card.xp || 0,
        }));
        
        return {
          condition: "gambling-and-gaming-addiction",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Gambling and Gaming Addiction relaxation data:", error);
        return null;
      }
    }

    // Handle Parenting from Child's View relaxation data (top-level locale)
    if (condition === "parenting-from-child-view") {
      try {
        const data = require("../../../../assets/data/Parenting/ChildPointOfView_comprehensive_data.json");
        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = data[localeKey] || data["en"];
        const list = dataset?.relaxationStrategies; // fallback if no dedicated REBT

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
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        return null;
      }
    }

    // Handle Internet Addiction data from comprehensive data file
    if (condition === "internet-addiction") {
      try {
        const InternetData = require("../../../../assets/data/Internet & Social Media Issues/InternetAddiction_comprehensive_data.json");
        const relaxationCards = InternetData.relaxation?.cards; // fallback if no dedicated REBT

        if (!relaxationCards || !Array.isArray(relaxationCards)) {
          console.error("No relaxation interventions found in Internet Addiction data");
          return null;
        }

        const interventions = relaxationCards.map((card: any) => ({
          title: card.title?.[locale] || card.title?.en || "No title",
          description:
            card.description?.[locale] || card.description?.en ||
            "No description",
          xp: card.xp || 2,
        }));

        return {
          condition: "internet-addiction",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Internet Addiction data:", error);
        return null;
      }
    }


    // Handle Self-Esteem & Identity relaxation data
    if (condition === "self-esteem-and-self-identity") {
      try {
        const data = require(
          "../../../../assets/data/Emotion/self_esteem_self_identity_interventions.json",
        );

        const items = data.interventions;
        if (!items || !Array.isArray(items)) {
          console.error("No Relaxation array found in Self-Esteem & Identity data");
          return null;
        }

        // Normalize locale (handles values like 'en', 'en-US', etc.)
        const localeKey = (locale || "").slice(0, 2);
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";

        // Filter only Relaxation-category items from the array (case-insensitive)
        const relaxItems = items.filter((it: any) => {
          const cat = (it.category || "").toString().toLowerCase();
          return cat === "relaxation" || cat.includes("relax");
        });

        if (!relaxItems || relaxItems.length === 0) {
          console.error("No Relaxation interventions found in Self-Esteem & Identity data");
          return null;
        }

        const interventions = relaxItems.map((item: any) => {
          const translations = item.translations || {};
          const chosen = translations[lang] || translations["en"] || {};
          return {
            title: chosen.title || "",
            description: chosen.description || "",
            xp: item.xp || 0,
            translations: translations,
          } as RelaxationIntervention;
        });

        return {
          condition: "self-esteem-and-self-identity",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Self-Esteem & Identity Relaxation data:", error);
        return null;
      }
    }

    // Handle Social Media issues Relaxation data
    if (condition === "social-media-issues") {
      try {
        const data = require(
          "../../../../assets/data/Internet & Social Media Issues/SocialMediaComprehensiveData.json",
        );

        // The comprehensive file stores cards under interventions.relaxation.cards
        // but we support a few fallbacks just in case other shapes exist.
        const items =
          data?.interventions?.relaxation?.cards ||
          data?.interventions?.commonSuggestions?.cards ||
          data?.interventions?.rebt?.cards ||
          data?.socialMediaIssuesScreen?.strategies?.relaxation?.relaxationSuggestionList ||
          data?.strategies?.relaxation?.relaxationSuggestionList ||
          null;

        if (!items || !Array.isArray(items)) {
          console.error("No Relaxation interventions array found in Social Media Issues data");
          return null;
        }

        // Normalize locale (handles values like 'en', 'en-US', etc.)
        const localeKey = ((locale || "").slice(0, 2) || "en").toLowerCase();
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
        const localeFieldMap: { [k: string]: string } = { en: "english", hi: "hindi", mr: "marathi" };
        const localeField = localeFieldMap[lang] || "english";

        // Map items to RelaxationIntervention shape. Support both `translations`
        // objects and per-locale title/description keys (english/hindi/marathi).
        const interventions = items.map((item: any) => {
          if (item.translations && typeof item.translations === "object") {
            const translations = item.translations || {};
            const chosen = translations[lang] || translations[localeField] || translations["en"] || translations["english"] || {};
            return {
              title: chosen.title || chosen.heading || "",
              description: chosen.description || chosen.body || "",
              xp: item.xp || item.XP || 0,
              translations: translations,
            } as RelaxationIntervention;
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
          } as RelaxationIntervention;
        });

        return {
          condition: "social-media-issues",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Social Media Issues Relaxation data:", error);
        return null;
      }
    }

    // Handle Trauma, Loss and Dreams data from comprehensive JSON file for Common Suggestions
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
              interventionsObj["Relaxation"] ||
              interventionsObj["Relaxation"] ||
              interventionsObj["Relaxation"] ||
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
          console.error("No Relaxation data array found in Trauma, Loss and Dreams data");
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
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Trauma, Loss and Dreams Relaxation data:", error);
        return null;
      }
    }

    // handle Unrealistic Beauty Standards data from comprehensive JSON file for Relaxation
    if (condition === "unrealistic-beauty-standards") {
      try {
        const data = require(
          "../../../../assets/data/Emotion/unrealistic_beauty_standards_10_common_suggestions.json",
        );

        // Prefer interventions.relaxation.cards, then commonSuggestions.cards, then fallbacks
        const itemsCandidate =
          data?.interventions?.relaxation?.cards ||
          data?.interventions?.relaxation ||
          data?.interventions?.commonSuggestions?.cards ||
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
          console.error("No Relaxation data array found in Unrealistic Beauty Standards data");
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
              translations,
            } as RelaxationIntervention;
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
          } as RelaxationIntervention;
        });

        return {
          condition: "unrealistic-beauty-standards",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Unrealistic Beauty Standards Relaxation data:", error);
        return null;
      }
    }

    // handle Substance Addiction data from comprehensive JSON file for Relaxation
    if (condition === "substance-addiction") {
      try {
        const data = require(
          "../../../../assets/data/behaviour/SubstanceAddiction_comprehensive_data.json",
        );

        // Prefer interventions.relaxation.cards, then relaxation, then other common shapes
        const itemsCandidate =
          data?.interventions?.relaxation?.cards ||
          data?.interventions?.relaxation ||
          data?.interventions?.relaxationStrategies?.cards ||
          data?.interventions?.commonSuggestions?.cards ||
          data?.interventions?.cards ||
          data?.interventions ||
          data?.commonSuggestions ||
          data?.suggestions ||
          null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No Relaxation data array found in Substance Addiction data");
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
              xp: item.xp || item.XP || item?.xp || 0,
            } as RelaxationIntervention;
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
          } as RelaxationIntervention;
        });

        return {
          condition: "substance-addiction",
          intervention_type: "Relaxation",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Substance Addiction Relaxation data:", error);
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
      "internet-social-media": "internetAndSocialMediaIssue",
  "social-media-issues": "socialMediaIssues",
      "job-insecurity": "jobInsecurity",
      "professional-mental-health": "professionalMentalHealth",
      "sex-life": "sexLife",
      sleep: "sleep",
      "social-mental-health": "socialMentalHealth",
      "youngster-issues": "youngsterIssues",
      "self-esteem-and-self-identity": "selfEsteemAndSelfIdentity",
      "trauma-loss-and-dreams": "traumaLossAndDreams",
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
        "conduct-issues": "conductIssues",
        "environment-issues": "environmentIssues",
        "family-relationship": "familyRelationship",
        "financial-mental-health": "financialMentalHealth",
        "general-physical-fitness": "generalPhysicalFitness",
        "internet-dependence": "internetDependence",
        "internet-social-media": "internetAndSocialMediaIssue",
        "job-insecurity": "jobInsecurity",
        "professional-mental-health": "professionalMentalHealth",
        "sex-life": "sexLife",
        sleep: "sleep",
        "social-mental-health": "socialMentalHealth",
        stress: "stress",
        "suicidal-behavior": "suicidalBehavior",
        "youngster-issues": "youngsterIssues",
        "substance-addiction": "substanceAddiction",
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
        "job-insecurity": "scanIntro.jobInsecurity.title",
        "professional-mental-health":
          "scanIntro.professionalMentalHealth.title",
        "sex-life": "scanIntro.sexLife.title",
        sleep: "scanIntro.sleep.title",
        "social-mental-health": "scanIntro.socialMentalHealth.title",
        "youngster-issues": "scanIntro.youngsterIssues.title",
        "unrealistic-beauty-standards": "unrealisticBeautyStandards.headerTitle",
        "self-esteem-and-self-identity": "selfEsteemAndSelfIdentityScreen.headerTitle",
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
        if (lang === "en") {
          return getRelaxationDescription(selectedRelaxation); // Always use original English text
        }
        // For other languages, use dynamic translation
        return getLocalizedRelaxationText(selectedRelaxation, "description");
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
        fullDescription: selectedRelaxation.description || "", // Save original English description
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
    const currentLocale = locale as "en" | "hi" | "mr";
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
    // If this intervention came from a comprehensive asset and has translations, prefer them
    try {
      const assetTranslations = relaxation.translations || (relaxation as any).translations;
      if (assetTranslations) {
        const assetLocale = currentLocale || "en";
        const localized = assetTranslations[assetLocale] || assetTranslations[assetLocale.slice(0,2)] || assetTranslations["en"];
        if (localized && typeof localized === "object") {
          const value = field === "title" ? localized.title : localized.description;
          if (value && value.length > 0) {
            return field === "description" ? formatDescription(value) : value;
          }
        }
      }
    } catch (e) {
      // ignore and continue with other heuristics
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
    
    // For partial matching, be conservative - only match if the translation key is multi-word
    // This avoids returning very generic single-word translations like 'breathing' or 'practice'
    for (const [key, translation] of Object.entries(relaxationTranslations)) {
      const isMultiWord = key.trim().includes(" ");
      if (
        isMultiWord &&
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
    
    // Simplified word translation - only for single words and only for descriptions
    const trimmedText = originalText.trim();
    if (field === "description" && !trimmedText.includes(" ") && trimmedText.length > 3) {
      const wordTranslation =
        relaxationTranslations[
          trimmedText.toLowerCase() as keyof typeof relaxationTranslations
        ];
      if (wordTranslation) {
        const translated = wordTranslation[currentLocale] || originalText;
        return formatDescription(translated);
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
                accessibilityLabel={t("relaxationScreen.modal.title")}
              >
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
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel={`${option.key} Practice`}
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
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={t("relaxationScreen.modal.cancel")}
                >
                  <Text style={styles.cancelButtonText}>
                    {t("relaxationScreen.modal.cancel")}
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
