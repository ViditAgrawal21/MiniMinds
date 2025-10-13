import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import CustomIcon from "../../../../components/CustomIcon";
import { useLanguage } from "../../../../context/LanguageContext";

export default function SuicidalBehaviourScreen({ navigation }: any) {
  const { t } = useLanguage();
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleViewStrategy = (strategyKey: string) => {
    switch (strategyKey) {
      case "commonSuggestions":
        navigation.navigate("CommonSuggestionsScreen", {
          condition: "suicidal-behavior",
        });
        break;
      // case "yoga":
      //   navigation.navigate("YogaScreen", {
      //     condition: "suicidal-behavior",
      //   });
      //   break;
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
        // noop
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <CustomIcon type="IO" name="chevron-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>{t("suicidalBehaviourScreen.headerTitle")}</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Illustration + intro */}
        <View style={styles.illustrationContainer}>
          <View style={styles.imageContainer}>
            <CustomIcon type="IO" name="heart-dislike" size={80} color="#dc2626" />
          </View>
          <Text style={styles.title}>{t("suicidalBehaviourScreen.mainTitle")}</Text>
          <Text style={styles.description}>{t("suicidalBehaviourScreen.description")}</Text>
        </View>

        {/* Warning signs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("suicidalBehaviourScreen.warningSigns")}</Text>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>{t("suicidalBehaviourScreen.signs.talkingDeath")}</Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>{t("suicidalBehaviourScreen.signs.makingPlans")}</Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>{t("suicidalBehaviourScreen.signs.hopeless")}</Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>{t("suicidalBehaviourScreen.signs.moodSwings")}</Text>
          </View>

          <View style={styles.symptomItem}>
            <View style={styles.symptomDot} />
            <Text style={styles.symptomText}>{t("suicidalBehaviourScreen.signs.withdrawing")}</Text>
          </View>
        </View>

        {/* Crisis resources removed from UI per request */}

        {/* Strategies */}
        <View style={styles.interventionsSection}>
          <Text style={styles.sectionTitle}>{t("suicidalBehaviourScreen.supportStrategies")}</Text>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>{t("suicidalBehaviourScreen.strategies.commonSuggestions.title")}</Text>
            <Text style={styles.strategyDescription}>{t("suicidalBehaviourScreen.strategies.commonSuggestions.description")}</Text>
            <TouchableOpacity style={styles.viewStrategyButton} onPress={() => handleViewStrategy("commonSuggestions")}>
              <Text style={styles.viewStrategyButtonText}>{t("suicidalBehaviourScreen.viewStrategyButton")}</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>{t("suicidalBehaviourScreen.strategies.yoga.title")}</Text>
            <Text style={styles.strategyDescription}>{t("suicidalBehaviourScreen.strategies.yoga.description")}</Text>
            <TouchableOpacity style={styles.viewStrategyButton} onPress={() => handleViewStrategy("yoga")}>
              <Text style={styles.viewStrategyButtonText}>{t("suicidalBehaviourScreen.viewStrategyButton")}</Text>
            </TouchableOpacity>
          </View> */}

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>{t("suicidalBehaviourScreen.strategies.relaxation.title")}</Text>
            <Text style={styles.strategyDescription}>{t("suicidalBehaviourScreen.strategies.relaxation.description")}</Text>
            <TouchableOpacity style={styles.viewStrategyButton} onPress={() => handleViewStrategy("relaxation")}>
              <Text style={styles.viewStrategyButtonText}>{t("suicidalBehaviourScreen.viewStrategyButton")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>{t("suicidalBehaviourScreen.strategies.cbt.title")}</Text>
            <Text style={styles.strategyDescription}>{t("suicidalBehaviourScreen.strategies.cbt.description")}</Text>
            <TouchableOpacity style={styles.viewStrategyButton} onPress={() => handleViewStrategy("cbt")}>
              <Text style={styles.viewStrategyButtonText}>{t("suicidalBehaviourScreen.viewStrategyButton")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>{t("suicidalBehaviourScreen.strategies.rebt.title")}</Text>
            <Text style={styles.strategyDescription}>{t("suicidalBehaviourScreen.strategies.rebt.description")}</Text>
            <TouchableOpacity style={styles.viewStrategyButton} onPress={() => handleViewStrategy("rebt")}>
              <Text style={styles.viewStrategyButtonText}>{t("suicidalBehaviourScreen.viewStrategyButton")}</Text>
            </TouchableOpacity>
          </View>
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
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fecaca",
    width: 120,
    height: 80,
    gap: 8,
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
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  interventionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  symptomItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  symptomDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    marginRight: 12,
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
    backgroundColor: "#dc2626",
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
});
