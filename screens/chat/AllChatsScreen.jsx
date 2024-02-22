import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Placeholder image URLs

const placeholderImageUrls = [
  "https://source.unsplash.com/50x50/?person",
  "https://source.unsplash.com/50x50/?portrait",
  "https://source.unsplash.com/50x50/?face",
  // Add more image URLs as needed
];

// Dummy data for chats
const chats = [
  {
    id: "1",
    profilePicture: placeholderImageUrls[0],
    name: "John Doe",
    lastMessage: "Hello, how are you?",
  },
  {
    id: "2",
    profilePicture: placeholderImageUrls[1],
    name: "Jane Smith",
    lastMessage: "Hey there!",
  },
  {
    id: "3",
    profilePicture: placeholderImageUrls[2],
    name: "Cooler man",
    lastMessage: "Hey there!",
  },
];

import { useRouter } from "expo-router";

const AllChatsScreen = () => {
  const router = useRouter();

  // Render each chat item
  const renderChatItem = ({ item }) => (
    <View style={styles.chatItem}>
      <Image
        source={{ uri: item.profilePicture }}
        style={styles.profilePicture}
      />
      <TouchableOpacity onPress={() => router.push(`/chat`)}>
        <View style={styles.chatInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  // Render when there are no chats
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No chats yet 🤔</Text>
      <Text style={styles.emptyEmoji}>🤖 </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
  },
  chatList: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 12,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  chatInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    marginBottom: 16,
    color: "#666",
  },
  emptyImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  emptyEmoji: {
    fontSize: 48,
  },
});

export default AllChatsScreen;
