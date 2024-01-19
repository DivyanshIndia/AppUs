import React from "react";
import { FlatList } from "react-native";
import PostComponent from "./PostComponent";

const NewsFeed = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PostComponent post={item} />}
    />
  );
};

export default NewsFeed;
