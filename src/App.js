import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import {Header} from './labbComponents/header.js';
import {NavBar} from './labbComponents/navBar.js';
import {Main} from './sidor/main.js';
import {Detail} from './sidor/detail.js';
import {Add} from './sidor/add.js';
import {Edit} from './sidor/edit.js';
//
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='container'>
          <div className='row justify-content-center'>
            <Header/>
            <NavBar/>
            <Switch>
              <Route exact path='/' component={Main}/>              />
              <Route path ='/detail/:id' component={Detail}/>
              <Route path ='/add' component={Add}/>
              <Route path ='/edit' component={Edit}/>
            </Switch>
            </div>
          </div>
      </div>
    );
  }
}
export default App;
