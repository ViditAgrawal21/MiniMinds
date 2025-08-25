import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const DifficultyLevel = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const handleReset = () => {
    setSelectedLevel(null); // Clear the selected level
  };

  const handleSelect = (level: number) => {
    setSelectedLevel(level); // Set the selected level
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Difficulty Level</Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Set a difficulty Level</Text>

      {/* Difficulty Levels */}
      <View style={styles.difficultyLevels}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.circle,
              selectedLevel === index && styles.selectedCircle, // Highlight if selected
            ]}
            onPress={() => handleSelect(index)}
          />
        ))}
      </View>

      {/* Helper Text */}
      <Text style={styles.helperText}>
        Helps decide your intervention intensity during the period!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1, // For Android shadow
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8A56AC",
  },
  reset: {
    fontSize: 12,
    color: "#8A56AC",
    textDecorationLine: "underline",
  },
  subtitle: {
    fontSize: 14,
    color: "#6A6A6A",
    marginVertical: 10,
    textAlign: "center",
  },
  difficultyLevels: {
    flexDirection: "row",
    justifyContent: "center", // Center align the circles
    marginVertical: 10,
  },
  circle: {
    width: 27, 
    height: 27,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    marginHorizontal: 8, // Reduce horizontal spacing between circles
  },
  selectedCircle: {
    backgroundColor: "#8A56AC", // Highlight color for selected level
    borderColor: "#8A56AC",
  },
  helperText: {
    fontSize: 12,
    color: "#6A6A6A",
    marginTop: 10,
    textAlign: "center",
  },
});

export default DifficultyLevel;