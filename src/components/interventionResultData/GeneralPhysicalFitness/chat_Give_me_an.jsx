import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const GeneralPhysicalFitness_CHATGIVEMEANScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Query: Give me an elaboration in a paragraph for each -  mild form, moderate form and  severe  form  of General physical Fitness
      </Text>
      <Text style={styles.subtitle}>
        Result:
      </Text>
      <Text style={styles.paragraph}>
        Mild form of general physical fitness refers to a basic level of physical health where an individual is able to perform daily activities without undue fatigue. This level of fitness typically involves light physical activities such as walking, doing household chores, or light gardening. Individuals with a mild level of fitness may not engage in regular structured exercise, but they maintain a basic level of physical activity that helps to keep them healthy and functional.
      </Text>
      <Text style={styles.paragraph}>
        Moderate form of general physical fitness is a step up from the mild form. At this level, an individual engages in regular, structured exercise that goes beyond the basic activities of daily living. This might include activities like jogging, swimming, cycling, or participating in team sports. Individuals with a moderate level of fitness have greater endurance, strength, and flexibility than those with a mild level of fitness. They are able to perform more strenuous activities without becoming overly tired and they have a lower risk of developing chronic diseases like heart disease or diabetes.
      </Text>
      <Text style={styles.paragraph}>
        Severe form of general physical fitness refers to a high level of physical health and ability. Individuals at this level of fitness engage in intense, regular exercise that significantly exceeds the physical activity levels of daily living. This might include activities like marathon running, competitive sports, or high-intensity interval training. Individuals with a severe level of fitness have exceptional endurance, strength, and flexibility. They are capable of performing very strenuous activities for extended periods of time, and they have a very low risk of developing chronic diseases. This level of fitness requires a significant commitment to regular, intense exercise and a healthy lifestyle.
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

export default GeneralPhysicalFitness_CHATGIVEMEANScreen;
