import React, {Component} from 'react';

import 'semantic-ui-css/semantic.min.css';
import './index.css'
import Search from './components/Search'
import GenerateList from './components/GenerateList'
import Radiar from './components/Radiar'
import { Grid } from 'semantic-ui-react'

class App extends Component {

  render () {

    return (

      <div className="App">
        <div className="header">
          <h1>Super-Hero-Bowl!</h1>
        </div>
        <Grid divided='vertically' >
        <Grid.Row columns={2} >
        <Grid.Column divided='horizontal'>
          <Search /> 
          <GenerateList />
          </Grid.Column> 
        <Grid.Column>
          <Radiar />
        </Grid.Column>
        </Grid.Row>
        </Grid>
      </div>
    );
  }

}

export default App;
