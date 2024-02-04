import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import saveToken from "../../utils/saveToken";
import { useRouter } from "expo-router";

const Settings = () => {
  const router = useRouter();
  const handleAskQuestion = () => {
    // Handle Ask a Question action
    console.log("Ask a Question clicked");
  };

  const handleLogout = () => {
    saveToken("authToken", "");
    router.push("/logIn");
  };

  const handleDeleteAccount = () => {
    // Handle Delete Account action
    console.log("Delete Account clicked");
  };

  const handleDeactivateAccount = () => {
    // Handle Deactivate Account action
    console.log("Deactivate Account clicked");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={handleAskQuestion}>
        <MaterialCommunityIcons
          name="account-question"
          size={30}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.optionText}>Ask a Question</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <MaterialCommunityIcons
          name="logout"
          size={30}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleDeleteAccount}>
        <MaterialCommunityIcons
          name="account-remove"
          size={30}
          color="#FF0000"
          style={styles.icon}
        />
        <Text style={styles.optionTextRed}>Delete Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleDeactivateAccount}>
        <MaterialCommunityIcons
          name="account-off"
          size={30}
          color="#FFD700"
          style={styles.icon}
        />
        <Text style={styles.optionTextYellow}>Deactivate Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa", // Background color
    paddingHorizontal: 20,
    paddingTop: 50, // Top padding
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 18,
    color: "#333",
    marginLeft: 20,
  },
  optionTextRed: {
    fontSize: 18,
    color: "#FF0000",
    marginLeft: 20,
  },
  optionTextYellow: {
    fontSize: 18,
    color: "#FFD700",
    marginLeft: 20,
  },
  icon: {
    marginLeft: 10,
  },
});

export default Settings;
