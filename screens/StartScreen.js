import React from 'react';
//import {TestForm} from '../builder/TestForm';
import AppManager from '../builder/containers/AppManagerContainer'
//import AppManager from '../components/MainMenuComp';
import { withNavigationFocus } from "react-navigation";

function SplashScreen({navigation, isFocused}) {
  
    return <AppManager isFocused={isFocused} navigation={navigation} />;

}

SplashScreen.navigationOptions = {
  title: 'Testing Form',
  mode: 'modal',
  headerMode: 'none',
  header: null
};

export default withNavigationFocus(SplashScreen);