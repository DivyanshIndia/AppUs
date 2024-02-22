import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

const GroupsScreen = () => {
  const [groups, setGroups] = useState([
    { id: "1", name: "Group 1", lastMessage: "Last message in Group 1" },
    { id: "2", name: "Group 2", lastMessage: "Last message in Group 2" },
    { id: "3", name: "Group 3", lastMessage: "Last message in Group 3" },
  ]);
  const [newGroupName, setNewGroupName] = useState("");

  const handleCreateGroup = () => {
    const trimmedName = newGroupName.trim();

    if (trimmedName === "") return;

    const newGroup = {
      id: (groups.length + 1).toString(),
      name: trimmedName,
      lastMessage: "",
    };

    setGroups([...groups, newGroup]);
    setNewGroupName("");
  };

  const renderGroupItem = ({ item }) => (
    <View style={styles.groupItem}>
      {/* Group profile picture */}
      <Image
        source={{ uri: "https://via.placeholder.com/100" }} // Placeholder image from the internet
        style={styles.groupProfilePicture}
      />
      <View style={styles.groupDetails}>
        {/* Group name */}
        <Text style={styles.groupName}>{item.name}</Text>
        {/* Last message */}
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.groupsContainer}>
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={renderGroupItem}
        />
      </View>
      <View style={styles.createGroupContainer}>
        <TextInput
          style={styles.textInput}
          value={newGroupName}
          onChangeText={setNewGroupName}
          placeholder="Enter group name..."
        />
        <TouchableOpacity
          style={styles.createGroupButton}
          onPress={handleCreateGroup}
        >
          <Text style={styles.createGroupButtonText}>Create Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  groupsContainer: {
    flex: 1,
    paddingStart: 15,
  },
  groupItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  createGroupContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  groupProfilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  groupDetails: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  createGroupButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#007AFF",
    borderRadius: 20,
  },
  createGroupButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default GroupsScreen;
