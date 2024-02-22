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
  ActivityIndicator,
} from "react-native";
import apiUrls from "../../api/apiUrls";
import useApiGet from "../../hooks/useApiGet";
import { useRouter } from "expo-router";

const UserItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <Image
      source={{
        uri: item?.profilePicture
          ? `data:image/jpeg;base64,${item?.profilePicture}`
          : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
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
  const { data, error, loading, getData } = useApiGet();
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
    router.replace(`/publicProfile/${id}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
