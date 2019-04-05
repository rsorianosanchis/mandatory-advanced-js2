import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
//import 'bulma/css/bulma.css';
import axios from 'axios';
//
import {Header} from './labbComponents/header.js';
import {NavBar} from './labbComponents/navBar.js';
import {Main} from './sidor/main.js';
import {Detail} from './sidor/detail.js';
//


class App extends Component {
  //
  state = {
    movies: []
  }
  //
  componentDidMount() {
    this._getMovies();
  }
  //
  _getMovies (){
    axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies`)
    .then(response =>{
      console.log(response);
      console.log(response.data);
      this.setState({movies: response.data})
    })
  }
  //
  render() {
    return (
      <div className="App">
        <div className='container'>
          <div className='row justify-content-center'>
            <Header/>
            <NavBar/>
            <Switch>
              <Route exact path='/' render={()=>{return<Main movies={this.state.movies}/>}}/>
              <Route path ='/detail/:id' component={Detail}/>

            </Switch>
            </div>
          </div>
      </div>
    );
  }
}
export default App;
