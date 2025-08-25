import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const InternetandSocialMediaIssue_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        There are several software-based interventions and tools designed to
        help manage or mitigate the effects of excessive use of social media and
        the internet. These tools often include features like reminders,
        pop-ups, or other notifications to encourage users to take breaks,
        manage their time effectively, or become more mindful of their usage.
        Here are some popular ones:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Screen Time (iOS)</Text>: Built into iOS
            devices, Screen Time provides insights into how much time you spend
            on your apps and websites. It also allows you to set daily limits
            for specific apps and schedules for downtime.
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Digital Wellbeing (Android)</Text>:
            Similar to Apple's Screen Time, Digital Wellbeing is integrated into
            many Android devices. It provides a dashboard of your device usage
            and offers tools to set app timers and wind down for better device
            habits.
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>StayFocusd (Chrome Extension)</Text>:
            StayFocusd is a browser extension that helps limit the amount of
            time you spend on time-wasting websites. You can customize which
            sites to block and how long you can access them per day.
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Momentum</Text>: A Chrome extension that
            replaces your new tab page with a personal dashboard featuring a
            to-do list, inspirational quotes, and weather updates. While not
            specifically for limiting social media use, it can help redirect
            your focus when opening a new tab.
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>RescueTime</Text>: This app runs in the
            background on your devices and tracks how much time you spend on
            applications and websites, providing detailed reports. It can also
            block distracting websites.
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Flora and Forest</Text>: Both of these
            apps gamify staying off your phone by using virtual plants. If you
            leave your phone alone for a set amount of time, a virtual tree will
            grow. If you leave the app, the tree will die.
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Cold Turkey</Text>: A versatile app that
            can block distractions across different platforms. It can block
            apps, websites, or even the entire internet if necessary.
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Focus@Will</Text>: Though not a
            traditional internet use blocker, Focus@Will provides music
            scientifically optimized to improve focus, helping users maintain
            productivity and lessen the urge to check social media.
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Pomodoro Timers</Text>: Apps like Focus
            Booster or the PomoDone app use the Pomodoro Technique, which
            encourages work sessions with breaks in between, effectively
            managing time and reducing unnecessary internet checks.
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>
            <Text style={styles.bold}>Mindful Browsing</Text>: An extension
            specifically for Safari that provides reminders and encouragement to
            spend your time on more fulfilling activities off the screen.
          </Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        Each of these tools uses different approaches to help users be more
        mindful of their Internet and Social Media Issue usage, whether by
        encouraging breaks, blocking distracting websites, or helping to track
        and analyze time spent online.
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

export default InternetandSocialMediaIssue_CHATANYSOFTWAScreen;
