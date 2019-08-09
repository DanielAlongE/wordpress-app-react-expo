import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import {compose} from 'redux';
import { connect } from 'react-redux';

import {getApi, cancelToken} from '../redux/api/action';


const PostsContainer = (Comp, rest={}) => class extends Component {

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
      const {categories} = this.props;
      let {per_page, orderby, order, apiId} = this;
      let {getApi, url} = this.props;
      var  offset = this.props.api && this.props.api[apiId] && this.props.api[apiId].offset ? this.props.api[apiId].offset : 0;

      var args = {per_page, orderby, offset, order, _embed:''};

      if(categories){
        args.categories = categories;
      }

      getApi(`${url}/wp-json/wp/v2/posts`,{...args}, apiId)
        .then(res=>console.log(apiId, 'done fetching >', offset));
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

  const {categories} = this.props;
  const posts = this.props.api && this.props.api[this.apiId] ;



  if(categories){
      if(posts){
        var check = posts.data.filter(post=>{ return post.categories.indexOf(categories) > -1;  });

        if(check.length>0){
          console.log('post cat has content', categories);
        }else{
          this.fetchMore();
        }

      }else{
        this.fetchMore();
      }
  }
  else if(posts){}else{this.fetchMore()}

}


        render() {

        const {fetchMore, apiId} = this;

        const {navigation, categories} = this.props;

        const posts = this.props.api && this.props.api[apiId];

        const args = {fetchMore};

        if(posts){
          args.posts = posts;
        }

        if(categories){
          args.categories = categories;
        }

         if(navigation){
          args.navigation = navigation;
        }

        return (
            <Comp {...args} />
        )
        }

    }


const mapStateToProps = state => (
  {
      url: state.globalState.url,
      api:state.api, 


});


export default compose(
    connect(mapStateToProps, {getApi, cancelToken}),
    PostsContainer
  );