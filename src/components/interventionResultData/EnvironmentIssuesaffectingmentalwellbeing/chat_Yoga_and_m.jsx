import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const EnvironmentIssuesaffectingmentalwellbeing_CHATYOGAANDMScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.chatYogaAndM.introduction")}
      </Text>
      <Text style={styles.subtitle}>
        {t("environmentIssuesSection.chatYogaAndM.yogaPracticesTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatYogaAndM.groundingPosesTitle")}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatYogaAndM.groundingPosesDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatYogaAndM.mountainPoseTitle")}
        </Text>
        : {t("environmentIssuesSection.chatYogaAndM.mountainPoseDescription")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatYogaAndM.treePoseTitle")}
        </Text>
        : {t("environmentIssuesSection.chatYogaAndM.treePoseDescription")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatYogaAndM.heartOpeningTitle")}
            </Text>
            :{" "}
            {t("environmentIssuesSection.chatYogaAndM.heartOpeningDescription")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatYogaAndM.camelPoseTitle")}
        </Text>
        : {t("environmentIssuesSection.chatYogaAndM.camelPoseDescription")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatYogaAndM.bridgePoseTitle")}
        </Text>
        : {t("environmentIssuesSection.chatYogaAndM.bridgePoseDescription")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatYogaAndM.restorativePosesTitle")}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatYogaAndM.restorativePosesDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatYogaAndM.childsPoseTitle")}
        </Text>
        : {t("environmentIssuesSection.chatYogaAndM.childsPoseDescription")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatYogaAndM.legsUpWallTitle")}
        </Text>
        : {t("environmentIssuesSection.chatYogaAndM.legsUpWallDescription")}
      </Text>
      <Text style={styles.subtitle}>
        {t("environmentIssuesSection.chatYogaAndM.meditationStepsTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatYogaAndM.mindfulBreathingTitle")}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatYogaAndM.mindfulBreathingDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "environmentIssuesSection.chatYogaAndM.mindfulBreathingInstructions",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "environmentIssuesSection.chatYogaAndM.natureVisualizationTitle",
              )}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatYogaAndM.natureVisualizationDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "environmentIssuesSection.chatYogaAndM.natureVisualizationInstructions",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatYogaAndM.lovingKindnessTitle")}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatYogaAndM.lovingKindnessDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("environmentIssuesSection.chatYogaAndM.lovingKindnessInstructions")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "environmentIssuesSection.chatYogaAndM.gratitudePracticeTitle",
              )}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatYogaAndM.gratitudePracticeDescription",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "environmentIssuesSection.chatYogaAndM.gratitudePracticeInstructions",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t("environmentIssuesSection.chatYogaAndM.integrationTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            {t("environmentIssuesSection.chatYogaAndM.integrationStep1")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            {t("environmentIssuesSection.chatYogaAndM.integrationStep2")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            {t("environmentIssuesSection.chatYogaAndM.integrationStep3")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.chatYogaAndM.conclusion")}
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

export default EnvironmentIssuesaffectingmentalwellbeing_CHATYOGAANDMScreen;
