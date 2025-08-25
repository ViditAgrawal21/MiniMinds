import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Addictions_GiveMe10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Query: Give me 10 Questions based on the likert scale that we can use to score the symptoms of Addictions
      </Text>
      <Text style={styles.subtitle}>
        Result:
      </Text>
      <Text style={styles.paragraph}>
        Creating a Likert scale to assess symptoms of addiction involves crafting statements that respondents can agree or disagree with to varying degrees. Here are ten questions that could be used to evaluate addiction symptoms:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Craving and Urges:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I frequently experience strong cravings or urges to engage in the addictive behavior."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Loss of Control:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I often find it difficult to control or reduce my engagement in the addictive behavior, even when I try."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Time Spent:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I spend a significant amount of time thinking about, planning, or engaging in the addictive behavior."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Neglect of Responsibilities:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "My involvement in the addictive behavior has caused me to neglect important responsibilities at work, school, or home."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Impact on Relationships:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "My relationships with family and friends have been negatively affected by my addictive behavior."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Tolerance:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I have noticed that I need to engage in the addictive behavior more frequently or intensely to achieve the same effect."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Withdrawal Symptoms:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I experience physical or emotional discomfort when I am unable to engage in the addictive behavior."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Attempts to Quit:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "I have made multiple unsuccessful attempts to quit or cut back on the addictive behavior."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Impact on Health:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - "My physical or mental health has suffered as a result of my addictive behavior."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Continued Use Despite Problems:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            - "I continue to engage in the addictive behavior despite knowing it causes problems in my life."
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
        This format allows for a nuanced understanding of the severity and impact of addiction symptoms on an individual's life.
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

export default Addictions_GiveMe10Screen;
