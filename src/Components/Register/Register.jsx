import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup" 
// 99d7f41a074df442999f3e145755a6b6   (api key of movi)
export default function Register() {

let navgate=useNavigate()
const [errors, seterrors] = useState('');
const [loading, setloading] = useState(false)
let validate= Yup.object({
  name:Yup.string().required('name must be required').min(3,'must mor 3chracter').max(15,'must less 15 character'),
  email:Yup.string().required(' email must be required').email('email invalid'),
  password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/ ,'must start captial letter and contain number'),
  rePassword:Yup.string().required('must be required').oneOf([Yup.ref('password')],'repassword not matched'),
  phone: Yup.string().matches(/^01[0125][0-9]{8}$/ , 'number phone is invalid')

})
let formik= useFormik({
initialValues:{
  name:"",
  email:"",
  password:"",
  rePassword:"" ,
  phone:""
},
validationSchema:validate,
onSubmit:sendRegisterData

})
async function sendRegisterData(values){
  setloading(true)
let {data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,values).catch((error)=>{
  setloading(false)
console.log(error)
  seterrors(`email : ${error.response.data.message}`)
})
console.log(data);
if(data.message=="success"){
  setloading(false);
  navgate('/login')

}


}

  return<>
  
  <div className="container ">
<div className="form">

<form className='' onSubmit={formik.handleSubmit}>
{errors?  <div className="alert alert-danger">{errors}</div>:""}

<label htmlFor='name'>name</label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type='text' id="name" className='form-control my-2'/>
{formik.errors.name && formik.touched.name? <div className="alert alert-danger">{formik.errors.name}</div>:""}
<label htmlFor='email'>email</label>
<input onChange={formik.handleChange}onBlur={formik.handleBlur} type='email'  value={formik.values.email} id="email" className='form-control my-2'/>
{formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div>:""}
<label htmlFor='password'>password</label>
<input onChange={formik.handleChange}onBlur={formik.handleBlur} type='password'  value={formik.values.password} id="password" className='form-control my-2'/>
{formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div>:""}
<label htmlFor='rePassword'>rePassword</label>
<input onChange={formik.handleChange}onBlur={formik.handleBlur} type='password'  value={formik.values.rePassword} id="rePassword" className='form-control my-2'/>
{formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger">{formik.errors.rePassword}</div>:""}
<label htmlFor='phone'>phone</label>
<input  onChange={formik.handleChange}onBlur={formik.handleBlur} type='tel'  value={formik.values.phone} id="phone" className='form-control my-2'/>
{formik.errors.phone && formik.touched.phone? <div className="alert alert-danger">{formik.errors.phone}</div>:""}
{loading?<button type='button' className='btn btn-success'><i className='fas fa-spinner fa-spin'></i></button>:
<button type='submit' disabled={(!formik.isValid)} className='btn btn-success'>Register</button>
}


</form>

</div>
  </div>
  
  
  
  </>
}
