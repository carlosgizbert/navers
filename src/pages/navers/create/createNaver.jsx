import React, { useState } from 'react'
import './createNaver.css'
import Header from '../components/Header'
import { Form, Formik } from 'formik'
import { TextField } from '../../components/textfield/TextField'
import {ReactComponent as BtVoltar} from '../../components/svg/BtVoltar.svg'
import { ReactComponent as IconClose }from '../../components/svg/icon-x.svg'
import { Link } from 'react-router-dom'
import api from '../../../api'
import Modal from 'react-modal';
import moment from 'moment'

const initialState = {
  name: '',
  job_role: '',
  birthdate: '',
  admission_date: '',
  project: '',
  url: '',
}

const CreateNaver = () => {
  const [values, setValues] = useState(initialState)
  const [modalSuccess, setModalSuccess] = useState(false)
  
  const onChange = (e) => {
    let { name, value } = e.target
    // converte idade em data nascimento
    name === 'birthdate' ? value = ageToDate(value) : value = value
    name === 'admission_date' ? value = ageToDate(value) : value = value 
    console.log(values)
    setValues({ ...values, [name]: value})
  }

  const ageToDate = (num) => {
    const check = moment(new Date(), 'YYYY/MM/DD');
  
    const currentMonth = check.format('M');
    const currentDay   = check.format('D');
    const currentYear  = check.format('YYYY');
  
    const year = (currentYear - num)
    const completeYear = `${currentDay}/${currentMonth}/${year}`
    console.log(completeYear)
    return completeYear
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


const modalCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '2rem',
    border: 'none',
    margin: '0',
    height: 'auto',
    borderRadius: '0'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
}

const handleOpenModal = () => {
  setModalSuccess(true)
}

const handleCloseModal = (e) => {
  setModalSuccess(false)
}

  return (
    <div className="create-naver-page">
      <Header/>
      <div className="wrapper">
        <div className="create-header">
          <Link to="/navers">
          <div className="bt-icon bt-voltar"><BtVoltar/></div>
          </Link>
          <h1>Adicionar Naver</h1>
        </div>
        <Formik initialValues={{}} onSubmit={handleCreate}>

          <Form>
          <div className="fields">
          <TextField 
              type="text" 
              name="name" 
              label="Nome" 
              placeholder="Nome" 
              onChange={onChange}/>

              <TextField 
              type="text" 
              name="job_role" 
              label="Cargo" 
              placeholder="Cargo" 
              onChange={onChange}/>

              <TextField 
              type="number" 
              name="birthdate" 
              label="Idade" 
              placeholder="Idade" 
              onChange={onChange}/>

              <TextField 
              type="number" 
              name="admission_date" 
              label="Tempo de empresa (Em anos)" 
              placeholder="Tempo de empresa" 
              onChange={onChange}/>

              <TextField 
              type="text" 
              name="project" 
              label="Projetos que participou" 
              placeholder="Projetos que participou" 
              onChange={onChange}/>

              <TextField
              type="text" 
              name="url" 
              label="URL da foto do Naver" 
              placeholder="URL da foto do Naver" 
              onChange={onChange}/>
          </div>
          <div className="submit mt-10">
          <button type="submit" className="bt bt-primary" value="Salvar">Salvar</button>
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
					<div className="fechar">
            <Link to="/navers">
              <div className="bt-icon">
                <IconClose/>
              </div>
            </Link>
          </div>
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