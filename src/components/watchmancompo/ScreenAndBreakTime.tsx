import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const ScreenAndBreakTime = () => {
  // State for Screen Time
  const [screenTime, setScreenTime] = useState<string | null>(null);
  const screenIntervals = ["5 min", "15 min", "30 min", "custom"];

  // State for Break Time
  const [breakTime, setBreakTime] = useState<string | null>(null);
  const breakIntervals = ["1 hr", "2 hr", "3 hr", "custom"];

  // Reset Functions
  const resetScreenTime = () => setScreenTime(null);
  const resetBreakTime = () => setBreakTime(null);

  return (
    <View style={styles.container}>
      {/* Screen Time Section */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.title}>Set Screen Time</Text>
          <TouchableOpacity onPress={resetScreenTime}>
            <Text style={styles.reset}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.options}>
          {screenIntervals.map((interval, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                screenTime === interval && styles.selectedButton,
              ]}
              onPress={() => setScreenTime(interval)}
            >
              <Text
                style={[
                  styles.optionText,
                  screenTime === interval && styles.selectedText,
                ]}
              >
                {interval}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Break Time Section */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.title}>Set Break Time</Text>
          <TouchableOpacity onPress={resetBreakTime}>
            <Text style={styles.reset}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.options}>
          {breakIntervals.map((interval, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                breakTime === interval && styles.selectedButton,
              ]}
              onPress={() => setBreakTime(interval)}
            >
              <Text
                style={[
                  styles.optionText,
                  breakTime === interval && styles.selectedText,
                ]}
              >
                {interval}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
  section: {
    marginBottom: 16,
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
    flexDirection: "row", // Horizontal row of options
    flexWrap: "nowrap", // Prevent wrapping
    marginTop: 10,
    justifyContent: "space-between", // Evenly distribute space
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

export default ScreenAndBreakTime;