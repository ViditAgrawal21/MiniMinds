import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const AngerManagement_CHAT10COMMONScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chat10Common.intro")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chat10Common.strategies.identifyTriggers.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("angerManagementSection.chat10Common.exampleLabel")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chat10Common.strategies.identifyTriggers.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chat10Common.strategies.relaxationTechniques.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("angerManagementSection.chat10Common.exampleLabel")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chat10Common.strategies.relaxationTechniques.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chat10Common.strategies.positiveSelfTalk.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("angerManagementSection.chat10Common.exampleLabel")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chat10Common.strategies.positiveSelfTalk.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chat10Common.strategies.takeTimeout.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("angerManagementSection.chat10Common.exampleLabel")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chat10Common.strategies.takeTimeout.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>5.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chat10Common.strategies.useIStatements.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("angerManagementSection.chat10Common.exampleLabel")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chat10Common.strategies.useIStatements.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>6.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chat10Common.strategies.problemSolve.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("angerManagementSection.chat10Common.exampleLabel")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chat10Common.strategies.problemSolve.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>7.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chat10Common.strategies.physicalExercise.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("angerManagementSection.chat10Common.exampleLabel")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chat10Common.strategies.physicalExercise.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>8.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chat10Common.strategies.betterCommunication.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("angerManagementSection.chat10Common.exampleLabel")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chat10Common.strategies.betterCommunication.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>9.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chat10Common.strategies.seekSupport.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("angerManagementSection.chat10Common.exampleLabel")}
        </Text>
        :{" "}
        {t(
          "angerManagementSection.chat10Common.strategies.seekSupport.example",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>10.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chat10Common.strategies.angerDiary.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("angerManagementSection.chat10Common.exampleLabel")}
        </Text>
        :{" "}
        {t("angerManagementSection.chat10Common.strategies.angerDiary.example")}
      </Text>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chat10Common.conclusion")}
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

export default AngerManagement_CHAT10COMMONScreen;
