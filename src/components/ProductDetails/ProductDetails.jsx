import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { cartContext } from '../../context/cartContext';
import { toast } from 'react-toastify'
import './styleImages.css'
import Slider from "react-slick";
import { wishContext } from '../../context/wishlistContext';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  let {  setCounter, addToCart } = useContext(cartContext)
  const { setWishlistCounter,addToWishList,removeFromWishList,updateLocalStorage } = useContext(wishContext)
  let x = useParams();
  const [productId, setProductId] = useState({});
  const [loading, setLoading] = useState(true);
  const [ isInWishList, setIsInWishList ] = useState(false)
  

  useEffect(() => {
    async function getProductDetails() {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`);
      setProductId(data.data);
      // console.log(data.data);
      setLoading(false);
    }
      getProductDetails()
  }, [x.id])
  
  
 useEffect(() => {
    const storedWishList = localStorage.getItem('wishListProducts');
    if (storedWishList) {
      const parsedWishList = JSON.parse(storedWishList);
      setIsInWishList(parsedWishList.includes(x.id));
    }
  }, [x.id]);
  const [btnLoading, setBtnLoading] = useState(true)
  
  async function addProductToCart(productId) {
    setBtnLoading(false)
    let data = await addToCart(productId)
    if (data.status === "success") {
      setBtnLoading(true)
      setCounter(data.numOfCartItems)
      toast.success("Product added successfully");
    }
  }
 async function toggleWishlist(productId) {
    if (isInWishList) {
      let data = await removeFromWishList(productId);
      if (data.status === "success") {
        toast.error("Product removed from wishlist");
        setIsInWishList(false);
        setWishlistCounter(data.data.length);
        updateLocalStorage(productId, false);
      }
    } else {
      let data = await addToWishList(productId);
      if (data.status === "success") {
        toast.success("Product added to wishlist");
        setIsInWishList(true);
        setWishlistCounter(data.data.length);
         updateLocalStorage(productId, true);
      }
    }
}

  if(loading) return <Loading/>
  return (
    <>
    <Helmet>
      <title>{productId.title}</title>
    </Helmet>
    <div className="container my-4">
        <div className="row">
          <div className="col-md-3">
          <div className="productImg">
            <Slider {...settings} className='mb-3'>
              {productId.images.map((item) => {
                return<div  key={productId.id}>
                      <img src={item} className='w-100' alt="product" />
                    </div>
                  })}
            </Slider>
            </div>
        </div>
        <div className="col-md-9">
          <div className="productInfo py-4 d-flex flex-column justify-content-between">
            <div className="brandImg d-flex align-items-center">
            <h6 className='my-auto'>Brand :</h6>
              <img src={productId.brand.image} width={100} alt={productId.brand.name} />
            </div>
            <p className='fs-6 text-muted fw-semibold'>{productId.title}</p>
            <p className='productDesc fs-6 text-muted fw-semibold'>{productId.description}</p>
            <p className='fs-6 text-main'>{productId.category.name}</p>
          </div>
          <div className="price d-flex justify-content-between align-items-center px-3">
            <span className='fw-bold fs-5'>{productId.price} EGP</span>
            <span className='text-muted fw-bold fs-6'><i className='fa fa-star rating-color pe-1'></i>{productId.ratingsAverage}</span>
          </div>
          <div className="add m-auto px-5 d-flex justify-content-center align-items-center">
            <button disabled={!btnLoading} onClick={() => addProductToCart(productId._id)}  className='btn bg-main text-white w-25 mt-2 mx-2'> 
              {btnLoading ? "Add to Cart" : "Loading..."}
            </button>
            <i onClick={() => toggleWishlist(x.id)} className={`fa ${isInWishList ? 'fa-solid' : 'fa-regular'} text-danger fa-heart ps-1 fs-4 cursor-pointer`}></i>
          </div>
        </div>
        </div>
    </div>
    </>
  )
}
