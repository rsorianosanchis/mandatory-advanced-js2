import React,{Component} from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export class Add extends Component {
  state = {
    inputTitle: '',
    inputDescription:'',
    inputDirector:'',
    inputRating: 0,
    submitOk: false
  }
  //
  _postNyMovie=(e)=>{
    e.preventDefault();
    let nyMovie = {};
    nyMovie.title = this.state.inputTitle;
    nyMovie.description = this.state.inputDescription;
    nyMovie.director = this.state.inputDirector;
    nyMovie.rating = this.state.inputRating;
    console.log(nyMovie);
    //
    axios.post(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies`,nyMovie)
    .then(response =>{
      console.log(response);
      if(response.status === 201){
        console.log(response.statusText);
        this.setState({submitOk: true})
      }
    })
    this.props.updateList(nyMovie)
  }

  // componentWillUnmount=() =>{
  //   this.field_form.removeEventListener('onSubmit',this.function);
  //   this.field_1.removeEventListener('onChange',this.function);
  //   this.field_2.removeEventListener('onChange',this.function);
  //   this.field_3.removeEventListener('onChange',this.function);
  //   this.field_4.removeEventListener('onChange',this.function);
  // }
  componentDidCatch(error,info){
    console.log(error);
    console.log(info);
  }

  render(){
    return(
      <>
        <Helmet>
          <title>Add</title>
        </Helmet>
        <form
          onSubmit={this._postNyMovie}
          className='col-8'
          ref={inputElement => this.field_form = inputElement}
          >
          <legend className='text-center'>Lägg till en ny film</legend>
          <div className='form-group'>
            <label>Filmitel</label>
            <input
              type='text'
              minLength='1'
              maxLength='40'
              className='form-control'
              placeholder='Titel'
              ref={inputElement => this.field_1 = inputElement}
              onChange={(e)=>{this.setState({inputTitle: e.target.value})}}
              required />
          </div>
          <div className='form-group'>
            <label>Regissörs Namn</label>
            <input
              type='text'
              minLength='1'
              maxLength='40'
              className='form-control'
              placeholder='Regissör'
              ref={inputElement => this.field_2 = inputElement}
              onChange={(e)=>{this.setState({inputDirector: e.target.value})}}
              required />
          </div>
          <div className='form-group'>
            <label>Betyg</label>
            <input
              type='number'
              step='0.1'
              pattern= '[0-9]'
              min= '0.0'
              max= '5.0'
              className='form-control'
              placeholder='Skriv ett nummer mellan 0.0 till 5.0'
              ref={inputElement => this.field_3 = inputElement}
              onChange={(e)=>{this.setState({inputRating: e.target.value})}}
              required />
          </div>
          <div className='form-group'>
            <label>Films beskrivning</label>
            <textarea
              type='textarea'
              minLength='1'
              maxLength='300'
              className='form-control'
              placeholder='Berätta något om filmen'
              ref={inputElement => this.field_4 = inputElement}
              onChange={(e)=>{this.setState({inputDescription: e.target.value})}}
              required>
            </textarea>
          </div>
          <button className='btn btn-primary'>Submit</button>
        </form>
      </>
    )
  }
}
