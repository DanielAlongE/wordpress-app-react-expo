import React from 'react';
//import {TestForm} from '../builder/TestForm';
import AppMenus from '../builder/containers/AppMenusContainer';
import { IconButton } from 'react-native-paper';

export default function SettingsScreen({navigation} ) {

  return <AppMenus navigation={navigation} />;
}

SettingsScreen.navigationOptions = {
  title: 'Menus',
  tabBarIcon: ({focused, horizontal, tintColor})=>{
    return (<IconButton color={tintColor} icon="list" />);
  }
};
