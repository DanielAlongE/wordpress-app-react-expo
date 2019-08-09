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

export default class HomeScreen extends React.Component {

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

  var categories = navigation.getParam('categories', 0);

  var args = {navigation};

  if(categories>0){
    args.categories = categories;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <PostsComp {...args} />
      </ScrollView>
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});
