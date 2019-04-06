import React,{Component} from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import {MoviesList} from '../labbComponents/moviesList.js';

export class Main extends Component {
  //
  state = {
    movies: []
  }
  //
  //bara rendera requesten om det finns
  // ny elementer eller mindre i array
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
        //***Här vi updatera movies array utom den deleted item enligt id.
        this.setState({movies: this.state.movies.filter(item => (item.id !== id))})
      }
    })
  }
  //
  render(){
    console.log('render sidan Main');
    return(
      <React.Fragment>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className='col-12 col-md-8' >
          <h4 className='text-center display-5'>Movies List</h4>
          <MoviesList
            movies={this.state.movies}
            clsMovieFnc={this._deleteMovie}
          />
        </div>
      </React.Fragment>
    )
  }
}
