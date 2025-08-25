import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SexLife_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Addressing sensitive issues such as those related to one's sex life through software interventions, like pop-up notifications, requires a thoughtful and respectful approach. While pop-ups might be intrusive, there are more subtle and effective methods for providing support and information. Below are some potential software-based interventions that can be designed to support and educate users:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>In-app Educational Content</Text>: Social media platforms can integrate educational content that is presented in a non-intrusive manner. For example, infographics, articles, or videos related to sexual health and relationships could be made available in a dedicated section of the platform.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Targeted Advertising</Text>: Algorithms could be used to serve targeted adverts that lead to reputable and educational resources or services focusing on sexual wellness. These ads should be discreet and only appear if users have expressed interest in relevant topics.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Resource Links</Text>: Platforms can include links to helplines or educational sites within their help or support sections, ensuring users know where to find reliable sexual health information.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>User-Driven Notifications</Text>: Allow users to subscribe to themes or topics they are interested in. If sexual health is among them, provide periodic updates or resources in their feed.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Community Groups</Text>: Encourage the creation of communities or discussion groups where users can talk openly about sex education and sexual health in a safe and respectful environment.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Interactive Quizzes or Tools</Text>: Offer tools that help users assess their current understanding or knowledge, leading them to more information based on the results.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindful Break Reminders</Text>: Platforms can incorporate reminders or nudges suggesting breaks, without specifying the nature, to encourage users to engage in offline activities that promote well-being, which might include addressing personal aspects of their lives, like their sex life.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Partnerships with Health Organizations</Text>: Collaborate with sexual health organizations to provide vetted and valuable content directly on the platforms.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        It’s crucial that any intervention prioritizes user privacy and consent, ensuring that the tools are supportive and not perceived as invasive or judgmental. The design of such interventions should aim to empower users with knowledge and resources rather than prescribing any specific action.
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

export default SexLife_CHATANYSOFTWAScreen;
