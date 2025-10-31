import React from "react";
import { Text, StyleSheet } from "react-native";

interface LabelTextProps {
  children: React.ReactNode;
  style?: any;
}

const LabelText: React.FC<LabelTextProps> = ({ children, style }) => {
  return <Text style={[styles.label, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: "#FF8C00",
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    alignSelf: "flex-start",
    marginBottom: 3,
    marginTop: 15,
    marginLeft: 13,
  },
});

export default LabelText;
