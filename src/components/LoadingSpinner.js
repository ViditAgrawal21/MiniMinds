import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const LoadingSpinner = ({
  size = 'large',
  color = '#007AFF',
  style = null,
  overlay = false,
}) => {
  if (overlay) {
    return (
      <View style={[styles.overlay, style]}>
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={size} color={color} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  spinnerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
});

export default LoadingSpinner;
