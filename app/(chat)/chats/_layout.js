import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";

import React from "react";

const layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default layout;
