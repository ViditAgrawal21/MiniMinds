import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { t } from '../../../app/i18n/i18n';

const suicidalbehavior_CHAT10COMMONScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.chat10Common.intro')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chat10Common.strategies.reachOut.title')}:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> {t('suicidalbehavior.chat10Common.strategies.reachOut.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chat10Common.strategies.safetyPlan.title')}:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> {t('suicidalbehavior.chat10Common.strategies.safetyPlan.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chat10Common.strategies.supportiveConnections.title')}:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> {t('suicidalbehavior.chat10Common.strategies.supportiveConnections.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chat10Common.strategies.avoidSubstances.title')}:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> {t('suicidalbehavior.chat10Common.strategies.avoidSubstances.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chat10Common.strategies.stressReduction.title')}:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> {t('suicidalbehavior.chat10Common.strategies.stressReduction.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chat10Common.strategies.physicalActivity.title')}:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> {t('suicidalbehavior.chat10Common.strategies.physicalActivity.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chat10Common.strategies.underlyingIssues.title')}:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> {t('suicidalbehavior.chat10Common.strategies.underlyingIssues.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chat10Common.strategies.routine.title')}:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> {t('suicidalbehavior.chat10Common.strategies.routine.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chat10Common.strategies.positiveRelationships.title')}:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> {t('suicidalbehavior.chat10Common.strategies.positiveRelationships.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chat10Common.strategies.limitNegativeInfluences.title')}:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            - <Text style={styles.bold}>Example:</Text> {t('suicidalbehavior.chat10Common.strategies.limitNegativeInfluences.example')}
      </Text>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.chat10Common.conclusion')}
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

export default suicidalbehavior_CHAT10COMMONScreen;
