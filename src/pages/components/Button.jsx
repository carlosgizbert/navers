import React from 'react'
import './Button.css'


const Button = (props) => 
<button className={props.className}>{props.value}</button>


export default Button