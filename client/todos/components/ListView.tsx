import * as React from 'react';
import * as classNames from 'classnames';

interface ViewItemInputProps {
  isSelected?:boolean;
  isHover?:boolean;
  showField?:string;
  index?:string;
  data?:string[];
}
interface ViewItemInputState {
}

class ViewItem extends React.Component<ViewItemInputProps, ViewItemInputState> {
  constructor(props, context) {
    super(props, context);
  }
  render(){
    var showField = (this.props.showField==undefined || this.props.showField.length==0)?'data':this.props.showField;
    var className = 'itemView' + (this.props.isSelected==true?' selected':' ')
                               + (this.props.isHover==true?' hover':' ');
    let idAttr = {idType:this.props.index};

    return (<div className={className} {...idAttr} id ={this.props.index}>
              <span id ={this.props.index}>{this.props.data[showField]}</span>
            </div>);
  }
};

interface ListViewInputProps {
  handleClick:(string,number) => void;
  data?:string[];
  style?:any;
  selectedItem:number;
  showField:string;
  isVisible:boolean;
}
interface ListViewInputState {
  hoverItem:number;
}
class ListView extends React.Component<ListViewInputProps, ListViewInputState> {
  public focusIn:boolean;
  constructor(props, context) {
    super(props, context);
    this.focusIn=false;
    let initState:ListViewInputState = {
      hoverItem:-1
    };
    this.state = initState;
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  render(){
    var isEmpty = (this.props.data==undefined||
                   this.props.data.length==undefined||
                   this.props.data.length==0);
    if(isEmpty)
      return (<div className='listView empty'/>);
    var items = this.props.data.map(function(item,index){
        return <ViewItem key={index} index={index} data={item} 
        isSelected={this.props.selectedItem==index?true:false}
        isHover={this.state.hoverItem==index?true:false}
        showField={this.props.showField} />;
    }.bind(this));
    return (<div className={'listView '+(this.props.isVisible==true?'class_show':'class_hide')}
      style={this.props.style} ref='listView'
      onClick={this.handleClick} onMouseOut={this.handleMouseOut} 
      onMouseMove={this.handleMouseMove}>
              {items}
            </div>);
  }
  handleClick(e){
    var id = e.target.attributes['id'];
    if(id!=undefined)
    {
      this.setState({hoverItem:-1});
      this.props.handleClick(e.target.textContent,id);
    }
  }
  handleMouseMove(e){
    this.focusIn = true;
    var id = e.target.attributes['id'];
    if(id!=undefined)
    {
      this.state.hoverItem!=id.value?this.setState({hoverItem:id.value}):'';
    }
  }
  handleMouseOut(){
    this.focusIn = false;
    this.setState({hoverItem:-1});
  }
}

export default ListView;
