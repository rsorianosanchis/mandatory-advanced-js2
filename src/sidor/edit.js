import React,{Component} from 'react';
import { Helmet } from 'react-helmet';

export class Edit extends Component {
  render(){
    console.log('render sidan Edit');
    return(
        <React.Fragment>
          <h1>Edit sidan (tar bort)</h1>
          <Helmet>
            <title>Edit</title>
          </Helmet>

        </React.Fragment>
    )
  }
}
