import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const Addictions_ChatGive10REBScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>{t("addictionsChatGive10REB.intro")}</Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsChatGive10REB.strategies.identifyDispute.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.identifyDispute.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.identifyDispute.whatToDo")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.example")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.identifyDispute.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsChatGive10REB.strategies.selfAcceptance.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.selfAcceptance.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.selfAcceptance.whatToDo")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.example")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.selfAcceptance.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsChatGive10REB.strategies.changeMusts.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.changeMusts.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.changeMusts.whatToDo")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.example")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.changeMusts.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "addictionsChatGive10REB.strategies.emotionalResponsibility.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whyItHelps")}
        </Text>
        :{" "}
        {t(
          "addictionsChatGive10REB.strategies.emotionalResponsibility.whyItHelps",
        )}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whatToDo")}
        </Text>
        :{" "}
        {t(
          "addictionsChatGive10REB.strategies.emotionalResponsibility.whatToDo",
        )}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.example")}
        </Text>
        :{" "}
        {t(
          "addictionsChatGive10REB.strategies.emotionalResponsibility.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "addictionsChatGive10REB.strategies.visualizeConsequences.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whyItHelps")}
        </Text>
        :{" "}
        {t(
          "addictionsChatGive10REB.strategies.visualizeConsequences.whyItHelps",
        )}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whatToDo")}
        </Text>
        :{" "}
        {t("addictionsChatGive10REB.strategies.visualizeConsequences.whatToDo")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.example")}
        </Text>
        :{" "}
        {t("addictionsChatGive10REB.strategies.visualizeConsequences.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsChatGive10REB.strategies.rationalCopingPlan.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whyItHelps")}
        </Text>
        :{" "}
        {t("addictionsChatGive10REB.strategies.rationalCopingPlan.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.rationalCopingPlan.whatToDo")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.example")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.rationalCopingPlan.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsChatGive10REB.strategies.problemSolving.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.problemSolving.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.problemSolving.whatToDo")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.example")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.problemSolving.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "addictionsChatGive10REB.strategies.challengeCatastrophic.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whyItHelps")}
        </Text>
        :{" "}
        {t(
          "addictionsChatGive10REB.strategies.challengeCatastrophic.whyItHelps",
        )}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whatToDo")}
        </Text>
        :{" "}
        {t("addictionsChatGive10REB.strategies.challengeCatastrophic.whatToDo")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.example")}
        </Text>
        :{" "}
        {t("addictionsChatGive10REB.strategies.challengeCatastrophic.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsChatGive10REB.strategies.mindfulness.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.mindfulness.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.mindfulness.whatToDo")}
      </Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.example")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.mindfulness.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsChatGive10REB.strategies.socialSupport.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("addictionsChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("addictionsChatGive10REB.strategies.socialSupport.whyItHelps")}
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

export default Addictions_ChatGive10REBScreen;
