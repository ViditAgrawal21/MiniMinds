import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  TouchableOpacity 
} from "react-native";
import CustomIcon from "@/components/CustomIcon";
import { t } from "@/i18n/locales/i18n";

export default function GamblingAndGamingAddictionScreen({ navigation }: any) {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleViewStrategy = (strategyKey: string) => {
    console.log(`${strategyKey} strategy pressed`);
    switch (strategyKey) {
      case "commonSuggestions":
        navigation.navigate("CommonSuggestionsScreen", {
          condition: "gambling-and-gaming-addiction",
        });
        break;
      case "yoga":
        navigation.navigate("YogaScreen", {
          condition: "gambling-and-gaming-addiction",
        });
        break;
      case "relaxation":
        navigation.navigate("RelaxationScreen", {
          condition: "gambling-and-gaming-addiction",
        });
        break;
      case "cbt":
        navigation.navigate("CBTScreen", {
          condition: "gambling-and-gaming-addiction",
        });
        break;
      case "rebt":
        navigation.navigate("REBTScreen", {
          condition: "gambling-and-gaming-addiction",
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
          {t("gamblingAndGamingAddictionScreen.headerTitle")}
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.imageContainer}>
            <CustomIcon type="IO" name="game-controller" size={80} color="#8b5cf6" />
          </View>
          <Text style={styles.title}>
            {t("gamblingAndGamingAddictionScreen.title")}
          </Text>
          <Text style={styles.description}>
            {t("gamblingAndGamingAddictionScreen.description")}
          </Text>
        </View>

        {/* Benefits Section */}
        <View style={styles.symptomsSection}>
          <Text style={styles.sectionTitle}>
            {t("gamblingAndGamingAddictionScreen.benefitsTitle")}
          </Text>
          
          <View style={styles.symptomItem}>
            <CustomIcon type="IO" name="checkmark-circle" size={20} color="#22c55e" />
            <Text style={styles.symptomText}>
              {t("gamblingAndGamingAddictionScreen.benefits.financialStability")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <CustomIcon type="IO" name="checkmark-circle" size={20} color="#22c55e" />
            <Text style={styles.symptomText}>
              {t("gamblingAndGamingAddictionScreen.benefits.betterSleep")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <CustomIcon type="IO" name="checkmark-circle" size={20} color="#22c55e" />
            <Text style={styles.symptomText}>
              {t("gamblingAndGamingAddictionScreen.benefits.strongerRelationships")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <CustomIcon type="IO" name="checkmark-circle" size={20} color="#22c55e" />
            <Text style={styles.symptomText}>
              {t("gamblingAndGamingAddictionScreen.benefits.enhancedProductivity")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <CustomIcon type="IO" name="checkmark-circle" size={20} color="#22c55e" />
            <Text style={styles.symptomText}>
              {t("gamblingAndGamingAddictionScreen.benefits.reducedAnxiety")}
            </Text>
          </View>

          <View style={styles.symptomItem}>
            <CustomIcon type="IO" name="checkmark-circle" size={20} color="#22c55e" />
            <Text style={styles.symptomText}>
              {t("gamblingAndGamingAddictionScreen.benefits.increasedSelfControl")}
            </Text>
          </View>
        </View>

        {/* Recovery Strategies Section */}
        <View style={styles.interventionsSection}>
          <Text style={styles.sectionTitle}>
            {t("gamblingAndGamingAddictionScreen.strategiesTitle")}
          </Text>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("gamblingAndGamingAddictionScreen.strategies.commonSuggestions.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("gamblingAndGamingAddictionScreen.strategies.commonSuggestions.description")}
            </Text>
            <TouchableOpacity 
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("commonSuggestions")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("gamblingAndGamingAddictionScreen.viewStrategyButton")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("gamblingAndGamingAddictionScreen.strategies.yoga.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("gamblingAndGamingAddictionScreen.strategies.yoga.description")}
            </Text>
            <TouchableOpacity 
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("yoga")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("gamblingAndGamingAddictionScreen.viewStrategyButton")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("gamblingAndGamingAddictionScreen.strategies.relaxation.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("gamblingAndGamingAddictionScreen.strategies.relaxation.description")}
            </Text>
            <TouchableOpacity 
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("relaxation")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("gamblingAndGamingAddictionScreen.viewStrategyButton")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("gamblingAndGamingAddictionScreen.strategies.cbt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("gamblingAndGamingAddictionScreen.strategies.cbt.description")}
            </Text>
            <TouchableOpacity 
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("cbt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("gamblingAndGamingAddictionScreen.viewStrategyButton")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>
              {t("gamblingAndGamingAddictionScreen.strategies.rebt.title")}
            </Text>
            <Text style={styles.strategyDescription}>
              {t("gamblingAndGamingAddictionScreen.strategies.rebt.description")}
            </Text>
            <TouchableOpacity 
              style={styles.viewStrategyButton}
              onPress={() => handleViewStrategy("rebt")}
            >
              <Text style={styles.viewStrategyButtonText}>
                {t("gamblingAndGamingAddictionScreen.viewStrategyButton")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Important Note Section */}
        <View style={styles.importantNote}>
          <View style={styles.noteHeader}>
            <CustomIcon type="IO" name="information-circle" size={24} color="#ef4444" />
            <Text style={styles.noteTitle}>
              {t("gamblingAndGamingAddictionScreen.alertTitle")}
            </Text>
          </View>
          <Text style={styles.noteText}>
            {t("gamblingAndGamingAddictionScreen.alertText")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 30,
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
    borderColor: "#c4b5fd",
    width: 120,
    height: 80,
    gap: 8,
  },
  imageLabel: {
    fontSize: 12,
    color: "#7c3aed",
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
  symptomsSection: {
    marginBottom: 24,
  },
  interventionsSection: {
    marginBottom: 24,
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
    backgroundColor: "#7c3aed",
    marginRight: 16,
    marginTop: 6,
  },
  symptomText: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
    lineHeight: 22,
    marginLeft: 12,
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
  importantNote: {
    backgroundColor: "#fef2f2",
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
    borderRadius: 8,
    padding: 16,
    marginBottom: 30,
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#dc2626",
    marginLeft: 8,
  },
  noteText: {
    fontSize: 14,
    color: "#7f1d1d",
    lineHeight: 20,
  },
});
