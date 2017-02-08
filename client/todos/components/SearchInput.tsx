import * as React from 'react';
import * as classNames from 'classnames';
import ListView from './ListView';
import {Promise} from 'es6-promise';
//import {PROMISE}  from 'core-js';
import data from '../testData'
import { Todo, IState } from '../model';
import { changeText,
         changeDataModel,
         changeLoading
       } from '../actions'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';


interface SearchInputInputProps{
  functionFind:()=>void;

  inputText:string;
  currentItem:number;
  dataModel: any[];
  isLoading:boolean;
  showField:string;

  handleChangeText:(string) => void;
  handleChangeDataModel:(any) => void;
  handleChangeStateLoadging:(any)=>void;
}
interface  SearchInputInputState {
  selectedItem:number;
  showPopup:boolean;
}

class SearchInput extends React.Component<SearchInputInputProps, SearchInputInputState> {
  refs: {
    input:HTMLInputElement;
    listView:ListView;
  };
  constructor(props, context) {
    super(props, context);
    let initState:SearchInputInputState = {
      showPopup:false,
      selectedItem:-1
    }
    this.state = initState;
    console.log(this.props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
  }
  render(){
    return (<div className='searchInput'>
                <input type='text' ref='input' onChange={this.handleChangeText}
                placeholder='Search Twitter users...' value={this.props.inputText}
                onFocus={this.handleFocusIn} onBlur={this.handleBlur} onKeyUp={this.handleKeyUp}/>
                <ListView isVisible={(this.state.showPopup==true && this.props.isLoading==false)}
                data={this.props.dataModel} selectedItem={this.state.selectedItem}
                handleClick={this.handleSelectItem} ref='listView' showField={this.props.showField}/>
                <div className={this.props.isLoading==true?'class_show':'class_hide'}>
                    <div className='bounce1'></div>
                    <div className='bounce2'></div>
                    <div className='bounce3'></div>
                </div>
            </div>
          );
  }
  handleSelectItem(text, item){
    this.props.handleChangeText(text);
    this.updatePopUp(false,item);
  }
  handleKeyUp(e){
    let isShow = true;
    let item = this.state.selectedItem;
    let oldItem = item;
    switch(e.key){
      case 'ArrowDown':
        item = (item+1) >this.props.dataModel.length?this.props.dataModel.length:item+1;
      break;
      case 'ArrowUp':
        item = (item-1) <-1?0:item-1;
        break;
      case 'Enter':
        isShow = false;
        break;
      default:
    }
    if(oldItem!=item){
      let text = (item==-1)?'':this.props.dataModel[item].data;
      this.props.handleChangeText(text);
    }
    this.updatePopUp(isShow,item);
  }
  updatePopUp(isShow, selectItem=-1){
    let newState:SearchInputInputState = {...this.state};
    if(isShow){
      newState.showPopup = true;
      newState.selectedItem = selectItem;
    }else{
      newState.showPopup = false;
    }
    this.setState(newState);
  }
  handleFocusIn(e){
    this.updateFind();
    this.setState({
                    showPopup:true,
                    selectedItem:-1
                  });
  }
  handleBlur(){
    if(this.refs.listView.focusIn!=true){
      this.setState({
                      showPopup:false,
                      selectedItem:-1,
                    });
    } 
  }
  updateFind(text=this.refs.input.value){
    let findText = text.trim();
    this.find(findText);
  }
  handleChangeText(e){
    let text = e.target.value;
    this.props.handleChangeText(text);
    this.updateFind(text);
  }
  find(text){
    let that = this;
    text = text.trim();
    let result = new Promise(function (resolve,reject) {
      that.props.handleChangeStateLoadging(true);
        setTimeout(function () {
          var arrData = data;
          var newData = [];
          for(let i=0;i<arrData.length;i++){
            if(arrData[i].data.search( new RegExp(text, 'i'))!=-1){
              newData.push(arrData[i]);
            }
          }
          resolve(newData);
        }, 100)
      }
    ).then(function(value){
      that.props.handleChangeStateLoadging(false);      
      that.props.handleChangeDataModel(value);
      console.log('find ok');
    },function(value){
      that.props.handleChangeStateLoadging(false);
      console.log('find fail');
    });
    return result;
  }
};
const mapStateToProps = state => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
//bugs on https://github.com/DefinitelyTyped/DefinitelyTyped/issues/6237