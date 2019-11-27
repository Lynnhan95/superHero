import React, {Component} from 'react';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

import Search from './components/Search'


class App extends Component {

  render () {
    return (
      <div className="App">
      <p>Super Hero wanted list</p>
      <Search /> 
      </div>
    );
  }

}

export default App;
