import React from "react";
import { Dimensions, StyleSheet, ViewStyle, TouchableOpacity, Text, TextStyle } from "react-native";

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

type Props = {
  label: string;
  callback: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CustomButton = (props: Props) => {
  const {
    label,
    callback,
    variant = 'primary',
    style,
    textStyle,
    disabled = false,
    loading = false,
    fullWidth = false,
  } = props;

  const getButtonStyle = () => {
    const baseStyle = [
      styles.button,
      fullWidth && styles.fullWidth,
      disabled && styles.disabledButton,
    ];

    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primaryButton];
      case 'secondary':
        return [...baseStyle, styles.secondaryButton];
      case 'outline':
        return [...baseStyle, styles.outlineButton];
      case 'ghost':
        return [...baseStyle, styles.ghostButton];
      default:
        return [...baseStyle, styles.primaryButton];
    }
  };

  const getTextStyle = () => {
    const baseStyle = [
      styles.buttonText,
      disabled && styles.disabledButtonText,
    ];

    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primaryButtonText];
      case 'secondary':
        return [...baseStyle, styles.secondaryButtonText];
      case 'outline':
        return [...baseStyle, styles.outlineButtonText];
      case 'ghost':
        return [...baseStyle, styles.ghostButtonText];
      default:
        return [...baseStyle, styles.primaryButtonText];
    }
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={() => !disabled && !loading && callback()}
      activeOpacity={0.7}
      disabled={disabled || loading}
    >
      <Text style={[...getTextStyle(), textStyle]}>
        {loading ? 'Loading...' : label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    marginBottom: 10,
    height: screenHeight * 0.07,
    width: screenWidth * 0.79,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 48,
    paddingHorizontal: 16,
  },
  fullWidth: {
    width: '100%',
  },
  // Primary Button (default)
  primaryButton: {
    backgroundColor: "#D27AD5",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  primaryButtonText: {
    color: "#fff",
  },
  // Secondary Button
  secondaryButton: {
    backgroundColor: "#6C757D",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondaryButtonText: {
    color: "#fff",
  },
  // Outline Button
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#D27AD5",
  },
  outlineButtonText: {
    color: "#D27AD5",
  },
  // Ghost Button
  ghostButton: {
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
  },
  ghostButtonText: {
    color: "#D27AD5",
  },
  // Disabled state
  disabledButton: {
    backgroundColor: "#C0C0C0",
    elevation: 0,
    shadowOpacity: 0,
    borderColor: "#C0C0C0",
  },
  disabledButtonText: {
    color: "#888",
  },
  // Base text style
  buttonText: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
    lineHeight: 28,
    textAlign: "center",
  },
});

export default CustomButton;
