//import React from 'react';
import { StyleSheet } from 'react-native';
import {width, height} from './dimensions';

const styles = StyleSheet.create({
frameBox:{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'},
linearBox:{width},
borderLine:{backgroundColor:'#ccc',margin:1},
row:{flexDirection:'row'},
col:{flexDirection:'column'},
box:{}
});

export {width, height};
export default styles;