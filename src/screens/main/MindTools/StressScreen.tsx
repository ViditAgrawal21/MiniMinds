import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from "react-native";
import CustomIcon from "../../../components/CustomIcon";
import { t } from "../../../i18n/locales/i18n";
import { canAccessFeature } from "../../../utils/premiumUtils";

export default function StressScreen({ navigation }: any) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [blockedPlan, setBlockedPlan] = useState<"basic" | null>(null);
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleViewStrategy = async (strategyKey: string) => {
    console.log(`${strategyKey} strategy pressed`);

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
          condition: "stress",
        });
        break;
      case "yoga":
        navigation.navigate("YogaScreen", {
          condition: "stress",
        });
        break;
      case "relaxation":
        navigation.navigate("RelaxationScreen", {
          condition: "stress",
        });
        break;
      case "cbt":
        navigation.navigate("CBTScreen", {
          condition: "stress",
        });
        break;
      case "rebt":
        navigation.navigate("REBTScreen", {
          condition: "stress",
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
        <Text style={styles.headerTitle}>{t("stressScreen.headerTitle")}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.imageContainer}>
              <CustomIcon type="IO" name="pulse" size={48} color="#f59e0b" />
              <Text style={styles.imageLabel}>
                {t("stressScreen.imageLabel")}
              </Text>
            </View>
          </View>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>{t("stressScreen.mainTitle")}</Text>
        <Text style={styles.description}>{t("stressScreen.description")}</Text>

        {/* Symptoms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("stressScreen.symptoms")}</Text>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("stressScreen.symptomsList.worry")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("stressScreen.symptomsList.tension")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("stressScreen.symptomsList.sleep")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("stressScreen.symptomsList.fatigue")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("stressScreen.symptomsList.concentration")}
            </Text>
          </View>
        </View>

        {/* Coping Strategies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("stressScreen.copingStrategies")}
          </Text>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("stressScreen.strategies.commonSuggestions.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("stressScreen.strategies.commonSuggestions.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("commonSuggestions")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("stressScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("stressScreen.strategies.yoga.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("stressScreen.strategies.yoga.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("yoga")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("stressScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("stressScreen.strategies.relaxation.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("stressScreen.strategies.relaxation.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("relaxation")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("stressScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("stressScreen.strategies.cbt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("stressScreen.strategies.cbt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("cbt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("stressScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("stressScreen.strategies.rebt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("stressScreen.strategies.rebt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("rebt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("stressScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Alert Box */}
        <View style={styles.alertBox}>
          <View style={styles.alertHeader}>
            <View style={styles.alertIconContainer}>
              <CustomIcon type="IO" name="warning" size={16} color="#f59e0b" />
            </View>
            <Text style={styles.alertTitle}>
              {t("stressScreen.alertTitle")}
            </Text>
          </View>
          <Text style={styles.alertText}>{t("stressScreen.alertText")}</Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
      <Modal
        visible={dialogVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setDialogVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.dialogTitle}>
              {blockedPlan
                ? t(`mindToolsScreen.upgradeDialog.${blockedPlan}.title`)
                : t("upgradeDialog.title")}
            </Text>
            
            <Text style={styles.dialogText}>
              {blockedPlan
                ? t(`mindToolsScreen.upgradeDialog.${blockedPlan}.message`)
                : t("upgradeDialog.message")}
            </Text>
            
            <View style={styles.dialogActions}>
              <Pressable 
                style={styles.cancelButton}
                onPress={() => setDialogVisible(false)}
              >
                <Text style={styles.cancelButtonText}>
                  {blockedPlan
                    ? t("mindToolsScreen.upgradeDialog.cancelButton")
                    : t("upgradeDialog.cancelButton")}
                </Text>
              </Pressable>
              <Pressable
                style={styles.upgradeButton}
                onPress={() => {
                  setDialogVisible(false);
                  navigation.navigate("Upgrade");
                }}
              >
                <Text style={styles.upgradeButtonLabel}>
                  {blockedPlan
                    ? t("mindToolsScreen.upgradeDialog.upgradeButton")
                    : t("upgradeDialog.upgradeButton")}
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
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#f8f9ff",
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
    marginRight: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  illustrationBox: {
    width: "100%",
    height: 160,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
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
  imageContainer: {
    alignItems: "center",
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6b7280",
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 16,
    textAlign: "left",
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
    marginRight: 12,
    marginTop: 6,
  },
  symptomText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    flex: 1,
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
    marginBottom: 16,
  },
  viewStrategyButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  viewStrategyButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  alertBox: {
    backgroundColor: "#fef3c7",
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#f59e0b",
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
    color: "#92400e",
  },
  alertText: {
    fontSize: 14,
    color: "#92400e",
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 32,
  },
  dialog: { borderRadius: 16 },
  dialogTitle: { textAlign: "center", fontWeight: "bold" },
  dialogText: { textAlign: "center", marginBottom: 8 },
  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    gap: 12,
  },
  upgradeButton: {
    flex: 1,
    backgroundColor: "#AB47BC",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginLeft: 6,
  },
  upgradeButtonLabel: { 
    color: "white", 
    fontSize: 14, 
    fontWeight: "600",
    textAlign: 'center',
  },
  // Modal styles for upgrade popup
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f9fafb',
    marginRight: 6,
  },
  cancelButtonText: {
    color: '#6b7280',
    fontWeight: '600',
    textAlign: 'center',
  },
});
