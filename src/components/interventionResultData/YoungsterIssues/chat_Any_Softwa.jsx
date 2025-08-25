import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const YoungsterIssues_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Addressing issues related to excessive social media use among young people through software-based interventions is a proactive approach to promote healthier digital habits. Here are a few software-based strategies and interventions that could be employed:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Usage Tracking and Reporting</Text>: Apps or built-in device features that track how much time young users spend on social media platforms. These tools can provide detailed reports and insights which can be instrumental in raising awareness about usage patterns.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Time Management Tools</Text>: Features that allow users to set limits on the amount of time they spend on specific apps. Once the time limit is reached, the app can either send a notification or lock the user out, encouraging them to take a break.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Scheduled Downtime</Text>: Software settings that allow users (or parents) to schedule downtime when social media apps cannot be accessed. This can help ensure that young people aren’t using these apps during certain times, like meals or bedtime.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Popup Reminders and Notifications</Text>: Implementing popup reminders that encourage users to take a break after a certain period of continuous use. These can be simple reminders or contain educational content about the benefits of taking breaks.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Gamification of Breaks</Text>: Making taking breaks more engaging by gamifying the process. For instance, rewarding users with points or badges for adhering to healthy digital usage or for using apps that are beneficial to their mental and physical health.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindfulness and Well-being Apps</Text>: Encouraging the use of apps dedicated to mindfulness, meditation, or mental well-being through notifications when social media usage gets high. These can serve as positive alternatives to social media.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Positive Content Highlighting</Text>: Developing algorithms that prioritize displaying positive, inspiring, or educational content when users log in after long periods or excessive use.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Parental Control Apps</Text>: Tools that allow parents to monitor and manage their children’s social media usage. These can include features like setting time limits, blocking certain content, and viewing app usage reports.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Digital Literacy Education</Text>: Embedding educational content within social media platforms that teach users about the implications of excessive use, digital footprints, privacy, and cyberbullying.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Customized Suggestions</Text>: Providing personalized suggestions for alternative activities based on the user's interests, encouraging them to engage in offline activities.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        These tools can be effective when combined with awareness and educational programs that target both young users and their guardians. It’s also crucial that these interventions respect privacy and autonomy, providing users with the data and options to manage their digital lives responsibly.
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

export default YoungsterIssues_CHATANYSOFTWAScreen;
