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
  const { locale, t } = useLanguage(); // Use language context
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
  
  const { condition } = route.params || {};

  // Language change detection - update condition name when language changes
  useEffect(() => {
    setConditionName(getConditionDisplayName(condition));
  }, [locale, condition]);

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
      "social-media-issues": "socialMediaIssuesScreen.headerTitle",
      "job-insecurity": "scanIntro.jobInsecurity.title",
      "professional-mental-health": "scanIntro.professionalMentalHealth.title",
      "sex-life": "scanIntro.sexLife.title",
      sleep: "scanIntro.sleep.title",
      "social-mental-health": "scanIntro.socialMentalHealth.title",
      "youngster-issues": "scanIntro.youngsterIssues.title",
      "adhd": "adhdScreen.title",
      "aggressive-behaviour": "aggressiveBehaviourScreen.title",
      "conduct-issues": "conductIssues.headerTitle",
      "eating-habits": "Eating Habits",
      "introvert-child": "Introvert Child",
      "friendship-and-relationship": "Frendship and Relationship",
      "breakupAndRebound": "Breakup and Rebound",
      "exam-stress-fear-of-failure": "examStressScreen.headerTitle",
      "substance-addiction": "substanceAddictionScreen.headerTitle",
      "self-esteem-and-self-identity": "selfEsteemAndSelfIdentityScreen.headerTitle",
      "trauma-loss-and-dreams": "traumaLossAndDreamsScreen.headerTitle",
      "unrealistic-beauty-standards": "unrealisticBeautyStandardsScreen.headerTitle",
      "abusive-language-back-answering": "Abusive Language & Back Answering",
      "dating-sites-and-complications": "Dating Sites and Complications",
      "gambling-and-gaming-addiction": "Gambling and Gaming Addiction",
      "internet-addiction": "Internet Addiction",
      "bullying": "Bullying",
      "bunking": "Bunking In School",
      "academic": "Academic Stress",
      "selfharm": "Self Harm",
      "learning-disability": "Learning Disability",

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
    const currentLocale = locale as "en" | "hi" | "mr";
    const originalText =
      field === "title" ? getYogaTitle(yoga) : getYogaDescription(yoga);
    
    // First, try dynamic translation if we have stored keys (for saved interventions that have this data)
    const yogaIndex = yogaInterventions.findIndex((r) => r === yoga);
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
      "internet-social-media": "internetSocialMedia",
      "professional-mental-health": "professionalMentalHealth",
      "sex-life": "sexLife",
      sleep: "sleep",
      "social-mental-health": "socialMentalHealth",
      stress: "stress",
      "suicidal-behavior": "suicidalBehavior",
      "youngster-issues": "youngsterIssues",
      "self-esteem-and-self-identity": "selfEsteemAndSelfIdentity",
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
    
    // For partial matching, apply only to descriptions to avoid breaking titles like
    // "Cat-Cow Stretch" being reduced to just "stretch".
    if (field === "description") {
      for (const [key, translation] of Object.entries(yogaTranslations)) {
        if (
          originalText.toLowerCase().includes(key.toLowerCase()) &&
          key.length > 5
        ) {
          console.log(
            `Partial match found for "${originalText}" with key "${key}"`,
          );
          const translated = translation[currentLocale] || originalText;
          return formatDescription(translated);
        }
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
    // Debug: log which condition is being requested
    try {
      console.debug && console.debug('[getYogaData] condition=', condition, 'locale=', locale);
    } catch (e) {
      /* ignore */
    }
    // Handle Eating Habits data from comprehensive JSON file
    if (condition === "eating-habits") {
      try {
        const eatingData = require("../../../../assets/data/behaviour/EatingHabits_comprehensive_data.json");
        const yogaCards = eatingData.interventions?.yogaMeditation?.cards || [];

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = yogaCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "No title",
          description:
            card.description?.[localeField] || card.description?.english ||
            "No description",
          xp: card.xp || 5,
        }));

        return {
          condition: "eating-habits",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Eating Habits yoga data:", error);
        return null;
      }
    }
     // Handle Introvet Child data from comprehensive JSON file
     if (condition === "introvert-child") {
      try {
        const IntrovertData = require("../../../../assets/data/behaviour/IntrovertChild_comprehensive_data.json");
        const yogaCards = IntrovertData.interventions?.yogaMeditation?.cards || [];

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = yogaCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "No title",
          description:
            card.description?.[localeField] || card.description?.english ||
            "No description",
          xp: card.xp || 5,
        }));

        return {
          condition: "introvert-child",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Introvet Child yoga data:", error);
        return null;
      }
    }
    // Handle Breakup & Rebound 
    const _condNorm = (condition || "").toString().toLowerCase();
    if (
      _condNorm === "breakupandrebounce" || // defensive, unlikely
      _condNorm === "breakupandrebound" ||
      _condNorm === "breakupandreb" ||
      _condNorm.includes("breakup") && _condNorm.includes("rebound") ||
      _condNorm === "breakupandrewbound" ||
      _condNorm === "breakupandrebound" ||
      _condNorm === "breakupandrebond" ||
      _condNorm === "breakupandrebound"
    ) {
      try {
        const raw = require("../../../../assets/data/Emotion/breakup_rebound_10_common_suggestions.json");

        // pick locale dataset if the file is localized at top-level
        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = raw[localeKey] || raw["en"] || raw;

        // Try multiple shapes where yoga items may appear
        const itemsCandidate =
          dataset?.yoga ||
          dataset?.yoga?.cards ||
          dataset?.interventions?.yogaMeditation?.cards ||
          raw?.interventions?.yogaMeditation?.cards ||
          raw?.interventions?.yoga?.cards ||
          raw?.interventions?.yoga ||
          raw?.yoga?.cards ||
          raw?.yoga ||
          dataset?.commonSuggestions ||
          null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items) || items.length === 0) {
          console.error("No Yoga data found for Breakup & Rebound", { candidate: itemsCandidate });
          try {
            // show a dev alert so it's obvious in the running app
            Alert.alert(
              "Debug: breakup&rebound",
              `no items candidate: ${JSON.stringify(itemsCandidate?.slice?.(0,3) || itemsCandidate || null)}\nlocaleKey: ${localeKey}`,
            );
          } catch (e) {}
          return null;
        }

        // Debug: log resolved items count and sample (dev-only)
        try {
          console.debug && console.debug('[getYogaData] breakup&rebound itemsCount=', items.length, 'sample=', items[0]);
        } catch (e) {}

        const interventions = items.map((item: any) => ({
          title: (item.title && typeof item.title === 'string') ? item.title : (item.title?.english || item.title?.en || item.title?.[localeKey] || item.CardTitle || item['Card Title'] || "No title"),
          description: (item.description && typeof item.description === 'string') ? item.description : (item.description?.english || item.description?.en || item.description?.[localeKey] || item.CardDescription || item['Card Description'] || "No description"),
          xp: item.xp || item.XP || 5,
        }));

        return {
          condition: "breakupAndRebound",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Breakup & Rebound yoga data:", error);
        return null;
      }
    }
    // Handle Conduct Issues data from comprehensive JSON file
    if (condition === "conduct-issues") {
      try {
        const conductData = require("../../../../assets/data/behaviour/ConductIssues_Complete_comprehensive_data.json");
        const yogaCards = conductData.interventions?.yogaAndMeditation?.cards || [];

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = yogaCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "No title",
          description:
            card.description?.[localeField] || card.description?.english ||
            "No description",
          xp: card.xp || 5,
        }));

        return {
          condition: "conduct-issues",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Conduct Issues yoga data:", error);
        return null;
      }
    }

    // Handle Abusive Language & Back Answering yoga data (localized at top-level)
    if (condition === "abusive-language-back-answering") {
      try {
        const AbusiveData = require("../../../../assets/data/Parenting/AbusiveLanguageBackAnswering_comprehensive_data.json");

        // Determine dataset for current locale
        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = AbusiveData[localeKey] || AbusiveData["en"];

        const yogaList = dataset?.yoga || []; // fallback if no dedicated yoga

        const interventions = yogaList.map((item: any) => ({
          title: item.title || "No title",
          description: item.description || "No description",
          xp: item.xp || 5,
        }));

        return {
          condition: "abusive-language-back-answering",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error(
          "Error loading Abusive Language & Back Answering yoga data:",
          error,
        );
        return null;
      }
    }
    // Handle Exam Stress yoga data (localized at top-level)
    if (condition === "exam-stress-fear-of-failure") {
      try {
        const ExamStessdata = require("../../../../assets/data/Parenting/ExamStressFearOfFailure_comprehensive_data.json");

        // Determine dataset for current locale
        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = ExamStessdata[localeKey] || ExamStessdata["en"];

        const yogaList = dataset?.yoga || []; // fallback if no dedicated yoga

        const interventions = yogaList.map((item: any) => ({
          title: item.title || "No title",
          description: item.description || "No description",
          xp: item.xp || 5,
        }));

        return {
          condition: "exam-stress-fear-of-failure",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error(
          "Error loading Exam Stress yoga data:",
          error,
        );
        return null;
      }
    }

    // Handle Parenting from Child's View yoga data (top-level locale)
    if (condition === "parenting-from-child-view") {
      try {
        const data = require("../../../../assets/data/Parenting/ChildPointOfView_comprehensive_data.json");
        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = data[localeKey] || data["en"];
        const list = dataset?.yoga; // fallback if no dedicated yoga

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
          intervention_type: "Yoga & Meditation Techniques",
          interventions,
        };
      } catch (error) {
        return null;
      }
    }

    // Handle Friendship & Relationship yoga data (single-language JSON)
    if (condition === "friendship-and-relationship") {
      try {
        const frData = require("../../../../assets/data/Emotion/friendship_relationship_interventions.json");

        const yogaList = frData?.yoga_meditation || []; // fallback if no dedicated yoga

        const interventions = yogaList.map((item: any) => ({
          title: item.title || "No title",
          description: item.description || "No description",
          xp: item.xp || 5,
        }));

        return {
          condition: "friendship-and-relationship",
          intervention_type: "Yoga & Meditation Techniques",
          interventions,
        };
      } catch (error) {
        console.error(
          "Error loading Friendship & Relationship yoga data:",
          error,
        );
        return null;
      }
    }

     // Handle Friendship & Relationship yoga data (single-language JSON)
    if (condition === "friendship-and-relationship") {
      try {
        const frData = require("../../../../assets/data/Emotion/friendship_relationship_interventions.json");

        const yogaList = frData?.yoga_meditation || []; // fallback if no dedicated yoga

        const interventions = yogaList.map((item: any) => ({
          title: item.title || "No title",
          description: item.description || "No description",
          xp: item.xp || 5,
        }));

        return {
          condition: "friendship-and-relationship",
          intervention_type: "Yoga & Meditation Techniques",
          interventions,
        };
      } catch (error) {
        console.error(
          "Error loading Friendship & Relationship yoga data:",
          error,
        );
        return null;
      }
    }

      // Handle Dating Sites and Complications yoga data (localized en/hi/mr)
      if (condition === "dating-sites-and-complications") {
        try {
          const data = require("../../../../assets/data/Emotion/dating_sites_complications_comprehensive_data.json");

          const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
          const yogaCards = data?.yoga?.cards || []; // fallback if no dedicated yoga

          const interventions = yogaCards.map((card: any) => ({
            title: card.title?.[localeKey] || card.title?.en || "No title",
            description:
              card.description?.[localeKey] || card.description?.en ||
              "No description",
            xp: card.xp || 5,
          }));

          return {
            condition: "dating-sites-and-complications",
            intervention_type: "Yoga & Meditation Techniques",
            interventions,
          };
        } catch (error) {
          console.error(
            "Error loading Dating Sites and Complications yoga data:",
            error,
          );
          return null;
        }
      }

      // // Handle Friendship and Relationship yoga data (localized en/hi/mr)
      // if (condition === "friendship-and-relationship") {
      //   try {
      //     const data = require("../../../../assets/data/Emotion/friendship_relationship_interventions.json");

      //     const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
      //     const yogaCards = data?.yoga?.cards || [];

      //     const interventions = yogaCards.map((card: any) => ({
      //       title: card.title?.[localeKey] || card.title?.en || "No title",
      //       description:
      //         card.description?.[localeKey] || card.description?.en ||
      //         "No description",
      //       xp: card.xp || 5,
      //     }));

      //     return {
      //       condition: "friendship-and-relationship",
      //       intervention_type: "Yoga & Meditation Techniques",
      //       interventions,
      //     };
      //   } catch (error) {
      //     console.error(
      //       "Error loading Friendship and Relationship yoga data:",
      //       error,
      //     );
      //     return null;
      //   }
      // }
    // Handle ADHD data from comprehensive JSON file
    if (condition === "adhd") {
      try {
        const adhdData = require("../../../../assets/data/behaviour/ADHD_comprehensive_data.json");
        const yogaCards = adhdData.interventions?.yoga?.cards || []; // fallback if no dedicated yoga
        
        // Map locale codes to ADHD data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi", 
          "mr": "marathi"
        };
        const adhdLocaleField = localeMap[locale] || "english";

        const interventions = yogaCards.map((card: any) => ({
          title: card.title?.[adhdLocaleField] || card.title?.english || "No title",
          description: card.description?.[adhdLocaleField] || card.description?.english || "No description",
          xp: card.xp || 5,
        }));

        return {
          condition: "ADHD",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading ADHD yoga data:", error);
        return null;
      }
    }

     // Handle Gaming and Gambling Addictions data from comprehensive JSON file
     if (condition === "gambling-and-gaming-addiction") {
      try {
        const darkData = require("../../../../assets/data/Internet & Social Media Issues/GamblingAndGamingAddiction_comprehensive_data.json");
        const yogaCards = darkData.interventions?.yoga?.cards || []; // fallback if no dedicated yoga
        
        // Map locale codes to ADHD data field names
        const localeMap: { [key: string]: string } = 
        { en: "english", hi: "hindi", mr: "marathi" };
        
        const localeField = localeMap[locale] || "english";
        const interventions = yogaCards.map((card: any) => ({
        title: card.title?.[localeField] || card.title?.english || "No title",
        description: card.description?.[localeField] || card.description?.english || "No description",
        xp: card.xp || 5,
        }));

        return {
          condition: "gambling-and-gaming-addiction",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Gaming and Gambling Addictions data yoga data:", error);
        return null;
      }
    }
     // Handle Porn Addiction data from comprehensive JSON file
     if (condition === "porn-addiction") {
      try {
        const pornData = require("../../../../assets/data/Internet & Social Media Issues/PornAddiction_comprehensive_data.json");
        const yogaCards = pornData.interventions?.yogaAndMeditation?.cards || []; // fallback if no dedicated yoga
        
        // Map locale codes to ADHD data field names
        const localeMap: { [key: string]: string } = 
        { en: "english", hi: "hindi", mr: "marathi" };
        
        const localeField = localeMap[locale] || "english";
        const interventions = yogaCards.map((card: any) => ({
        title: card.title?.[localeField] || card.title?.english || "No title",
        description: card.description?.[localeField] || card.description?.english || "No description",
        xp: card.xp || 5,
        }));

        return {
          condition: "porn-addiction",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Porn Addiction yoga data:", error);
        return null;
      }
    }

    // Handle Self Care & Hygine data from comprehensive JSON file
    if (condition === "self-care-hygiene") {
      try {
        const InternetData = require("../../../../assets/data/behaviour/SelfCareHygiene_comprehensive_data.json");
        const yogaCards = InternetData?.yogaAndMeditation?.cards || []; // fallback if no dedicated yoga

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
        console.error("Error loading Self Care & Hygine yoga data:", error);
        return null;
      }
    }
    

    // Handle Internet Addiction data from comprehensive JSON file
    if (condition === "internet-addiction") {
      try {
        const InternetData = require("../../../../assets/data/Internet & Social Media Issues/InternetAddiction_comprehensive_data.json");
        const yogaCards = InternetData?.yoga?.cards || []; // fallback if no dedicated yoga

        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const interventions = yogaCards.map((card: any) => ({
          title: card.title?.[localeKey] || card.title?.en || "No title",
          description:
            card.description?.[localeKey] || card.description?.en ||
            "No description",
          xp: card.xp || 5,
        }));

        return {
          condition: "internet-addiction",
          intervention_type: "Yoga & Meditation Techniques",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Internet Addiction yoga data:", error);
        return null;
      }
    }

    // Handle Aggressive Behaviour data from comprehensive JSON file
    if (condition === "aggressive-behaviour") {
      try {
        const aggressiveData = require("../../../../assets/data/behaviour/AggressiveBehaviour_comprehensive_data.json");
        const yogaCards = aggressiveData.interventions?.yogaAndMeditation?.cards || [];
        
        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi", 
          "mr": "marathi"
        };
        const localeField = localeMap[locale] || "english";

        const interventions = yogaCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "No title",
          description: card.description?.[localeField] || card.description?.english || "No description",
          xp: card.xp || 5,
        }));

        return {
          condition: "Aggressive Behaviour",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Aggressive Behaviour yoga data:", error);
        return null;
      }
    }

    // Handle Self-Esteem & Identity Yoga data
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
          return cat === "yoga" || cat === "y-o-g-a";
        });

        if (!cbtItems || cbtItems.length === 0) {
          console.error("No Yoga data found in Self-Esteem & Identity data");
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
          intervention_type: "Yoga",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Self-Esteem & Identity CBT data:", error);
        return null;
      }
    }

    

    // handle Social Media Issues data from comprehensive JSON file for YOGA
    if (condition === "social-media-issues") {
      try {
        const data = require(
          "../../../../assets/data/Internet & Social Media Issues/SocialMediaComprehensiveData.json",
        );

        // interventions is an object in this file; prefer the yoga.cards array
        const itemsCandidate =
          data?.interventions?.yoga?.cards ||
          data?.interventions?.yoga ||
          data?.interventions?.yogaMeditation?.cards ||
          data?.interventions?.yogaMeditation ||
          data?.interventions?.commonSuggestions?.cards ||
          data?.interventions?.commonSuggestions ||
          data?.interventions ||
          // data?.socialMediaIssuesScreen?.strategies?.yoga?.rebtSuggestionsList ||
          data?.strategies?.yoga?.yogaSuggestionList ||
          null;

        // If itemsCandidate is an object with a `cards` array, resolve that
        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No Yoga data array found in Social Media Issues data", {
            interventions: data?.interventions,
          });
          return null;
        }

        // Debug: report items count
        try {
          console.debug && console.debug('[getYogaData] social-media-issues itemsCount=', items.length, 'sample=', items[0]);
        } catch (e) {}

        // Normalize locale and map to the field names used in these JSON files
        const localeKey = (locale || "").slice(0, 2);
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
        const localeFieldMap: { [k: string]: string } = { en: "english", hi: "hindi", mr: "marathi" };
        const localeField = localeFieldMap[lang] || "english";

        // Map card shape (title/description objects keyed by language)
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
          condition: "social-media-issues",
          intervention_type: "Yoga",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Social Media Issues Yoga data:", error);
        return null;
      }
    }

    // Handle Trauma loss and dreams data from comprehensive JSON file for YOGA
    if (condition === "trauma-loss-and-dreams") {
      try {
        const data = require(
          "../../../../assets/data/Emotion/trauma_loss_dreams_10_common_suggestions.json",
        );

        const items = (() => {
          // direct array
          if (Array.isArray(data?.interventions)) return data.interventions;

          // interventions as an object - try several possible keys/shapes
          if (data?.interventions && typeof data.interventions === "object") {
            const interventionsObj: any = data.interventions;
            const candidateKeys = [
              "yoga",
              "Yoga",
              "yogaMeditation",
              "yogaAndMeditation",
              "yogaMeditations",
              "commonSuggestions",
              "YogaMeditation",
            ];

            for (const key of candidateKeys) {
              const node = interventionsObj[key];
              if (!node) continue;

              if (Array.isArray(node)) return node;
              if (Array.isArray(node.cards)) return node.cards;

              // languages node may contain suggestions/cards
              const languages = node.languages || node.language || node;
              const localeKeyInner = (locale || "").slice(0, 2);
              const langInner = ["en", "hi", "mr"].includes(localeKeyInner) ? localeKeyInner : "en";
              const langNode = languages[langInner] || languages["en"] || languages["english"] || null;

              if (langNode) {
                if (Array.isArray(langNode.suggestions)) return langNode.suggestions;
                if (Array.isArray(langNode.cards)) return langNode.cards;
                if (Array.isArray(langNode.yoga)) return langNode.yoga;
              }

              if (Array.isArray(node.suggestions)) return node.suggestions;
            }
          }

          // check top-level yoga/yoga.cards
          if (Array.isArray(data?.yoga)) return data.yoga;
          if (Array.isArray(data?.yoga?.cards)) return data.yoga.cards;

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
          console.error("No Yoga data array found in Trauma, Loss and Dreams data", {
            interventions: data?.interventions,
          });
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
          const titleObj = item.title || item.Title || item.heading || {};
          const descObj = item.description || item.Description || item.body || {};

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
          intervention_type: "Yoga",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Trauma, Loss and Dreams Yoga data:", error);
        return null;
      }
    }

    // handle Unrealistic Beauty Standards data from comprehensive JSON file for Yoga
    if (condition === "unrealistic-beauty-standards") {
      try {
        const data = require(
          "../../../../assets/data/Emotion/unrealistic_beauty_standards_10_common_suggestions.json",
        );

        // Prefer interventions.yoga.cards, then commonSuggestions.cards, then fallbacks
        const itemsCandidate =
          data?.interventions?.yoga?.cards ||
          data?.interventions?.yoga ||
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
          console.error("No Yoga data array found in Unrealistic Beauty Standards data");
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
          intervention_type: "Yoga",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Unrealistic Beauty Standards Yoga data:", error);
        return null;
      }
    }

    // handle Substance Addiction data from comprehensive JSON file for Yoga
    if (condition === "substance-addiction") {
      try {
        const data = require(
          "../../../../assets/data/behaviour/SubstanceAddiction_comprehensive_data.json",
        );

        // Prefer interventions.yoga.cards, then yoga, then other common shapes
        const itemsCandidate =
          data?.interventions?.yoga?.cards ||
          data?.interventions?.yoga ||
          data?.interventions?.yogaAndMeditation?.cards ||
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
          console.error("No Yoga data array found in Substance Addiction data");
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
          condition: "substance-addiction",
          intervention_type: "Yoga",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Substance Addiction Yoga data:", error);
        return null;
      }
    }

    // Handle Bunking data from comprehensive JSON file for Yoga
    if (condition === "bullying") {
      try {
        const data = require("../../../../assets/data/Parenting/BullyingInSchool.json");
        const itemsCandidate = data?.interventions?.yoga?.cards || data?.interventions?.yoga || data?.interventions?.yogaAndMeditation?.cards || data?.interventions?.yogaAndMeditation || data?.interventions?.cards || data?.interventions || null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No Yoga data array found in Suicidal Behaviour data");
          return null;
        }

        const localeKey = (locale || "").slice(0, 2);
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
        const localeFieldMap: { [k: string]: string } = { en: "english", hi: "hindi", mr: "marathi" };
        const localeField = localeFieldMap[lang] || "english";

        const interventions = items.map((item: any) => ({
          title: (item.title && typeof item.title === 'string') ? item.title : (item.title?.[localeField] || item.title?.english || item.CardTitle || item['Card Title'] || "No title"),
          description: (item.description && typeof item.description === 'string') ? item.description : (item.description?.[localeField] || item.description?.english || item.CardDescription || item['Card Description'] || "No description"),
          xp: item.xp || item.XP || 5,
        }));

        return {
          condition: "bullying",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Bullying yoga data:", error);
        return null;
      }
    }

    // Handle Suicidal Behaviour data from comprehensive JSON file for Yoga
    if (condition === "suicidal-behavior") {
      try {
        const raw = require("../../../../assets/data/behaviour/Suicidal_Behaviour_comprehensive_data.json");

        // prefer locale-rooted dataset if present (some comprehensive files have top-level en/hi/mr)
        const localeKey = (locale || "").slice(0, 2);
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
        const dataset = raw[lang] || raw["en"] || raw;

        const itemsCandidate =
          dataset?.interventions?.yoga?.cards ||
          dataset?.interventions?.yoga ||
          dataset?.interventions?.yogaAndMeditation?.cards ||
          dataset?.interventions?.yogaAndMeditation ||
          dataset?.interventions?.cards ||
          dataset?.interventions ||
          raw?.interventions?.yoga?.cards ||
          raw?.interventions?.yoga ||
          raw?.yoga?.cards ||
          raw?.yoga ||
          null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items) || items.length === 0) {
          console.error("No Yoga data array found in Suicidal Behaviour data", { candidate: itemsCandidate });
          return null;
        }

        const localeFieldMap: { [k: string]: string } = { en: "english", hi: "hindi", mr: "marathi" };
        const localeField = localeFieldMap[lang] || "english";

        const interventions = items.map((item: any) => ({
          title: (item.title && typeof item.title === 'string') ? item.title : (item.title?.[localeField] || item.title?.english || item.CardTitle || item['Card Title'] || "No title"),
          description: (item.description && typeof item.description === 'string') ? item.description : (item.description?.[localeField] || item.description?.english || item.CardDescription || item['Card Description'] || "No description"),
          xp: item.xp || item.XP || 5,
        }));

        return {
          condition: "suicidal-behavior",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Suicidal Behaviour yoga data:", error);
        return null;
      }
    }

    // Handle Bunking In School data from comprehensive JSON file for Yoga
    if (condition === "bunking") {
      try {
        const data = require("../../../../assets/data/Parenting/Bunking_School_comprehensive_data.json");
        const itemsCandidate = data?.interventions?.yoga?.cards || data?.interventions?.yoga || data?.interventions?.yogaAndMeditation?.cards || data?.interventions?.yogaAndMeditation || data?.interventions?.cards || data?.interventions || null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No Yoga data array found in Bunking In School data");
          return null;
        }

        const localeKey = (locale || "").slice(0, 2);
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
        const localeFieldMap: { [k: string]: string } = { en: "english", hi: "hindi", mr: "marathi" };
        const localeField = localeFieldMap[lang] || "english";

        const interventions = items.map((item: any) => ({
          title: (item.title && typeof item.title === 'string') ? item.title : (item.title?.[localeField] || item.title?.english || item.CardTitle || item['Card Title'] || "No title"),
          description: (item.description && typeof item.description === 'string') ? item.description : (item.description?.[localeField] || item.description?.english || item.CardDescription || item['Card Description'] || "No description"),
          xp: item.xp || item.XP || 5,
        }));

        return {
          condition: "bunking",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Bunking In School yoga data:", error);
        return null;
      }
    }

    // Handle Academic data from comprehensive JSON file for Yoga
    if (condition === "academic") {
      try {
        const data = require("../../../../assets/data/Parenting/Academic_Stress_comprehensive_data.json");
        const itemsCandidate = data?.interventions?.yoga?.cards || data?.interventions?.yoga || data?.interventions?.yogaAndMeditation?.cards || data?.interventions?.yogaAndMeditation || data?.interventions?.cards || data?.interventions || null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No Yoga data array found in Academic Stress data");
          return null;
        }

        const localeKey = (locale || "").slice(0, 2);
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
        const localeFieldMap: { [k: string]: string } = { en: "english", hi: "hindi", mr: "marathi" };
        const localeField = localeFieldMap[lang] || "english";

        const interventions = items.map((item: any) => ({
          title: (item.title && typeof item.title === 'string') ? item.title : (item.title?.[localeField] || item.title?.english || item.CardTitle || item['Card Title'] || "No title"),
          description: (item.description && typeof item.description === 'string') ? item.description : (item.description?.[localeField] || item.description?.english || item.CardDescription || item['Card Description'] || "No description"),
          xp: item.xp || item.XP || 5,
        }));

        return {
          condition: "academic",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Academic Stress yoga data:", error);
        return null;
      }
    }

        // Handle Academic data from comprehensive JSON file for Yoga
    if (condition === "selfharm") {
      try {
        const data = require("../../../../assets/data/Parenting/Academic_Stress_comprehensive_data.json");
        const itemsCandidate = data?.interventions?.yoga?.cards || data?.interventions?.yoga || data?.interventions?.yogaAndMeditation?.cards || data?.interventions?.yogaAndMeditation || data?.interventions?.cards || data?.interventions || null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No Yoga data array found in Self Harm data");
          return null;
        }

        const localeKey = (locale || "").slice(0, 2);
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
        const localeFieldMap: { [k: string]: string } = { en: "english", hi: "hindi", mr: "marathi" };
        const localeField = localeFieldMap[lang] || "english";

        const interventions = items.map((item: any) => ({
          title: (item.title && typeof item.title === 'string') ? item.title : (item.title?.[localeField] || item.title?.english || item.CardTitle || item['Card Title'] || "No title"),
          description: (item.description && typeof item.description === 'string') ? item.description : (item.description?.[localeField] || item.description?.english || item.CardDescription || item['Card Description'] || "No description"),
          xp: item.xp || item.XP || 5,
        }));

        return {
          condition: "selfharm",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Self Harm yoga data:", error);
        return null;
      }
    }

    // Handle Learning Disability data from comprehensive JSON file for Yoga
    if (condition === "learning-disability") {
      try {
        const data = require("../../../../assets/data/Parenting/Learning_Disability_comprehensive_data.json");
        const itemsCandidate = data?.interventions?.yoga?.cards || data?.interventions?.yoga || data?.interventions?.yogaAndMeditation?.cards || data?.interventions?.yogaAndMeditation || data?.interventions?.cards || data?.interventions || null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No Yoga data array found in Learning Disability data");
          return null;
        }

        const localeKey = (locale || "").slice(0, 2);
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
        const localeFieldMap: { [k: string]: string } = { en: "english", hi: "hindi", mr: "marathi" };
        const localeField = localeFieldMap[lang] || "english";

        const interventions = items.map((item: any) => ({
          title: (item.title && typeof item.title === 'string') ? item.title : (item.title?.[localeField] || item.title?.english || item.CardTitle || item['Card Title'] || "No title"),
          description: (item.description && typeof item.description === 'string') ? item.description : (item.description?.[localeField] || item.description?.english || item.CardDescription || item['Card Description'] || "No description"),
          xp: item.xp || item.XP || 5,
        }));

        return {
          condition: "learning-disability",
          intervention_type: "Yoga & Meditation Techniques",
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Learning Disability yoga data:", error);
        return null;
      }
    }


    // Check if we have translations for this condition
    const translationKeyMap: { [key: string]: string } = {
      "anger-management": "angerManagement",
      addictions: "addictions",
      "common-psychological-issues": "commonPsychologicalIssues",
      "environment-issues": "environmentIssues",
      "family-relationship": "familyRelationship",
      "financial-mental-health": "financialMentalHealth",
      "social-media-issues": "socialMediaIssues",
      "general-physical-fitness": "generalPhysicalFitness",
      "internet-dependence": "internetDependence",
      "internet-social-media": "internetSocialMedia",
      "job-insecurity": "jobInsecurity",
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
      "anger-management": require("../../../../assets/data/Mind Tools/data/anger-management/yoga.json"),
      stress: require("../../../../assets/data/Mind Tools/data/stress/yoga.json"),
      addictions: require("../../../../assets/data/Mind Tools/data/addictions/yoga.json"),
      "general-physical-fitness": require("../../../../assets/data/Mind Tools/data/general-physical-fitness/yoga.json"),
      "suicidal-behavior": require("../../../../assets/data/Mind Tools/data/suicidal-behavior/yoga.json"),
      "common-psychological-issues": require("../../../../assets/data/Mind Tools/data/common-psychological-issues/yoga.json"),
      "family-relationship": require("../../../../assets/data/Mind Tools/data/family-relationship/yoga.json"),
      "internet-dependence": require("../../../../assets/data/Mind Tools/data/internet-dependence/yoga.json"),
      "environment-issues": require("../../../../assets/data/Mind Tools/data/environment-issues/yoga.json"),
      "financial-mental-health": require("../../../../assets/data/Mind Tools/data/financial-mental-health/yoga.json"),
      "internet-social-media": require("../../../../assets/data/Mind Tools/data/internet-social-media/yoga.json"),
      "professional-mental-health": require("../../../../assets/data/Mind Tools/data/professional-mental-health/yoga.json"),
      "sex-life": require("../../../../assets/data/Mind Tools/data/sex-life/yoga.json"),
      sleep: require("../../../../assets/data/Mind Tools/data/sleep/yoga.json"),
      "social-mental-health": require("../../../../assets/data/Mind Tools/data/social-mental-health/yoga.json"),
      "youngster-issues": require("../../../../assets/data/Mind Tools/data/youngster-issues/yoga.json"),
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

     

      // Handle Parenting from Child's View yoga data (top-level locale)
      if (condition === "parenting-from-child-view") {
        try {
          const data = require("../../../../assets/data/Parenting/ChildPointOfView_comprehensive_data.json");
          const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
          const dataset = data[localeKey] || data["en"];
          const list = dataset?.yogaAndMeditation || [];

          const interventions = list.map((item: any) => ({
            title: item.title || "No title",
            description: item.description || "No description",
            xp: item.xp || 5,
          }));

          return {
            condition: "parenting-from-child-view",
            intervention_type: "Yoga & Meditation Techniques",
            interventions,
          };
        } catch (error) {
          console.error(
            "Error loading Parenting from Child's View yoga data:",
            error,
          );
          return null;
        }
      }

      // Handle Parenting from Parents' View yoga data (top-level locale)
      if (condition === "parenting-from-parents-view") {
        try {
          const data = require("../../../../assets/data/Parenting/ParentsPointOfView_comprehensive_data.json");
          const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
          const dataset = data[localeKey] || data["en"];
          const list = dataset?.yogaMeditation || [];

          const interventions = list.map((item: any) => ({
            title: item.title || "No title",
            description: item.description || "No description",
            xp: item.xp || 5,
          }));

          return {
            condition: "parenting-from-parents-view",
            intervention_type: "Yoga & Meditation Techniques",
            interventions,
          };
        } catch (error) {
          console.error(
            "Error loading Parenting from Parents View yoga data:",
            error,
          );
          return null;
        }
      }
  console.debug && console.debug('[loadYogaInterventions] loading for condition=', condition, 'locale=', locale);
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
          "social-media-issues": "socialMediaIssues",
        "professional-mental-health": "professionalMentalHealth",
        "sex-life": "sexLife",
        sleep: "sleep",
        "social-mental-health": "socialMentalHealth",
        stress: "stress",
        "suicidal-behavior": "suicidalBehavior",
        "youngster-issues": "youngsterIssues",
        "self-esteem-and-self-identity": "selfEsteemAndSelfIdentity",
        "trauma-loss-and-dreams": "traumaLossAndDreams",
        "unrealistic-beauty-standards": "unrealisticBeautyStandards",
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
        "self-esteem-and-self-identity": "selfEsteemAndSelfIdentityScreen.headerTitle",
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
      
      // Create translation objects for all languages - simplified implementation
      const getTitleForLanguage = (lang: "en" | "hi" | "mr"): string => {
        if (originalTitleKey) {
          try {
            const translatedTitle = t(originalTitleKey);
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
        if (lang === "en") {
          return getYogaDescription(selectedYoga); // Always use original English text
        }
        // For other languages, use dynamic translation
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
        fullDescription: selectedYoga.description || "", // Save original English description
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
                accessibilityLabel={t("yogaScreen.modal.title")}
              >
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
                  accessibilityLabel={t("yogaScreen.modal.cancel")}
                >
                  <Text style={styles.cancelButtonText}>
                    {t("yogaScreen.modal.cancel")}
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
