import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const GeneralPhysicalFitness_CHATLINKTOUSScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        To help you explore resources for general physical fitness, here’s a list of books, movies, motivational videos, and music therapy options:
      </Text>
      <Text style={styles.subtitle}>
        Books:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>"The Fitness Mindset" by Brian Keane</Text> - Offers a complete guide on fitness, nutrition, and mindset to help achieve your fitness goals.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>"Born to Run" by Christopher McDougall</Text> - An exciting read that explores the natural aspects of running and endurance, intertwined with an engaging narrative.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>"You Are Your Own Gym" by Mark Lauren</Text> - A practical guide on harnessing the power of bodyweight exercises for fitness.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>4.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>"Atomic Habits" by James Clear</Text> - While not exclusively about fitness, it offers insights on building habits, including those related to fitness and health.
</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        Movies:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>"Pumping Iron" (1977)</Text> - A classic documentary featuring Arnold Schwarzenegger that explores the world of bodybuilding.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>2.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>"The Game Changers" (2018)</Text> - A documentary that examines plant-based eating in elite sports.
</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>3.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>"Rocky" series</Text> - These films, especially the first two, remain motivational classics for their portrayal of grit, determination, and the physical training journey.
</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        Motivational Videos:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>YouTube Channels</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Athlean-X</Text>: Offers straightforward exercise tutorials and advice on injury prevention.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Fitness Blender</Text>: Provides a variety of free, full-length workout videos for all fitness levels.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>TED Talks</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>"Why some people find exercise harder than others" by Emily Balcetis</Text> - Interesting perspective on motivation and perception in fitness.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>"The brain-changing benefits of exercise" by Wendy Suzuki</Text> - Explores how exercise can transform your brain.
      </Text>
      <Text style={styles.subtitle}>
        Music Therapy:
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Spotify Playlists</Text>: 
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>"Motivational Workout"</Text>: An energetic playlist perfect for boosting motivation and enhancing workout performance.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>"Essential Running Playlists"</Text>: Curated playlists with high-tempo tracks to keep you energized throughout your run.
      </Text>
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Text style={styles.bulletNumber}>1.</Text>
          <Text style={styles.listText}><Text style={styles.bold}>Apps for Music in Fitness</Text>:
</Text>
        </View>
      </View>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>RockMyRun</Text>: Provides music mixes that adjust the tempo of the music to match your workout pace.
      </Text>
      <Text style={styles.paragraph}>
           - <Text style={styles.bold}>Fit Radio</Text>: Offers DJ-curated mixes based on workout preferences and energy levels.
      </Text>
      <Text style={styles.paragraph}>
        These resources cater to a wide variety of interests and can support your journey to improved physical fitness.
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

export default GeneralPhysicalFitness_CHATLINKTOUSScreen;
