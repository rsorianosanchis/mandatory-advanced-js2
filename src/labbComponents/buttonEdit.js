import React,{Component} from 'react';
import {Link} from 'react-router-dom';


export class ButtonEdit extends Component {
  render(){
    console.log('buttonedit funcionando');
    console.log(this.props.id);
    return(
      <Link
        to={`/edit/${this.props.id}`}
        className='btn btn-warning btn-sm'
        style={{margin: '5px'}}>
        Redigera
      </Link>
    )
  }
}
