import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import MindToolsScreen from "@/screens/main/MindTools/MindToolsScreen";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60 },
      }}
    >
      <Tab.Screen
        name="Mind Tools"
        component={MindToolsScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🧠</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
