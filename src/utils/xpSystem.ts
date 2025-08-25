// XP System Utility Functions
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Intervention {
  id: string;
  type: "CBT" | "REBT" | "Other";
  name: string;
  xp: number;
  completedAt: string;
  conditionId: string;
}

export interface Condition {
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

export interface ActivityLog {
  id: string;
  title: string;
  type: string;
  timeAgo: string;
  xp: number;
  completedAt: string;
  interventionType?: "CBT" | "REBT" | "Other";
}

// XP System Functions
export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 1000) + 1;
};

export const calculateLevelProgress = (xp: number): number => {
  return ((xp % 1000) / 1000) * 100;
};

export const addInterventionXP = async (
  conditionId: string,
  interventionType: "CBT" | "REBT" | "Other",
  interventionName: string,
  xpAmount: number
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

export const addToActivityLog = async (
  conditionId: string,
  intervention: Intervention
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

export const getTotalXP = async (): Promise<number> => {
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

export const getConditionXP = async (conditionId: string): Promise<number> => {
  try {
    const storedConditions = await AsyncStorage.getItem("conditions");
    if (!storedConditions) return 0;

    const conditions: Condition[] = JSON.parse(storedConditions);
    const condition = conditions.find((c) => c.id === conditionId);
    return condition?.xp || 0;
  } catch (error) {
    console.error("Error getting condition XP:", error);
    return 0;
  }
};

export const getInterventionsForCondition = async (
  conditionId: string
): Promise<Intervention[]> => {
  try {
    const storedConditions = await AsyncStorage.getItem("conditions");
    if (!storedConditions) return [];

    const conditions: Condition[] = JSON.parse(storedConditions);
    const condition = conditions.find((c) => c.id === conditionId);
    return condition?.interventions || [];
  } catch (error) {
    console.error("Error getting interventions for condition:", error);
    return [];
  }
};
