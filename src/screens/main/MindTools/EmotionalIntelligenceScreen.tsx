import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import CustomIcon from "../../../components/CustomIcon";
import { t } from "../../../i18n/locales/i18n";

export default function EmotionalIntelligenceScreen({ navigation }: any) {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleViewStrategy = (strategyKey: string) => {
    console.log(`${strategyKey} strategy pressed`);
    
    // Navigate to individual strategy screens
    const navigationMap = {
      selfAwareness: "SelfAwarenessStrategyScreen",
      selfRegulation: "SelfRegulationStrategyScreen",
      motivation: "MotivationStrategyScreen",
      empathy: "EmpathyStrategyScreen",
      socialSkills: "SocialSkillsStrategyScreen",
    };
    
    const screenName = navigationMap[strategyKey as keyof typeof navigationMap];
    if (screenName) {
      navigation.navigate(screenName);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>{t("emotionalIntelligenceScreen.title")}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.imageContainer}>
              <CustomIcon type="IO" name="heart" size={48} color="#8b5cf6" />
              <Text style={styles.imageLabel}>{t("emotionalIntelligenceScreen.title")}</Text>
            </View>
          </View>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>{t("emotionalIntelligenceScreen.title")}</Text>
        <Text style={styles.description}>
          {t("emotionalIntelligenceScreen.description")}
        </Text>

        {/* Benefits Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("emotionalIntelligenceScreen.keyBenefits")}</Text>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("emotionalIntelligenceScreen.benefits.selfAwareness")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("emotionalIntelligenceScreen.benefits.relationships")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("emotionalIntelligenceScreen.benefits.leadership")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("emotionalIntelligenceScreen.benefits.resilience")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("emotionalIntelligenceScreen.benefits.empathy")}
            </Text>
          </View>
        </View>

        {/* EQ Dimensions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("emotionalIntelligenceScreen.developmentStrategies")}</Text>

          {/* Self-Awareness */}
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>{t("emotionalIntelligenceScreen.strategies.selfAwareness.title")}</Text>
            <Text style={styles.strategyDescription}>
              {t("emotionalIntelligenceScreen.strategies.selfAwareness.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("selfAwareness")}
            >
              <Text style={styles.viewStrategyButtonText}>{t("emotionalIntelligenceScreen.viewStrategies")}</Text>
            </Pressable>
          </View>

          {/* Self-Regulation */}
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>{t("emotionalIntelligenceScreen.strategies.selfRegulation.title")}</Text>
            <Text style={styles.strategyDescription}>
              {t("emotionalIntelligenceScreen.strategies.selfRegulation.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("selfRegulation")}
            >
              <Text style={styles.viewStrategyButtonText}>{t("emotionalIntelligenceScreen.viewStrategies")}</Text>
            </Pressable>
          </View>

          {/* Motivation */}
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>{t("emotionalIntelligenceScreen.strategies.motivation.title")}</Text>
            <Text style={styles.strategyDescription}>
              {t("emotionalIntelligenceScreen.strategies.motivation.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("motivation")}
            >
              <Text style={styles.viewStrategyButtonText}>{t("emotionalIntelligenceScreen.viewStrategies")}</Text>
            </Pressable>
          </View>

          {/* Empathy */}
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>{t("emotionalIntelligenceScreen.strategies.empathy.title")}</Text>
            <Text style={styles.strategyDescription}>
              {t("emotionalIntelligenceScreen.strategies.empathy.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("empathy")}
            >
              <Text style={styles.viewStrategyButtonText}>{t("emotionalIntelligenceScreen.viewStrategies")}</Text>
            </Pressable>
          </View>

          {/* Social Skills */}
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>{t("emotionalIntelligenceScreen.strategies.socialSkills.title")}</Text>
            <Text style={styles.strategyDescription}>
              {t("emotionalIntelligenceScreen.strategies.socialSkills.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("socialSkills")}
            >
              <Text style={styles.viewStrategyButtonText}>{t("emotionalIntelligenceScreen.viewStrategies")}</Text>
            </Pressable>
          </View>
        </View>

        {/* Alert Box */}
        <View style={styles.alertBox}>
          <View style={styles.alertHeader}>
            <View style={styles.alertIconContainer}>
              <CustomIcon type="IO" name="information-circle" size={16} color="#3b82f6" />
            </View>
            <Text style={styles.alertTitle}>{t("emotionalIntelligenceScreen.remember")}</Text>
          </View>
          <Text style={styles.alertText}>
            {t("emotionalIntelligenceScreen.reminderText")}
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
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  illustrationBox: {
    width: "100%",
    height: 120,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  imageLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 8,
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
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
    marginBottom: 12,
  },
  symptomDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#8b5cf6",
    marginTop: 8,
    marginRight: 12,
  },
  symptomText: {
    flex: 1,
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
  },
  strategyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
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
    marginBottom: 16,
  },
  viewStrategyButton: {
    backgroundColor: "#8b5cf6",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  viewStrategyButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  alertBox: {
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
    marginBottom: 16,
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  alertIconContainer: {
    marginRight: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e40af",
  },
  alertText: {
    fontSize: 14,
    color: "#1e40af",
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 32,
  },
});
