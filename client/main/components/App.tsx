import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import {model} from '../../todos';
import {SearchInput} from '../../todos';
import {SearchInputInputProps} from '../../todos/components/SearchInput';
import { changeText,
         changeDataModel,
         changeLoading
       } from '../../todos/actions'
import {Promise} from 'es6-promise';
import data from '../../todos/testData'
import {store} from '../../main'

//call with bind(this)
function functionFind(text:string){
  text = text.trim().replace(/\\/g, "\\\\");
  let result = new Promise(function (resolve,reject) {
    store.dispatch(changeLoading(true));
      setTimeout(function () {
        let arrData = data;
        let newData = [];
        for(let i=0;i<arrData.length;i++){
          if(arrData[i].data.search( new RegExp(text, 'i'))!=-1){
            newData.push(arrData[i]);
          }
        }
        resolve(newData);
      }, 100)
    }
  ).then(function(value){
    store.dispatch(changeLoading(false));
    store.dispatch(changeDataModel(value));
  },function(value){
    store.dispatch(changeLoading(false));
  });
  return result;
}

interface AppProps extends SearchInputInputProps{
  todos: model.Todo[];
  dispatch: Dispatch<{}>;
}

class App extends React.Component<AppProps, void> {
  render() {
    const { todos, dispatch } = this.props;
    const showField:string = 'data';
    return (
      <div className="todoapp">
      <SearchInput {...this.props} showField={showField} functionFind={functionFind}/>
      </div>
    );
  }
}

const mapStateToPropsApp = state => ({
  todos: state.todos,
  inputText:state.todos.inputText,
  currentItem:state.todos.currentItem,
  dataModel: state.todos.dataModel,
  isLoading:state.todos.isLoading,
  showField:state.todos.showField 
});

const mapDispatchToProps = function (dispatch) {
  return {
    handleChangeText: (text:string) => {
      dispatch(changeText(text))
    },
    handleChangeDataModel: (newModel:any) => {
      dispatch(changeDataModel(newModel))
    },
    handleChangeStateLoadging: (flag:boolean) => {
      dispatch(changeLoading(flag))
    }
  }
};

connect(mapStateToPropsApp, mapDispatchToProps)(SearchInput as any);
//https://github.com/DefinitelyTyped/DefinitelyTyped/issues/6237
export default connect(mapStateToPropsApp,mapDispatchToProps)(App);
