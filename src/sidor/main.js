import React,{Component} from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Swal from 'sweetalert2';
import {MoviesList} from '../labbComponents/moviesList.js';
import {Search} from '../labbComponents/searcher.js'

let filterResult;

export class Main extends Component {
  //
  state = {
    movies: [],
    filteredMovies:[],
    movieForSearch: ''
  }
  //
  //bara rendera requesten om det finns
  // ny elementer eller mindre i array
  componentDidMount() {
    //
    this._getMovies();
    //
  }
  shouldComponentUpdate(nextProps, nextState) {

    return true
  }

  //
  _getMovies (){
    axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies`)
    .then(response =>{
      console.log(response);
      console.log(response.data);
      this.setState({
        movies: response.data
      })
    })
    .catch((error)=>{
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong with importing movies from server!',
      })
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
          //***Här vi updatera movies array utom den deleted item enligt id.
          this.setState({movies: filterResult.filter(item => (item.id !== id))})
        }).catch(error=>{
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong with delete movie!',
          })
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
  _searchMovie = (string)=>{
    if(string.length >= 1){
      this.setState({movieForSearch: string})

    }else{
      this.setState({movieForSearch: ''})
    }

  }
  //
  render(){
    console.log('render sidan Main');
    let cpMovies = [...this.state.movies];
    let word = this.state.movieForSearch;
    let strForSearch = this.state.movieForSearch;

    if(strForSearch.length !== 0){
      filterResult = cpMovies.filter(movie=>(movie.title.toLowerCase().indexOf(word.toLowerCase()) !== -1)
      ||(movie.director.toLowerCase().indexOf(word.toLowerCase()) !== -1)) 

    }else{
      filterResult = cpMovies;
    }


    return(
      <React.Fragment>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className='col-12 col-md-8' >
          <h4 className='text-center display-5'>Movies List</h4>
          <Search writtenWord= {this._searchMovie}/>
          <MoviesList
            movies={filterResult}
            deleteMovieFnc={this._deleteMovie}
          />
        </div>
      </React.Fragment>
    )
  }
}
