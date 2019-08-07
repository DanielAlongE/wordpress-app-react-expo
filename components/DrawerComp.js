import React from 'react';
import { connect } from 'react-redux';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
//import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Drawer, List, Button  } from 'react-native-paper';
import NavigationService from '../navigation/NavigationService.js';
import LoadingComp from './LoadingComp';
import theme from '../customTheme';


const DrawerComp = ({categories, ...rest}) => {

    const {navigate} = NavigationService;

    const data = categories && categories.data ? categories.data : [];

var menu = data.map((n,i) => {

    const {name, slug} = n;
    
    return (
          <Drawer.Item key={`list-${i}`}
          label={name}
          onPress={() => navigate('Posts', {title:name, slug})}
        />)}
    );

    //console.log(navigation);
    
return (
<View>
    <View style={{height:100, backgroundColor:theme.colors.accent}}></View>    
    <ScrollView>
        {data.length===0 ? <LoadingComp /> : menu}
    </ScrollView>    
</View>

)};

const mapState = state => ({categories:state.api.categories});

export default connect(mapState)(DrawerComp);