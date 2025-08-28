import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  BackHandler,
} from "react-native";
import CustomIcon from "../../../components/CustomIcon";
import { useFocusEffect } from "@react-navigation/native";
import { t } from "../../../i18n/locales/i18n"; // Import the translation function

export default function InterventionDetailScreen({ navigation, route }: any) {
  const { intervention, previousScreen, activeTab, sourceScreen } = route.params;
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [forceUpdate, setForceUpdate] = useState(0); // Add force update state

  // Handle hardware back button for Android and navigation back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Navigate back to InterventionsScreen with proper tab and source info
        if (previousScreen === "InterventionsScreen") {
          navigation.navigate("InterventionsScreen", {
            activeTab: activeTab || "Daily",
            sourceScreen: sourceScreen || "MindTools",
          });
        } else {
          // Fallback to standard back navigation
          navigation.goBack();
        }
        return true; // Prevent default back action
      };

      // Add hardware back button listener for Android
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => backHandler.remove();
    }, [navigation, previousScreen, activeTab, sourceScreen]),
  );

  // Language change detection with improved triggering (unified with InterventionsScreen)
  useEffect(() => {
    const currentLocale = "en";
    if (currentLanguage !== currentLocale) {
      console.log(
        `[InterventionDetail] Language changed from ${currentLanguage} to ${currentLocale}`,
      );
      setCurrentLanguage(currentLocale);
      setForceUpdate((prev) => prev + 1); // Force re-render when language changes
    }
  }, [currentLanguage]); // Watch current language state

  // Additional effect to watch for external language changes
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentLocale = "en";
      if (currentLanguage !== currentLocale) {
        setCurrentLanguage(currentLocale);
      }
    }, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, [currentLanguage]);

  // Comprehensive translation mapping for common intervention terms (unified with InterventionsScreen)
  const interventionTranslations = {
    // Common intervention titles
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
    "Gratitude Journal": {
      en: "Gratitude Journal",
      hi: "कृतज्ञता डायरी",
      mr: "कृतज्ञता डायरी",
    },
    "Stress Management": {
      en: "Stress Management",
      hi: "तनाव प्रबंधन",
      mr: "तणाव व्यवस्थापन",
    },
    "Anxiety Relief": {
      en: "Anxiety Relief",
      hi: "चिंता राहत",
      mr: "चिंता निवारण",
    },
    "Sleep Hygiene": {
      en: "Sleep Hygiene",
      hi: "नींद की स्वच्छता",
      mr: "झोपेची स्वच्छता",
    },
    "Positive Thinking": {
      en: "Positive Thinking",
      hi: "सकारात्मक सोच",
      mr: "सकारात्मक विचार",
    },
    "Emotional Regulation": {
      en: "Emotional Regulation",
      hi: "भावनात्मक नियंत्रण",
      mr: "भावनात्मक नियंत्रण",
    },
    "Self-Care Routine": {
      en: "Self-Care Routine",
      hi: "स्वयं की देखभाल",
      mr: "स्वयं काळजी",
    },
    "Anger Management": {
      en: "Anger Management",
      hi: "गुस्सा प्रबंधन",
      mr: "राग व्यवस्थापन",
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
    "Journal Writing": {
      en: "Journal Writing",
      hi: "डायरी लेखन",
      mr: "नोंदणी लेखन",
    },
    "Cognitive Restructuring": {
      en: "Cognitive Restructuring",
      hi: "संज्ञानात्मक पुनर्गठन",
      mr: "संज्ञानात्मक पुनर्रचना",
    },
    
    // Common subtitles
    "Take 10 minutes to meditate": {
      en: "Take 10 minutes to meditate",
      hi: "10 मिनट ध्यान करें",
      mr: "10 मिनिटे ध्यान करा",
    },
    "Practice deep breathing": {
      en: "Practice deep breathing",
      hi: "गहरी सांस लें",
      mr: "खोल श्वास घ्या",
    },
    "Write down three things you're grateful for": {
      en: "Write down three things you're grateful for",
      hi: "तीन चीजें लिखें जिसके लिए आप कृतज्ञ हैं",
      mr: "तुम्ही कृतज्ञ असलेल्या तीन गोष्टी लिहा",
    },
    "Practice relaxation techniques": {
      en: "Practice relaxation techniques",
      hi: "आराम की तकनीक अभ्यास करें",
      mr: "विश्रांति तंत्र सराव करा",
    },
    "Focus on your breathing for 5 minutes": {
      en: "Focus on your breathing for 5 minutes",
      hi: "5 मिनट तक अपनी सांसों पर ध्यान दें",
      mr: "5 मिनिटे तुमच्या श्वासावर लक्ष केंद्रित करा",
    },
    "Write about your thoughts and feelings": {
      en: "Write about your thoughts and feelings",
      hi: "अपने विचारों और भावनाओं के बारे में लिखें",
      mr: "तुमचे विचार आणि भावना लिहा",
    },
    "Practice letting go of negative thoughts": {
      en: "Practice letting go of negative thoughts",
      hi: "नकारात्मक विचारों को छोड़ने का अभ्यास करें",
      mr: "नकारात्मक विचार सोडण्याचा सराव करा",
    },
    "Take time for yourself today": {
      en: "Take time for yourself today",
      hi: "आज अपने लिए समय निकालें",
      mr: "आज स्वतःसाठी वेळ काढा",
    },
    "Practice mindful awareness": {
      en: "Practice mindful awareness",
      hi: "सचेत जागरूकता का अभ्यास करें",
      mr: "सजग जागरूकतेचा सराव करा",
    },
    "Challenge negative thought patterns": {
      en: "Challenge negative thought patterns",
      hi: "नकारात्मक विचार पैटर्न को चुनौती दें",
      mr: "नकारात्मक विचार पद्धतींना आव्हान द्या",
    },
    
    // Common words that might appear in interventions
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
      mr: "विश्रांति",
    },
    mindfulness: {
      en: "mindfulness",
      hi: "सचेतना",
      mr: "सचेतता",
    },
    exercise: {
      en: "exercise",
      hi: "व्यायाम",
      mr: "व्यायाम",
    },
    journal: {
      en: "journal",
      hi: "डायरी",
      mr: "नोंदणी",
    },
    practice: {
      en: "practice",
      hi: "अभ्यास",
      mr: "सराव",
    },
    therapy: {
      en: "therapy",
      hi: "चिकित्सा",
      mr: "चिकित्सा",
    },
    // Additional common terms that might appear in interventions
    Identify: {
      en: "Identify",
      hi: "पहचानें",
      mr: "ओळखा",
    },
    Communication: {
      en: "Communication",
      hi: "संवाद",
      mr: "संवाद",
    },
    "Irrational Beliefs": {
      en: "Irrational Beliefs",
      hi: "अतार्किक विश्वास",
      mr: "अतार्किक समज",
    },
    "Family Relationship": {
      en: "Family Relationship",
      hi: "पारिवारिक संबंध",
      mr: "कौटुंबिक नाते",
    },
    identify: {
      en: "identify",
      hi: "पहचानना",
      mr: "ओळखणे",
    },
    communication: {
      en: "communication",
      hi: "संवाद",
      mr: "संवाद",
    },
    beliefs: {
      en: "beliefs",
      hi: "विश्वास",
      mr: "समज",
    },
    irrational: {
      en: "irrational",
      hi: "अतार्किक",
      mr: "अतार्किक",
    },
    family: {
      en: "family",
      hi: "पारिवारिक",
      mr: "कौटुंबिक",
    },
    relationship: {
      en: "relationship",
      hi: "संबंध",
      mr: "नाते",
    },
  };

  // Enhanced helper function to get localized text with dynamic translation support
  const getLocalizedText = (
    intervention: any,
    field: "title" | "subtitle",
  ): string => {
    const currentLocale = "en" as "en" | "hi" | "mr";
    const originalText =
      field === "title" ? intervention.title : intervention.subtitle;
    
    // First, try dynamic translation using stored translation keys
    if (field === "title" && intervention.originalTitleKey) {
      try {
        const dynamicTranslation = t(intervention.originalTitleKey);
        console.log(
          `[InterventionDetail] Title translation attempt: key="${intervention.originalTitleKey}", locale="${currentLocale}", result="${dynamicTranslation}"`,
        );
        if (
          dynamicTranslation &&
          dynamicTranslation !== intervention.originalTitleKey
        ) {
          return dynamicTranslation;
        }
      } catch (error) {
        console.log(
          "[InterventionDetail] Error with dynamic title translation:",
          error,
        );
      }
    }

    if (
      field === "subtitle" &&
      intervention.originalSubtitleKey &&
      intervention.conditionKey
    ) {
      try {
        const conditionName = t(intervention.conditionKey);
        console.log(
          `[InterventionDetail] Condition translation: key="${intervention.conditionKey}", locale="${currentLocale}", result="${conditionName}"`,
        );
        const dynamicTranslation = t(intervention.originalSubtitleKey, {
          conditionName,
        });
        console.log(
          `[InterventionDetail] Subtitle translation attempt: key="${intervention.originalSubtitleKey}", locale="${currentLocale}", conditionName="${conditionName}", result="${dynamicTranslation}"`,
        );
        if (
          dynamicTranslation &&
          dynamicTranslation !== intervention.originalSubtitleKey
        ) {
          return dynamicTranslation;
        }
      } catch (error) {
        console.log(
          "[InterventionDetail] Error with dynamic subtitle translation:",
          error,
        );
      }
    }

    // Second, try to get from stored translations
    const storedTranslation =
      field === "title"
        ? intervention.titleTranslations?.[currentLocale]
        : intervention.subtitleTranslations?.[currentLocale];
    
    if (storedTranslation && storedTranslation.trim() !== "") {
      return storedTranslation;
    }
    
    // Third, try to get from common translations mapping (exact match only)
    const commonTranslation =
      interventionTranslations[
        originalText as keyof typeof interventionTranslations
      ];
    if (commonTranslation) {
      return commonTranslation[currentLocale];
    }
    
    // Try case-insensitive exact match
    const lowerCaseText = originalText.toLowerCase();
    const caseInsensitiveMatch = Object.keys(interventionTranslations).find(
      (key) => key.toLowerCase() === lowerCaseText,
    );
    if (caseInsensitiveMatch) {
      const translation =
        interventionTranslations[
          caseInsensitiveMatch as keyof typeof interventionTranslations
        ];
      return translation[currentLocale];
    }
    
    // For partial matching, be more conservative - only match if the text is very similar
    for (const [key, translation] of Object.entries(interventionTranslations)) {
      const keyLower = key.toLowerCase();
      const textLower = originalText.toLowerCase();
      
      // Only match if the texts are very similar (exact substring match and similar length)
      if (
        keyLower === textLower ||
        (keyLower.includes(textLower) &&
          Math.abs(keyLower.length - textLower.length) <= 3) ||
        (textLower.includes(keyLower) &&
          Math.abs(keyLower.length - textLower.length) <= 3)
      ) {
        return translation[currentLocale];
      }
    }
    
    // Simplified word translation - only for single words that are common terms
    const trimmedText = originalText.trim();
    if (!trimmedText.includes(" ") && trimmedText.length > 3) {
      const cleanWord = trimmedText.toLowerCase().replace(/[^\w]/g, "");
      const wordTranslation =
        interventionTranslations[
          cleanWord as keyof typeof interventionTranslations
        ];
      
      if (wordTranslation) {
        return wordTranslation[currentLocale];
      }
    }
    
    // Finally, fall back to original text
    return originalText;
  };

  // Helper function to get localized condition name
  const getLocalizedCondition = (condition: string): string => {
    // If intervention has stored condition key, try dynamic translation first
    if (intervention.conditionKey) {
      try {
        const dynamicTranslation = t(intervention.conditionKey);
        console.log(
          `[InterventionDetail] Condition dynamic translation: key="${intervention.conditionKey}", result="${dynamicTranslation}"`,
        );
        if (
          dynamicTranslation &&
          dynamicTranslation !== intervention.conditionKey
        ) {
          return dynamicTranslation;
        }
      } catch (error) {
        console.log(
          "[InterventionDetail] Error with condition dynamic translation:",
          error,
        );
      }
    }

    // Fallback to original condition name
    return condition;
  };

  // Helper function to get localized tag text
  const getLocalizedTag = (tag: string): string => {
    const currentLocale = "en" as "en" | "hi" | "mr";
    
    // Try to find translation in the common mapping
    const tagTranslation =
      interventionTranslations[tag as keyof typeof interventionTranslations];
    if (tagTranslation) {
      return tagTranslation[currentLocale];
    }
    
    // Try case-insensitive match
    const lowerCaseTag = tag.toLowerCase();
    const caseInsensitiveMatch = Object.keys(interventionTranslations).find(
      (key) => key.toLowerCase() === lowerCaseTag,
    );
    if (caseInsensitiveMatch) {
      const translation =
        interventionTranslations[
          caseInsensitiveMatch as keyof typeof interventionTranslations
        ];
      return translation[currentLocale];
    }
    
    // Return original tag if no translation found
    return tag;
  };

  // Helper function to get localized full description
  const getLocalizedDescription = (description: string): string => {
    const currentLocale = "en" as "en" | "hi" | "mr";
    
    // If intervention has stored description translations, use them
    if (intervention.descriptionTranslations?.[currentLocale]) {
      const storedTranslation =
        intervention.descriptionTranslations[currentLocale];
      if (storedTranslation && storedTranslation.trim() !== "") {
        return storedTranslation;
      }
    }
    
    // If intervention has original description key for dynamic translation
    if (intervention.originalDescriptionKey) {
      try {
        const dynamicTranslation = t(intervention.originalDescriptionKey);
        console.log(
          `[InterventionDetail] Description dynamic translation: key="${intervention.originalDescriptionKey}", result="${dynamicTranslation}"`,
        );
        if (
          dynamicTranslation &&
          dynamicTranslation !== intervention.originalDescriptionKey
        ) {
          return dynamicTranslation;
        }
      } catch (error) {
        console.log(
          "[InterventionDetail] Error with description dynamic translation:",
          error,
        );
      }
    }
    
    // Try to find translation in the common mapping for shorter descriptions
    const descriptionTranslation =
      interventionTranslations[
        description as keyof typeof interventionTranslations
      ];
    if (descriptionTranslation) {
      return descriptionTranslation[currentLocale];
    }
    
    // Try case-insensitive match for shorter descriptions
    const lowerCaseDescription = description.toLowerCase();
    const caseInsensitiveMatch = Object.keys(interventionTranslations).find(
      (key) => key.toLowerCase() === lowerCaseDescription,
    );
    if (caseInsensitiveMatch) {
      const translation =
        interventionTranslations[
          caseInsensitiveMatch as keyof typeof interventionTranslations
        ];
      return translation[currentLocale];
    }
    
    // For longer descriptions, try to translate individual sentences or phrases
    // This is a basic implementation - you might want to enhance this further
    let translatedDescription = description;
    
    // Try to translate common phrases within the description
    Object.entries(interventionTranslations).forEach(
      ([englishText, translations]) => {
        if (description.includes(englishText)) {
          translatedDescription = translatedDescription.replace(
            new RegExp(englishText, "gi"),
            translations[currentLocale],
          );
        }
      },
    );
    
    // Return the processed description (or original if no translations found)
    return translatedDescription;
  };

  const handleBackPress = () => {
    // Navigate back to InterventionsScreen with proper tab and source info
    if (previousScreen === "InterventionsScreen") {
      navigation.navigate("InterventionsScreen", {
        activeTab: activeTab || "Daily",
        sourceScreen: sourceScreen || "MindTools",
      });
    } else if (previousScreen) {
      navigation.navigate(previousScreen);
    } else {
      navigation.goBack();
    }
  };

  // Helper function to get localized intervention type
  const getLocalizedInterventionType = (type: string): string => {
    const currentLocale = "en" as "en" | "hi" | "mr";
    
    // Define intervention type translations
    const typeTranslations: Record<
      string,
      { en: string; hi: string; mr: string }
    > = {
      CBT: {
        en: "CBT",
        hi: "संज्ञानात्मक व्यवहार चिकित्सा",
        mr: "संज्ञानात्मक वर्तणूक चिकित्सा",
      },
      REBT: {
        en: "REBT",
        hi: "रैशनल इमोटिव बिहेवियर थेरेपी",
        mr: "रॅशनल इमोटिव्ह बिहेवियर थेरपी",
      },
      Yoga: {
        en: "Yoga",
        hi: "योग",
        mr: "योग",
      },
      Relaxation: {
        en: "Relaxation",
        hi: "विश्राम",
        mr: "विश्रांति",
      },
      "Common Suggestions": {
        en: "Common Suggestions",
        hi: "सामान्य सुझाव",
        mr: "सामान्य सूचना",
      },
    };
    
    const typeTranslation = typeTranslations[type];
    if (typeTranslation) {
      return typeTranslation[currentLocale];
    }
    
    // Try case-insensitive match
    const lowerCaseType = type.toLowerCase();
    const caseInsensitiveMatch = Object.keys(typeTranslations).find(
      (key) => key.toLowerCase() === lowerCaseType,
    );
    if (caseInsensitiveMatch) {
      const translation = typeTranslations[caseInsensitiveMatch];
      return translation[currentLocale];
    }
    
    // Fallback to original type
    return type;
  };

  const getInterventionTypeColor = (type?: string): string => {
    switch (type?.toLowerCase()) {
      case "cbt":
        return "#3B82F6";
      case "rebt":
        return "#7C3AED";
      case "yoga":
        return "#10B981";
      case "relaxation":
        return "#6366F1";
      case "common suggestions":
        return "#8B5CF6";
      default:
        return "#6B7280";
    }
  };

  const getInterventionTypeIcon = (type?: string): string => {
    switch (type?.toLowerCase()) {
      case "cbt":
        return "brain-outline";
      case "rebt":
        return "psychology-outline";
      case "yoga":
        return "leaf-outline";
      case "relaxation":
        return "flower-outline";
      case "common suggestions":
        return "bulb-outline";
      default:
        return "document-text-outline";
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      key={`intervention-detail-${forceUpdate}`}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>
          {t("interventionDetailScreen.title")}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Card */}
        <View style={styles.mainCard}>
          {/* XP Badge */}
          <View
            style={[
              styles.xpBadge,
              {
                backgroundColor: getInterventionTypeColor(
                  intervention.interventionType,
                ),
              },
            ]}
          >
            <CustomIcon type="IO" name="star" size={14} color="#FFFFFF" />
            <Text style={styles.xpText}>
              {intervention.xp} {t("interventionDetailScreen.xpLabel")}
            </Text>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>
              {getLocalizedText(intervention, "title")}
            </Text>
            <Text style={styles.subtitle}>
              {getLocalizedText(intervention, "subtitle")}
            </Text>
          </View>

          {/* Intervention Type */}
          {intervention.interventionType && (
            <View style={styles.typeSection}>
              <View
                style={[
                  styles.typeIcon,
                  {
                    backgroundColor: getInterventionTypeColor(
                      intervention.interventionType,
                    ),
                  },
                ]}
              >
                <CustomIcon type="IO"
                  name={
                    getInterventionTypeIcon(
                      intervention.interventionType,
                    ) as any
                  }
                  size={20}
                  color="#FFFFFF"
                />
              </View>
              <Text style={styles.typeText}>
                {getLocalizedInterventionType(intervention.interventionType)}
              </Text>
            </View>
          )}

          {/* Condition */}
          {intervention.condition && (
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>
                {t("interventionDetailScreen.condition")}
              </Text>
              <View style={styles.conditionBadge}>
                <CustomIcon type="IO" name="medical-outline" size={16} color="#059669" />
                <Text style={styles.conditionText}>
                  {getLocalizedCondition(intervention.condition)}
                </Text>
              </View>
            </View>
          )}

          {/* Tags */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>
              {t("interventionDetailScreen.categories")}
            </Text>
            <View style={styles.tagsContainer}>
              {intervention.tags.map((tag: string, index: number) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{getLocalizedTag(tag)}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Date Added */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>
              {t("interventionDetailScreen.dateAdded")}
            </Text>
            <View style={styles.dateContainer}>
              <CustomIcon type="IO" name="calendar-outline" size={16} color="#6B7280" />
              <Text style={styles.dateText}>{intervention.date}</Text>
            </View>
          </View>
        </View>

        {/* Description Section */}
        {intervention.fullDescription && (
          <View style={styles.descriptionCard}>
            <View style={styles.descriptionHeader}>
              <CustomIcon type="IO"
                name="document-text-outline"
                size={20}
                color="#374151"
              />
              <Text style={styles.descriptionTitle}>
                {t("interventionDetailScreen.fullDescription")}
              </Text>
            </View>
            <Text style={styles.descriptionText}>
              {getLocalizedDescription(intervention.fullDescription)}
            </Text>
          </View>
        )}

        {/* Status Section */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>
            {t("interventionDetailScreen.statusInformation")}
          </Text>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>
              {t("interventionDetailScreen.completionStatus")}
            </Text>
            <View
              style={[
                styles.statusBadge,
                intervention.isCompleted
                  ? styles.completedBadge
                  : styles.pendingBadge,
              ]}
            >
              <CustomIcon type="IO"
                name={
                  intervention.isCompleted ? "checkmark-circle" : "time-outline"
                }
                size={14}
                color={intervention.isCompleted ? "#059669" : "#D97706"}
              />
              <Text
                style={[
                  styles.statusText,
                  intervention.isCompleted
                    ? styles.completedText
                    : styles.pendingText,
                ]}
              >
                {intervention.isCompleted
                  ? t("interventionDetailScreen.completed")
                  : t("interventionDetailScreen.pending")}
              </Text>
            </View>
          </View>
          {intervention.isSelected && (
            <View style={styles.statusItem}>
              <Text style={styles.statusLabel}>
                {t("interventionDetailScreen.taskStatus")}
              </Text>
              <View style={styles.selectedBadge}>
                <CustomIcon type="IO" name="checkmark-circle" size={14} color="#8B5CF6" />
                <Text style={styles.selectedText}>
                  {t("interventionDetailScreen.selectedForCompletion")}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  xpBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  xpText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 4,
  },
  titleSection: {
    marginBottom: 20,
    marginRight: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
  },
  typeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  typeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
  infoSection: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
  },
  conditionBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  conditionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#059669",
    marginLeft: 6,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#4B5563",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
  },
  descriptionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  descriptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
  },
  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statusLabel: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  completedBadge: {
    backgroundColor: "#ECFDF5",
  },
  pendingBadge: {
    backgroundColor: "#FEF3C7",
  },
  selectedBadge: {
    backgroundColor: "#F3E8FF",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  completedText: {
    color: "#059669",
  },
  pendingText: {
    color: "#D97706",
  },
  selectedText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#8B5CF6",
    marginLeft: 4,
  },
});
