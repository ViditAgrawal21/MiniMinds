import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import CustomIcon from "@/components/CustomIcon";
import Svg, { Circle } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

interface CircularProgressProps {
  percentage: number;
  xp: number;
  size: number;
  strokeWidth: number;
}

interface Intervention {
  id: string;
  type: "CBT" | "REBT" | "Other";
  name: string;
  xp: number;
  completedAt: string;
  conditionId: string;
}

interface Condition {
  id: string;
  name: string;
  description: string;
  percentage: number;
  xp: number;
  color: string;
  category: string;
  date: string;
  interventions: Intervention[];
}

interface DropdownProps {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder: string;
}

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  selectedDate: string;
}

interface ConditionsManagementScreenProps {
  navigation?: any;
  onBack?: () => void;
}

// XP System Functions
const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 1000) + 1;
};

const calculateLevelProgress = (xp: number): number => {
  return ((xp % 1000) / 1000) * 100;
};

const addInterventionXP = async (
  conditionId: string,
  interventionType: "CBT" | "REBT" | "Other",
  interventionName: string,
  xpAmount: number,
): Promise<void> => {
  try {
    // Get current conditions
    const storedConditions = await AsyncStorage.getItem("conditions");
    if (!storedConditions) return;

    const conditions: Condition[] = JSON.parse(storedConditions);
    const conditionIndex = conditions.findIndex((c) => c.id === conditionId);

    if (conditionIndex === -1) return;

    // Create new intervention
    const newIntervention: Intervention = {
      id: Date.now().toString(),
      type: interventionType,
      name: interventionName,
      xp: xpAmount,
      completedAt: new Date().toISOString(),
      conditionId,
    };

    // Update condition with new intervention and XP
    conditions[conditionIndex].interventions.push(newIntervention);
    conditions[conditionIndex].xp += xpAmount;

    // Save updated conditions
    await AsyncStorage.setItem("conditions", JSON.stringify(conditions));

    // Update activity log
    await addToActivityLog(conditionId, newIntervention);
  } catch (error) {
    console.error("Error adding intervention XP:", error);
  }
};

const addToActivityLog = async (
  conditionId: string,
  intervention: Intervention,
): Promise<void> => {
  try {
    const conditions = await AsyncStorage.getItem("conditions");
    if (!conditions) return;

    const parsedConditions: Condition[] = JSON.parse(conditions);
    const condition = parsedConditions.find((c) => c.id === conditionId);
    if (!condition) return;

    const activityLogsKey = `${condition.name
      .toLowerCase()
      .replace(/\s+/g, "_")}_activity_logs`;

    const existingLogs = await AsyncStorage.getItem(activityLogsKey);
    const logs = existingLogs ? JSON.parse(existingLogs) : [];

    const newLog = {
      id: intervention.id,
      title: `${intervention.type} - ${intervention.name}`,
      type: intervention.type,
      timeAgo: "Just now",
      xp: intervention.xp,
      completedAt: intervention.completedAt,
      interventionType: intervention.type,
    };

    logs.unshift(newLog);
    await AsyncStorage.setItem(activityLogsKey, JSON.stringify(logs));
  } catch (error) {
    console.error("Error adding to activity log:", error);
  }
};

