// components/TabSelector.tsx
import React from "react";
import { ScrollView, Pressable, Text, StyleSheet, View } from "react-native";

type TabSelectorProps = {
  tabs: string[];
  selectedTab: string;
  onSelectTab: (tab: string) => void;
};

export default function TabSelector({
  tabs,
  selectedTab,
  onSelectTab,
}: TabSelectorProps) {
  return (
    <View style={styles.tabWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}
      >
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.selectedTab]}
            onPress={() => onSelectTab(tab)}
          >
            <View style={styles.fixedTabSize}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.selectedTabText,
                ]}
              >
                {tab}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabWrapper: {
    marginBottom: 16,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 0,
    marginLeft: 10,
  },
  tab: {
    height: 78,
    width: 125,
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#FF8C00",
    borderRadius: 10,
    marginRight: 10,
    paddingLeft: 10,
    gap: 10,
  },
  selectedTab: {
    backgroundColor: "#FF8C00",
  },
  fixedTabSize: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#5F6368",
    textAlign: "left",
  },
  selectedTabText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Poppins-Medium",
    textAlign: "left",
  },
});
