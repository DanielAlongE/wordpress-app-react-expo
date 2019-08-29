import React from 'react';
import {Appbar} from 'react-native-paper';

const AppbarComp = ({navigation}) => {
    //subtitle={subtitle || ''}
    const title = navigation.getParam('title', 'Wordpress App');
    return (
    <Appbar.Header>
        <Appbar.Action icon="menu" onPress={()=>navigation.toggleDrawer()} />
        <Appbar.Content
            title={title}
        />
        {/*<Appbar.BackAction onPress={() => navigation.goBack()} />*/}
    </Appbar.Header>
    );
}

export default AppbarComp;