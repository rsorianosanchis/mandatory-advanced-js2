import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
//import 'bulma/css/bulma.css';
import axios from 'axios';
//
import {Header} from './labbComponents/header.js';
import {NavBar} from './labbComponents/navBar.js';
import {Main} from './sidor/main.js';
import {Detail} from './sidor/detail.js';
import {Add} from './sidor/add.js';
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
  _deleteMovie = (id) =>{
    console.log(id);
    axios.delete(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${id}`)
    .then(response=>{
      console.log(response);
      if(response.status === 204){
        //***Här vi updatera movies array utan dleted item enligt id.
        this.setState({movies: this.state.movies.filter(item => (item.id !== id))})
      }
    })
  }
  //
  _updateList=(nyObj)=>{
    this.setState({movies: [...this.state.movies, nyObj]})
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
              <Route exact path='/' render={()=>{
                  return<Main
                    movies={this.state.movies}
                    clsMovieFnc={this._deleteMovie}
                    />}}
              />
              <Route path ='/detail/:id' component={Detail}/>
              <Route path ='/add' render={()=>{return<Add updateList={this._updateList}/>}}/>
            </Switch>
            </div>
          </div>
      </div>
    );
  }
}
export default App;
