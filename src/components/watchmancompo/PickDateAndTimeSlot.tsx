import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import CustomIcon from "../CustomIcon";

const PickDateAndTimeSlot = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const days = [
    { label: "M", value: "Monday" },
    { label: "T", value: "Tuesday" },
    { label: "W", value: "Wednesday" },
    { label: "T", value: "Thursday" },
    { label: "F", value: "Friday" },
    { label: "S", value: "Saturday" },
    { label: "S", value: "Sunday" },
  ];

  const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>([]);

  const toggleDaySelection = (value: string) => {
    if (selectedDays.includes(value)) {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    } else {
      setSelectedDays([...selectedDays, value]);
    }
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { start: "", end: "" }]);
  };

  const updateTimeSlot = (index: number, field: "start" | "end", value: string) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index][field] = value;
    setTimeSlots(updatedSlots);
  };

  const resetSelections = () => {
    setSelectedDays([]);
    setTimeSlots([]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Pick Date</Text>
        <TouchableOpacity onPress={resetSelections}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Days Selector */}
      <View style={styles.daysContainer}>
        {days.map(({ label, value }, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayButton,
              selectedDays.includes(value) && styles.selectedDayButton,
            ]}
            onPress={() => toggleDaySelection(value)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDays.includes(value) && styles.selectedDayText,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time Slot Section */}
      <Text style={styles.sectionTitle}>Add Time Slot</Text>
      {timeSlots.map((slot, index) => (
        <View key={index} style={styles.timeSlotContainer}>
          <TextInput
            placeholder="Start Time"
            style={styles.timeInput}
            value={slot.start}
            onChangeText={(value) => updateTimeSlot(index, "start", value)}
          />
          <Text style={styles.dash}>-</Text>
          <TextInput
            placeholder="End Time"
            style={styles.timeInput}
            value={slot.end}
            onChangeText={(value) => updateTimeSlot(index, "end", value)}
          />
          <CustomIcon type="IO" name="create-outline" size={20} color="#8A56AC" />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addTimeSlot}>
        <CustomIcon type="IO" name="add-circle-outline" size={24} color="#8A56AC" />
      </TouchableOpacity>
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
    elevation: 1,
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
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  selectedDayButton: {
    backgroundColor: "#8A56AC",
    borderColor: "#8A56AC",
  },
  dayText: {
    fontSize: 14,
    color: "#6A6A6A",
  },
  selectedDayText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8A56AC",
    marginBottom: 10,
  },
  timeSlotContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timeInput: {
    borderBottomWidth: 1,
    borderColor: "#8A56AC",
    width: 80,
    marginRight: 10,
  },
  dash: {
    marginHorizontal: 5,
    fontSize: 16,
    color: "#6A6A6A",
  },
  addButton: {
    alignSelf: "flex-end",
  },
});

export default PickDateAndTimeSlot;