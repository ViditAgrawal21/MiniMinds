import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import CustomIcon from "../../../components/CustomIcon";
import { t } from "../../../i18n/locales/i18n";

export default function SuicidalBehaviourScreen({ navigation }: any) {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleViewStrategy = (strategyKey: string) => {
    console.log(`${strategyKey} strategy pressed`);
    switch (strategyKey) {
      case "commonSuggestions":
        navigation.navigate("CommonSuggestionsScreen", {
          condition: "suicidal-behavior",
        });
        break;
      case "yoga":
        navigation.navigate("YogaScreen", {
          condition: "suicidal-behavior",
        });
        break;
      case "relaxation":
        navigation.navigate("RelaxationScreen", {
          condition: "suicidal-behavior",
        });
        break;
      case "cbt":
        navigation.navigate("CBTScreen", {
          condition: "suicidal-behavior",
        });
        break;
      case "rebt":
        navigation.navigate("REBTScreen", {
          condition: "suicidal-behavior",
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
          {t("suicidalBehaviourScreen.headerTitle")}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <View style={styles.imageContainer}>
              <CustomIcon type="IO" name="heart-dislike" size={48} color="#dc2626" />
              <Text style={styles.imageLabel}>
                {t("suicidalBehaviourScreen.imageLabel")}
              </Text>
            </View>
          </View>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>
          {t("suicidalBehaviourScreen.mainTitle")}
        </Text>
        <Text style={styles.description}>
          {t("suicidalBehaviourScreen.description")}
        </Text>

        {/* Symptoms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("suicidalBehaviourScreen.warningSigns")}
          </Text>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("suicidalBehaviourScreen.signs.talkingDeath")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("suicidalBehaviourScreen.signs.makingPlans")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("suicidalBehaviourScreen.signs.hopeless")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("suicidalBehaviourScreen.signs.moodSwings")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>
              {t("suicidalBehaviourScreen.signs.withdrawing")}
            </Text>
          </View>
        </View>

        {/* Crisis Resources */}
        <View style={styles.crisisBox}>
          <View style={styles.crisisHeader}>
            <View style={styles.crisisIconContainer}>
              <CustomIcon type="IO" name="call" size={20} color="#dc2626" />
            </View>
            <Text style={styles.crisisTitle}>
              {t("suicidalBehaviourScreen.immediateHelp")}
            </Text>
          </View>
          <Text style={styles.crisisText}>
            {t("suicidalBehaviourScreen.crisisText")}
          </Text>
          
          {/* Emergency Numbers */}
          <View style={styles.emergencyNumbers}>
            <View style={styles.emergencyNumberItem}>
              <Text style={styles.emergencyNumberText}>
                {t("suicidalBehaviourScreen.emergencyNumbers.teleManas")}
              </Text>
              <Text style={styles.emergencyNumber}>14416</Text>
            </View>
            <View style={styles.emergencyNumberItem}>
              <Text style={styles.emergencyNumberText}>
                {t("suicidalBehaviourScreen.emergencyNumbers.vandrevala")}
              </Text>
              <Text style={styles.emergencyNumber}>9999 666 555</Text>
            </View>
          </View>
        </View>

        {/* Coping Strategies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("suicidalBehaviourScreen.supportStrategies")}
          </Text>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("suicidalBehaviourScreen.strategies.commonSuggestions.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t(
                "suicidalBehaviourScreen.strategies.commonSuggestions.description",
              )}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("commonSuggestions")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("suicidalBehaviourScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("suicidalBehaviourScreen.strategies.yoga.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("suicidalBehaviourScreen.strategies.yoga.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("yoga")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("suicidalBehaviourScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("suicidalBehaviourScreen.strategies.relaxation.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("suicidalBehaviourScreen.strategies.relaxation.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("relaxation")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("suicidalBehaviourScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("suicidalBehaviourScreen.strategies.cbt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("suicidalBehaviourScreen.strategies.cbt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("cbt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("suicidalBehaviourScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("suicidalBehaviourScreen.strategies.rebt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("suicidalBehaviourScreen.strategies.rebt.description")}
            </Text>
            <Pressable
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("rebt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("suicidalBehaviourScreen.viewStrategyButton")}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Alert Box */}
        <View style={styles.alertBox}>
          <View style={styles.alertHeader}>
            <View style={styles.alertIconContainer}>
              <CustomIcon type="IO" name="warning" size={16} color="#dc2626" />
            </View>
            <Text style={styles.alertTitle}>
              {t("suicidalBehaviourScreen.alertTitle")}
            </Text>
          </View>
          <Text style={styles.alertText}>
            {t("suicidalBehaviourScreen.alertText")}
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
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  imageContainer: {
    alignItems: "center",
  },
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
    backgroundColor: "#ef4444",
    marginRight: 12,
    marginTop: 7,
  },
  symptomText: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
    lineHeight: 20,
  },
  crisisBox: {
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#dc2626",
    marginBottom: 32,
  },
  crisisHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  crisisIconContainer: {
    marginRight: 8,
  },
  crisisTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#dc2626",
  },
  crisisText: {
    fontSize: 14,
    color: "#dc2626",
    lineHeight: 20,
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
  viewStrategyButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  alertBox: {
    backgroundColor: "#fee2e2",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#dc2626",
    marginBottom: 32,
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
    color: "#dc2626",
  },
  alertText: {
    fontSize: 14,
    color: "#dc2626",
    lineHeight: 20,
  },
  emergencyNumbers: {
    marginTop: 16,
  },
  emergencyNumberItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 4,
  },
  emergencyNumberText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#dc2626",
    flex: 1,
  },
  emergencyNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#dc2626",
    fontFamily: "monospace",
  },
  bottomSpacing: {
    height: 32,
  },
});
