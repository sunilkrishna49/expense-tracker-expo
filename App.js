import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecentExpenseScreen from "./src/screens/RecentExpenseScreen";
import AllExpensesScreen from "./src/screens/AllExpensesScreen";
import { StatusBar } from "expo-status-bar";
import ManageExpensesScreen from "./src/screens/ManageExpensesScreen";
import { GlobalStyles } from "./src/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./src/components/UI/IconButton";
import ExpensesContextProvider from "./src/store/contextApi";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const App = () => {
  const ExpensesOverScreen = () => {
    return (
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => (
            <IconButton
              name="add"
              color={tintColor}
              size={24}
              onPress={() => {
                navigation.navigate("ManageExpense");
              }}
            />
          ),
        })}
      >
        <BottomTabs.Screen
          name="Recent"
          component={RecentExpenseScreen}
          options={{
            title: "Recent Expenses",
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="hourglass" color={color} size={size} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="All"
          component={AllExpensesScreen}
          options={{
            title: "All Expenses",
            tabBarLabel: "All Expenses",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    );
  };
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ExpenseOverview"
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpensesScreen}
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="ExpenseOverview"
              component={ExpensesOverScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
