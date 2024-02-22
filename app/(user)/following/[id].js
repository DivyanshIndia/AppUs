import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import FollowingScreen from "../../../screens/followingScreen/FollowingScreen";
import apiUrls from "../../../api/apiUrls";
import useApiGet from "../../../hooks/useApiGet";
import { useLocalSearchParams } from "expo-router";

const Index = () => {
  const { id } = useLocalSearchParams();
  const { data: userData, error, getData, loading } = useApiGet();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getData(apiUrls.getFollowing(id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return !loading ? (
    <FollowingScreen data={userData || []} />
  ) : (
    <View style={styles.noFollowingContainer}>
      <Text style={styles.noFollowingText}>Not following anyone😎</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFollowingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFollowingText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default Index;
