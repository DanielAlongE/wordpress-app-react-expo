import {DrawerItems, createDrawerNavigator, createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import DrawerComp from '../components/DrawerComp';
import theme from '../customTheme';
import React from 'react';
import {View} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import PostsScreen from '../screens/PostsScreen';
import PostScreen from '../screens/PostScreen';

const drawerViewConfig = {
    contentComponent: DrawerComp,
    contentOptions: {
      activeTintColor: theme.colors.backdrop,
      activeBackgroundColor: theme.colors.primary,
      inactiveTintColor: theme.colors.text,
      inactiveBackgroundColor: theme.colors.surface,
      style: {},
      labelStyle: {}
    },
    drawerWidth : 300,
    drawerType: 'front',// 'front' | 'back' | 'slide';
    drawerLockMode: "locked-closed", //'unlocked' | 'locked-closed' | 'locked-open';
    edgeWidth: 1,
    drawerPosition: 'left'
  //  hideStatusBar: false,
  //  overlayColor: "#fff",
  };
  

const stackConfig = {mode: 'card', //modal| 'card'
      headerBackTitleVisible:false,
      headerLayoutPreset: 'center',
      cardOverlayEnabled: false,
      
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    };

const SettingsNavigator = createBottomTabNavigator({
  Settings: {screen: ()=><View style={{flex:1, backgroundColor:'yellow'}}></View>},
  Settings1: {screen: ()=><View style={{flex:1, backgroundColor:'pink'}}></View>},
  Settings2: {screen: ()=><View style={{flex:1, backgroundColor:'violet'}}></View>}

});


const HomeNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Posts: {screen: PostsScreen},
  Post: {screen: PostScreen}
},
{...stackConfig});

export default createDrawerNavigator({
  Settings: SettingsNavigator,
  Home: HomeNavigator,
},
  {
    initialRouteName: "Home",
    
    ...drawerViewConfig,

  });
