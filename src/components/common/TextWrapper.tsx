import React, { ReactNode } from "react";
import { Text } from "react-native";

interface TextWrapperProps {
  children: ReactNode;
  style?: any;
}

/**
 * A simple wrapper component that ensures all string children
 * are wrapped in a Text component to avoid React Native's
 * "Text strings must be rendered within a <Text> component" error
 */
const TextWrapper: React.FC<TextWrapperProps> = ({ children, style }) => {
  // If children is a string or number, wrap it in a Text component
  if (typeof children === "string" || typeof children === "number") {
    return <Text style={style}>{children}</Text>;
  }
  
  // Otherwise, return as is
  return <>{children}</>;
};

export default TextWrapper;
