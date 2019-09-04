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
      url:'https://www.thecable.ng', title:'TheCable', name:'TheCable',
      menus:{
        main_menu:[
          {name:"Home", type:'page', id:1, title:'This is the home page', icon:'home'},
          {name:'About Us', type:'wp_page', id:2},
          {name:'Exchange', type:'wp_page', title:'Ex', id:113154}
        ],
        sub_menu:[],
        custom_menu:[]
      }
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