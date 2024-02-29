import React, { useState } from 'react'
import { baseURL } from '../../utilities/baseUrl';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

export default function UpdateLoggedPassword() {
  const[loading,setLoading]=useState(true)
  const [errorMsg, setErrorMsg] = useState("");
const navigate = useNavigate()
  function changeLoggedPassword(values) {
    setLoading(false)
    axios.put(baseURL + 'users/changeMyPassword', values, {
        headers: {
          token: localStorage.getItem("token"),
        }
    })
      .then(({ data }) => {
        console.log(data);
        if (data.message === 'success') {
          toast.success("Update Password successfully");
           setInterval(() => {
            navigate("/home")
          },2000)
        }
      }).catch((err) => {
        setErrorMsg(err.response.data.message)
        setLoading(true)
      })
  }
    function validationSchema() {
    let schema = new Yup.object({
      currentPassword: Yup.string().matches( /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,32}$/,"Length must be more than 8 characters , contains at least 2 capital letter , 1 small letter & a special character").required(),
      password: Yup.string().matches( /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,32}$/,"Length must be more than 8 characters , contains at least 2 capital letter , 1 small letter & a special character").required(),
      rePassword: Yup.string().oneOf([Yup.ref('password')],"Re-password must be matches with password field").required(),
      
    })
    return schema
  }
    let changeLogPass = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      changeLoggedPassword(values)
    }
  })
  return (
    <div>
      <form onSubmit={changeLogPass.handleSubmit} className='w-50 m-auto my-5 shadow p-4'>
        <h3 className='text-center text-main py-1 fw-semibold'>Change Password</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="UserPassword py-2">
                <label  htmlFor="currentPassword">Current Password:</label>
                <input onBlur={changeLogPass.handleBlur} onChange={changeLogPass.handleChange} type="password" name="currentPassword" autoComplete='off' className='form-control' id="currentPassword" />
                {changeLogPass.errors.password && changeLogPass.touched.password ? <div className="alert alert-danger">{changeLogPass.errors.password}</div> : ""}
              </div>
            </div>
            <div className="col-md-12">
              <div className="UserPassword py-2">
                <label  htmlFor="password">New Password:</label>
                <input onBlur={changeLogPass.handleBlur} onChange={changeLogPass.handleChange} type="password" name="password" autoComplete='off' className='form-control' id="password" />
                {changeLogPass.errors.password && changeLogPass.touched.password ? <div className="alert alert-danger">{changeLogPass.errors.password}</div> : ""}
              </div>
            </div>
            <div className="col-md-12">
              <div className="UserRePassword py-2">
                <label htmlFor="rePassword">RePassword:</label>
                <input onBlur={changeLogPass.handleBlur} onChange={changeLogPass.handleChange} type="password" name="rePassword" autoComplete='off' className='form-control' id="rePassword" />
                {changeLogPass.errors.rePassword  && changeLogPass.touched.rePassword? <div className="alert alert-danger">{changeLogPass.errors.rePassword}</div> : ""}
              </div>
            </div>
          </div>
          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
          <button disabled={!(changeLogPass.dirty && changeLogPass.isValid)} type="submit" className='btn text-main text-white bg-main d-block ms-auto w-25 fw-bold'>
            {loading?'Update':<i className='fa fa-spinner fa-spin'></i>}
          </button>
        </div>
      </form>
    </div>
  )
}

