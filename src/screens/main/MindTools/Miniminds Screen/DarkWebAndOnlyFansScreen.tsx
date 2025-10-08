import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useLanguage } from "../../../../context/LanguageContext";
import CustomIcon from "../../../../components/CustomIcon";

export default function DarkWebAndOnlyFansScreen({ navigation }:any){
  const { t } = useLanguage();
  const handleBackPress = () => navigation.goBack();
  const handleViewStrategy = (strategyKey: string) => {
    console.log(`${strategyKey} strategy pressed`);
    switch (strategyKey) {
      case "commonSuggestions":
        navigation.navigate("CommonSuggestionsScreen", {
          condition: "dark-web-onlyfans",
        });
        break;
      case "yoga":
        navigation.navigate("YogaScreen", {
          condition: "dark-web-onlyfans",
        });
        break;
      case "relaxation":
        navigation.navigate("RelaxationScreen", {
          condition: "dark-web-onlyfans",
        });
        break;
      case "cbt":
        navigation.navigate("CBTScreen", {
          condition: "dark-web-onlyfans",
        });
        break;
      case "rebt":
        navigation.navigate("REBTScreen", {
          condition: "dark-web-onlyfans",
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
          {t("darkWebAndOnlyFansScreen.headerTitle")}
        </Text>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.imageContainer}>
              <CustomIcon type="IO" name="warning" size={48} color="#ef4444" />
              <Text style={styles.imageLabel}>
                {t("darkWebAndOnlyFansScreen.imageLabel")}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.title}>{t("darkWebAndOnlyFansScreen.title")}</Text>
        <Text style={styles.description}>
          {t("darkWebAndOnlyFansScreen.description")}
        </Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("darkWebAndOnlyFansScreen.symptomsTitle")}
          </Text>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("darkWebAndOnlyFansScreen.symptoms.compulsiveBrowsing")}
            </Text>
          </View>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("darkWebAndOnlyFansScreen.symptoms.financialSpending")}
            </Text>
          </View>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("darkWebAndOnlyFansScreen.symptoms.neglectingRelationships")}
            </Text>
          </View>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("darkWebAndOnlyFansScreen.symptoms.sleepDisruption")}
            </Text>
          </View>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("darkWebAndOnlyFansScreen.symptoms.socialIsolation")}
            </Text>
          </View>
          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("darkWebAndOnlyFansScreen.symptoms.exposureToHarmful")}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("darkWebAndOnlyFansScreen.strategiesTitle")}
          </Text>
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("darkWebAndOnlyFansScreen.strategies.commonSuggestions.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("darkWebAndOnlyFansScreen.strategies.commonSuggestions.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("commonSuggestions")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("darkWebAndOnlyFansScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("darkWebAndOnlyFansScreen.strategies.yoga.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("darkWebAndOnlyFansScreen.strategies.yoga.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("yoga")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("darkWebAndOnlyFansScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("darkWebAndOnlyFansScreen.strategies.relaxation.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("darkWebAndOnlyFansScreen.strategies.relaxation.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("relaxation")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("darkWebAndOnlyFansScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("darkWebAndOnlyFansScreen.strategies.cbt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("darkWebAndOnlyFansScreen.strategies.cbt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("cbt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("darkWebAndOnlyFansScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("darkWebAndOnlyFansScreen.strategies.rebt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("darkWebAndOnlyFansScreen.strategies.rebt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("rebt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("darkWebAndOnlyFansScreen.viewStrategyButton")}
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
              {t("darkWebAndOnlyFansScreen.alertTitle")}
            </Text>
          </View>
          <Text style={styles.alertText}>
            {t("darkWebAndOnlyFansScreen.alertText")}
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
