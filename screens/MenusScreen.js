import React from 'react';
//import {TestForm} from '../builder/TestForm';
import AppMenus from '../builder/containers/AppMenusContainer';
import { IconButton } from 'react-native-paper';
import { withNavigationFocus } from "react-navigation";

function SettingsScreen({navigation} ) {

  return <AppMenus navigation={navigation} />;
}

SettingsScreen.navigationOptions = {
  title: 'Menus',
  tabBarIcon: ({focused, horizontal, tintColor})=>{
    return (<IconButton color={tintColor} icon="list" />);
  }
};

export default withNavigationFocus(SettingsScreen);