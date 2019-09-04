import React from 'react';
//import {TestForm} from '../builder/TestForm';
import AppEditor from '../builder/containers/AppEditorContainer';
import { IconButton } from 'react-native-paper';
import { withNavigationFocus } from "react-navigation";


function EditorScreen({navigation, isFocused}) {

  if(isFocused){
    return <AppEditor navigation={navigation} isFocused={isFocused} />;
  }else{
    return null;
  }
}



export default withNavigationFocus(EditorScreen);