import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const AngerManagement_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatAnySoftwa.intro")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatAnySoftwa.tools.mindfulnessApps.title",
              )}
            </Text>
            :{" "}
            {t(
              "angerManagementSection.chatAnySoftwa.tools.mindfulnessApps.description",
            )}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatAnySoftwa.tools.emotionTrackingApps.title",
              )}
            </Text>
            :{" "}
            {t(
              "angerManagementSection.chatAnySoftwa.tools.emotionTrackingApps.description",
            )}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatAnySoftwa.tools.browserExtensions.title",
              )}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatAnySoftwa.tools.browserExtensions.point1",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatAnySoftwa.tools.browserExtensions.point2",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatAnySoftwa.tools.digitalWellbeing.title",
              )}
            </Text>
            :{" "}
            {t(
              "angerManagementSection.chatAnySoftwa.tools.digitalWellbeing.description",
            )}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>5.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatAnySoftwa.tools.customReminders.title",
              )}
            </Text>
            :{" "}
            {t(
              "angerManagementSection.chatAnySoftwa.tools.customReminders.description",
            )}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>6.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatAnySoftwa.tools.onlineTherapy.title",
              )}
            </Text>
            :{" "}
            {t(
              "angerManagementSection.chatAnySoftwa.tools.onlineTherapy.description",
            )}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>7.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("angerManagementSection.chatAnySoftwa.tools.wearables.title")}
            </Text>
            :{" "}
            {t(
              "angerManagementSection.chatAnySoftwa.tools.wearables.description",
            )}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>8.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatAnySoftwa.tools.productivityApps.title",
              )}
            </Text>
            :{" "}
            {t(
              "angerManagementSection.chatAnySoftwa.tools.productivityApps.description",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatAnySoftwa.conclusion")}
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

export default AngerManagement_CHATANYSOFTWAScreen;
