import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

const FriendProfile = ({ userData }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: userData.profilePicture }}
          style={styles.profileImage}
        />
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{userData.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{userData.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{userData.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.fullName}>{userData.fullName}</Text>
        <Text style={styles.username}>@{userData.username}</Text>
        <Text style={styles.biography}>{userData.biography}</Text>
        <Text style={styles.location}>{userData.location}</Text>
      </View>

      <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
        <Text style={styles.followButtonText}>
          {isFollowing ? "Unfollow" : "Follow"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FriendProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  statsContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  userInfo: {
    padding: 20,
  },
  fullName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  biography: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  followButton: {
    backgroundColor: "#000",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 5,
  },
  followButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
