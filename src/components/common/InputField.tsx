import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  accessibilityLabel?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      accessibilityLabel={accessibilityLabel}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    borderWidth: 3,
    borderColor: "#AB47BC",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 30,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#1a1a1a",
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    marginBottom: 16,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 50,
    alignSelf: "stretch",
  },
});

export default InputField;
