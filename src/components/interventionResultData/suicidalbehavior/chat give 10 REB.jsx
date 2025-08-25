import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { t } from '../../../app/i18n/i18n';

const suicidalbehavior_CHATGIVE10REBScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        {t('suicidalbehavior.chatGive10REB.intro')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.strategies.identifyIrrationalBeliefs.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.identifyIrrationalBeliefs.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.identifyIrrationalBeliefs.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.example')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.identifyIrrationalBeliefs.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.strategies.unconditionalSelfAcceptance.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.unconditionalSelfAcceptance.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.unconditionalSelfAcceptance.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.example')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.unconditionalSelfAcceptance.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.strategies.problemSolving.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.problemSolving.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.problemSolving.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.example')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.problemSolving.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.strategies.emotionalRegulation.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.emotionalRegulation.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.emotionalRegulation.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.example')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.emotionalRegulation.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.strategies.supportNetwork.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.supportNetwork.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.supportNetwork.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.example')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.supportNetwork.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.strategies.realisticExpectations.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.realisticExpectations.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.realisticExpectations.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.example')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.realisticExpectations.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.strategies.acceptanceOfUncertainty.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.acceptanceOfUncertainty.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.acceptanceOfUncertainty.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.example')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.acceptanceOfUncertainty.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.strategies.reframeSetbacks.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.reframeSetbacks.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.reframeSetbacks.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.example')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.reframeSetbacks.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.strategies.rationalSelfTalk.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.rationalSelfTalk.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.rationalSelfTalk.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.example')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.rationalSelfTalk.example')}
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.strategies.hopefulVision.title')}</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whyHelps')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.hopefulVision.whyHelps')}
      </Text>
      <Text style={styles.paragraph}>
            - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.whatToDo')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.hopefulVision.whatToDo')}
      </Text>
      <Text style={styles.paragraph}>
            - <Text style={styles.bold}>{t('suicidalbehavior.chatGive10REB.labels.example')}:</Text> {t('suicidalbehavior.chatGive10REB.strategies.hopefulVision.example')}
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Important Note:</Text> {t('suicidalbehavior.chatGive10REB.importantNote')}
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

export default suicidalbehavior_CHATGIVE10REBScreen;
