import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../utilities/baseUrl'
import Brand from '../Brand/Brand'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet'

export default function Brands() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); 

  async function getBrands() {
    let { data } = await axios.get(baseURL + "brands", {
      params: {
        page: currentPage, 
        limit: itemsPerPage 
      }
    })
    setBrands(data.data)
    setLoading(false)
  }
  useEffect(() => {
    getBrands()
  }, [currentPage])

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setLoading(true);
  }
  
  if(loading) return <Loading />
  return (
    <>
      
      <div className="container">
        <h2 className='text-main fw-bold text-center my-5 bg-main text-white m-auto rounded-2 p-2' style={{width:200}}>Brands</h2>
        <div className="row g-4">
            {brands.map(item => {
              return <Brand key={item._id} item={item} />
          })}
        </div>
        <div className="pagination d-flex justify-content-center align-items-center my-3">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className='page btn me-3'
          >
            Previous
          </button>
          <span className='fw-bold text-main'>{currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={brands.length < itemsPerPage}
            className='page btn btn-muted px-4 ms-3'
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}
