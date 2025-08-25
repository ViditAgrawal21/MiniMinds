import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import CustomButton from './CustomButton';

const ButtonExamples = () => {
  const handlePress = (buttonType: string) => {
    Alert.alert('Button Pressed', `${buttonType} button was pressed!`);
  };

  return (
    <View style={styles.container}>
      {/* Original PrimaryButton */}
      <PrimaryButton
        label="Primary Button"
        callback={() => handlePress('Primary')}
      />

      {/* Original SecondaryButton */}
      <SecondaryButton
        label="Secondary Button"
        callback={() => handlePress('Secondary')}
      />

      {/* Disabled SecondaryButton */}
      <SecondaryButton
        label="Disabled Secondary"
        callback={() => handlePress('Disabled Secondary')}
        disabled={true}
      />

      {/* CustomButton with different variants */}
      <CustomButton
        label="Primary Custom"
        variant="primary"
        callback={() => handlePress('Primary Custom')}
      />

      <CustomButton
        label="Secondary Custom"
        variant="secondary"
        callback={() => handlePress('Secondary Custom')}
      />

      <CustomButton
        label="Outline Button"
        variant="outline"
        callback={() => handlePress('Outline')}
      />

      <CustomButton
        label="Ghost Button"
        variant="ghost"
        callback={() => handlePress('Ghost')}
      />

      <CustomButton
        label="Loading Button"
        variant="primary"
        loading={true}
        callback={() => handlePress('Loading')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default ButtonExamples;