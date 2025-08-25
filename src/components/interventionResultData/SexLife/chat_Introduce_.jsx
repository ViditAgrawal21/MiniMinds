import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SexLife_CHATINTRODUCEScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Sex life refers to the spectrum of activities and experiences related to sexual expression and intimacy, encompassing the physical, emotional, and psychological aspects of sexual behavior. It plays a crucial role in personal and relational fulfillment, impacting overall well-being and quality of life. A healthy sex life is often characterized by satisfaction, mutual consent, and communication between partners, contributing to stronger emotional bonds and relationship satisfaction. Factors such as age, health, cultural background, and personal beliefs can significantly influence one's sex life. Open dialogue, education, and understanding are essential for navigating sexual health and fostering positive sexual experiences.
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

export default SexLife_CHATINTRODUCEScreen;
