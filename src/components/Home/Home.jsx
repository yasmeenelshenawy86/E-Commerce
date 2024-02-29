import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import MainSlider from '../MainSlider/MainSlider';
import Loading from '../Loading/Loading';
import Products from '../Products/Products';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Home() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  async function getCategories() {
   let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    setCategories(data.data)
    setLoading(false)
  }
  useEffect(() => {
    getCategories()
  }, [])

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1500
  };

  if(loading) return <Loading/>
  return (
    <div className='mt-5'>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <div className='my-3 container'>
        <h4 className='text-main my-4'>Show Popular Categories</h4>
        <Slider {...settings}>
          {categories.map(item => {
            return<Link to={"/all-sub-categories/" + item._id}  key={item._id}>
                <div className='px-1'>
                  <img src={item.image} alt="categories" width={200} height={200} />
                  <h4 className='fs-5 pt-1'>{item.name}</h4>
                </div>
              </Link>
          })}
        </Slider>
      </div>
      <Products/>
    </div>
  )
}
