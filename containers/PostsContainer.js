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

componentDidMount() {
  this._isMounted = true;

  const {categories, posts} = this.props;



  if(categories){
      if(posts){
        var check = posts.data.filter(post=>{ return post.categories.indexOf(categories) > -1;  });

        if(check.length>0){
          console.log('post cat has content', categories);
        }else{
          this.fetchMore();
          console.log('post cat is fetching content', categories);
        }

      }else{
        this.fetchMore();
      }
  }
  else if(posts){}else{this.fetchMore()}

}


        render() {

        const {fetchMore} = this;

        const {navigation, posts, categories, appIndex} = this.props;

        const args = {fetchMore};

        if(posts){
          //args.posts = posts;
          const {data=[]} = posts;

          args.isFetching = posts.isFetching;

          var collection = [];
        
            if(categories){
              args.categories = categories;
              collection = data.filter(post=>{ return post.categories.indexOf(categories) > -1 });

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