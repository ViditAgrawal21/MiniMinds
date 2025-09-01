import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
  StatusBar,
  Modal,
} from "react-native";
import CustomIcon from "../../../components/CustomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useLanguage } from "../../../context/LanguageContext";

// Import the intervention data
import allInterventionsData from "../../../data/interventions.json";

interface JournalEntry {
  id: string;
  conditionId: string;
  title: string;
  content: string;
  date: string;
  time: string;
  type: string;
  mood?: string;
}

interface JournalEntriesScreenProps {
  navigation: any;
  route: {
    params?: {
      conditionId?: string;
      conditionName?: string;
      interventionTitle?: string;
      interventionType?:
        | "CBT"
        | "REBT"
        | "Yoga"
        | "Relaxation"
        | "Common Suggestions";
    };
  };
}

export default function JournalEntriesScreen({
  navigation,
  route,
}: JournalEntriesScreenProps) {
  const { locale, t } = useLanguage();
  const {
    conditionId = "",
    conditionName = "Journal",
    interventionTitle = "",
    interventionType = null,
  } = route.params || {};

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [newEntryType, setNewEntryType] = useState("daily");
  const [newEntryMood, setNewEntryMood] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isEntryModalVisible, setIsEntryModalVisible] = useState(false);
  const [extractedQuestions, setExtractedQuestions] = useState<string[]>([]);
  const [showStructuredEntry, setShowStructuredEntry] = useState(false);
  const [guidedResponses, setGuidedResponses] = useState<
    Record<number, string>
  >({});

  // Helper function to create safe keys for translation lookup
  const createSafeKey = (text: string): string => {
    // Remove special characters and convert to camelCase
    const cleaned = text.replace(/[^a-zA-Z0-9\s]/g, "");
    const words = cleaned.split(/\s+/).filter((word) => word.length > 0);
    if (!words.length) return "unknown";
    return (
      words[0].toLowerCase() +
      words
        .slice(1)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join("")
    );
  };

  // Function to get translated intervention title
  const getTranslatedInterventionTitle = useCallback(() => {
    if (!interventionTitle || !interventionType || !conditionName) {
      return interventionTitle;
    }

    try {
      // Create safe keys for lookup
      const conditionKey = createSafeKey(conditionName);
      const typeKey = interventionType.toLowerCase().includes("cbt")
        ? "cbt"
        : interventionType.toLowerCase().includes("rebt")
          ? "rebt"
          : interventionType.toLowerCase().includes("yoga")
            ? "yoga"
            : interventionType.toLowerCase().includes("relaxation")
              ? "relaxation"
              : "cbt";
      const titleKey = createSafeKey(interventionTitle);

      // Try to get translated title
      const titleTranslationKey = `interventionQuestions.${conditionKey}.${typeKey}.${titleKey}.title`;
      const translatedTitle = t(titleTranslationKey);
      
      // If translation exists and is different from the key, use it
      if (translatedTitle && translatedTitle !== titleTranslationKey) {
        console.log(`✅ Using translated title: ${translatedTitle}`);
        return translatedTitle;
      }
    } catch (error) {
      console.log("Title translation lookup failed:", error);
    }

    // Fallback to original title
    return interventionTitle;
  }, [interventionTitle, interventionType, conditionName]);

  // Function to load intervention questions from translated data
  const loadInterventionQuestions = useCallback(async () => {
    if (!interventionTitle || !interventionType || !conditionName) {
      console.log("Missing required parameters for loading questions");
      setExtractedQuestions([]);
      return;
    }

    try {
      console.log("Loading questions for:", {
        title: interventionTitle,
        type: interventionType,
        condition: conditionName,
      });

      // Create safe keys for lookup
      const conditionKey = createSafeKey(conditionName);
      const typeKey = interventionType.toLowerCase().includes("cbt")
        ? "cbt"
        : interventionType.toLowerCase().includes("rebt")
          ? "rebt"
          : interventionType.toLowerCase().includes("yoga")
            ? "yoga"
            : interventionType.toLowerCase().includes("relaxation")
              ? "relaxation"
              : "cbt";
      const titleKey = createSafeKey(interventionTitle);

      console.log("Generated keys:", { conditionKey, typeKey, titleKey });

      // Try to get translated questions
      const questionsTranslationKey = `interventionQuestions.${conditionKey}.${typeKey}.${titleKey}.questions`;
      console.log(
        "Attempting translation lookup with key:",
        questionsTranslationKey,
      );
      
      // Get questions using the translation system
      const questionsObj = t(questionsTranslationKey, { returnObjects: true });
      
      if (
        questionsObj &&
        typeof questionsObj === "object" &&
        !Array.isArray(questionsObj) &&
        String(questionsObj) !== questionsTranslationKey
      ) {
        // Convert object to array of questions
        const translatedQuestions = Object.values(questionsObj) as string[];
        console.log(
          `✅ Loaded ${translatedQuestions.length} translated questions`,
        );
        setExtractedQuestions(translatedQuestions);
        return;
      }

      console.log("Translation lookup failed, falling back to original data");

      // Fallback to original intervention data if translation fails
      if (!allInterventionsData || !Array.isArray(allInterventionsData)) {
        console.error("Invalid intervention data structure");
        setExtractedQuestions([]);
        return;
      }

      // Find the specific intervention by title, condition, and type
      const intervention = allInterventionsData.find(
        (item: any) =>
          item.Title === interventionTitle &&
          item["Issue Name"] === conditionName &&
          item["Intervention Sub Type"]
            ?.toLowerCase()
            .includes(interventionType.toLowerCase()),
      );

      if (intervention && intervention.extracted_value) {
        // Split extracted_value into individual questions
        const questions = intervention.extracted_value
          .split("\n")
          .filter((q: string) => q.trim() !== "")
          .map((q: string) => q.trim());

        setExtractedQuestions(questions);
        console.log(
          `⚠️ Fallback: Loaded ${questions.length} original questions for ${interventionTitle}`,
        );
      } else {
        console.warn(
          `No intervention found for: ${interventionTitle} in ${conditionName} (${interventionType})`,
        );
        setExtractedQuestions([]);
      }
    } catch (error) {
      console.error("Error loading intervention questions:", error);
      setExtractedQuestions([]);
    }
  }, [interventionTitle, interventionType, conditionName]);

  const loadJournalEntries = useCallback(async () => {
    try {
      setIsLoading(true);

      const storedJournals = await AsyncStorage.getItem("journal_entries");
      let allEntries: JournalEntry[] = [];

      if (storedJournals && storedJournals !== "null") {
        try {
          allEntries = JSON.parse(storedJournals);
        } catch (parseError) {
          console.error("Error parsing journal entries:", parseError);
          allEntries = [];
        }
      }

      // Filter and sort entries efficiently
      const filteredEntries = allEntries
        .filter((entry) => entry.conditionId === conditionId)
        .sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateB.getTime() - dateA.getTime();
        });

      setJournalEntries(filteredEntries);
    } catch (error) {
      console.error("Error loading journal entries:", error);
      Alert.alert(t("journal.entries.alerts.loadError"));
    } finally {
      setIsLoading(false);
    }
  }, [conditionId]);

  // Use useFocusEffect to reload data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadJournalEntries();
      loadInterventionQuestions();
    }, [loadJournalEntries, loadInterventionQuestions]),
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleEntryPress = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setIsEntryModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsEntryModalVisible(false);
    setSelectedEntry(null);
  };

  const handleDeleteFromModal = () => {
    if (selectedEntry) {
      handleCloseModal();
      handleDeleteEntry(selectedEntry.id);
    }
  };

  const handleCreateEntry = async () => {
    if (!newEntryTitle.trim() || !newEntryContent.trim()) {
      Alert.alert(t("journal.entries.alerts.titleRequired"));
      return;
    }

    if (newEntryTitle.trim().length < 3) {
      Alert.alert(t("journal.entries.alerts.titleMinLength"));
      return;
    }

    if (newEntryContent.trim().length < 10) {
      Alert.alert(t("journal.entries.alerts.contentMinLength"));
      return;
    }

    try {
      const now = new Date();
      const newEntry: JournalEntry = {
        id: `entry_${Date.now()}`,
        conditionId,
        title: newEntryTitle.trim(),
        content: newEntryContent.trim(),
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: newEntryType,
        mood: newEntryMood || undefined,
      };

      // Update UI immediately for better UX
      setJournalEntries((prev) => [newEntry, ...prev]);

      // Reset form immediately
      setNewEntryTitle("");
      setNewEntryContent("");
      setNewEntryType("daily");
      setNewEntryMood("");

      // Save to storage in background
      try {
        const storedJournals = await AsyncStorage.getItem("journal_entries");
        let allEntries: JournalEntry[] = [];

        if (storedJournals && storedJournals !== "null") {
          allEntries = JSON.parse(storedJournals);
        }

        allEntries.push(newEntry);
        await AsyncStorage.setItem(
          "journal_entries",
          JSON.stringify(allEntries),
        );
        
        Alert.alert(t("journal.entries.alerts.createSuccess"));
      } catch (storageError) {
        console.error("Error saving journal entry:", storageError);
        // Revert UI changes if storage fails
        setJournalEntries((prev) =>
          prev.filter((entry) => entry.id !== newEntry.id),
        );
        Alert.alert(t("journal.entries.alerts.storageError"));
      }
    } catch (error) {
      console.error("Error creating journal entry:", error);
      Alert.alert(t("journal.entries.alerts.createError"));
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    Alert.alert(
      t("journal.entries.alerts.deleteConfirm"),
      t("journal.entries.alerts.deleteMessage"),
      [
        { text: t("journal.history.createModal.cancel"), style: "cancel" },
        {
          text: t("journal.entries.alerts.deleteConfirm"),
          style: "destructive",
          onPress: async () => {
            try {
              // Update UI immediately for better UX
              const originalEntries = journalEntries;
              setJournalEntries((prev) =>
                prev.filter((entry) => entry.id !== entryId),
              );

              // Save to storage in background
              try {
                const storedJournals =
                  await AsyncStorage.getItem("journal_entries");
                let allEntries: JournalEntry[] = [];

                if (storedJournals && storedJournals !== "null") {
                  allEntries = JSON.parse(storedJournals);
                }

                const updatedEntries = allEntries.filter(
                  (entry) => entry.id !== entryId,
                );

                await AsyncStorage.setItem(
                  "journal_entries",
                  JSON.stringify(updatedEntries),
                );

                Alert.alert(t("journal.entries.alerts.deleteSuccess"));
              } catch (storageError) {
                console.error("Error deleting journal entry:", storageError);
                // Revert UI changes if storage fails
                setJournalEntries(originalEntries);
                Alert.alert(t("journal.entries.alerts.storageError"));
              }
            } catch (error) {
              console.error("Error deleting journal entry:", error);
              Alert.alert(t("journal.entries.alerts.deleteError"));
            }
          },
        },
      ],
    );
  };

  const handleSaveGuidedResponses = async () => {
    try {
      // Check if there are any responses
      const responses = Object.values(guidedResponses).filter(
        (response) => response.trim() !== "",
      );

      if (responses.length === 0) {
        Alert.alert(t("journal.entries.alerts.guidedResponseRequired"));
        return;
      }

      // Create formatted content from guided responses
      let formattedContent = "";
      extractedQuestions.forEach((question, index) => {
        const response = guidedResponses[index] || "";
        if (response.trim() !== "") {
          formattedContent += `Q: ${question}\nA: ${response}\n\n`;
        }
      });

      if (formattedContent.trim() === "") {
        Alert.alert(t("journal.entries.alerts.guidedResponseMinimum"));
        return;
      }

      const now = new Date();
      const newEntry: JournalEntry = {
        id: `guided_${Date.now()}`,
        conditionId,
        title: t("journal.entries.guidedEntry.titlePrefix", {
          title: getTranslatedInterventionTitle(),
        }),
        content: formattedContent.trim(),
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: `guided_${interventionType?.toLowerCase()}`,
        mood: undefined,
      };

      // Update UI immediately
      setJournalEntries((prev) => [newEntry, ...prev]);

      // Clear guided responses
      setGuidedResponses({});

      // Save to storage
      try {
        const storedJournals = await AsyncStorage.getItem("journal_entries");
        let allEntries: JournalEntry[] = [];

        if (storedJournals && storedJournals !== "null") {
          allEntries = JSON.parse(storedJournals);
        }

        allEntries.push(newEntry);
        await AsyncStorage.setItem(
          "journal_entries",
          JSON.stringify(allEntries),
        );

        Alert.alert(t("journal.entries.alerts.guidedSaveSuccess"));
      } catch (storageError) {
        console.error("Error saving guided responses:", storageError);
        // Revert UI changes if storage fails
        setJournalEntries((prev) =>
          prev.filter((entry) => entry.id !== newEntry.id),
        );
        Alert.alert(t("journal.entries.alerts.storageError"));
      }
    } catch (error) {
      console.error("Error saving guided responses:", error);
      Alert.alert(t("journal.entries.alerts.guidedSaveError"));
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={handleBackPress}>
            <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
          </Pressable>
          <Text style={styles.headerTitle}>{conditionName}</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t("journal.entries.loading")}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <View style={styles.headerActions}>
          <Pressable style={styles.headerIcon} onPress={handleCreateEntry}>
            <CustomIcon type="IO" name="save-outline" size={24} color="#6b7280" />
          </Pressable>
          <Pressable
            style={styles.headerIcon}
            onPress={() =>
              journalEntries.length > 0 &&
              handleDeleteEntry(journalEntries[0]?.id)
            }
          >
            <CustomIcon type="IO" name="trash-outline" size={24} color="#6b7280" />
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Intervention Questions Section */}
        {extractedQuestions.length > 0 && (
          <View style={styles.questionsContainer}>
            <View style={styles.questionHeader}>
              <Text style={styles.questionHeaderTitle}>
                {t("journal.entries.guidedQuestions.title", {
                  title: getTranslatedInterventionTitle(),
                })}
              </Text>
              <Text style={styles.questionHeaderSubtitle}>
                {t("journal.entries.guidedQuestions.subtitle", {
                  type: interventionType,
                  condition: conditionName,
                })}
              </Text>
            </View>

            <Pressable
              style={styles.toggleButton}
              onPress={() => setShowStructuredEntry(!showStructuredEntry)}
            >
              <Text style={styles.toggleButtonText}>
                {showStructuredEntry
                  ? t("journal.entries.guidedQuestions.hideButton")
                  : t("journal.entries.guidedQuestions.showButton")}
              </Text>
              <CustomIcon type="IO"
                name={showStructuredEntry ? "chevron-up" : "chevron-down"}
                size={20}
                color="#8b5cf6"
              />
            </Pressable>

            {showStructuredEntry && (
              <View style={styles.guidedQuestionsContainer}>
                {extractedQuestions.map((question, index) => (
                  <View key={index} style={styles.questionCard}>
                    <Text style={styles.questionText}>{question}</Text>
                    <TextInput
                      style={styles.questionInput}
                      placeholder={t(
                        "journal.entries.guidedQuestions.responsePlaceholder",
                      )}
                      placeholderTextColor="#9ca3af"
                      multiline={true}
                      textAlignVertical="top"
                      value={guidedResponses[index] || ""}
                      onChangeText={(text) =>
                        setGuidedResponses((prev) => ({
                          ...prev,
                          [index]: text,
                        }))
                      }
                    />
                  </View>
                ))}
                <Pressable
                  style={styles.saveGuidedButton}
                  onPress={handleSaveGuidedResponses}
                >
                  <Text style={styles.saveGuidedButtonText}>
                    {t("journal.entries.guidedQuestions.saveButton")}
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder={t("journal.entries.inputs.titlePlaceholder")}
            placeholderTextColor="#9ca3af"
            value={newEntryTitle}
            onChangeText={setNewEntryTitle}
            multiline={false}
          />

          <TextInput
            style={styles.noteInput}
            placeholder={t("journal.entries.inputs.notePlaceholder")}
            placeholderTextColor="#9ca3af"
            value={newEntryContent}
            onChangeText={setNewEntryContent}
            multiline={true}
            textAlignVertical="top"
          />
        </View>

        {/* Previous Entries */}
        {journalEntries.length > 0 && (
          <View style={styles.previousEntries}>
            <Text style={styles.previousEntriesTitle}>
              {t("journal.entries.previousEntries.title")}
            </Text>
            {journalEntries.map((entry) => (
              <Pressable
                key={entry.id}
                style={styles.entryCard}
                onPress={() => handleEntryPress(entry)}
              >
                <View style={styles.entryCardHeader}>
                  <Text style={styles.entryCardTitle}>{entry.title}</Text>
                  <CustomIcon type="IO" name="eye-outline" size={16} color="#9ca3af" />
                </View>
                <Text style={styles.entryCardContent} numberOfLines={2}>
                  {entry.content}
                </Text>
                <Text style={styles.entryCardDate}>
                  {entry.date} at {entry.time}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.bottomBarButton} onPress={handleCreateEntry}>
          <CustomIcon type="IO" name="add" size={24} color="#6b7280" />
        </Pressable>

        <Pressable style={styles.bottomBarButton}>
          <CustomIcon type="IO" name="happy-outline" size={24} color="#6b7280" />
        </Pressable>

        <Pressable style={styles.bottomBarButton}>
          <CustomIcon type="IO" name="text" size={24} color="#6b7280" />
        </Pressable>

        <View style={styles.timestampContainer}>
          <Text style={styles.timestampText}>
            {t("journal.entries.bottomBar.timestamp")}
          </Text>
        </View>

        <Pressable style={styles.saveButton} onPress={handleCreateEntry}>
          <CustomIcon type="IO" name="checkmark" size={24} color="#8b5cf6" />
        </Pressable>
      </View>

      {/* Entry Detail Modal */}
      <Modal
        visible={isEntryModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {t("journal.entries.modal.title")}
              </Text>
              <View style={styles.modalHeaderActions}>
                <Pressable
                  style={styles.deleteModalButton}
                  onPress={handleDeleteFromModal}
                >
                  <CustomIcon type="IO" name="trash-outline" size={20} color="#ef4444" />
                </Pressable>
                <Pressable
                  style={styles.closeButton}
                  onPress={handleCloseModal}
                >
                  <CustomIcon type="IO" name="close" size={24} color="#6b7280" />
                </Pressable>
              </View>
            </View>

            {selectedEntry && (
              <ScrollView
                style={styles.modalBody}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.modalScrollContent}
              >
                <Text style={styles.modalEntryTitle}>
                  {selectedEntry.title}
                </Text>
                <View style={styles.modalEntryMeta}>
                  <Text style={styles.modalEntryDate}>
                    {selectedEntry.date} at {selectedEntry.time}
                  </Text>
                  {selectedEntry.type && (
                    <View style={styles.modalEntryTypeBadge}>
                      <Text style={styles.modalEntryTypeText}>
                        {selectedEntry.type}
                      </Text>
                    </View>
                  )}
                  {selectedEntry.mood && (
                    <View style={styles.modalEntryMoodBadge}>
                      <Text style={styles.modalEntryMoodText}>
                        {selectedEntry.mood}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.modalContentContainer}>
                  <Text style={styles.modalContentLabel}>
                    {t("journal.entries.modal.contentLabel")}
                  </Text>
                  <Text style={styles.modalEntryContent}>
                    {selectedEntry.content}
                  </Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
    textAlign: "center",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerIcon: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 20,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    lineHeight: 36,
  },
  noteInput: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
    flex: 1,
    textAlignVertical: "top",
    paddingVertical: 0,
    minHeight: 300,
  },
  previousEntries: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  previousEntriesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
  },
  entryCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  entryCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  entryCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
  },
  entryCardContent: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 8,
  },
  entryCardDate: {
    fontSize: 12,
    color: "#9ca3af",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    gap: 16,
  },
  bottomBarButton: {
    padding: 8,
  },
  timestampContainer: {
    flex: 1,
    alignItems: "center",
  },
  timestampText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#6b7280",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    width: "100%",
    maxHeight: "85%",
    minHeight: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
  },
  modalHeaderActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deleteModalButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fef2f2",
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  modalEntryTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 12,
    lineHeight: 32,
  },
  modalEntryMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 8,
  },
  modalEntryDate: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  modalEntryTypeBadge: {
    backgroundColor: "#ddd6fe",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  modalEntryTypeText: {
    fontSize: 12,
    color: "#6d28d9",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  modalEntryMoodBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  modalEntryMoodText: {
    fontSize: 12,
    color: "#166534",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  modalContentContainer: {
    marginTop: 8,
  },
  modalContentLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  modalEntryContent: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 26,
    textAlign: "left",
  },
  // Guided Questions Styles
  questionsContainer: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  questionHeader: {
    marginBottom: 16,
  },
  questionHeaderTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  questionHeaderSubtitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 16,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8b5cf6",
  },
  guidedQuestionsContainer: {
    gap: 16,
  },
  questionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
    lineHeight: 22,
  },
  questionInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#374151",
    minHeight: 80,
    textAlignVertical: "top",
    backgroundColor: "#ffffff",
  },
  saveGuidedButton: {
    backgroundColor: "#8b5cf6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#8b5cf6",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveGuidedButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
