

//   //  function resetPassword(values) {
//   //   // setLoading(false)
//   //   axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
//   //     .then(({ data }) => {
//   //       // console.log(data);
//   //       if (data.statusMsg === 'success') {
//   //       //   // localStorage.setItem('token', data.token);
//   //         // navigate("/otp")
//   //         console.log(data)
//   //       }
//   //     }).catch((err) => {
//   //       // setErrorMsg(err.response.data.message)
//   //       setErrorMsg(errorMsg)
//   //       // setLoading(true)
//   //     })
//   // }
// //   function validationSchema() {
// //     let schema = new Yup.object({
// //       restCode:Yup.string().min(1).max(1).required()
// //       // email: Yup.string().email().required(),
// //       // password: Yup.string().matches( /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,32}$/,"Length must be more than 8 characters , contains at least 2 capital letter , 1 small letter & a special character").required(),
// //     })
// //     return schema
// // }

//   // let resetPass = useFormik({
//   //   initialValues: {
//   //     resetCode: ""
//   //   },
//   //   onSubmit: (values) => {
//   //     setOtp(values)
//   //     console.log(otp);
//   //     // resetPassword(values)
//   //   }
//   // })
//   //   validationSchema,
//   //   onSubmit: (values) => {
//   //     resetPassword(values)
//   //   }
//   // })

//   // const handleChange = (enteredOtp) => {
//   //   setOtp(enteredOtp);
//   //   console.log('otp', enteredOtp);
//   // };
//   return (
//     <>
//     {/* <div className="otpContainer w-75 mx-auto  my-5 bg-warning border border-1 bg-border-main">
//      <OtpInput value={otp} onSubmit={resetPass.handleSubmit} onChange={resetPass.handleChange} numInputs={6}  className=' ms-3' inputStyle={{width:40,height:40}}/>
//     </div> */}

//      <OtpInput
//       value={otp}
//       onChange={setOtp}
//       numInputs={6}
//       renderSeparator={<span>-</span>}
//       renderInput={(props) => <input {...props} />}
//     />

//       {/* <form onSubmit={resetPass.handleSubmit} className='w-50 m-auto my-5 shadow p-4'>
//         <h3 className='text-center text-main py-1 fw-semibold'>Reset Password Code</h3>
//         <div className="container">
//           <fieldset>
//             <div className="row justify-content-center align-items-center my-3">
//               <div className="col-md-2">
//                 <div className="digit-1">
//                   <input onBlur={resetPass.handleBlur} onChange={resetPass.handleChange} value={resetPass.values.resetCode} type="text" name="resetCode" className='form-control text-center' id="number-1" />
//                 </div>
//               </div>
//               <div className="col-md-2">
//                 <div className="digit-2">
//                   <input onBlur={resetPass.handleBlur} onChange={resetPass.handleChange} value={resetPass.values.resetCode} type="text" name="resetCode" className='form-control text-center' id="number-2" />
//                 </div>
//               </div>
//               <div className="col-md-2">
//                 <div className="digit-3">
//                   <input onBlur={resetPass.handleBlur} onChange={resetPass.handleChange} value={resetPass.values.resetCode} type="text" name="resetCode" className='form-control text-center' id="number-3" />
//                 </div>
//               </div>
//               <div className="col-md-2">
//                 <div className="digit-4">
//                   <input onBlur={resetPass.handleBlur} onChange={resetPass.handleChange} value={resetPass.values.resetCode} type="text" name="resetCode" className='form-control text-center' id="number-4" />
//                 </div>
//               </div>
//               <div className="col-md-2">
//                 <div className="digit-5">
//                   <input onBlur={resetPass.handleBlur} onChange={resetPass.handleChange} value={resetPass.values.resetCode} type="text" name="resetCode" className='form-control text-center' id="number-5" />
//                 </div>
//               </div>
//               <div className="col-md-2">
//                 <div className="digit-6">
//                   <input onBlur={resetPass.handleBlur} onChange={resetPass.handleChange} value={resetPass.values.resetCode} type="text" name="resetCode" className='form-control text-center' id="number-6" />
//                 </div>
//               </div>
//             </div>
//           </fieldset>
//         </div>
//       </form> */}
//    </>
//   )
// }

