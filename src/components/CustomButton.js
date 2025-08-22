import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  loading = false,
  disabled = false,
  variant = 'primary',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        style,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.buttonText, styles[`${variant}Text`], textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#007AFF',
  },
  outlineText: {
    color: '#007AFF',
  },
});

export default CustomButton;
