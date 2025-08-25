import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const AngerManagement_CHATRELAXATIONScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatRelaxation.intro")}
      </Text>
      <Text style={styles.subtitle}>
        {t("angerManagementSection.chatRelaxation.yogaTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatRelaxation.yoga.mindfulBreathing.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "angerManagementSection.chatRelaxation.yoga.mindfulBreathing.ujjayiTitle",
          )}
        </Text>{" "}
        {t(
          "angerManagementSection.chatRelaxation.yoga.mindfulBreathing.ujjayiDescription",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "angerManagementSection.chatRelaxation.yoga.mindfulBreathing.nadiShodhanaTitle",
          )}
        </Text>{" "}
        {t(
          "angerManagementSection.chatRelaxation.yoga.mindfulBreathing.nadiShodhanaDescription",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("angerManagementSection.chatRelaxation.yoga.yogaPoses.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "angerManagementSection.chatRelaxation.yoga.yogaPoses.childsPoseTitle",
          )}
        </Text>{" "}
        {t(
          "angerManagementSection.chatRelaxation.yoga.yogaPoses.childsPoseDescription",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "angerManagementSection.chatRelaxation.yoga.yogaPoses.catCowTitle",
          )}
        </Text>{" "}
        {t(
          "angerManagementSection.chatRelaxation.yoga.yogaPoses.catCowDescription",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "angerManagementSection.chatRelaxation.yoga.yogaPoses.forwardBendTitle",
          )}
        </Text>{" "}
        {t(
          "angerManagementSection.chatRelaxation.yoga.yogaPoses.forwardBendDescription",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "angerManagementSection.chatRelaxation.yoga.yogaPoses.legsUpWallTitle",
          )}
        </Text>{" "}
        {t(
          "angerManagementSection.chatRelaxation.yoga.yogaPoses.legsUpWallDescription",
        )}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "angerManagementSection.chatRelaxation.yoga.yogaPoses.corpsePoseTitle",
          )}
        </Text>{" "}
        {t(
          "angerManagementSection.chatRelaxation.yoga.yogaPoses.corpsePoseDescription",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatRelaxation.yoga.mindfulMovement.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatRelaxation.yoga.mindfulMovement.description",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t("angerManagementSection.chatRelaxation.meditationTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatRelaxation.meditation.mindfulness.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatRelaxation.meditation.mindfulness.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatRelaxation.meditation.lovingKindness.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatRelaxation.meditation.lovingKindness.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatRelaxation.meditation.bodyScan.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatRelaxation.meditation.bodyScan.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatRelaxation.meditation.visualization.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatRelaxation.meditation.visualization.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>5.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatRelaxation.meditation.gratitude.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "angerManagementSection.chatRelaxation.meditation.gratitude.description",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t("angerManagementSection.chatRelaxation.additionalTipsTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatRelaxation.additionalTips.consistency.title",
              )}
            </Text>{" "}
            {t(
              "angerManagementSection.chatRelaxation.additionalTips.consistency.description",
            )}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatRelaxation.additionalTips.journaling.title",
              )}
            </Text>{" "}
            {t(
              "angerManagementSection.chatRelaxation.additionalTips.journaling.description",
            )}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatRelaxation.additionalTips.professionalSupport.title",
              )}
            </Text>{" "}
            {t(
              "angerManagementSection.chatRelaxation.additionalTips.professionalSupport.description",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatRelaxation.conclusion")}
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

export default AngerManagement_CHATRELAXATIONScreen;
