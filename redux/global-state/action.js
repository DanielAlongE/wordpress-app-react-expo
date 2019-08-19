export const SET_GLOBAL_STATE = 'SET_GLOBAL_STATE';
export const CLEAR_GLOBAL_STATE = 'CLEAR_GLOBAL_STATE';

export const setState = (obj) => (
  {
  type: SET_GLOBAL_STATE,
   obj
  });

export const clearState = () => (
{
type: CLEAR_GLOBAL_STATE
});

export const clear = () => dispatch => dispatch(clearState());

const set = (obj) => dispatch => {
  dispatch(setState(obj));
  
  return Promise.resolve()


}

export default set;

