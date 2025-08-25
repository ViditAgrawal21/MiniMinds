import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const EnvironmentIssuesaffectingmentalwellbeing_RGIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.rGiveMe10.introduction")}
      </Text>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.rGiveMe10.analysisIntro")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.rGiveMe10.airQualityTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.airQualityQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.airQualityReasoning")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.airQualityScore")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.rGiveMe10.climateChangeTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.climateChangeQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.climateChangeReasoning")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.climateChangeScore")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.rGiveMe10.noisePollutionTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.noisePollutionQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.noisePollutionReasoning")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.noisePollutionScore")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.rGiveMe10.greenSpaceTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.greenSpaceQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.greenSpaceReasoning")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.greenSpaceScore")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.rGiveMe10.waterQualityTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.waterQualityQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.waterQualityReasoning")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.waterQualityScore")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.rGiveMe10.naturalDisastersTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.naturalDisastersQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.naturalDisastersReasoning")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.naturalDisastersScore")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.rGiveMe10.wasteAndPollutionTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.wasteAndPollutionQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.wasteAndPollutionReasoning")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.wasteAndPollutionScore")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.rGiveMe10.biodiversityLossTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.biodiversityLossQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.biodiversityLossReasoning")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.biodiversityLossScore")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.rGiveMe10.temperatureExtremesTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.temperatureExtremesQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.temperatureExtremesReasoning")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.temperatureExtremesScore")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "environmentIssuesSection.rGiveMe10.sustainabilityPracticesTitle",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "environmentIssuesSection.rGiveMe10.sustainabilityPracticesQuestion",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "environmentIssuesSection.rGiveMe10.sustainabilityPracticesReasoning",
        )}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.rGiveMe10.sustainabilityPracticesScore")}
      </Text>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.rGiveMe10.conclusion")}
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

export default EnvironmentIssuesaffectingmentalwellbeing_RGIVEME10Screen;
