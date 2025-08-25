import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const DurationSelector = () => {
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  const durations = ["1 Week", "2 Weeks", "3 Weeks", "Custom"];

  const handleReset = () => {
    setSelectedDuration(null); // Clear the selected duration
  };

  const handleSelect = (duration: string) => {
    setSelectedDuration(duration); // Set the selected duration
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Set Duration</Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Options Section */}
      <View style={styles.options}>
        {durations.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedDuration === item && styles.selectedButton, // Highlight if selected
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text
              style={[
                styles.optionText,
                selectedDuration === item && styles.selectedText, // Highlight text if selected
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  options: {
    flexDirection: "row", // Ensures items are in a row
    flexWrap: "nowrap", // Prevent wrapping
    marginTop: 10,
    justifyContent: "space-between", // Distribute space evenly
  },
  optionButton: {
    paddingVertical: 8, // Reduce vertical padding
    paddingHorizontal: 15, // Reduce horizontal padding to fit all buttons
    borderRadius: 25,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#8A56AC",
    borderColor: "#8A56AC",
  },
  optionText: {
    fontSize: 14,
    color: "#6A6A6A",
  },
  selectedText: {
    color: "#FFFFFF", // Highlight text when selected
    fontWeight: "600",
  },
});

export default DurationSelector;