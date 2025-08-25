import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const EnvironmentIssuesaffectingmentalwellbeing_GIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        {t("environmentIssuesSection.giveMe10.queryTitle")}
      </Text>
      <Text style={styles.subtitle}>
        {t("environmentIssuesSection.giveMe10.resultTitle")}
      </Text>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.giveMe10.introduction")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.giveMe10.airQualityTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.airQualityQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.airQualityScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.giveMe10.climateChangeTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.climateChangeQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.climateChangeScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.giveMe10.noisePollutionTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.noisePollutionQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.noisePollutionScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.giveMe10.greenSpaceTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.greenSpaceQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.greenSpaceScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.giveMe10.waterQualityTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.waterQualityQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.waterQualityScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.giveMe10.naturalDisastersTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.naturalDisastersQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.naturalDisastersScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.giveMe10.wasteAndPollutionTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.wasteAndPollutionQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.wasteAndPollutionScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.giveMe10.biodiversityLossTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.biodiversityLossQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.biodiversityLossScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.giveMe10.temperatureExtremesTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.temperatureExtremesQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.temperatureExtremesScale")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "environmentIssuesSection.giveMe10.sustainabilityPracticesTitle",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("environmentIssuesSection.giveMe10.sustainabilityPracticesQuestion")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.giveMe10.sustainabilityPracticesScale")}
      </Text>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.giveMe10.conclusion")}
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

export default EnvironmentIssuesaffectingmentalwellbeing_GIVEME10Screen;
