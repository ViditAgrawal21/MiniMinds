import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { t } from '../../../i18n/locales';

const suicidalbehavior_CHATGIVE10CBTScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.chatGive10CBT.intro')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.strategies.cognitiveRestructuring.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.cognitiveRestructuring.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.cognitiveRestructuring.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.example')}:</Text>  
      </Text>
      <Text style={styles.paragraph}>
             - {t('suicidalbehavior.chatGive10CBT.labels.thought')}: "{t('suicidalbehavior.chatGive10CBT.strategies.cognitiveRestructuring.thought')}"  
      </Text>
      <Text style={styles.paragraph}>
             - {t('suicidalbehavior.chatGive10CBT.labels.restructuredThought')}: "{t('suicidalbehavior.chatGive10CBT.strategies.cognitiveRestructuring.restructuredThought')}"
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.strategies.behavioralActivation.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.behavioralActivation.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.behavioralActivation.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.example')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.behavioralActivation.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.strategies.problemSolving.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.problemSolving.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.problemSolving.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.example')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.problemSolving.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.strategies.mindfulnessTraining.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.mindfulnessTraining.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.mindfulnessTraining.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.example')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.mindfulnessTraining.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.strategies.emotionRegulation.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.emotionRegulation.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.emotionRegulation.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.example')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.emotionRegulation.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.strategies.safetyPlanning.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.safetyPlanning.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.safetyPlanning.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.example')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.safetyPlanning.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.strategies.supportNetwork.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.supportNetwork.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.supportNetwork.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.example')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.supportNetwork.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.strategies.identifyingStrengths.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.identifyingStrengths.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.identifyingStrengths.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.example')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.identifyingStrengths.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.strategies.distressTolerance.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.distressTolerance.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.distressTolerance.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.example')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.distressTolerance.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.strategies.goalSetting.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.goalSetting.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
            - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.goalSetting.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
            - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10CBT.labels.example')}:</Text> {t('suicidalbehavior.chatGive10CBT.strategies.goalSetting.example')}
      </Text>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.chatGive10CBT.conclusion')}
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

export default suicidalbehavior_CHATGIVE10CBTScreen;
