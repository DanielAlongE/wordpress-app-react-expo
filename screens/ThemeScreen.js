import React from 'react';
//import {TestForm} from '../builder/TestForm';
import AppBuilder from '../builder/containers/AppSettingsContainer';
import { IconButton } from 'react-native-paper';


export default function SettingsScreen({navigation} ) {

  return <AppBuilder navigation={navigation} />;
}

SettingsScreen.navigationOptions = {
  title: 'Theme',
  tabBarIcon: ({focused, horizontal, tintColor})=>{
    return (<IconButton color={tintColor} icon="format-paint" />);
  }
};
