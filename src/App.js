import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
//import 'bulma/css/bulma.css';
//
import {Header} from './labbComponents/header.js';
import {NavBar} from './labbComponents/navBar.js';
import {Main} from './sidor/main.js';
import {Detail} from './sidor/detail.js';
import {Add} from './sidor/add.js';
//


class App extends Component {
  //
  // state = {
  //   nymovies:[]
  // }
  //
  // //
  // _updateList=(nyObj)=>{
  //   this.setState({nymovies: [...this.state.nymovies, nyObj]})
  // }
  //
  render() {
    return (
      <div className="App">
        <div className='container'>
          <div className='row justify-content-center'>
            <Header/>
            <NavBar/>
            <Switch>
              <Route exact path='/' render={()=>{
                  return<Main

                    />}}
              />
              <Route path ='/detail/:id' component={Detail}/>
              <Route path ='/add' render={()=>{return<Add />}}/>
            </Switch>
            </div>
          </div>
      </div>
    );
  }
}
export default App;
