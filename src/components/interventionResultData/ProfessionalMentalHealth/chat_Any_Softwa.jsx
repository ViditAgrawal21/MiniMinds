import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ProfessionalMentalHealth_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Software-based interventions aimed at addressing mental health issues associated with social media usage can take many forms. One approach that companies and developers have considered involves using pop-up notifications or reminders to encourage healthier digital habits and promote mental well-being. Here are some possible interventions:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Usage Reminders:</Text> Apps can track the amount of time a user spends on social media and send reminders or pop-ups encouraging breaks after a certain period.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindfulness Prompts:</Text> After extended usage, an app could present a mindfulness prompt, suggesting users take a moment to breathe deeply or encouraging short mindfulness exercises.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Daily Highlights/Digest:</Text> Instead of real-time scrolling, social media apps could offer a daily digest of significant updates, encouraging users to check less frequently.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Well-Being Content:</Text> Pop-ups could share mental health tips, inspirational quotes, or links to short mental health resources or exercises.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mental Health Check-Ins:</Text> Apps could periodically ask users to rate their mood or mental state, offering insights or resources to assist with any issues.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Focus Mode:</Text> Social media platforms could provide a feature to limit active usage during work hours, offering pop-ups to encourage users to take a break if needed.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Custom Timers:</Text> Users can set personalized time limits for their social media usage, with pop-ups alerting them when they reach their threshold.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Priority Accounts/Content:</Text> People can choose to see posts only from certain accounts, reducing stress from information overload, with prompts to organize their feed.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Encouragement for In-person Activities:</Text> Suggestions to engage in offline activities, such as meeting a friend or taking a walk, can be shown after a set usage time.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Educational Modules:</Text> Short, interactive pop-ups can teach about the importance of digital boundaries, encouraging users to balance their screen time with other activities.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        For these interventions to be effective, considerations around user consent, data privacy, and the potential for such notifications to be perceived as intrusive must be addressed. Nowadays, several mental health apps offer some of these features and can work in conjunction with social media usage to promote better mental health practices.
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

export default ProfessionalMentalHealth_CHATANYSOFTWAScreen;
