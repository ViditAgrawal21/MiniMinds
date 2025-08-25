import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Stress_CHATINTRODUCEScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Stress is a natural physiological and psychological response to challenging or threatening situations. It serves as a survival mechanism, activating a "fight or flight" response that equips individuals to handle immediate danger. However, in today's fast-paced world, chronic stress is increasingly common, often manifesting from constant pressures at work, relationships, or financial concerns. This persistent stress can lead to adverse health effects, including heart disease, depression, and weakened immunity. Recognizing and managing stress through strategies such as exercise, mindfulness, or counseling is crucial for maintaining overall well-being. Understanding stress and its impact is essential for improving quality of life and health outcomes.
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

export default Stress_CHATINTRODUCEScreen;
