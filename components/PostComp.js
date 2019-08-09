import React from 'react';
import {View, Image, ImageBackground} from 'react-native';
import PostContainer from '../containers/PostContainer';
import {default as Box} from '../layouts/ResponsiveBox';
import {Button, List, Avatar, Surface, Card, Text, Title, Paragraph } from 'react-native-paper';
import Loading from './LoadingComp';
import HTML from 'react-native-render-html';

const moment = require('moment');


const Post = ({post={},...rest}) => {
   
    
    //const {navigate} = Navigation;


        const {id, title:{rendered:t=''}, content:{rendered:c=''}, excerpt:{rendered:e=''}, date, _embedded} = post;

        const dateFromNow = moment(date, "YYYY-MM-DD HH:mm:ss").fromNow();
        const media = _embedded && _embedded['wp:featuredmedia'] && _embedded['wp:featuredmedia'][0] && _embedded['wp:featuredmedia'][0]['media_details'] && _embedded['wp:featuredmedia'][0]['media_details']['sizes'] ?  _embedded['wp:featuredmedia'][0]['media_details']['sizes'] : {};

        const {thumbnail={source_url:'https://picsum.photos/200'}, medium={source_url:'https://picsum.photos/500'}, full={source_url:'https://picsum.photos/700'}} = media;
        //

        //console.log('media',media);

            return(
                <View>
                    <Card theme={{roundness:0}}>
                        <Card.Cover source={{ uri: medium.source_url }} />
                    <Card.Content>
                    <Title>{t}</Title>
                    <Paragraph>{dateFromNow}</Paragraph>
                    </Card.Content>
                </Card> 
                    <Box style={{pMarginLeft:5, pMarginRight:5}}>
                        {c && <HTML html={c} imagesMaxWidth={800} />}   
                    </Box>
                                   
                </View>
            );
        


}

//const Post = ({id})=><View><Text>I am a post {id}</Text></View>

export default PostContainer(Post)