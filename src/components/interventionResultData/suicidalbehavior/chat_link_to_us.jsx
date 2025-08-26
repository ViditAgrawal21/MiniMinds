import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { t } from '../../../i18n/locales';

const suicidalbehavior_CHATLINKTOUSScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.chatLinkToUs.intro')}
      </Text>
      <Text style={styles.subtitle}>{t('suicidalbehavior.chatLinkToUs.sections.books.title')}</Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t('suicidalbehavior.chatLinkToUs.sections.books.items.0.title')}
            </Text>
            : {t('suicidalbehavior.chatLinkToUs.sections.books.items.0.description')}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t('suicidalbehavior.chatLinkToUs.sections.books.items.1.title')}
            </Text>
            : {t('suicidalbehavior.chatLinkToUs.sections.books.items.1.description')}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t('suicidalbehavior.chatLinkToUs.sections.books.items.2.title')}
            </Text>
            : {t('suicidalbehavior.chatLinkToUs.sections.books.items.2.description')}
          </Text>
        </View>
      </View>
      <Text style={styles.subtitle}>{t('suicidalbehavior.chatLinkToUs.sections.movies.title')}</Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>{t('suicidalbehavior.chatLinkToUs.sections.movies.items.0.title')}</Text>: {t('suicidalbehavior.chatLinkToUs.sections.movies.items.0.description')}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>{t('suicidalbehavior.chatLinkToUs.sections.movies.items.1.title')}</Text>: {t('suicidalbehavior.chatLinkToUs.sections.movies.items.1.description')}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>{t('suicidalbehavior.chatLinkToUs.sections.movies.items.2.title')}</Text>: {t('suicidalbehavior.chatLinkToUs.sections.movies.items.2.description')}
          </Text>
        </View>
      </View>
      <Text style={styles.subtitle}>{t('suicidalbehavior.chatLinkToUs.sections.motivationalVideos.title')}</Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>{t('suicidalbehavior.chatLinkToUs.sections.motivationalVideos.categories.tedTalks.title')}</Text>:
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t('suicidalbehavior.chatLinkToUs.sections.motivationalVideos.categories.tedTalks.examples.0')}
      </Text>
      <Text style={styles.paragraph}>
        - {t('suicidalbehavior.chatLinkToUs.sections.motivationalVideos.categories.tedTalks.examples.1')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>{t('suicidalbehavior.chatLinkToUs.sections.motivationalVideos.categories.youtubeChannels.title')}</Text>:
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t('suicidalbehavior.chatLinkToUs.sections.motivationalVideos.categories.youtubeChannels.examples.0')}
      </Text>
      <Text style={styles.paragraph}>
        - {t('suicidalbehavior.chatLinkToUs.sections.motivationalVideos.categories.youtubeChannels.examples.1')}
      </Text>
      <Text style={styles.subtitle}>{t('suicidalbehavior.chatLinkToUs.sections.musicTherapy.title')}</Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>
              {t('suicidalbehavior.chatLinkToUs.sections.musicTherapy.categories.playlists.title')}
            </Text>
            :
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t('suicidalbehavior.chatLinkToUs.sections.musicTherapy.categories.playlists.description')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>{t('suicidalbehavior.chatLinkToUs.sections.musicTherapy.categories.artists.title')}</Text>:
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>{t('suicidalbehavior.chatLinkToUs.sections.musicTherapy.categories.artists.examples.0.name')}</Text>: {t('suicidalbehavior.chatLinkToUs.sections.musicTherapy.categories.artists.examples.0.description')}
      </Text>
      <Text style={styles.paragraph}>
        - <Text style={styles.bold}>{t('suicidalbehavior.chatLinkToUs.sections.musicTherapy.categories.artists.examples.1.name')}</Text>: {t('suicidalbehavior.chatLinkToUs.sections.musicTherapy.categories.artists.examples.1.description')}
      </Text>
      <Text style={styles.subtitle}>{t('suicidalbehavior.chatLinkToUs.sections.immediateHelp.title')}</Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            {t('suicidalbehavior.chatLinkToUs.sections.immediateHelp.recommendations.0')}
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>
            {t('suicidalbehavior.chatLinkToUs.sections.immediateHelp.recommendations.1')}
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - {t('suicidalbehavior.chatLinkToUs.sections.immediateHelp.helplines.0')}
      </Text>
      <Text style={styles.paragraph}>
        - {t('suicidalbehavior.chatLinkToUs.sections.immediateHelp.helplines.1')}
      </Text>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.chatLinkToUs.conclusion')}
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

export default suicidalbehavior_CHATLINKTOUSScreen;
