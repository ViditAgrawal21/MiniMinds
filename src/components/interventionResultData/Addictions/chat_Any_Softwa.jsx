import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Addictions_ChatAnySoftwaScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Addressing addiction to social media or digital platforms through software-based interventions is an approach that several developers and researchers have explored. Here are some strategies and examples of applications that utilize pop-ups and similar features to help manage and mitigate social media addiction:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Screen Time Management Apps</Text>: These apps monitor how much time you spend on your devices and can remind you to take breaks. They often include features that can temporarily block apps after you've reached a certain usage limit.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.italic}>Examples</Text>: 
      </Text>
      <Text style={styles.paragraph}>
             - <Text style={styles.bold}>Forest</Text>: Encourages you to avoid phone usage by planting a virtual tree that grows as you stay away from your phone.
      </Text>
      <Text style={styles.paragraph}>
             - <Text style={styles.bold}>StayFocusd</Text>: A browser extension that limits the amount of time you spend on time-wasting websites.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindfulness and Awareness Apps</Text>: These apps aim to increase your awareness of digital habits through notifications and reminders.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.italic}>Examples</Text>:
      </Text>
      <Text style={styles.paragraph}>
             - <Text style={styles.bold}>Moment</Text>: Tracks how much you use your phone and can set daily limits. It also provides reminders and statistics on usage.
      </Text>
      <Text style={styles.paragraph}>
             - <Text style={styles.bold}>Space - Break phone addiction</Text>: Encourages you to set goals for phone usage and shows pop-up reminders to keep you within those limits.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Digital Wellbeing Tools</Text>: These are integrated directly into operating systems and provide insights into app usage, along with tools to limit exposure.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.italic}>Examples</Text>:
      </Text>
      <Text style={styles.paragraph}>
             - <Text style={styles.bold}>Google’s Digital Wellbeing</Text>: Available on Android devices, it shows dashboard usage, sets timers on apps, and includes features like Wind Down to reduce screen time.
      </Text>
      <Text style={styles.paragraph}>
             - <Text style={styles.bold}>Apple’s Screen Time</Text>: Allows you to see app usage, set daily limits, and schedule downtime.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Browser Extensions</Text>: These can provide pop-ups when you access certain websites, reminding you of your goals and encouraging you to take breaks.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.italic}>Examples</Text>:
      </Text>
      <Text style={styles.paragraph}>
             - <Text style={styles.bold}>LeechBlock NG</Text>: A Firefox addon that blocks distracting sites and displays reminders if you attempt to access them during set times.
      </Text>
      <Text style={styles.paragraph}>
             - <Text style={styles.bold}>StayFocusd</Text>: Limits time spent on distracting websites and adds reminders to stay focused.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Behavioral Nudges</Text>: Some apps and extensions create brief interruptions or ask reflective questions as nudges to promote mindful behavior.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.italic}>Example</Text>:
      </Text>
      <Text style={styles.paragraph}>
             - <Text style={styles.bold}>Mindful Browsing</Text>: Displays gentle nudges and reflections when you navigate to a distracting site and asks what you want to spend your time doing instead.
      </Text>
      <Text style={styles.paragraph}>
        While pop-ups and notifications can be effective reminders, it’s important for users to actively participate and be willing to make changes to address their habits. These tools generally work best when combined with a reflective practice or behavioral therapy for a more holistic approach to addiction management.
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

export default Addictions_ChatAnySoftwaScreen;
