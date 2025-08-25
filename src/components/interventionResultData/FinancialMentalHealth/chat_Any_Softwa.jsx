import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FinancialMentalHealth_CHATANYSOFTWAScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Certainly! The concept of using software-based interventions like pop-up reminders or notifications can be an effective strategy for addressing financial mental health, particularly when it comes to encouraging mindful spending and financial awareness. Here are a few ideas for how such a system could be implemented:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Budgeting Apps with Reminders</Text>: Integrate pop-ups within budgeting or financial apps that remind users of their financial goals or upcoming bills when they open social media apps. These can serve as gentle reminders to consider their financial situation before making impulsive spending decisions.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Browser Extensions</Text>: Develop browser extensions that detect when users spend excessive time on shopping websites or social media platforms known for targeted ads. These extensions could trigger a reminder about their monthly budget or display a financial tip.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Personal Finance Chatbots</Text>: Implement chatbots in messaging apps that can interact with users, providing friendly reminders about spending limits or savings goals directly in conversations. These chatbots could offer quick tips or answer questions about budgeting.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Digital Wellbeing Tools</Text>: Encourage the use of digital wellbeing tools that monitor screen time on social media and offer scheduled financial check-ins. These tools can suggest taking breaks to review personal finances or engage with financial educational content.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Social Media Integrations</Text>: Work with social media platforms to create integrations where users can opt-in to financial health pop-ups. These might include prompts about recent spending patterns or challenges to save a little extra each week.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindful Spending Apps</Text>: Create apps specifically designed to build the habit of mindful spending. These apps could periodically pop up reminders about staying within budget right before users make online purchases or withdrawals.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Financial Literacy Games</Text>: Develop gamified experiences that provide financial education in short bursts integrated into social media feeds. These games can reward users for participating and learning, making financial education more engaging.
</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mood and Expense Tracking Tools</Text>: Combine mood tracking with expense tracking, allowing users to reflect on how their spending habits relate to their emotional well-being. Pop-ups could encourage journaling about financial emotions before engaging in retail therapy.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           
      </Text>
      <Text style={styles.paragraph}>
        It’s important to balance these interventions so they are supportive rather than intrusive. Offering users customization options for how and when they receive notifications can enhance user experience and effectiveness.
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

export default FinancialMentalHealth_CHATANYSOFTWAScreen;
