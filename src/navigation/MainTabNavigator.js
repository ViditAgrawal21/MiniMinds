import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

// Import your main screens
import HomeTabScreen from '../screens/main/homeTab';
import MindToolsScreen from '../screens/main/MindTools/MindToolsScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'MindTools') {
            iconName = 'brain';
          }
          
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color }}>
                {route.name === 'Home' ? '🏠' : '🧠'}
              </Text>
            </View>
          );
        },
      })}>
      
      <Tab.Screen 
        name="Home" 
        component={HomeTabScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      
      <Tab.Screen 
        name="MindTools" 
        component={MindToolsScreen}
        options={{
          tabBarLabel: 'Mind Tools',
        }}
      />
      
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
