import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const YoungsterIssues_CHATINTRODUCEScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Youngster issues encompass a wide range of challenges faced by today’s youth, including mental health struggles like anxiety and depression, academic pressures, and societal expectations. With the rise of social media, youngsters often experience cyberbullying and the stress of maintaining online personas. Peer pressure can lead to risky behaviors such as substance abuse and early sexual activity. Additionally, many young people grapple with identity issues and self-esteem concerns during this formative stage of life. Navigating the transition to adulthood in a rapidly changing world requires support from families, schools, and communities to foster resilience and help youth develop healthy coping strategies.
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

export default YoungsterIssues_CHATINTRODUCEScreen;
