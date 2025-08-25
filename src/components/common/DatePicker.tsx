import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";

interface DatePickerProps {
  date: Date | null;
  onDateChange: (event: any, selectedDate?: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, onDateChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    onDateChange(event, selectedDate);
  };

  return (
    <View>
      <Pressable
        style={[styles.input, styles.datePicker]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={date ? styles.dateText : styles.placeholderText}>
          {date ? date.toLocaleDateString() : ""}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color="#D27AD5"
          style={styles.dropdownIcon}
        />
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "spinner"}
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    borderWidth: 3,
    borderColor: "#AB47BC",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 30,
    marginBottom: 16,
    marginTop: 5,
    marginLeft: 15,
  },
  datePicker: {
    // Add specific styles if needed
  },
  placeholderText: {
    color: "#aaa",
    flex: 1,
    textAlignVertical: "center",
  },
  dateText: {
    color: "#000",
    fontSize: 16,
  },
  dropdownIcon: {
    position: "absolute",
    right: 12,
  },
});

export default DatePicker;
