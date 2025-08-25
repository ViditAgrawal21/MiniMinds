import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const Stress_CHATGIVE10REBScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>{t("stressChatGive10REB.intro")}</Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10REB.techniques.identifyChallenge.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10REB.techniques.identifyChallenge.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10REB.techniques.identifyChallenge.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.example")}
        </Text>
        : {t("stressChatGive10REB.techniques.identifyChallenge.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10REB.techniques.rationalPerspective.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10REB.techniques.rationalPerspective.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10REB.techniques.rationalPerspective.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.example")}
        </Text>
        : {t("stressChatGive10REB.techniques.rationalPerspective.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10REB.techniques.rationalSelfTalk.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10REB.techniques.rationalSelfTalk.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10REB.techniques.rationalSelfTalk.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.example")}
        </Text>
        : {t("stressChatGive10REB.techniques.rationalSelfTalk.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10REB.techniques.acceptUncertainty.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10REB.techniques.acceptUncertainty.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10REB.techniques.acceptUncertainty.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.example")}
        </Text>
        : {t("stressChatGive10REB.techniques.acceptUncertainty.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10REB.techniques.prioritizeSelfCare.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10REB.techniques.prioritizeSelfCare.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10REB.techniques.prioritizeSelfCare.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.example")}
        </Text>
        : {t("stressChatGive10REB.techniques.prioritizeSelfCare.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10REB.techniques.practiceMindfulness.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10REB.techniques.practiceMindfulness.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10REB.techniques.practiceMindfulness.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.example")}
        </Text>
        : {t("stressChatGive10REB.techniques.practiceMindfulness.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10REB.techniques.reframeChallenges.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10REB.techniques.reframeChallenges.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10REB.techniques.reframeChallenges.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.example")}
        </Text>
        : {t("stressChatGive10REB.techniques.reframeChallenges.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10REB.techniques.setRealisticGoals.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10REB.techniques.setRealisticGoals.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10REB.techniques.setRealisticGoals.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.example")}
        </Text>
        : {t("stressChatGive10REB.techniques.setRealisticGoals.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10REB.techniques.limitMustThinking.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10REB.techniques.limitMustThinking.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10REB.techniques.limitMustThinking.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.example")}
        </Text>
        : {t("stressChatGive10REB.techniques.limitMustThinking.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("stressChatGive10REB.techniques.visualizePositive.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whyItHelps")}
        </Text>
        : {t("stressChatGive10REB.techniques.visualizePositive.whyItHelps")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.whatToDo")}
        </Text>
        : {t("stressChatGive10REB.techniques.visualizePositive.whatToDo")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("stressChatGive10REB.labels.example")}
        </Text>
        : {t("stressChatGive10REB.techniques.visualizePositive.example")}
      </Text>
      <Text style={styles.paragraph}>
        {t("stressChatGive10REB.conclusion")}
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

export default Stress_CHATGIVE10REBScreen;
