import React, { useEffect } from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native"; // Import Text and Image
import Post from "../../components/postsScreen/PostsScreen";
import useApiGet from "../../hooks/useApiGet";
import apiUrls from "../../api/apiUrls";

const Index = () => {
  const { data, loading, error, getData } = useApiGet();

  useEffect(() => {
    getData(apiUrls.getAllPosts);
    console.log("data", data);
  }, []);

  return !loading ? (
    <ScrollView>
      {data?.map((post, index) => (
        <View key={index}>
          <Post data={post} authorDetails={post.author} />
        </View>
      ))}
    </ScrollView>
  ) : (
    <View style={styles.loadingContainer}>
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>
          Oh no! It looks like the posts are hiding. 🙈
        </Text>
        <Text style={styles.placeholderText}>
          Maybe they're off on an adventure. Let's Find them 🙃
        </Text>
        <Image
          source={{
            uri: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWVhMjYzY3llMTI0MmkyYXh3bTR3MnUyanpmMXZpMW0xeHNxNTFoeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dWTBGOR6sLLWQvZZ21/giphy.gif",
          }}
          style={styles.placeholderImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  placeholderText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
  },
});

export default Index;
