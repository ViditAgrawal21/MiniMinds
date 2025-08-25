import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SocialMentalHealth_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        There are several software-based interventions and tools designed to help address mental health concerns related to social media use. These typically aim to promote healthier digital habits, reduce screen time, and encourage mindful usage of technology. Here are a few approaches that have been used:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Digital Wellbeing Features</Text>: Many smartphones and apps now come with built-in digital wellbeing tools. These features can track your screen time and allow you to set limits for how long you use certain apps each day. They can also prompt you with reminders to take breaks.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>App Timers and Locks</Text>: Apps like "Offtime" or "Moment" can be installed on your devices to limit the time spent on social media. These apps often feature timers and can lock you out of certain applications once a set limit is reached.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindfulness Reminders</Text>: Some interventions include reminders to practice mindfulness or reflect on how you're feeling after using social media. Apps like "Mindfulness Bell" or "Headspace" can send notifications to encourage users to take a moment to breathe or meditate.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Pop-up Reminders</Text>: Tools like "StayFocusd" (for web browsers) or "Forest" (for smartphones) can create pop-up reminders to nudge users towards taking breaks from social media. These can be customized to ask reflective questions or prompt certain actions like walking or deep breathing.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Content Moderation</Text>: Some interventions aim to reduce exposure to negative content. For example, Twitter and Facebook have settings to mute certain keywords or limit notifications, which can reduce the negative impact on mental health.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mental Health Apps</Text>: There are apps specifically focused on mental health, such as "Calm," "Sanvello," or "Woebot". These apps often incorporate components like mood tracking, guided meditations, and cognitive behavioral therapy (CBT) exercises.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Focus and Productivity Tools</Text>: Extensions and software like "RescueTime" can help users become more aware of how they spend their time online and encourage more productive habits.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Custom Interventions</Text>: Some universities and mental health organizations develop custom interventions that can be deployed in educational settings, often using pop-ups to remind students to engage in self-care or seek support if needed.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        To be effective, these tools should ideally be tailored to individual needs and be part of a larger strategy for maintaining digital wellbeing and mental health. Combining these tools with other strategies like setting personal digital boundaries, practicing self-care, and seeking professional mental health support when necessary can yield the best outcomes.
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

export default SocialMentalHealth_CHATANYSOFTWAScreen;
