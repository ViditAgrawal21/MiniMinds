import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the i18n and t function

const Addictions_Chat10CommonScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("addictionsSection.chat10Common.intro")}
      </Text>

      {/* 1. Acknowledgment and Acceptance */}
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chat10Common.acknowledgmentTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("addictionsSection.chat10Common.acknowledgmentExample")}
      </Text>

      {/* 2. Seeking Professional Help */}
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chat10Common.professionalHelpTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("addictionsSection.chat10Common.professionalHelpExample")}
      </Text>

      {/* 3. Behavioral Therapy */}
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chat10Common.behavioralTherapyTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("addictionsSection.chat10Common.behavioralTherapyExample")}
      </Text>

      {/* 4. Support Groups */}
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chat10Common.supportGroupsTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("addictionsSection.chat10Common.supportGroupsExample")}
      </Text>

      {/* 5. Developing Coping Mechanisms */}
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>5.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chat10Common.copingMechanismsTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("addictionsSection.chat10Common.copingMechanismsExample")}
      </Text>

      {/* 6. Mindfulness and Meditation */}
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>6.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chat10Common.mindfulnessTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("addictionsSection.chat10Common.mindfulnessExample")}
      </Text>

      {/* 7. Avoidance of Triggers */}
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>7.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chat10Common.avoidanceTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("addictionsSection.chat10Common.avoidanceExample")}
      </Text>

      {/* 8. Healthy Lifestyle Changes */}
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>8.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chat10Common.lifestyleTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("addictionsSection.chat10Common.lifestyleExample")}
      </Text>

      {/* 9. Setting Goals and Monitoring Progress */}
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>9.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chat10Common.goalsTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("addictionsSection.chat10Common.goalsExample")}
      </Text>

      {/* 10. Building a Supportive Network */}
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>10.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chat10Common.networkTitle")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("addictionsSection.chat10Common.networkExample")}
      </Text>

      <Text style={styles.paragraph}>
        {t("addictionsSection.chat10Common.conclusion")}
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

export default Addictions_Chat10CommonScreen;
