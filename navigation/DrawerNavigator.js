import {DrawerItems, createDrawerNavigator, createStackNavigator} from 'react-navigation';
import DrawerComp from '../components/DrawerComp';
import theme from '../customTheme';

import HomeScreen from '../screens/HomeScreen';
import PostsScreen from '../screens/PostsScreen';

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
  

const stackConfig = {mode: 'modal', //| 'card'
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


const HomeNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Posts: {screen: PostsScreen}
},
{...stackConfig});

export default createDrawerNavigator({
  Home: HomeNavigator,
},
  {
    initialRouteName: "Home",
    
    ...drawerViewConfig,

  });
