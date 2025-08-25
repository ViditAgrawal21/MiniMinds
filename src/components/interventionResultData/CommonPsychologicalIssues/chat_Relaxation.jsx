import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CommonPsychologicalIssues_CHATRELAXATIONScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Yoga and meditation can be incredibly beneficial for addressing common psychological issues such as stress, anxiety, depression, and more. Here is a general guide to using yoga and meditation for these purposes:
      </Text>
      <Text style={styles.subtitle}>
        Yoga for Psychological Well-being
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>1. Breathing Exercises (Pranayama):</Text>
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Deep Breathing:</Text> Sit comfortably, close your eyes, and take slow, deep breaths. Inhale through the nose, hold for a moment, and exhale slowly through the mouth. Repeat for 5-10 minutes.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Alternate Nostril Breathing (Nadi Shodhana):</Text> Use your right thumb to close your right nostril. Inhale deeply through the left nostril, then close it with your right ring finger. Open your right nostril and exhale through it. Inhale through the right nostril, close it, and exhale through the left. Continue for 5-10 minutes.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>2. Gentle Yoga Poses:</Text>
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Child’s Pose (Balasana):</Text> Kneel on the floor, sit back on your heels, and stretch your arms forward on the ground. Rest your forehead on the mat and breathe deeply.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Cat-Cow Stretch:</Text> Get on all fours, arch your back (cat), and then lower your belly while lifting your head and tailbone (cow). Move between these positions with your breath.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Legs-Up-the-Wall Pose (Viparita Karani):</Text> Lie on your back with your legs extended up against a wall. This restorative pose helps in calming the mind.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>3. Mindful Movement and Stretching:</Text>
      </Text>
      <Text style={styles.paragraph}>
           - Practice slow, mindful yoga flows such as a gentle Sun Salutation. Focus on synchronizing your breath with movement to increase mindfulness.
      </Text>
      <Text style={styles.subtitle}>
        Meditation for Psychological Well-being
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>1. Guided Meditation:</Text>
      </Text>
      <Text style={styles.paragraph}>
           - Use guided meditation apps or recordings. These often walk you through a calming visualization or relaxation sequence, which can be helpful for stress and anxiety.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>2. Mindfulness Meditation:</Text>
      </Text>
      <Text style={styles.paragraph}>
           - Sit in a comfortable position, close your eyes, and begin focusing your attention on the natural rhythm of your breath. When your mind wanders, gently bring it back to the sensation of breathing. Start with 5-10 minutes daily, gradually increasing the duration as you become more comfortable.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>3. Loving-Kindness Meditation (Metta):</Text>
      </Text>
      <Text style={styles.paragraph}>
           - Sit comfortably and close your eyes. Begin by cultivating feelings of compassion and love for yourself, repeating phrases like "May I be happy, may I be healthy." Gradually extend these wishes to others, including loved ones, acquaintances, and even those with whom you have difficulties.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>4. Body Scan Meditation:</Text>
      </Text>
      <Text style={styles.paragraph}>
           - Lie down comfortably and close your eyes. Slowly bring your attention to each part of your body, starting from the toes to the head, noticing any sensations without judgment. This practice can help release tension and increase body awareness.
      </Text>
      <Text style={styles.subtitle}>
        Tips for Consistency and Effectiveness
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Set a Regular Schedule:</Text> Integrate yoga and meditation into your daily routine, even if it’s just for a few minutes each day.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Create a Calming Environment:</Text> Find a quiet space where you feel at ease, free from distractions.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Be Patient:</Text> Progress may be slow, and some days will be better than others. Be patient with yourself and acknowledge your efforts.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Practice with Intention:</Text> Approach each session with a clear intention, such as calming your mind or releasing tension.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>5.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Seek Support:</Text> Consider joining a class or group, either in person or online, to help stay motivated and learn from others.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        Yoga and meditation are complementary to, not replacements for, professional mental health treatment. If you are dealing with significant psychological issues, seek advice from a mental health professional.
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

export default CommonPsychologicalIssues_CHATRELAXATIONScreen;
