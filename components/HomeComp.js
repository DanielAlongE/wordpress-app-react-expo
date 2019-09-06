import React from 'react';
import {View, Image, ImageBackground} from 'react-native';
import HomeContainer from '../containers/HomeContainer';
import {default as Box} from '../layouts/ResponsiveBox';
import {Button, List, Avatar, Surface, Card, Text, Title, Paragraph } from 'react-native-paper';
import Loading from './LoadingComp';
import HTML from 'react-native-render-html';
import MainMenu from './MainMenuComp'

const HomeComp = ({some}) => {

    return (
        <View style={{flex:1}}>
            <MainMenu />
            <Text>This is the Home Page o</Text>
        </View>
    );
}

export default HomeContainer(HomeComp);