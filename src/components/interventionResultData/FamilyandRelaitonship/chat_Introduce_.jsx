import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FamilyandRelaitonship_CHATINTRODUCEScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Family and relationships form the foundation of human society, shaping our experiences, values, and personal development. At its core, a family is a unit connected by blood, marriage, or adoption, offering support, love, and understanding. Relationships extend beyond familial ties, encompassing friendships, romantic partnerships, and professional connections. These bonds influence our emotional well-being and social skills, teaching us empathy, communication, and conflict resolution. Healthy relationships are characterized by trust, respect, and mutual support, while dysfunctional ones can lead to stress and discord. Understanding and nurturing these connections are crucial for personal growth, happiness, and a harmonious society.
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

export default FamilyandRelaitonship_CHATINTRODUCEScreen;
