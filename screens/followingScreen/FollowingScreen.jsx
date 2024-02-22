import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useRouter } from "expo-router";
import apiUrls from "../../api/apiUrls";
import useApiPost from "../../hooks/useApiPost";

const FollowingItem = ({ item, onFollowToggle, onItemPress }) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity
      onPress={() => onItemPress(item._id)}
      style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
    >
      <Image
        source={{
          uri: item?.profilePicture
            ? `data:image/jpeg;base64,${item?.profilePicture}`
            : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
        }}
        style={styles.profileImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item?.username}</Text>
        <Text style={styles.fullName}>{item?.fullName}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.unfollowButton}
      onPress={() => onFollowToggle(item._id)}
    >
      <Text style={styles.buttonText}>Unfollow</Text>
    </TouchableOpacity>
  </View>
);

const FollowingScreen = ({ data }) => {
  const [following, setFollowing] = useState(data);
  const router = useRouter();
  const { data: followData, error, postData } = useApiPost();

  const unfollowUser = async (id) => {
    await postData(apiUrls.unfollowUser(id));
  };

  const handleFollowToggle = async (id) => {
    await unfollowUser(id);
    setFollowing((currentFollowing) =>
      currentFollowing.filter((followingUser) => followingUser._id !== id)
    );
  };

  const handleItemPress = (id) => {
    router.push(`/publicProfile/${id}`);
  };

  const handleButtonPress = () => {
    router.push("/search");
  };

  return (
    <View style={styles.container}>
      {following.length === 0 ? (
        <View style={styles.noFollowingContainer}>
          <Text style={styles.noFollowingText}>
            You are not following anyone!
          </Text>
          <TouchableOpacity
            style={styles.followButton}
            onPress={handleButtonPress}
          >
            <Text style={styles.buttonText}>Follow Someone</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={following}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <FollowingItem
              item={item}
              onFollowToggle={handleFollowToggle}
              onItemPress={handleItemPress}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fullName: {
    fontSize: 14,
    color: "grey",
  },
  unfollowButton: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  noFollowingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFollowingText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "grey",
  },
  followButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default FollowingScreen;
