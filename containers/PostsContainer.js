import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import {compose} from 'redux';
import { connect } from 'react-redux';

import {getApi, cancelToken} from '../redux/api/action';

import { WordPressClass } from '../builder/containers/WordPressPostsContainer';


const PostsContainer = (Comp, rest={}) => class extends WordPressClass {

  apiId = !!rest.id ? rest.id : 'posts';
  offset=0;
  per_page=10;
  //categories=0;
  //author=0;
  search='';
  orderby='date';
  order='desc';
  status='publish';
  //hide_empty=true

  constructor(props){

    super(props);

    this.state = {
        
    }
   
    //desc, asc |author, date, id, include, modified, parent, relevance, slug, title
   this.fetchMore = this.fetchMore.bind(this);


  }


  fetchMore(){
    let obj ={};
    const {categories} = this.props;

    if(categories){
      obj.categories = categories;
    }
    
    this.fetchPosts(obj);
  }


  componentWillMount(){
    this._isMounted = false;
    //set cancelToken
    //this.cancelToken = this.props.cancelToken();
  }

  componentWillUnmount() {
    this._isMounted = false;

    //if(this.cancelToken){ this.cancelToken.cancel('ComponenetWillUnmount');}
  }

  shouldComponentUpdate(nextProps) {
    const oldCat = this.props.categories;
    const newCat = nextProps.categories;

    
    if(oldCat !== newCat){
      this.init();
      console.log("Posts Cat Changed", oldCat, newCat );
    }
      return true;
  }

  init(){
    const {categories, posts, navigation} = this.props;

    if(navigation){
        //close Drawer
        navigation.closeDrawer();
    }

    if(categories){
        if(posts){
          const check = posts.data.filter(post=>{ return post.categories.includes(categories);  });
  
          if(check.length>=5){
            console.log(`post category:${categories} has ${check.length} data`);
          }else{
            this.fetchMore();
            console.log(`post category:${categories} has ${check.length} data`);
          }
  
        }else{
          this.fetchMore();
        }
    }
    else if(posts && posts.data){}else{this.fetchMore()}
  
  }

  componentDidMount() {
    this._isMounted = true;

    this.init();
  }


        render() {

        const {fetchMore} = this;

        const {navigation, posts, categories, appIndex} = this.props;

        const args = {fetchMore};

        //this.init();

        if(posts){
          //args.posts = posts;
          const {data=[]} = posts;

          args.isFetching = posts.isFetching;

          var collection = [];
        
            if(categories){
              args.categories = categories;
              collection = data.filter(post=>{ return post.categories.includes(categories);  });

            }else{
              collection = data;
            }

            //prepare post for render
            args.posts = Array.isArray(data) ? this.preparePosts(collection, appIndex) : [];

          }





         if(navigation){
          args.navigation = navigation;
        }

        return (
            <Comp {...args} />
        )
        }

    }



const mapStateToProps = state => {
  
  const appIndex =  state.globalState.currentApp || 0;
    
      return ({
          url: state.globalState.url,
          posts:state.api[`posts-${appIndex}`],
//          categories:state.api[`categories-${appIndex}`], 
//          gState:state.globalState, 
          appIndex
  
    });
  };

export default compose(
    connect(mapStateToProps, {getApi, cancelToken}),
    PostsContainer
  );