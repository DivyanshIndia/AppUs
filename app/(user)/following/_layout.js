import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: () => (
            <View style={styles.titleContainer}>
              <Text style={styles.headerText}>All following</Text>
            </View>
          ),
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
};

export default Layout;

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
