import { createAction, Action } from 'redux-actions';
import { assign } from 'lodash';

import { Todo } from './model';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const COMPLETE_ALL = 'COMPLETE_ALL';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

//my
export const CHANGE_INPUT_TEXT = 'change_input_text';
export const CHANGE_DATA_MODEL = 'change_data_model';
export const CHANGE_FLAG_LOADING = 'change_flag_loading';

const changeText = function(text){
  return{
    type:'change_input_text',
    payload:text
  }
}
const changeDataModel = function(newModel){
  return{
    type:'change_data_model',
    payload:newModel
  }
}
const changeLoading = function(isLoading){
  return{
    type:'change_flag_loading',
    payload:isLoading
  }
}

const addTodo = createAction<Todo, string>(
  ADD_TODO,
  (text: string) => ({ text, completed: false })
);

const deleteTodo = createAction<Todo, Todo>(
  DELETE_TODO,
  (todo: Todo) => todo
);

const editTodo = createAction<Todo, Todo, string>(
  EDIT_TODO,
  (todo: Todo, newText: string) => <Todo>assign(todo, { text: newText })
);

const completeTodo = createAction<Todo, Todo>(
  COMPLETE_TODO,
  (todo: Todo) => todo
)

const completeAll = createAction<void>(
  COMPLETE_ALL,
  () => { }
)

const clearCompleted = createAction<void>(
  CLEAR_COMPLETED,
  () => { }
);

export {
  changeText,
  changeDataModel,
  changeLoading,
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAll,
  clearCompleted
}
