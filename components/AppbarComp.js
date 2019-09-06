import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import MainMenu from './MainMenuComp';

const AppbarComp = ({navigation}) => {
    //subtitle={subtitle || ''}
    const title = navigation.getParam('title', 'Wordpress App');
    return (
        <View>    
            <Appbar.Header>
                <Appbar.Action icon="menu" onPress={()=>navigation.toggleDrawer()} />
                <Appbar.Content title={title} />
                {/*<Appbar.BackAction onPress={() => navigation.goBack()} />*/}
            </Appbar.Header>
            <MainMenu navigation={navigation} />                
        </View>
    );
}

export default AppbarComp;