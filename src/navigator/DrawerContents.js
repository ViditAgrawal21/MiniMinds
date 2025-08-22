import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const DrawerContents = props => {
  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Text style={styles.title}>ThoughtPro</Text>
            <Text style={styles.caption}>Welcome to ThoughtPro</Text>
          </View>
          
          <View style={styles.drawerSection}>
            <DrawerItemList {...props} />
          </View>
        </View>
      </DrawerContentScrollView>
      
      <View style={styles.bottomDrawerSection}>
        <TouchableOpacity 
          style={styles.preference}
          onPress={() => {
            // Add logout logic here
          }}>
          <Text style={styles.preferenceText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingVertical: 20,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#666',
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  preferenceText: {
    fontSize: 16,
  },
});

export default DrawerContents;
