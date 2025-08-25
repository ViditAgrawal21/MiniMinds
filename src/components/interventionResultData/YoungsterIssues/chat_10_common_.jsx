import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const YoungsterIssues_CHAT10COMMONScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("youngsterIssuesSection.chat10Common.introduction")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chat10Common.peerPressure")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.peerPressureSuggestion")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.peerPressureExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chat10Common.academicStress")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.academicStressSuggestion")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.academicStressExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chat10Common.bullying")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.bullyingSuggestion")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.bullyingExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chat10Common.identityAndSelfEsteem")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "youngsterIssuesSection.chat10Common.identityAndSelfEsteemSuggestion",
          )}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "youngsterIssuesSection.chat10Common.identityAndSelfEsteemExample",
          )}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chat10Common.bodyImageIssues")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.bodyImageIssuesSuggestion")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.bodyImageIssuesExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chat10Common.relationshipChallenges")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "youngsterIssuesSection.chat10Common.relationshipChallengesSuggestion",
          )}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "youngsterIssuesSection.chat10Common.relationshipChallengesExample",
          )}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chat10Common.digitalAddiction")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.digitalAddictionSuggestion")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.digitalAddictionExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chat10Common.futureUncertainty")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.futureUncertaintySuggestion")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.futureUncertaintyExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chat10Common.familyConflicts")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.familyConflictsSuggestion")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.familyConflictsExample")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chat10Common.financialLiteracy")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.financialLiteracySuggestion")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chat10Common.financialLiteracyExample")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        {t("youngsterIssuesSection.chat10Common.conclusion")}
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

export default YoungsterIssues_CHAT10COMMONScreen;
