import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../utilities/baseUrl'
import { useParams } from 'react-router-dom'

export default function SpecificBrands() {
  let x = useParams()
  const [specificBrand, setSpecificBrand] = useState([])

  async function getSpecificBrands() {
    let { data } = await axios.get(baseURL + `brands/${ x.id }`)
    setSpecificBrand(data.data)
  }
  useEffect(() => {
  getSpecificBrands()
  }, [])

  console.log(specificBrand);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="brand-box">
              <img src={specificBrand.image} alt={specificBrand.name} className='w-100'/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
