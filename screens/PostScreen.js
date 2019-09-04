//import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView, View } from 'react-native';
import PostComp from '../components/PostComp';
import { withNavigationFocus } from "react-navigation";

  function PostScreen({navigation, isFocused}) {

    const id = navigation.getParam('id', 0);

    const args = {navigation, isFocused, id};
  
      return (
          <ScrollView style={{flex:1}}>
            <PostComp {...args} />
          </ScrollView>
      );

  }

export default withNavigationFocus(PostScreen);