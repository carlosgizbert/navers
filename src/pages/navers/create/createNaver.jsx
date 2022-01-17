import React, { useState } from 'react'
import './createNaver.css'
import Header from '../components/Header'
import { Form, Formik, Field } from 'formik'
import {ReactComponent as BtVoltar} from '../../components/svg/BtVoltar.svg'
import { Link } from 'react-router-dom'
import api from '../../../api'
import Modal from 'react-modal';

const initialState = {
  name: '',
  job_role: '',
  birthdate: null,
  admission_date: null,
  project: '',
  url: '',
}

const CreateNaver = () => {
  const [values, setValues] = useState(initialState)
  const [modalSuccess, setModalSuccess] = useState(false)
  
  const onChange = (e) =>{
    const {name, value } = e.target
    setValues({ ...values, [name]: value})
  }

  const handleCreate = e => {
    const token = localStorage.getItem('token')

    api.post('/navers', values, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => 
      {
        const { data } = res
        if(data){
          console.log('Dados enviados !! '+data)
          handleOpenModal()
        }
      }
    ).catch(e => {
      handleCloseModal(e)
      console.log('Erro ao cadatrar !! '+e)
    })
  }

  // tools form
  const birthDataTransform = (value) => {
    const anoAtual = new Date().getFullYear()
    return 
  }

  const admissionDateTransform = (value) => {
    return 
  }


const modalCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
    margin: '0',
    width: '592px',
    height: 'auto',
    borderRadius: '0'
  },
}

const handleOpenModal = () => {
  setModalSuccess(true)
}

const handleCloseModal = (e) => {
  setModalSuccess(false)
}

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
        <Formik initialValues={{}} onSubmit={handleCreate}>
          <Form>
          <div className="fields">
            <div>
              <span htmlFor="nome">Nome</span>
              <Field className="field" type="text" name="name" placeholder="Nome" onChange={onChange}></Field>
            </div>
            <div>
              <span htmlFor="job_role">Cargo</span>
              <Field className="field" type="text" name="job_role" placeholder="Cargo" onChange={onChange}></Field>
            </div>
            <div>
              <span htmlFor="birthdate">Idade</span>
              <Field className="field" type="text" name="birthdate" placeholder="Idade" onChange={onChange}></Field>
            </div>
            <div>
              <span htmlFor="admission_date">Tempo de empresa</span>
              <Field className="field" type="text" name="admission_date" placeholder="Tempo de empresa" onChange={onChange}></Field>
            </div>
            <div>
              <span htmlFor="project">Projetos que participou</span>
              <Field className="field" type="text" name="project" placeholder="Projetos que participou" onChange={onChange}></Field>
            </div>
            <div>
              <span htmlFor="url">URL da foto do Naver</span>
              <Field className="field" type="text" name="url" placeholder="URL da foto do Naver" onChange={onChange}></Field>
            </div>
          </div>
          <div className="submit">
          <input type="submit" className="bt bt-primary" value="Salvar"/>
          </div>
          </Form>
        </Formik>
        <Modal 
          isOpen={modalSuccess} 
          onRequestClose={handleCloseModal}
          style={modalCustomStyles} 
          ariaHideApp={false}
          >
          <div className="modal-success">
            <div className="fechar" onClick={handleCloseModal}>x</div>
            <div className="body">
              <h1>Naver criado</h1>
              <span>Naver criado com sucesso!</span>
            </div>
				  </div>
        </Modal>
      </div>
    </div>
  )
}

export default CreateNaver