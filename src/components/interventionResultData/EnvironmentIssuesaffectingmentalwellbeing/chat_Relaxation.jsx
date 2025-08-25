import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const EnvironmentIssuesaffectingmentalwellbeing_CHATRELAXATIONScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.chatRelaxation.introduction")}
      </Text>
      <Text style={styles.subtitle}>
        {t("environmentIssuesSection.chatRelaxation.yogaManagementTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatRelaxation.groundingPosesTitle")}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatRelaxation.groundingPosesDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatRelaxation.mountainPoseTitle")}
        </Text>
        : {t("environmentIssuesSection.chatRelaxation.mountainPoseDescription")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatRelaxation.treePoseTitle")}
        </Text>
        : {t("environmentIssuesSection.chatRelaxation.treePoseDescription")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatRelaxation.calmingPosesTitle")}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatRelaxation.calmingPosesDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatRelaxation.childsPoseTitle")}
        </Text>
        : {t("environmentIssuesSection.chatRelaxation.childsPoseDescription")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatRelaxation.catCowStretchTitle")}
        </Text>
        :{" "}
        {t("environmentIssuesSection.chatRelaxation.catCowStretchDescription")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatRelaxation.legsUpWallTitle")}
        </Text>
        : {t("environmentIssuesSection.chatRelaxation.legsUpWallDescription")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "environmentIssuesSection.chatRelaxation.heartOpeningPosesTitle",
              )}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatRelaxation.heartOpeningPosesDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatRelaxation.cobraPoseTitle")}
        </Text>
        : {t("environmentIssuesSection.chatRelaxation.cobraPoseDescription")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatRelaxation.bridgePoseTitle")}
        </Text>
        : {t("environmentIssuesSection.chatRelaxation.bridgePoseDescription")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "environmentIssuesSection.chatRelaxation.restorativePracticesTitle",
              )}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatRelaxation.restorativePracticesDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatRelaxation.corpsePoseTitle")}
        </Text>
        : {t("environmentIssuesSection.chatRelaxation.corpsePoseDescription")}
      </Text>
      <Text style={styles.subtitle}>
        {t("environmentIssuesSection.chatRelaxation.meditationPracticesTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatRelaxation.mindfulnessTitle")}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatRelaxation.mindfulnessDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("environmentIssuesSection.chatRelaxation.mindfulnessInstructions")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatRelaxation.lovingKindnessTitle")}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatRelaxation.lovingKindnessDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "environmentIssuesSection.chatRelaxation.lovingKindnessInstructions",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatRelaxation.visualizationTitle")}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatRelaxation.visualizationDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("environmentIssuesSection.chatRelaxation.visualizationInstructions")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "environmentIssuesSection.chatRelaxation.natureMeditationTitle",
              )}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatRelaxation.natureMeditationDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "environmentIssuesSection.chatRelaxation.natureMeditationInstructions",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t("environmentIssuesSection.chatRelaxation.tipsTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatRelaxation.consistencyTip")}
            </Text>
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatRelaxation.integrationTip")}
            </Text>
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatRelaxation.communityTip")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.chatRelaxation.conclusion")}
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

export default EnvironmentIssuesaffectingmentalwellbeing_CHATRELAXATIONScreen;
