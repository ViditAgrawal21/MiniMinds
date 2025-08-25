import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const EnvironmentIssuesaffectingmentalwellbeing_CHAT10COMMONScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.chat10Common.introduction")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chat10Common.greenSpacesTitle")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          {t("environmentIssuesSection.chat10Common.greenSpacesDescription")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          {t("environmentIssuesSection.chat10Common.example")}
        </Text>
        : {t("environmentIssuesSection.chat10Common.greenSpacesExample")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "environmentIssuesSection.chat10Common.outdoorActivitiesTitle",
              )}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          {t(
            "environmentIssuesSection.chat10Common.outdoorActivitiesDescription",
          )}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          {t("environmentIssuesSection.chat10Common.example")}
        </Text>
        : {t("environmentIssuesSection.chat10Common.outdoorActivitiesExample")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "environmentIssuesSection.chat10Common.sustainablePracticesTitle",
              )}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          {t(
            "environmentIssuesSection.chat10Common.sustainablePracticesDescription",
          )}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          {t("environmentIssuesSection.chat10Common.example")}
        </Text>
        :{" "}
        {t("environmentIssuesSection.chat10Common.sustainablePracticesExample")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("environmentIssuesSection.chat10Common.airQualityTitle")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          {t("environmentIssuesSection.chat10Common.airQualityDescription")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          {t("environmentIssuesSection.chat10Common.example")}
        </Text>
        : {t("environmentIssuesSection.chat10Common.airQualityExample")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "environmentIssuesSection.chat10Common.communityResilienceTitle",
              )}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          {t(
            "environmentIssuesSection.chat10Common.communityResilienceDescription",
          )}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          {t("environmentIssuesSection.chat10Common.example")}
        </Text>
        :{" "}
        {t("environmentIssuesSection.chat10Common.communityResilienceExample")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Supporting Access to Green Therapy</Text>:
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          Provide therapies that incorporate nature, such as eco-therapy or
          animal-assisted therapy.
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>Example</Text>: Mental health clinics offer
        forest therapy sessions, where patients engage in guided walks through
        nature parks.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Raising Awareness and Education</Text>:
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          Educate people about the links between the environment and mental
          health.
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>Example</Text>: Organize educational
        campaigns highlighting how pollution affects mental well-being, aiming
        to cultivate environmental stewardship.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Reducing Noise Pollution</Text>:
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          Implement solutions to minimize noise pollution and its harmful
          effects on mental health.
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>Example</Text>: Regulations are enforced to
        reduce industrial noise at night, and soundproofing measures are
        subsidized for homes in noisy areas.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Facilitating Social Connections</Text>:
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          Create environments that foster social interaction and community
          support.
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>Example</Text>: Initiatives to develop
        communal spaces like neighborhood centers where people can gather for
        events, reducing social isolation.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              Incorporating Mindfulness and Meditation
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>
          Promote mindfulness techniques to help people reconnect with their
          environment and reduce stress.
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.italic}>Example</Text>: Community centers offer free
        outdoor yoga and mindfulness sessions, using natural surroundings to
        enhance therapeutic effects.
      </Text>
      <Text style={styles.paragraph}>
        {t("environmentIssuesSection.chat10Common.conclusion")}
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

export default EnvironmentIssuesaffectingmentalwellbeing_CHAT10COMMONScreen;
