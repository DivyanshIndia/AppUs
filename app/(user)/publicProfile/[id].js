import React, { useEffect, useState } from "react";
import FriendProfile from "../../../components/friendProfile/FriendProfile";
import { useLocalSearchParams } from "expo-router";
import apiUrls from "../../../api/apiUrls";
import useApiGet from "../../../hooks/useApiGet";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const PublicProfile = () => {
  const { id } = useLocalSearchParams();
  const { data: userData, error, getData, loading } = useApiGet();
  const {
    data: postCount,
    error: postCountError,
    getData: getPostsCount,
    loading: postCountLoading,
  } = useApiGet();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        await getData(apiUrls.getUser(id));

        // Fetch post count after user data is fetched
        await getPostsCount(apiUrls.getUserPostCount(id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (loading || postCountLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <FriendProfile userData={userData || []} posts={postCount?.postCount} />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PublicProfile;
