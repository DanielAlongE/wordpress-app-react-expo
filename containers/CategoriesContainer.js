import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import {compose} from 'redux';
import { connect } from 'react-redux';

import {getApi, cancelToken} from '../redux/api/action';


const CategoriesContainer = (Comp, rest={}) => class extends Component {


  offset=0;
  per_page=50;
  categories=0;
  //author=0;
  search='';
  orderby='count';
  order='desc';
  status='publish';
  hide_empty=true


  constructor(props){

    super(props);

    this.state = {
        
    }
   
    //desc, asc |author, date, id, include, modified, parent, relevance, slug, title
   //this.fetchMore = this.fetchMore.bind(this);


  }


  fetchMore(){
      let {per_page, orderby, order, hide_empty} = this;
      let {getApi, url} = this.props;
    
      getApi(`${url}/wp-json/wp/v2/categories`,{per_page, orderby, order, hide_empty},'categories')
        .then(res=>console.log('done fetching'));
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

  this.fetchMore();



}


        render() {

        //console.log(this.props.url);

        const {navigation} = this.props;
        
        var categories = this.props.categories ? this.props.categories.data : [];

        

        const args = {categories};

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
      categories:state.api.categories, 
      api: state.api

});


export default compose(
    connect(mapStateToProps, {getApi, cancelToken}),
    CategoriesContainer
  );