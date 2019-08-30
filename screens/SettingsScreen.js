import React from 'react';
//import {TestForm} from '../builder/TestForm';
import { withNavigationFocus } from "react-navigation";
import AppSettings from '../builder/containers/AppSettingsContainer';
import { IconButton } from 'react-native-paper';


function SettingsScreen({navigation, isFocused}) {

  if(isFocused){
    return <AppSettings navigation={navigation} isFocused={isFocused} />;
  }else{
    return null;
  }
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
  tabBarIcon: ({focused, horizontal, tintColor})=>{
    return (<IconButton color={tintColor} icon="settings" />);
  }
};

export default withNavigationFocus(SettingsScreen);
