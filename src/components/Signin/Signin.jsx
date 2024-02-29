import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { tokenContext } from '../../context/tokenContext';

export default function Signin() {
  const navigate = useNavigate()
  const[loading,setLoading]=useState(true)
  const [errorMsg, setErrorMsg] = useState("");
  const { token, setToken } = useContext(tokenContext)
  function sendDataToApi(values) {
    setLoading(false)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then(({ data }) => {
        if (data.message === 'success') {
          localStorage.setItem('token', data.token);
          setToken(data.user)
          console.log(token);
          navigate("/home")
        }
      }).catch((err) => {
        setErrorMsg(err.response.data.message)
        setLoading(true)
      })
  }

  function validationSchema() {
    let schema = new Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().matches( /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,32}$/,"Length must be more than 8 characters , contains at least 2 capital letter , 1 small letter & a special character").required(),
    })
    return schema
}

  let signin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values)
    }
  })
  return (
    <div>
      <form onSubmit={signin.handleSubmit} className='w-50 m-auto my-5 shadow p-4'>
        <h3 className='text-center text-main py-1 fw-semibold'>signin Form</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="UserEmail py-2">
                <label  htmlFor="email">Email: </label>
                <input onBlur={signin.handleBlur} onChange={signin.handleChange} value={signin.values.email} type="email" name="email" className='form-control' id="email" />
                {signin.errors.email  && signin.touched.email? <div className="alert alert-danger">{signin.errors.email}</div> : ""}
              </div>
            </div>
            <div className="col-md-12">
              <div className="UserPassword py-2">
                <label  htmlFor="password">Password:</label>
                <input onBlur={signin.handleBlur} onChange={signin.handleChange} type="password" name="password" autoComplete='off' className='form-control' id="password" />
                {signin.errors.password && signin.touched.password ? <div className="alert alert-danger">{signin.errors.password}</div> : ""}
              </div>
            </div>
          </div>
          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
          <div className="btn-box d-flex justify-content-between align-items-center ">
            <button disabled={!(signin.dirty && signin.isValid)} type="submit" className='btn text-main text-white bg-main d-block  w-25 fw-bold'>
              {loading?'signin':<i className='fa fa-spinner fa-spin'></i>}
            </button>
          <Link to="/forget-password" className='text-main fw-bold' style={{fontSize:11}}>Forget Password</Link>
         </div>
        </div>
      </form>
    </div>
  )
}
