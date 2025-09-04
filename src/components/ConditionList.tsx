import React from "react";
import {
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";

type ConditionListProps = {
  data: { id: number; name: string; nameKey: string }[];
  onPressItem: ({ name, nameKey }: { name: string; nameKey: string }) => void;
};

export default function ConditionList({
  data,
  onPressItem,
}: ConditionListProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {data.map((item) => (
          <Pressable
            key={item.id}
            style={styles.item}
            onPress={() =>
              onPressItem({ name: item.name, nameKey: item.nameKey })
            }
          >
            <Text style={styles.itemText}>{item.nameKey}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff", // White background for the entire container
    padding: 20,
    flex: 1, // Allow it to take full available space
    justifyContent: "space-between",
  },
  scrollContent: {
    paddingBottom: 40, // Increased padding to ensure last item is fully visible
  },
  item: {
    paddingVertical: 12,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#AB47BC",
    marginBottom: 10,
    backgroundColor: "#fff",
    marginLeft: 15,
  },
  itemText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#4A4A4A",
  },
});
