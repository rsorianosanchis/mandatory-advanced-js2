import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Emojify from 'react-emojione';

export class MovieItem extends Component {
  state= {
    emoBetyg: <Emojify>:thinking:</Emojify>,
  }
  //
  _emoBetyg = (rating) => {
    console.log('_emoBetyg i MovieItem');
    const betyg = rating;
    //console.log(betyg);
      if(betyg<=1){
        this.setState({emoBetyg: <Emojify>:face_vomiting:</Emojify>})
      }else if (betyg > 1 && betyg<=2){
        this.setState({emoBetyg: <Emojify>:nauseated_face:</Emojify>})
      }else if (betyg > 2 && betyg<=3){
        this.setState({emoBetyg: <Emojify>:face_with_raised_eyebrow:</Emojify>})
      }else if (betyg >3 && betyg < 5){
        this.setState({emoBetyg: <Emojify>:grinning:</Emojify>})
      }else{
        this.setState({emoBetyg: <Emojify>:star_struck:</Emojify>})
    }
  }
  //
  componentWillMount() {
    console.log('componentWillMount i MovieItem');
    this._emoBetyg(this.props.info.rating);
  }
  //
  render(){
    console.log('render MoviesList');
    const {title,director,rating,id}= this.props.info;
    return (
      <tr>
        <td>{title}</td>
        <td>{director}</td>
        <td>{rating} {this.state.emoBetyg}</td>
        <td>
          <Link to={`/detail/${id}`} className='btn btn-primary btn-sm'>Se</Link>
          <button onClick={()=>this.props.clsMovieFnc(id)} type='button' className='btn btn-danger btn-sm'>Radera</button>
        </td>
      </tr>
    )
  }
}
