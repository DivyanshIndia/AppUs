import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  FlatList,
} from "react-native"; // Import Text and Image
import Post from "../../screens/postsScreen/PostsScreen";
import useApiGet from "../../hooks/useApiGet";
import apiUrls from "../../api/apiUrls";

const Index = () => {
  const { data, loading, error, getData } = useApiGet();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getData(apiUrls.getAllPosts);
    console.log("data", data);
  }, []);

  return !loading ? (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      
      renderItem={({ item }) => (
        <View>
          <Post data={item} authorDetails={item.author} />
        </View>
      )}
      refreshing={refresh}
      onRefresh={() => {
        setRefresh((prev) => !prev);
        getData(apiUrls.getAllPosts);
        setRefresh(false);
      }}
    />
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
