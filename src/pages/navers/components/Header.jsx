import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router'
import {ReactComponent as LogoNave} from '../../../assets/logo.svg'
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (<header className="header">
    <Link to="/navers">
    <div className="logo"><LogoNave/></div>
    </Link>
    <div className="bt" onClick={handleLogout}>Sair</div>
  </header>
  )
}




export default Header