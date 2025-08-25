import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

type PlaylistCardProps = {
  title: string;
  imageUrl: any; // Change this to 'any' so we can handle both local and remote images
  onPress: () => void;
};

export default function PlaylistCard({
  title,
  imageUrl,
  onPress,
}: PlaylistCardProps) {
  return (
    <Pressable
      style={styles.cardContainer}
      onPress={onPress}
      android_ripple={{ color: "#e0e0e0" }}
    >
      <View style={styles.card}>
        {/* If imageUrl is a local image (require), it will be passed correctly */}
        <Image source={imageUrl} style={styles.image} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  card: {
    width: 200,
    height: 150,
    backgroundColor: "#ffffff", // White background
    borderRadius: 12, // Rounded corners
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Card shadow
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#747474",
    textAlign: "center",
  },
});
