import React, { useState } from "react";
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomIcon from "../../../../components/CustomIcon";

interface Intervention {
  title: string;
  description: string;
  xp: number;
}

interface SavedIntervention {
  id: string;
  title: string;
  subtitle: string;
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
  descriptionTranslations?: {
    en: string;
    hi: string;
    mr: string;
  };
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

export default function EmpathyStrategyScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedIntervention, setSelectedIntervention] =
    useState<Intervention | null>(null);
  const [modalAnimation] = useState(new Animated.Value(0));

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
      setSelectedIntervention(null);
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const strategyData = {
    title: "Empathy EQ",
    description:
      "Measures your ability to understand others' emotions and perspectives.",
    interventions: [
      {
        title: "Active Listening Practice",
        description:
          "Focus fully on the speaker, avoid interrupting, and reflect back what you hear to ensure understanding.",
        xp: 5,
      },
      {
        title: "Perspective-Taking Exercises",
        description:
          "Deliberately put yourself in others' shoes to imagine how they might feel or think in a given situation.",
        xp: 5,
      },
      {
        title: "Nonverbal Communication Awareness",
        description:
          "Pay close attention to body language, facial expressions, and tone of voice to better understand others' emotions.",
        xp: 5,
      },
      {
        title: "Empathy Mapping",
        description:
          "Create empathy maps to visualize what others might be thinking, feeling, seeing, and hearing in specific scenarios.",
        xp: 5,
      },
      {
        title: "Reading Fiction or Biographies",
        description:
          "Read stories from diverse perspectives to expand your understanding of different emotional experiences.",
        xp: 5,
      },
      {
        title: "Asking Open-Ended Questions",
        description:
          "Use open-ended questions in conversations to encourage others to share their feelings and viewpoints.",
        xp: 5,
      },
      {
        title: "Practicing Compassionate Responses",
        description:
          "Respond to others with kindness and understanding, even when you disagree or don't fully relate.",
        xp: 5,
      },
      {
        title: "Cultural Sensitivity Training",
        description:
          "Learn about different cultures and backgrounds to better appreciate and empathize with diverse perspectives.",
        xp: 5,
      },
      {
        title: "Reflecting on Emotional Impact",
        description:
          "After interactions, reflect on how your words and actions may have affected others emotionally.",
        xp: 5,
      },
      {
        title: "Volunteering or Community Service",
        description:
          "Engage in activities that expose you to people from different walks of life, fostering empathy through shared experiences.",
        xp: 5,
      },
    ],
  };

  const handleAddToTaskList = (intervention: Intervention) => {
    setSelectedIntervention(intervention);
    showModal();
  };

  const handleTaskFrequencySelect = async (frequency: string) => {
    if (!selectedIntervention) return;

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
        Alert.alert("Error", "Invalid frequency selected");
        return;
      }

      const newIntervention: SavedIntervention = {
        id: Date.now().toString(),
        title: selectedIntervention.title,
        subtitle: "From Empathy EQ Strategies",
        titleTranslations: {
          en: selectedIntervention.title,
          hi: selectedIntervention.title,
          mr: selectedIntervention.title,
        },
        subtitleTranslations: {
          en: "From Empathy EQ Strategies",
          hi: "From Empathy EQ Strategies",
          mr: "From Empathy EQ Strategies",
        },
        descriptionTranslations: {
          en: selectedIntervention.description,
          hi: selectedIntervention.description,
          mr: selectedIntervention.description,
        },
        originalTitleKey: undefined,
        originalSubtitleKey: undefined,
        originalDescriptionKey: undefined,
        conditionKey: "emotional-intelligence",
        tags: ["emotional-intelligence", "empathy"],
        xp: selectedIntervention.xp,
        date: new Date().toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
        isSelected: false,
        isCompleted: false,
        fullDescription: selectedIntervention.description,
        condition: "Emotional Intelligence",
        interventionType: "Empathy EQ",
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
          "Success",
          `"${selectedIntervention.title}" added to ${frequency.toLowerCase()} tasks successfully!`,
          [{ text: "OK" }],
        );
      }, 300);
    } catch (error) {
      console.error("Error saving intervention:", error);
      setTimeout(() => {
        Alert.alert("Error", "Failed to save intervention. Please try again.");
      }, 300);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <CustomIcon type="IO" name="arrow-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>{strategyData.title}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.imageContainer}>
              <CustomIcon type="IO" name="heart" size={48} color="#8b5cf6" />
              <Text style={styles.imageLabel}>Empathy</Text>
            </View>
          </View>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>{strategyData.title}</Text>
        <Text style={styles.description}>{strategyData.description}</Text>

        {/* Interventions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Strategies</Text>

          {strategyData.interventions.map((intervention, index) => (
            <View key={index} style={styles.interventionCard}>
              <View style={styles.interventionHeader}>
                <Text style={styles.interventionTitle}>
                  {intervention.title}
                </Text>
                <View style={styles.xpBadge}>
                  <Text style={styles.xpText}>{intervention.xp} XP</Text>
                </View>
              </View>
              <Text style={styles.interventionDescription}>
                {intervention.description}
              </Text>
              <Pressable
                style={styles.addButton}
                onPress={() => handleAddToTaskList(intervention)}
              >
                <Text style={styles.addButtonText}>Add to Task List</Text>
                <CustomIcon type="IO" name="add-circle" size={20} color="#8B5CF6" />
              </Pressable>
            </View>
          ))}
        </View>

        {/* Alert Box */}
        <View style={styles.alertBox}>
          <View style={styles.alertHeader}>
            <View style={styles.alertIconContainer}>
              <CustomIcon type="IO" name="information-circle" size={16} color="#3b82f6" />
            </View>
            <Text style={styles.alertTitle}>Remember</Text>
          </View>
          <Text style={styles.alertText}>
            Empathy helps you connect deeply with others. Practice active
            listening and perspective-taking to strengthen your relationships.
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#8b5cf6" />
        </View>
      )}

      {/* Custom Task Frequency Modal */}
      <Modal
        visible={showTaskModal}
        transparent={true}
        animationType="none"
        onRequestClose={hideModal}
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalOverlayTouchable} onPress={hideModal}>
            <View style={styles.modalContainer}>
              <Pressable onPress={() => {}} style={styles.modalContent}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Task Frequency</Text>
                  <Text style={styles.modalSubtitle}>
                    Choose how often you'd like to practice this strategy
                  </Text>
                </View>

                {/* Task Frequency Options */}
                <View style={styles.frequencyOptions}>
                  {[
                    {
                      key: "Daily",
                      icon: "today-outline",
                      color: "#10B981",
                      title: "Daily",
                      description: "Practice every day",
                    },
                    {
                      key: "Weekly",
                      icon: "calendar-outline",
                      color: "#3B82F6",
                      title: "Weekly",
                      description: "Practice once a week",
                    },
                    {
                      key: "Bi-Weekly",
                      icon: "calendar-number-outline",
                      color: "#8B5CF6",
                      title: "Bi-Weekly",
                      description: "Practice every two weeks",
                    },
                    {
                      key: "Monthly",
                      icon: "calendar-clear-outline",
                      color: "#F59E0B",
                      title: "Monthly",
                      description: "Practice once a month",
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
                        <CustomIcon
                          type="IO"
                          name={option.icon as any}
                          size={24}
                          color="#FFFFFF"
                        />
                      </View>
                      <View style={styles.frequencyTextContainer}>
                        <Text style={styles.frequencyText}>{option.title}</Text>
                        <Text style={styles.frequencyDescription}>
                          {option.description}
                        </Text>
                      </View>
                      <CustomIcon
                        type="IO"
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
                  <Text style={styles.cancelButtonText}>Cancel</Text>
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
    backgroundColor: "#f8f9ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#f8f9ff",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  illustrationBox: {
    width: "100%",
    height: 120,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  imageLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 8,
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  interventionCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  interventionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  interventionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
    marginRight: 12,
  },
  xpBadge: {
    backgroundColor: "#8b5cf6",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  xpText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  interventionDescription: {
    fontSize: 14,
    color: "#4b5563",
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
  alertBox: {
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
    marginBottom: 16,
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  alertIconContainer: {
    marginRight: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e40af",
  },
  alertText: {
    fontSize: 14,
    color: "#1e40af",
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 32,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
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
