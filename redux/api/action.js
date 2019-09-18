import axios from 'axios';

export const FETCH_API_REQUEST = 'FETCH_API_REQUEST';
export const FETCH_API_SUCCESS = 'FETCH_API_SUCCESS';
export const FETCH_API_FAILURE = 'FETCH_API_FAILURE';
export const FETCH_API_DELETE = 'FETCH_API_DELETE';
export const FETCH_API_CLEAR = 'FETCH_API_CLEAR';
export const FETCH_API_ADD = 'FETCH_API_ADD';
export const FETCH_API_PREPEND = 'FETCH_API_PREPEND';
export const FETCH_API_EDIT = 'FETCH_API_EDIT';


export const fetchApiEdit = (id,json) => (
  {
  "id":id,
  type: FETCH_API_EDIT,
  payload: json
  });

export const fetchApiAdd = (id,json) => (
  {
  "id":id,
  type: FETCH_API_ADD,
  payload: json
  });

  export const fetchApiPrepend = (id,json) => (
    {
    "id":id,
    type: FETCH_API_PREPEND,
    payload: json
    });
  

export const fetchApiClear = (id) => ({
  "id":id, 
  type: FETCH_API_CLEAR});
  

export const fetchApiRequest = (id) => ({
id,
type: FETCH_API_REQUEST});

export const fetchApiSuccess = (id,json) => (
  {
  "id":id,
  type: FETCH_API_SUCCESS,
  payload: json
  });

export const fetchApiFailure = (id,error) => (
  {
  "id":id, 
  type: FETCH_API_FAILURE,
  payload: error
  });


export const fetchApiDelete = (id,payload) => (
  {
  id, 
  type: FETCH_API_DELETE,
  payload
  });

const argsSerialize = (args)=> {
  var params = "";
  var i = 0;
  
  for(let key in args) {
  
  //add & to the string
  if(i>0){
    params+='&';
  }
  
  //check if key has a value
  if(args[key]===""){
    params+=key;
  }else{
  params+=key+'='+args[key];
  }
  
  i++;
  }

  return params;
  
}

export const clearApi = (id) => dispatch => dispatch(fetchApiClear(id));

export const fetchApi = (url='',args={}, id='one') => {

var params = argsSerialize(args);

//async
  return dispatch => {
    var link = `${url}?${params}`;
    console.log(link);
    
    dispatch(fetchApiRequest(id));

      return fetch(link)
      .then(res => res.json()
//      , error => {
//      console.log('An error occurred.', error)
//      dispatch(fetchApiFailure(id, error.message))
//      }
      ).then(res => {
      //console.log(res);
      dispatch(fetchApiSuccess(id,res));
      return res;
      })
      .catch(error => {
        //console.log(error);
        dispatch(fetchApiFailure(id, error.message));
        return error;
      });
  }
}

export const postApi = (url='', obj={}, id="postApi") => {

  let headers = !!obj.headers ? obj.headers : {};
  let data = !!obj.data ? obj.data : {};

  return dispatch => {
   
    dispatch(fetchApiRequest(id));

      return axios.post(`${URL}${url}`, {...data}, {headers})
      .then(res=>{

        dispatch(fetchApiSuccess(id,res.data));

        return res;
      }).catch(error => {
        dispatch(fetchApiFailure(id, error.message));
        return error;
      });
      
  }
}

export const addApi = (id, json) =>  dispatch => dispatch(fetchApiAdd(id, json));

export const prependApi = (id, json) =>  dispatch => dispatch(fetchApiPrepend(id, json));

export const editApi = (id, json) =>  dispatch => dispatch(fetchApiEdit(id, json));

export const deleteApi = (id, json) => dispatch => dispatch(fetchApiDelete(id, json));


export const getApi = (url='', obj={}, id=null, cancel) => {

  //let headers = !!obj.headers ? obj.headers : {};
  //url = "https://andela.com/wp-json";
  //obj = {};
  // Add User-agent
  const headers = obj.headers || {};
  headers['User-Agent'] = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36`;
  headers['Sec-Fetch-Mode'] = 'cors';

  headers['accept'] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3";
  headers['accept-encoding'] = 'gzip, deflate, br';
  headers['accept-language'] = 'en-US,en;q=0.9';
  headers['cookie'] = "";

  let data = obj.data || obj;

  let params = argsSerialize(data);

  return dispatch => {
  
    id===null || dispatch(fetchApiRequest(id));

    //check for cancelToken
    let args = cancel ? {cancelToken: cancel.token} : {};
    
    //if(obj.headers){}
      args.headers = headers;
    

    //console.log(`${url}?${params}`,args)


      return axios.get(`${url}?${params}`, args)
      .then(res=>{

        id===null || dispatch(fetchApiSuccess(id,res.data));
        return res;
      }).catch(error => {
        id===null || dispatch(fetchApiFailure(id, error.message));
        return error;
      });
      
  }
}

export const cancelToken = () => {
    return dispatch =>{
      //create axios cancelToken
      var  CancelToken = axios.CancelToken;
      var  source = CancelToken.source();
      return source;      
    }
      
}