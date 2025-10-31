import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      {options.map((option, index) => (
        <Pressable
          key={option}
          onPress={() => onValueChange(option)}
          style={styles.radioItem}
        >
          <View
            style={[
              styles.radioButton,
              selectedValue === option && styles.radioButtonSelected,
            ]}
          >
            {selectedValue === option && <View style={styles.radioButtonInner} />}
          </View>
          <RadioButtonText>{option}</RadioButtonText>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFB84D",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioButtonSelected: {
    borderColor: "#FF8C00",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF8C00",
  },
});

export default RadioButtonGroup;
