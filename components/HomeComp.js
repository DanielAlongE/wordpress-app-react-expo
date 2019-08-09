import React from 'react';
import {View, Image, ImageBackground} from 'react-native';
import HomeContainer from '../containers/HomeContainer';
import {default as Box} from '../layouts/ResponsiveBox';
import {Button, List, Avatar, Surface, Card, Text, Title, Paragraph } from 'react-native-paper';
import Loading from './LoadingComp';
import HTML from 'react-native-render-html';

const HomeComp = ({some}) => {

    return (
        <View>
            <Text></Text>
        </View>
    );
}

export default HomeContainer(HomeComp);