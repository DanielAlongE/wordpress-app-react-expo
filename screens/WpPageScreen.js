//import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MenuButton from '../components/MenuButton';
import WpPageComp from '../components/WpPageComp';

export default class WpPageScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    
    return ({
    headerTitle: navigation.getParam('title', 'Wordpress App'),
    headerLeft: ({scene})=>{
      var {navigation} = scene.descriptor;
      return (<MenuButton  onPress={()=>navigation.toggleDrawer()} />)},
  });
}


render(){ 
  const {navigation} = this.props;

  var id = navigation.getParam('id', 0);

  var args = {navigation, id};

  return (
        <WpPageComp {...args} />
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});
