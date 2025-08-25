import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FinancialMentalHealth_CHATINTRODUCEScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Financial mental health refers to the intricate relationship between one's financial situation and their mental well-being. It's an area that acknowledges how financial stress, such as debt or unexpected expenses, can significantly impact mental health, leading to anxiety, depression, or other psychological issues. Conversely, poor mental health can affect financial decisions, creating a vicious cycle. Understanding financial mental health involves recognizing the emotional and mental responses to financial pressures, promoting healthy financial habits, and building a support system for financial management. Addressing this aspect involves education, awareness, and practical steps to improve both financial stability and mental health resilience.
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

export default FinancialMentalHealth_CHATINTRODUCEScreen;
