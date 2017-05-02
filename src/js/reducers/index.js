import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


function example(state = "default", action){
  switch(action.type){
    case 'A_CASE':
      break;
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  routing: routerReducer,
  example
});

export default rootReducer;
