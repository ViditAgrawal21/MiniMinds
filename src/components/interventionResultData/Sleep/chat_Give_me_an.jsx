import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { t } from "@/i18n/locales/i18n"; // Import the translation function

const Sleep_CHATGIVEMEANScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        {t("sleepSection.chatGiveMeAn.query")}
      </Text>
      <Text style={styles.subtitle}>
        {t("sleepSection.chatGiveMeAn.result")}
      </Text>
      <Text style={styles.paragraph}>
        {t("sleepSection.chatGiveMeAn.mildForm")}
      </Text>
      <Text style={styles.paragraph}>
        {t("sleepSection.chatGiveMeAn.moderateForm")}
      </Text>
      <Text style={styles.paragraph}>
        {t("sleepSection.chatGiveMeAn.severeForm")}
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

export default Sleep_CHATGIVEMEANScreen;
