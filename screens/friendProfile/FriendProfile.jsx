import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import apiUrls from "../../api/apiUrls";
import useApiPost from "../../hooks/useApiPost";
import getToken from "../../utils/getToken";
import { useRouter, useLocalSearchParams } from "expo-router";

const FriendProfile = ({ userData, posts, setChange }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { postData } = useApiPost();
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    const fetchFollowing = async () => {
      const id = await getToken("userId");
      if (id) {
        const isFollowingUser = userData?.followers?.find(
          (followerId) => followerId === id
        );
        setIsFollowing(!!isFollowingUser); // Convert to boolean
        console.log("isFollowing: ", isFollowing);
      }
    };

    fetchFollowing();
  }, [userData]);

  const handleFollow = async () => {
    setIsFollowing((prev) => !prev);
    if (isFollowing) {
      await postData(apiUrls.unfollowUser(userData._id));
      setChange((prev) => !prev);
    } else {
      await postData(apiUrls.followUser(userData._id));
      setChange((prev) => !prev);
    }
  };

  const handlePush = (path, id) => {
    router.push({ pathname: `/${path}/${id}` });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: userData?.profilePicture
              ? `data:image/jpeg;base64,${userData?.profilePicture}`
              : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
          }}
          style={styles.profileImage}
        />

        <View style={styles.statsContainer}>
          <TouchableOpacity onPress={() => handlePush("posts", userData._id)}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{posts || 0}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePush("followers", userData._id)}
          >
            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                {userData?.followers?.length || 0}
              </Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePush("following", userData._id)}
          >
            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                {userData?.following?.length || 0}
              </Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.fullName}>{userData?.fullName || "name"}</Text>
        <Text style={styles.username}>@{userData?.username || "username"}</Text>
        <Text style={styles.biography}>{userData?.biography || "bio"}</Text>
        <Text style={styles.location}>{userData?.location || "location"}</Text>
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
