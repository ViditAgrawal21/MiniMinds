import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const GeneralPhysicalFitness_CHAT10COMMONScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        When it comes to general physical fitness, there are several common suggestions that can help improve your overall health and well-being. Here are 10 suggestions along with examples of how they can be implemented:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Regular Exercise Routine:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> Engage in at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week. This can be broken down into 30-minute sessions, 5 days a week. A brisk walk, cycling, or swimming can be moderate activities, while running or jumping rope can be more vigorous.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Strength Training:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> Include strength training exercises for all major muscle groups at least two times a week. This can include weightlifting, bodyweight exercises like push-ups and squats, or using resistance bands.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Balanced Diet:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> Eat a variety of foods from all the food groups to get a range of nutrients. Incorporate lean proteins, whole grains, fruits, vegetables, and healthy fats into your meals. Limit processed foods and sugar.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Stay Hydrated:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> Aim to drink at least 8 cups (64 ounces) of water a day, though individual needs may vary. Increase water intake during hotter weather or when exercising a lot.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Get Enough Sleep:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> Aim for 7-9 hours of quality sleep per night. Maintain a consistent sleep schedule, even on weekends, and create a restful sleep environment by limiting screen time before bed.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Flexibility and Stretching:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> Incorporate stretching or flexibility exercises into your routine at least two to three times per week. Consider yoga or simple stretching exercises after workouts to improve flexibility and prevent injury.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Active Lifestyle:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> Incorporate more movement into your daily routine. Take the stairs instead of the elevator, walk or bike for short trips, and take frequent breaks to stand up and stretch while working.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Monitor Progress:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> Keep a fitness journal or use a fitness app to track your workouts, diet, and progress toward your goals. This can help keep you motivated and on track.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Rest and Recovery:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Example:</Text> Schedule regular rest days to allow your body to recover, especially after high-intensity workouts. Listen to your body and incorporate active rest, like light walking, on rest days.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Set Realistic Goals:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            - <Text style={styles.bold}>Example:</Text> Set Specific, Measurable, Achievable, Relevant, and Time-bound (SMART) goals. For instance, aim to run a 5k within a certain timeframe or increase your bench press by 10% over three months.
      </Text>
      <Text style={styles.paragraph}>
        By incorporating these suggestions into your lifestyle, you can work towards achieving and maintaining general physical fitness and overall health.
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

export default GeneralPhysicalFitness_CHAT10COMMONScreen;
