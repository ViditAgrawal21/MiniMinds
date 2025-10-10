import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import CustomIcon from "../../../../components/CustomIcon";
import { useLanguage } from "../../../../context/LanguageContext";

export default function AnxietyScreen({ navigation }: any) {
  const { t } = useLanguage();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleViewStrategy = (strategyKey: string) => {
    console.log(`${strategyKey} strategy pressed`);
    const condition = "anxiety";

    switch (strategyKey) {
      case "commonSuggestions":
        navigation.navigate("CommonSuggestionsScreen", { condition });
        break;
      case "yoga":
        navigation.navigate("YogaScreen", { condition });
        break;
      case "relaxation":
        navigation.navigate("RelaxationScreen", { condition });
        break;
      case "cbt":
        navigation.navigate("CBTScreen", { condition });
        break;
      case "rebt":
        navigation.navigate("REBTScreen", { condition });
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
          {t("anxietyScreen.headerTitle")}
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.imageContainer}>
              <CustomIcon type="IO" name="pulse-outline" size={48} color="#2563eb" />
              <Text style={styles.imageLabel}>
                {t("anxietyScreen.imageLabel")}
              </Text>
            </View>
          </View>
        </View>

        {/* Title & Description */}
        <Text style={styles.title}>{t("anxietyScreen.title")}</Text>
        <Text style={styles.description}>
          {t("anxietyScreen.description")}
        </Text>

        {/* Symptoms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("anxietyScreen.symptomsTitle")}
          </Text>
          {[
            "excessiveWorry",
            "restlessness",
            "racingHeart",
            "troubleConcentrating",
            "sleepDisturbance",
          ].map((key) => (
            <View style={styles.symptomItem} key={key}>
              <View style={styles.symptomDot} />
              <Text style={styles.symptomText}>
                {t(`anxietyScreen.symptoms.${key}`)}
              </Text>
            </View>
          ))}
        </View>

        {/* Strategies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("anxietyScreen.supportStrategiesTitle")}
          </Text>

          {["commonSuggestions", "yoga", "relaxation", "cbt", "rebt"].map(
            (key) => (
              <View style={styles.strategyCard} key={key}>
                <Text style={styles.strategyTitle}>
                  {t(`anxietyScreen.strategies.${key}.title`)}
                </Text>
                <Text style={styles.strategyDescription}>
                  {t(`anxietyScreen.strategies.${key}.description`)}
                </Text>
                <Pressable
                  style={styles.viewStrategyButton}
                  onPress={() => handleViewStrategy(key)}
                >
                  <Text style={styles.viewStrategyButtonText}>
                    {t("anxietyScreen.viewStrategyButton")}
                  </Text>
                </Pressable>
              </View>
            )
          )}
        </View>

        {/* Alert Box */}
        <View style={styles.alertBox}>
          <View style={styles.alertHeader}>
            <View style={styles.alertIconContainer}>
              <CustomIcon type="IO" name="warning" size={16} color="#f59e0b" />
            </View>
            <Text style={styles.alertTitle}>
              {t("anxietyScreen.alertTitle")}
            </Text>
          </View>
          <Text style={styles.alertText}>
            {t("anxietyScreen.alertText")}
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
    backgroundColor: "#3b82f6",
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
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  viewStrategyButtonText: { color: "#ffffff", fontSize: 14, fontWeight: "500" },
  alertBox: {
    backgroundColor: "#dbeafe",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#3b82f6",
    marginBottom: 32,
  },
  alertHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  alertIconContainer: { marginRight: 8 },
  alertTitle: { fontSize: 16, fontWeight: "600", color: "#1e40af" },
  alertText: { fontSize: 14, color: "#1e40af", lineHeight: 20 },
  bottomSpacing: { height: 32 },
});
