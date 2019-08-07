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
      let {per_page, orderby, order, apiId} = this;
      let {getApi, url} = this.props;
      var  offset = this.props.api && this.props.api[apiId] && this.props.api[apiId].offset ? this.props.api[apiId].offset : 0;
    //console.log('static', this);
      getApi(`${url}/wp-json/wp/v2/posts`,{per_page, orderby, offset, order, _embed:''}, apiId)
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

  const posts = this.props.api && this.props.api[this.apiId];

  if(posts){}else{this.fetchMore()}

}


        render() {

        const {fetchMore} = this;

        const {navigation} = this.props;
        
       

        const args = {fetchMore};

        args.posts = this.props.api[this.apiId] ? this.props.api[this.apiId] : {};

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