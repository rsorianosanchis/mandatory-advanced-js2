import React,{Component} from 'react';
import { Helmet } from 'react-helmet';
import {MoviesList} from '../labbComponents/moviesList.js';

export class Main extends Component {
  render(){
    console.log('render sidan Main');
    console.log(this.props.movies);
    return(
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className='col-12 col-md-8' >
          <h4 className='text-center display-5'>Movies List</h4>
          <MoviesList
            movies={this.props.movies}
            clsMovieFnc={this.props.clsMovieFnc}
          />
        </div>
      </>
    )
  }
}
