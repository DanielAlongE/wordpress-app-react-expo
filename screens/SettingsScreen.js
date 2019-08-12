import React from 'react';
//import {TestForm} from '../builder/TestForm';
import AppSettings from '../builder/containers/AppSettingsContainer';
import { IconButton } from 'react-native-paper';


export default function SettingsScreen({navigation} ) {

  return <AppSettings navigation={navigation} />;
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
  tabBarIcon: ({focused, horizontal, tintColor})=>{
    return (<IconButton color={tintColor} icon="settings" />);
  }
};
