import React, { useState, useEffect } from 'react'
import './EditNaver.css'
import Header from '../components/Header'
import { Form, Formik, Field } from 'formik'
import {ReactComponent as BtVoltar} from '../../components/svg/BtVoltar.svg'
import { ReactComponent as IconClose }from '../../components/svg/icon-x.svg'
import { Link, useParams } from 'react-router-dom'
import api from '../../../api'
import Modal from 'react-modal';

const initialState = {
  name: '',
  job_role: '',
  birthdate: '',
  admission_date: '',
  project: '',
  url: '',
}



const EditNaver = () => {
  
  const [modalSuccess, setModalSuccess] = useState(false)
  const [naver, setNaver] = useState(initialState)

  // naverId params
  const { id } = useParams();

  const token = localStorage.getItem('token')
  const getNaver = async () => {
  await api.get('/navers/'+id , { headers: {"Authorization" : `Bearer ${token}`} })
  .then(res => {
    const { data } = res
    if(data){
    data.birthdate = isoToYear(data.birthdate)
    setNaver(data)
    }
  })
}

  useEffect(() => {
    getNaver()
  }, [])
    

  const onChange = (e) =>{
    const {name, value } = e.target
    setNaver({ ...naver, [name]: value})
  }

  const isoToYear = (birthdateIso) => {
    birthdateIso = parseInt(birthdateIso.toString().substring(0, 10))
    const currentYear = new Date().getFullYear()
    const age =  currentYear - birthdateIso
    return age
  }

  const updateNaver = () => {
    const token = localStorage.getItem('token')

    delete naver['id']
    delete naver['user_id']

    api.put('/navers/'+id, naver, { headers: {"Authorization" : `Bearer ${token}`} })
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

  const handleUpdate = () => {
    updateNaver()
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
    width: '592px',
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
          <h1>Editar Naver</h1>
        </div>
        <Formik initialValues={{naver}} onSubmit={handleUpdate}>
          <Form>
          <div className="fields">
            <div>
              <span htmlFor="nome">Nome</span>
              <Field className="field" type="text" name="name" placeholder="Nome" value={naver.name} onChange={onChange}></Field>
            </div>
            <div>
              <span htmlFor="job_role">Cargo</span>
              <Field className="field" type="text" name="job_role" placeholder="Cargo" value={naver.job_role} onChange={onChange}></Field>
            </div>
            <div>
              <span htmlFor="birthdate">Idade</span>
              <Field className="field" type="text" name="birthdate" placeholder="Idade" value={naver.birthdate} onChange={onChange}></Field>
            </div>
            <div>
              <span htmlFor="admission_date">Tempo de empresa</span>
              <Field className="field" type="text" name="admission_date" placeholder="Tempo de empresa" value={naver.admission_date} onChange={onChange}></Field>
            </div>
            <div>
              <span htmlFor="project">Projetos que participou</span>
              <Field className="field" type="text" name="project" placeholder="Projetos que participou" value={naver.project} onChange={onChange}></Field>
            </div>
            <div>
              <span htmlFor="url">URL da foto do Naver</span>
              <Field className="field" type="text" name="url" placeholder="URL da foto do Naver" value={naver.url} onChange={onChange}></Field>
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
            <Link to="/navers">
              <div className="fechar">
                <IconClose/>
              </div>
            </Link>
            <div className="body">
              <h1>Naver atualizado</h1>
              <span>{naver.name} atualizado com sucesso!</span>
            </div>
				  </div>
        </Modal>
      </div>
    </div>
  )
}

export default EditNaver