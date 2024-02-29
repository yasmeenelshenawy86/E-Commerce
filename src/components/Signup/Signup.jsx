import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

export default function Signup() {
  const navigate = useNavigate()
  const[loading,setLoading]=useState(true)
  const [errorMsg, setErrorMsg] = useState("");

  function sendDataToApi(values) {
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then(({ data }) => {
        if (data.message === 'success') {
           setLoading(false)
          navigate("/signin")
        }
      }).catch((err) => {
        setErrorMsg(err.response.data.message)
      })
  }

  function validationSchema() {
    let schema = new Yup.object({
      name: Yup.string().min(2).max(50).required(),
      email: Yup.string().email().required(),
      password: Yup.string().matches( /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,32}$/,"Length must be more than 8 characters , contains at least 2 capital letter , 1 small letter & a special character").required(),
      rePassword: Yup.string().oneOf([Yup.ref('password')],"Re-password must be matches with password field").required(),
      phone: Yup.string().matches(/^01[0125][0-9]{8}$/,"ex: 01 012345678").required(),
      
    })
    return schema
  }

  let register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone:""
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values)
    }
  })
  return (
    <div>
      <form onSubmit={register.handleSubmit} className='w-50 m-auto my-5 shadow p-4'>
        <h3 className='text-center text-main py-1 fw-semibold'>Register Form</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="UserName">
                <label htmlFor="name">Name:</label>
                <input onBlur={register.handleBlur} onChange={register.handleChange} value={register.values.name} type="text" name="name" className='form-control' id="name" />
                {register.errors.name  && register.touched.name? <div className="alert alert-danger">{register.errors.name}</div> : ""}
              </div>
            </div>
            <div className="col-md-12">
              <div className="UserEmail py-2">
                <label  htmlFor="email">Email: </label>
                <input onBlur={register.handleBlur} onChange={register.handleChange} value={register.values.email} type="email" name="email" className='form-control' id="email" />
                {register.errors.email  && register.touched.email? <div className="alert alert-danger">{register.errors.email}</div> : ""}
              </div>
            </div>
            <div className="col-md-12">
              <div className="UserPassword py-2">
                <label  htmlFor="password">Password:</label>
                <input onBlur={register.handleBlur} onChange={register.handleChange} type="password" name="password" autoComplete='off' className='form-control' id="password" />
                {register.errors.password && register.touched.password ? <div className="alert alert-danger">{register.errors.password}</div> : ""}
              </div>
            </div>
            <div className="col-md-12">
              <div className="UserRePassword py-2">
                <label htmlFor="rePassword">RePassword:</label>
                <input onBlur={register.handleBlur} onChange={register.handleChange} type="password" name="rePassword" autoComplete='off' className='form-control' id="rePassword" />
                {register.errors.rePassword  && register.touched.rePassword? <div className="alert alert-danger">{register.errors.rePassword}</div> : ""}
              </div>
            </div>
            <div className="col-md-12">
              <div className="UserPhone">
                <label  htmlFor="phone">Phone:</label>
                <input onChange={register.handleChange} value={register.values.phone} type="text" name="phone" className='form-control mb-3' id="phone" />
                {register.errors.phone  && register.touched.phone? <div className="alert alert-danger">{register.errors.phone}</div> : ""}
              </div>
            </div>
          </div>
          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
          <button disabled={!(register.dirty && register.isValid)} type="submit" className='btn text-main text-white bg-main d-block ms-auto w-25 fw-bold'>
            {loading?'Register':<i className='fa fa-spinner fa-spin'></i>}
        </button>
        </div>
      </form>
    </div>
  )
}
