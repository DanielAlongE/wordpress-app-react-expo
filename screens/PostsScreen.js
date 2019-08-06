//import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MenuButton from '../components/MenuButton';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    headerTitle: "Posts",
    headerLeft: ({scene})=>{
      var {navigation} = scene.descriptor;
      return (<MenuButton  onPress={()=>navigation.toggleDrawer()} />)},
  };

render(){ return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Text>Posts!</Text>
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
