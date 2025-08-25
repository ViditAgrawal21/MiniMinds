import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FamilyandRelaitonship_CHATRELAXATIONScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Yoga and meditation can be powerful tools for improving family and relationship issues by promoting relaxation, emotional balance, and personal insight. Here’s a gentle guide on how you can use these practices:
      </Text>
      <Text style={styles.subtitle}>
        Yoga for Family and Relationships
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>1. Heart-Opening Poses:</Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Camel Pose (Ustrasana):</Text> Opens the chest and heart, promoting emotional release.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Bridge Pose (Setu Bandhasana):</Text> Stretches the spine and opens the chest, encouraging openness and vulnerability.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>2. Grounding Poses:</Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Mountain Pose (Tadasana):</Text> Encourages grounding and stability, promoting a clear and confident mindset.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Tree Pose (Vrksasana):</Text> Improves balance and focus, fostering a sense of stability and patience.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>3. Relaxation Poses:</Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Child’s Pose (Balasana):</Text> Calming and stress-relieving, helps to release tension and reflect inward.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Savasana (Corpse Pose):</Text> Allows for complete relaxation and integration of the practice, helping you to let go of any emotional burdens.
</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        Meditation for Family and Relationships
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>1. Loving-Kindness Meditation (Metta):</Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>This meditation promotes compassion and understanding. Start by focusing on yourself, and then extend feelings of love and kindness to family members, even those with whom you might have conflict.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Steps:</Text>
      </Text>
      <Text style={styles.paragraph}>
           - Sit comfortably and close your eyes.
      </Text>
      <Text style={styles.paragraph}>
           - Take a few deep breaths.
      </Text>
      <Text style={styles.paragraph}>
           - Repeat silently: “May I be happy, may I be well, may I be safe, may I be peaceful and at ease.”
      </Text>
      <Text style={styles.paragraph}>
           - Gradually extend these wishes to family members: “May you be happy, may you be well...”
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>2. Mindfulness Meditation:</Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>Focus on being present, which can help you respond more calmly and thoughtfully in family situations.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Steps:</Text>
      </Text>
      <Text style={styles.paragraph}>
           - Sit comfortably and focus on your breath.
      </Text>
      <Text style={styles.paragraph}>
           - When thoughts arise, observe them without judgment and let them pass.
      </Text>
      <Text style={styles.paragraph}>
           - Bring your attention back to your breath.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>3. Gratitude Meditation:</Text>
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}>This practice helps cultivate an appreciation for your family and relationships, even during challenging times.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Steps:</Text>
      </Text>
      <Text style={styles.paragraph}>
           - Sit quietly and think of things you are grateful for in your family.
      </Text>
      <Text style={styles.paragraph}>
           - Visualize each person, thinking of positive interactions or qualities.
      </Text>
      <Text style={styles.paragraph}>
           - Allow feelings of gratitude to fill your heart.
      </Text>
      <Text style={styles.subtitle}>
        Practical Tips
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Consistency:</Text> Make yoga and meditation a daily practice to fully benefit from their calming and balancing effects.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Breathing Exercises:</Text> Incorporate pranayama (breathing techniques) such as deep abdominal breathing or alternate nostril breathing to reduce stress and improve emotional stability.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Group Practice:</Text> Consider practicing yoga or meditation with family members to strengthen your bond and create mutual understanding and respect.
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
        Remember, change takes time and patience. Regular practice can lead to improved communication, empathy, and a more harmonious family dynamic.
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

export default FamilyandRelaitonship_CHATRELAXATIONScreen;
