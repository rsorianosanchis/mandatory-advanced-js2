import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Emojify from 'react-emojione';

export class MovieItem extends Component {
  state= {
    emoBetyg: <Emojify>:thinking:</Emojify>,


  }

  _emoBetyg = (rating) => {
    const betyg = rating;
    console.log(betyg);
      if(betyg<=2){
        this.setState({emoBetyg: <Emojify>:face_vomiting:</Emojify>})
      }else if (betyg > 2 && betyg<=4){
        this.setState({emoBetyg: <Emojify>:nauseated_face:</Emojify>})
      }else if (betyg >= 5 && betyg<=7){
        this.setState({emoBetyg: <Emojify>:face_with_raised_eyebrow:</Emojify>})
      }else if (betyg >7 && betyg<=9){
        this.setState({emoBetyg: <Emojify>:grinning:</Emojify>})
      }else if (betyg >= 10){
        this.setState({emoBetyg: <Emojify>:clap::clap:</Emojify>})
      }
  }

  componentWillMount() {
    this._emoBetyg(this.props.info.rating);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.info !== nextProps.info || this.state.emoBetyg !== nextState.emoBetyg){
      this._emoBetyg();
      return true;
    }else{
      return false
    }
  }


  render(){
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
