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
      "professional-mental-health": "scanIntro.professionalMentalHealth.title",
      "sex-life": "scanIntro.sexLife.title",
      sleep: "scanIntro.sleep.title",
      "social-mental-health": "scanIntro.socialMentalHealth.title",
      "youngster-issues": "scanIntro.youngsterIssues.title",
      "job-insecurity": "scanIntro.jobInsecurity.title",
    };
    const translationKey = conditionKeyMap[condition];
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
      "financial-mental-health": "financialMentalHealth",
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
