import React from "react";
import { Text, StyleSheet } from "react-native";

interface RadioButtonTextProps {
  children: React.ReactNode;
  style?: any;
}

const RadioButtonText: React.FC<RadioButtonTextProps> = ({
  children,
  style,
}) => {
  return <Text style={[styles.radioText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  radioText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    marginLeft: 5,
    color: "#545353",
  },
});

export default RadioButtonText;
