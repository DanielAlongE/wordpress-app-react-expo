import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import {compose} from 'redux';
import { connect } from 'react-redux';
import purgeHtml from './_purgeHtml';
import {getApi, cancelToken} from '../../redux/api/action';
import set from '../../redux/global-state';
import * as dotProp from './_dotProp';

const moment = require('moment');

class WordPressClass extends React.PureComponent {

    apiId = 'posts';
    offset=0;
    per_page=10;
    search='';
    orderby='date';
    order='desc';
    status='publish';
    
    constructor(props){

    super(props);


    //console.log('WordPress', this)

    this.state = {
        
    }
   
    //desc, asc |author, date, id, include, modified, parent, relevance, slug, title
   this.fetchMorePosts = this.fetchMorePosts.bind(this);


  }

  isEmptyObj(obj){
    if(Object.keys(obj).length===0){
      return true;
    }else{
      return false;
    }
  }

  findPageIndex(obj={}){
    const {pages={}} = this.props;
    const {data=[]} = pages;

    let index = data.findIndex(page=>{

      //if obj isEmpty
      if(this.isEmptyObj(obj)){return false;}

      for(key in obj){
        
        if(page[key] !== obj[key]){
          return false;
        }

      }

      return true;
    });    

    return index;
  }

  getSinglePage(obj={}){
    const {pages={}} = this.props;
    const {data=[]} = pages;

    let index = this.findPageIndex(obj);

    return index > -1 && data[index] ? data[index] : {};
  }

  findPostIndex(obj={}){
    const {posts={}} = this.props;
    const {data=[]} = posts;

    let index = data.findIndex(post=>{

      //if obj isEmpty
      if(this.isEmptyObj(obj)){return false;}

      for(key in obj){
        
        if(post[key] !== obj[key]){
          return false;
        }

      }

      return true;
    });    

    return index;
  }

  getSinglePost(obj={}){
    const {posts={}} = this.props;
    const {data=[]} = posts;
    const index = this.findPostIndex(obj);

    return index > -1 && data[index] ? data[index] : {};
  }


