import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const AngerManagement_CHATLINKTOUSScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatLinkToUs.intro")}
      </Text>
      <Text style={styles.subtitle}>
        {t("angerManagementSection.chatLinkToUs.booksTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatLinkToUs.books.wisdomForCooling.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "angerManagementSection.chatLinkToUs.books.wisdomForCooling.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatLinkToUs.books.danceOfAnger.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "angerManagementSection.chatLinkToUs.books.danceOfAnger.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatLinkToUs.books.angerControlWorkbook.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "angerManagementSection.chatLinkToUs.books.angerControlWorkbook.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatLinkToUs.books.whenAngerHurts.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "angerManagementSection.chatLinkToUs.books.whenAngerHurts.description",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t("angerManagementSection.chatLinkToUs.moviesTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("angerManagementSection.chatLinkToUs.movies.insideOut.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatLinkToUs.movies.insideOut.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatLinkToUs.movies.angriestMan.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "angerManagementSection.chatLinkToUs.movies.angriestMan.description",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t("angerManagementSection.chatLinkToUs.motivationalVideosTitle")}
      </Text>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatLinkToUs.motivationalVideosIntro")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatLinkToUs.motivationalVideos.tedTalks.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "angerManagementSection.chatLinkToUs.motivationalVideos.tedTalks.example",
        )}
      </Text>
      <Text style={styles.paragraph}>
        {t(
          "angerManagementSection.chatLinkToUs.motivationalVideos.tedTalks.description",
        )}
      </Text>
      <Text style={styles.paragraph}></Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatLinkToUs.motivationalVideos.tonyRobbins.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "angerManagementSection.chatLinkToUs.motivationalVideos.tonyRobbins.description",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t("angerManagementSection.chatLinkToUs.musicTherapyTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatLinkToUs.musicTherapy.calmingMusic.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "angerManagementSection.chatLinkToUs.musicTherapy.calmingMusic.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatLinkToUs.musicTherapy.guidedMeditation.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "angerManagementSection.chatLinkToUs.musicTherapy.guidedMeditation.description",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t("angerManagementSection.chatLinkToUs.onlinePlatformsTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatLinkToUs.onlinePlatforms.headspace.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "angerManagementSection.chatLinkToUs.onlinePlatforms.headspace.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatLinkToUs.onlinePlatforms.calm.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "angerManagementSection.chatLinkToUs.onlinePlatforms.calm.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "angerManagementSection.chatLinkToUs.onlinePlatforms.betterHelp.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t(
          "angerManagementSection.chatLinkToUs.onlinePlatforms.betterHelp.description",
        )}
      </Text>
      <Text style={styles.paragraph}>
        {t("angerManagementSection.chatLinkToUs.conclusion")}
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

export default AngerManagement_CHATLINKTOUSScreen;
