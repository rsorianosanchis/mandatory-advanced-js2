import React,{Component} from 'react';

export class Search extends Component {
  _readData=(e)=>{
    console.log(e.target.value);
    const word = e.target.value;
    //för inte glomma,mycket interessat för att skika en värde
    //från chlidren till parent igenom props()
    this.props.writtenWord(word);
  }
  render(){
    return(
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          style={{margin: '5px 5px 5px 0px'}} type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={this._readData}/>
      </form>
    )
  }
}
