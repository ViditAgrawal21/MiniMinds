import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { t } from '../../../app/i18n/i18n';

const suicidalbehavior_GIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        {t('suicidalbehavior.giveMe10.query')}
      </Text>
      <Text style={styles.subtitle}>
        Result:
      </Text>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.giveMe10.resultIntro')}
      </Text>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.giveMe10.scale.instructions')}
      </Text>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.giveMe10.scale.options.0')}
      </Text>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.giveMe10.scale.options.1')}
      </Text>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.giveMe10.scale.options.2')}
      </Text>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.giveMe10.scale.options.3')}
      </Text>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.giveMe10.scale.options.4')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>{t('suicidalbehavior.giveMe10.questions.0')}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>{t('suicidalbehavior.giveMe10.questions.1')}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>{t('suicidalbehavior.giveMe10.questions.2')}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>{t('suicidalbehavior.giveMe10.questions.3')}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>{t('suicidalbehavior.giveMe10.questions.4')}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>{t('suicidalbehavior.giveMe10.questions.5')}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>{t('suicidalbehavior.giveMe10.questions.6')}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>{t('suicidalbehavior.giveMe10.questions.7')}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>{t('suicidalbehavior.giveMe10.questions.8')}
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>{t('suicidalbehavior.giveMe10.questions.9')}
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.giveMe10.disclaimer')}
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

export default suicidalbehavior_GIVEME10Screen;
