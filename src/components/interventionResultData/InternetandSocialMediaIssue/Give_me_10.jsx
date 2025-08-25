import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const InternetandSocialMediaIssue_GIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Query: Give me 10 Questions based on the likert scale that we can use to
        score the symptoms of Internet and Social Media Issue Issue
      </Text>
      <Text style={styles.subtitle}>Result:</Text>
      <Text style={styles.paragraph}>
        Certainly! The Likert scale is a popular method for measuring attitudes,
        opinions, or behaviors, typically using a five or seven-point scale.
        Here are ten questions that can be used to assess symptoms of Internet
        and Social Media Issue issues:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Frequency of Use:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - How often do you find yourself spending more time on social media than
        you intended?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Never, (2) Rarely, (3) Sometimes, (4) Often, (5) Always
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Impact on Daily Activities:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - To what extent does your use of the Internet and Social Media Issue
        interfere with your daily responsibilities (e.g., work, school,
        household tasks)?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Not at all, (2) A little, (3) Moderately, (4) Very much, (5)
        Extremely
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Emotional Response:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - How often do you feel anxious or stressed when you cannot access
        social media?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Never, (2) Rarely, (3) Sometimes, (4) Often, (5) Always
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Sleep Patterns:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - How often does your use of the Internet or social media negatively
        affect your sleep patterns?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Never, (2) Rarely, (3) Sometimes, (4) Often, (5) Always
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Social Interaction:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - How often do you prefer interacting with people online rather than
        face-to-face?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Never, (2) Rarely, (3) Sometimes, (4) Often, (5) Always
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Concentration and Focus:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - How often do you find it difficult to concentrate on tasks because of
        thoughts about checking social media?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Never, (2) Rarely, (3) Sometimes, (4) Often, (5) Always
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Attempts to Reduce Use:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - How successful have you been in attempts to reduce your Internet or
        social media use?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Very unsuccessful, (2) Unsuccessful, (3) Neutral, (4) Successful,
        (5) Very successful
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Mood Changes:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - How often does your mood change based on your interactions or
        experiences on social media?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Never, (2) Rarely, (3) Sometimes, (4) Often, (5) Always
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Perceived Importance:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - How important is social media to your sense of self-worth?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Not at all important, (2) Slightly important, (3) Moderately
        important, (4) Very important, (5) Extremely important
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Withdrawal Symptoms:</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        - How often do you experience withdrawal symptoms (e.g., irritability,
        restlessness) when you are unable to use the Internet or social media?
      </Text>
      <Text style={styles.paragraph}>
        - (1) Never, (2) Rarely, (3) Sometimes, (4) Often, (5) Always
      </Text>
      <Text style={styles.paragraph}>
        These questions can help identify patterns and the extent of issues
        related to Internet and Social Media Issue use. Adjust the scale points
        as needed to fit the specific context or research requirements.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#222",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
    color: "#333",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: "#444",
  },
  listContainer: {
    marginBottom: 15,
    paddingLeft: 10,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bulletNumber: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
    fontWeight: "bold",
    color: "#555",
  },
  listText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: "#444",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
});

export default InternetandSocialMediaIssue_GIVEME10Screen;
