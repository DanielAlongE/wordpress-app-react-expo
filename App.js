//import { AppLoading } from 'expo';
//import { Asset } from 'expo-asset';
//import * as Font from 'expo-font';
import React from 'react';
import { AppRegistry, Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
//import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';
import Provider from './redux/Provider';
//import { Provider as PaperProvider } from 'react-native-paper';
//import NavigationService from './navigation/NavigationService';
//import theme from './customTheme';
//import { DefaultTheme } from 'react-native-paper';
import PaperProvider from './PaperProvider';


function App() {


    return (
      <Provider>
        <PaperProvider>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
        </PaperProvider>
      </Provider>
    );
  
}


  export default App;

  AppRegistry.registerComponent('app', () => App);

