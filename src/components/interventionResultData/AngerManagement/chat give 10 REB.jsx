import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const AngerManagement_CHATGIVE10REBScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatGive10REB.intro")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10REB.strategies.identifyChallengeIrrationalBeliefs.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.identifyChallengeIrrationalBeliefs.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.identifyChallengeIrrationalBeliefs.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.example")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.identifyChallengeIrrationalBeliefs.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10REB.strategies.adoptFlexibleThinking.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.adoptFlexibleThinking.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.adoptFlexibleThinking.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.example")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.adoptFlexibleThinking.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10REB.strategies.focusOnProblemSolving.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.focusOnProblemSolving.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.focusOnProblemSolving.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.example")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.focusOnProblemSolving.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10REB.strategies.acceptImperfection.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.acceptImperfection.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.acceptImperfection.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.example")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.acceptImperfection.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>5.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10REB.strategies.developEmpathy.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.developEmpathy.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.developEmpathy.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.example")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.developEmpathy.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>6.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10REB.strategies.practiceRelaxation.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.practiceRelaxation.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.practiceRelaxation.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.example")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.practiceRelaxation.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>7.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10REB.strategies.useHumor.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t("angerManagementSection.chatGive10REB.strategies.useHumor.why")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t("angerManagementSection.chatGive10REB.strategies.useHumor.what")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.example")}
        </Text>{" "}
        {t("angerManagementSection.chatGive10REB.strategies.useHumor.example")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>8.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10REB.strategies.practiceAssertiveCommunication.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.practiceAssertiveCommunication.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.practiceAssertiveCommunication.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.example")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.practiceAssertiveCommunication.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>9.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10REB.strategies.implementCoolDown.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.implementCoolDown.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.implementCoolDown.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.example")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.implementCoolDown.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>10.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatGive10REB.strategies.reflectAndLearn.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whyItHelps")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.reflectAndLearn.why",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.whatToDo")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.reflectAndLearn.what",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("angerManagementSection.chatGive10REB.example")}
        </Text>{" "}
        {t(
          "angerManagementSection.chatGive10REB.strategies.reflectAndLearn.example",
        )}
      </Text>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatGive10REB.conclusion")}
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

export default AngerManagement_CHATGIVE10REBScreen;
