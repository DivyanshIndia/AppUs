import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const UserItem = ({
  profilePicture,
  username,
  fullName,
  isFollowing,
  onFollowPress,
}) => {
  return (
    <View style={styles.userItemContainer}>
      <Image source={{ uri: profilePicture }} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.fullName}>{fullName}</Text>
      </View>
      <TouchableOpacity style={styles.followButton} onPress={onFollowPress}>
        <Text style={styles.followButtonText}>
          {isFollowing ? "Unfollow" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  fullName: {
    color: "grey",
  },
  followButton: {
    backgroundColor: "black",
    padding: 8,
    borderRadius: 5,
  },
  followButtonText: {
    color: "white",
  },
});

export default UserItem;
