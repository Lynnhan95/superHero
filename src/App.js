import React, {Component} from 'react';

import 'semantic-ui-css/semantic.min.css';
import Search from './components/Search'
import GenerateList from './components/GenerateList'


class App extends Component {

  render () {
    return (
      <div className="App">
      <p>Super Hero wanted list</p>
      <Search /> 
      <GenerateList />
      </div>
    );
  }

}

export default App;
