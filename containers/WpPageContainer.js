import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import {compose} from 'redux';
import { connect } from 'react-redux';

import {getApi, cancelToken} from '../redux/api/action';

import { WordPressClass } from '../builder/containers/WordPressPostsContainer';

const WpPageContainer = (Comp, rest={}) => class extends WordPressClass {

  //getPostById

        componentDidMount() {
          const {id} = this.props;
          
          const pageIndex = this.findPageIndex({id});

          console.log({id, pageIndex});

          //page not found in store, will attempt to download it
         if(pageIndex === -1){
            this.fetchPages({id}).then(res=>console.log("done fetching page: ", id));
            console.log('fetching pages id:', id)
          }

         // console.log("getSinglePost", )

        }


        render() {

          const {id} = this.props;
          

          const data = this.getSinglePage({id});

          //!!data.content

          const page = data ? this.preparePost(data) : {};

          var args = {id, page};

        return (
            <Comp {...args} />
        )
        }

    }


  const mapStateToProps = state => {

    const appIndex =  state.globalState.currentApp || 0;
      
        return ({
            url: state.globalState.url,
            pages:state.api[`pages-${appIndex}`],
  //          categories:state.api[`categories-${appIndex}`], 
  //          gState:state.globalState, 
            appIndex
    
      });
    };


//

export default compose(
    connect(mapStateToProps, {getApi, cancelToken}),
    WpPageContainer
  );