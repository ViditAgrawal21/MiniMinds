import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import CustomIcon from "../../../components/CustomIcon";
import { t } from "../../../i18n/locales/i18n"; // Import the translation function

export default function FinancialMentalHealthScreen({ navigation }: any) {
  const handleBackPress = () => navigation.goBack();
  const handleViewStrategy = (strategyKey: string) => {
    console.log(`${strategyKey} strategy pressed`);
    switch (strategyKey) {
      case "commonSuggestions":
        navigation.navigate("CommonSuggestionsScreen", {
          condition: "financial-mental-health",
        });
        break;
      case "yoga":
        navigation.navigate("YogaScreen", {
          condition: "financial-mental-health",
        });
        break;
      case "relaxation":
        navigation.navigate("RelaxationScreen", {
          condition: "financial-mental-health",
        });
        break;
      case "cbt":
        navigation.navigate("CBTScreen", {
          condition: "financial-mental-health",
        });
        break;
      case "rebt":
        navigation.navigate("REBTScreen", {
          condition: "financial-mental-health",
        });
        break;
      default:
        console.log(`Unknown strategy: ${strategyKey}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>
          {t("financialMentalHealthScreen.headerTitle")}
        </Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.imageContainer}>
              <CustomIcon type="IO" name="card" size={48} color="#f59e0b" />
              <Text style={styles.imageLabel}>
                {t("financialMentalHealthScreen.imageLabel")}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.title}>
          {t("financialMentalHealthScreen.title")}
        </Text>
        <Text style={styles.description}>
          {t("financialMentalHealthScreen.description")}
        </Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("financialMentalHealthScreen.concernsTitle")}
          </Text>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("financialMentalHealthScreen.concerns.persistentWorry")}
            </Text>
          </View>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("financialMentalHealthScreen.concerns.debtStress")}
            </Text>
          </View>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("financialMentalHealthScreen.concerns.fearOfInsecurity")}
            </Text>
          </View>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("financialMentalHealthScreen.concerns.relationshipConflicts")}
            </Text>
          </View>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("financialMentalHealthScreen.concerns.avoidancePlanning")}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("financialMentalHealthScreen.supportStrategiesTitle")}
          </Text>
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t(
                "financialMentalHealthScreen.strategies.commonSuggestions.title",
              )}
            </Text>
            <Text style={styles.strategyDescription}>
              {t(
                "financialMentalHealthScreen.strategies.commonSuggestions.description",
              )}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("commonSuggestions")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("financialMentalHealthScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("financialMentalHealthScreen.strategies.yoga.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("financialMentalHealthScreen.strategies.yoga.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("yoga")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("financialMentalHealthScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("financialMentalHealthScreen.strategies.relaxation.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t(
                "financialMentalHealthScreen.strategies.relaxation.description",
              )}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("relaxation")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("financialMentalHealthScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("financialMentalHealthScreen.strategies.cbt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("financialMentalHealthScreen.strategies.cbt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("cbt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("financialMentalHealthScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("financialMentalHealthScreen.strategies.rebt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("financialMentalHealthScreen.strategies.rebt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("rebt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("financialMentalHealthScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.alertBox}>
          <View style={styles.alertHeader}>
            <View style={styles.alertIconContainer}>
              <CustomIcon type="IO" name="warning" size={16} color="#f59e0b" />
            </View>
            <Text style={styles.alertTitle}>
              {t("financialMentalHealthScreen.alertTitle")}
            </Text>
          </View>
          <Text style={styles.alertText}>
            {t("financialMentalHealthScreen.alertText")}
          </Text>
        </View>
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9ff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: "#f8f9ff",
  },
  backButton: { padding: 8, marginRight: 8 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#1a1a1a" },
  content: { flex: 1, paddingHorizontal: 20 },
  illustrationContainer: { alignItems: "center", marginBottom: 24 },
  illustrationBox: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  imageContainer: { alignItems: "center" },
  imageLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 8,
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
  },
  section: { marginBottom: 32 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  symptomItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  symptomDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ef4444",
    marginRight: 12,
    marginTop: 7,
  },
  symptomText: { fontSize: 16, color: "#374151", flex: 1, lineHeight: 20 },
  strategyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  strategyTitle: {
    fontSize: 18,
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
    backgroundColor: "#3b82f6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  viewStrategyButtonText: { color: "#ffffff", fontSize: 14, fontWeight: "500" },
  alertBox: {
    backgroundColor: "#fef3c7",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f59e0b",
    marginBottom: 32,
  },
  alertHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  alertIconContainer: { marginRight: 8 },
  alertTitle: { fontSize: 16, fontWeight: "600", color: "#92400e" },
  alertText: { fontSize: 14, color: "#92400e", lineHeight: 20 },
  bottomSpacing: { height: 32 },
});
