import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SocialMentalHealth_CHATINTRODUCEScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Social mental health refers to the collective emotional and psychological well-being of communities and how individuals' mental health is influenced by social factors. It encompasses the interplay between social environments, relationships, and mental health outcomes. Aspects such as social support, community engagement, and societal norms play crucial roles in shaping individual and collective mental health. Positive social interactions can enhance well-being, while social isolation, discrimination, and stigma can contribute to mental health challenges. By understanding and addressing these social determinants, communities can foster environments that promote resilience, empathy, and support, ultimately leading to improved mental health outcomes for all members of society.
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

export default SocialMentalHealth_CHATINTRODUCEScreen;
