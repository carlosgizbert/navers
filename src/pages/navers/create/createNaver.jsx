import React from 'react'
import './createNaver.css'
import Header from '../components/Header'
import { Form, Formik, Field } from 'formik'
import {ReactComponent as BtVoltar} from '../../components/svg/BtVoltar.svg'
import { Link } from 'react-router-dom'

const createNaver = () => {
  return (
    <div className="create-naver-page">
      <div className="wrapper">
        <Header/>
        <div className="create-header">
          <Link to="/navers">
          <div className="bt-voltar"><BtVoltar/></div>
          </Link>
          <h1>Adicionar Naver</h1>
        </div>
        <Formik>
          <Form>
          <div className="fields">
            <div>
              <span htmlFor="nome">Nome</span>
              <Field className="field" type="text" name="name" placeholder="Nome"></Field>
            </div>
            <div>
              <span htmlFor="job-role">Cargo</span>
              <Field className="field" type="text" name="job-role" placeholder="Cargo"></Field>
            </div>
            <div>
              <span htmlFor="age">Idade</span>
              <Field className="field" type="text" name="age" placeholder="Idade"></Field>
            </div>
            <div>
              <span htmlFor="company_time">Tempo de empresa</span>
              <Field className="field" type="text" name="company_time" placeholder="Tempo de empresa"></Field>
            </div>
            <div>
              <span htmlFor="projects">Projetos que participou</span>
              <Field className="field" type="text" name="projects" placeholder="Projetos que participou"></Field>
            </div>
            <div>
              <span htmlFor="image-url">URL da foto do Naver</span>
              <Field className="field" type="text" name="image-url" placeholder="URL da foto do Naver"></Field>
            </div>
          </div>
          <div className="submit">
          <input type="submit" className="bt-primary" value="Salvar"/>
          </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default createNaver