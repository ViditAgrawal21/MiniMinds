import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from "react-native";
import CustomIcon from "../../../components/CustomIcon";
import { t } from "../../../i18n/locales/i18n"; // Import the translation function
import { canAccessFeature } from "../../../utils/premiumUtils";

export default function JobInsecurityScreen({ navigation }: any) {
  // Upgrade dialog state
  const [dialogVisible, setDialogVisible] = useState(false);
  const [blockedPlan, setBlockedPlan] = useState<"basic" | null>(null);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleViewStrategy = async (strategyKey: string) => {
    console.log(`${strategyKey} strategy pressed`);

    // Intercept CBT & REBT for upgrade gating (premium condition -> ultra required for advanced strategies)
    if (strategyKey === "cbt" || strategyKey === "rebt") {
      const canAccess = await canAccessFeature("premium");
      if (!canAccess) {
        setBlockedPlan("basic");
        setDialogVisible(true);
        return;
      }
    }

    switch (strategyKey) {
      case "commonSuggestions":
        navigation.navigate("CommonSuggestionsScreen", {
          condition: "job-insecurity",
        });
        break;
      case "yoga":
        navigation.navigate("YogaScreen", {
          condition: "job-insecurity",
        });
        break;
      case "relaxation":
        navigation.navigate("RelaxationScreen", {
          condition: "job-insecurity",
        });
        break;
      case "cbt":
        navigation.navigate("CBTScreen", {
          condition: "job-insecurity",
        });
        break;
      case "rebt":
        navigation.navigate("REBTScreen", {
          condition: "job-insecurity",
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
          <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>
          {t("jobInsecurityScreen.headerTitle")}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.imageContainer}>
              <CustomIcon type="IO" name="briefcase-outline" size={48} color="#f59e0b" />
              <Text style={styles.imageLabel}>
                {t("jobInsecurityScreen.imageLabel")}
              </Text>
            </View>
          </View>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>{t("jobInsecurityScreen.title")}</Text>
        <Text style={styles.description}>
          {t("jobInsecurityScreen.description")}
        </Text>

        {/* Symptoms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("jobInsecurityScreen.symptomsTitle")}
          </Text>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("jobInsecurityScreen.symptoms.constantWorry")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("jobInsecurityScreen.symptoms.sleepProblems")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("jobInsecurityScreen.symptoms.decreasedProductivity")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("jobInsecurityScreen.symptoms.physicalSymptoms")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("jobInsecurityScreen.symptoms.socialWithdrawal")}
            </Text>
          </View>
        </View>

        {/* Coping Strategies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("jobInsecurityScreen.copingStrategiesTitle")}
          </Text>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("jobInsecurityScreen.strategies.commonSuggestions.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t(
                "jobInsecurityScreen.strategies.commonSuggestions.description",
              )}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("commonSuggestions")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("jobInsecurityScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("jobInsecurityScreen.strategies.yoga.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("jobInsecurityScreen.strategies.yoga.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("yoga")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("jobInsecurityScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("jobInsecurityScreen.strategies.relaxation.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("jobInsecurityScreen.strategies.relaxation.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("relaxation")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("jobInsecurityScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("jobInsecurityScreen.strategies.cbt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("jobInsecurityScreen.strategies.cbt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("cbt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("jobInsecurityScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("jobInsecurityScreen.strategies.rebt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("jobInsecurityScreen.strategies.rebt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("rebt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("jobInsecurityScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Upgrade Dialog */}
      <Modal
        visible={dialogVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDialogVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>
              {t("upgradeDialog.title")}
            </Text>
            <Text style={styles.dialogText}>
              {t("upgradeDialog.message")}
            </Text>
            <View style={styles.dialogActions}>
              <Pressable onPress={() => setDialogVisible(false)}>
                <Text style={styles.cancelButton}>
                  {t("upgradeDialog.cancelButton")}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setDialogVisible(false);
                  navigation.navigate("UpgradeToPremium");
                }}
                style={styles.upgradeButton}
              >
                <Text style={styles.upgradeButtonText}>
                  {t("upgradeDialog.upgradeButton")}
                </Text>
              </Pressable>
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
    paddingHorizontal: 16,
    paddingTop: 20,
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
    borderColor: "#fed7aa",
    width: 120,
    height: 80,
    gap: 8,
  },
  imageLabel: {
    fontSize: 12,
    color: "#f59e0b",
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
    backgroundColor: "#f59e0b",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    margin: 20,
    maxWidth: 300,
    width: "100%",
  },
  dialogTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  dialogText: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 14,
    color: "#6b7280",
  },
  dialogActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: 20,
  },
  cancelButton: {
    color: "#6b7280",
    fontSize: 14,
    fontWeight: "500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  upgradeButton: {
    backgroundColor: "#AB47BC",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  upgradeButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
});
