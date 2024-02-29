import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link} from 'react-router-dom';
import * as Yup from "yup";
// import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

export default function ForgetPass() {
  const [loading, setLoading] = useState(true)
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const decode = jwtDecode(localStorage.getItem('token'))
  const [errorMsg, setErrorMsg] = useState("");
  function userNewPassword(values) {
    setLoading(false)
    axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
         .then((data ) => {
        console.log(data);
        if (data.status === 200) {
          localStorage.setItem('token', data.token);
        }
      }).catch((err) => {
        setErrorMsg(err.response.data.message)
        setLoading(true)
      })
  }

  function validationSchema() {
    let schema = new Yup.object({
      email: Yup.string().email().required(),
      newPassword: Yup.string().matches( /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,32}$/,"Length must be more than 8 characters , contains at least 2 capital letter , 1 small letter & a special character").required(),
    })
    return schema
}

  let newUserInfo = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      userNewPassword(values)
    }
  })
  return (
    <div>
        <form onSubmit={newUserInfo.handleSubmit} className='w-50 m-auto my-5 shadow p-4'>
        <h3 className='text-center text-main py-1 fw-semibold'>New Password</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="UserEmail py-2">
                <label  htmlFor="email">Email: </label>
                <input onBlur={newUserInfo.handleBlur} onChange={newUserInfo.handleChange} value={newUserInfo.values.email} type="email" name="email" className='form-control' id="email" />
                {newUserInfo.errors.email  && newUserInfo.touched.email? <div className="alert alert-danger">{newUserInfo.errors.email}</div> : ""}
              </div>
            </div>
            <div className="col-md-12">
              <div className="UserPassword py-2">
                <label  htmlFor="newPassword">New Password:</label>
                <input onBlur={newUserInfo.handleBlur} onChange={newUserInfo.handleChange} type="password" name="newPassword" autoComplete='off' className='form-control' id="newPassword" />
                {newUserInfo.errors.newPassword && newUserInfo.touched.newPassword ? <div className="alert alert-danger">{newUserInfo.errors.newPassword}</div> : ""}
              </div>
            </div>
          </div>
          {/* {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""} */}
          <div className="btn-box d-flex justify-content-between align-items-center ">
          <button onClick={handleShow} disabled={!(newUserInfo.dirty && newUserInfo.isValid)} type="submit" className='btn text-main text-white bg-main d-block  w-25 fw-bold'>
            {loading ? 'Confirm' : <i className='fa fa-spinner fa-spin'></i>}
          </button>
         </div>
        </div>
      </form>
      <Modal
        show={show}
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header ></Modal.Header> */}
        <Modal.Body className='d-flex flex-column justify-content-center align-items-center p-4'>
          <p className='text-center' >Congratulations <span className='text-main'>{decode.name}</span></p>
          <p className='text-center'>You Can Signin Now With Your New Password </p>
        </Modal.Body>
        <Modal.Footer>
          {/* <button  variant="secondary"  className='bg-main' onClick={handleClose}>
            <Link to='/signin' >Close</Link>
          </button> */}
          <Link to='/signin' className='text-main fw-bold' style={{fontSize:11}}>Signin</Link>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
