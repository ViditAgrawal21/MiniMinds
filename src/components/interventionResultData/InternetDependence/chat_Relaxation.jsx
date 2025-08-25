import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const InternetDependence_CHATRELAXATIONScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Addressing internet dependence with yoga and meditation involves incorporating mindfulness practices, stress management techniques, and fostering a sense of balance and self-awareness. Here are some yoga and meditation steps that might help you reduce internet dependence:
      </Text>
      <Text style={styles.subtitle}>
        Yoga Practices
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mindful Breathing (Pranayama):</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Nadi Shodhana (Alternate Nostril Breathing):</Text> This helps balance the nervous system and calm the mind. Close your right nostril with your thumb, inhale deeply through your left nostril, and then close it with your ring finger. Release your thumb and exhale through the right nostril. Continue this pattern, alternating nostrils.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Deep Belly Breathing:</Text> Focus on slow, deep breaths to calm your mind. Inhale deeply into your belly, hold for a moment, and exhale slowly.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Grounding Poses:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Mountain Pose (Tadasana):</Text> Stand with feet hip-width apart, grounding through all four corners of the feet. Engage your thighs, lift your chest, and relax your shoulders. Focus on your breath and feel present in the moment.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Tree Pose (Vrksasana):</Text> This balancing pose can help improve concentration and stability. Stand on one leg, placing the sole of the other foot on your inner thigh or calf, then bring your hands to prayer position.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Restorative Poses:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Child’s Pose (Balasana):</Text> Kneel on the floor, sit back on your heels, and stretch your arms forward. Rest your forehead on the ground and breathe deeply. This pose is excellent for relaxation and letting go.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Legs-Up-the-Wall Pose (Viparita Karani):</Text> Lie on your back with your legs extended up against a wall. This pose helps to relax the mind and body.
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
           - Sit comfortably with your back straight and begin to focus on your breath. Notice the sensation of the breath entering and leaving your nostrils. When your mind wanders, gently bring your attention back to your breath. Practice for 5-10 minutes daily.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Body Scan Meditation:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Slowly direct your attention to different parts of your body, starting from your toes and working your way up. Notice any sensations, tension, or areas of relaxation. This practice helps increase awareness and reduces stress.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Guided Meditations:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Use apps or online resources to follow guided meditations that focus on reducing digital dependence and fostering a healthy relationship with technology.
      </Text>
      <Text style={styles.subtitle}>
        Additional Strategies
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Set Boundaries:</Text> Plan specific times when you will use the internet and stick to these boundaries to avoid mindless browsing.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Digital Detox:</Text> Designate certain hours or even a whole day without internet use to reconnect with the physical world around you.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Engage in Offline Activities:</Text> Spend time doing hobbies you enjoy, being in nature, or engaging in social activities that do not rely on the internet.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        Consistency and patience are key in developing new habits and reducing internet dependence. Regularly practicing yoga and meditation will gradually increase your mindfulness, helping you make more conscious decisions about your internet usage.
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

export default InternetDependence_CHATRELAXATIONScreen;
