import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ProfessionalMentalHealth_GIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Query: Give me 10 Questions based on the likert scale that we can use to score the symptoms of Professional Mental Health
      </Text>
      <Text style={styles.subtitle}>
        Result:
      </Text>
      <Text style={styles.paragraph}>
        Creating a Likert scale to assess symptoms of professional mental health involves crafting statements that respondents can agree or disagree with to varying degrees. Here are ten sample questions that could be used to evaluate different aspects of mental health in a professional setting:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Stress Levels:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I feel overwhelmed by my workload on a regular basis."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Job Satisfaction:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I am satisfied with my current job role and responsibilities."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Work-Life Balance:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I am able to maintain a healthy balance between my work and personal life."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Emotional Exhaustion:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I often feel emotionally drained after work."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Motivation:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I feel motivated and enthusiastic about my work."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Support Systems:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I have access to adequate support and resources at work when I need them."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Anxiety Levels:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I frequently feel anxious or nervous about work-related tasks."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Concentration:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I find it easy to concentrate on my work tasks without getting distracted."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Interpersonal Relationships:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I have positive and supportive relationships with my colleagues."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Coping Mechanisms:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            - "I have effective strategies to cope with work-related stress."
      </Text>
      <Text style={styles.paragraph}>
        For each statement, respondents can be asked to indicate their level of agreement on a scale, such as:
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
        This format allows for a nuanced understanding of the respondent's mental health in a professional context.
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

export default ProfessionalMentalHealth_GIVEME10Screen;
