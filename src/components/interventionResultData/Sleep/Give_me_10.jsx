import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Sleep_GIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Query: Give me 10 Questions based on the likert scale that we can use to score the symptoms of Sleep
      </Text>
      <Text style={styles.subtitle}>
        Result:
      </Text>
      <Text style={styles.paragraph}>
        Certainly! The Likert scale is a popular method for measuring attitudes or responses, typically ranging from "strongly disagree" to "strongly agree." Here are ten questions that can be used to assess sleep-related symptoms using a Likert scale:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Sleep Quality</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I feel that I get a restful night's sleep."
      </Text>
      <Text style={styles.paragraph}>
           - Scale: Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Sleep Duration</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I am satisfied with the amount of sleep I get each night."
      </Text>
      <Text style={styles.paragraph}>
           - Scale: Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Sleep Onset</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I fall asleep within 30 minutes of going to bed."
      </Text>
      <Text style={styles.paragraph}>
           - Scale: Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Sleep Maintenance</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I rarely wake up during the night."
      </Text>
      <Text style={styles.paragraph}>
           - Scale: Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Daytime Sleepiness</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I feel alert and awake during the day."
      </Text>
      <Text style={styles.paragraph}>
           - Scale: Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Sleep Disturbances</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I am frequently disturbed by noise or light while trying to sleep."
      </Text>
      <Text style={styles.paragraph}>
           - Scale: Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Use of Sleep Aids</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I rely on medication or other aids to help me sleep."
      </Text>
      <Text style={styles.paragraph}>
           - Scale: Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Sleep Environment</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "My sleep environment is comfortable and conducive to sleep."
      </Text>
      <Text style={styles.paragraph}>
           - Scale: Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Sleep Satisfaction</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "Overall, I am satisfied with my sleep patterns."
      </Text>
      <Text style={styles.paragraph}>
           - Scale: Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Impact on Daily Functioning</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            - "My sleep issues negatively affect my daily activities and performance."
      </Text>
      <Text style={styles.paragraph}>
            - Scale: Strongly Disagree, Disagree, Neutral, Agree, Strongly Agree
      </Text>
      <Text style={styles.paragraph}>
        These questions can help in assessing various aspects of sleep and identifying areas that may need improvement or further investigation.
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

export default Sleep_GIVEME10Screen;
