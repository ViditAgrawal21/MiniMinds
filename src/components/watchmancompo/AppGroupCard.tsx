import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CustomIcon from "../CustomIcon";

interface AppGroupCardProps {
  title?: string;
  onEditPress?: () => void;
}

const AppGroupCard: React.FC<AppGroupCardProps> = ({ 
  title = "App Group", 
  onEditPress 
}) => {
  const handleEditPress = () => {
    if (onEditPress) {
      onEditPress();
    } else {
      console.log('Edit pressed');
    }
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={handleEditPress}
          style={styles.editButton}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Edit app group"
        >
          <CustomIcon type="MI" name="edit" size={20} color="#8A56AC" />
        </TouchableOpacity>
      </View>

      {/* Icons Section */}
      <View style={styles.icons}>
        {/* YouTube Icon */}
        <View style={styles.iconWrapper}>
          <View style={[styles.icon, styles.youtubeIcon]}>
            <CustomIcon type="MI" name="play-arrow" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.iconText}>youtube</Text>
        </View>

        {/* Instagram Icon */}
        <View style={styles.iconWrapper}>
          <View style={[styles.icon, styles.instagramIcon]}>
            <CustomIcon type="MI" name="camera-alt" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.iconText}>instagram</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1, // For Android shadow
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8A56AC",
  },
  editButton: {
    padding: 4,
    borderRadius: 4,
  },
  icons: {
    flexDirection: "row-reverse", // Align icons from right to left
    justifyContent: "flex-end", // Push items to the right
    alignItems: "center",
  },
  iconWrapper: {
    alignItems: "center",
    marginHorizontal: 5, // Overlap icons slightly to reduce spacing
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  youtubeIcon: {
    backgroundColor: "#FF0000", // YouTube red
  },
  instagramIcon: {
    backgroundColor: "#C13584", // Instagram gradient color
  },
  iconText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
    color: "#6A6A6A",
    textTransform: "lowercase",
    textAlign: "center",
  },
});

export default AppGroupCard;