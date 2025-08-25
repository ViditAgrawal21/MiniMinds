import React from "react";
import { Dimensions, StyleSheet, ViewStyle, TouchableOpacity, Text, TextStyle } from "react-native";

type Props = {
  label: string;
  callback: () => void;
  style?: ViewStyle; // Allow custom styles to be passed
  textStyle?: TextStyle; // Allow custom text styles to be passed
  disabled?: boolean; // Add disabled state
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const PrimaryButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        props.style,
        props.disabled && styles.disabledButton
      ]} // Merge default and custom styles
      onPress={() => !props.disabled && props.callback()}
      activeOpacity={0.7}
      disabled={props.disabled}
    >
      <Text style={[
        styles.buttonText, 
        props.textStyle,
        props.disabled && styles.disabledButtonText
      ]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 0,
    backgroundColor: "#D27AD5",
    borderRadius: 10,
    marginBottom: 10,
    height: screenHeight * 0.07,
    width: screenWidth * 0.79,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 48,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  disabledButton: {
    backgroundColor: "#C0C0C0",
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    lineHeight: 28,
    textAlign: "center",
  },
  disabledButtonText: {
    color: "#888",
  },
});

export default PrimaryButton;
