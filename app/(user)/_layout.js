import React from "react";
import { Tabs } from "expo-router/tabs";
import { FontAwesome } from "@expo/vector-icons";

export default () => {
  return (
    <Tabs
      screenOptions={{
        activeTintColor: "green",
        inactiveTintColor: "black",
        tabBarActiveTintColor: "green",
        tabBarStyle: {
          height: 50,
          paddingTop: 5,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="post"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />

<Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          href: null,
        }}
      />

      <Tabs.Screen
        name="followers"
        options={{
          headerShown: false,
          href: null,
        }}
      />

      <Tabs.Screen
        name="following"
        options={{
          headerShown: false,
          href: null,
        }}
      />

      <Tabs.Screen
        name="posts/[id]"
        options={{
          headerShown: false,
          href: null,
        }}
      />

      <Tabs.Screen
        name="publicProfile/[id]"
        options={{
          headerShown: false,
          href: null,
        }}
      />
    </Tabs>
  );
};
