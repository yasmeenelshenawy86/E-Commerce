import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../utilities/baseUrl'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function SpecificSubCat() {
  let x = useParams()
  const [specificSubCat, setSpecificSubCat] = useState([])

  async function getSpecificSubCat() {
    let { data } = await axios.get(baseURL + `subcategories/${x.id}`)
    setSpecificSubCat(data.data)
  }
  useEffect(() => {
    getSpecificSubCat()
  }, [])
  
  console.log(specificSubCat);
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
          <div className="box cursor-pointer border border-1 rounded-2 text-center p-4">
                <p>{ specificSubCat.name}</p>
                {/* <img src={specificSubCat.image} alt={item.name} className='w-75'/> */}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

