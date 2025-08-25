import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const GeneralPhysicalFitness_GIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>
        Query: Give me 10 Questions based on the likert scale that we can use to score the symptoms of General Physical Fitness
      </Text>
      <Text style={styles.subtitle}>
        Result:
      </Text>
      <Text style={styles.paragraph}>
        Creating a Likert scale to assess general physical fitness involves designing questions that cover various aspects of fitness, such as strength, endurance, flexibility, and overall well-being. Here are ten questions you might consider:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Cardiovascular Endurance:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How would you rate your ability to engage in aerobic activities (e.g., running, cycling) for extended periods without excessive fatigue?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Very Poor) to 5 (Excellent)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Muscular Strength:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How confident are you in your ability to lift or carry heavy objects without strain?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Not Confident at All) to 5 (Very Confident)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Muscular Endurance:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How well can you perform repetitive physical tasks (e.g., push-ups, sit-ups) without tiring quickly?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Very Poor) to 5 (Excellent)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Flexibility:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How would you rate your ability to perform movements that require flexibility, such as bending or stretching?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Very Poor) to 5 (Excellent)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Balance and Coordination:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How would you assess your balance and coordination during physical activities?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Very Poor) to 5 (Excellent)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Energy Levels:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How would you describe your energy levels throughout the day?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Very Low) to 5 (Very High)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Recovery:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How quickly do you recover from physical exertion or exercise?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Very Slowly) to 5 (Very Quickly)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Overall Physical Health:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How would you rate your overall physical health and fitness?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Very Poor) to 5 (Excellent)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Frequency of Physical Activity:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - How often do you engage in physical exercise or activities each week?
      </Text>
      <Text style={styles.paragraph}>
             - 1 (Rarely/Never) to 5 (Very Frequently)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Satisfaction with Physical Fitness:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            - How satisfied are you with your current level of physical fitness?
      </Text>
      <Text style={styles.paragraph}>
              - 1 (Very Dissatisfied) to 5 (Very Satisfied)
      </Text>
      <Text style={styles.paragraph}>
        These questions can help gauge an individual's perception of their physical fitness across multiple dimensions. Adjust the scale or wording as needed to fit the specific context or population you are assessing.
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

export default GeneralPhysicalFitness_GIVEME10Screen;
