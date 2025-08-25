import React from "react";
import { View, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import RadioButtonText from "./RadioButtonText";

interface RadioButtonGroupProps {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  selectedValue,
  onValueChange,
}) => {
  return (
    <View>
      {options.map((option) => (
        <Pressable
          key={option}
          onPress={() => onValueChange(option)}
          style={styles.radioItem}
        >
          <View style={styles.radioItem}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                selectedValue === option && styles.radioButtonSelected,
              ]}
              onPress={() => onValueChange(option)}
            >
              {selectedValue === option && <View style={styles.radioButtonInner} />}
            </TouchableOpacity>
            <RadioButtonText>{option}</RadioButtonText>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -7,
    marginLeft: 3,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D27AD5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 5,
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
});

export default RadioButtonGroup;
