import React from 'react'
import Header from './components/Header'
import './Navers.css'
import Button from '../components/Button'
import NaverList from './components/NaversList'
import { Link } from 'react-router-dom'

const Navers = () => {
  return(
    <div className="navers-page">
      <Header/>
      <div className="wrapper">
        <div className="title">
          <h1>Navers</h1>
          <Link to="/adicionar">
            <Button className="bt bt-primary" value="Adicionar Naver"/>
          </Link>
        </div>
        <NaverList/>
      </div>
    </div>
  )
}

export default Navers