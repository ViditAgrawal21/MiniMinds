import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const EnvironmentIssuesaffectingmentalwellbeing_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.chatAnySoftwa.introduction")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatAnySoftwa.mindfulnessAppsTitle")}
            </Text>
            :{" "}
            {t("environmentIssuesSection.chatAnySoftwa.mindfulnessAppsContent")}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "environmentIssuesSection.chatAnySoftwa.browserExtensionsTitle",
              )}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatAnySoftwa.browserExtensionsContent",
            )}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatAnySoftwa.socialMediaTitle")}
            </Text>
            : {t("environmentIssuesSection.chatAnySoftwa.socialMediaContent")}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "environmentIssuesSection.chatAnySoftwa.advocacyPlatformsTitle",
              )}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatAnySoftwa.advocacyPlatformsContent",
            )}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "environmentIssuesSection.chatAnySoftwa.digitalWellBeingTitle",
              )}
            </Text>
            :{" "}
            {t(
              "environmentIssuesSection.chatAnySoftwa.digitalWellBeingContent",
            )}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatAnySoftwa.educationalAppsTitle")}
            </Text>
            :{" "}
            {t("environmentIssuesSection.chatAnySoftwa.educationalAppsContent")}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatAnySoftwa.mentalHealthTitle")}
            </Text>
            : {t("environmentIssuesSection.chatAnySoftwa.mentalHealthContent")}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatAnySoftwa.gamificationTitle")}
            </Text>
            : {t("environmentIssuesSection.chatAnySoftwa.gamificationContent")}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chatAnySoftwa.communityTitle")}
            </Text>
            : {t("environmentIssuesSection.chatAnySoftwa.communityContent")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.chatAnySoftwa.conclusion")}
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

export default EnvironmentIssuesaffectingmentalwellbeing_CHATANYSOFTWAScreen;
