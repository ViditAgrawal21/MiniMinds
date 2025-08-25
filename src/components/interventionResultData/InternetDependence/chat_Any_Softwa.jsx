import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const InternetDependence_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Addressing Internet dependence through software-based interventions can be effective in promoting healthier online habits. Here are several approaches to consider, such as showing popups after extended use of social media, that aim to reduce Internet dependence:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Usage Tracking and Alerts</Text>: Applications like "StayFocusd" or "RescueTime" can monitor the amount of time users spend on different sites or apps. They can be set up to show a popup notification after a user has spent a predefined amount of time on social media, reminding them to take breaks.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Scheduled Breaks</Text>: Tools like "LeechBlock" or "Cold Turkey" allow users to schedule break times where access to certain websites is restricted or blocked. A popup can notify users when their scheduled break is about to start, encouraging them to engage in offline activities.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindfulness Reminders</Text>: Apps such as "Headspace" or "Mindful Browsing" can be configured to show periodic reminders encouraging users to reflect on their browsing habits, or to conduct quick mindfulness exercises to break the continuous scrolling.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Positive Reinforcement</Text>: Extensions like "HabitLab" from Stanford HCI Group are designed to help users reduce time on selected sites by offering nudges and reminders. They can show congratulatory popups or statistics showing how reductions in use translate to benefits, like time saved.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Gamification of Breaks</Text>: Apps like "Forest" plant a virtual tree when users spend time away from their phone or specific apps. As users take more breaks, they grow their forest. Popups can show progress or achievements to encourage continued engagement.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Focus and Pomodoro Techniques</Text>: Extensions like "Focus Booster" can remind users to adopt the Pomodoro Technique, which involves focused work sessions followed by breaks. Popups remind users to take a break after their work session.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Visual Analytics Dashboards</Text>: Providing users with a visual representation of their social media usage, such as through Google Dashboard or Apple’s Screen Time insights, can be a powerful motivator for change. Popups summarizing weekly usage can help users set better goals.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        These interventions can help in making users more aware of their usage patterns and encourage them to adopt healthier habits. The effectiveness of these tools often depends on the individual's commitment to reducing dependence and their willingness to actively engage with the interventions.
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

export default InternetDependence_CHATANYSOFTWAScreen;
