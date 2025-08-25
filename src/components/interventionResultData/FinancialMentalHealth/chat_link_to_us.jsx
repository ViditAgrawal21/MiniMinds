import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const FinancialMentalHealth_CHATLINKTOUSScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.intro")}
      </Text>
      <Text style={styles.subtitle}>
        {t("financialMentalHealthSection.chatLinkToUs.booksTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.chatLinkToUs.book1Title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.book1Desc")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.chatLinkToUs.book2Title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.book2Desc")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.chatLinkToUs.book3Title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.book3Desc")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.chatLinkToUs.book4Title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.book4Desc")}
      </Text>
      <Text style={styles.subtitle}>
        {t("financialMentalHealthSection.chatLinkToUs.moviesTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.chatLinkToUs.movie1Title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.movie1Desc")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.chatLinkToUs.movie2Title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.movie2Desc")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.chatLinkToUs.movie3Title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.movie3Desc")}
      </Text>
      <Text style={styles.subtitle}>
        {t("financialMentalHealthSection.chatLinkToUs.motivationalTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.chatLinkToUs.video1Title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.video1Desc")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.chatLinkToUs.video2Title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.video2Desc")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.chatLinkToUs.video3Title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.video3Desc")}
      </Text>
      <Text style={styles.subtitle}>
        {t("financialMentalHealthSection.chatLinkToUs.musicTitle")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.chatLinkToUs.music1Title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.music1Desc")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.chatLinkToUs.music2Title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.music2Desc")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("financialMentalHealthSection.chatLinkToUs.music3Title")}
            </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.music3Desc")}
      </Text>
      <Text style={styles.paragraph}>
        {t("financialMentalHealthSection.chatLinkToUs.conclusion")}
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

export default FinancialMentalHealth_CHATLINKTOUSScreen;
