import React from 'react';
//import {TestForm} from '../builder/TestForm';
//import AppMenus from '../builder/containers/AppMenusContainer';
import { IconButton } from 'react-native-paper';
import Colors  from '../builder/components/ColorComp'

export default function SettingsScreen({navigation} ) {

  return <Colors navigation={navigation} />;
}

SettingsScreen.navigationOptions = {
  title: 'Pages',
  tabBarIcon: ({focused, horizontal, tintColor})=>{
    return (<IconButton color={tintColor} icon="description" />);
  }
};