  getPostsById(ids){

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

  getAvailablePagesId(){
    const {pages} = this.props;

    return new Promise((resolve)=>{ 
      if(pages && pages.data && Array.isArray(pages.data)){
        var ids = pages.data.map(pages=>pages.id);
        resolve(ids)
      }else{
        resolve([])
      }   
  });


  }

  fetchCategories(obj={}){
    var {per_page=50, orderby='count',  order='desc',  hide_empty=true} = obj;
    let {getApi, url, appIndex} = this.props;
    let apiId = `categories-${appIndex}`;
    //console.log('static', this);
    return getApi(`${url}/wp-json/wp/v2/categories`,{per_page, orderby, order, hide_empty}, apiId).then(res=>res.data);
  }

  fetchMorePosts(obj={}){
    const offset = this.props.posts && this.props.posts.offset ? this.props.posts.offset : 0;
  //console.log('static', this);
    return this.fetchPosts({offset, ...obj});
}


fetchPosts(obj={}){
    let {per_page, orderby, order} = this;
    let {getApi, url, appIndex} = this.props;
    let apiId = `posts-${appIndex}`;

    //get already fetch posts
    return this.getAvailablePostsId().then(ids=>{
      //console.log(`getAvailablePostsId (${id.length})`, id.join())
      if(ids.length>0){
        obj.exclude = ids.join();
      }
      console.log({per_page, orderby, order, ...obj, _embed:''});
      return getApi(`${url}/wp-json/wp/v2/posts`,{per_page, orderby, order, ...obj, _embed:''}, apiId);  
    });
  }


  fetchPages(obj={}){
    let {per_page, orderby, order} = this;
    let {getApi, url, appIndex} = this.props;
    let apiId = `pages-${appIndex}`;

    //get already fetch pages
    return this.getAvailablePagesId().then(ids=>{
      //console.log(`getAvailablePagesId (${id.length})`, id.join())
      if(ids.length>0){
        obj.exclude = ids.join();
      }
      console.log({per_page, orderby, order, ...obj, _embed:''});
      return getApi(`${url}/wp-json/wp/v2/pages`,{per_page, orderby, order, ...obj, _embed:''}, apiId);  
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

    }

  }

  prepareCategories(data){
    if(!Array.isArray(data)){
      return [];
    }

    return data.map(category=>{
      var {name, ...rest} = category;
      name = purgeHtml(name);
      return {name, ...rest};
    });
  }

  preparePost(post={},key=0){
    //let  {id=0, title:{rendered:t=""}, content:{rendered:c=""}, excerpt:{rendered:e=""}, date=new Date(), _embedded={}} = post;

    const id = dotProp.get(post, "id", 0);
    const title = dotProp.get(post, "title.rendered", "");
    const content = dotProp.get(post, "content.rendered", "");
    const excerpt = dotProp.get(post, "excerpt.rendered", "");
    const date = dotProp.get(post, "date", new Date());
    const media = dotProp.get(post, "_embedded.wp:featuredmedia.0.media_details.sizes", {});

    const dateFromNow = moment(date, "YYYY-MM-DD HH:mm:ss").fromNow();

    //const media = _embedded && _embedded['wp:featuredmedia'] && _embedded['wp:featuredmedia'][0] && _embedded['wp:featuredmedia'][0]['media_details'] && _embedded['wp:featuredmedia'][0]['media_details']['sizes'] ?  _embedded['wp:featuredmedia'][0]['media_details']['sizes'] : {};
    const {thumbnail={source_url:'https://picsum.photos/200'}, medium={source_url:'https://picsum.photos/500'}, full={source_url:'https://picsum.photos/700'}} = media;

    return {key:`post-${key}-${id}`, id, title:purgeHtml(title), content, excerpt:purgeHtml(excerpt), date:dateFromNow, media:{thumbnail, medium, full}};
  }


  preparePostOld(post,key=0){
    const {id=0, title:{rendered:t=""}, content:{rendered:c=""}, excerpt:{rendered:e=""}, date=new Date(), _embedded={}} = post;

    const dateFromNow = moment(date, "YYYY-MM-DD HH:mm:ss").fromNow();
    const media = _embedded && _embedded['wp:featuredmedia'] && _embedded['wp:featuredmedia'][0] && _embedded['wp:featuredmedia'][0]['media_details'] && _embedded['wp:featuredmedia'][0]['media_details']['sizes'] ?  _embedded['wp:featuredmedia'][0]['media_details']['sizes'] : {};
    const {thumbnail={source_url:'https://picsum.photos/200'}, medium={source_url:'https://picsum.photos/500'}, full={source_url:'https://picsum.photos/700'}} = media;

    
    if(this.isEmptyObj(post)){
      console.log({key:`post-${key}-${id}`, id, title:purgeHtml(t), content:c, excerpt:purgeHtml(e), date:dateFromNow, media:{thumbnail, medium, full}});
    }
    return {key:`post-${key}-${id}`, id, title:purgeHtml(t), content:c, excerpt:purgeHtml(e), date:dateFromNow, media:{thumbnail, medium, full}};
  }

  preparePosts(posts,key=0){
    return posts.map(post=>this.preparePost(post,key));
  }

  prepareMenu(data){

    //const {navigate} = NavigationService;
    const {navigation} = this.props;
    const { navigate } = navigation;

    return data.map((menu, index)=>{

        var {title="", icon, name, id=0, ...rest} = menu;
        var onPress;

        if(!!menu.type){
            if(menu.type==="wp_posts"){
                onPress = ()=>{navigate('Posts', {title:(title||name), categories:id});}
            }
            else if(menu.type==="wp_post"){
                onPress = ()=>{navigate('Post', {title:(title||name), id});}
            }
            else if(menu.type==="wp_page"){
                onPress = ()=>{navigate('WpPage', {title:(title||name), id});}
            }            
            else if(menu.type==="page"){
                onPress = ()=>{navigate('Page', {title:(title||name), id});}
            }
        }else{
            onPress = ()=>{navigate('Posts', {title:(title||name), categories:id});
          
          }
        }

        return {key:`menu-${index}`, icon, name, onPress, id}
    });
  }  

  generateHome(){
    const {gState} = this.props;

    //check if current_site exists
    /*
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
    */
    this.getCategories();
    this.fetchPosts();

  }


componentWillMount(){
  this._isMounted = false;

}



componentDidMount() {
  this._isMounted = true;

      const {gState, posts} = this.props;

      
  //get app config
    //this.props.navigation.setParams({ title: gState.title || 'Kilode?' });
    if(posts){}else{
        this.generateHome();        
    }



}

componentWillUnmount() {
  this._isMounted = false;

  //if(this.cancelToken){ this.cancelToken.cancel('ComponenetWillUnmount');}
}
        render() {

        const {fetchMorePosts} = this;

        const {navigation, posts} = this.props;
        
        //console.log('Home-config',gState);

        var args = {fetchMorePosts};

        args.posts = posts && Array.isArray(posts.data) ? this.preparePosts(posts.data) : [];

         if(navigation){
          args.navigation = navigation;
        }

        //const {comp:Comp} = this;
        //if(this.props.children){}
          const Comp = this.props.children.type;
        

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
              pages:state.api[`pages-${appIndex}`],
              categories:state.api[`categories-${appIndex}`], 
              gState:state.globalState, 
              appIndex
      
        });
      };



    const WordPressPosts = connect(mapStateToProps, {set, getApi, cancelToken})(WordPressClass);
      

    //const WordPressPostsContainer = (Comp, rest={}) => new WordPressPosts;
      export {WordPressClass};

    export default WordPressPosts;//WordPressPostsContainer;

//export {WordPressPostsContainer};


//export default compose(
//    connect(mapStateToProps, {set, getApi, cancelToken}),
//    WordPressPostsContainer
//  );