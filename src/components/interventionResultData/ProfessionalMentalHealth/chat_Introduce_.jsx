import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ProfessionalMentalHealth_CHATINTRODUCEScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Professional mental health refers to the specialized field where trained practitioners provide essential support and treatment for individuals experiencing mental health issues. This domain encompasses a range of professions, including psychologists, psychiatrists, counselors, social workers, and psychiatric nurses, all dedicated to understanding, diagnosing, and treating mental health conditions. Their work involves employing therapeutic techniques, evidence-based practices, and medication management to improve the psychological well-being of individuals. As mental health awareness rises, the role of these professionals is increasingly recognized as vital in promoting mental wellness, reducing stigma, and fostering healthier communities. Addressing mental health is essential for overall societal well-being.
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

export default ProfessionalMentalHealth_CHATINTRODUCEScreen;
