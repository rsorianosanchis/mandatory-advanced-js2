import React from 'react';
import {Link} from 'react-router-dom';

export const ButtonEdit = ()=>(
  <Link
    to={'/edit'}
    className='btn btn-primary btn-sm'
    style={{margin: '5px'}}>
    Redigera
  </Link>
)
