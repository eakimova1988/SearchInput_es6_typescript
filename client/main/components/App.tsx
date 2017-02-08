import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import {
  model} from '../../todos';

import {SearchInput} from '../../todos';

interface AppProps {
  todos: model.Todo[];
  dispatch: Dispatch<{}>;
}
function functionFind(){

}

class App extends React.Component<AppProps, void> {
  render() {
    const { todos, dispatch } = this.props;
    const showField:string = 'data';//showField={showField}

    return (
      <div className="todoapp">
      <SearchInput/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(mapStateToProps)(App);
