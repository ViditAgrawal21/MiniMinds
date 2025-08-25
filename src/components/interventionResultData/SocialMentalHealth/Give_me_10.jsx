import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SocialMentalHealth_GIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Query: Give me 10 Questions based on the likert scale that we can use to score the symptoms of Social Mental Health
      </Text>
      <Text style={styles.subtitle}>
        Result:
      </Text>
      <Text style={styles.paragraph}>
        Creating a Likert scale to assess symptoms of social mental health involves crafting statements that respondents can agree or disagree with to varying degrees. Here are ten questions that could be used to evaluate different aspects of social mental health:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Social Interaction Comfort</Text>  
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           "I feel comfortable interacting with others in social settings."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Social Anxiety</Text>  
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           "I often feel anxious when I have to engage in social activities."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Sense of Belonging</Text>  
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           "I feel a strong sense of belonging within my social circles."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Social Support</Text>  
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           "I have people in my life who provide me with emotional support."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Social Isolation</Text>  
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           "I often feel isolated from others, even when I am not alone."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Confidence in Social Situations</Text>  
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           "I am confident in my ability to handle social situations."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Fear of Judgment</Text>  
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           "I worry about being judged by others in social settings."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Enjoyment of Social Activities</Text>  
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           "I enjoy participating in social activities and gatherings."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Ability to Make Friends</Text>  
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           "I find it easy to make new friends."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Impact of Social Interactions on Mood</Text>  
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            "Social interactions have a positive impact on my mood."
      </Text>
      <Text style={styles.paragraph}>
        For each statement, respondents can be asked to rate their level of agreement on a scale, such as:  
      </Text>
      <Text style={styles.paragraph}>
        1 - Strongly Disagree  
      </Text>
      <Text style={styles.paragraph}>
        2 - Disagree  
      </Text>
      <Text style={styles.paragraph}>
        3 - Neutral  
      </Text>
      <Text style={styles.paragraph}>
        4 - Agree  
      </Text>
      <Text style={styles.paragraph}>
        5 - Strongly Agree  
      </Text>
      <Text style={styles.paragraph}>
        These questions can help gauge various dimensions of social mental health, including comfort, anxiety, support, and overall satisfaction with social interactions.
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

export default SocialMentalHealth_GIVEME10Screen;
