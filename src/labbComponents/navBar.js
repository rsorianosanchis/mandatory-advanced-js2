import React from 'react';
import {Link} from 'react-router-dom';
import {ButtonHome} from './buttonHome.js';
import './navBar.css';

export const NavBar = ()=>{
  return(
    <nav className='col-8 col-md-8'>
      <ButtonHome/>
      <Link to={'/add'} className='btn btn-secondary'>Add Film</Link>
    </nav>
  )
}
