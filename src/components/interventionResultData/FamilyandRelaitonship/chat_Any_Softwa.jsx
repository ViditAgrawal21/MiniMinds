import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FamilyandRelaitonship_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Software-based interventions that aim to promote healthy family and relationship dynamics can be a useful tool, especially in the context of social media, which often distracts from face-to-face interactions. If you're interested in implementing pop-ups or similar interventions, here are some ideas and tips that could be helpful:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Reminders for Mindfulness:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Create pop-ups that encourage users to take a moment to disconnect and engage with those physically present. For example, "Have you taken a moment today to connect with your family?"
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Scheduled Digital Detox:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Implement a feature that suggests regular breaks from social media to focus on family activities. This could be in the form of a daily or weekly reminder.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Positive Affirmations:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Display encouraging messages about the value of family time and the importance of nurturing relationships. For example, "Family time is priceless: consider sharing a meal together today."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Conversation Starters:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Offer prompts that users can use to kickstart meaningful conversations with their family. For example, "Ask someone you care about how their day was."
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Goal Setting:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Allow users to set personal goals related to family interactions, such as having dinner together three times a week, and periodically remind them of these goals with pop-ups.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Engagement Challenges:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Design challenges or activities that families can do together, and use pop-ups to introduce these challenges. Examples include family game nights or walking together for 30 minutes daily.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Supportive Resources:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Provide links or suggestions to resources on improving family communication and relationships, like articles, webinars, or podcasts.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mood and Reflection Prompts:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Regularly check in on the user's emotional state, encouraging reflection on how their time on social media might be affecting their relationships.
      </Text>
      <Text style={styles.paragraph}>
        While developing these interventions, it's crucial to ensure that they are not intrusive and respect user preferences by allowing easy opt-in or opt-out. Additionally, personalization can enhance their effectiveness, tailoring messages to suit individual user needs and habits.
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

export default FamilyandRelaitonship_CHATANYSOFTWAScreen;
