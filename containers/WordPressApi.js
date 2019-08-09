import React, { Component } from 'react';
//import PropTypes from 'prop-types';
//import {compose} from 'redux';
import { connect } from 'react-redux';

import {getApi, cancelToken} from '../redux/api/action';
import set from '../redux/global-state';


class WordpressApi extends Component {

  apiId = 'home';
  offset=0;
  per_page=1;
  //categories=0;
  //author=0;
  search='';
  orderby='date';
  order='desc';
  status='publish';
  //hide_empty=true


  constructor(props){
    this.props;
  }

  //here we will get id of all the posts that have been previously fetched in order to exclude the from future fetches
  getAvailablePostsId(){
    const {posts} = this.props;

    return new Promise((resolve)=>{ 
      if(posts && posts.data && Array.isArray(posts.data)){
        var ids = posts.data.map(post=>post.id);
        resolve(ids)
      }else{
        resolve([])
      }
  
      
  });


  }

  fetchMore(){
      let {per_page, orderby, order, apiId} = this;
      let {getApi, url} = this.props;
      var  offset = this.props.api && this.props.api[apiId] && this.props.api[apiId].offset ? this.props.api[apiId].offset : 0;
    //console.log('static', this);
      getApi(`${url}/wp-json/wp/v2/posts`,{per_page, orderby, offset, order, _embed:''}, apiId)
        .then(res=>console.log(apiId, 'done fetching >', offset));
  }

  fetchCategories(obj={}){
    var {per_page=50, orderby='count',  order='desc',  hide_empty=true} = obj;
    let {getApi, url} = this.props;
  //console.log('static', this);
    return getApi(`${url}/wp-json/wp/v2/categories`,{per_page, orderby, order, hide_empty},'categories').then(res=>res.data);
  }

  fetchPosts(obj={}){
    let {per_page, orderby, order} = this;
    let {getApi, url} = this.props;
  
    //get already fetch posts
    return this.getAvailablePostsId().then(ids=>{
      //console.log(`getAvailablePostsId (${id.length})`, id.join())
      if(ids.length>0){
        obj.exclude = ids.join();
      }

      return getApi(`${url}/wp-json/wp/v2/posts`,{per_page, orderby, order, ...obj, _embed:''}, 'posts');  
    });
  }

  getCategories(){
    const {categories} = this.props;

    //use from store if available
    if(categories){
      return categories.data;
    }
    else //fetch from rest api
    {
      return this.fetchCategories().then(res=>{
        console.log('done fetching categories');
        if(Array.isArray(res)){
          //return only root categories
          return res.filter(cat=>cat.parent===0)
        }else{
          return [];
        }
      });


    }
  }


 oneByOne(objects_array, iterator, callback) {
    var start_promise = objects_array.reduce(function (prom, object) {
        return prom.then(function () {
            return iterator(object);
        });
    }, Promise.resolve()); // initial
    if(callback){
        start_promise.then(callback);
    }else{
        return start_promise;
    }
}

  fetchPostsByCategory(ids=[]){

    if(ids.length>0){
      
      ids.forEach(category =>{
        this.fetchPosts({category}).then(res=>console.log('done fetching: ',typeof res, category));
      });


    }else{

      var index = 0;

      this.getCategories().then(data=>{
        console.log('Home - ids', data.length);


        const fetchPostsIter = (categoryObj)=>{

          return new Promise((resolve)=>{ 
            let categories = categoryObj.id;

            return this.fetchPosts({categories})
            .then(res=>{
              console.log(`Home ${index} done fetching: `,categoryObj.id);
              if(res.data){
                console.log( res.data.length);
              }
              index++;
              
              resolve(res);
            });
        });

          }

        //fetch latests stories if available
        this.fetchPosts().then(res=>{

          let CategoryList = data.slice(0,5);

          this.oneByOne(CategoryList, fetchPostsIter, (res)=>console.log('done'));
  

        });


        
      

      });
      
    
    
    //.then(ids=>{
    //  console.log('Home - ids', ids); 
    //})



    }

  }

  generateHome(){
    const {gState} = this.props;

    //check if current_site exists
    if(gState.current_site){
      const index = gState.current_site;
      const config = gState.sites[index];

      if(config && config.home && config.home.categories && Array.isArray(config.home.categories)){
        const ids = config.home.categories.map(cat=>cat.id);

        this.fetchPostsByCategory(ids);
      }else{
        this.fetchPostsByCategory();
        console.log("Home - no config found")
      }
    }else{
      this.fetchPostsByCategory();
      console.log("Home - no config found")
    }
  }



    }


    const mapStateToProps = state => (
      {
          url: state.globalState.url,
          posts:state.api.posts,
          categories:state.api.categories, 
          gState:state.globalState 
    
    
    });
    


export default (WordpressApi);
//connect(mapStateToProps, {set, getApi, cancelToken})
