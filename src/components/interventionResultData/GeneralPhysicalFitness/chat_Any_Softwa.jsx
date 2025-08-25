import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const GeneralPhysicalFitness_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Yes, there are software-based interventions designed to promote physical fitness and overall well-being by leveraging the use of pop-up reminders and notifications, particularly after social media usage. Here are a few approaches that can be implemented:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Browser Extensions</Text>: These can be installed on web browsers to monitor how much time is spent on social media sites. Extensions like StayFocusd, LeechBlock, or TimeWarp can be configured to display reminders or block access after a certain period, encouraging users to take a break for physical activity.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mobile Apps</Text>: Applications like Forest, Offtime, or AppBlock allow users to set limits on app usage and can be programmed to send alerts or pop-ups suggesting a break. These breaks can include reminders to engage in physical exercise or stretches.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Built-in Phone Features</Text>: Most modern smartphones come with features such as Apple's Screen Time or Android's Digital Wellbeing, which track app usage and allow users to set time limits. Notifications can be set up to alert users when they've spent a specified time on social media, prompting them to take physical fitness breaks.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Third-Party Fitness Apps</Text>: Many fitness apps (e.g., MyFitnessPal, Fitbit, Strava) can send regular prompts or reminders to get moving, regardless of digital usage patterns. While not always linked to social media use, they encourage regular activity throughout the day.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Custom Bots or Scripts</Text>: For tech-savvy users, creating a custom bot or using automation tools like IFTTT or Zapier can trigger reminders after detecting social media usage.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindfulness and Well-being Apps</Text>: Apps like Headspace or Calm can offer gentle reminders for taking mental and physical breaks. They can be part of a broader routine that includes regular intervals away from screens, promoting physical activity.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        These interventions aim to interrupt prolonged periods of inactivity often associated with extended social media use, encouraging a more balanced lifestyle that includes regular physical activity.
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

export default GeneralPhysicalFitness_CHATANYSOFTWAScreen;
