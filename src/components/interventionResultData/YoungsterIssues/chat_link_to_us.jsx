import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const YoungsterIssues_CHATLINKTOUSScreen = () => {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("youngsterIssuesSection.chatLinkToUs.introduction")}
      </Text>
      <Text style={styles.subtitle}>
        {t("youngsterIssuesSection.chatLinkToUs.books")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chatLinkToUs.book1Title")}
            </Text>{" "}
            - {t("youngsterIssuesSection.chatLinkToUs.book1Desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chatLinkToUs.book2Title")}
            </Text>{" "}
            - {t("youngsterIssuesSection.chatLinkToUs.book2Desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chatLinkToUs.book3Title")}
            </Text>{" "}
            - {t("youngsterIssuesSection.chatLinkToUs.book3Desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chatLinkToUs.book4Title")}
            </Text>{" "}
            - {t("youngsterIssuesSection.chatLinkToUs.book4Desc")}
          </Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        {t("youngsterIssuesSection.chatLinkToUs.movies")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chatLinkToUs.movie1Title")}
            </Text>{" "}
            - {t("youngsterIssuesSection.chatLinkToUs.movie1Desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chatLinkToUs.movie2Title")}
            </Text>{" "}
            - {t("youngsterIssuesSection.chatLinkToUs.movie2Desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chatLinkToUs.movie3Title")}
            </Text>{" "}
            - {t("youngsterIssuesSection.chatLinkToUs.movie3Desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chatLinkToUs.movie4Title")}
            </Text>{" "}
            - {t("youngsterIssuesSection.chatLinkToUs.movie4Desc")}
          </Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        {t("youngsterIssuesSection.chatLinkToUs.motivationalVideos")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chatLinkToUs.tedTalks")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("youngsterIssuesSection.chatLinkToUs.tedTalk1Title")}
        </Text>{" "}
        - {t("youngsterIssuesSection.chatLinkToUs.tedTalk1Desc")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("youngsterIssuesSection.chatLinkToUs.tedTalk2Title")}
        </Text>{" "}
        - {t("youngsterIssuesSection.chatLinkToUs.tedTalk2Desc")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chatLinkToUs.youtubeChannels")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chatLinkToUs.youtubeChannel1Title")}
        </Text>{" "}
        - {t("youngsterIssuesSection.chatLinkToUs.youtubeChannel1Desc")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chatLinkToUs.youtubeChannel2Title")}
        </Text>{" "}
        - {t("youngsterIssuesSection.chatLinkToUs.youtubeChannel2Desc")}
      </Text>
      <Text style={styles.subtitle}>
        {t("youngsterIssuesSection.chatLinkToUs.musicTherapy")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chatLinkToUs.playlists")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chatLinkToUs.playlist1Title")}
        </Text>{" "}
        - {t("youngsterIssuesSection.chatLinkToUs.playlist1Desc")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chatLinkToUs.playlist2Title")}
        </Text>{" "}
        - {t("youngsterIssuesSection.chatLinkToUs.playlist2Desc")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("youngsterIssuesSection.chatLinkToUs.albums")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chatLinkToUs.album1Title")}
        </Text>{" "}
        - {t("youngsterIssuesSection.chatLinkToUs.album1Desc")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("youngsterIssuesSection.chatLinkToUs.album2Title")}
        </Text>{" "}
        - {t("youngsterIssuesSection.chatLinkToUs.album2Desc")}
      </Text>
      <Text style={styles.paragraph}>
        {t("youngsterIssuesSection.chatLinkToUs.conclusion")}
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

export default YoungsterIssues_CHATLINKTOUSScreen;
