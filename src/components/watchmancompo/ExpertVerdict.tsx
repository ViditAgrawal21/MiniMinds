import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ExpertVerdict = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expert Verdict</Text>
      <Text style={styles.description}>
        Will be available when you complete this intervention
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1, // For Android shadow
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8A56AC",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6A6A6A",
    fontStyle: "italic", // Matches the italicized text in the image
  },
});

export default ExpertVerdict;