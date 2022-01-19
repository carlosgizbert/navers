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
    

  const onChange = (e) =>{
    let {name, value } = e.target
    setNaver({ ...naver, [name]: value})
  }
  

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

  const updateNaver = () => {
    const token = localStorage.getItem('token')

    // remove propriedades invalidas ao rest e converte datas para iso antes de enviar pro backend
    delete naver['id']
    delete naver['user_id']
    naver['birthdate'] = ageToDate(naver['birthdate']) 
    naver['admission_date'] = ageToDate(naver['admission_date']) 

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
          <TextField 
              type="text" 
              name="name" 
              label="Nome" 
              placeholder="Nome" 
              value={naver.name}
              onChange={onChange}/>

              <TextField 
              type="text" 
              name="job_role" 
              label="Cargo" 
              placeholder="Cargo" 
              value={naver.job_role}
              onChange={onChange}/>

              <TextField 
              type="number" 
              name="birthdate" 
              label="Idade" 
              placeholder="Idade" 
              value={naver.birthdate}
              onChange={onChange}/>

              <TextField 
              type="number" 
              name="admission_date" 
              label="Tempo de empresa (Em anos)" 
              placeholder="Tempo de empresa" 
              value={naver.admission_date}
              onChange={onChange}/>

              <TextField 
              type="text" 
              name="project" 
              label="Projetos que participou" 
              placeholder="Projetos que participou"
              value={naver.project}
              onChange={onChange}/>

              <TextField
              type="text" 
              name="url" 
              label="URL da foto do Naver" 
              placeholder="URL da foto do Naver" 
              value={naver.url}
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