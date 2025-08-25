import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CommonPsychologicalIssues_GIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Query: Give me 10 Questions based on the likert scale that we can use to score the symptoms of Common Psychological Issues
      </Text>
      <Text style={styles.subtitle}>
        Result:
      </Text>
      <Text style={styles.paragraph}>
        Certainly! The Likert scale is a popular method for assessing attitudes, opinions, or behaviors, typically using a 5-point or 7-point scale ranging from strong disagreement to strong agreement. Here are 10 questions that can be used to score symptoms of common psychological issues:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Anxiety:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I often feel nervous, anxious, or on edge.
      </Text>
      <Text style={styles.paragraph}>
             - Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Depression:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I frequently feel down, depressed, or hopeless.
      </Text>
      <Text style={styles.paragraph}>
             - Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Stress:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I find it difficult to relax due to stress.
      </Text>
      <Text style={styles.paragraph}>
             - Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Sleep Disturbance:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I have trouble falling or staying asleep.
      </Text>
      <Text style={styles.paragraph}>
             - Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Irritability:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I often feel irritable or easily annoyed.
      </Text>
      <Text style={styles.paragraph}>
             - Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Concentration Issues:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I have difficulty concentrating on tasks.
      </Text>
      <Text style={styles.paragraph}>
             - Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Social Withdrawal:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I prefer to avoid social interactions.
      </Text>
      <Text style={styles.paragraph}>
             - Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Fatigue:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I often feel tired or have little energy.
      </Text>
      <Text style={styles.paragraph}>
             - Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Self-Esteem:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I feel confident in myself and my abilities.
      </Text>
      <Text style={styles.paragraph}>
             - Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Appetite Changes:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            - I have experienced significant changes in my appetite.
      </Text>
      <Text style={styles.paragraph}>
              - Strongly Disagree | Disagree | Neutral | Agree | Strongly Agree
      </Text>
      <Text style={styles.paragraph}>
        These questions can be adapted to fit a 7-point scale if more granularity is needed, and they can be used as part of a broader assessment to help identify and quantify psychological symptoms.
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

export default CommonPsychologicalIssues_GIVEME10Screen;
