import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import apiUrls from "../../api/apiUrls";
import useApiGet from "../../hooks/useApiGet";
import { useRouter } from "expo-router";

const UserItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <Image
      source={{
        uri: `data:image/jpeg;base64,${item?.profilePicture}`,
      }}
      style={styles.profileImage}
    />
    <View style={styles.userInfo}>
      <Text style={styles.fullName}>{item.fullName}</Text>
      <Text style={styles.username}>@{item.username}</Text>
    </View>
  </TouchableOpacity>
);

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, getData } = useApiGet();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      await getData(apiUrls.getAllUsers);
    };

    fetchUsers();
  }, []);

  const users = data || [];

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error.message || "An error occurred");
    }
  }, [error]);

  const filteredUsers = useMemo(() => {
    const queryLower = searchQuery.toLowerCase();

    return users?.filter(
      (user) =>
        user.username.toLowerCase().includes(queryLower) ||
        user.fullName.toLowerCase().includes(queryLower)
    );
  }, [users, searchQuery]);

  const handleSelectUser = (id) => {
    router.push(`/publicProfile/${id}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Users"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <UserItem item={item} onPress={() => handleSelectUser(item._id)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  searchInput: {
    fontSize: 18,
    padding: 15,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#f9f9f9",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  fullName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "grey",
  },
});

export default SearchComponent;
