import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
//import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Drawer, List, Button  } from 'react-native-paper';
import LoadingComp from './LoadingComp';
//import theme from '../customTheme';
import { DefaultTheme } from 'react-native-paper';

import SubMenuContainer from '../containers/SubMenuContainer';


const SubMenuComp = ({menu, navigation, theme=DefaultTheme}) => {

    const [active, setActive] = useState(-1)

    const showMenu = menu.map((item, index) => {

        const {key, name, icon, onPress} = item;

        const extra = {}
        extra.icon = icon;

        const isActive = index===active;
        
        return (
            <Drawer.Item key={key}
                label={name}
                onPress={() => {
                    setActive(index);
                    navigation.closeDrawer();
                    onPress();
                    }}
                active={isActive}
                {...extra}
            />)}
        );

        const {colors} = theme;

return (
<View style={{flex:1}}>
    <View style={{height:100, backgroundColor:colors.accent}}></View>    
    <ScrollView style={{flex:1}}>
        {menu.length===0 ? <LoadingComp /> : showMenu}
    </ScrollView>    
</View>

)};


export default SubMenuContainer(SubMenuComp);