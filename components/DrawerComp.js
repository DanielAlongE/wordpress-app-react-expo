import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
//import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Drawer, List, Button  } from 'react-native-paper';
import CategoriesContainer from '../containers/CategoriesContainer';
import LoadingComp from './LoadingComp';
import theme from '../customTheme';


const DrawerComp = ({categories=[], navigation, ...rest}) => {

    const {navigate} = navigation;

    console.log({categories});
    //<List.Item key={`list-${i}`} title={n.name} />
    //active={active === 'first'}

var menu = categories.map((n,i) => {

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
        {categories.length===0 ? <LoadingComp /> : menu}
    </ScrollView>    
</View>

)};

export default CategoriesContainer(DrawerComp);