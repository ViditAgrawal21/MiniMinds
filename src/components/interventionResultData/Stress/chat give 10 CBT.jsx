import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const Stress_CHATGIVE10CBTScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>{t("stressChatGive10CBT.intro")}</Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10CBT.techniques.cognitiveRestructuring.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whyItHelps")}
        </Text>
        :{" "}
        {t("stressChatGive10CBT.techniques.cognitiveRestructuring.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10CBT.techniques.cognitiveRestructuring.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.example")}
        </Text>
        : {t("stressChatGive10CBT.techniques.cognitiveRestructuring.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10CBT.techniques.problemSolving.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10CBT.techniques.problemSolving.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10CBT.techniques.problemSolving.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.example")}
        </Text>
        : {t("stressChatGive10CBT.techniques.problemSolving.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10CBT.techniques.mindfulness.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10CBT.techniques.mindfulness.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10CBT.techniques.mindfulness.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.example")}
        </Text>
        : {t("stressChatGive10CBT.techniques.mindfulness.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10CBT.techniques.behavioralActivation.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10CBT.techniques.behavioralActivation.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10CBT.techniques.behavioralActivation.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.example")}
        </Text>
        : {t("stressChatGive10CBT.techniques.behavioralActivation.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10CBT.techniques.exposureToStressors.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10CBT.techniques.exposureToStressors.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10CBT.techniques.exposureToStressors.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.example")}
        </Text>
        : {t("stressChatGive10CBT.techniques.exposureToStressors.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10CBT.techniques.timeManagement.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10CBT.techniques.timeManagement.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10CBT.techniques.timeManagement.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.example")}
        </Text>
        : {t("stressChatGive10CBT.techniques.timeManagement.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10CBT.techniques.assertivenessTraining.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10CBT.techniques.assertivenessTraining.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10CBT.techniques.assertivenessTraining.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.example")}
        </Text>
        : {t("stressChatGive10CBT.techniques.assertivenessTraining.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10CBT.techniques.selfMonitoring.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10CBT.techniques.selfMonitoring.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10CBT.techniques.selfMonitoring.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.example")}
        </Text>
        : {t("stressChatGive10CBT.techniques.selfMonitoring.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10CBT.techniques.cognitiveDiffusion.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10CBT.techniques.cognitiveDiffusion.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10CBT.techniques.cognitiveDiffusion.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.example")}
        </Text>
        : {t("stressChatGive10CBT.techniques.cognitiveDiffusion.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "stressChatGive10CBT.techniques.developingCopingStrategies.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whyItHelps")}
        </Text>
        :{" "}
        {t(
          "stressChatGive10CBT.techniques.developingCopingStrategies.whyItHelps",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.whatToDo")}
        </Text>
        :{" "}
        {t(
          "stressChatGive10CBT.techniques.developingCopingStrategies.whatToDo",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10CBT.labels.example")}
        </Text>
        :{" "}
        {t("stressChatGive10CBT.techniques.developingCopingStrategies.example")}
      </Text>
      <Text style={styles.paragraph}>
        {t("stressChatGive10CBT.conclusion")}
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

export default Stress_CHATGIVE10CBTScreen;
