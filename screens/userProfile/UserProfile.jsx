import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // For icons

// Helper component for statistics
const Statistic = ({ label, value, onPress }) => (
  <TouchableOpacity style={styles.statisticContainer} onPress={onPress}>
    <Text style={styles.statisticValue}>{value}</Text>
    <Text style={styles.statisticLabel}>{label}</Text>
  </TouchableOpacity>
);

// Main UserProfile component
const UserProfile = ({ userData, posts }) => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/editProfile");
  };

  // Function to handle press on a statistic
  const handleStatisticPress = (statisticType) => {
    router.push(`/${statisticType}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log("Profile Image Clicked")}>
        <Image
          source={{
            uri: userData?.profilePicture
              ? `data:image/jpeg;base64,${userData?.profilePicture}`
              : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
          }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.fullName}>{userData?.fullName || "Name"}</Text>
      <Text style={styles.username}>@{userData?.username || "username"}</Text>

      <View style={styles.statsRow}>
        <Statistic
          label="Posts"
          value={posts || 0}
          onPress={() => handleStatisticPress(`posts/${userData._id}`)}
        />
        <Statistic
          label="Followers"
          value={userData?.followers?.length || 0}
          onPress={() => handleStatisticPress(`followers/${userData._id}`)}
        />
        <Statistic
          label="Following"
          value={userData?.following?.length || 0}
          onPress={() => handleStatisticPress(`following/${userData._id}`)}
        />
      </View>

      <View style={styles.bioSection}>
        <Text style={styles.bio}>
          {userData?.biography || "Your bio goes here..."}
        </Text>
      </View>
      <View style={styles.locationSection}>
        <MaterialIcons name="location-on" size={20} color="grey" />
        <Text style={styles.location}>{userData?.location || "Location"}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  fullName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  username: {
    fontSize: 18,
    color: "grey",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginVertical: 15,
  },
  statisticContainer: {
    alignItems: "center",
    padding: 10,
  },
  statisticValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  statisticLabel: {
    fontSize: 16,
    color: "grey",
  },
  bioSection: {
    marginVertical: 10,
  },
  bio: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  location: {
    fontSize: 16,
    color: "grey",
    marginLeft: 5,
  },
  editButton: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  editButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default UserProfile;
