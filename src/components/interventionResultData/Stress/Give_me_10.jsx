import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Stress_GIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Query: Give me 10 Questions based on the likert scale that we can use to score the symptoms of Stress
      </Text>
      <Text style={styles.subtitle}>
        Result:
      </Text>
      <Text style={styles.paragraph}>
        Certainly! The Likert scale is a popular method for assessing attitudes, perceptions, and experiences, including symptoms of stress. Here are 10 questions you can use to evaluate stress symptoms, with responses typically ranging from "Strongly Disagree" to "Strongly Agree":
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Physical Symptoms:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I frequently experience headaches or migraines.
      </Text>
      <Text style={styles.paragraph}>
           - I often feel fatigued or exhausted, even after a full night's sleep.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Emotional Symptoms:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I feel overwhelmed by my responsibilities and tasks.
      </Text>
      <Text style={styles.paragraph}>
           - I often feel irritable or short-tempered.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Cognitive Symptoms:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I have difficulty concentrating or focusing on tasks.
      </Text>
      <Text style={styles.paragraph}>
           - I find myself worrying excessively about various aspects of my life.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Behavioral Symptoms:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I have noticed changes in my eating habits, such as overeating or loss of appetite.
      </Text>
      <Text style={styles.paragraph}>
           - I find myself withdrawing from social activities or interactions.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Sleep Patterns:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I have trouble falling asleep or staying asleep throughout the night.
      </Text>
      <Text style={styles.paragraph}>
           - I often wake up feeling unrefreshed or unrested.
      </Text>
      <Text style={styles.paragraph}>
        These questions can help identify the presence and severity of stress symptoms. Respondents typically rate each statement on a scale from 1 to 5, where 1 might represent "Strongly Disagree" and 5 represents "Strongly Agree." This allows for a quantitative assessment of stress levels.
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

export default Stress_GIVEME10Screen;
