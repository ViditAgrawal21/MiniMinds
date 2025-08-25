import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

const GuardianCardComponent = ({
  profileImage,
  title,
  subtitle,
  rightImage1,
  rightImage2,
  onDelete,
  onEdit,
}: {
  profileImage: any;
  title: any;
  subtitle: any;
  rightImage1: any;
  rightImage2: any;
  onDelete?: () => void;
  onEdit?: () => void;
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {/* Left Side: Profile Picture */}
        <Image source={profileImage} style={styles.profileImage} />

        {/* Middle Part: Title and Subtitle */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {/* Right Side: Two Images */}
        <View style={styles.rightImagesContainer}>
          <TouchableOpacity onPress={onDelete} activeOpacity={0.7}>
            <Image source={rightImage1} style={styles.rightImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onEdit} activeOpacity={0.7}>
            <Image source={rightImage2} style={styles.rightImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular image
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginTop: -8,
  },
  rightImagesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightImage: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
});

export default GuardianCardComponent;
