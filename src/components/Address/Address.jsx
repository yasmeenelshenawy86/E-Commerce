import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { cartContext } from '../../context/cartContext'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'


export default function Address() {

  const navigate = useNavigate()
  let { id } =useParams()
  const[loading,setLoading]=useState(true)
  let {payment,cashOrder,setCounter,getCart} = useContext(cartContext)
  
 async function sendVisaPayment(values) {
    setLoading(false)
   let data = await payment(id, values)
   if (data.status === "success") {
     setLoading(false)
     toast.success("Payment complete successfully!")
     window.location.href = data.session.url;
   }
  }
 async function sendCashPayment(values) {
    setLoading(false)
   let data = await cashOrder(id, values)
   if (data.status === "success") {
     toast.success("Payment complete successfully!")
     setInterval(() => {
       setCounter(data.numOfCartItems)
          navigate('/allorders')
        },2000)
        getCart()
   }
  }

  let address = useFormik({
    initialValues: {
      details: "",
      phone:"",
      city: ""
    },

    onSubmit: (values) => {
      sendVisaPayment(values)
    }
  })

  let addressForCash = useFormik({
    initialValues: {
      details: "",
      phone:"",
      city: ""
    },

    onSubmit: (values) => {
      sendCashPayment(values)
      
    }
  })
  return (
    <div className='container'>
      <Helmet>
        <title>Address</title>
      </Helmet>
      <Tabs className='mt-5'>
        <TabList className="check-pay text-center">
          <Tab style={{ bottom: -16 }}>Visa <i className="fa-brands fa-cc-visa"></i></Tab>
          <Tab style={{ bottom: -16 }}>Cash <i className="fa-solid fa-money-bill-1-wave"></i></Tab>
        </TabList>

        <TabPanel className=''>
          <div>
             <form onSubmit={address.handleSubmit} className='visa-form w-75 shadow rounded-4  m-auto mb-5 shadow p-4'>
              <h3 className='text-center text-main py-1 fw-semibold'>Address Details</h3>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="UserEmail py-2">
                      <label htmlFor="details" className='text-main fw-bold'>Details: </label>
                      <textarea onBlur={address.handleBlur} onChange={address.handleChange} value={address.values.details} type="text" name="details" className='form-control' id="details" ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="UserPassword py-2">
                      <label className='text-main fw-bold' htmlFor="phone">Phone:</label>
                      <input onBlur={address.handleBlur} onChange={address.handleChange} type="text" name="phone"  className='form-control' id="phone" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="UserPassword py-2">
                      <label className='text-main fw-bold' htmlFor="city">City:</label>
                      <input onBlur={address.handleBlur} onChange={address.handleChange} type="text" name="city"  className='form-control' id="city" />
                    </div>
                  </div>
                </div>
                <div className="payment-box d-flex justify-content-end align-content-center">
                  <button disabled={!(address.dirty && address.isValid)} type="submit" className='btn text-main text-white bg-main d-block  w-25 fw-bold'>
                    {loading?'Visa':<i className='fa fa-spinner fa-spin'></i>}
                  </button>
                </div>
                
              </div>
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <div>
             <form onSubmit={addressForCash.handleSubmit} className='cash-form w-75 m-auto mb-5 shadow p-4'>
              <h3 className='text-center text-main py-1 fw-semibold'>Address Details</h3>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="UserEmail py-2">
                      <label  htmlFor="details">Details: </label>
                      <textarea onBlur={addressForCash.handleBlur} onChange={addressForCash.handleChange} value={addressForCash.values.details} type="text" name="details" className='form-control' id="details" ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="UserPassword py-2">
                      <label  htmlFor="phone">Phone:</label>
                      <input onBlur={addressForCash.handleBlur} onChange={addressForCash.handleChange} type="text" name="phone"  className='form-control' id="phone" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="UserPassword py-2">
                      <label  htmlFor="city">City:</label>
                      <input onBlur={addressForCash.handleBlur} onChange={addressForCash.handleChange} type="text" name="city"  className='form-control' id="city" />
                    </div>
                  </div>
                </div>
                <div className="payment-box d-flex justify-content-end align-content-center">
                <button disabled={!(addressForCash.dirty && addressForCash.isValid)} type="submit" className='btn text-main text-white bg-main d-block ms-auto w-25 fw-bold'>
                  {loading?'Cash':<i className='fa fa-spinner fa-spin'></i>}
                </button>
                </div>
              </div>
            </form>
          </div>
        </TabPanel>
    </Tabs>
    </div>
  )
}
