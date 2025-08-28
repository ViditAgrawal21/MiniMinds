import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import CustomIcon from "../../../components/CustomIcon";
import { t } from "../../../i18n/locales/i18n";

export default function YoungsterIssuesScreen({ navigation }: any) {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleViewStrategy = (strategyKey: string) => {
    console.log(`${strategyKey} strategy pressed`);
    switch (strategyKey) {
      case "commonSuggestions":
        navigation.navigate("CommonSuggestionsScreen", {
          condition: "youngster-issues",
        });
        break;
      case "yoga":
        navigation.navigate("YogaScreen", {
          condition: "youngster-issues",
        });
        break;
      case "relaxation":
        navigation.navigate("RelaxationScreen", {
          condition: "youngster-issues",
        });
        break;
      case "cbt":
        navigation.navigate("CBTScreen", {
          condition: "youngster-issues",
        });
        break;
      case "rebt":
        navigation.navigate("REBTScreen", {
          condition: "youngster-issues",
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
          {t("youngsterIssuesScreen.headerTitle")}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.imageContainer}>
              <CustomIcon type="IO" name="school" size={48} color="#f59e0b" />
              <Text style={styles.imageLabel}>
                {t("youngsterIssuesScreen.imageLabel")}
              </Text>
            </View>
          </View>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>{t("youngsterIssuesScreen.mainTitle")}</Text>
        <Text style={styles.description}>
          {t("youngsterIssuesScreen.description")}
        </Text>

        {/* Symptoms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("youngsterIssuesScreen.commonChallenges")}
          </Text>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("youngsterIssuesScreen.challenges.academic")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("youngsterIssuesScreen.challenges.identity")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("youngsterIssuesScreen.challenges.peer")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("youngsterIssuesScreen.challenges.family")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("youngsterIssuesScreen.challenges.future")}
            </Text>
          </View>
        </View>

        {/* Coping Strategies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("youngsterIssuesScreen.copingStrategies")}
          </Text>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("youngsterIssuesScreen.strategies.commonSuggestions.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t(
                "youngsterIssuesScreen.strategies.commonSuggestions.description",
              )}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("commonSuggestions")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("youngsterIssuesScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("youngsterIssuesScreen.strategies.yoga.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("youngsterIssuesScreen.strategies.yoga.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("yoga")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("youngsterIssuesScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("youngsterIssuesScreen.strategies.relaxation.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("youngsterIssuesScreen.strategies.relaxation.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("relaxation")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("youngsterIssuesScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("youngsterIssuesScreen.strategies.cbt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("youngsterIssuesScreen.strategies.cbt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("cbt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("youngsterIssuesScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("youngsterIssuesScreen.strategies.rebt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("youngsterIssuesScreen.strategies.rebt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("rebt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("youngsterIssuesScreen.viewStrategyButton")}
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
              {t("youngsterIssuesScreen.alertTitle")}
            </Text>
          </View>
          <Text style={styles.alertText}>
            {t("youngsterIssuesScreen.alertText")}
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
    borderColor: "#fcd34d",
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
    marginBottom: 16,
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
    backgroundColor: "#f59e0b",
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
    backgroundColor: "#fffbeb",
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
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
    color: "#d97706",
  },
  alertText: {
    fontSize: 14,
    color: "#92400e",
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 32,
  },
});
