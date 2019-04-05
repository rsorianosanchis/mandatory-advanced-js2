import React,{Component} from 'react';
import {MovieItem} from './movieItem';

export class MoviesList extends Component {

  _renderaList = ()=>{
    const movies= this.props.movies;
    if (movies.length === 0 ) return null;
    console.log(movies);
    return(

      <React.Fragment>

        {movies.map(item=>(<MovieItem
          key={item.id}
          info={item}
          clsMovieFnc={this.props.clsMovieFnc}
          />))}
      </React.Fragment>
    )
  }

  render(){
    return (
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Filmtitel</th>
            <th scope='col'>Regissör</th>
            <th scope='col'>Betyg</th>
            <th scope='col'>Användaråtgärder</th>
          </tr>
        </thead>
        <tbody>
          {this._renderaList()}
        </tbody>
      </table>
    )
  }
}
