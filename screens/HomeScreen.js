//import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MenuButton from '../components/MenuButton';
//import HomeComp from '../components/HomeComp';
//import PostsComp from '../components/PostsComp';
import theme from '../customTheme';
import ScreenRotate from '../layouts/ScreenRotate';
import { withNavigationFocus } from "react-navigation";
import WordPress from '../builder/components/WordPressPostsComp';
//import WordPress from '../components/HomeComp';


class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
  
    return ({
    headerTitle: navigation.getParam('title', 'Wordpress App'),
    headerLeft: ({scene})=>{
      var {navigation} = scene.descriptor;
      return (<MenuButton  onPress={()=>navigation.toggleDrawer()} />)},
  });
}

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      // Use the `this.props.isFocused` boolean
      // Call any action

    }
    //console.log("HomeScreen is Focused", prevProps.isFocused , this.props.isFocused)
    
    //let state = this.props.navigation.state.params;

    //console.log('HomeScreen',{state});
  }

  componentDidMount() {
 
    //this.props.navigation.navigate('Home', {title:'I hope we are right'});

  }

  render(){ 

    const {navigation, isFocused} = this.props;

    const app = navigation.state.params || {};

    const {colors} = theme();
    
    return (
      <ScrollView style={{flex:1}}>
        <View style={{backgroundColor:colors.background}}>
            <WordPress navigation={navigation} app={app} isFocused={isFocused} />
          <ScreenRotate />
        </View>        
      </ScrollView>
    )
  }
}


export default withNavigationFocus(HomeScreen);