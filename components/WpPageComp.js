import React from 'react';
import {View, Image, ImageBackground} from 'react-native';
import WpPageContainer from '../containers/WpPageContainer';
import {default as Box} from '../layouts/ResponsiveBox';
import {Button, List, Avatar, Surface, Card, Text, Title, Paragraph } from 'react-native-paper';
//import Loading from './LoadingComp';
import HTML from 'react-native-render-html';



const Page = ({page={},...rest}) => {
   
//{key:`post-${key}-${id}`, id, title:purgeHtml(t), content:c, excerpt:purgeHtml(e), date:dateFromNow, media:{thumbnail, medium, full}};

const {title="Page not found", content, date, media} = page;

    return (<Box style={{pMarginLeft:5, pMarginRight:5}}>
                {content && <HTML html={content} />}   
            </Box>);
/*
    return(
        <View>
            <Card theme={{roundness:0}}>
                {media && <Card.Cover source={{ uri: media.medium.source_url }} />}
            <Card.Content>
            <Title>{title}</Title>
            {date && <Paragraph>{date}</Paragraph>}
            </Card.Content>
        </Card> 
            <Box style={{pMarginLeft:5, pMarginRight:5}}>
                {content && <HTML html={content} />}   
            </Box>
                            
        </View>
    );
        */


}

//const Post = ({id})=><View><Text>I am a post {id}</Text></View>

export default WpPageContainer(Page)