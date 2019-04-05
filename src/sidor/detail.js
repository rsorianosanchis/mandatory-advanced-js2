import React,{Component} from 'react';
import axios from 'axios';

export class Detail extends Component {
  constructor(props){
    super(props)
    console.log(props);
    console.log(props.match.params.id);
    this.state = {
      movie: [],
      id: props.match.params.id}
  }

  _getMovie (){
    axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${this.state.id}`)
    .then(response =>{
      console.log(response);
      console.log(response.data);
      this.setState({movie: response.data})
      console.log(this.state.movie);
    })
  }

  componentDidMount() {
    this._getMovie()
  }

  render(){
    const {title,description,director,rating,id} = this.state.movie
    return(
      <div className="card col-12 col-md-8">
        <div className="card-header">
          {title}
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{description}.<br/> <small>Värderas av allmänheten med en {rating}</small></p>
            <footer className="blockquote-footer">Regisserad av <cite title="Source Title">{director}</cite></footer>
          </blockquote>
        </div>
      </div>
    )
  }
}
