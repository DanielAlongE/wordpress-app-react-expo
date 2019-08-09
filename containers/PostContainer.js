import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import {compose} from 'redux';
import { connect } from 'react-redux';

import {getApi, cancelToken} from '../redux/api/action';


const PostContainer = (Comp, rest={}) => class extends Component {


        componentDidMount() {


        }


        render() {

          const {id, posts} = this.props;

          const allData = posts ? posts.data : [];

          const index = allData.findIndex(post=>post.id === id);
          
          const post = index > -1 ? allData[index] : {};

          console.log('post ', index)

          var args = {id, post};

        return (
            <Comp {...args} />
        )
        }

    }


const mapStateToProps = state => (
  {
      url: state.globalState.url,
      posts:state.api.posts, 


});


export default compose(
    connect(mapStateToProps, {getApi, cancelToken}),
    PostContainer
  );