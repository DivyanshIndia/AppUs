import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons"; // Import the Icon component

import React from "react";

const layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="(user)"
        options={{
          headerLeft: () => (
            <View style={styles.sideHeaderContainer}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
              />
            </View>
          ),
          headerRight: () => (
            <View style={styles.sideHeaderContainer}>
              <TouchableOpacity onPress={() => router.push("/settings")}>
                <Icon name="settings-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => (
            <View style={styles.titleContainer}>
              <Text style={styles.headerText}>Us {"                   "}</Text>
            </View>
          ),
          headerStyle: styles.header,
          headerBackVisible: false, // Hides the back button
        }}
      />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />

      <Stack.Screen
        name="editProfile/index"
        options={{
          headerLeft: () => (
            <View style={styles.sideHeaderContainer}>
              <Text style={styles.headerText}> Back</Text>
            </View>
          ),
          headerTitle: () => (
            <View style={styles.titleContainer}>
              <Text style={styles.headerText}></Text>
            </View>
          ),
          headerStyle: styles.header,
          headerBackVisible: true, // Shows the back button
        }}
      />
    </Stack>
  );
};

export default layout;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
  },
  sideHeaderContainer: {
    width: 50, // Set a fixed width for both the left and right components
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingRight: 85,
  },
  logo: {
    width: 20,
    height: 40,
  },
  headerText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
