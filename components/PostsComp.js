import React from 'react';
//import {View, Image, ImageBackground} from 'react-native';
import PostsContainer from '../containers/PostsContainer';
import {default as Box} from '../layouts/ResponsiveBox';
import {Button, List, Avatar, Surface, Card, Text, Title, Paragraph, View } from 'react-native-paper';
import Loading from './LoadingComp';
//import HTML from 'react-native-render-html';
import {WordPressThumbnailList} from '../builder/components/WordPressPostsComp';


const Posts = ({posts=[], fetchMore, isFetching, navigation}) => {

    const args = {posts, isFetching, navigation};

return (
<Box>
    <WordPressThumbnailList {...args} />
    {isFetching ?  <Loading /> : <Box style={{pMarginLeft:30, pMarginRight:30}}><Button mode="contained" onPress={()=>fetchMore()} >More</Button></Box>}
</Box>);
}

export default PostsContainer(Posts);