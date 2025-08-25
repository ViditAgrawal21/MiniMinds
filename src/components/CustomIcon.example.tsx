import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

// Example usage of CustomIcon with short form names
const CustomIconExample: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Octicons */}
      <CustomIcon type="OCT" name="star" size={24} color="gold" />
      
      {/* Material Icons */}
      <CustomIcon type="MI" name="favorite" size={24} color="red" />
      
      {/* AntDesign */}
      <CustomIcon type="AD" name="heart" size={24} color="pink" />
      
      {/* FontAwesome */}
      <CustomIcon type="FA" name="user" size={24} color="blue" />
      
      {/* Ionicons */}
      <CustomIcon type="IO" name="home" size={24} color="green" />
      
      {/* Entypo */}
      <CustomIcon type="EN" name="mail" size={24} color="orange" />
      
      {/* Material Community Icons */}
      <CustomIcon type="MCI" name="account-circle" size={24} color="purple" />
      
      {/* Feather */}
      <CustomIcon type="FE" name="settings" size={24} color="gray" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
});

export default CustomIconExample;
