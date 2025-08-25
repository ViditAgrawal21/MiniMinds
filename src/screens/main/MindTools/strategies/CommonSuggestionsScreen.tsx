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
      "introvert-child": "introvertChildScreen.headerTitle",
      "substance-addiction": "substanceAddictionScreen.headerTitle",
      "breakupAndRebound": "breakupAndReboundScreen.title",
      "trauma-loss-and-dreams": "traumaLossAndDreamsScreen.headerTitle",
      "unrealistic-beauty-standards": "unrealisticBeautyStandardsScreen.headerTitle",
      "adhd": "adhdScreen.headerTitle",
      "aggressive-behaviour": "aggressiveBehaviourScreen.english.headerTitle",
      "eating-habits": "eatingHabitsScreen.headerTitle",
      "conduct-issues": "conductIssues.headerTitle",
      "dark-web-onlyfans": "Dark Web and OnlyFans",
      "gambling-and-gaming-addiction": "Gambling and Gaming Addiction",
      "internet-addiction": "Internet Addiction",
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
    
    return translationKey ? t(translationKey) : condition;
  };

  // Get translated suggestions data or fall back to static JSON files
  const getSuggestionsData = (condition: string): SuggestionsData | null => {
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
      "introvert-child": "introvertChild",
      "substance-addiction": "substanceAddiction",
      "breakupAndRebound": "breakupAndRebound",
      "trauma-loss-and-dreams": "traumaLossAndDreams",
      "unrealistic-beauty-standards": "unrealisticBeautyStandards",
      "adhd": "adhd",
      "aggressive-behaviour": "aggressiveBehaviour",
      "eating-habits": "eatingHabits",
      "conduct-issues": "conductIssues",
      "dark-web-onlyfans": "darkWebOnlyFans",
      "gambling-and-gaming-addiction": "gamblingAndGamingAddiction",
      "internet-addiction": "internetAddiction",
    };

    const translationKey = translationKeyMap[condition];
    
    // Special handling for Friendship and Relationship interventions
    if (condition === "friendship-and-relationship") {
      try {
        const friendshipData = require("../../../../assets/data/Emotion/friendship_relationship_interventions.json");
        if (friendshipData?.translations) {
          const currentLanguage = getCurrentLanguage();
          const languageData = friendshipData.translations[currentLanguage];
          
          if (languageData?.["10_common_suggestions"]) {
            const interventions = languageData["10_common_suggestions"].map((item: any) => ({
              title: item.title || "Untitled",
              description: item.description || "No description",
              xp: item.xp || 2,
            }));

            return {
              condition: "friendship-and-relationship",
              intervention_type: "Common Suggestions",
              interventions: interventions,
            };
          }
        }
      } catch (error) {
        console.error("Error loading Friendship and Relationship common suggestions data:", error);
      }
    }
    
    // Special handling for Self-esteem and Self-identity interventions
    if (condition === "self-esteem-and-self-identity") {
      try {
        const selfEsteemData = require("../../../../assets/data/Emotion/self_esteem_self_identity_interventions.json");
        if (selfEsteemData?.interventions) {
          const currentLanguage = getCurrentLanguage();
          
          // Filter interventions by category "Common Suggestions"
          const commonSuggestionsInterventions = selfEsteemData.interventions
            .filter((intervention: any) => intervention.category === "Common Suggestions");
          
          const interventions = commonSuggestionsInterventions.map((item: any) => {
            const translation = item.translations[currentLanguage] || item.translations["en"];
            return {
              title: translation.title || "Untitled",
              description: translation.description || "No description",
              xp: item.xp || 2,
            };
          });

          return {
            condition: "self-esteem-and-self-identity",
            intervention_type: "Common Suggestions",
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Self-esteem and Self-identity common suggestions data:", error);
      }
    }
    
    // Special handling for Self-Care Hygiene - use the comprehensive data file
    if (condition === "self-care-hygiene") {
      try {
        const selfCareHygieneData = require("../../../../assets/data/behaviour/SelfCareHygiene_comprehensive_data.json");
        if (selfCareHygieneData && selfCareHygieneData.interventions && selfCareHygieneData.interventions.commonSuggestions) {
          const { cards } = selfCareHygieneData.interventions.commonSuggestions;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Self-Care Hygiene data format to the expected format
          const interventions = cards.map((card: any) => ({
            title: card.title[currentLang],
            description: card.description[currentLang],
            xp: card.xp,
          }));

          return {
            metadata: {
              condition: "self-care-hygiene",
              intervention_type: "10 Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Self-Care Hygiene comprehensive data:", error);
      }
    }
    
    // Special handling for Introvert Child - use the comprehensive data file
    if (condition === "introvert-child") {
      try {
        const introvertChildData = require("../../../../assets/data/behaviour/IntrovertChild_comprehensive_data.json");
        if (introvertChildData && introvertChildData.interventions && introvertChildData.interventions.commonSuggestions) {
          const { cards } = introvertChildData.interventions.commonSuggestions;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Introvert Child data format to the expected format
          const interventions = cards.map((card: any) => ({
            title: card.title[currentLang],
            description: card.description[currentLang],
            xp: card.xp,
          }));

          return {
            metadata: {
              condition: "introvert-child",
              intervention_type: "10 Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Introvert Child comprehensive data:", error);
      }
    }
    
    // Special handling for Substance Addiction - use the comprehensive data file
    if (condition === "substance-addiction") {
      try {
        const substanceAddictionData = require("../../../../assets/data/behaviour/SubstanceAddiction_comprehensive_data.json");
        if (substanceAddictionData && substanceAddictionData.commonSuggestions) {
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Substance Addiction data format to the expected format
          const interventions = substanceAddictionData.commonSuggestions.map((item: any) => ({
            title: item.title[currentLang],
            description: item.description[currentLang],
            xp: item.xp,
          }));

          return {
            metadata: {
              condition: "substance-addiction",
              intervention_type: "Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Substance Addiction comprehensive data:", error);
      }
    }
    
    // Special handling for ADHD - use the comprehensive data file
    if (condition === "adhd") {
      try {
        const adhdData = require("../../../../assets/data/behaviour/ADHD_comprehensive_data.json");
        
        if (adhdData && adhdData.interventions && adhdData.interventions.commonSuggestions) {
          const { cards } = adhdData.interventions.commonSuggestions;
          
          if (cards && Array.isArray(cards) && cards.length > 0) {
            // Get current language for proper translation
            const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                              getCurrentLanguage() === "mr" ? "marathi" : "english";
            
            // Transform the comprehensive ADHD data format to the expected format
            const interventions = cards.map((card: any) => ({
              title: card.title?.[currentLang] || card.title?.english || "Untitled",
              description: card.description?.[currentLang] || card.description?.english || "No description",
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
          }
        }
      } catch (error) {
        console.error("Error loading ADHD comprehensive data:", error);
      }
    }
    
    // Special handling for Breakup and Rebound - use the comprehensive data file
    if (condition === "breakupAndRebound") {
      try {
        const breakupReboundData = require("../../../../assets/data/Emotion/breakup_rebound_10_common_suggestions.json");
        if (breakupReboundData && breakupReboundData.suggestions) {
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the breakup rebound data format to the expected format
          const interventions = breakupReboundData.suggestions.map((item: any) => ({
            title: item.title[currentLang],
            description: item.description[currentLang],
            xp: item.xp,
          }));

          return {
            metadata: {
              condition: "breakupAndRebound",
              intervention_type: "10 Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Breakup and Rebound comprehensive data:", error);
      }
    }
    
    // Special handling for Trauma, Loss and Dreams - use our new JSON file
    if (condition === "trauma-loss-and-dreams") {
      try {
        const traumaData = require("../../../../assets/data/Emotion/trauma_loss_dreams_10_common_suggestions.json");
        if (traumaData && traumaData.interventions && traumaData.interventions["10CommonSuggestions"]) {
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hi" : 
                            getCurrentLanguage() === "mr" ? "mr" : "en";
          
          // Transform the trauma data format to the expected format
          const languageData = traumaData.interventions["10CommonSuggestions"].languages[currentLang];
          const interventions = languageData.suggestions.map((item: any) => ({
            title: item.title,
            description: item.description,
            xp: item.xp,
          }));

          return {
            metadata: {
              condition: "trauma-loss-and-dreams",
              intervention_type: "10 Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Trauma, Loss and Dreams data:", error);
      }
    }
    
    // Special handling for Unrealistic Beauty Standards - use our consolidated JSON file
    if (condition === "unrealistic-beauty-standards") {
      try {
        const beautyStandardsData = require("../../../../assets/data/Emotion/unrealistic_beauty_standards_10_common_suggestions.json");
        if (beautyStandardsData && beautyStandardsData.suggestions) {
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the beauty standards data format to the expected format
          const interventions = beautyStandardsData.suggestions.map((item: any) => ({
            title: item.title[currentLang],
            description: item.description[currentLang],
            xp: item.xp,
          }));

          return {
            metadata: {
              condition: "unrealistic-beauty-standards",
              intervention_type: "Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Unrealistic Beauty Standards data:", error);
      }
    }
    
    // Special handling for Gambling and Gaming Addiction - use the comprehensive data file
    if (condition === "gambling-and-gaming-addiction") {
      try {
        const gamblingData = null // require commented due to space in path;
        if (gamblingData && gamblingData.interventions && gamblingData.interventions.commonSuggestions) {
          const { cards } = gamblingData.interventions.commonSuggestions;
          
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
            metadata: {
              condition: "gambling-and-gaming-addiction",
              intervention_type: "10 Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Gambling and Gaming Addiction comprehensive data:", error);
      }
    }
    
    // Special handling for Aggressive Behaviour - use the comprehensive data file
    if (condition === "aggressive-behaviour") {
      try {
        const aggressiveData = require("../../../../assets/data/behaviour/AggressiveBehaviour_comprehensive_data.json");
        if (aggressiveData && aggressiveData.interventions && aggressiveData.interventions.commonSuggestions) {
          const { cards } = aggressiveData.interventions.commonSuggestions;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Aggressive Behaviour data format to the expected format
          const interventions = cards.map((card: any) => ({
            title: card.title[currentLang],
            description: card.description[currentLang],
            xp: card.xp,
          }));

          return {
            metadata: {
              condition: "aggressive-behaviour",
              intervention_type: "10 Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
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
        if (eatingHabitsData && eatingHabitsData.interventions && eatingHabitsData.interventions.commonSuggestions) {
          const { cards } = eatingHabitsData.interventions.commonSuggestions;
          
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
            metadata: {
              condition: "eating-habits",
              intervention_type: "10 Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Eating Habits comprehensive data:", error);
      }
    }
    
    // Special handling for Conduct Issues - use the comprehensive data file
    if (condition === "conduct-issues") {
      try {
        const conductData = require("../../../../assets/data/behaviour/ConductIssues_Complete_comprehensive_data.json");
        if (conductData && conductData.interventions && conductData.interventions.commonSuggestions) {
          const { cards } = conductData.interventions.commonSuggestions;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Conduct Issues data format to the expected format
          const interventions = cards.map((card: any) => ({
            title: card.title[currentLang],
            description: card.description[currentLang],
            xp: card.xp,
          }));

          return {
            metadata: {
              condition: "conduct-issues",
              intervention_type: "10 Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Conduct Issues comprehensive data:", error);
      }
    }
    
    // Special handling for Dark Web and OnlyFans - use the comprehensive data file
    if (condition === "dark-web-onlyfans") {
      try {
        const darkWebData = null // require commented due to space in path;
        if (darkWebData && darkWebData.interventions && darkWebData.interventions.commonSuggestions) {
          const { cards } = darkWebData.interventions.commonSuggestions;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hindi" : 
                            getCurrentLanguage() === "mr" ? "marathi" : "english";
          
          // Transform the comprehensive Dark Web and OnlyFans data format to the expected format
          const interventions = cards.map((card: any) => ({
            title: card.title[currentLang],
            description: card.description[currentLang],
            xp: card.xp,
          }));

          return {
            metadata: {
              condition: "dark-web-onlyfans",
              intervention_type: "10 Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Dark Web and OnlyFans comprehensive data:", error);
      }
    }
    
    // Special handling for Internet Addiction - use the comprehensive data file
    if (condition === "internet-addiction") {
      try {
        const internetAddictionData = null // require commented due to space in path;
        if (internetAddictionData && internetAddictionData.commonSuggestions) {
          const { cards } = internetAddictionData.commonSuggestions;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hi" : 
                            getCurrentLanguage() === "mr" ? "mr" : "en";
          
          // Transform the comprehensive Internet Addiction data format to the expected format
          const interventions = cards.map((card: any) => ({
            title: card.title[currentLang],
            description: card.description[currentLang],
            xp: card.xp,
          }));

          return {
            metadata: {
              condition: "internet-addiction",
              intervention_type: "10 Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Internet Addiction comprehensive data:", error);
      }
    }
    
    // Special handling for Porn Addiction - use the comprehensive data file
    if (condition === "porn-addiction") {
      try {
        const pornAddictionData = null // require commented due to space in path;
        if (pornAddictionData && pornAddictionData.commonSuggestions) {
          const { cards } = pornAddictionData.commonSuggestions;
          
          // Get current language for proper translation
          const currentLang = getCurrentLanguage() === "hi" ? "hi" : 
                            getCurrentLanguage() === "mr" ? "mr" : "en";
          
          // Transform the comprehensive Porn Addiction data format to the expected format
          const interventions = cards.map((card: any) => ({
            title: card.title[currentLang],
            description: card.description[currentLang],
            xp: card.xp,
          }));

          return {
            metadata: {
              condition: "porn-addiction",
              intervention_type: "10 Common Suggestions",
              total_interventions: interventions.length,
            },
            interventions: interventions,
          };
        }
      } catch (error) {
        console.error("Error loading Porn Addiction comprehensive data:", error);
      }
    }
    
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
      "anger-management": { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      stress: { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      addictions: { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      "general-physical-fitness": { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      "suicidal-behavior": { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      "common-psychological-issues": { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      "family-relationship": { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      "internet-dependence": { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      "environment-issues": { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      "financial-mental-health": { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      "internet-social-media": { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      "professional-mental-health": { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      "sex-life": { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      sleep: { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      "social-mental-health": { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
      "youngster-issues": { suggestions: [], interventions: [] } as SuggestionsData, // require commented due to space in path
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
    loadSuggestions();
  }, [loadSuggestions]);

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
        "friendship-and-relationship": "friendshipAndRelationship",
        "self-esteem-and-self-identity": "selfEsteemAndSelfIdentity",
        "adhd": "adhd",
        "aggressive-behaviour": "aggressiveBehaviour",
        "eating-habits": "eatingHabits",
        "conduct-issues": "conductIssues",
        "introvert-child": "introvertChild",
        "substance-addiction": "substanceAddiction",
        "trauma-loss-and-dreams": "traumaLossAndDreams",
        "unrealistic-beauty-standards": "unrealisticBeautyStandards",
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
        "professional-mental-health":
          "scanIntro.professionalMentalHealth.title",
        "sex-life": "scanIntro.sexLife.title",
        sleep: "scanIntro.sleep.title",
        "social-mental-health": "scanIntro.socialMentalHealth.title",
        "youngster-issues": "scanIntro.youngsterIssues.title",
        "friendship-and-relationship": "friendshipAndRelationshipScreen.headerTitle",
        "self-esteem-and-self-identity": "selfEsteemAndSelfIdentityScreen.headerTitle",
        "adhd": "adhdScreen.headerTitle",
        "aggressive-behaviour": "aggressiveBehaviourScreen.english.headerTitle",
        "eating-habits": "eatingHabitsScreen.headerTitle",
        "conduct-issues": "conductIssues.headerTitle",
        "introvert-child": "introvertChildScreen.headerTitle",
        "substance-addiction": "substanceAddictionScreen.headerTitle",
        "trauma-loss-and-dreams": "traumaLossAndDreamsScreen.headerTitle",
        "unrealistic-beauty-standards": "unrealisticBeautyStandardsScreen.headerTitle",
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
        if (originalDescriptionKey) {
          try {
            // Force language-specific translation
            const oldLocale = getCurrentLanguage();
            changeLanguage(lang);
            const translatedDescription = t(originalDescriptionKey);
            changeLanguage(oldLocale); // Restore original locale
            return translatedDescription !== originalDescriptionKey
              ? translatedDescription
              : getSuggestionDescription(selectedSuggestion);
          } catch {
            return getSuggestionDescription(selectedSuggestion); // Fallback to original
          }
        }
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
        fullDescription: getSuggestionDescription(selectedSuggestion),
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
                >
                  <Text style={styles.cancelButtonText}>
                    {t("commonSuggestionsScreen.modal.cancel")}
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
