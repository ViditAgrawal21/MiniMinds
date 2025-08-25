import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const EnvironmentIssuesaffectingmentalwellbeing_CHATGIVE10REBScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.chatGive10REB.introduction")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatGive10REB.identifyTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.identifyWhy")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.identifyWhat")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.example")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.identifyExample")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatGive10REB.catastrophicTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.catastrophicWhy")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.catastrophicWhat")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.example")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.catastrophicExample")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatGive10REB.focusTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.focusWhy")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.focusWhat")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.example")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.focusExample")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatGive10REB.optimismTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.optimismWhy")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.optimismWhat")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.example")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.optimismExample")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatGive10REB.acceptanceTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.acceptanceWhy")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.acceptanceWhat")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("environmentIssuesSection.chatGive10REB.example")}
        </Text>{" "}
        {t("environmentIssuesSection.chatGive10REB.acceptanceExample")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Separate Preferences from Needs</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>Why it helps:</Text> Differentiating between
        what we want and what we need reduces emotional disturbance.
      </Text>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>What to do:</Text> Consider how demanding
        perfection (like zero pollution) is unnecessary and counterproductive.
      </Text>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>Example:</Text> "I would prefer a
        pollution-free city, but I know perfection is unrealistic."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Reframe Global Beliefs</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>Why it helps:</Text> Reframing broad
        negative outlooks into specifics aids in reducing overwhelm.
      </Text>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>What to do:</Text> Shift from "The world is
        doomed" to "Certain areas need improvement."
      </Text>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>Example:</Text> "Global warming is serious
        but solvable with collective effort."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Practice Mindfulness</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>Why it helps:</Text> Mindfulness can reduce
        the negative mental impact of stress and anxiety.
      </Text>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>What to do:</Text> Engage in mindfulness
        exercises to stay grounded in the present.
      </Text>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>Example:</Text> "I am focusing on what I can
        do today rather than ruminating on all possible future problems."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Seek Social Support</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>Why it helps:</Text> Connecting with others
        can provide emotional relief and inspire action.
      </Text>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>What to do:</Text> Join groups or
        communities that work toward environmental conservation.
      </Text>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>Example:</Text> "Participating in local
        clean-ups links me with like-minded people and renews my hope."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Practice Gratitude</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>Why it helps:</Text> Focusing on what is
        good helps in maintaining a positive outlook amidst environmental
        challenges.
      </Text>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>What to do:</Text> Regularly list aspects of
        the environment you appreciate.
      </Text>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>Example:</Text> "I am thankful for the local
        park's beauty and remain motivated to preserve it."
      </Text>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.chatGive10REB.conclusion")}
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

export default EnvironmentIssuesaffectingmentalwellbeing_CHATGIVE10REBScreen;
