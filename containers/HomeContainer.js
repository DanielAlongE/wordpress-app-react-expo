import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import {compose} from 'redux';
import { connect } from 'react-redux';

import {getApi, cancelToken} from '../redux/api/action';
import set from '../redux/global-state';

import { WordPressClass } from '../builder/containers/WordPressPostsContainer';

const HomeContainer = (Comp, rest={}) => class extends WordPressClass {
  apiId = 'posts';
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

    super(props, {per_page:1, strange:'I am strange'});

    //this.comp = comp;

    this.state = {
        
    }
   
    //desc, asc |author, date, id, include, modified, parent, relevance, slug, title
   //this.fetchMore = this.fetchMore.bind(this);


  }

  //getAvailablePostsId()

  //fetchCategories(obj={})

  //fetchMore()

  //fetchPosts(obj={})

  //getCategories()


  //oneByOne(objects_array, iterator, callback)

  //fetchPostsByCategory(ids=[])

  //preparePost(post)

  //preparePosts(posts)

  //generateHome()


  componentWillMount(){
    this._isMounted = false;

  }

  init(){
      const {appIndex, url, posts} = this.props;

      //let collect = purgeHtml("<h1>This is Html &#36;2000 and &#37;50</h1>");
      //console.log(`"${collect}"`);
      
      console.log('home', {appIndex, url});

  //get app config
    //this.props.navigation.setParams({ title: gState.title || 'Kilode?' });
    if(posts && posts.data){}else{
        super.generateHome();        
    }    
  }

  componentDidMount() {
    this._isMounted = true;

    console.log('Home, componentDidMount')
    this.init();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.appIndex !== this.props.appIndex){
      this.init();
      console.log('Home, componentWillReceiveProps', nextProps.appIndex, this.props.appIndex)
    }
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.init();
    }

    
  }

  componentWillUnmount() {
    this._isMounted = false;

    //if(this.cancelToken){ this.cancelToken.cancel('ComponenetWillUnmount');}
  }
        
  render() {

        const {fetchMore} = this;

        const {navigation, appIndex, posts} = this.props;
        
        //console.log('Home-config',gState);

        var args = {fetchMore};

        args.posts = posts && Array.isArray(posts.data) ? this.preparePosts(posts.data,appIndex) : [];

         if(navigation){
          args.navigation = navigation;
        }
        

        return (
            <Comp {...args} />
        )
        }
    }


  const mapStateToProps = state => {
    
    const appIndex = state.globalState.currentApp || 0;
    
      return ({
          url: state.globalState.url,
          posts:state.api[`posts-${appIndex}`],
          categories:state.api[`categories-${appIndex}`], 
          gState:state.globalState, 
          appIndex

    });
  };

//
  export default compose(
      connect(mapStateToProps, {set, getApi, cancelToken}),
      HomeContainer
    );