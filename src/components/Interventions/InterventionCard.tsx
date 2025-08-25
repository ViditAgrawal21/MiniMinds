import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

type InterventionCardProps = {
  title: string;
  imageSource: any;
  onPress: () => void;
};

export default function InterventionCard({
  title,
  imageSource,
  onPress,
}: InterventionCardProps) {
  return (
    <View>
      <Pressable style={styles.card} onPress={onPress}>
        <Image source={imageSource} style={styles.image} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 131,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 20,
  },
  image: {
    width: 200, // Image width
    height: 131, // Image height
    resizeMode: "contain",
    borderWidth: 1, // Border around the image
    borderColor: "#000000", // Border color
    borderRadius: 10, // Optional: to round the corners of the image
  },
  title: {
    fontSize: 16,
    color: "#747474",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginTop: 8,
  },
});
