import React, { useState, useEffect } from 'react'
import './Login.css'
import api from '../../api'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router'
import {ReactComponent as Logo} from '../../assets/logo.svg'
import * as Yup from 'yup'

const initialState = {
  email: '',
  password: ''
}

const schema = Yup.object().shape({
  email: Yup.string().required("Insira seu E-mail"),
  password: Yup.string().required("Insira sua Senha")
})

const Login = () => { 
  const [values, setValues] = useState(initialState)
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    token && navigate('/navers')
  }, [])

  const onChange = (e) =>{
    const {name, value } = e.target
    setValues({ ...values, [name]: value})
  }

  // precisa usar navigate como hook dentro do componente função
  const handleLogin = async e => {
    e.preventDefault();
    await api.post('/users/login', values)
    .then(res => 
      {
        const { data } = res
        if(data){
          localStorage.setItem('token', data.token)
          navigate('/navers')
        }
      }
    ).catch(e => console.log("Erro no catch: "+e))
  }


  return(
    <div className="login-page">
      <div className="login-box">
      <div className="logo"><Logo/></div>
      <Formik 
      initialValues={{}} 
      validationSchema={schema}>
        {({ errors }) => (
          <Form className='fields mt-20' 
          onSubmit={handleLogin}>
            {(errors.email || errors.password) &&
            <div className="form-erros">
              <ul>
              {errors.email && <li>{errors.email}</li>}
              {errors.password && <li>{errors.password}</li>}
              <li>email: testing-user@nave.rs</li>
              <li>senha: nave1234</li>
              </ul>
            </div>}
          <span htmlFor="email">E-mail</span>
            <Field 
            className="field" 
            type="text"
            name="email" 
            placeholder="Insira seu email" 
            onChange={onChange}
            />
          <span htmlFor="password">Senha</span>
            <Field 
            className="field" 
            type="password"
            name="password" 
            placeholder="Insira sua senha" 
            onChange={onChange}
            />
          <input className="bt bt-primary" type="submit" value="Entrar"></input>
        </Form>
        )}
      </Formik>
      </div>
    </div>
  )
}

export default Login