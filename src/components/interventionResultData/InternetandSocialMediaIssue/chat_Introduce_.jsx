import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const InternetandSocialMediaIssue_CHATINTRODUCEScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        The advent of the Internet and Social Media Issue has transformed the
        way we communicate, access information, and connect with the world.
        However, this digital revolution has also introduced a range of complex
        issues. Privacy concerns have emerged as personal data is collected and
        shared, often without users' full comprehension or consent.
        Cyberbullying and online harassment pose significant threats,
        particularly to younger users. The spread of misinformation and fake
        news can influence public opinion and undermine trust. Additionally, the
        addictive nature of social media platforms raises mental health
        concerns. Balancing the benefits and challenges of this digital age is a
        critical societal task.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#222",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
    color: "#333",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: "#444",
  },
  listContainer: {
    marginBottom: 15,
    paddingLeft: 10,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bulletNumber: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
    fontWeight: "bold",
    color: "#555",
  },
  listText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: "#444",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
});

export default InternetandSocialMediaIssue_CHATINTRODUCEScreen;
