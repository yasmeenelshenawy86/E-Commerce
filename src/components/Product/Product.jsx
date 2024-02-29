import React, { useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify'
import { wishContext } from '../../context/wishlistContext'

export default function Product({ item }) {
  const { setCounter, addToCart } = useContext(cartContext)
  const { setWishlistCounter,addToWishList,removeFromWishList,updateLocalStorage } = useContext(wishContext)
  const [btnLoading, setBtnLoading] = useState(true)
  const [ isInWishList, setIsInWishList ] = useState(false)
  

 useEffect(() => {
  const storedWishList = localStorage.getItem('wishListProducts');
  if (storedWishList) {
    const parsedWishList = JSON.parse(storedWishList);
    setIsInWishList(parsedWishList.includes(item._id));
  }
 }, [item._id]);

  async function addProductToCart(productId) {
    setBtnLoading(false)
    let data = await addToCart(productId)
    console.log(data);
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
  return (
    <>
    <div className="col-md-3">
      <div className="product rounded-3 p-3 mt-4 cursor-pointer">
        <Link to={'/product-details/' + item._id}>
          <img src={item.imageCover} alt="Products" className='w-100' />
          <p className='text-main fw-bold'>{item.category.name}</p>
          <h6 className='fw-bold'>{item.title.split(' ').slice(0,2).join(' ')}</h6>
          <div className="price d-flex justify-content-between align-items-center">
            <span className='fw-bold' style={{fontSize:13}}>{item.price} EGP</span>
            <span className='text-muted fw-bold'><i className='fa fa-star rating-color pe-1'></i>{item.ratingsAverage}</span>
          </div>
        </Link>
        <div className="addBtn d-flex justify-content-center align-items-center">
          <button disabled={!btnLoading} onClick={() => addProductToCart(item._id)} className='btn bg-main text-white w-75 mt-2'>
          {btnLoading ? "Add to Cart" : "Loading..."}
          </button>
          <i onClick={() => toggleWishlist(item._id)} className={`fa ${isInWishList ? 'fa-solid' : 'fa-regular'} text-danger fa-heart ps-3 fs-4`}></i>
        </div>
      </div>
    </div>
    </>
  )
}
