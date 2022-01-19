import React from 'react'
import './TextField.css'
import { ErrorMessage, useField } from 'formik'

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className={`field ${meta.touched && meta.error && 'is-invalid'}`}>
      <label htmlFor={field.name}>{label}</label>
      <input 
        className="input"
        {...field} {...props}
      />
      <ErrorMessage component="div" className="error" name={field.name}/>
    </div>
  )
}