import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Redirect } from "expo-router";

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the main page or any other screen
      <Redirect href="/logIn" />;
    }, 2000); // Set the duration in milliseconds (2 seconds in this example)

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.appName}>Us</Text>
      <Text style={styles.subtitle}>Embrace your Uniqueness</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
  },
});

export default WelcomeScreen;
