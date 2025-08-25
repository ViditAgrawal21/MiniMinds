import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { t } from '../../../app/i18n/i18n';

const suicidalbehavior_CHATYOGAANDMScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.chatYogaAndM.introduction')}
      </Text>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.chatYogaAndM.context')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatYogaAndM.steps.0.title')}</Text>: {t('suicidalbehavior.chatYogaAndM.steps.0.content')}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatYogaAndM.steps.1.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatYogaAndM.breathingExercise.title')}</Text>: {t('suicidalbehavior.chatYogaAndM.breathingExercise.description')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatYogaAndM.steps.2.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatYogaAndM.yogaPoses.0.title')}</Text>: {t('suicidalbehavior.chatYogaAndM.yogaPoses.0.description')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatYogaAndM.yogaPoses.1.title')}</Text>: {t('suicidalbehavior.chatYogaAndM.yogaPoses.1.description')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatYogaAndM.yogaPoses.2.title')}</Text>: {t('suicidalbehavior.chatYogaAndM.yogaPoses.2.description')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatYogaAndM.steps.3.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - {t('suicidalbehavior.chatYogaAndM.guidedMeditation.0')}
      </Text>
      <Text style={styles.paragraph}>
           - {t('suicidalbehavior.chatYogaAndM.guidedMeditation.1')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatYogaAndM.steps.4.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - {t('suicidalbehavior.chatYogaAndM.mindfulnessPractice')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatYogaAndM.steps.5.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - {t('suicidalbehavior.chatYogaAndM.gratitudeJournaling')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatYogaAndM.steps.6.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - {t('suicidalbehavior.chatYogaAndM.safeSpace')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatYogaAndM.steps.7.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - {t('suicidalbehavior.chatYogaAndM.communitySupport')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatYogaAndM.steps.8.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - {t('suicidalbehavior.chatYogaAndM.regularPractice')}
      </Text>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.chatYogaAndM.conclusion')}
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

export default suicidalbehavior_CHATYOGAANDMScreen;
