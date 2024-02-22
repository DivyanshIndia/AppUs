import { Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

import React from "react";

const layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="logIn/index" options={{ headerShown: false }} />
      <Stack.Screen name="signUp/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="forget-password/index"
        options={{
          title: "Forget Password",
        }}
      />
      <Stack.Screen
        name="confirmOTP/index"
        options={{
          title: "Confirm Password",
        }}
      />
      <Stack.Screen
        name="reset-password/index"
        options={{
          title: "Reset Password",
        }}
      />
    </Stack>
  );
};

export default layout;
