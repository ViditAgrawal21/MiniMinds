import React from "react";
import { View, Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";

interface HorizontalRadioButtonGroupProps {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const HorizontalRadioButtonGroup: React.FC<HorizontalRadioButtonGroupProps> = ({
  options,
  selectedValue,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <Pressable
            key={option}
            onPress={() => onValueChange(option)}
            style={styles.radioItemContainer}
          >
            <TouchableOpacity
              style={[
                styles.radioButton,
                selectedValue === option && styles.radioButtonSelected,
              ]}
              onPress={() => onValueChange(option)}
            >
              {selectedValue === option && <View style={styles.radioButtonInner} />}
            </TouchableOpacity>
            <Text style={styles.radioText}>
              {option.includes("Very") ? option.replace(" ", "\n") : option}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  radioItemContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "20%",
    height: 80,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D27AD5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  radioButtonSelected: {
    borderColor: "#AB47BC",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#AB47BC",
  },
  radioText: {
    fontSize: 12, // Updated font size
    fontWeight: "400", // Updated font weight
    fontFamily: "Poppins-Regular", // Updated font family
    marginLeft: 5, // Added margin-left
    color: "#545353", // Updated color
    textAlign: "center", // Ensure text alignment stays consistent
    lineHeight: 16, // Keep consistent line height
  },
});

export default HorizontalRadioButtonGroup;
