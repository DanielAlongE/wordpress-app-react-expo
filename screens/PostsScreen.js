//import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView, View } from 'react-native';
//import MenuButton from '../components/MenuButton';
import PostsComp from '../components/PostsComp';
import { withNavigationFocus } from "react-navigation";

  function PostsScreen({navigation, isFocused}) {

    const categories = navigation.getParam('categories', 0);

    const args = {navigation, isFocused};
  
    if(categories>0){
      args.categories = categories;
    }

      return (
          <ScrollView style={{flex:1}}>
            <PostsComp {...args} />
          </ScrollView>
      );      



  }


export default withNavigationFocus(PostsScreen);