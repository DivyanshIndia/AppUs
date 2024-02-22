import React, { useEffect, useState } from "react";
import UserProfile from "../../../screens/userProfile/UserProfile";
import apiUrls from "../../../api/apiUrls";
import useApiGet from "../../../hooks/useApiGet";
import getToken from "../../../utils/getToken";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";

const index = () => {
  const { data, loading, error, getData } = useApiGet();
  const {
    data: postCount,
    error: postCountError,
    getData: getPostsCount,
    loading: postCountLoading,
  } = useApiGet();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await getToken("userId");
      if (userId) {
        console.log("userId", userId);
        await getData(apiUrls.getUser(userId));
      }
    };
    const fetchPosts = async () => {
      const userId = await getToken("userId");
      if (userId) {
        await getPostsCount(apiUrls.getUserPostCount(userId));
      }
      console.log("postsLength", postCount?.postCount);
    };
    fetchPosts();

    fetchUserData().catch(console.error);
  }, []);

  const onRefresh = async () => {
    setRefresh(true);
    try {
      const userId = await getToken("userId");
      if (userId) {
        await getData(apiUrls.getUser(userId));
        await getPostsCount(apiUrls.getUserPostCount(userId));
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
      // Handle error appropriately, e.g., show an error message
    } finally {
      setRefresh(false);
    }
  };

  if (loading || postCountLoading) {
    return (
      <ScrollView
        contentContainerStyle={styles.loadingContainer}
       
      >
        <ActivityIndicator size="large" color="#007AFF" />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{flex:1}}
     refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }>
      <UserProfile userData={data} posts={postCount?.postCount} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default index;
