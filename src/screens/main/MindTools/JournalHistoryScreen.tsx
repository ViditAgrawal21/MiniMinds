import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Modal,
  TextInput,
  StatusBar,
} from "react-native";
import CustomIcon from "@/components/CustomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { t } from "@/i18n/locales/i18n";

interface Condition {
  id: string;
  name: string;
  category?: string;
  createdAt: string;
}

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

export default function JournalHistoryScreen({ navigation }: any) {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [journalCounts, setJournalCounts] = useState<Record<string, number>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [newJournalName, setNewJournalName] = useState("");
  const [newJournalCategory, setNewJournalCategory] = useState("");

  const loadConditionsAndJournals = useCallback(async () => {
    try {
      setIsLoading(true);

      // Load both conditions and journals in parallel for better performance
      const [storedConditions, storedJournals] = await Promise.all([
        AsyncStorage.getItem("conditions"),
        AsyncStorage.getItem("journal_entries"),
      ]);

      let loadedConditions: Condition[] = [];
      let allJournals: JournalEntry[] = [];

      // Parse conditions
      if (storedConditions && storedConditions !== "null") {
        try {
          const parsedConditions = JSON.parse(storedConditions);
          if (Array.isArray(parsedConditions)) {
            loadedConditions = parsedConditions;
          }
        } catch (parseError) {
          console.error("Error parsing stored conditions:", parseError);
        }
      }

      // Parse journals
      if (storedJournals && storedJournals !== "null") {
        try {
          const parsedJournals = JSON.parse(storedJournals);
          if (Array.isArray(parsedJournals)) {
            allJournals = parsedJournals;
          }
        } catch (parseError) {
          console.error("Error parsing stored journals:", parseError);
        }
      }

      // Update conditions first for immediate UI update
      setConditions(loadedConditions);

      // Calculate journal counts efficiently
      const counts: Record<string, number> = {};
      if (loadedConditions.length > 0) {
        loadedConditions.forEach((condition) => {
          counts[condition.id] = allJournals.filter(
            (journal) => journal.conditionId === condition.id,
          ).length;
        });
      }

      setJournalCounts(counts);
      console.log(
        `Loaded ${loadedConditions.length} conditions and ${allJournals.length} journal entries`,
      );
    } catch (error) {
      console.error("Error loading conditions and journals:", error);
      Alert.alert(t("journal.history.alerts.loadError"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Use useFocusEffect to reload data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadConditionsAndJournals();
    }, [loadConditionsAndJournals]),
  );

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const handleConditionPress = (conditionId: string, conditionName: string) => {
    console.log(`Opening journal for condition: ${conditionName}`);
    // Navigate to individual journal entries screen
    if (navigation) {
      navigation.navigate("JournalEntriesScreen", {
        conditionId,
        conditionName,
      });
    } else {
      Alert.alert("Navigation", `Open journal entries for: ${conditionName}`);
    }
  };

  const handleCreateJournal = async () => {
    if (!newJournalName.trim()) {
      Alert.alert(t("journal.history.alerts.nameRequired"));
      return;
    }

    if (newJournalName.trim().length < 3) {
      Alert.alert(t("journal.history.alerts.nameMinLength"));
      return;
    }

    try {
      const newCondition: Condition = {
        id: Date.now().toString(),
        name: newJournalName.trim(),
        category: newJournalCategory.trim() || undefined,
        createdAt: new Date().toISOString(),
      };

      // Update UI immediately for better UX
      const updatedConditions = [...conditions, newCondition];
      setConditions(updatedConditions);
      setJournalCounts((prev) => ({ ...prev, [newCondition.id]: 0 }));

      // Reset form and close modal immediately
      setNewJournalName("");
      setNewJournalCategory("");
      setIsCreateModalVisible(false);

      // Save to AsyncStorage in background
      try {
        await AsyncStorage.setItem(
          "conditions",
          JSON.stringify(updatedConditions),
        );
        Alert.alert(t("journal.history.alerts.createSuccess"));
      } catch (storageError) {
        console.error("Error saving to storage:", storageError);
        // Revert UI changes if storage fails
        setConditions(conditions);
        setJournalCounts((prev) => {
          const updated = { ...prev };
          delete updated[newCondition.id];
          return updated;
        });
        Alert.alert(t("journal.history.alerts.storageError"));
      }
    } catch (error) {
      console.error("Error creating journal:", error);
      Alert.alert(t("journal.history.alerts.createError"));
    }
  };

  const handleDeleteCondition = (
    conditionId: string,
    conditionName: string,
  ) => {
    Alert.alert(
      t("journal.history.alerts.deleteConfirm"),
      t("journal.history.alerts.deleteMessage", { name: conditionName }),
      [
        { text: t("journal.history.createModal.cancel"), style: "cancel" },
        {
          text: t("journal.history.alerts.deleteConfirm"),
          style: "destructive",
          onPress: () => deleteCondition(conditionId),
        },
      ],
    );
  };

  const deleteCondition = async (conditionId: string) => {
    try {
      // Remove condition
      const updatedConditions = conditions.filter((c) => c.id !== conditionId);
      setConditions(updatedConditions);

      // Remove from journal counts
      const updatedCounts = { ...journalCounts };
      delete updatedCounts[conditionId];
      setJournalCounts(updatedCounts);

      // Update AsyncStorage
      await AsyncStorage.setItem(
        "conditions",
        JSON.stringify(updatedConditions),
      );

      // Also remove all journal entries for this condition
      const storedJournals = await AsyncStorage.getItem("journal_entries");
      if (storedJournals) {
        const allJournals: JournalEntry[] = JSON.parse(storedJournals);
        const filteredJournals = allJournals.filter(
          (journal) => journal.conditionId !== conditionId,
        );
        await AsyncStorage.setItem(
          "journal_entries",
          JSON.stringify(filteredJournals),
        );
      }

      Alert.alert(t("journal.history.alerts.deleteSuccess"));
    } catch (error) {
      console.error("Error deleting condition:", error);
      Alert.alert(t("journal.history.alerts.deleteError"));
    }
  };

  const getBadgeText = (count: number): string => {
    if (count === 0) return t("journal.history.entryCounts.zero");
    return count === 1
      ? t("journal.history.entryCounts.one")
      : t("journal.history.entryCounts.multiple", { count });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={handleBackPress}>
            <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
          </Pressable>
          <Text style={styles.headerTitle}>{t("journal.history.title")}</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t("journal.history.loading")}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>{t("journal.history.title")}</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => setIsCreateModalVisible(true)}
        >
          <CustomIcon type="IO" name="add" size={24} color="#8b5cf6" />
          <Text style={styles.addButtonText}>
            {t("journal.history.newJournal")}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.subtitle}>{t("journal.history.subtitle")}</Text>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {conditions.length === 0 ? (
          <View style={styles.emptyState}>
            <CustomIcon type="IO" name="journal-outline" size={64} color="#9ca3af" />
            <Text style={styles.emptyTitle}>
              {t("journal.history.emptyState.title")}
            </Text>
            <Text style={styles.emptyDescription}>
              {t("journal.history.emptyState.description")}
            </Text>
            <Pressable
              style={styles.emptyButton}
              onPress={() => setIsCreateModalVisible(true)}
            >
              <Text style={styles.emptyButtonText}>
                {t("journal.history.emptyState.createButton")}
              </Text>
            </Pressable>
          </View>
        ) : (
          conditions.map((condition) => (
            <View key={condition.id} style={styles.conditionCard}>
              <Pressable
                style={styles.cardContent}
                onPress={() =>
                  handleConditionPress(condition.id, condition.name)
                }
              >
                <View style={styles.textContainer}>
                  <Text style={styles.conditionName}>{condition.name}</Text>
                  <Text style={styles.conditionSubtitle}>
                    {t("journal.history.entryCard.subtitle")}
                  </Text>
                  {condition.category && (
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>
                        {condition.category}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.rightSection}>
                  {/* Delete Button - Top */}
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() =>
                      handleDeleteCondition(condition.id, condition.name)
                    }
                  >
                    <CustomIcon type="IO" name="trash-outline" size={18} color="#ef4444" />
                  </Pressable>

                  {/* Entries Badge - Middle */}
                  <View style={styles.badgeContainer}>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {getBadgeText(journalCounts[condition.id] || 0)}
                      </Text>
                    </View>
                  </View>

                  {/* Arrow - Bottom */}
                  <View style={styles.chevronContainer}>
                    <CustomIcon type="IO"
                      name="chevron-forward"
                      size={20}
                      color="#9ca3af"
                    />
                  </View>
                </View>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>

      {/* Create Journal Modal */}
      <Modal
        visible={isCreateModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCreateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {t("journal.history.createModal.title")}
              </Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setIsCreateModalVisible(false)}
              >
                <CustomIcon type="IO" name="close" size={24} color="#6b7280" />
              </Pressable>
            </View>

            <View style={styles.form}>
              <Text style={styles.fieldLabel}>
                {t("journal.history.createModal.nameLabel")}
              </Text>
              <TextInput
                style={styles.textInput}
                value={newJournalName}
                onChangeText={setNewJournalName}
                placeholder={t("journal.history.createModal.namePlaceholder")}
                maxLength={100}
              />

              <Text style={styles.fieldLabel}>
                {t("journal.history.createModal.categoryLabel")}
              </Text>
              <TextInput
                style={styles.textInput}
                value={newJournalCategory}
                onChangeText={setNewJournalCategory}
                placeholder={t(
                  "journal.history.createModal.categoryPlaceholder",
                )}
                maxLength={50}
              />

              <View style={styles.buttonRow}>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setIsCreateModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>
                    {t("journal.history.createModal.cancel")}
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.createButton}
                  onPress={handleCreateJournal}
                >
                  <Text style={styles.createButtonText}>
                    {t("journal.history.createModal.create")}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#f8f9ff",
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    flex: 1,
    marginLeft: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8b5cf6",
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#6b7280",
    fontStyle: "italic",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: "#8b5cf6",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  emptyButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  conditionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
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
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  rightSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 12,
  },
  conditionName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  conditionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },
  badgeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
  badge: {
    backgroundColor: "#ede9fe",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 70,
  },
  badgeText: {
    fontSize: 10,
    color: "#8b5cf6",
    fontWeight: "500",
    textAlign: "center",
  },
  chevronContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: "#fee2e2",
    marginBottom: 4,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  form: {
    gap: 16,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1f2937",
    backgroundColor: "#ffffff",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6b7280",
  },
  createButton: {
    flex: 1,
    backgroundColor: "#8b5cf6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});
