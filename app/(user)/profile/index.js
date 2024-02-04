import React, { useEffect } from "react";
import UserProfile from "../../../components/userProfile/UserProfile";
import apiUrls from "../../../api/apiUrls";
import useApiGet from "../../../hooks/useApiGet";
import getToken from "../../../utils/getToken";
import { StyleSheet, ActivityIndicator, View } from "react-native";

const index = () => {
  const { data, loading, error, getData } = useApiGet();
  const {
    data: postCount,
    error: postCountError,
    getData: getPostsCount,
    loading: postCountLoading,
  } = useApiGet();

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

  if (loading || postCountLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <>
      <UserProfile userData={data} posts={postCount?.postCount} />
    </>
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
