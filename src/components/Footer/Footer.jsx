import React from 'react'
import amazon from '../../assets/images/Amazon_Pay-Logo.wine.png'
import american from "../../assets/images/American-Express-Color.png"
import mastercard from "../../assets/images/mastercard-logo-png-transparent.png"
import paypal from "../../assets/images/Paypal-logo.png"

export default function Footer() {
  return (
    <div className='bg-main-light px-5 py-3 mt-3'>
      <h5>Get the freshCart app </h5>
      <p className='fs-6'>We will send you a link, open it on your phone to download the app</p>
      <div className="container vh-25 ">
        <div className="row">
          <div className="col-md-10 me-auto">
            <form className='form-control bg-transparent border-0'>
              <div className="UserEmail py-2 d-flex">
                <input type="email" name="email" className='form-control w-75' id="email" placeholder='Email...'/>
                <button className='btn text-white bg-main d-block ms-auto fw-bold '>Share App Link</button>
              </div>
            </form>
            <hr/>
          </div>
        
          <div className="col-md-10 mx-auto d-flex justify-content-between">
            <div className="payment">
              <span>Payment Partners</span>
              <img src={amazon} width={60} alt="Amazon Payment" />
              <img src={american} width={60} alt="American Payment" />
              <img src={mastercard} width={40} alt="MasterCard Payment" />
              <img src={paypal} width={60} alt="Paypal Payment" />
            </div>
            <hr/>
          </div>
        </div>
      </div>
    </div>
  )
}
