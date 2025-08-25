import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const InternetDependence_CHATINTRODUCEScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Internet dependence refers to the increasingly pervasive reliance on internet connectivity and online platforms for everyday activities, communication, and access to information. As the internet becomes integral to modern life, it reshapes how we work, socialize, learn, and entertain ourselves. While this connectivity offers numerous benefits, such as convenience and instant information access, it also raises concerns about over-reliance, privacy, and the loss of face-to-face interactions. The prevalence of internet-dependent technologies challenges individuals and societies to balance digital engagement with offline experiences, ensuring that internet use enhances rather than detracts from the quality of life and human interaction.
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

export default InternetDependence_CHATINTRODUCEScreen;
