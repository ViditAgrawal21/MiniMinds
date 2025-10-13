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
import CustomIcon from "../../../../components/CustomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguage } from "../../../../context/LanguageContext";

interface Intervention {
  title?: string;
  description?: string;
  "Card Title"?: string;
  "Card Description"?: string;
  xp: number;
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

interface SuggestionsData {
  metadata?: {
    condition: string;
    intervention_type: string;
    total_interventions: number;
  };
  condition?: string;
  intervention_type?: string;
  interventions: Intervention[];
}

export default function CommonSuggestionsScreen({ navigation, route }: any) {
  const { locale, t } = useLanguage(); // Use language context
  const [suggestions, setSuggestions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);
  const [conditionName, setConditionName] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Intervention | null>(null);
  const [modalAnimation] = useState(new Animated.Value(0));

  const { condition } = route.params || {};

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
      setSelectedSuggestion(null);
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
      "special-needs": "Dealing with Children of Special Needs",
  "self-esteem-and-self-identity": "selfEsteemAndSelfIdentityScreen.headerTitle",
      // Miniminds conditions
     "abusive-language-back-answering": "Abusive Language & Back Answering",
     "exam-stress-fear-of-failure": "examStressScreen.headerTitle",
     "dark-web-onlyfans": "Dark Web and OnlyFans",
     "friendship-and-relationship": "friendshipAndRelationshipScreen.headerTitle",
    //  "dating-sites-and-complications":"datingsitesandcomplicationsScreen.headerTitle",
     "gambling-and-gaming-addiction": "Gambling and Gaming Addiction",
      "internet-addiction": "Internet Addiction",
      "self-care-hygiene": "Self-care Hygiene",
      "substance-addiction": "Substance Addiction",
      "trauma-loss-and-dreams": "Trauma, Loss and Dreams",
      "unrealistic-beauty-standards": "Unrealistic Beauty Standards",
      "anxiety":"Anxiety Issues",
      "loneliness-depression":"Loneliness & Depression",
      "good-parenting":"Good Parenting",
      "eating-habits": "Eating Habits",
      "introvert-child": "Introvert Child",
      "breakupAndRebound": "Breakup and Rebound",
      // "internet-addiction": "Internet Addiction",
      "bullying": "Bullying",
      "dating-sites-and-complications": "Dating Sites and Complications",
      "bunking": "Bunking In School",
      "academic": "Academic Stress",
      "selfharm": "Self Harm",
      "learning-disability": "Learning Disabilities",
    };
    const translationKey = conditionKeyMap[condition];
    return translationKey ? t(translationKey) : condition;
  };

  // Get translated suggestions data or fall back to static JSON files
  const getSuggestionsData = (condition: string): SuggestionsData | null => {
    // Handle Eating Habits data from comprehensive data file
    if (condition === "eating-habits") {
      try {
        const eatingData = require("../../../../assets/data/behaviour/EatingHabits_comprehensive_data.json");
        const commonSuggestionsCards = eatingData.interventions?.commonSuggestions?.cards;

        if (!commonSuggestionsCards || !Array.isArray(commonSuggestionsCards)) {
          console.error("No common suggestions found in Eating Habits data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = commonSuggestionsCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "No title",
          description:
            card.description?.[localeField] || card.description?.english ||
            "No description",
          xp: card.xp || 2,
        }));

        return {
          metadata: {
            condition: "eating-habits",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Eating Habits common suggestions data:", error);
        return null;
      }
    }

    // Handle Parenting from Child's View REBT data (top-level locale)
    if (condition === "parenting-from-child-view") {
      try {
        const data = require("../../../../assets/data/Parenting/ChildPointOfView_comprehensive_data.json");
        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = data[localeKey] || data["en"];
        const list = dataset?.commonSuggestions; // fallback if no dedicated common suggestions

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
          intervention_type: "10 Common Suggestions",
          interventions,
        };
      } catch (error) {
        return null;
      }
    }

    // Handle Breakup and Rebound data from comprehensive data file
     if (condition === "breakupAndRebound") {
      try {
        const IntrovertChildData = require("../../../../assets/data/Emotion/breakup_rebound_10_common_suggestions.json");
        const commonSuggestionsCards = IntrovertChildData.interventions?.commonSuggestions?.cards;

        if (!commonSuggestionsCards || !Array.isArray(commonSuggestionsCards)) {
          console.error("No common suggestions found in Breakup and Rebound data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = commonSuggestionsCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "No title",
          description:
            card.description?.[localeField] || card.description?.english ||
            "No description",
          xp: card.xp || 2,
        }));

        return {
          metadata: {
            condition: "breakupAndRebound",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Breakup and Rebound common suggestions data:", error);
        return null;
      }
    }
     // Handle Introvert Child data from comprehensive data file
     if (condition === "introvert-child") {
      try {
        const IntrovertChildData = require("../../../../assets/data/behaviour/IntrovertChild_comprehensive_data.json");
        const commonSuggestionsCards = IntrovertChildData.interventions?.commonSuggestions?.cards;

        if (!commonSuggestionsCards || !Array.isArray(commonSuggestionsCards)) {
          console.error("No common suggestions found in Introvert Child data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = commonSuggestionsCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "No title",
          description:
            card.description?.[localeField] || card.description?.english ||
            "No description",
          xp: card.xp || 2,
        }));

        return {
          metadata: {
            condition: "introvert-child",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Introvert Child common suggestions data:", error);
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
    // Handle Exam Stress & Fear of Failure data from comprehensive data file
    if (condition === "exam-stress-fear-of-failure") {
      try {
        const data = require("../../../../assets/data/Parenting/ExamStressFearOfFailure_comprehensive_data.json");
        const localeField = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = data[localeField] || data["en"];
        const commonSuggestionsCards = dataset?.commonSuggestions;

        if (!commonSuggestionsCards || !Array.isArray(commonSuggestionsCards)) {
          console.error("No common suggestions found in Exam Stress data");
          return null;
        }

        const interventions = commonSuggestionsCards.map((card: any) => ({
          title: card.title || "No title",
          description: card.description || "No description",
          xp: card.xp || 2,
        }));

        return {
          metadata: {
            condition: "exam-stress-fear-of-failure",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error(
          "Error loading Exam Stess data:",
          error,
        );
        return null;
      }
    }
    // Handle Dark Web & OnlyFans data from comprehensive data file
    if (condition === "dark-web-onlyfans") {
      try {
        const darkData = require("../../../../assets/data/Internet & Social Media Issues/DarkWebAndOnlyFans_comprehensive_data.json");
        const commonSuggestionsCards = darkData.interventions?.commonSuggestions?.cards;

        if (!commonSuggestionsCards || !Array.isArray(commonSuggestionsCards)) {
          console.error("No common suggestions found in Dark Web & OnlyFans data");
          return null;
        }

        const localeMap: { [key: string]: string } = {
          en: "english",
          hi: "hindi",
          mr: "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = commonSuggestionsCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "No title",
          description:
            card.description?.[localeField] || card.description?.english ||
            "No description",
          xp: card.xp || 2,
        }));

        return {
          metadata: {
            condition: "dark-web-onlyfans",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Dark Web & OnlyFans data:", error);
        return null;
      }
    }

     // Handle Gambling and Gaming Addiction data from comprehensive data file
     if (condition === "gambling-and-gaming-addiction") {
      try {
        const darkData = require("../../../../assets/data/Internet & Social Media Issues/GamblingAndGamingAddiction_comprehensive_data.json");
        const commonSuggestionsCards = darkData.interventions?.commonSuggestions?.cards;

        if (!commonSuggestionsCards || !Array.isArray(commonSuggestionsCards)) {
          console.error("No common suggestions found in Gambling and Gaming Addiction data");
          return null;
        }

        const localeMap: { [key: string]: string } = {
          en: "english",
          hi: "hindi",
          mr: "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = commonSuggestionsCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "No title",
          description:
            card.description?.[localeField] || card.description?.english ||
            "No description",
          xp: card.xp || 2,
        }));

        return {
          metadata: {
            condition: "gambling-and-gaming-addiction",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Gambling and Gaming Addiction data:", error);
        return null;
      }
    }

    // Handle Internet Addiction data from comprehensive data file
    if (condition === "internet-addiction") {
      try {
        const InternetData = require("../../../../assets/data/Internet & Social Media Issues/InternetAddiction_comprehensive_data.json");
        const commonSuggestionsCards = InternetData.commonSuggestions?.cards;

        if (!commonSuggestionsCards || !Array.isArray(commonSuggestionsCards)) {
          console.error("No common suggestions found in Internet Addiction data");
          return null;
        }

        const interventions = commonSuggestionsCards.map((card: any) => ({
          title: card.title?.[locale] || card.title?.en || "No title",
          description:
            card.description?.[locale] || card.description?.en ||
            "No description",
          xp: card.xp || 2,
        }));

        return {
          metadata: {
            condition: "internet-addiction",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Internet Addiction data:", error);
        return null;
      }
    }
    // Handle Friendship & Relationship data file (custom structure)
    if (condition === "friendship-and-relationship") {
      try {
        const frData = require("../../../../assets/data/Emotion/friendship_relationship_interventions.json");
        const common = frData["10_common_suggestions"];

        if (!common || !Array.isArray(common)) {
          console.error(
            "No common suggestions found in Friendship & Relationship data",
          );
          return null;
        }

        const interventions = common.map((item: any) => ({
          title: item.title || "No title",
          description: item.description || "No description",
          xp: item.xp || 2,
        }));

        return {
          metadata: {
            condition: "friendship-and-relationship",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Friendship & Relationship data:", error);
        return null;
      }
    }

    // Handle Dating Sites and Complications data file (localized en/hi/mr)
    if (condition === "dating-sites-and-complications") {
      try {
        const data = require("../../../../assets/data/Emotion/dating_sites_complications_comprehensive_data.json");
        const commonCards = data?.commonSuggestions?.cards;

        if (!commonCards || !Array.isArray(commonCards)) {
          console.error(
            "No common suggestions found in Dating Sites and Complications data",
          );
          return null;
        }

        const localeKey = ["en", "hi", "mr"].includes(locale) ? locale : "en";

        const interventions = commonCards.map((card: any) => ({
          title: card.title?.[localeKey] || card.title?.en || "No title",
          description:
            card.description?.[localeKey] || card.description?.en ||
            "No description",
          xp: card.xp || 2,
        }));

        return {
          metadata: {
            condition: "dating-sites-and-complications",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error(
          "Error loading Dating Sites and Complications data:",
          error,
        );
        return null;
      }
    }
// Handle Self care & hygine comprehensive Data file
    if (condition === "self-care-hygiene") {
      try {
        const data = require("../../../../assets/data/behaviour/SelfCareHygiene_comprehensive_data.json");
        const commonSuggestionsCards = data.interventions?.commonSuggestions?.cards;

        if (!commonSuggestionsCards || !Array.isArray(commonSuggestionsCards)) {
          console.error(
            "No common suggestions found in Self Care & Hygine data",
          );
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          en: "english",
          hi: "hindi",
          mr: "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = commonSuggestionsCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "No title",
          description:
            card.description?.[localeField] ||
            card.description?.english ||
            "No description",
          xp: card.xp || 2,
        }));

        return {
          metadata: {
            condition: "self-care-hygiene",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Self Care & Hygine data:", error);
        return null;
      }
    }
   
    // Handle Abusive Language & Back Answering from comprehensive data file
    if (condition === "abusive-language-back-answering") {
      try {
        const data = require("../../../../assets/data/Parenting/AbusiveLanguageBackAnswering_comprehensive_data.json");
        const localeField = ["en", "hi", "mr"].includes(locale) ? locale : "en";
        const dataset = data[localeField] || data["en"];
        const commonSuggestionsCards = dataset?.commonSuggestions;

        if (!commonSuggestionsCards || !Array.isArray(commonSuggestionsCards)) {
          console.error("No common suggestions found in Abusive Language data");
          return null;
        }

        const interventions = commonSuggestionsCards.map((card: any) => ({
          title: card.title || "No title",
          description: card.description || "No description",
          xp: card.xp || 2,
        }));

        return {
          metadata: {
            condition: "abusive-language-back-answering",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error(
          "Error loading Abusive Language & Back Answering data:",
          error,
        );
        return null;
      }
    }
    
    
    
    // Handle Conduct Issues data from comprehensive data file
    if (condition === "conduct-issues") {
      try {
        const conductData = require("../../../../assets/data/behaviour/ConductIssues_Complete_comprehensive_data.json");
        const commonSuggestionsCards = conductData.interventions?.commonSuggestions?.cards;

        if (!commonSuggestionsCards || !Array.isArray(commonSuggestionsCards)) {
          console.error("No common suggestions found in Conduct Issues data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi",
          "mr": "marathi",
        };
        const localeField = localeMap[locale] || "english";

        const interventions = commonSuggestionsCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "No title",
          description:
            card.description?.[localeField] || card.description?.english ||
            "No description",
          xp: card.xp || 2,
        }));

        return {
          metadata: {
            condition: "conduct-issues",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Conduct Issues common suggestions data:", error);
        return null;
      }
    }
    // Handle ADHD data from ADHD comprehensive data file
    if (condition === "adhd") {
      try {
        const adhdData = require("../../../../assets/data/behaviour/ADHD_comprehensive_data.json");
        const commonSuggestionsCards = adhdData.interventions?.commonSuggestions?.cards;
        
        if (!commonSuggestionsCards || !Array.isArray(commonSuggestionsCards)) {
          console.error("No common suggestions found in ADHD data");
          return null;
        }

        // Map locale codes to ADHD data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi", 
          "mr": "marathi"
        };
        const adhdLocaleField = localeMap[locale] || "english";

        const interventions = commonSuggestionsCards.map((card: any) => ({
          title: card.title?.[adhdLocaleField] || card.title?.english || "No title",
          description: card.description?.[adhdLocaleField] || card.description?.english || "No description",
          xp: card.xp || 2,
        }));

        return {
          metadata: {
            condition: "adhd",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading ADHD common suggestions data:", error);
        return null;
      }
    }

    // Handle Aggressive Behaviour data from comprehensive data file
    if (condition === "aggressive-behaviour") {
      try {
        const aggressiveData = require("../../../../assets/data/behaviour/AggressiveBehaviour_comprehensive_data.json");
        const commonSuggestionsCards = aggressiveData.interventions?.commonSuggestions?.cards;
        
        if (!commonSuggestionsCards || !Array.isArray(commonSuggestionsCards)) {
          console.error("No common suggestions found in Aggressive Behaviour data");
          return null;
        }

        // Map locale codes to data field names
        const localeMap: { [key: string]: string } = {
          "en": "english",
          "hi": "hindi", 
          "mr": "marathi"
        };
        const localeField = localeMap[locale] || "english";

        const interventions = commonSuggestionsCards.map((card: any) => ({
          title: card.title?.[localeField] || card.title?.english || "No title",
          description: card.description?.[localeField] || card.description?.english || "No description",
          xp: card.xp || 2,
        }));

        return {
          metadata: {
            condition: "aggressive-behaviour",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Aggressive Behaviour common suggestions data:", error);
        return null;
      }
    }

    // Handle Self Esteem & identity data from comprehensive data file
    if (condition === "self-esteem-and-self-identity") {
      try {
        const data = require("../../../../assets/data/Emotion/self_esteem_self_identity_interventions.json");

        const items = data.interventions;
        if (!items || !Array.isArray(items)) {
          console.error("No interventions array found in Self-Esteem & Identity data");
          return null;
        }

        // Normalize locale (handles values like 'en', 'en-US', etc.)
        const localeKey = (locale || "").slice(0, 2);
        const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";

        // Filter items that belong to the Common Suggestions category
        const commonItems = items.filter((it: any) => {
          const cat = (it.category || "").toString().toLowerCase();
          return cat === "common suggestions" || cat === "common-suggestions" || cat === "common_suggestions";
        });

        if (!commonItems || commonItems.length === 0) {
          console.error("No common suggestions found in Self-Esteem & Identity data");
          return null;
        }

        const interventions = commonItems.map((item: any) => {
          const translations = item.translations || {};
          const chosen = translations[lang] || translations["en"] || {};
          return {
            title: chosen.title || "No title",
            description: chosen.description || "No description",
            xp: item.xp || 2,
          };
        });

        return {
          metadata: {
            condition: "self-esteem-and-self-identity",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions: interventions,
        };
      } catch (error) {
        console.error("Error loading Self-Esteem & Identity common suggestions data:", error);
        return null;
      }
    }
     
      // Handle Social Media issues REBT data
      if (condition === "social-media-issues") {
        try {
          const data = require(
            "../../../../assets/data/Internet & Social Media Issues/SocialMediaComprehensiveData.json",
          );

          // This comprehensive file uses an `interventions` object with a
          // `commonSuggestions.cards` array. Support that shape first, then
          // fall back to other known paths.
          const items =
            data?.interventions?.commonSuggestions?.cards ||
            data?.interventions?.commonSuggestions ||
            data?.interventions?.cards ||
            // keep the old fallbacks for compatibility
            data?.interventions ||
            data?.suggestions ||
            data?.socialMediaIssuesScreen?.strategies?.rebt?.rebtSuggestionsList ||
            data?.strategies?.rebt?.rebtSuggestionsList ||
            null;

          // If items is an object (not array) but contains a `cards` array, prefer that
          const resolvedItems = Array.isArray(items) ? items : (Array.isArray(items?.cards) ? items.cards : null);

          if (!resolvedItems || !Array.isArray(resolvedItems)) {
            console.error("No common suggestions array found in Social Media Issues data", {
              interventions: data?.interventions,
            });
            return null;
          }

          // Normalize locale (handles values like 'en', 'en-US', etc.) and map
          // to the field names used in these JSON files (english/hindi/marathi).
          const localeKey = (locale || "").slice(0, 2);
          const lang = ["en", "hi", "mr"].includes(localeKey) ? localeKey : "en";
          const localeFieldMap: { [k: string]: string } = {
            en: "english",
            hi: "hindi",
            mr: "marathi",
          };
          const localeField = localeFieldMap[lang] || "english";

          // Map card shape (title/description objects keyed by language)
          const interventions = resolvedItems.map((item: any) => {
            const titleObj = item.title || item.Title || {};
            const descObj = item.description || item.Description || {};

            const title =
              (typeof titleObj === "object" &&
                (titleObj[localeField] || titleObj[lang] || titleObj["english"] || titleObj["en"])) ||
              (typeof titleObj === "string" ? titleObj : "");

            const description =
              (typeof descObj === "object" &&
                (descObj[localeField] || descObj[lang] || descObj["english"] || descObj["en"])) ||
              (typeof descObj === "string" ? descObj : "");

            return {
              title: title || "",
              description: description || "",
              xp: item.xp || item.XP || 0,
            };
          });

          return {
            condition: "social-media-issues",
            intervention_type: "10 Common Suggestions",
            interventions,
          };
        } catch (error) {
          console.error("Error loading Social Media Issues common suggestions data:", error);
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
              interventionsObj["10CommonSuggestions"] ||
              interventionsObj["10_common_suggestions"] ||
              interventionsObj["10CommonSuggestion"] ||
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
          console.error("No Common Suggestions data array found in Trauma, Loss and Dreams data");
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
          intervention_type: "10 Common Suggestions",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Trauma, Loss and Dreams Common Suggestions data:", error);
        return null;
      }
    }

    // handle Unrealistic Beauty Standards data from comprehensive JSON file for Common Suggestions
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
          console.error("No Common Suggestions data array found in Unrealistic Beauty Standards data");
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
              xp: item.xp || item.XP || 2,
            } as Intervention;
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
            xp: item.xp || item.XP || 2,
          } as Intervention;
        });

        return {
          condition: "unrealistic-beauty-standards",
          intervention_type: "10 Common Suggestions",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Unrealistic Beauty Standards Common Suggestions data:", error);
        return null;
      }
    }

    // handle Anxiety Issues data from comprehensive JSON file for Common Suggestions
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
          console.error("No Common Suggestions data array found in Anxiety Issues data");
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
              xp: item.xp || item.XP || 2,
            } as Intervention;
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
            xp: item.xp || item.XP || 2,
          } as Intervention;
        });

        return {
          condition: "unrealistic-beauty-standards",
          intervention_type: "10 Common Suggestions",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Anxiety Issues Common Suggestions data:", error);
        return null;
      }
    }
    // handle Loneliness & Depression data from comprehensive JSON file for Common Suggestions
    if (condition === "loneliness-depression") {
      try {
        const data = require(
          "../../../../assets/data/Emotion/Loneliness_comprehensive_data.json",
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
          console.error("No Common Suggestions data array found in Loneliness & Depression data");
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
              xp: item.xp || item.XP || 2,
            } as Intervention;
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
            xp: item.xp || item.XP || 2,
          } as Intervention;
        });

        return {
          condition: "loneliness-depression",
          intervention_type: "10 Common Suggestions",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Loneliness & Depression Common Suggestions data:", error);
        return null;
      }
    }

    // handle Anxiety data from comprehensive JSON file for Common Suggestions
    if (condition === "anxiety") {
      try {
        const data = require(
          "../../../../assets/data/behaviour/Anxiety_issues_like_PTSD_comprehensive_data.json",
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
          console.error("No Common Suggestions data array found in Loneliness & Depression data");
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
              xp: item.xp || item.XP || 2,
            } as Intervention;
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
            xp: item.xp || item.XP || 2,
          } as Intervention;
        });

        return {
          condition: "anxiety",
          intervention_type: "10 Common Suggestions",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Loneliness & Depression Common Suggestions data:", error);
        return null;
      }
    }

// handle Special Needs data from comprehensive JSON file for Common Suggestions
if (condition === "special-needs") {
  try {
    const data = require(
      "../../../../assets/data/Parenting/Dealing_with_Children_of_Special_Needs_comprehensive_data.json",
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
      console.error("No Common Suggestions data array found in Loneliness & Depression data");
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
          xp: item.xp || item.XP || 2,
        } as Intervention;
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
        xp: item.xp || item.XP || 2,
      } as Intervention;
    });

    return {
      condition: "special needs",
      intervention_type: "10 Common Suggestions",
      interventions,
    };
  } catch (error) {
    console.error("Error loading Loneliness & Depression Common Suggestions data:", error);
    return null;
  }
}

    // handle Good Parenting data from comprehensive JSON file for Common Suggestions
    if (condition === "good-parenting") {
      try {
        const data = require(
          "../../../../assets/data/Parenting/Good_Parenting_comprehensive_data.json",
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
          console.error("No Common Suggestions data array found in Good Parenting data");
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
              xp: item.xp || item.XP || 2,
            } as Intervention;
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
            xp: item.xp || item.XP || 2,
          } as Intervention;
        });

        return {
          condition: "good-parenting",
          intervention_type: "10 Common Suggestions",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Good Parenting Common Suggestions data:", error);
        return null;
      }
    }

   
    
    //handle Substance Addiction data from comprehensive JSON file for Common Suggestions
    if (condition === "substance-addiction") {
      try {
        const data = require(
          "../../../../assets/data/behaviour/SubstanceAddiction_comprehensive_data.json",
        );

        // Prefer interventions.commonSuggestions.cards (common shape), then try several fallbacks
        const itemsCandidate =
          data?.interventions?.commonSuggestions?.cards ||
          data?.interventions?.commonSuggestions ||
          data?.interventions?.["10CommonSuggestions"]?.cards ||
          data?.interventions?.["10CommonSuggestions"] ||
          data?.interventions?.["10_common_suggestions"]?.cards ||
          data?.interventions?.["10_common_suggestions"] ||
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
          console.error("No Common Suggestions data array found in Substance Addiction data");
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
          intervention_type: "10 Common Suggestions",
          interventions,
        };
      } catch (error) {
        console.error("Error loading Substance Addiction Common Suggestions data:", error);
        return null;
      }
    }

    // Handle Suicidal Behaviour data from comprehensive JSON file
    if (condition === "suicidal-behavior") {
      try {
        const data = require("../../../../assets/data/behaviour/Suicidal_Behaviour_comprehensive_data.json");
        const itemsCandidate = data?.interventions?.commonSuggestions?.cards || data?.interventions?.commonSuggestions || data?.interventions?.common_suggestions || data?.interventions?.cards || data?.interventions || null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No Common Suggestions data array found in Suicidal Behaviour data");
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
              xp: item.xp || item.XP || 2,
            };
          }

          const titleObj = item.title || item.Title || {};
          const descObj = item.description || item.Description || {};

          const title = (typeof titleObj === "object" && (titleObj[localeField] || titleObj[lang] || titleObj["english"] || titleObj["en"])) || (typeof titleObj === "string" ? titleObj : "");
          const description = (typeof descObj === "object" && (descObj[localeField] || descObj[lang] || descObj["english"] || descObj["en"])) || (typeof descObj === "string" ? descObj : "");

          return {
            title: title || "",
            description: description || "",
            xp: item.xp || item.XP || 2,
          };
        });

        return {
          metadata: {
            condition: "suicidal-behavior",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Suicidal Behaviour common suggestions data:", error);
        return null;
      }
    }

    // Handle Bullying data from comprehensive JSON file
    if (condition === "bullying") {
      try {
        const data = require("../../../../assets/data/Parenting/BullyingInSchool.json");
        const itemsCandidate = data?.interventions?.commonSuggestions?.cards || data?.interventions?.commonSuggestions || data?.interventions?.common_suggestions || data?.interventions?.cards || data?.interventions || null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No Common Suggestions data array found in Bullying data");
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
              xp: item.xp || item.XP || 2,
            };
          }

          const titleObj = item.title || item.Title || {};
          const descObj = item.description || item.Description || {};

          const title = (typeof titleObj === "object" && (titleObj[localeField] || titleObj[lang] || titleObj["english"] || titleObj["en"])) || (typeof titleObj === "string" ? titleObj : "");
          const description = (typeof descObj === "object" && (descObj[localeField] || descObj[lang] || descObj["english"] || descObj["en"])) || (typeof descObj === "string" ? descObj : "");

          return {
            title: title || "",
            description: description || "",
            xp: item.xp || item.XP || 2,
          };
        });

        return {
          metadata: {
            condition: "bullying",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Bullying common suggestions data:", error);
        return null;
      }
    }

        // Handle Bunking In School data from comprehensive JSON file
    if (condition === "bunking") {
      try {
        const data = require("../../../../assets/data/Parenting/Bunking_School_comprehensive_data.json");
        const itemsCandidate = data?.interventions?.commonSuggestions?.cards || data?.interventions?.commonSuggestions || data?.interventions?.common_suggestions || data?.interventions?.cards || data?.interventions || null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No Common Suggestions data array found in Bunking In School data");
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
              xp: item.xp || item.XP || 2,
            };
          }

          const titleObj = item.title || item.Title || {};
          const descObj = item.description || item.Description || {};

          const title = (typeof titleObj === "object" && (titleObj[localeField] || titleObj[lang] || titleObj["english"] || titleObj["en"])) || (typeof titleObj === "string" ? titleObj : "");
          const description = (typeof descObj === "object" && (descObj[localeField] || descObj[lang] || descObj["english"] || descObj["en"])) || (typeof descObj === "string" ? descObj : "");

          return {
            title: title || "",
            description: description || "",
            xp: item.xp || item.XP || 2,
          };
        });

        return {
          metadata: {
            condition: "bunking",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Bunking In School common suggestions data:", error);
        return null;
      }
    }

    // Handle Bunking In School data from comprehensive JSON file
    if (condition === "academic") {
      try {
        const data = require("../../../../assets/data/Parenting/Academic_Stress_comprehensive_data.json");
        const itemsCandidate = data?.interventions?.commonSuggestions?.cards || data?.interventions?.commonSuggestions || data?.interventions?.common_suggestions || data?.interventions?.cards || data?.interventions || null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No Common Suggestions data array found in Academic Stress data");
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
              xp: item.xp || item.XP || 2,
            };
          }

          const titleObj = item.title || item.Title || {};
          const descObj = item.description || item.Description || {};

          const title = (typeof titleObj === "object" && (titleObj[localeField] || titleObj[lang] || titleObj["english"] || titleObj["en"])) || (typeof titleObj === "string" ? titleObj : "");
          const description = (typeof descObj === "object" && (descObj[localeField] || descObj[lang] || descObj["english"] || descObj["en"])) || (typeof descObj === "string" ? descObj : "");

          return {
            title: title || "",
            description: description || "",
            xp: item.xp || item.XP || 2,
          };
        });

        return {
          metadata: {
            condition: "academic",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Academic Stress common suggestions data:", error);
        return null;
      }
    }

    // Handle Self Harm data from comprehensive JSON file
    if (condition === "selfharm") {
      try {
        const data = require("../../../../assets/data/behaviour/Self-harm_Behaviour_comprehensive_data.json");
        const itemsCandidate = data?.interventions?.commonSuggestions?.cards || data?.interventions?.commonSuggestions || data?.interventions?.common_suggestions || data?.interventions?.cards || data?.interventions || null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No Common Suggestions data array found in Self Harm data");
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
              xp: item.xp || item.XP || 2,
            };
          }

          const titleObj = item.title || item.Title || {};
          const descObj = item.description || item.Description || {};

          const title = (typeof titleObj === "object" && (titleObj[localeField] || titleObj[lang] || titleObj["english"] || titleObj["en"])) || (typeof titleObj === "string" ? titleObj : "");
          const description = (typeof descObj === "object" && (descObj[localeField] || descObj[lang] || descObj["english"] || descObj["en"])) || (typeof descObj === "string" ? descObj : "");

          return {
            title: title || "",
            description: description || "",
            xp: item.xp || item.XP || 2,
          };
        });

        return {
          metadata: {
            condition: "selfharm",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Self Harm common suggestions data:", error);
        return null;
      }
    }

        // Handle Self Harm data from comprehensive JSON file
    if (condition === "learning-disability") {
      try {
        const data = require("../../../../assets/data/Parenting/Learning_Disability_comprehensive_data.json");
        const itemsCandidate = data?.interventions?.commonSuggestions?.cards || data?.interventions?.commonSuggestions || data?.interventions?.common_suggestions || data?.interventions?.cards || data?.interventions || null;

        const items = Array.isArray(itemsCandidate)
          ? itemsCandidate
          : Array.isArray(itemsCandidate?.cards)
          ? itemsCandidate.cards
          : null;

        if (!items || !Array.isArray(items)) {
          console.error("No Common Suggestions data array found in Learning Disability data");
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
              xp: item.xp || item.XP || 2,
            };
          }

          const titleObj = item.title || item.Title || {};
          const descObj = item.description || item.Description || {};

          const title = (typeof titleObj === "object" && (titleObj[localeField] || titleObj[lang] || titleObj["english"] || titleObj["en"])) || (typeof titleObj === "string" ? titleObj : "");
          const description = (typeof descObj === "object" && (descObj[localeField] || descObj[lang] || descObj["english"] || descObj["en"])) || (typeof descObj === "string" ? descObj : "");

          return {
            title: title || "",
            description: description || "",
            xp: item.xp || item.XP || 2,
          };
        });

        return {
          metadata: {
            condition: "learning-disability",
            intervention_type: "10 Common Suggestions",
            total_interventions: interventions.length,
          },
          interventions,
        };
      } catch (error) {
        console.error("Error loading Learning Disability common suggestions data:", error);
        return null;
      }
    }

    // Check if we have translations for this condition
    const translationKeyMap: { [key: string]: string } = {
      "anger-management": "angerManagement",
      addictions: "addictions",
      "self-esteem-and-self-identity": "selfEsteemAndSelfIdentity",
      "common-psychological-issues": "commonPsychologicalIssues",
      "conduct-issues": "conductIssues",
      "substance-addiction": "substanceAddiction",
      "trauma-loss-and-dreams": "traumaLossAndDreams",
      "unrealistic-beauty-standards": "unrealisticBeautyStandards",
      "anxiety":"anxietyIssues",
      "good-parenting":"Good Parenting",
      "dark-web-onlyfans": "darkWebAndOnlyFans",
      "environment-issues": "environmentIssues",
      "family-relationship": "familyRelationship",
      "financial-mental-health": "financialMentalHealth",
      "general-physical-fitness": "generalPhysicalFitness",
      "internet-dependence": "internetDependence",
      "internet-social-media": "internetSocialMedia",
       "social-media-issues": "socialMediaIssues",
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
        const translatedSuggestions = t(
          `interventionSuggestions.${translationKey}`,
          { returnObjects: true },
        );
        
        if (
          Array.isArray(translatedSuggestions) &&
          translatedSuggestions.length > 0
        ) {
          // Create translated suggestions with XP values (defaulting to 2 XP each)
          const interventions = translatedSuggestions.map(
            (suggestion: any) => ({
              title: suggestion.title,
              description: suggestion.description,
              xp: 2, // Default XP value for all suggestions
            }),
          );

          return {
            metadata: {
              condition: condition,
              intervention_type: "10 Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
          };
        }
      } catch {
        console.log(
          `No translations found for ${condition}, falling back to JSON`,
        );
      }
    }

    // Fall back to static JSON files for conditions without translations
    const dataMap: { [key: string]: SuggestionsData } = {
      "anger-management": require("../../../../assets/data/Mind Tools/data/anger-management/10-common-suggestions.json"),
      stress: require("../../../../assets/data/Mind Tools/data/stress/10-common-suggestions.json"),
      addictions: require("../../../../assets/data/Mind Tools/data/addictions/10-common-suggestions.json"),
      "general-physical-fitness": require("../../../../assets/data/Mind Tools/data/general-physical-fitness/10-common-suggestions.json"),
      "suicidal-behavior": require("../../../../assets/data/Mind Tools/data/suicidal-behavior/10-common-suggestions.json"),
      "common-psychological-issues": require("../../../../assets/data/Mind Tools/data/common-psychological-issues/10-common-suggestions.json"),
      "family-relationship": require("../../../../assets/data/Mind Tools/data/family-relationship/10-common-suggestions.json"),
      "internet-dependence": require("../../../../assets/data/Mind Tools/data/internet-dependence/10-common-suggestions.json"),
      "environment-issues": require("../../../../assets/data/Mind Tools/data/environment-issues/10-common-suggestions.json"),
      "financial-mental-health": require("../../../../assets/data/Mind Tools/data/financial-mental-health/10-common-suggestions.json"),
      "internet-social-media": require("../../../../assets/data/Mind Tools/data/internet-social-media/10-common-suggestions.json"),
      "professional-mental-health": require("../../../../assets/data/Mind Tools/data/professional-mental-health/10-common-suggestions.json"),
      "sex-life": require("../../../../assets/data/Mind Tools/data/sex-life/10-common-suggestions.json"),
      sleep: require("../../../../assets/data/Mind Tools/data/sleep/10-common-suggestions.json"),
      "social-mental-health": require("../../../../assets/data/Mind Tools/data/social-mental-health/10-common-suggestions.json"),
      "youngster-issues": require("../../../../assets/data/Mind Tools/data/youngster-issues/10-common-suggestions.json"),
    };

    return dataMap[condition] || null;
  };

  const loadSuggestions = useCallback(async () => {
    try {
      setLoading(true);

      if (!condition) {
        console.error("No condition parameter provided");
        return;
      }

      const data = getSuggestionsData(condition);

      if (!data) {
        console.error(`No data found for condition: ${condition}`);
        Alert.alert(
          t("commonSuggestionsScreen.error.title"),
          t("commonSuggestionsScreen.error.noSuggestions"),
          [
            {
              text: t("commonSuggestionsScreen.error.ok"),
              onPress: () => navigation.goBack(),
            },
          ],
        );
        return;
      }

      setSuggestions(data.interventions || []);
      setConditionName(getConditionDisplayName(condition));
    } catch (error) {
      console.error("Error loading suggestions:", error);
      Alert.alert(
        t("commonSuggestionsScreen.error.title"),
        t("commonSuggestionsScreen.error.failedToLoad"),
        [
          {
            text: t("commonSuggestionsScreen.error.ok"),
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } finally {
      setLoading(false);
    }
  }, [condition, navigation]);

  useEffect(() => {
    setConditionName(getConditionDisplayName(condition));
    loadSuggestions();
  }, [loadSuggestions, locale, condition]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToTaskList = (suggestion: Intervention) => {
    setSelectedSuggestion(suggestion);
    showModal();
  };

  const formatDescription = (description: string): string => {
    // Remove markdown formatting for display
    return description
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markers
      .replace(/^\s*-\s*/gm, "• ") // Convert dashes to bullets
      .trim();
  };

  // Helper functions to get title and description from different JSON formats
  const getSuggestionTitle = (suggestion: Intervention): string => {
    return suggestion.title || suggestion["Card Title"] || "Untitled";
  };

  const getSuggestionDescription = (suggestion: Intervention): string => {
    const desc = suggestion.description || suggestion["Card Description"] || "";
    return formatDescription(desc);
  };

  const handleTaskFrequencySelect = async (frequency: string) => {
    if (!selectedSuggestion) return;

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
          t("commonSuggestionsScreen.error.title"),
          t("commonSuggestionsScreen.error.invalidFrequency"),
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
        "family-relationship": "scanIntro.familyAndRelationship.title",
        "internet-dependence": "scanIntro.internetDependence.title",
        "environment-issues":
          "scanIntro.environmentIssuesAffectingMentalWellbeing.title",
        "financial-mental-health": "scanIntro.financialMentalHealth.title",
        "internet-social-media": "scanIntro.internetAndSocialMediaIssue.title",
          "social-media-issues": "socialMediaIssuesScreen.headerTitle",
        "job-insecurity": "scanIntro.jobInsecurity.title",
        "professional-mental-health":
          "scanIntro.professionalMentalHealth.title",
        "sex-life": "scanIntro.sexLife.title",
        sleep: "scanIntro.sleep.title",
        "social-mental-health": "scanIntro.socialMentalHealth.title",
        "youngster-issues": "scanIntro.youngsterIssues.title",
      };

      const translationKey = translationKeyMap[condition];
      const currentSuggestionIndex = suggestions.findIndex(
        (s) => s === selectedSuggestion,
      );
      
      // Store translation keys for dynamic lookup
      const originalTitleKey = translationKey
        ? `interventionSuggestions.${translationKey}.${currentSuggestionIndex}.title`
        : undefined;
      const originalSubtitleKey = "commonSuggestionsScreen.task.subtitleFrom";
      const originalDescriptionKey = translationKey
        ? `interventionSuggestions.${translationKey}.${currentSuggestionIndex}.description`
        : undefined;
      const conditionDisplayKey = conditionKeyMap[condition];
      
      // Create translation objects for all languages - simplified implementation
      const getTitleForLanguage = (lang: "en" | "hi" | "mr"): string => {
        if (originalTitleKey) {
          try {
            const translatedTitle = t(originalTitleKey);
            return translatedTitle !== originalTitleKey
              ? translatedTitle
              : getSuggestionTitle(selectedSuggestion);
          } catch {
            return getSuggestionTitle(selectedSuggestion); // Fallback to original
          }
        }
        return getSuggestionTitle(selectedSuggestion);
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
        en: t("commonSuggestionsScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("en"),
        }),
        hi: t("commonSuggestionsScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("hi"),
        }),
        mr: t("commonSuggestionsScreen.task.subtitleFrom", {
          conditionName: getConditionNameForLanguage("mr"),
        }),
      };

      // Create description translations if we have an original description key
      const getDescriptionForLanguage = (lang: "en" | "hi" | "mr"): string => {
        if (lang === "en") {
          return getSuggestionDescription(selectedSuggestion); // Always use original English text
        }
        // For other languages, we could add dynamic translation here
        // For now, return the original description
        return getSuggestionDescription(selectedSuggestion);
      };

      const descriptionTranslations = {
        en: getDescriptionForLanguage("en"),
        hi: getDescriptionForLanguage("hi"),
        mr: getDescriptionForLanguage("mr"),
      };

      const newIntervention: SavedIntervention = {
        id: Date.now().toString(),
        title: getSuggestionTitle(selectedSuggestion),
        subtitle: t("commonSuggestionsScreen.task.subtitleFrom", {
          conditionName,
        }),
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
          "common-suggestion",
        ],
        xp: selectedSuggestion.xp,
        date: new Date().toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
        isSelected: false,
        isCompleted: false,
        fullDescription: selectedSuggestion.description || "", // Save original English description
        condition: conditionName,
        interventionType: t("commonSuggestionsScreen.task.interventionType"),
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
          t("commonSuggestionsScreen.success.title"),
          t("commonSuggestionsScreen.success.message", {
            taskTitle: getSuggestionTitle(selectedSuggestion),
            frequency: frequency.toLowerCase(),
          }),
          [{ text: t("commonSuggestionsScreen.success.ok") }],
        );
      }, 300);
    } catch (error) {
      console.error("Error saving intervention:", error);
      setTimeout(() => {
        Alert.alert(
          t("commonSuggestionsScreen.error.title"),
          t("commonSuggestionsScreen.error.failedToSave"),
        );
      }, 300);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={styles.loadingText}>
          {t("commonSuggestionsScreen.loading")}
        </Text>
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
          {t("commonSuggestionsScreen.header.title")}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Condition Title */}
        <Text style={styles.conditionTitle}>{conditionName}</Text>

        {/* Suggestions List */}
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <View key={index} style={styles.suggestionCard}>
              {/* XP Badge */}
              <View style={styles.xpBadge}>
                <Text style={styles.xpText}>{suggestion.xp} XP</Text>
              </View>

              <Text style={styles.suggestionTitle}>
                {getSuggestionTitle(suggestion)}
              </Text>
              <Text style={styles.suggestionDescription}>
                {getSuggestionDescription(suggestion)}
              </Text>
              <Pressable
                style={styles.addButton}
                onPress={() => handleAddToTaskList(suggestion)}
              >
                <Text style={styles.addButtonText}>
                  {t("commonSuggestionsScreen.addButton")}
                </Text>
                <CustomIcon type="IO" name="add-circle" size={20} color="#8B5CF6" />
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
                accessibilityLabel={t("commonSuggestionsScreen.modal.title")}
              >
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {t("commonSuggestionsScreen.modal.title")}
                  </Text>
                  <Text style={styles.modalSubtitle}>
                    {t("commonSuggestionsScreen.modal.subtitle")}
                  </Text>
                </View>

                {/* Task Frequency Options */}
                <View style={styles.frequencyOptions}>
                  {[
                    {
                      key: "Daily",
                      icon: "today-outline",
                      color: "#10B981",
                      titleKey:
                        "commonSuggestionsScreen.modal.frequencies.daily.title",
                      descriptionKey:
                        "commonSuggestionsScreen.modal.frequencies.daily.description",
                    },
                    {
                      key: "Weekly",
                      icon: "calendar-outline",
                      color: "#3B82F6",
                      titleKey:
                        "commonSuggestionsScreen.modal.frequencies.weekly.title",
                      descriptionKey:
                        "commonSuggestionsScreen.modal.frequencies.weekly.description",
                    },
                    {
                      key: "Bi-Weekly",
                      icon: "calendar-number-outline",
                      color: "#8B5CF6",
                      titleKey:
                        "commonSuggestionsScreen.modal.frequencies.biWeekly.title",
                      descriptionKey:
                        "commonSuggestionsScreen.modal.frequencies.biWeekly.description",
                    },
                    {
                      key: "Monthly",
                      icon: "calendar-clear-outline",
                      color: "#F59E0B",
                      titleKey:
                        "commonSuggestionsScreen.modal.frequencies.monthly.title",
                      descriptionKey:
                        "commonSuggestionsScreen.modal.frequencies.monthly.description",
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
                      accessibilityLabel={t(option.titleKey)}
                      accessibilityHint={t(option.descriptionKey)}
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
                          {t(option.titleKey)}
                        </Text>
                        <Text style={styles.frequencyDescription}>
                          {t(option.descriptionKey)}
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
                  accessibilityLabel={t("commonSuggestionsScreen.modal.cancel")}
                >
                  <Text style={styles.cancelButtonText}>
                    {t("commonSuggestionsScreen.modal.cancel")}
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
    marginVertical: 20,
  },
  suggestionsContainer: {
    paddingBottom: 30,
  },
  suggestionCard: {
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
  },
  xpBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#F59E0B",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
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
    textAlign: "center",
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
    lineHeight: 24,
    marginRight: 60, // Add margin to prevent overlap with XP badge
  },
  suggestionDescription: {
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
    borderColor: "#8B5CF6",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#8B5CF6",
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
