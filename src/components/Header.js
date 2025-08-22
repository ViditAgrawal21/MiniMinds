import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const Header = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  style,
  titleStyle,
  showBackButton = true,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onLeftPress}>
              {leftIcon || <Text style={styles.backText}>←</Text>}
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.centerSection}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
        
        <View style={styles.rightSection}>
          {rightIcon && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onRightPress}>
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  leftSection: {
    width: 50,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 50,
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  backText: {
    fontSize: 24,
    color: '#007AFF',
  },
});

export default Header;
