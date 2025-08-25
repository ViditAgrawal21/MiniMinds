import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CommonPsychologicalIssues_CHATINTRODUCEScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Common psychological issues encompass a broad range of challenges that affect mental health and well-being. Anxiety and depression are among the most prevalent, often causing significant distress and impacting daily life. Stress-related disorders, including PTSD, can arise from traumatic experiences, while obsessive-compulsive disorder (OCD) and various phobias present unique behavioral patterns. Conditions such as bipolar disorder and schizophrenia affect mood and perceptions, while eating disorders like anorexia and bulimia influence body image and health. Attention-deficit/hyperactivity disorder (ADHD) often impacts focus and behavior, particularly in children. Understanding these issues helps in seeking appropriate treatment and fostering compassion and support for those affected.
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

export default CommonPsychologicalIssues_CHATINTRODUCEScreen;
