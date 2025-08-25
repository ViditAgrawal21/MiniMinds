import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const Sleep_CHATLINKTOUSScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t("sleepSection.chatLinkToUs.intro")}
      </Text>
      <Text style={styles.subtitle}>
        {t("sleepSection.chatLinkToUs.sections.books.title")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.books.items.item1.title")}</Text> - {t("sleepSection.chatLinkToUs.sections.books.items.item1.description")}
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.books.items.item2.title")}</Text> - {t("sleepSection.chatLinkToUs.sections.books.items.item2.description")}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.books.items.item3.title")}</Text> - {t("sleepSection.chatLinkToUs.sections.books.items.item3.description")}
</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        {t("sleepSection.chatLinkToUs.sections.moviesDocumentaries.title")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.moviesDocumentaries.items.item1.title")}</Text> - {t("sleepSection.chatLinkToUs.sections.moviesDocumentaries.items.item1.description")}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.moviesDocumentaries.items.item2.title")}</Text> - {t("sleepSection.chatLinkToUs.sections.moviesDocumentaries.items.item2.description")}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.moviesDocumentaries.items.item3.title")}</Text> - {t("sleepSection.chatLinkToUs.sections.moviesDocumentaries.items.item3.description")}
</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        {t("sleepSection.chatLinkToUs.sections.motivationalVideos.title")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.motivationalVideos.items.item1.title")}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.motivationalVideos.items.item1.subItems.subItem1.title")}</Text> - {t("sleepSection.chatLinkToUs.sections.motivationalVideos.items.item1.subItems.subItem1.description")}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.motivationalVideos.items.item1.subItems.subItem2.title")}</Text> - {t("sleepSection.chatLinkToUs.sections.motivationalVideos.items.item1.subItems.subItem2.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.motivationalVideos.items.item2.title")}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - {t("sleepSection.chatLinkToUs.sections.motivationalVideos.items.item2.description")}
      </Text>
      <Text style={styles.subtitle}>
        {t("sleepSection.chatLinkToUs.sections.musicTherapy.title")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.musicTherapy.items.item1.title")}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.musicTherapy.items.item1.subItems.subItem1.title")}</Text> {t("sleepSection.chatLinkToUs.sections.musicTherapy.items.item1.subItems.subItem1.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.musicTherapy.items.item2.title")}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - {t("sleepSection.chatLinkToUs.sections.musicTherapy.items.item2.description")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.musicTherapy.items.item3.title")}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - {t("sleepSection.chatLinkToUs.sections.musicTherapy.items.item3.description")}
      </Text>
      <Text style={styles.subtitle}>
        {t("sleepSection.chatLinkToUs.sections.additionalResources.title")}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t("sleepSection.chatLinkToUs.sections.additionalResources.items.item1.title")}</Text>: {t("sleepSection.chatLinkToUs.sections.additionalResources.items.item1.description")}
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t("sleepSection.chatLinkToUs.conclusion")}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#222',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: '#444',
  },
  listContainer: {
    marginBottom: 15,
    paddingLeft: 10,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletNumber: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  listText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});

export default Sleep_CHATLINKTOUSScreen;
