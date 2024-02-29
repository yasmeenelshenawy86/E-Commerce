import React from 'react'
import { Link } from 'react-router-dom'

export default function Category({ item }) {


  return (
    <>
      <div className="col-md-4">
          <div className="box w-75 d-flex flex-column justify-content-center align-items-center p-4 my-5 ">
            <Link item={item} to={"/all-sub-categories/" + item._id}>
              <div className="catImg border border-1 rounded-2">
                <img src={item.image} className='mx-auto' width={200} height={200} alt={item.name} />
              </div>
              <h5 className='text-main mt-3 fw-bold text-center'>{ item.name}</h5>
            </Link>
          </div>
      </div>
    </>
  )
}
