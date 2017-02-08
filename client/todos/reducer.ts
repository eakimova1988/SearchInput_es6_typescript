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

export default handleActions<IState, Todo>({
  [CHANGE_INPUT_TEXT]: (state: IState, action: Action<Todo>): IState => {
    return assign({},state,{
      inputText: action.payload,
      currentItem:-1
    });
  },

  [CHANGE_DATA_MODEL]:(state: IState, action: Action<Todo>): IState => {
    return assign({},state,{
      dataModel: action.payload
    });
  },

  [CHANGE_FLAG_LOADING]:(state: IState, action: Action<Todo>): IState => {
    return assign({},state,{
      isLoading: action.payload
    });
  }

  // [ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
  //   return {[{
  //     id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
  //     completed: action.payload.completed,
  //     text: action.payload.text
  //   }], ...state};
  // },

  // [DELETE_TODO]: (state: IState, action: Action<Todo>): IState => {
  //   return state.filter(todo =>
  //     todo.id !== action.payload.id
  //   );
  // },

  // [EDIT_TODO]: (state: IState, action: Action<Todo>): IState => {
  //   return <IState>state.map(todo =>
  //     todo.id === action.payload.id
  //       ? assign(<Todo>{}, todo, { text: action.payload.text })
  //       : todo
  //   );
  // },

  // [COMPLETE_TODO]: (state: IState, action: Action<Todo>): IState => {
  //   return <IState>state.map(todo =>
  //     todo.id === action.payload.id ?
  //       assign({}, todo, { completed: !todo.completed }) :
  //       todo
  //   );
  // },

  // [COMPLETE_ALL]: (state: IState, action: Action<Todo>): IState => {
  //   const areAllMarked = state.every(todo => todo.completed);
  //   return <IState>state.map(todo => assign({}, todo, {
  //     completed: !areAllMarked
  //   }));
  // },

  // [CLEAR_COMPLETED]: (state: IState, action: Action<Todo>): IState => {
  //   return state.filter(todo => todo.completed === false);
  // }
}, initialState);
