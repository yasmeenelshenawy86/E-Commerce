import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../utilities/baseUrl'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet'

export default function AllSubCategories() {
  const [subCategory, setSubCategory] = useState([])
  const [loading, setLoading] = useState(true)

  let x = useParams()
  async function getSubCategory() {
    let { data } = await axios.get(baseURL + `categories/${x.id}/subcategories`)
    setSubCategory(data.data)
    setLoading(false)
  }
  useEffect(() => {
    getSubCategory()
  }, [])
   if(loading) return <Loading/>
  return (
    <>
    <Helmet>
      <title>Sub Category</title>
    </Helmet>
      <div className="container">
        <div className="row">
          {subCategory.length === 0 ? 
            <div className='my-5 w-50 border border-1 border-success text-main fw-bolder fs-5 text-center rounded mx-auto my-3 py-2'>
              There are no subcategories for this category
            </div>
           : subCategory.map(item => {
                return (
                  <div key={item._id} className="col-md-4 p-4 my-5  mx-auto">
                    <div className="box cursor-pointer border border-1 rounded-2 text-center d-flex align-items-center justify-content-center" style={{ height: 100 }}>
                      <Link to={'/spe-sub-categories/' + item._id}>
                        <p className='fs-4'>{item.name}</p>
                      </Link>
                    </div>
                  </div>
                )
              })
            }
        </div>
      </div>
    </>
  )
}
