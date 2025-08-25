import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const SocialMentalHealth_CHATLINKTOUSScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("socialMentalHealthSection.chatLinkToUs.intro")}
      </Text>
      <Text style={styles.subtitle}>
        {t("socialMentalHealthSection.chatLinkToUs.books.title")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("socialMentalHealthSection.chatLinkToUs.books.book1.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("socialMentalHealthSection.chatLinkToUs.books.book1.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("socialMentalHealthSection.chatLinkToUs.books.book2.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("socialMentalHealthSection.chatLinkToUs.books.book2.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("socialMentalHealthSection.chatLinkToUs.books.book3.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("socialMentalHealthSection.chatLinkToUs.books.book3.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("socialMentalHealthSection.chatLinkToUs.books.book4.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t("socialMentalHealthSection.chatLinkToUs.books.book4.description")}
      </Text>
      <Text style={styles.subtitle}>
        {t("socialMentalHealthSection.chatLinkToUs.movies.title")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("socialMentalHealthSection.chatLinkToUs.movies.movie1.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("socialMentalHealthSection.chatLinkToUs.movies.movie1.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("socialMentalHealthSection.chatLinkToUs.movies.movie2.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("socialMentalHealthSection.chatLinkToUs.movies.movie2.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("socialMentalHealthSection.chatLinkToUs.movies.movie3.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("socialMentalHealthSection.chatLinkToUs.movies.movie3.description")}
      </Text>
      <Text style={styles.subtitle}>
        {t("socialMentalHealthSection.chatLinkToUs.videos.title")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("socialMentalHealthSection.chatLinkToUs.videos.video1.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("socialMentalHealthSection.chatLinkToUs.videos.video1.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("socialMentalHealthSection.chatLinkToUs.videos.video2.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("socialMentalHealthSection.chatLinkToUs.videos.video2.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("socialMentalHealthSection.chatLinkToUs.videos.video3.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("socialMentalHealthSection.chatLinkToUs.videos.video3.description")}
      </Text>
      <Text style={styles.subtitle}>
        {t("socialMentalHealthSection.chatLinkToUs.music.title")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("socialMentalHealthSection.chatLinkToUs.music.option1.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        <Text style={styles.bold}>
          {t(
            "socialMentalHealthSection.chatLinkToUs.music.option1.description",
          )}
        </Text>
      </Text>
      <Text style={styles.paragraph}></Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("socialMentalHealthSection.chatLinkToUs.music.option2.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("socialMentalHealthSection.chatLinkToUs.music.option2.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("socialMentalHealthSection.chatLinkToUs.music.option3.title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        -{" "}
        {t("socialMentalHealthSection.chatLinkToUs.music.option3.description")}
      </Text>
      <Text style={styles.paragraph}>
        {t("socialMentalHealthSection.chatLinkToUs.conclusion")}
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

export default SocialMentalHealth_CHATLINKTOUSScreen;
