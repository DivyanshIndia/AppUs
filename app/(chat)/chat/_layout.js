import { Stack } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Layout = () => {

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,

          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <View style={styles.profileContainer}>
                <Image
                  source={{ uri: "https://via.placeholder.com/50x50" }}
                  style={styles.profileImage}
                />
                <View style={styles.nameContainer}>
                  <Text style={styles.fullName}>Full Name</Text>
                  <Text style={styles.username}>@username</Text>
                </View>
              </View>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
  },
  headerTitleContainer: {
    marginLeft: -20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  nameContainer: {
    flexDirection: "column",
  },
  fullName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  username: {
    fontSize: 12,
    color: "#666",
  },
});

export default Layout;
