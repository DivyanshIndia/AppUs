import { Stack, useRouter } from "expo-router";

import React from "react";

const layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="logIn/index" options={{ headerShown: false }} />
      <Stack.Screen name="signUp/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default layout;
