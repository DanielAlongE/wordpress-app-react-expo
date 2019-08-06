import {combineReducers} from 'redux';

import {reducer as api} from './api';
import {reducer as globalState} from './global-state';

//imported reducers comes here
var obj = {
    api,
    globalState
}


export default combineReducers(
{ ...obj });