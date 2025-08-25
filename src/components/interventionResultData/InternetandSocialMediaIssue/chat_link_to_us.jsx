import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const InternetandSocialMediaIssue_CHATLINKTOUSScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("internetAndSocialMediaIssueSection.chatLinkToUs.intro")}
      </Text>
      <Text style={styles.subtitle}>
        {t("internetAndSocialMediaIssueSection.chatLinkToUs.categories.books")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("internetAndSocialMediaIssueSection.chatLinkToUs.book1.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("internetAndSocialMediaIssueSection.chatLinkToUs.book1.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("internetAndSocialMediaIssueSection.chatLinkToUs.book2.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("internetAndSocialMediaIssueSection.chatLinkToUs.book2.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("internetAndSocialMediaIssueSection.chatLinkToUs.book3.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("internetAndSocialMediaIssueSection.chatLinkToUs.book3.description")}
      </Text>
      <Text style={styles.subtitle}>
        {t(
          "internetAndSocialMediaIssueSection.chatLinkToUs.categories.moviesAndDocumentaries",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetAndSocialMediaIssueSection.chatLinkToUs.movie1.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "internetAndSocialMediaIssueSection.chatLinkToUs.movie1.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetAndSocialMediaIssueSection.chatLinkToUs.movie2.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "internetAndSocialMediaIssueSection.chatLinkToUs.movie2.description",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t(
          "internetAndSocialMediaIssueSection.chatLinkToUs.categories.motivationalVideos",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetAndSocialMediaIssueSection.chatLinkToUs.video1.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "internetAndSocialMediaIssueSection.chatLinkToUs.video1.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetAndSocialMediaIssueSection.chatLinkToUs.video2.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "internetAndSocialMediaIssueSection.chatLinkToUs.video2.description",
        )}
      </Text>
      <Text style={styles.subtitle}>
        {t(
          "internetAndSocialMediaIssueSection.chatLinkToUs.categories.musicTherapy",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetAndSocialMediaIssueSection.chatLinkToUs.music1.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "internetAndSocialMediaIssueSection.chatLinkToUs.music1.description",
        )}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetAndSocialMediaIssueSection.chatLinkToUs.music2.title",
              )}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t(
          "internetAndSocialMediaIssueSection.chatLinkToUs.music2.description",
        )}
      </Text>
      <Text style={styles.paragraph}>
        {t("internetAndSocialMediaIssueSection.chatLinkToUs.conclusion")}
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

export default InternetandSocialMediaIssue_CHATLINKTOUSScreen;
