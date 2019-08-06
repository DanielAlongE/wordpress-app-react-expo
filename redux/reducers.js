import {combineReducers} from 'redux';

import {reducer as api} from './api';


//imported reducers comes here
var obj = {
    api
}


export default combineReducers(
{ ...obj });