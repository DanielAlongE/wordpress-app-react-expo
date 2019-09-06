import React from 'react';
import {  ScrollView, View } from 'react-native';
import {  Text, Button, Card, Title, Paragraph, Avatar, TextInput, Divider, Switch, RadioButton, Checkbox, List, IconButton } from 'react-native-paper';
//import NavigationService from '../../navigation/NavigationService.js';
//import WordPressPostsContainer from '../containers/WordPressPostsContainer';
import HomeContainer from '../../containers/HomeContainer';
import LoadingComp from '../../components/LoadingComp';
//import MainMenu from '../../components/MainMenuComp';

export const PostsRegister = [
    {name:'List', comp:WordPressList},
    {name:'Thumbnail List', comp:WordPressThumbnailList},
    {name:'Card', comp:WordPressCard},
    {name:'Card Slide', comp:WordPressCardSlide},
    {name:'Thumbnail Slide', comp:WordPressThumbnailSlide}
];

const Wrapper = ({title, children}) => {
    return (<View>{children}</View>);
}

export const WordPressList = ({posts, navigation}) =>{

    const {navigate} = navigation;

    const showPosts = posts.map(post => <List.Item key={post.key} title={post.title} onPress={()=>navigate('Post',{title:post.title, id:post.id})} />);

    if(posts.length === 0){
        return <LoadingComp />
    }

    return (<Wrapper>{showPosts}</Wrapper>);
}

export const WordPressThumbnailList = ({posts, navigation}) =>{

    const {navigate} = navigation;

    const showPosts = posts.map(post => 
                <Card key={post.key} style={{height:150, margin:5}} onPress={()=>navigate('Post',{title:post.title, id:post.id})}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:1, margin:2}}>
                            <Card.Cover style={{flex:1}} source={{ uri: post.media.medium.source_url }} />
                        </View>
                        <View style={{flex:2, margin:2}}>
                            <Title>{post.title}</Title>
                            <Text style={{flex:1}}>{post.excerpt}</Text>
                        </View>
                    </View>
                </Card>
                );

    return (<Wrapper>{showPosts}</Wrapper>);
}

export const WordPressThumbnailSlide = ({posts, navigation}) =>{

    const {navigate} = navigation;

    const showPosts = posts.map(post => 
                    <Card key={post.key} style={{height:200, width:200, margin:5}} onPress={()=>navigate('Post',{title:post.title, id:post.id})}>
                        <Card.Cover source={{ uri: post.media.medium.source_url }} />
                    </Card>
                    )

    return (<ScrollView horizontal={true}>{showPosts}</ScrollView>);
}

export const WordPressCardSlide = ({posts, navigation}) =>{

    const {navigate} = navigation;

    const showPosts = posts.map(post => 
                        <Card key={post.key} style={{height:250, width:300, margin:5}} onPress={()=>navigate('Post',{title:post.title, id:post.id})}>
                            <Card.Cover source={{ uri: post.media.medium.source_url }} />
                            <Card.Content>
                                <Paragraph>{post.title}</Paragraph>
                            </Card.Content>
                        </Card>
                    );


    return (<ScrollView horizontal={true}>{showPosts}</ScrollView>);
}

export const WordPressCard = ({posts, navigation}) =>{

    const {navigate} = navigation;

    const showPosts = posts.map(post => 
                          <Card key={post.key} onPress={()=>navigate('Post',{title:post.title, id:post.id})}>
                            <Card.Cover source={{ uri: post.media.medium.source_url }} />
                            <Card.Content>
                                <Paragraph>{post.title}</Paragraph>
                            </Card.Content>
                        </Card>
                    )
    
    return (<View>{showPosts}</View>);
}

const TestingAllComp = ({posts, navigation}) => {
    const args = {posts, navigation};
    return (<View>
        <WordPressCardSlide {...args} />
        <WordPressThumbnailList {...args} />
        <WordPressThumbnailSlide {...args} />
        <WordPressCard {...args} />
        <WordPressList {...args} />

    </View>);
    }

export default HomeContainer(TestingAllComp);

//export default WordPressPostsContainer(WordPressThumbnailList);

//export default (props)=><WordPressPostsContainer {...props} ><WordPressThumbnailList /></WordPressPostsContainer>