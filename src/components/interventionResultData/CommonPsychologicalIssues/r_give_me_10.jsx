import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const CommonPsychologicalIssues_RGIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.rGiveMe10.introduction")}
      </Text>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.rGiveMe10.reasoning")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.rGiveMe10.anxiety")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.rGiveMe10.anxietyScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.rGiveMe10.depression")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.rGiveMe10.depressionScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.rGiveMe10.stress")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.rGiveMe10.stressScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.rGiveMe10.sleepDisturbance")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.rGiveMe10.sleepDisturbanceScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.rGiveMe10.irritability")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.rGiveMe10.irritabilityScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "commonPsychologicalIssuesSection.rGiveMe10.concentrationIssues",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "commonPsychologicalIssuesSection.rGiveMe10.concentrationIssuesScale",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.rGiveMe10.socialWithdrawal")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.rGiveMe10.socialWithdrawalScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.rGiveMe10.fatigue")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.rGiveMe10.fatigueScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.rGiveMe10.selfEsteem")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.rGiveMe10.selfEsteemScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.rGiveMe10.appetiteChanges")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.rGiveMe10.appetiteChangesScale")}
      </Text>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.rGiveMe10.conclusion")}
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

export default CommonPsychologicalIssues_RGIVEME10Screen;
