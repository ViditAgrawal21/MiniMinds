import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const AngerManagement_CHATYOGAANDMScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatYogaAndM.intro")}
      </Text>
      <Text style={styles.subtitle}>
        {t("angerManagementSection.chatYogaAndM.yogaTitle")}
      </Text>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatYogaAndM.yogaIntro")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("angerManagementSection.chatYogaAndM.yoga.childsPose.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.childsPose.step1")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.childsPose.step2")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.childsPose.step3")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("angerManagementSection.chatYogaAndM.yoga.catCowPose.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.catCowPose.step1")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.catCowPose.step2")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.catCowPose.step3")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.catCowPose.step4")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("angerManagementSection.chatYogaAndM.yoga.forwardBend.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.forwardBend.step1")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.forwardBend.step2")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.forwardBend.step3")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatYogaAndM.yoga.legsUpTheWall.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.legsUpTheWall.step1")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.legsUpTheWall.step2")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>5.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("angerManagementSection.chatYogaAndM.yoga.corpsePose.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.corpsePose.step1")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.yoga.corpsePose.step2")}
      </Text>
      <Text style={styles.subtitle}>
        {t("angerManagementSection.chatYogaAndM.meditationTitle")}
      </Text>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatYogaAndM.meditationIntro")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatYogaAndM.meditation.mindfulnessMeditation.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatYogaAndM.meditation.mindfulnessMeditation.step1",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatYogaAndM.meditation.mindfulnessMeditation.step2",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatYogaAndM.meditation.mindfulnessMeditation.step3",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatYogaAndM.meditation.mindfulnessMeditation.step4",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatYogaAndM.meditation.lovingKindness.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatYogaAndM.meditation.lovingKindness.step1",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatYogaAndM.meditation.lovingKindness.step2",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatYogaAndM.meditation.lovingKindness.step3",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatYogaAndM.meditation.guidedVisualization.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatYogaAndM.meditation.guidedVisualization.step1",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatYogaAndM.meditation.guidedVisualization.step2",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatYogaAndM.meditation.bodyScan.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.meditation.bodyScan.step1")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.meditation.bodyScan.step2")}
      </Text>
      <Text style={styles.paragraph}>
        - {t("angerManagementSection.chatYogaAndM.meditation.bodyScan.step3")}
      </Text>
      <Text style={styles.subtitle}>
        {t("angerManagementSection.chatYogaAndM.additionalTipsTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatYogaAndM.additionalTips.breathing.title",
              )}
            </Text>
            :{" "}
            {t(
              "angerManagementSection.chatYogaAndM.additionalTips.breathing.description",
            )}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatYogaAndM.additionalTips.regularPractice.title",
              )}
            </Text>
            :{" "}
            {t(
              "angerManagementSection.chatYogaAndM.additionalTips.regularPractice.description",
            )}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatYogaAndM.additionalTips.journaling.title",
              )}
            </Text>
            :{" "}
            {t(
              "angerManagementSection.chatYogaAndM.additionalTips.journaling.description",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatYogaAndM.conclusion")}
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

export default AngerManagement_CHATYOGAANDMScreen;
