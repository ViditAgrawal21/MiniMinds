import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Sleep_CHATINTRODUCEScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Sleep is a fundamental biological process essential for maintaining overall health and well-being. It involves a cyclic pattern of distinct phases, including REM and non-REM sleep, each playing a crucial role in physical restoration and cognitive function. During sleep, the body repairs tissues, consolidates memories, and regulates hormones, all of which are vital for optimal functioning. Lack of adequate sleep can lead to a range of issues, including impaired cognitive performance, weakened immune response, and increased risk of chronic conditions. Understanding the importance of sleep and prioritizing good sleep hygiene can significantly contribute to improved quality of life and longevity.
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

export default Sleep_CHATINTRODUCEScreen;
