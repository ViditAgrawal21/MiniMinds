import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CommonPsychologicalIssues_CHATYOGAANDMScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Yoga and meditation can be quite beneficial in addressing common psychological issues such as stress, anxiety, and depression. Here are some general steps and practices that might aid in managing these challenges:
      </Text>
      <Text style={styles.subtitle}>
        Yoga Practices
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Breath Awareness (Pranayama):</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Deep Breathing</Text>: Sit or lie down comfortably. Inhale deeply through the nose, hold for a moment, and exhale slowly through the mouth. Repeat for at least 5 minutes.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Alternate Nostril Breathing</Text>: Close your right nostril with your thumb, inhale through the left nostril, then close the left nostril and exhale through the right. Alternate for 5-10 cycles.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Yoga Postures (Asanas):</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Child's Pose (Balasana)</Text>: Kneel on the floor, sit back on your heels, and stretch your arms forward while lowering your forehead to the mat. This pose is calming and helps relieve stress.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Cat-Cow Pose (Marjaryasana/Bitilasana)</Text>: Move between these poses to alleviate tension in the spine and promote relaxation.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Legs-Up-the-Wall Pose (Viparita Karani)</Text>: Lie on your back with your legs extended up against a wall. This restorative pose can help reduce anxiety and fatigue.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindfulness and Body Awareness:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Focus on the sensations in your body during each pose. Be present in the moment, noticing how your body moves and responds.
      </Text>
      <Text style={styles.subtitle}>
        Meditation Practices
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindfulness Meditation:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Find a quiet place to sit comfortably. Close your eyes and pay attention to your breath. Notice each inhale and exhale. When your mind wanders, gently bring your focus back to your breath.
      </Text>
      <Text style={styles.paragraph}>
           - Practice for 10-20 minutes daily.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Guided Meditation:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Use a guided meditation app or audio track that focuses on relaxation or stress reduction. Allow the guidance to lead you through visualization and deep relaxation.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Body Scan Meditation:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Lie down comfortably. Focus on each part of your body, starting from the toes and moving up to the head. Notice any tension and consciously relax each area.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Loving-Kindness Meditation (Metta):</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Sit quietly and bring your attention to your heart. Mentally repeat phrases like “May I be happy, may I be healthy, may I be at peace.” Extend these wishes to others in your life and to all living beings.
      </Text>
      <Text style={styles.subtitle}>
        General Tips
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Consistency</Text>: Practice regularly, even if it's just 10 minutes a day.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Environment</Text>: Create a calming atmosphere for your practice, perhaps with soft lighting, comfortable cushions, or soothing music.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Combining Practices</Text>: Sometimes combining yoga and meditation in a single session can enhance the benefits.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Seek Professional Help</Text>: While yoga and meditation can help, it's important to seek professional mental health support if needed.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        These practices can help foster a peaceful mind, better emotional regulation, and a more positive outlook on life.
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

export default CommonPsychologicalIssues_CHATYOGAANDMScreen;