/////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react'
// import "./otbCode.css"
// import axios from 'axios'
// export default function OTPCode() {
//   const [errorMsg, setErrorMsg] = useState("");
//   const [resetCode, setRestCode] = useState(new Array(6).fill(''))

//   function handleChange(e,index) {
//     if (isNaN(e.target.value)) return false
//     setRestCode([...resetCode.map((data,indx)=>(indx===index?e.target.value:data))])
//     if (e.target.value && e.target.nextSibling) {
//       e.target.nextSibling.focus()
//     }
//   }

//     function confirmCode(resetCode) {
//     axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', resetCode)
//       .then(({ data }) => {
//         console.log(data);
//         if (data.statusMsg === 'success') {
//         //   // localStorage.setItem('token', data.token);
//           // navigate("/otp-code")
//           console.log(data)
//         }
//       }).catch((err) => {
//         setErrorMsg(err.response.data.message)
//         // setLoading(true)
//       })
//   }

//   return (
//     <div className='otp-box'>
//       {resetCode.map((data, i) => {
//         return <input key={i} maxLength={1} type='text' value={data} onChange={(e)=>handleChange(e,i)}/>
//       })}
//       <button onClick={() =>  confirmCode(resetCode.join('')) } className='btn bg-main text-white'>Send</button>
//     </div>
//   )
// }
/////////////////////////////////////////////////////////////

import axios from 'axios'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import * as Yup from "yup";

export default function OTPCode() {
  // const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate()
    const[loading,setLoading]=useState(true)
  // const navigate = useNavigate()
  // const[loading,setLoading]=useState(true)
  // const [errorMsg, setErrorMsg] = useState("");
  
  function confirmCode(values) {
    setLoading(false)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
      .then((data ) => {
        console.log(data);
        if (data.status === 200) {
          navigate("/new-password")
            console.log(data)
        }
      })
      .catch((err) => {
        // setErrorMsg(err.response.data.message)
        setLoading(true)
      })
  }

//   function validationSchema() {
//     let schema = new Yup.object({
//       resetCode: Yup.string().matches(/^[0-9]{6}$/).max(6).required(),
//     })
//     return schema
// }

  let sendCode = useFormik({
    initialValues: {
      resetCode: "",
    },
    // validationSchema,
    onSubmit: (values) => {
      confirmCode(values)
    }
  })


  return (
    <div>

        {/* <div className='otp-box'>
      {resetCode.map((data, i) => {
       return <input key={i} maxLength={1} type='text' value={data} onChange={(e)=>handleChange(e,i)}/>
      })}
       <button onClick={() =>  confirmCode(resetCode.join('')) } className='btn bg-main text-white'>Send</button>
   </div> */}

      <form onSubmit={sendCode.handleSubmit} className='w-50 m-auto my-5 shadow p-4'>
        <h3 className='text-center text-main py-1 fw-semibold'>Confirm code</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="UserEmail py-2">
                <input onBlur={sendCode.handleBlur} onChange={sendCode.handleChange}  type="text" name="resetCode" className='form-control' id="resetCode" />
                {/* {sendCode.errors.resetCode ? <div className="alert alert-danger">{sendCode.errors.resetCode}</div> : ""} */}
              </div>
            </div>
          </div>
          {/* {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""} */}
          <div className="btn-box d-flex justify-content-between align-items-center ">
            <button disabled={!(sendCode.dirty && sendCode.isValid)} type="submit" className='btn text-main text-white bg-main d-block  w-25 fw-bold'>
              {loading?'Confirm Code':<i className='fa fa-spinner fa-spin'></i>}
            </button>
         </div>
        </div>
      </form>
    </div>
  )
}
