import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import MeditationScreen from './src/screens/MeditationScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';
import ResourcesScreen from './src/screens/ResourcesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CrisisScreen from './src/screens/CrisisScreen';
import MoodScreen from './src/screens/MoodScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="Conversation" component={ConversationScreen} />
              <Stack.Screen name="Meditation" component={MeditationScreen} />
              <Stack.Screen name="Challenges" component={ChallengesScreen} />
              <Stack.Screen name="Resources" component={ResourcesScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Crisis" component={CrisisScreen} />
              <Stack.Screen name="Mood" component={MoodScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;