import React, { useState } from 'react'
import './Login.css'
import api from '../../api'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router'

const initialState = {
  email: '',
  password: ''
}

const Login = () => { 
  const [values, setValues] = useState(initialState)
  let navigate = useNavigate();

  const onChange = (ev) =>{
    const {name, value } = ev.target
    console.log(name, value)
    setValues({ ...values, [name]: value})

  }

  // precisa usar navigate como hook dentro do componente função
  const handleLogin = ev => {
    console.log(ev, values)
    api.post('/users/login', values)
    .then(res => 
      {
        const { data } = res
        if(data){
          localStorage.setItem('token', data.token)
          navigate('/navers')
          console.log(data)
        }
      }
    )
  }

  return(
    <div className="login-page">
      <div className="login-box">
      <div className="logo">Login</div>
      <Formik initialValues={{}} onSubmit={handleLogin}>
        <Form className='fields'>
          <div htmlFor="email">E-mail</div>
          <Field 
          className="field" 
          name="email" 
          placeholder="Insira seu email" 
          onChange={onChange}
          />
          <div htmlFor="password">Senha</div>
          <Field 
          className="field" 
          name="password" 
          placeholder="Insira sua senha" 
          onChange={onChange}
          />
          <input className="bt-login" type="submit" value="Entrar"></input>
        </Form>
      </Formik>
      </div>
    </div>
  )
}

export default Login