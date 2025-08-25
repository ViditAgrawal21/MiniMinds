import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Sleep_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        There are several software-based approaches that can help address the issue of sleep disruption caused by excessive use of social media and digital devices. Here are a few strategies and tools:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Screen Time Management Apps</Text>: These apps can help monitor and limit the amount of time you spend on social media and other apps. Many of them can issue reminders or alerts when you reach a certain usage threshold, helping you to be more mindful of your screen time. Examples include:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Moment</Text> (iOS)
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Space</Text> (iOS and Android)
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Offtime</Text> (iOS and Android)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Digital Wellbeing Features</Text>: Both Android and iOS devices have built-in features designed to help manage screen time:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>iOS Screen Time</Text>: Allows you to set daily time limits for app categories and provides a report of your usage.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Android Digital Wellbeing</Text>: Offers features like app timers, Wind Down mode to reduce screen time before bed, and notifications to help manage usage.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Browser Extensions</Text>: Extensions for browsers can limit your access to certain websites during specified times. Examples include:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>StayFocusd</Text> (Chrome)
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>LeechBlock</Text> (Firefox)
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>WasteNoTime</Text> (Safari)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Pomodoro and Focus Apps</Text>: These apps help with productivity and can be adapted to improve sleep by limiting evening device use.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Forest</Text> (iOS and Android): Helps you stay focused by growing a virtual tree as you complete work sessions without distraction.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Pomodone</Text> (Windows, Mac, Web): Uses the Pomodoro Technique to encourage periods of focused work followed by breaks.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Pop-up Reminders and Alerts</Text>: Setting reminders or alarms within your phone to notify you to stop using social media before your target bedtime can be a helpful intervention. These can be simple alarms or more sophisticated reminders that suggest winding down activities.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Blue Light Filters</Text>: Though not specifically aimed at reducing social media use, apps that filter blue light emitted by screens can help reduce eye strain and disrupt sleep less.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>f.lux</Text> (Windows, Mac)
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Night Shift</Text> (iOS)
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Night Mode</Text> (Android)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindfulness and Sleep Apps</Text>: Apps like <Text style={styles.bold}>Headspace</Text> or <Text style={styles.bold}>Calm</Text> offer guided meditations and sleep stories that can encourage shutting down screens and winding down for sleep.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        Combining these tools with personal discipline and setting clear goals for screen time reduction, especially in the hours leading up to bedtime, can significantly improve sleep patterns and overall well-being.
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

export default Sleep_CHATANYSOFTWAScreen;
