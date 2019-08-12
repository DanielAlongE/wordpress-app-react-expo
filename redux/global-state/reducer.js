import {SET_GLOBAL_STATE, CLEAR_GLOBAL_STATE} from './action';

const initialState = {
  url:'https://www.premiumtimesng.com', title:'PremiumTimes',
  //url:'https://www.thecable.ng', title:'TheCable'
  //url: 'https://www.punchng.com'
  apps:[
    {
      url:'https://www.premiumtimesng.com', title:'PremiumTimes', name:'PremiumTimes'
    },
    {
      url:'https://www.thecable.ng', title:'TheCable', name:'TheCable'
    }
  ]
};

const reducer = (state = initialState, action) => {

const {type, obj} = action;

switch (type) {
  case SET_GLOBAL_STATE:

  return {...state, ...obj}

  case CLEAR_GLOBAL_STATE:

    return {}

default:
  return state;
  }
}

export default reducer;