import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const InternetDependence_GIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Query: Give me 10 Questions based on the likert scale that we can use to score the symptoms of Internet Dependence
      </Text>
      <Text style={styles.subtitle}>
        Result:
      </Text>
      <Text style={styles.paragraph}>
        Certainly! The Likert scale is a popular tool for measuring attitudes or behaviors, typically ranging from "Strongly Disagree" to "Strongly Agree." Here are ten questions that could be used to assess symptoms of Internet Dependence:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Time Management:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I often find myself spending more time online than I initially intended.
      </Text>
      <Text style={styles.paragraph}>
           
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Neglect of Responsibilities:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - My internet use has interfered with my responsibilities at work, school, or home.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Preoccupation:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I frequently think about being online when I am offline.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Loss of Interest:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I have lost interest in hobbies or activities that I used to enjoy because of my internet use.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Withdrawal Symptoms:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I feel restless, irritable, or anxious when I cannot access the internet.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Tolerance:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I need to spend increasing amounts of time online to achieve the same level of satisfaction.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Attempts to Cut Down:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I have tried to reduce my internet use but have been unsuccessful.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Impact on Relationships:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - My internet use has negatively affected my relationships with family or friends.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Escapism:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - I use the internet to escape from my problems or to relieve feelings of helplessness, guilt, anxiety, or depression.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Concealment:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            - I have hidden or lied about the amount of time I spend online from others.
      </Text>
      <Text style={styles.paragraph}>
        Each of these questions can be rated on a Likert scale, such as:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>Strongly Disagree
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}>Disagree
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}>Neutral
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}>Agree
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>5.</Text>
          <Text style={styles.listText}>Strongly Agree
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        These questions can help identify patterns of behavior that may indicate internet dependence.
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

export default InternetDependence_GIVEME10Screen;
