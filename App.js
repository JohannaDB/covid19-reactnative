import React from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "./app/screens/HomeScreen";
import CountryListScreen from "./app/screens/CountryListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CountryDetails from "./app/screens/CountryDetails";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Covid-19 App",
            headerStyle: {
              backgroundColor: "#fc5b54",
            },
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="Countries"
          component={CountryListScreen}
          options={{
            headerStyle: {
              backgroundColor: "#fc5b54",
            },
            headerTitleStyle: {
              color: "white",
            },
          }}
        />
        <Stack.Screen
          name="CountryDetails"
          component={CountryDetails}
          options={({ route }) => ({
            title: route.params.country,
            headerStyle: { backgroundColor: "#fc5b54" },
            headerTitleStyle: { color: "white" },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
