import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const AngerManagement_ChatGive10CBTScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatGive10CBT.intro")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10CBT.items.cognitiveRestructuring.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whyItHelps")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.cognitiveRestructuring.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whatToDo")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.cognitiveRestructuring.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.example")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.cognitiveRestructuring.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10CBT.items.mindfulnessRelaxation.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whyItHelps")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.mindfulnessRelaxation.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whatToDo")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.mindfulnessRelaxation.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.example")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.mindfulnessRelaxation.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10CBT.items.problemSolving.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whyItHelps")}
        </Text>
        : {t("angerManagementSection.chatGive10CBT.items.problemSolving.why")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whatToDo")}
        </Text>
        : {t("angerManagementSection.chatGive10CBT.items.problemSolving.what")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.example")}
        </Text>
        :{" "}
        {t("angerManagementSection.chatGive10CBT.items.problemSolving.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10CBT.items.identifyingTriggers.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whyItHelps")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.identifyingTriggers.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whatToDo")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.identifyingTriggers.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.example")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.identifyingTriggers.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>5.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10CBT.items.thoughtStopping.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whyItHelps")}
        </Text>
        : {t("angerManagementSection.chatGive10CBT.items.thoughtStopping.why")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whatToDo")}
        </Text>
        : {t("angerManagementSection.chatGive10CBT.items.thoughtStopping.what")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.example")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.thoughtStopping.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>6.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10CBT.items.rolePlayRehearsal.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whyItHelps")}
        </Text>
        :{" "}
        {t("angerManagementSection.chatGive10CBT.items.rolePlayRehearsal.why")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whatToDo")}
        </Text>
        :{" "}
        {t("angerManagementSection.chatGive10CBT.items.rolePlayRehearsal.what")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.example")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.rolePlayRehearsal.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>7.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10CBT.items.developingEmpathy.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whyItHelps")}
        </Text>
        :{" "}
        {t("angerManagementSection.chatGive10CBT.items.developingEmpathy.why")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whatToDo")}
        </Text>
        :{" "}
        {t("angerManagementSection.chatGive10CBT.items.developingEmpathy.what")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.example")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.developingEmpathy.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>8.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10CBT.items.assertiveCommunication.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whyItHelps")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.assertiveCommunication.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whatToDo")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.assertiveCommunication.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.example")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.assertiveCommunication.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>9.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("angerManagementSection.chatGive10CBT.items.timeOut.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whyItHelps")}
        </Text>
        : {t("angerManagementSection.chatGive10CBT.items.timeOut.why")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whatToDo")}
        </Text>
        : {t("angerManagementSection.chatGive10CBT.items.timeOut.what")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.example")}
        </Text>
        : {t("angerManagementSection.chatGive10CBT.items.timeOut.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>10.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10CBT.items.settingRealisticGoals.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whyItHelps")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.settingRealisticGoals.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.whatToDo")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.settingRealisticGoals.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10CBT.example")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chatGive10CBT.items.settingRealisticGoals.example",
        )}
      </Text>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatGive10CBT.conclusion")}
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

export default AngerManagement_ChatGive10CBTScreen;
