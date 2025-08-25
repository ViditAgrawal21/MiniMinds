import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

type Video = {
  id: string;
  title: string;
  imageUrl: any; // Use `any` for local images
};

const RecommendedVideos = () => {
  const [videos] = useState<Video[]>([
    {
      id: "1",
      title: "Spiritual Space",
      imageUrl: require("../../assets/images/download.png"), // Replace with actual local image
    },
    {
      id: "2",
      title: "TED",
      imageUrl: require("../../assets/images/download.png"), // Replace with actual local image
    },
    {
      id: "3",
      title: "Meditative Sounds",
      imageUrl: require("../../assets/images/download.png"), // Replace with actual local image
    },
    {
      id: "4",
      title: "Yoga Flow",
      imageUrl: require("../../assets/images/download.png"), // Replace with actual local image
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recommended Videos</Text>
        <TouchableOpacity onPress={() => Alert.alert("Reset", "List Reset!")}>
          <Text style={styles.reset}>Reset</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#AB47BC" />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {videos.map((video) => (
            <TouchableOpacity
              key={video.id}
              style={styles.card}
              onPress={() =>
                Alert.alert("Video Selected", `You selected: ${video.title}`)
              }
            >
              <Image source={video.imageUrl} style={styles.image} />
              <Text style={styles.videoTitle}>{video.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8A56AC",
  },
  reset: {
    fontSize: 12,
    color: "#8A56AC",
    textDecorationLine: "underline",
  },
  scrollContainer: {
    flexDirection: "row",
    gap: 10,
  },
  card: {
    width: 140,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    elevation: 3,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 90,
    resizeMode: "cover",
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A4A4A",
    marginTop: 8,
    marginBottom: 8,
    textAlign: "center",
  },
});

export default RecommendedVideos;