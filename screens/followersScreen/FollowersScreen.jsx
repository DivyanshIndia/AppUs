import React, { useState, useEffect } from "react";
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
import useApiGet from "../../hooks/useApiGet";

const FollowerItem = ({ item, onFollowToggle, onItemPress }) => {
  const { data: followingFlag, error, getData } = useApiGet();

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      try {
        await getData(apiUrls.isFollowing(item._id));
      } catch (error) {
        console.error("Error fetching following status:", error);
      }
    };

    fetchFollowingStatus();
  }, [item._id]);

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onItemPress(item._id)}
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
      {followingFlag && (
        <TouchableOpacity
          style={followingFlag ? styles.followingButton : styles.followButton}
          onPress={(e) => {
            e.stopPropagation();
            onFollowToggle(item._id);
          }}
        >
          <Text style={styles.buttonText}>
            {followingFlag ? "Unfollow" : "Follow"}
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const FollowersScreen = ({ data }) => {
  const [followers, setFollowers] = useState(data);
  console.log("followerScreen:", followers);
  const router = useRouter();

  const handleFollowToggle = (id) => {
    setFollowers((currentFollowers) =>
      currentFollowers.map((follower) =>
        follower._id === id
          ? { ...follower, isFollowing: !follower.isFollowing }
          : follower
      )
    );
  };

  const handleItemPress = (id) => {
    router.push(`/publicProfile/${id}`);
  };

  return (
    <View style={styles.container}>
      {followers.length === 0 ? (
        <View style={styles.noFollowersContainer}>
          <Text style={styles.noFollowersText}>You have no followers!</Text>
          <TouchableOpacity
            style={styles.followButton}
            onPress={() => {
              router.push("/search");
            }}
          >
            <Text style={styles.buttonText}>Connect to People</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={followers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <FollowerItem
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
    width: 70, // Increased size
    height: 70, // Increased size
    borderRadius: 50, // Adjusted for new size
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
  followButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: "center",
  },
  followingButton: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: "center",
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "grey",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  noFollowersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFollowersText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "grey",
  },
});

export default FollowersScreen;
