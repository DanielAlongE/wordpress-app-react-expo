import {FETCH_API_REQUEST, FETCH_API_SUCCESS, FETCH_API_FAILURE, 
    FETCH_API_CLEAR, FETCH_API_DELETE, FETCH_API_ADD, 
    FETCH_API_PREPEND, FETCH_API_EDIT} from './action';

const initialState = {};

const reducer = (state = initialState, action) => {

const {id, type, payload} = action;

var oldData = state && state[id] && state[id].data ? state[id].data : [];
var oldOffset = state && state[id] && state[id].offset ? state[id].offset : 0;


if(typeof id === 'undefined'){
//    console.log('id is undefined!');
}else{
    //console.log('id is '+id);

    if(state[id] && state[id].data){
        //console.log(state[id], state[id].data);
        //console.log('state[id] available');
    }else{
    state = {...state, [id] : {
            isFetching:true,
            data: [...oldData],
            offset:oldOffset
          } 
        }

        //console.log('state[id] unavailable');
    }
}

switch (type) {
  case FETCH_API_REQUEST:

  return {...state, [id] : {
    isFetching:true,
    data: [...oldData],
    offset:oldOffset
  } 
}

  case FETCH_API_SUCCESS:

  let count, newData;

  if(Array.isArray(payload)){
    count = payload.length;
    newData = payload;
  }else{
    count = 1;
    newData = [payload];
  }


    return {...state, [id] : {
        isFetching:false,
        data:[...oldData, ...newData],
        offset: (oldOffset+count)
      }
}

case FETCH_API_ADD:

if(Array.isArray(payload)){
  count = payload.length;
  newData = payload;
}else{
  count = 1;
  newData = [payload];
}


  return {...state, [id] : {
      isFetching:false,
      data:[...oldData, ...newData],
      offset: (oldOffset+count)
    }
}

case FETCH_API_PREPEND:

if(Array.isArray(payload)){
  count = payload.length;
  newData = payload;
}else{
  count = 1;
  newData = [payload];
}


  return {...state, [id] : {
      isFetching:false,
      data:[...newData, ...oldData],
      offset: (oldOffset+count)
    }
}

case FETCH_API_EDIT:


let objIndex = oldData.findIndex((data => data.id === payload.id));

if(objIndex>-1){
  oldData[objIndex] = payload;
}

console.log(objIndex, payload);

return {...state, [id] : {
  data:[...oldData]
  }
}


  case FETCH_API_FAILURE:

    return {...state, [id] : {
        isFetching:false,
        error:payload,
        data:[...oldData],
        offset:oldOffset
      }
}


case FETCH_API_CLEAR:

return {...state, [id] : {
    isFetching:false,
    data:[],
    offset:0
  }
}

case FETCH_API_DELETE:

if(payload){
  //count = payload.length;
  

  let value = payload.value ? payload.value : payload;
  let id = payload.id ? payload.id : 'id';

  //let dataIndex = oldData.findIndex((item => item[id] === value));
  newData = oldData.filter(item => (item[id] !== value));
  //newData = payload;
}


  return {...state, [id] : {
      isFetching:false,
      data:[...newData],
      offset: (oldOffset-1)
    }
}

default:
  return state;
  }
}

export default reducer;