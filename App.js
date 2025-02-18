/**
 * @file App Navigation Configuration and Screen Setup
 * @description Sets up the navigation structure for the React Native app, including a bottom tab navigator, stack navigators, and screens.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import for stack navigation
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // Icons for tab bar
import HomeScreen from './screens/HomeScreen';
import SavedPlantScreen from './screens/SavedPlantScreen'; // Saved plants screen
import NewsScreen from './screens/NewsScreen';
import ArticleScreen from './screens/ArticleScreen'; // Article screen
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const NewsStack = createStackNavigator(); // Stack Navigator for news-related screens

/**
 * @function NewsStackScreen
 * @description Creates a stack navigator for the News section, including the News and Article screens.
 * @returns {React.ReactElement} A stack navigator for the News section.
 */
const NewsStackScreen = () => {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        name="News"
        component={NewsScreen}
        options={{ headerShown: false }} // Disables header for the News screen
      />
      <NewsStack.Screen
        name="Article"
        component={ArticleScreen}
        options={{ title: 'Read Article' }} // Sets a title for the Article screen
      />
    </NewsStack.Navigator>
  );
};

/**
 * @function App
 * @description The main app component that sets up the bottom tab navigation and its associated screens.
 * @returns {React.ReactElement} The root app component with navigation.
 */
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home" // Sets the default tab to the Home screen
        screenOptions={{
          tabBarShowLabel: false, // Hides labels in the tab bar
          tabBarStyle: {
            height: 50,
            paddingBottom: 5,
            paddingTop: 5,
          },
          headerShown: false, // Disables headers for all tabs
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="SavedPlant"
          component={SavedPlantScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="flower" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="NewsStack"
          component={NewsStackScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="newspaper" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cogs" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
