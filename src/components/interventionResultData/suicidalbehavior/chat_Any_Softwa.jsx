import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { t } from '../../../app/i18n/i18n';

const suicidalbehavior_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.chatAnySoftwa.introduction')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatAnySoftwa.tools.0.title')}</Text>: {t('suicidalbehavior.chatAnySoftwa.tools.0.description')}
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatAnySoftwa.tools.0.features.0.title')}</Text>: {t('suicidalbehavior.chatAnySoftwa.tools.0.features.0.description')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatAnySoftwa.tools.0.features.1.title')}</Text>: {t('suicidalbehavior.chatAnySoftwa.tools.0.features.1.description')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatAnySoftwa.tools.0.features.2.title')}</Text>: {t('suicidalbehavior.chatAnySoftwa.tools.0.features.2.description')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatAnySoftwa.tools.1.title')}</Text>: {t('suicidalbehavior.chatAnySoftwa.tools.1.description')}
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatAnySoftwa.tools.1.features.0.title')}</Text>: {t('suicidalbehavior.chatAnySoftwa.tools.1.features.0.description')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatAnySoftwa.tools.1.features.1.title')}</Text>: {t('suicidalbehavior.chatAnySoftwa.tools.1.features.1.description')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatAnySoftwa.tools.2.title')}</Text>: {t('suicidalbehavior.chatAnySoftwa.tools.2.description')}
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatAnySoftwa.tools.2.features.0.title')}</Text>: {t('suicidalbehavior.chatAnySoftwa.tools.2.features.0.description')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatAnySoftwa.tools.3.title')}</Text>: {t('suicidalbehavior.chatAnySoftwa.tools.3.description')}
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatAnySoftwa.tools.3.features.0.title')}</Text>: {t('suicidalbehavior.chatAnySoftwa.tools.3.features.0.description')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatAnySoftwa.tools.4.title')}</Text>: {t('suicidalbehavior.chatAnySoftwa.tools.4.description')}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatAnySoftwa.tools.5.title')}</Text>: {t('suicidalbehavior.chatAnySoftwa.tools.5.description')}
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.chatAnySoftwa.conclusion')}
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

export default suicidalbehavior_CHATANYSOFTWAScreen;
