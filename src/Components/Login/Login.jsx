import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup" 
// 99d7f41a074df442999f3e145755a6b6   (api key of movi)
export default function Login({getUsreData}) {
 let navigate= useNavigate()
const [errors, seterrors] = useState('');
const [loading, setloading] = useState(false)
let validate= Yup.object({

  email:Yup.string().required(' email must be required').email('email invalid'),
  password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ ,'must start captial letter and contain number'),


})
let formik= useFormik({
initialValues:{

  email:"",
  password:"",

},
validationSchema:validate,
onSubmit:sendRegisterData

})
async function sendRegisterData(values){
  setloading(true)
let {data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values).catch((error)=>{
  setloading(false)
console.log(error)
  seterrors(`email : ${error.response.data.message}`)
})
console.log(data);
if(data.message=="success"){

 
  localStorage.setItem('token',data.token)
  getUsreData()
  // localStorage.setItem('token', data.token);

  setloading(false)
  navigate('/')
}


}

  return<>
  
  <div className="container ">
<div className="form">

<form className='' onSubmit={formik.handleSubmit}>
{errors?  <div className="alert alert-danger">{errors}</div>:""}


<label htmlFor='email'>email</label>
<input onChange={formik.handleChange}onBlur={formik.handleBlur} type='email'  value={formik.values.email} id="email" className='form-control my-2'/>
{formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div>:""}

<label htmlFor='password'>password</label>
<input onChange={formik.handleChange}onBlur={formik.handleBlur} type='password'  value={formik.values.password} id="password" className='form-control my-2'/>
{formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div>:""}

{loading?<button type='button' className='btn btn-success'><i className='fas fa-spinner fa-spin'></i></button>:
<button type='submit' disabled={(!formik.isValid)} className='btn btn-success'>Login</button>
}


</form>

</div>
  </div>
  
  
  
  </>
}

