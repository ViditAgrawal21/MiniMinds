import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const ProfessionalMentalHealth_CHATLINKTOUSScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("professionalMentalHealthSection.chatLinkToUs.intro")}
      </Text>
      <Text style={styles.subtitle}>
        {t("professionalMentalHealthSection.chatLinkToUs.sections.books")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.books.happinessTrap.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.books.happinessTrap.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.books.emotionalIntelligence.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.books.emotionalIntelligence.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.books.dareToLead.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.books.dareToLead.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.books.mindset.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.books.mindset.description",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.sections.moviesAndDocumentaries",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.movies.insideOut.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.movies.insideOut.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.movies.pursuitOfHappyness.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.movies.pursuitOfHappyness.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.movies.heal.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.movies.heal.description",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.sections.motivationalVideos",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.motivationalVideos.tedTalks.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.motivationalVideos.tedTalks.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.motivationalVideos.youtubeChannels.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.motivationalVideos.youtubeChannels.description",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.sections.musicTherapy",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.musicTherapy.weightless.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.musicTherapy.weightless.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.musicTherapy.relaxingPiano.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.musicTherapy.relaxingPiano.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.musicTherapy.apps.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.musicTherapy.apps.description",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t(
          "professionalMentalHealthSection.chatLinkToUs.sections.additionalResources",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.additionalResources.mindfulnessApps",
              )}
            </Text>
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "professionalMentalHealthSection.chatLinkToUs.additionalResources.onlineCourses",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("professionalMentalHealthSection.chatLinkToUs.conclusion")}
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

export default ProfessionalMentalHealth_CHATLINKTOUSScreen;
