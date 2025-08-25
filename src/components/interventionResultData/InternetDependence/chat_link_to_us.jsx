import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const InternetDependence_CHATLINKTOUSScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("internetDependenceSection.chatLinkToUs.intro")}
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>
          {t("internetDependenceSection.chatLinkToUs.booksTitle")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetDependenceSection.chatLinkToUs.books.digitalMinimalism.title",
              )}
            </Text>{" "}
            -{" "}
            {t(
              "internetDependenceSection.chatLinkToUs.books.digitalMinimalism.description",
            )}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetDependenceSection.chatLinkToUs.books.irresistible.title",
              )}
            </Text>{" "}
            -{" "}
            {t(
              "internetDependenceSection.chatLinkToUs.books.irresistible.description",
            )}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetDependenceSection.chatLinkToUs.books.theShallows.title",
              )}
            </Text>{" "}
            -{" "}
            {t(
              "internetDependenceSection.chatLinkToUs.books.theShallows.description",
            )}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t("internetDependenceSection.chatLinkToUs.books.reset.title")}
            </Text>{" "}
            -{" "}
            {t(
              "internetDependenceSection.chatLinkToUs.books.reset.description",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>
          {t("internetDependenceSection.chatLinkToUs.moviesTitle")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetDependenceSection.chatLinkToUs.movies.theSocialDilemma.title",
              )}
            </Text>{" "}
            -{" "}
            {t(
              "internetDependenceSection.chatLinkToUs.movies.theSocialDilemma.description",
            )}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetDependenceSection.chatLinkToUs.movies.loAndBehold.title",
              )}
            </Text>{" "}
            -{" "}
            {t(
              "internetDependenceSection.chatLinkToUs.movies.loAndBehold.description",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>
          {t("internetDependenceSection.chatLinkToUs.motivationalVideosTitle")}
        </Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetDependenceSection.chatLinkToUs.motivationalVideos.adamAlter.title",
              )}
            </Text>{" "}
            -{" "}
            {t(
              "internetDependenceSection.chatLinkToUs.motivationalVideos.adamAlter.description",
            )}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetDependenceSection.chatLinkToUs.motivationalVideos.tristanHarris.title",
              )}
            </Text>{" "}
            -{" "}
            {t(
              "internetDependenceSection.chatLinkToUs.motivationalVideos.tristanHarris.description",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>
          {t("internetDependenceSection.chatLinkToUs.musicTherapyTitle")}
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        {t("internetDependenceSection.chatLinkToUs.musicTherapyIntro")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetDependenceSection.chatLinkToUs.musicTherapy.ambient.title",
              )}
            </Text>
            :{" "}
            {t(
              "internetDependenceSection.chatLinkToUs.musicTherapy.ambient.description",
            )}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetDependenceSection.chatLinkToUs.musicTherapy.classical.title",
              )}
            </Text>
            :{" "}
            {t(
              "internetDependenceSection.chatLinkToUs.musicTherapy.classical.description",
            )}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t(
                "internetDependenceSection.chatLinkToUs.musicTherapy.guidedRelaxation.title",
              )}
            </Text>
            :{" "}
            {t(
              "internetDependenceSection.chatLinkToUs.musicTherapy.guidedRelaxation.description",
            )}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("internetDependenceSection.chatLinkToUs.conclusion")}
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

export default InternetDependence_CHATLINKTOUSScreen;
