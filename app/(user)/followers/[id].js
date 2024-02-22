import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import FollowersScreen from "../../../screens/followersScreen/FollowersScreen";
import apiUrls from "../../../api/apiUrls";
import useApiGet from "../../../hooks/useApiGet";
import { useLocalSearchParams } from "expo-router";

const index = () => {
  const { id } = useLocalSearchParams();
  const { data: userData, error, getData, loading } = useApiGet();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getData(apiUrls.getFollowers(id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
    console.log("followersdata", userData);
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // if (error || !userData) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text style={styles.errorText}>Error loading data</Text>
  //     </View>
  //   );
  // }

  return <FollowersScreen data={userData || []} />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default index;
