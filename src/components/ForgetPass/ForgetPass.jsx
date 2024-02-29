import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";

export default function ForgetPass() {
  const navigate = useNavigate()
  const[loading,setLoading]=useState(true)
  const [errorMsg, setErrorMsg] = useState("");
  
  function sendDataToApi(values) {
    setLoading(false)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
      .then(({ data }) => {
        if (data.statusMsg === 'success') {
          setLoading(false)
          navigate("/otp-code")
        }
      }).catch((err) => {
        setErrorMsg(err.response.data.message)
        setLoading(true)
      })
  }

  function validationSchema() {
    let schema = new Yup.object({
      email: Yup.string().email("Invalid").required(),
    })
    return schema
}

  let sendEmail = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToApi(values)
    }
  })
  return (
    <div>
      <form onSubmit={sendEmail.handleSubmit} className='w-50 m-auto my-5 shadow p-4'>
        <h3 className='text-center text-main py-1 fw-semibold'>Forget Password</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="UserEmail py-2">
                <label  htmlFor="email">Email: </label>
                <input onBlur={sendEmail.handleBlur} onChange={sendEmail.handleChange} value={sendEmail.values.email} type="email" name="email" className='form-control' id="email" />
                {sendEmail.errors.email  && sendEmail.touched.email? <div className="alert alert-danger">{sendEmail.errors.email}</div> : ""}
              </div>
            </div>
          </div>
          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
          <div className="btn-box d-flex justify-content-between align-items-center ">
            <button disabled={!(sendEmail.dirty && sendEmail.isValid)} type="submit" className='btn text-main text-white bg-main d-block  w-25 fw-bold'>
              {loading?'send email':<i className='fa fa-spinner fa-spin'></i>}
            </button>
          <Link to="/signup" className='text-main fw-bold' style={{fontSize:11}}>Signup</Link>
         </div>
        </div>
      </form>
    </div>
  )
}
