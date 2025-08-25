import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const YoungsterIssues_GIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Query: Give me 10 Questions based on the likert scale that we can use to score the symptoms of Youngster Issues
      </Text>
      <Text style={styles.subtitle}>
        Result:
      </Text>
      <Text style={styles.paragraph}>
        Creating a Likert scale to assess symptoms related to issues commonly faced by youngsters can be a helpful tool for understanding their experiences and challenges. Below are ten sample questions that could be used in such a scale. Respondents would typically rate each statement on a scale from "Strongly Disagree" to "Strongly Agree."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Stress and Anxiety:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I often feel overwhelmed by the amount of work and responsibilities I have.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Social Relationships:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I find it easy to make and maintain friendships.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Self-Esteem:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I feel confident in my abilities and self-worth.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Academic Pressure:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I feel a lot of pressure to perform well academically.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Emotional Regulation:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I am able to manage my emotions effectively when I am upset or angry.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Sleep Patterns:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I get enough sleep to feel rested and alert during the day.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Family Dynamics:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I feel supported and understood by my family.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Technology and Social Media Use:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I spend a healthy amount of time on social media and electronic devices.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Physical Health:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I am satisfied with my physical health and fitness level.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Future Uncertainty:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            - I feel optimistic about my future and the opportunities available to me.
      </Text>
      <Text style={styles.paragraph}>
        These questions can be tailored to fit specific contexts or populations, and additional questions can be added to address other relevant issues. It's important to ensure that the questions are age-appropriate and culturally sensitive.
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

export default YoungsterIssues_GIVEME10Screen;
