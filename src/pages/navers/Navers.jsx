import React from 'react'
import Header from './components/Header'
import './Navers.css'
import NaverList from './components/NaversList'
import { Link } from 'react-router-dom'

const Navers = () => {
  return(
    <div className="navers-page">
      <Header/>
      <div className="wrapper">
        <div className="title">
          <h1>Navers</h1>
          <Link to="/navers/adicionar">
            <div className="bt bt-primary">Adicionar Naver</div>
          </Link>
        </div>
        <NaverList/>
      </div>
    </div>
  )
}

export default Navers