const getTotalXP = async (): Promise<number> => {
  try {
    const storedConditions = await AsyncStorage.getItem("conditions");
    if (!storedConditions) return 0;

    const conditions: Condition[] = JSON.parse(storedConditions);
    return conditions.reduce((total, condition) => total + condition.xp, 0);
  } catch (error) {
    console.error("Error getting total XP:", error);
    return 0;
  }
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.dropdownContainer}>
      <Pressable style={styles.dropdown} onPress={() => setIsOpen(!isOpen)}>
        <Text
          style={[
            styles.dropdownText,
            !selectedValue && styles.placeholderText,
          ]}
        >
          {selectedValue || placeholder}
        </Text>
        <CustomIcon type="IO" name="chevron-down" size={20} color="#6b7280" />
      </Pressable>

      {isOpen && (
        <View style={styles.dropdownOptions}>
          {options.map((option) => (
            <Pressable
              key={option}
              style={styles.dropdownOption}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  onSelectDate,
  selectedDate,
}) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [selectedDay, setSelectedDay] = useState(
    parseInt(selectedDate.split("/")[1]) || new Date().getDate(),
  );

  const months = [
    t("conditionsManagement.months.january"),
    t("conditionsManagement.months.february"),
    t("conditionsManagement.months.march"),
    t("conditionsManagement.months.april"),
    t("conditionsManagement.months.may"),
    t("conditionsManagement.months.june"),
    t("conditionsManagement.months.july"),
    t("conditionsManagement.months.august"),
    t("conditionsManagement.months.september"),
    t("conditionsManagement.months.october"),
    t("conditionsManagement.months.november"),
    t("conditionsManagement.months.december"),
  ];

  const weekDays = [
    t("conditionsManagement.weekDays.sun"),
    t("conditionsManagement.weekDays.mon"),
    t("conditionsManagement.weekDays.tue"),
    t("conditionsManagement.weekDays.wed"),
    t("conditionsManagement.weekDays.thu"),
    t("conditionsManagement.weekDays.fri"),
    t("conditionsManagement.weekDays.sat"),
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDay;
      days.push(
        <Pressable
          key={day}
          style={[styles.calendarDay, isSelected && styles.selectedDay]}
          onPress={() => setSelectedDay(day)}
        >
          <Text
            style={[
              styles.calendarDayText,
              isSelected && styles.selectedDayText,
            ]}
          >
            {day}
          </Text>
        </Pressable>,
      );
    }

    return days;
  };

  const handleSelectDate = () => {
    const formattedDate = `${currentMonth + 1}/${selectedDay}/${currentYear}`;
    onSelectDate(formattedDate);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.datePickerModal}>
          <Text style={styles.datePickerTitle}>
            {t("conditionsManagement.form.selectDate")}
          </Text>

          <View style={styles.monthYearSelector}>
            <View style={styles.monthSelector}>
              <Text style={styles.monthText}>{months[currentMonth]}</Text>
              <CustomIcon type="IO" name="chevron-down" size={16} color="#6b7280" />
            </View>
            <View style={styles.yearSelector}>
              <Text style={styles.yearText}>{currentYear}</Text>
              <CustomIcon type="IO" name="chevron-down" size={16} color="#6b7280" />
            </View>
          </View>

          <View style={styles.calendarHeader}>
            {weekDays.map((day: string) => (
              <Text key={day} style={styles.calendarHeaderText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>{renderCalendar()}</View>

          <Pressable style={styles.selectDateButton} onPress={handleSelectDate}>
            <Text style={styles.selectDateButtonText}>
              {t("conditionsManagement.form.selectButton")}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  xp,
  size,
  strokeWidth,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={{ width: size, height: size }}>
      <Svg
        width={size}
        height={size}
        style={{ transform: [{ rotate: "-90deg" }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#8b5cf6"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View
        style={[styles.progressTextContainer, { width: size, height: size }]}
      >
        <Text style={styles.xpText}>{xp} XP</Text>
      </View>
    </View>
  );
};

export default function ConditionsManagementScreen({
  navigation,
  onBack,
}: ConditionsManagementScreenProps) {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    xp: "0",
    date: new Date().toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }),
  });

  const categories = [
    t("conditionsManagement.categories.anxietyDisorders"),
    t("conditionsManagement.categories.moodDisorders"),
    t("conditionsManagement.categories.personalityDisorders"),
    t("conditionsManagement.categories.obsessiveCompulsiveDisorders"),
    t("conditionsManagement.categories.traumaRelatedDisorders"),
    t("conditionsManagement.categories.eatingDisorders"),
    t("conditionsManagement.categories.substanceUseDisorders"),
    t("conditionsManagement.categories.sleepDisorders"),
  ];

  const therapyTypes = [
    t("conditionsManagement.therapyTypes.cbt"),
    t("conditionsManagement.therapyTypes.dbt"),
    t("conditionsManagement.therapyTypes.act"),
    t("conditionsManagement.therapyTypes.mindfulnessBased"),
    t("conditionsManagement.therapyTypes.psychodynamic"),
    t("conditionsManagement.therapyTypes.exposure"),
    t("conditionsManagement.therapyTypes.emdr"),
    t("conditionsManagement.therapyTypes.group"),
  ];

  useEffect(() => {
    loadConditions();

    // Set up interval to refresh data periodically
    const interval = setInterval(loadConditions, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadConditions = async () => {
    try {
      const storedConditions = await AsyncStorage.getItem("conditions");
      if (storedConditions) {
        setConditions(JSON.parse(storedConditions));
      } else {
        // Initialize with empty conditions
        setConditions([]);
        // Store empty array to avoid future sample data creation
        await AsyncStorage.setItem("conditions", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error loading conditions:", error);
    }
  };

  const saveConditions = async (newConditions: Condition[]) => {
    try {
      await AsyncStorage.setItem("conditions", JSON.stringify(newConditions));
      setConditions(newConditions);
    } catch (error) {
      console.error("Error saving conditions:", error);
    }
  };

  const handleBackPress = () => {
    if (onBack) {
      onBack();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  const handleConditionPress = (conditionName: string) => {
    // Find the condition data by name
    const condition = conditions.find((c) => c.name === conditionName);
    if (condition && navigation) {
      navigation.navigate("ConditionDetail", condition);
    }
  };

  const handleCreateCondition = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      xp: "0",
      date: new Date().toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      }),
    });
    setIsCreateModalVisible(true);
  };

  const handleSaveCondition = async () => {
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.category
    ) {
      Alert.alert("Error", t("conditionsManagement.form.validationError"));
      return;
    }

    const newCondition: Condition = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      xp: parseInt(formData.xp) || 0,
      date: formData.date,
      percentage: Math.floor(Math.random() * 100),
      color: "#f3e8ff",
      interventions: [],
    };

    const newConditions = [...conditions, newCondition];
    setIsCreateModalVisible(false);

    await saveConditions(newConditions);
  };

  const handleDeleteCondition = (conditionId: string) => {
    Alert.alert(
      t("conditionsManagement.deleteConfirmTitle"),
      t("conditionsManagement.deleteConfirmMessage"),
      [
        { text: t("conditionsManagement.cancel"), style: "cancel" },
        {
          text: t("conditionsManagement.delete"),
          style: "destructive",
          onPress: async () => {
            const newConditions = conditions.filter(
              (c) => c.id !== conditionId,
            );
            await saveConditions(newConditions);
          },
        },
      ],
    );
  };

  const renderModal = (
    visible: boolean,
    title: string,
    onClose: () => void,
  ) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <CustomIcon type="IO" name="close" size={24} color="#6b7280" />
            </Pressable>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.fieldLabel}>
              {t("conditionsManagement.form.nameLabel")}
            </Text>
            <TextInput
              style={styles.textInput}
              value={formData.name}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, name: text }))
              }
              placeholder={t("conditionsManagement.form.namePlaceholder")}
            />

            <Text style={styles.fieldLabel}>
              {t("conditionsManagement.form.descriptionLabel")}
            </Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.description}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, description: text }))
              }
              placeholder={t(
                "conditionsManagement.form.descriptionPlaceholder",
              )}
              multiline
              numberOfLines={4}
            />

            <View style={styles.dropdownRow}>
              <View style={styles.dropdownHalf}>
                <Dropdown
                  options={categories}
                  selectedValue={formData.category}
                  onSelect={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                  placeholder={t(
                    "conditionsManagement.form.categoryPlaceholder",
                  )}
                />
              </View>
              <View style={styles.dropdownHalf}>
                <Dropdown
                  options={therapyTypes}
                  selectedValue={
                    formData.category ===
                      t(
                        "conditionsManagement.categories.personalityDisorders",
                      ) ||
                    formData.category ===
                      t(
                        "conditionsManagement.categories.obsessiveCompulsiveDisorders",
                      )
                      ? formData.category
                      : t("conditionsManagement.therapyTypes.cbt")
                  }
                  onSelect={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                  placeholder={t(
                    "conditionsManagement.form.therapyTypePlaceholder",
                  )}
                />
              </View>
            </View>

            <View style={styles.bottomRow}>
              <Pressable style={styles.xpButton}>
                <Text style={styles.xpButtonText}>{formData.xp} XP</Text>
              </Pressable>

              <Pressable
                style={styles.dateButton}
                onPress={() => setIsDatePickerVisible(true)}
              >
                <Text style={styles.dateButtonText}>{formData.date}</Text>
                <CustomIcon type="IO" name="calendar-outline" size={20} color="#6b7280" />
              </Pressable>
            </View>

            <Pressable style={styles.saveButton} onPress={handleSaveCondition}>
              <Text style={styles.saveButtonText}>
                {t("conditionsManagement.form.createButton")}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>
          {t("conditionsManagement.title")}
        </Text>
        <Pressable style={styles.addButton} onPress={handleCreateCondition}>
          <CustomIcon type="IO" name="add" size={24} color="#8b5cf6" />
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {conditions.length === 0 ? (
          <View style={styles.emptyState}>
            <CustomIcon type="IO" name="medical-outline" size={64} color="#d1d5db" />
            <Text style={styles.emptyStateTitle}>
              {t("conditionsManagement.emptyState.title")}
            </Text>
            <Text style={styles.emptyStateText}>
              {t("conditionsManagement.emptyState.message")}
            </Text>
            <Pressable
              style={styles.addFirstConditionButton}
              onPress={handleCreateCondition}
            >
              <Text style={styles.addFirstConditionText}>
                {t("conditionsManagement.emptyState.addFirstButton")}
              </Text>
            </Pressable>
          </View>
        ) : (
          conditions.map((condition) => (
            <Pressable
              key={condition.id}
              style={styles.conditionCard}
              onPress={() => handleConditionPress(condition.name)}
            >
              <View style={styles.cardContent}>
                <View style={styles.conditionInfo}>
                  <Text style={styles.conditionName}>{condition.name}</Text>
                  <Text style={styles.conditionDescription}>
                    {condition.description}
                  </Text>
                  <Text style={styles.conditionCategory}>
                    {condition.category}
                  </Text>
                </View>
                <View style={styles.progressContainer}>
                  <View style={styles.levelIcon}>
                    <CustomIcon type="IO" name="trophy-outline" size={20} color="#8b5cf6" />
                    <Text style={styles.levelIconText}>
                      {t("conditionsManagement.level")}{" "}
                      {calculateLevel(condition.xp)}
                    </Text>
                  </View>
                  <CircularProgress
                    percentage={calculateLevelProgress(condition.xp)}
                    xp={condition.xp}
                    size={80}
                    strokeWidth={8}
                  />
                </View>
              </View>
              <View style={styles.cardActions}>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDeleteCondition(condition.id)}
                >
                  <CustomIcon type="IO" name="trash-outline" size={12} color="#ef4444" />
                  <Text style={styles.deleteButtonText}>
                    {t("conditionsManagement.deleteButton")}
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>

      {renderModal(
        isCreateModalVisible,
        t("conditionsManagement.form.createTitle"),
        () => setIsCreateModalVisible(false),
      )}

      <DatePickerModal
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSelectDate={(date) => setFormData((prev) => ({ ...prev, date }))}
        selectedDate={formData.date}
      />
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
    paddingHorizontal: 16,
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
    color: "#1a1a1a",
    flex: 1,
    textAlign: "center",
  },
  addButton: {
    padding: 8,
    marginRight: -8,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a1a1a",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  addFirstConditionButton: {
    backgroundColor: "#8b5cf6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addFirstConditionText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  conditionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  conditionInfo: {
    flex: 1,
    marginRight: 16,
  },
  conditionName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
    lineHeight: 22,
  },
  conditionDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 18,
    marginBottom: 4,
  },
  conditionCategory: {
    fontSize: 12,
    color: "#8b5cf6",
    fontWeight: "500",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    position: "relative",
  },
  progressTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  xpText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#8bcf6",
    textAlign: "center",
  },
  cardActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4,
  },
  viewButtonText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#8b5cf6",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4,
  },
  deleteButtonText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#ef4444",
  },
  levelIcon: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4,
    minWidth: 50,
  },
  levelIconText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8b5cf6",
    textAlign: "center",
  },

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
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backArrow: {
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
  },
  closeButton: {
    padding: 8,
    marginLeft: 12,
  },
  formContainer: {
    gap: 16,
  },
  fieldLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1a1a1a",
    backgroundColor: "#ffffff",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  dropdownRow: {
    flexDirection: "row",
    gap: 12,
  },
  dropdownHalf: {
    flex: 1,
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  dropdownText: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  placeholderText: {
    color: "#9ca3af",
  },
  dropdownOptions: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    marginTop: 4,
    zIndex: 1000,
    maxHeight: 200,
  },
  dropdownOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  dropdownOptionText: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  xpButton: {
    backgroundColor: "#8b5cf6",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  xpButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  saveButton: {
    backgroundColor: "#8b5cf6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  datePickerModal: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    width: "80%",
    maxWidth: 300,
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  monthYearSelector: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  yearSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  yearText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  calendarHeaderText: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    width: 32,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  calendarDay: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    borderRadius: 16,
  },
  selectedDay: {
    backgroundColor: "#8b5cf6",
  },
  calendarDayText: {
    fontSize: 14,
    color: "#1a1a1a",
  },
  selectedDayText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  selectDateButton: {
    backgroundColor: "#8b5cf6",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  selectDateButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
