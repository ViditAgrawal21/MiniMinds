import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Stress_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Software-based interventions can be highly effective in managing stress, especially when it comes to addressing the impact of social media usage. Here are a few approaches that developers have used or could consider implementing to help users manage stress related to social media:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindful Timers</Text>: Apps or browser extensions that track the amount of time spent on social media platforms and remind users to take breaks. These can be gentle nudges or pop-up reminders that suggest activities like standing up, stretching, or meditating.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Digital Wellbeing Features</Text>: Built-in features on smartphones (like Apple's Screen Time or Android's Digital Wellbeing) that allow users to set time limits for social media apps. Once the limit is reached, the app either locks or reminds the user to take a break.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Positive Notifications</Text>: Customizable positive reinforcement notifications that offer stress-reducing tips, such as deep breathing exercises, quick mindfulness practices, or encouraging messages after a user exits a social media app.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mood Tracking</Text>: Apps that prompt users to log their mood before and after social media usage. Over time, this can help users recognize how different types of content affect their mental well-being and make more informed choices about their social media consumption.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Content Control</Text>: Tools that allow users to filter or limit exposure to specific types of content that they find stressful, such as news, political debates, or celebrity gossip, and instead promote content that is more calming or positive.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>AI-Based Interventions</Text>: Use of AI to analyze the user's engagement patterns and suggest personalized interventions, such as recommending a de-stress exercise or redirecting to meditation content when prolonged stress-indicating patterns are detected.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Pop-up Interventions</Text>: Specific to your question, pop-up messages that emerge after a certain duration of social media use. These pop-ups could suggest stress relief activities or redirect users to more calming apps, such as meditation or relaxation tutorials.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Gamification of Breaks</Text>: Introducing a fun, gamified element to taking breaks, where users can earn rewards or points for spending time off social media or engaging in stress-reducing activities.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        To effectively implement these software interventions, it is important that they are user-friendly, non-intrusive, and customizable to meet the specific needs and preferences of different users. Developers should also ensure that these tools respect user privacy and encourage voluntary self-regulation rather than forceful restrictions.
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

export default Stress_CHATANYSOFTWAScreen;
