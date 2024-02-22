import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AllChatsScreen from "../../../screens/chat/AllChatsScreen";
import GroupsScreen from "../../../screens/chat/AllGroupsScreen";

const Tab = createMaterialTopTabNavigator();

const Index = () => {
  return (
    <NavigationContainer independent>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "green", // Color for the active tab
          inactiveTintColor: "#000", // Color for the inactive tab
          labelStyle: {
            fontSize: 16, // Font size for tab labels
            fontWeight: "bold", // Font weight for tab labels
          },
          indicatorStyle: {
            backgroundColor: "green", // Color for the tab indicator
          },
        }}
      >
        <Tab.Screen name="Chats" component={AllChatsScreen} />
        <Tab.Screen name="Groups" component={GroupsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Index;
