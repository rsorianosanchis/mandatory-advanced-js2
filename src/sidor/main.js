import React,{Component} from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Swal from 'sweetalert2';
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
      if(response.status === 200){
        this.setState({movies: response.data})
        // Swal.fire({
        //   position: 'top-end',
        //   type: 'success',
        //   title: 'Movies list imported',
        //   showConfirmButton: false,
        //   timer: 1500
        // })
      }else{
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    })
  }
  //
  _deleteMovie = (id) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        console.log(id);
        axios.delete(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${id}`)
        .then(response=>{
          console.log(response);
          if(response.status === 204){
            //***Här vi updatera movies array utom den deleted item enligt id.
            this.setState({movies: this.state.movies.filter(item => (item.id !== id))})
          }else{
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong with importing movies from server!',
            })
          }
        })
        Swal.fire(
          'Deleted!',
          'Your movie has been deleted.',
          'success'
        )
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
            deleteMovieFnc={this._deleteMovie}
          />
        </div>
      </React.Fragment>
    )
  }
}
