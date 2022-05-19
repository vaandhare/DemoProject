import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginPage from './src/screens/loginPage';
import HomePage from './src/screens/homePage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebViewPage from './src/screens/WebViewPage';
import ListView from './src/screens/ListView';

const Stack = createNativeStackNavigator();

const App = () => {
  const [sessionValue, setsessionValue] = useState('');

  const checkUserSession = async () => {
    const session = await AsyncStorage.getItem('session');
    if (JSON.parse(session)) {
      setsessionValue('home');
    } else {
      setsessionValue('login');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkUserSession();
    }, 2000);
  }, []);

  if (!sessionValue) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={sessionValue}>
        <Stack.Screen
          name="login"
          component={LoginPage}
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen
          name="home"
          component={HomePage}
          options={{
            title: 'Home Page',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="webview"
          component={WebViewPage}
          options={{
            title: 'WebView',
          }}
        />
        <Stack.Screen
          name="listview"
          component={ListView}
          options={{
            title: 'ListView',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
