import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const GeneralPhysicalFitness_RGIVEME10Screen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        To assign scores from 1 to 5 for each question based on the Likert scale, we need to consider the context of each question and how it relates to general physical fitness. A score of 5 indicates a high level of well-being or fitness, while a score of 1 indicates a low level. Here's the reasoning and scoring for each question:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Cardiovascular Endurance:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Option: 1 (Very Poor) to 5 (Excellent)
      </Text>
      <Text style={styles.paragraph}>
           - Reasoning: Cardiovascular endurance is a key component of physical fitness. A higher score indicates better endurance and overall cardiovascular health.
      </Text>
      <Text style={styles.paragraph}>
           - Score: 1 (Very Poor), 2 (Poor), 3 (Average), 4 (Good), 5 (Excellent)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Muscular Strength:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Option: 1 (Not Confident at All) to 5 (Very Confident)
      </Text>
      <Text style={styles.paragraph}>
           - Reasoning: Confidence in lifting or carrying heavy objects reflects muscular strength. Higher scores indicate greater strength and confidence.
      </Text>
      <Text style={styles.paragraph}>
           - Score: 1 (Not Confident at All), 2 (Slightly Confident), 3 (Moderately Confident), 4 (Confident), 5 (Very Confident)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Muscular Endurance:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Option: 1 (Very Poor) to 5 (Excellent)
      </Text>
      <Text style={styles.paragraph}>
           - Reasoning: The ability to perform repetitive tasks without tiring is a measure of muscular endurance. Higher scores indicate better endurance.
      </Text>
      <Text style={styles.paragraph}>
           - Score: 1 (Very Poor), 2 (Poor), 3 (Average), 4 (Good), 5 (Excellent)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Flexibility:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Option: 1 (Very Poor) to 5 (Excellent)
      </Text>
      <Text style={styles.paragraph}>
           - Reasoning: Flexibility is important for overall fitness and injury prevention. Higher scores reflect better flexibility.
      </Text>
      <Text style={styles.paragraph}>
           - Score: 1 (Very Poor), 2 (Poor), 3 (Average), 4 (Good), 5 (Excellent)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Balance and Coordination:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Option: 1 (Very Poor) to 5 (Excellent)
      </Text>
      <Text style={styles.paragraph}>
           - Reasoning: Good balance and coordination are essential for effective physical activity and reducing injury risk. Higher scores indicate better balance and coordination.
      </Text>
      <Text style={styles.paragraph}>
           - Score: 1 (Very Poor), 2 (Poor), 3 (Average), 4 (Good), 5 (Excellent)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Energy Levels:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Option: 1 (Very Low) to 5 (Very High)
      </Text>
      <Text style={styles.paragraph}>
           - Reasoning: High energy levels are indicative of good physical fitness and well-being. Higher scores reflect higher energy levels.
      </Text>
      <Text style={styles.paragraph}>
           - Score: 1 (Very Low), 2 (Low), 3 (Moderate), 4 (High), 5 (Very High)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Recovery:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Option: 1 (Very Slowly) to 5 (Very Quickly)
      </Text>
      <Text style={styles.paragraph}>
           - Reasoning: Quick recovery from exertion suggests good physical fitness and efficient body function. Higher scores indicate faster recovery.
      </Text>
      <Text style={styles.paragraph}>
           - Score: 1 (Very Slowly), 2 (Slowly), 3 (Moderately), 4 (Quickly), 5 (Very Quickly)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Overall Physical Health:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Option: 1 (Very Poor) to 5 (Excellent)
      </Text>
      <Text style={styles.paragraph}>
           - Reasoning: Overall physical health is a comprehensive measure of fitness. Higher scores indicate better health.
      </Text>
      <Text style={styles.paragraph}>
           - Score: 1 (Very Poor), 2 (Poor), 3 (Average), 4 (Good), 5 (Excellent)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Frequency of Physical Activity:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - Option: 1 (Rarely/Never) to 5 (Very Frequently)
      </Text>
      <Text style={styles.paragraph}>
           - Reasoning: Regular physical activity is crucial for maintaining fitness. Higher scores reflect more frequent activity.
      </Text>
      <Text style={styles.paragraph}>
           - Score: 1 (Rarely/Never), 2 (Occasionally), 3 (Sometimes), 4 (Frequently), 5 (Very Frequently)
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Satisfaction with Physical Fitness:</Text>
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
            - Option: 1 (Very Dissatisfied) to 5 (Very Satisfied)
      </Text>
      <Text style={styles.paragraph}>
            - Reasoning: Satisfaction with fitness level reflects personal perception and motivation. Higher scores indicate greater satisfaction.
      </Text>
      <Text style={styles.paragraph}>
            - Score: 1 (Very Dissatisfied), 2 (Dissatisfied), 3 (Neutral), 4 (Satisfied), 5 (Very Satisfied)
      </Text>
      <Text style={styles.paragraph}>
        By following this reasoning, each question is scored in a way that aligns with the overall goal of assessing general physical fitness and well-being.
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

export default GeneralPhysicalFitness_RGIVEME10Screen;
