import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import CustomIcon from "../../../../components/CustomIcon";
import { useLanguage } from "../../../../context/LanguageContext";

export default function GoodParentingScreen({ navigation }: any) {
  const { t } = useLanguage();
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleViewStrategy = (strategyKey: string) => {
    console.log(`${strategyKey} strategy pressed`);
    switch (strategyKey) {
      case "commonSuggestions":
        navigation.navigate("CommonSuggestionsScreen", {
          condition: "good-parenting",
        });
        break;
      // case "communication":
      //   navigation.navigate("CommunicationScreen", {
      //     condition: "good-parenting",
      //   });
        break;
      case "relaxation":
        navigation.navigate("RelaxationScreen", {
          condition: "good-parenting",
        });
        break;
      case "cbt":
        navigation.navigate("CBTScreen", {
          condition: "good-parenting",
        });
        break;
      case "rebt":
        navigation.navigate("REBTScreen", {
          condition: "good-parenting",
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
          {t("goodParentingScreen.headerTitle")}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.imageContainer}>
              <CustomIcon type="IO" name="people" size={48} color="#f97316" />
              <Text style={styles.imageLabel}>
                {t("goodParentingScreen.imageLabel")}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>{t("goodParentingScreen.title")}</Text>
        <Text style={styles.description}>
          {t("goodParentingScreen.description")}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("goodParentingScreen.symptomsTitle")}
          </Text>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("goodParentingScreen.symptoms.parentalStress")}
            </Text>
          </View>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("goodParentingScreen.symptoms.conflictWithChildren")}
            </Text>
          </View>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("goodParentingScreen.symptoms.uncertaintyAboutApproach")}
            </Text>
          </View>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("goodParentingScreen.symptoms.guiltOrSelfDoubt")}
            </Text>
          </View>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("goodParentingScreen.symptoms.workLifeBalance")}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("goodParentingScreen.supportStrategiesTitle")}
          </Text>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("goodParentingScreen.strategies.commonSuggestions.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("goodParentingScreen.strategies.commonSuggestions.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("commonSuggestions")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("goodParentingScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          {/* <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("goodParentingScreen.strategies.communication.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("goodParentingScreen.strategies.communication.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("communication")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("goodParentingScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View> */}

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("goodParentingScreen.strategies.relaxation.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("goodParentingScreen.strategies.relaxation.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("relaxation")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("goodParentingScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("goodParentingScreen.strategies.cbt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("goodParentingScreen.strategies.cbt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("cbt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("goodParentingScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("goodParentingScreen.strategies.rebt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("goodParentingScreen.strategies.rebt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("rebt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("goodParentingScreen.viewStrategyButton")}
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
              {t("goodParentingScreen.alertTitle")}
            </Text>
          </View>
          <Text style={styles.alertText}>
            {t("goodParentingScreen.alertText")}
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
    paddingTop: 50,
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
    backgroundColor: "#f97316",
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