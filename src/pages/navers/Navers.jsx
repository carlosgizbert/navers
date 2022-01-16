import React from 'react'
import Header from './components/Header'
import './Navers.css'
import Button from '../components/Button'
import NaverList from './components/NaversList'

const Navers = () => {
  return(
    <div className="navers-page">
      <div className="wrapper">
        <Header/>
          <div className="title">
            <h1>Navers</h1>
            <Button className="bt bt-primary" value="Adicionar Naver"/>
            </div>
            <NaverList/>
        </div>
    </div>
  )
}

export default Navers