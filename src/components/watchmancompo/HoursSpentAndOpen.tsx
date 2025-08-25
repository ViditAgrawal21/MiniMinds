import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const HoursSpentAndOpen = () => {
  // State for Hours Spent
  const [hoursSpent, setHoursSpent] = useState<string | null>(null);
  const hoursIntervals = ["1 hr", "2 hr", "3 hr", "custom"];

  // State for Times Opened
  const [timesOpened, setTimesOpened] = useState<string | null>(null);
  const timesIntervals = ["5", "10", "15", "custom"];

  // Reset Functions
  const resetHoursSpent = () => setHoursSpent(null);
  const resetTimesOpened = () => setTimesOpened(null);

  return (
    <View style={styles.container}>
      {/* Hours Spent Section */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.title}>Hours Spent</Text>
          <TouchableOpacity onPress={resetHoursSpent}>
            <Text style={styles.reset}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.options}>
          {hoursIntervals.map((interval, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                hoursSpent === interval && styles.selectedButton,
              ]}
              onPress={() => setHoursSpent(interval)}
            >
              <Text
                style={[
                  styles.optionText,
                  hoursSpent === interval && styles.selectedText,
                ]}
              >
                {interval}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Number of Times Opened Section */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.title}>Number of times opened</Text>
          <TouchableOpacity onPress={resetTimesOpened}>
            <Text style={styles.reset}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.options}>
          {timesIntervals.map((interval, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                timesOpened === interval && styles.selectedButton,
              ]}
              onPress={() => setTimesOpened(interval)}
            >
              <Text
                style={[
                  styles.optionText,
                  timesOpened === interval && styles.selectedText,
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
    flexDirection: "row",
    flexWrap: "nowrap",
    marginTop: 10,
    justifyContent: "space-between",
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
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
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default HoursSpentAndOpen;