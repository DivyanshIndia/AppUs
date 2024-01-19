import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PostComponent = ({ post }) => {
  const handleUpvote = () => {
    // Implement upvote functionality
    console.log("Upvoted:", post.id);
  };

  const handleDownvote = () => {
    // Implement downvote functionality
    console.log("Downvoted:", post.id);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log("Shared:", post.id);
  };

  const handleComment = () => {
    // Implement comment functionality
    console.log("Commented on:", post.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{ uri: post.userProfile }} style={styles.profileImage} />
        <Text style={styles.username}>{post.username}</Text>
      </View>
      <View style={styles.postContent}>
        {/* Display post content here, e.g., text, image, video, links */}
        <Text>{post.title}</Text>
        {post.media && (
          <Image source={{ uri: post.media }} style={styles.postImage} />
        )}
      </View>
      <View style={styles.interactionIcons}>
        <TouchableOpacity onPress={handleUpvote}>
          <Ionicons name="arrow-up" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDownvote}>
          <Ionicons name="arrow-down" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-social" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleComment}>
          <Ionicons name="chatbubble-outline" size={25} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postContent: {
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  interactionIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PostComponent;
