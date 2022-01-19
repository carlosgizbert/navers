import React, { useState, useEffect } from 'react'
import './EditNaver.css'
import Header from '../components/Header'
import { Form, Formik } from 'formik'
import { TextField } from '../../components/textfield/TextField'
import {ReactComponent as BtVoltar} from '../../components/svg/BtVoltar.svg'
import { ReactComponent as IconClose }from '../../components/svg/icon-x.svg'
import { Link, useParams } from 'react-router-dom'
import api from '../../../api'
import Modal from 'react-modal';
import moment from 'moment'
import * as Yup from 'yup'

const validate = Yup.object({
  name: Yup.string()
  .min(3, 'Digite um nome maior')
  .max(120, 'Digite 15 caracteres ou menos')
  .required('Insira o nome'),

  job_role: Yup.string()
  .min(3, 'Digite um Cargo com nome maior')
  .max(40, 'Digite 15 caracteres ou menos')
  .required('Digite o cargo'),

  birthdate: Yup.number()
  .min(18, 'Navers devem possuir 18 anos ou mais')
  .max(80, 'Esse naver precisa aposentar para curtir a vida!')
  .required('Insira a idade'),

  admission_date: Yup.number()
  .min(0, 'Digite um Cargo com nome maior')
  .max(5, 'Nave existe há apenas 5 anos')
  .required('Insira o tempo de empresa'),

  project: Yup.string()
  .max(40, 'Digite 40 caracteres ou menos')
  .required('Insira um projeto'),

  url: Yup.string()
  .url('Insira uma URL válida (http:// ...)')
  .required('Insira uma url')
})

const EditNaver = () => {
  
  const [modalSuccess, setModalSuccess] = useState(false)
  
  const [naver, setNaver] = useState({
  name: 'AAAA',
  job_role: '',
  birthdate: '',
  admission_date: '',
  project: '',
  url: ''
  })

  // captura id da url
  const { id } = useParams();
  const token = localStorage.getItem('token')

  useEffect(() => {
    const getNaver = async () => {
      await api.get('/navers/'+id , { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
        const { data } = res

        // converte datas iso da promise em idade para mostrar no form
        if(data){
        data.birthdate = isoToYear(data.birthdate)
        data.admission_date = isoToYear(data.admission_date)
        setNaver(data)
        }
      })
    }
    getNaver()
  }, [])
    
  

  const isoToYear = (birthdateIso) => {
    birthdateIso = parseInt(birthdateIso.toString().substring(0, 10))
    const currentYear = new Date().getFullYear()
    const age =  currentYear - birthdateIso
    return age
  }

  const ageToDate = (num) => {
    const check = moment(new Date(), 'YYYY/MM/DD');
    const currentMonth = check.format('M');
    const currentDay   = check.format('D');
    const currentYear  = check.format('YYYY');
    const year = (currentYear - num)
    const completeDate = `${currentDay}/${currentMonth}/${year}`
    console.log(completeDate)
    return completeDate
  }

  const updateNaver = (values) => {
    const token = localStorage.getItem('token')

    // remove propriedades invalidas ao rest e converte datas para iso antes de enviar pro backend
    delete values['id']
    delete values['user_id']
    values['birthdate'] = ageToDate(values['birthdate']) 
    values['admission_date'] = ageToDate(values['admission_date']) 

    api.put('/navers/'+id, values, { headers: {"Authorization" : `Bearer ${token}`} })
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
        <Formik 
        enableReinitialize // precisa para o form atualizar dados(initialValues) da promise
        initialValues={naver} 
        validationSchema={validate}
        onSubmit={values => updateNaver(values)}>

        {formik => (
          <Form>
          <div className="fields">
          <TextField 
              type="text" 
              name="name" 
              label="Nome" 
              placeholder="Nome"/>

              <TextField 
              type="text" 
              name="job_role" 
              label="Cargo" 
              placeholder="Cargo"/>

              <TextField 
              type="number" 
              name="birthdate" 
              label="Idade" 
              placeholder="Idade"/>

              <TextField 
              type="number" 
              name="admission_date" 
              label="Tempo de empresa (Em anos)" 
              placeholder="Tempo de empresa"/>

              <TextField 
              type="text" 
              name="project" 
              label="Projetos que participou" 
              placeholder="Projetos que participou"/>

              <TextField
              type="text" 
              name="url" 
              label="URL da foto do Naver" 
              placeholder="URL da foto do Naver"/>
          </div>
          <div className="submit mt-10">
          <button type="submit" className="bt bt-primary">Salvar</button>
          </div>

          </Form>
        )}

        </Formik>
        <Modal 
          isOpen={modalSuccess} 
          onRequestClose={handleCloseModal}
          style={modalCustomStyles} 
          ariaHideApp={false}
          >
          <div className="modal-success">
            <Link to="/navers">
              <div className="bt-icon fechar">
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