import React from 'react';
import {View, Image, ImageBackground} from 'react-native';
import PostsContainer from '../containers/PostsContainer';
import {default as Box} from '../layouts/ResponsiveBox';
import {Button, List, Avatar, Surface, Card, Text, Title, Paragraph } from 'react-native-paper';
import Loading from './LoadingComp';
import HTML from 'react-native-render-html';

const moment = require('moment');

const Wrapper = ({children, ...rest}) => <Box style={{pWidth:100, pMarginLeft:5, pMarginRight:5}}>
{children}
</Box>

const Img = (args) => <Box as={Image}
small={{ pWidth: 100, pHeight: 50, tintColor:'red'}} {...args} />

const Posts = ({posts={}, fetchMore, Navigation, theme, categories, ...rest}) => {
    var {data=[], isFetching=true} = posts;

    if(categories){
        data = data.filter(post=>{ 
            console.log(post.categories, post.categories.indexOf(categories))
            return post.categories.indexOf(categories) > -1; });
        console.log('categories', categories);
    }



    const show = data.map((n,i)=>{

        const {title:{rendered:t}, content:{rendered:c}, excerpt:{rendered:e}, date, _embedded} = n;

        const dateFromNow = moment(date, "YYYY-MM-DD HH:mm:ss").fromNow();
        const media = _embedded && _embedded['wp:featuredmedia'] && _embedded['wp:featuredmedia'][0] && _embedded['wp:featuredmedia'][0]['media_details'] && _embedded['wp:featuredmedia'][0]['media_details']['sizes'] ?  _embedded['wp:featuredmedia'][0]['media_details']['sizes'] : {};

        const {thumbnail={source_url:'https://picsum.photos/200'}, medium={source_url:'https://picsum.photos/500'}, full={source_url:'https://picsum.photos/700'}} = media;
        //

        //console.log('media',media);

        if(i===0){
            return(
                <Card key={`post-${i}`} theme={{roundness:0}}>
                    <Card.Cover source={{ uri: medium.source_url }} />
                <Card.Content>
                  <Title>{t}</Title>
                  <Paragraph>{dateFromNow}</Paragraph>
                </Card.Content>
              </Card>
            );
        }

        return (
        <Box key={`post-${i}`} style={{marginBottom:10, marginTop:10}}>
            <Surface elevation={5}>
                <List.Accordion title={t} description={dateFromNow} 
                left={props=>(<Avatar.Image size={30} source={{uri:thumbnail.source_url}} />)} >
                    <View style={{paddingRight:10}}>
                        <HTML html={e} imagesMaxWidth={800} />
                    </View>
                </List.Accordion>                
            </Surface>
        </Box>);

    });


return (
<Box>
    {show}
    {isFetching ?  <Loading /> : <Box style={{pMarginLeft:30, pMarginRight:30}}><Button mode="contained" onPress={()=>fetchMore()} >More</Button></Box>}
</Box>);
}

export default PostsContainer(Posts);