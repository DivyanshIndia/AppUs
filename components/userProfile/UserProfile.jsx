import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Statistic = ({ label, value }) => (
  <View style={styles.statisticContainer}>
    <Text style={styles.statisticValue}>{value}</Text>
    <Text style={styles.statisticLabel}>{label}</Text>
  </View>
);

const UserProfile = ({ userData }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
      <Text style={styles.fullName}>{userData.fullName}</Text>
      <Text style={styles.username}>@{userData.username}</Text>

      <View style={styles.statsRow}>
        <Statistic label="Posts" value={userData.posts} />
        <Statistic label="Followers" value={userData.followers} />
        <Statistic label="Following" value={userData.following} />
      </View>

      <View style={styles.statsRow}>
        <Statistic label="Comments" value={userData.comments} />
        <Statistic label="Upvotes" value={userData.upvotes} />
        <Statistic label="Downvotes" value={userData.downvotes} />
      </View>

      <Text style={styles.bio}>{userData.bio}</Text>
      <Text style={styles.location}>{userData.location}</Text>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  username: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginVertical: 10,
  },
  statisticContainer: {
    alignItems: 'center',
  },
  statisticValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  statisticLabel: {
    fontSize: 14,
    color: 'grey',
  },
  bio: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
  },
  location: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default UserProfile;
