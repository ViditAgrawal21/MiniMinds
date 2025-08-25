import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const CommonPsychologicalIssues_CHATLINKTOUSScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.chatLinkToUs.introduction")}
      </Text>
      <Text style={styles.subtitle}>
        {t("commonPsychologicalIssuesSection.chatLinkToUs.booksTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.chatLinkToUs.book1Title")}
            </Text>
            : {t("commonPsychologicalIssuesSection.chatLinkToUs.book1Desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.chatLinkToUs.book2Title")}
            </Text>
            : {t("commonPsychologicalIssuesSection.chatLinkToUs.book2Desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.chatLinkToUs.book3Title")}
            </Text>
            : {t("commonPsychologicalIssuesSection.chatLinkToUs.book3Desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.chatLinkToUs.book4Title")}
            </Text>
            : {t("commonPsychologicalIssuesSection.chatLinkToUs.book4Desc")}
          </Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        {t("commonPsychologicalIssuesSection.chatLinkToUs.moviesTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.chatLinkToUs.movie1Title")}
            </Text>
            : {t("commonPsychologicalIssuesSection.chatLinkToUs.movie1Desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.chatLinkToUs.movie2Title")}
            </Text>
            : {t("commonPsychologicalIssuesSection.chatLinkToUs.movie2Desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.chatLinkToUs.movie3Title")}
            </Text>
            : {t("commonPsychologicalIssuesSection.chatLinkToUs.movie3Desc")}
          </Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        {t(
          "commonPsychologicalIssuesSection.chatLinkToUs.motivationalVideosTitle",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("commonPsychologicalIssuesSection.chatLinkToUs.tedTalksTitle")}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("commonPsychologicalIssuesSection.chatLinkToUs.tedTalk1")}
        </Text>
        : {t("commonPsychologicalIssuesSection.chatLinkToUs.tedTalk1Desc")}
      </Text>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.italic}>
          {t("commonPsychologicalIssuesSection.chatLinkToUs.tedTalk2")}
        </Text>
        : {t("commonPsychologicalIssuesSection.chatLinkToUs.tedTalk2Desc")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "commonPsychologicalIssuesSection.chatLinkToUs.youtubeChannelsTitle",
              )}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t("commonPsychologicalIssuesSection.chatLinkToUs.youtubeChannel1")}
        </Text>
        :{" "}
        {t("commonPsychologicalIssuesSection.chatLinkToUs.youtubeChannel1Desc")}
      </Text>
      <Text style={styles.subtitle}>
        {t("commonPsychologicalIssuesSection.chatLinkToUs.musicTherapyTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "commonPsychologicalIssuesSection.chatLinkToUs.musicTherapy1Title",
              )}
            </Text>
            :{" "}
            {t(
              "commonPsychologicalIssuesSection.chatLinkToUs.musicTherapy1Desc",
            )}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "commonPsychologicalIssuesSection.chatLinkToUs.musicTherapy2Title",
              )}
            </Text>
            :{" "}
            {t(
              "commonPsychologicalIssuesSection.chatLinkToUs.musicTherapy2Desc",
            )}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "commonPsychologicalIssuesSection.chatLinkToUs.musicTherapy3Title",
              )}
            </Text>
            :{" "}
            {t(
              "commonPsychologicalIssuesSection.chatLinkToUs.musicTherapy3Desc",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("commonPsychologicalIssuesSection.chatLinkToUs.conclusion")}
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

export default CommonPsychologicalIssues_CHATLINKTOUSScreen;
