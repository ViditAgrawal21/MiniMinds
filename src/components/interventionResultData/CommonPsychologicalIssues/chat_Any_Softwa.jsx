import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CommonPsychologicalIssues_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        There are several software-based interventions designed to help users manage psychological issues and promote mental well-being, especially in the context of social media use. These interventions often aim to mitigate issues like anxiety, depression, and the addictive nature of social media through various features. Here are some common strategies:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindfulness and Break Reminders</Text>: Apps or browser extensions can remind users to take breaks and practice mindfulness. These tools might detect prolonged usage of social media and suggest a short meditation, breathing exercise, or simply a break.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Pop-Up Notifications for Mental Health Check-Ins</Text>: Some platforms can be configured to send occasional pop-up notifications asking users how they are feeling. These check-ins can prompt users to self-reflect and may provide suggestions based on their responses, such as taking a break or seeking support.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Digital Wellbeing Tools</Text>: Many smartphones have built-in digital wellbeing features that allow users to monitor and limit their social media usage. These tools can send alerts when a user is reaching their self-imposed time limit for certain apps.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Content Warnings and Filters</Text>: Software can identify potentially triggering content and present a warning before the user views it. This can help shield users from content that might impact their mental health negatively.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Positive Affirmations and Encouragement</Text>: Apps can be designed to show users positive affirmations or encouraging messages periodically as they use social media. This can help counteract any negative emotions the user might be experiencing.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Customized Interventions Based on Behavior Analysis</Text>: Some advanced tools may analyze user behavior, like scrolling habits and interaction patterns, to detect signs of distress or compulsive use. Based on this analysis, they might offer tailored interventions or resources.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Access to Resources</Text>: Pop-ups can direct users to mental health resources, helplines, or apps that offer cognitive behavioral therapy (CBT) exercises, meditation, or stress-relief activities.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Limiting Notifications</Text>: Encouraging users to limit notifications from social media apps can help reduce stress and anxiety associated with an overwhelming digital environment.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        It is always important to respect privacy and consent when implementing such interventions. Users should be informed about what data is being collected and how it's being used, and they should have the option to opt-out of these features if they wish.
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

export default CommonPsychologicalIssues_CHATANYSOFTWAScreen;
