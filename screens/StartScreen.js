import React from 'react';
//import {TestForm} from '../builder/TestForm';
import AppManager from '../builder/containers/AppManagerContainer'
//import AppManager from '../components/MainMenuComp';

export default function SplashScreen({navigation}) {
  
  return <AppManager navigation={navigation} />;
}

SplashScreen.navigationOptions = {
  title: 'Testing Form',
  mode: 'modal',
  headerMode: 'none',
  header: null
};
