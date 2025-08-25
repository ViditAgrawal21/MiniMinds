import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const AngerManagement_RGIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.rGiveMe10.intro")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.rGiveMe10.questions.frequencyOfAnger.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.frequencyOfAnger.question",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.reasoningLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.frequencyOfAnger.reasoning",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.scoringLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.frequencyOfAnger.scoring",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.rGiveMe10.questions.intensityOfAnger.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.intensityOfAnger.question",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.reasoningLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.intensityOfAnger.reasoning",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.scoringLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.intensityOfAnger.scoring",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.rGiveMe10.questions.controlOverAnger.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.controlOverAnger.question",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.reasoningLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.controlOverAnger.reasoning",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.scoringLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.controlOverAnger.scoring",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.rGiveMe10.questions.triggersOfAnger.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.triggersOfAnger.question",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.reasoningLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.triggersOfAnger.reasoning",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.scoringLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.triggersOfAnger.scoring",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>5.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.rGiveMe10.questions.expressionOfAnger.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.expressionOfAnger.question",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.reasoningLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.expressionOfAnger.reasoning",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.scoringLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.expressionOfAnger.scoring",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>6.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.rGiveMe10.questions.impactOnRelationships.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.impactOnRelationships.question",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.reasoningLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.impactOnRelationships.reasoning",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.scoringLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.impactOnRelationships.scoring",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>7.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.rGiveMe10.questions.physicalReactions.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.physicalReactions.question",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.reasoningLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.physicalReactions.reasoning",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.scoringLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.physicalReactions.scoring",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>8.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.rGiveMe10.questions.resolutionOfAnger.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.resolutionOfAnger.question",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.reasoningLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.resolutionOfAnger.reasoning",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.scoringLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.resolutionOfAnger.scoring",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>9.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.rGiveMe10.questions.angerAndDecisionMaking.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.angerAndDecisionMaking.question",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.reasoningLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.angerAndDecisionMaking.reasoning",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.scoringLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.angerAndDecisionMaking.scoring",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>10.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.rGiveMe10.questions.angerManagementTechniques.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.angerManagementTechniques.question",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.reasoningLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.angerManagementTechniques.reasoning",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.rGiveMe10.scoringLabel")}:{" "}
        {t(
          "angerManagementSection.rGiveMe10.questions.angerManagementTechniques.scoring",
        )}
      </Text>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.rGiveMe10.conclusion")}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#222",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
    color: "#333",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: "#444",
  },
  listContainer: {
    marginBottom: 15,
    paddingLeft: 10,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bulletNumber: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
    fontWeight: "bold",
    color: "#555",
  },
  listText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: "#444",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
});

export default AngerManagement_RGIVEME10Screen;
