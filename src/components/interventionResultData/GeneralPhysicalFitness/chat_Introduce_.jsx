import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const GeneralPhysicalFitness_CHATINTRODUCEScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        General physical fitness refers to a state of health and well-being achieved through a combination of regular physical activity, balanced nutrition, and adequate rest. It encompasses various components, including cardiovascular endurance, muscular strength, flexibility, and body composition. Achieving and maintaining physical fitness enhances overall health, reduces the risk of chronic diseases, and improves mental health. Engaging in diverse activities, such as aerobic exercises, strength training, and stretching, helps develop a well-rounded fitness foundation. Additionally, incorporating healthy lifestyle choices, such as a nutritious diet and sufficient sleep, supports sustained energy levels and recovery, promoting a balanced, active, and vibrant life.
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

export default GeneralPhysicalFitness_CHATINTRODUCEScreen;
