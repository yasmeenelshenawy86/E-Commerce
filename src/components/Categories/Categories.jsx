import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../Loading/Loading';
import { baseURL } from '../../utilities/baseUrl';
import Category from '../Category/Category';
import { Helmet } from 'react-helmet';


export default function Categories() {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(baseURL + 'categories');
    setCategories(data.data);
    setLoading(false)
  }
  useEffect(() => {
    getCategories();
  }, []);

 if(loading) return <Loading/>
  return (
    <>
      <Helmet>
       <title>Categories</title>
      </Helmet>
      <div className="container mt-5">
        <h2 className='text-main fw-bold text-center mt-5 bg-main text-white m-auto rounded-2 p-2 mt-5' style={{width:200}}>Categories</h2>
        <div className="row my-3 justify-content-center align-items-center">
          {categories.map(item => {
            return (
              <Category key={item._id} item={item} />
            );
          })}
        </div>
      </div>
    </>
)
}
