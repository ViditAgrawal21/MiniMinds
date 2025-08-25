import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

// Mock data for each day (colors represent activity levels)
const calendarData = [
  ["#FFCDD2", "#E0E0E0", "#C8E6C9", "#BBDEFB", "#C8E6C9", "#FFCDD2", "#E0E0E0"], // Week 1
  ["#C8E6C9", "#BBDEFB", "#C8E6C9", "#BBDEFB", "#C8E6C9", "#FFCDD2", "#FFCDD2"], // Week 2
  ["#FFCDD2", "#BBDEFB", "#C8E6C9", "#E0E0E0", "#BBDEFB", "#C8E6C9", "#E0E0E0"], // Week 3
  ["#FFCDD2", "#FFCDD2", "#C8E6C9", "#BBDEFB", "#E0E0E0", "#E0E0E0", "#E0E0E0"], // Week 4
];

// Get screen width for adaptive sizing
const screenWidth = Dimensions.get("window").width;

const CalendarPlot = () => {
  return (
    <View style={styles.container}>
      {/* Day labels */}
      <View style={styles.dayLabels}>
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <Text key={index} style={styles.dayLabel}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar rows */}
      {calendarData.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.weekRow}>
          {week.map((color, dayIndex) => (
            <View
              key={dayIndex}
              style={[styles.dayBlock, { backgroundColor: color }]}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 40, // Fit the screen width with padding
    alignSelf: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 110,
  },
  dayLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    flex: 1, // Equal space for each label
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  dayBlock: {
    width: (screenWidth - 80) / 7, // Equal width for each day
    height: (screenWidth - 80) / 7, // Square blocks
    borderRadius: 5,
  },
});

export default CalendarPlot;
