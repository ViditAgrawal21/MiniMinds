import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import CustomIcon from "@/components/CustomIcon";
import { t } from "@/i18n/locales/i18n";

export default function SelfCareHygieneScreen({ navigation }: any) {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleViewStrategy = (strategyKey: string) => {
    console.log(`${strategyKey} strategy pressed`);
    switch (strategyKey) {
      case "commonSuggestions":
        navigation.navigate("CommonSuggestionsScreen", {
          condition: "self-care-hygiene",
        });
        break;
      case "yoga":
        navigation.navigate("YogaScreen", {
          condition: "self-care-hygiene",
        });
        break;
      case "relaxation":
        navigation.navigate("RelaxationScreen", {
          condition: "self-care-hygiene",
        });
        break;
      case "cbt":
        navigation.navigate("CBTScreen", {
          condition: "self-care-hygiene",
        });
        break;
      case "rebt":
        navigation.navigate("REBTScreen", {
          condition: "self-care-hygiene",
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
          {t("selfCareHygieneScreen.headerTitle")}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.imageContainer}>
              <CustomIcon type="IO" name="heart" size={48} color="#10b981" />
              <Text style={styles.imageLabel}>
                {t("selfCareHygieneScreen.imageLabel")}
              </Text>
            </View>
          </View>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>
          {t("selfCareHygieneScreen.mainTitle")}
        </Text>
        <Text style={styles.description}>
          {t("selfCareHygieneScreen.description")}
        </Text>

        {/* Benefits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("selfCareHygieneScreen.benefitsTitle")}
          </Text>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("selfCareHygieneScreen.benefits.improvedMentalHealth")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("selfCareHygieneScreen.benefits.betterPhysicalHealth")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("selfCareHygieneScreen.benefits.increasedSelfEsteem")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("selfCareHygieneScreen.benefits.reducedStress")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("selfCareHygieneScreen.benefits.betterSocialConnections")}
            </Text>
          </View>
        </View>

        {/* Self-Care Strategies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("selfCareHygieneScreen.strategiesTitle")}
          </Text>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("selfCareHygieneScreen.strategies.commonSuggestions.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("selfCareHygieneScreen.strategies.commonSuggestions.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("commonSuggestions")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("selfCareHygieneScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("selfCareHygieneScreen.strategies.yoga.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("selfCareHygieneScreen.strategies.yoga.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("yoga")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("selfCareHygieneScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("selfCareHygieneScreen.strategies.relaxation.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("selfCareHygieneScreen.strategies.relaxation.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("relaxation")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("selfCareHygieneScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("selfCareHygieneScreen.strategies.cbt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("selfCareHygieneScreen.strategies.cbt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("cbt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("selfCareHygieneScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("selfCareHygieneScreen.strategies.rebt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("selfCareHygieneScreen.strategies.rebt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("rebt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("selfCareHygieneScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Motivation Box */}
        <View style={styles.alertBox}>
          <View style={styles.alertHeader}>
            <View style={styles.alertIconContainer}>
              <CustomIcon type="IO" name="star" size={16} color="#10b981" />
            </View>
            <Text style={styles.alertTitle}>
              {t("selfCareHygieneScreen.motivationTitle")}
            </Text>
          </View>
          <Text style={styles.alertText}>
            {t("selfCareHygieneScreen.motivationText")}
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    marginBottom: 24,
  },
  illustrationBox: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    alignItems: "center",
  },
  imageLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 8,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
    marginBottom: 32,
    textAlign: "center",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
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
    backgroundColor: "#10b981",
    marginTop: 8,
    marginRight: 12,
    flexShrink: 0,
  },
  symptomText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
    flex: 1,
  },
  crisisBox: {
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  crisisHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  crisisIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: "#dcfce7",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  crisisTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#16a34a",
  },
  crisisText: {
    fontSize: 14,
    color: "#166534",
    lineHeight: 20,
    marginBottom: 12,
  },
  emergencyNumbers: {
    gap: 8,
  },
  emergencyNumberItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#dcfce7",
    padding: 12,
    borderRadius: 8,
  },
  emergencyNumberText: {
    fontSize: 14,
    color: "#166534",
    fontWeight: "500",
  },
  emergencyNumber: {
    fontSize: 14,
    color: "#16a34a",
    fontWeight: "600",
  },
  strategyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
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
    backgroundColor: "#10b981",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  viewStrategyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  alertBox: {
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  alertIconContainer: {
    width: 24,
    height: 24,
    backgroundColor: "#dcfce7",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#16a34a",
  },
  alertText: {
    fontSize: 13,
    color: "#166534",
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 32,
  },
});
