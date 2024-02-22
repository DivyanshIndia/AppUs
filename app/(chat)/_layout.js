import { Stack } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="chats"
        options={{
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Chats</Text>
            </View>
          ),
          headerShown: true,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="chat"
        options={{ headerShown: false, headerBackVisible: false }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});

export default Layout;
