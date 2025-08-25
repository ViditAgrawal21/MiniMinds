import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

type PlaylistCardProps = {
  title: string;
  imageUrl: any; // Using `any` for local images
  onPress: () => void;
};

const PlaylistCard = ({ title, imageUrl, onPress }: PlaylistCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={imageUrl} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    overflow: "hidden",
    alignItems: "center",
    marginRight: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4A4A4A",
    marginVertical: 8,
    textAlign: "center",
  },
});

export default PlaylistCard;