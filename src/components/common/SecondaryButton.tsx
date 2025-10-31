import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";

type Props = {
  label: string;
  callback: () => void;
  customStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

const { height: screenHeight } = Dimensions.get("window");

const SecondaryButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        props.customStyle,
        props.disabled && styles.disabledButton
      ]}
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
    backgroundColor: "#FFF",
    borderColor: "#FF8C00",
    borderRadius: 10,
    borderWidth: 3,
    marginBottom: 10,
    height: screenHeight * 0.07,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    elevation: 1, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  disabledButton: {
    backgroundColor: "#F5F5F5",
    borderColor: "#C0C0C0",
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: "#FF8C00",
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

export default SecondaryButton;
