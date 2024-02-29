import React, { useContext, useEffect, useState } from 'react'
import { wishContext } from '../../context/wishlistContext'
import { toast } from 'react-toastify'
import Loading from '../Loading/Loading'
import { cartContext } from '../../context/cartContext'
import { Helmet } from 'react-helmet'

export default function WishList() {
  const { getWishList,removeFromWishList,setWishlistCounter,wishlistCounter,updateLocalStorage} = useContext(wishContext)
  const { addToCart,setCounter} = useContext(cartContext)
  const [wishProduct, setWishProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [setError] = useState(null)

  useEffect(() => {
    (async () => {
      let data = await getWishList()
      if (data.status === "success") {
        setLoading(false)
        setWishProduct(data?.data)
      }
    })()
  }, [])

  async function removeProductFromWishlist(productId) {
    try {
      let data = await removeFromWishList(productId);
      if (data.status === "success") {
        toast.error("Product removed from wishlist");
        setWishProduct(data?.data)
        setWishlistCounter(data.data.length);
        updateLocalStorage(productId, false);
      }
    } catch (error) {
      setError(error.message)
    }
  }
 
async function addProductToCart(productId) {
  try {
    let data = await addToCart(productId)
    if (data.status === "success") {
      setCounter(data.numOfCartItems)
      toast.success("Product added successfully");
      await removeProductFromWishlist(productId);
    }
  } catch (error) {
    console.error( error);
  }
}

  if (loading) return <Loading/>
  if (wishlistCounter === 0) return <div className='my-5 w-50 border border-1 border-success text-main fw-bolder fs-5 text-center rounded mx-auto my-3 py-2'>Your Wishlist is empty</div>
  return (
  <>
   <Helmet>
      <title>Wishlist</title>
   </Helmet>
    {wishProduct.map((item,index) => {
      return <div key={index} className="row border border-bottom-1 border-top-0 border-end-0 border-start-0 my-3 py-3 " >
          <div className="col-md-1">
            <div className="imageBox ">
              <img src={item.imageCover} alt={item.title} className='w-100' />
            </div>
          </div>
          <div className="col-md-9">
            <div className="itemDesc">
              <p className='item-title text-start'>{item.title} </p>
              <p className='item-price'>Price : <span className='text-main fw-bold'>{ item.price} EGP</span></p>
              <button onClick={()=>removeProductFromWishlist(item._id)} className='btn border-0 p-0'><i className="fa-regular fa-trash-can text-main"></i> Remove</button>
              <button  onClick={() => addProductToCart(item._id)} className='btn bg-main ms-5 text-white mt-2 w-25'>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
    })}
  </>
  )
}
