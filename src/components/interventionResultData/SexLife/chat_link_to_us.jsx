import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n";

const SexLife_CHATLINKTOUSScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("sexLifeSection.chatLinkToUs.intro")}
      </Text>
      <Text style={styles.subtitle}>
        {t("sexLifeSection.chatLinkToUs.categories.books")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("sexLifeSection.chatLinkToUs.booksList.0.title")}
            </Text>
            : {t("sexLifeSection.chatLinkToUs.booksList.0.description")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("sexLifeSection.chatLinkToUs.booksList.1.title")}
            </Text>
            : {t("sexLifeSection.chatLinkToUs.booksList.1.description")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("sexLifeSection.chatLinkToUs.booksList.2.title")}
            </Text>
            : {t("sexLifeSection.chatLinkToUs.booksList.2.description")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("sexLifeSection.chatLinkToUs.booksList.3.title")}
            </Text>
            : {t("sexLifeSection.chatLinkToUs.booksList.3.description")}
          </Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        {t("sexLifeSection.chatLinkToUs.categories.movies")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("sexLifeSection.chatLinkToUs.moviesList.0.title")}
            </Text>
            : {t("sexLifeSection.chatLinkToUs.moviesList.0.description")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("sexLifeSection.chatLinkToUs.moviesList.1.title")}
            </Text>
            : {t("sexLifeSection.chatLinkToUs.moviesList.1.description")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("sexLifeSection.chatLinkToUs.moviesList.2.title")}
            </Text>
            : {t("sexLifeSection.chatLinkToUs.moviesList.2.description")}
          </Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        {t("sexLifeSection.chatLinkToUs.categories.motivational")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("sexLifeSection.chatLinkToUs.motivationalList.0.title")}
            </Text>
            : {t("sexLifeSection.chatLinkToUs.motivationalList.0.description")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("sexLifeSection.chatLinkToUs.motivationalList.1.title")}
            </Text>
            : {t("sexLifeSection.chatLinkToUs.motivationalList.1.description")}
          </Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        {t("sexLifeSection.chatLinkToUs.categories.music")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("sexLifeSection.chatLinkToUs.musicList.0.title")}
            </Text>
            : {t("sexLifeSection.chatLinkToUs.musicList.0.description")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("sexLifeSection.chatLinkToUs.musicList.1.title")}
            </Text>
            : {t("sexLifeSection.chatLinkToUs.musicList.1.description")}
          </Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        {t("sexLifeSection.chatLinkToUs.categories.additional")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("sexLifeSection.chatLinkToUs.additionalList.0.title")}
            </Text>
            : {t("sexLifeSection.chatLinkToUs.additionalList.0.description")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("sexLifeSection.chatLinkToUs.additionalList.1.title")}
            </Text>
            : {t("sexLifeSection.chatLinkToUs.additionalList.1.description")}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("sexLifeSection.chatLinkToUs.conclusion")}
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

export default SexLife_CHATLINKTOUSScreen;
