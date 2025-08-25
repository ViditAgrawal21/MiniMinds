import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { t } from '../../../app/i18n/i18n';

const Stress_CHAT10COMMONScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t('stressChat10Common.intro')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('stressChat10Common.suggestions.exerciseRegularly.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.howItWorks')}</Text>: {t('stressChat10Common.suggestions.exerciseRegularly.howItWorks')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.example')}</Text>: {t('stressChat10Common.suggestions.exerciseRegularly.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('stressChat10Common.suggestions.practiceMindfulness.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.howItWorks')}</Text>: {t('stressChat10Common.suggestions.practiceMindfulness.howItWorks')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.example')}</Text>: {t('stressChat10Common.suggestions.practiceMindfulness.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('stressChat10Common.suggestions.healthySleep.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.howItWorks')}</Text>: {t('stressChat10Common.suggestions.healthySleep.howItWorks')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.example')}</Text>: {t('stressChat10Common.suggestions.healthySleep.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('stressChat10Common.suggestions.balancedDiet.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.howItWorks')}</Text>: {t('stressChat10Common.suggestions.balancedDiet.howItWorks')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.example')}</Text>: {t('stressChat10Common.suggestions.balancedDiet.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('stressChat10Common.suggestions.socialSupport.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.howItWorks')}</Text>: {t('stressChat10Common.suggestions.socialSupport.howItWorks')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.example')}</Text>: {t('stressChat10Common.suggestions.socialSupport.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('stressChat10Common.suggestions.timeManagement.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.howItWorks')}</Text>: {t('stressChat10Common.suggestions.timeManagement.howItWorks')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.example')}</Text>: {t('stressChat10Common.suggestions.timeManagement.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('stressChat10Common.suggestions.hobbies.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.howItWorks')}</Text>: {t('stressChat10Common.suggestions.hobbies.howItWorks')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.example')}</Text>: {t('stressChat10Common.suggestions.hobbies.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('stressChat10Common.suggestions.deepBreathing.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.howItWorks')}</Text>: {t('stressChat10Common.suggestions.deepBreathing.howItWorks')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.example')}</Text>: {t('stressChat10Common.suggestions.deepBreathing.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('stressChat10Common.suggestions.limitTriggers.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.howItWorks')}</Text>: {t('stressChat10Common.suggestions.limitTriggers.howItWorks')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.example')}</Text>: {t('stressChat10Common.suggestions.limitTriggers.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('stressChat10Common.suggestions.professionalHelp.title')}</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.howItWorks')}</Text>: {t('stressChat10Common.suggestions.professionalHelp.howItWorks')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('stressChat10Common.labels.example')}</Text>: {t('stressChat10Common.suggestions.professionalHelp.example')}
      </Text>
      <Text style={styles.paragraph}>
        {t('stressChat10Common.conclusion')}
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

export default Stress_CHAT10COMMONScreen;
