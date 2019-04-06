import React,{Component} from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';

export class Edit extends Component {
  constructor(props){
    super(props)
    console.log('constructor i Edit');
    console.log(props);
    console.log(props.match.params.id);
    this.state = {
      upData: {},
      id:props.match.params.id,
      inputTitle: '',
      inputDescription:'',
      inputDirector:'',
      inputRating: 0,
      usrRandom: '',
      submitOk: false}
  }
  //
  componentWillMount=() =>{
    console.log();
    console.log('request movie for updatera innan render ');
    this._getMovie();

  }

  _getMovie = ()=>{
    console.log('_getMovie i Detail');
    axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${this.state.id}`)
    .then(response =>{
      console.log(response.data);
      if(response.status=== 200){
        this.setState({upData: response.data})
      }else if(response.status=== 404){
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Filmen finns inte i server',
        })
      }
    }).catch(error=>{
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Filmen finns inte i server or somthing went wrong',
      })
    })
  }
  //
  _postNyMovie=(e)=>{
    console.log('_postNyMovie i Add');
    e.preventDefault();
    let updateMovie = {};
    updateMovie.title = this.field_1.value;
    updateMovie.description = this.field_4.value;
    updateMovie.director = this.field_2.value;
    updateMovie.rating = this.field_3.value;
    console.log(updateMovie);
    //
    debugger;
    axios.put(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${this.state.id}`,updateMovie)
    .then(response =>{
      console.log(response.status);
      console.log(response.statusText);
      this.setState({submitOk: true});
    })
    .catch((error)=>{
      console.log(error);
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'filmensupdatering inte accepterats av servern',
      })
    })
  }
  //
  render(){
    const test = this.state.upData;
    console.log('render sidan Edit');
    console.log(this.state.upData);
    return(
      this.state.submitOk === false?
      <React.Fragment>
        <Helmet>
          <title>Edit</title>
        </Helmet>
        <form
          onSubmit={this._postNyMovie}
          className='col-8'
          ref={inputElement => this.field_form = inputElement}
          >
          <legend className='text-center'>Edit filmen</legend>
          <div className='form-group'>
            <label>Filmitel</label>
            <input
              type='text'
              minLength='1'
              maxLength='40'
              className='form-control'
              defaultValue= {test.title}
              ref={inputElement => this.field_1 = inputElement}
               />
          </div>
          <div className='form-group'>
            <label>Regissörs Namn</label>
            <input
              type='text'
              minLength='1'
              maxLength='40'
              className='form-control'
              defaultValue= {test.director}
              ref={inputElement => this.field_2 = inputElement}
               />
          </div>
          <div className='form-group'>
            <label>Betyg</label>
            <input
              type='number'
              step='0.1'
              pattern= '[0-9]'
              min= '0.0'
              /*max= '5.0'*/
              className='form-control'
              defaultValue= {test.rating}
              ref={inputElement => this.field_3 = inputElement}
               />
          </div>
          <div className='form-group'>
            <label>Films beskrivning</label>
            <textarea
              type='textarea'
              minLength='1'
              maxLength='300'
              className='form-control'
              defaultValue= {test.description}
              ref={inputElement => this.field_4 = inputElement}
              >
            </textarea>
          </div>
          <button className='btn btn-primary'>Submit</button>
        </form>
      </React.Fragment>
    :<Redirect to='/'/>
    )
  }
}
