//import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MenuButton from '../components/MenuButton';
import PostsComp from '../components/PostsComp';
import CategoriesComp from '../components/CategoriesComp';
import theme from '../customTheme';
import ScreenRotate from '../layouts/ScreenRotate';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    headerTitle: "Wordpress App",
    headerLeft: ({scene})=>{
      var {navigation} = scene.descriptor;
      return (<MenuButton  onPress={()=>navigation.toggleDrawer()} />)},
  };


  render(){ 

    //console.log('HomeScreen', this.props)
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <CategoriesComp />
          <PostsComp />
        </ScrollView>
        <ScreenRotate />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.colors.background
  },

});
