import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the t function

const Addictions_ChatLinkToUsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("addictionsSection.chatLinkToUs.intro")}
      </Text>
      <Text style={styles.subtitle}>
        {t("addictionsSection.chatLinkToUs.booksTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chatLinkToUs.books.0.title")}
            </Text>{" "}
            {t("addictionsSection.chatLinkToUs.books.0.desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chatLinkToUs.books.1.title")}
            </Text>{" "}
            {t("addictionsSection.chatLinkToUs.books.1.desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chatLinkToUs.books.2.title")}
            </Text>{" "}
            {t("addictionsSection.chatLinkToUs.books.2.desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chatLinkToUs.books.3.title")}
            </Text>{" "}
            {t("addictionsSection.chatLinkToUs.books.3.desc")}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>5.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("addictionsSection.chatLinkToUs.books.4.title")}
            </Text>{" "}
            {t("addictionsSection.chatLinkToUs.books.4.desc")}
          </Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        {t("addictionsSection.chatLinkToUs.moviesTitle")}
      </Text>
      <View style={styles.listContainer}>
        {[0, 1, 2, 3, 4].map((i) => (
          <View style={styles.listItem} key={i}>
            <Text style={styles.bulletNumber}>{i + 1}.</Text>
            <Text style={styles.listText}>
              <Text style={styles.bold}>
                {t(`addictionsSection.chatLinkToUs.movies.${i}.title`)}
              </Text>{" "}
              {t(`addictionsSection.chatLinkToUs.movies.${i}.desc`)}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.subtitle}>
        {t("addictionsSection.chatLinkToUs.motivationalTitle")}
      </Text>
      <View style={styles.listContainer}>
        {[0, 1, 2].map((i) => (
          <View style={styles.listItem} key={i}>
            <Text style={styles.bulletNumber}>{i + 1}.</Text>
            <Text style={styles.listText}>
              <Text style={styles.bold}>
                {t(`addictionsSection.chatLinkToUs.motivational.${i}.title`)}
              </Text>{" "}
              {t(`addictionsSection.chatLinkToUs.motivational.${i}.desc`)}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.subtitle}>
        {t("addictionsSection.chatLinkToUs.musicTitle")}
      </Text>
      <View style={styles.listContainer}>
        {[0, 1, 2].map((i) => (
          <View style={styles.listItem} key={i}>
            <Text style={styles.bulletNumber}>{i + 1}.</Text>
            <Text style={styles.listText}>
              <Text style={styles.bold}>
                {t(`addictionsSection.chatLinkToUs.music.${i}.title`)}
              </Text>{" "}
              {t(`addictionsSection.chatLinkToUs.music.${i}.desc`)}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.subtitle}>
        {t("addictionsSection.chatLinkToUs.resourcesTitle")}
      </Text>
      <View style={styles.listContainer}>
        {[0, 1].map((i) => (
          <View style={styles.listItem} key={i}>
            <Text style={styles.bulletNumber}>{i + 1}.</Text>
            <Text style={styles.listText}>
              <Text style={styles.bold}>
                {t(`addictionsSection.chatLinkToUs.resources.${i}.title`)}
              </Text>{" "}
              {t(`addictionsSection.chatLinkToUs.resources.${i}.desc`)}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.paragraph}>
        {t("addictionsSection.chatLinkToUs.conclusion")}
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

export default Addictions_ChatLinkToUsScreen;
