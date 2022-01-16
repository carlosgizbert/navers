import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router'
import {ReactComponent as LogoNave} from '../../../assets/logo.svg'

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (<header className="header">
    <div className="logo"><LogoNave/></div>
    <div className="bt" onClick={handleLogout}>Sair</div>
  </header>
  )
}




export default Header