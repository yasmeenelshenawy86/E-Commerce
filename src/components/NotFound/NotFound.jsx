import React from 'react'
import error from "../../assets/images/error.svg"
export default function NotFound() {
  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
        <img src={error} alt="Error Page" />
    </div>
  )
}
