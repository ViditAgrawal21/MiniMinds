import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { t } from "../../i18n/i18n"; // Import the translation function
import { Portal, Dialog, Paragraph, Button } from "react-native-paper";
import { canAccessFeature } from "../../utils/premiumUtils";

export default function AngerManagementScreen({ navigation }: any) {
  // Upgrade dialog state
  const [dialogVisible, setDialogVisible] = useState(false);
  const [blockedPlan, setBlockedPlan] = useState<"basic" | null>(null);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleViewStrategy = async (strategyKey: string) => {
    console.log(`${strategyKey} strategy pressed`);

    // Intercept CBT & REBT for upgrade gating (free condition -> basic required)
    if (strategyKey === "cbt" || strategyKey === "rebt") {
      const canAccess = await canAccessFeature("basic");
      if (!canAccess) {
        setBlockedPlan("basic");
        setDialogVisible(true);
        return;
      }
    }

    switch (strategyKey) {
      case "commonSuggestions":
        navigation.navigate("CommonSuggestionsScreen", {
          condition: "anger-management",
        });
        break;
      case "yoga":
        navigation.navigate("YogaScreen", {
          condition: "anger-management",
        });
        break;
      case "relaxation":
        navigation.navigate("RelaxationScreen", {
          condition: "anger-management",
        });
        break;
      case "cbt":
        navigation.navigate("CBTScreen", {
          condition: "anger-management",
        });
        break;
      case "rebt":
        navigation.navigate("REBTScreen", {
          condition: "anger-management",
        });
        break;
      default:
        console.log(`Unknown strategy: ${strategyKey}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>
          {t("angerManagementScreen.headerTitle")}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.imageContainer}>
              <Ionicons name="flame" size={48} color="#dc2626" />
              <Text style={styles.imageLabel}>
                {t("angerManagementScreen.imageLabel")}
              </Text>
            </View>
          </View>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>{t("angerManagementScreen.title")}</Text>
        <Text style={styles.description}>
          {t("angerManagementScreen.description")}
        </Text>

        {/* Symptoms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("angerManagementScreen.symptomsTitle")}
          </Text>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("angerManagementScreen.symptoms.irritability")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("angerManagementScreen.symptoms.aggression")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("angerManagementScreen.symptoms.difficultyCalming")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("angerManagementScreen.symptoms.relationshipConflicts")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("angerManagementScreen.symptoms.regret")}
            </Text>
          </View>
        </View>

        {/* Coping Strategies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("angerManagementScreen.copingStrategiesTitle")}
          </Text>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("angerManagementScreen.strategies.commonSuggestions.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t(
                "angerManagementScreen.strategies.commonSuggestions.description",
              )}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("commonSuggestions")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("angerManagementScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("angerManagementScreen.strategies.yoga.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("angerManagementScreen.strategies.yoga.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("yoga")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("angerManagementScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("angerManagementScreen.strategies.relaxation.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("angerManagementScreen.strategies.relaxation.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("relaxation")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("angerManagementScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("angerManagementScreen.strategies.cbt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("angerManagementScreen.strategies.cbt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("cbt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("angerManagementScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("angerManagementScreen.strategies.rebt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("angerManagementScreen.strategies.rebt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("rebt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("angerManagementScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Alert Box */}
        <View style={styles.alertBox}>
          <View style={styles.alertHeader}>
            <View style={styles.alertIconContainer}>
              <Ionicons name="warning" size={16} color="#dc2626" />
            </View>
            <Text style={styles.alertTitle}>
              {t("angerManagementScreen.alertTitle")}
            </Text>
          </View>
          <Text style={styles.alertText}>
            {t("angerManagementScreen.alertText")}
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
      {/* Upgrade dialog */}
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.dialogTitle}>
            {blockedPlan
              ? t(`mindToolsScreen.upgradeDialog.${blockedPlan}.title`)
              : t("upgradeDialog.title")}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.dialogText}>
              {blockedPlan
                ? t(`mindToolsScreen.upgradeDialog.${blockedPlan}.message`)
                : t("upgradeDialog.message")}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={styles.dialogActions}>
            <Button onPress={() => setDialogVisible(false)}>
              {blockedPlan
                ? t("mindToolsScreen.upgradeDialog.cancelButton")
                : t("upgradeDialog.cancelButton")}
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                setDialogVisible(false);
                navigation.navigate("Upgrade");
              }}
              style={styles.upgradeButton}
              labelStyle={styles.upgradeButtonLabel}
            >
              {blockedPlan
                ? t("mindToolsScreen.upgradeDialog.upgradeButton")
                : t("upgradeDialog.upgradeButton")}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  illustrationBox: {
    width: 160,
    height: 120,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fecaca",
    width: 120,
    height: 80,
    gap: 8,
  },
  imageLabel: {
    fontSize: 12,
    color: "#dc2626",
    fontWeight: "500",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 16,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#6b7280",
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  symptomItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  symptomDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#dc2626",
    marginRight: 16,
    marginTop: 6,
  },
  symptomText: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
    lineHeight: 22,
  },
  strategyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
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
  },
  strategyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  strategyDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  viewStrategyButton: {
    backgroundColor: "#8b5cf6",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  viewStrategyButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  alertBox: {
    backgroundColor: "#fef2f2",
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  alertIconContainer: {
    marginRight: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#dc2626",
  },
  alertText: {
    fontSize: 14,
    color: "#7f1d1d",
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 32,
  },
  dialog: { borderRadius: 16 },
  dialogTitle: { textAlign: "center", fontWeight: "bold" },
  dialogText: { textAlign: "center", marginBottom: 8 },
  dialogActions: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  upgradeButton: {
    backgroundColor: "#AB47BC",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  upgradeButtonLabel: { color: "white", fontSize: 12, fontWeight: "600" },
});
