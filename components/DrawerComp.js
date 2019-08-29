import React from 'react';
import { connect } from 'react-redux';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
//import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Drawer, List, Button  } from 'react-native-paper';
//import NavigationService from '../navigation/NavigationService.js';
import LoadingComp from './LoadingComp';
import theme from '../customTheme';



const DrawerComp = ({categories, navigation, ...rest}) => {

    const {navigate} = navigation;

    const data = categories && categories.data ? categories.data : [];

    let root = data.filter((cat)=>cat.parent === 0);

    //console.log('navigation', rest.navigation.push);

var menu = root.map((n,i) => {

    const {name, id} = n;
    
    return (
        <Drawer.Item key={`list-${i}`}
          label={name}
          onPress={() => {
                navigation.closeDrawer();
              navigate('Posts', {title:name, categories:id});
            }}
        />)}
    );

    const {colors} = theme();
    
return (
<View>
    <View style={{height:100, backgroundColor:colors.accent}}></View>    
    <ScrollView>
        {data.length===0 ? <LoadingComp /> : menu}
    </ScrollView>    
</View>

)};

const mapState = state => ({
    categories:state.api.categories,
    gState: state.globalState
});

export default connect(mapState)(DrawerComp);