import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FamilyandRelaitonship_GIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Query: Give me 10 Questions based on the likert scale that we can use to score the symptoms of Family and Relaitonship
      </Text>
      <Text style={styles.subtitle}>
        Result:
      </Text>
      <Text style={styles.paragraph}>
        Creating a Likert scale to assess symptoms related to family and relationships involves crafting questions that can capture various dimensions of these dynamics. Here are ten questions you might consider using:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Communication:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How effectively do you feel your family communicates with each other?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Very Ineffectively) to 5 (Very Effectively)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Conflict Resolution:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How well does your family resolve conflicts when they arise?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Very Poorly) to 5 (Very Well)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Emotional Support:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How supported do you feel by your family members emotionally?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Not at All Supported) to 5 (Very Supported)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Trust:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How much trust do you have in your family members?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (No Trust) to 5 (Complete Trust)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Quality Time:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How often do you spend quality time with your family?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Never) to 5 (Very Often)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Respect:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How respected do you feel by your family members?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Not at All Respected) to 5 (Very Respected)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Shared Responsibilities:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How fairly are responsibilities shared among family members?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Very Unfairly) to 5 (Very Fairly)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Conflict Frequency:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How often do conflicts occur within your family?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Very Frequently) to 5 (Very Rarely)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Family Cohesion:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How cohesive do you feel your family is?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Not at All Cohesive) to 5 (Very Cohesive)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Satisfaction with Family Relationships:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            - How satisfied are you with your current family relationships?
      </Text>
      <Text style={styles.paragraph}>
              - 1 (Very Dissatisfied) to 5 (Very Satisfied)
      </Text>
      <Text style={styles.paragraph}>
        These questions can be adapted to fit the specific context or focus of your assessment, and additional questions can be added to capture other relevant aspects of family and relationship dynamics.
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

export default FamilyandRelaitonship_GIVEME10Screen;
