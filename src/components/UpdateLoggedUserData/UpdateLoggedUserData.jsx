import React, { useState } from 'react'
import { baseURL } from '../../utilities/baseUrl';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

export default function UpdateLoggedData() {
  const[loading,setLoading]=useState(true)
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate()

  function changeLoggedData(values) {
    setLoading(false)
    axios.put(baseURL + 'users/updateMe/', values, {
        headers: {
          token: localStorage.getItem("token"),
        }
    })
      .then(({ data }) => {
        console.log(data);
        if (data.message === 'success') {
          toast.success("Update Information successfully");
          navigate("/home")
        }
      }).catch((err) => {
        setErrorMsg(err.response.data.message)
        setLoading(true)
      })
  }
    function validationSchema() {
    let schema = new Yup.object({
      name: Yup.string().min(2).max(50).required(),
      email: Yup.string().email().required(),
      phone: Yup.string().matches(/^01[0125][0-9]{8}$/,"ex: 01 012345678").required(),
    })
    return schema
  }
    let changeLogData = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      changeLoggedData(values)
    }
  })
  return (
    <>
         <form onSubmit={changeLogData.handleSubmit} className='w-50 m-auto my-5 shadow p-4'>
        <h3 className='text-center text-main py-1 fw-semibold'>Change Personal Information</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="UserName">
                <label htmlFor="name">Name:</label>
                <input onBlur={changeLogData.handleBlur} onChange={changeLogData.handleChange} value={changeLogData.values.name} type="text" name="name" className='form-control' id="name" />
                {changeLogData.errors.name  && changeLogData.touched.name? <div className="alert alert-danger">{changeLogData.errors.name}</div> : ""}
              </div>
            </div>
            <div className="col-md-12">
              <div className="UserEmail py-2">
                <label  htmlFor="email">Email: </label>
                <input onBlur={changeLogData.handleBlur} onChange={changeLogData.handleChange} value={changeLogData.values.email} type="email" name="email" className='form-control' id="email" />
                {changeLogData.errors.email  && changeLogData.touched.email? <div className="alert alert-danger">{changeLogData.errors.email}</div> : ""}
              </div>
            </div>
            <div className="col-md-12">
              <div className="UserPhone">
                <label  htmlFor="phone">Phone:</label>
                <input onChange={changeLogData.handleChange} value={changeLogData.values.phone} type="text" name="phone" className='form-control mb-3' id="phone" />
                {changeLogData.errors.phone  && changeLogData.touched.phone? <div className="alert alert-danger">{changeLogData.errors.phone}</div> : ""}
              </div>
            </div>
          </div>
          {errorMsg ? <div className="alert alert-danger">{"email already exist"}</div> : ""}
          <button disabled={!(changeLogData.dirty && changeLogData.isValid)} type="submit" className='btn text-main text-white bg-main d-block ms-auto w-25 fw-bold'>
            {loading?'Update':<i className='fa fa-spinner fa-spin'></i>}
        </button>
        </div>
      </form>
    </>
  )
}

