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

import WordPress from '../builder/components/WordPressPostsComp';

const mapState = state => ({gState:state.globalState});

class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    
    return ({
    headerTitle: navigation.getParam('title', 'Wordpress App'),
    headerLeft: ({scene})=>{
      var {navigation} = scene.descriptor;
      return (<MenuButton  onPress={()=>navigation.toggleDrawer()} />)},
  });
}

  componentDidMount() {
 
    //navigation.navigate('Home', {title:'I hope we are right'});
    //console.log({gState});
  }

  render(){ 

    const {navigation} = this.props;

    
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <WordPress navigation={navigation} />
          
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

export default HomeScreen;