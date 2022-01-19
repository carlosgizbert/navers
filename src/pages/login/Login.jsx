import React, { useEffect } from 'react'
import './Login.css'
import api from '../../api'
import { Formik, Form } from 'formik'
import { TextField } from '../components/textfield/TextField'
import { useNavigate } from 'react-router'
import {ReactComponent as Logo} from '../../assets/logo.svg'
import * as Yup from 'yup'

const Login = () => { 
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    token && navigate('/navers')
  }, [])

  // precisa usar navigate como hook dentro do componente função
  const onSubmit = async (formValues) => {
    await api.post('/users/login', formValues)
    .then(res => 
      {
        const { data } = res
        if(data){
          localStorage.setItem('token', data.token)
          navigate('/navers')
        }
      }
    ).catch(e => console.log("Erro no catch: "))
  }

  const validate = Yup.object({
    email: Yup.string()
    .email('Insira um email válido')
    .required('Por favor insira seu email'),
    password: Yup.string()
    .required('Por favor insira sua senha')
  })

  return(
    <div className="login-page">
      <div className="login-box">
      <div className="logo"><Logo/></div>

      <Formik
      initialValues={{
        email: 'testing-user@nave.rs',
        password: 'nave1234'
      }}
      validationSchema={validate}
      onSubmit={values => onSubmit(values)}
    >
      {formik => (
        <div>
          <Form className="fields mt-10">
            <TextField label="Email" name="email" type="email" placeholder="Insira o email" />
            <TextField label="Senha" name="password" type="password" placeholder="Insira a senha"/>
            <button className="bt bt-primary mt-10" type="submit">Entrar</button>
          </Form>
        </div>
      )}
    </Formik>
      </div>
    </div>
  )
}

export default Login