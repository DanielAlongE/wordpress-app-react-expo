import React from 'react';
//import {TestForm} from '../builder/TestForm';
import AppTheme from '../builder/containers/AppThemeContainer';
//import AppThemeComp from '../builder/components/AppThemeComp';
import { IconButton } from 'react-native-paper';
import { withNavigationFocus } from "react-navigation";

function ThemeScreen({navigation, isFocused} ) {

  if(isFocused){
    return <AppTheme  navigation={navigation} isFocused={isFocused} />;
  }else{
    return null;
  }


}

ThemeScreen.navigationOptions = {
  title: 'Theme',
  tabBarIcon: ({focused, horizontal, tintColor})=>{
    return (<IconButton color={tintColor} icon="format-paint" />);
  }
};

export default withNavigationFocus(ThemeScreen)