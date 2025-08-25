import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Addictions_ChatIntroduceScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Addictions are complex conditions characterized by the compulsive engagement in rewarding stimuli, despite adverse consequences. They can manifest in various forms, including substance abuse (like drugs or alcohol) and behavioral addictions (such as gambling or internet usage). Rooted in both genetic and environmental factors, addictions alter brain chemistry, affecting areas related to reward, motivation, and memory. This rewiring of neural pathways makes overcoming addiction challenging, often requiring comprehensive treatment strategies like therapy, rehabilitation, and support groups. Understanding addiction as a chronic, relapsing disorder rather than a moral failing is crucial in promoting empathy and effective intervention for those affected.
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

export default Addictions_ChatIntroduceScreen;
