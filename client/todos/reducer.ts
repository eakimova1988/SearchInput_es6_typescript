import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { Todo, IState } from './model';

import {
  CHANGE_INPUT_TEXT,
  CHANGE_DATA_MODEL,
  CHANGE_FLAG_LOADING,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED
} from './actions';

const initialState: IState = {
  inputText:'',
  currentItem:-1,
  showField:'data', 
  dataModel: [],
  isLoading:false,
  list:[<Todo>{
    text: 'Use Redux with TypeScript',
    completed: false,
    id: 0
  }
 ]};

 export default function applicationRedusers(state = initialState,action) {
  switch(action.type){
    case CHANGE_INPUT_TEXT:
      return {...state,
          inputText:action.payload,
          currentIndex:-1
        };
    case CHANGE_DATA_MODEL:
      return {...state,
          dataModel:action.payload
        };
    case CHANGE_FLAG_LOADING:
      return  {...state,
          isLoading:action.payload
        };
    default:
      return state;
  }
}