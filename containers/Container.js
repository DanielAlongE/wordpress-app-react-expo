import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import {compose} from 'redux';
import { connect } from 'react-redux';

//import {URL, clearApi, getApi, addApi, editApi, deleteApi, cancelToken} from '../redux/actions';
//import {history} from '../redux/Store';


const CategoriesContainer = (Comp, rest={}) => class extends Component {


  offset=0;
  per_page=100;
  categories=0;
  //author=0;
  search='';
  orderby='date';
  order='desc';
  status='publish';


  constructor(props){

    super(props);

    this.state = {
        
    }
   
    //desc, asc |author, date, id, include, modified, parent, relevance, slug, title
   //this.fetchMore = this.fetchMore.bind(this);


  }


  fetchMore(){
    
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

}


        render() {


          return (
            <Comp  />
          )
        }

    }


const mapStateToProps = state => (
  {
//  addressBook:state.api.addressBook, 

});


export default compose(
    connect(mapStateToProps, {cancelToken}),
    CategoriesContainer
  );