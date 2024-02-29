import React, { useContext, useEffect, useState  } from 'react'
import { cartContext } from '../../context/cartContext'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet'


export default function Cart() {
  const { getCart,removeItem, setCounter, counter,updateQuantity} = useContext(cartContext)
  const [cartProduct, setCartProduct] = useState([])
  const [cartPrice, setCartPrice] = useState([])
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
 

  useEffect(() => {
    (async () => {
      let data = await getCart()
        setData(data)
        setLoading(false)
      if (data.status === "success") {
           setCartPrice(data.data.totalCartPrice)
           setCartProduct(data.data.products)
      }
    })()
  }, [])


  function removeProductFromCart(productId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
    if (result.isConfirmed) {
      let data = await removeItem(productId)
      console.log(data);
      if (data.status === "success") {
        toast.error("Product deleted  successfully!")
        setCounter(data.numOfCartItems)
        setCartPrice(data.data.totalCartPrice)
        setCartProduct(data.data.products)
        setData(data)
      }
      Swal.fire({
        title: "Deleted!",
        text: "Your product has been deleted.",
        icon: "success"
      });
    }
  });
}

  async function updateProductQun(productId,count) {
    let data = await updateQuantity(productId,count)

    if (data.status === "success") {
      setCartPrice(data.data.totalCartPrice)
      setCartProduct(data.data.products)
      setCounter(data.numOfCartItems)
      setData(data)
      toast.warning("Quantity updated successfully!")
     
    }
  }
  if (loading) return <Loading />
  if (counter === 0) return <div className='my-5 w-50 border border-1 border-success text-main fw-bolder fs-5 text-center rounded mx-auto my-3 py-2'>Your cart is empty</div>

  return (
    <>
    <Helmet>
        <title>Shop Cart</title>
    </Helmet>
      <div className="container bg-main-light my-5 px-4 pt-4 rounded-2 shadow">
        <h5>Shop Cart:</h5>
        <p>Total Cart Price :<span className='fw-bold text-main'> {cartPrice} EGP</span> </p>
        {cartProduct.map(item => {
          return (
            <div className="row border border-bottom-1 border-top-0 border-end-0 border-start-0 my-3 py-3 " key={item.product._id}>
              <div className="col-md-1">
                <div className="imageBox ">
                  <img src={item.product.imageCover} alt={item.product.title} className='w-100' />
                </div>
              </div>
              <div className="col-md-9">
                <div className="itemDesc">
                  <p className='item-title text-start'>{item.product.title} </p>
                  <p className='item-price'>Price : <span className='text-main fw-bold'>{ item.price} EGP</span></p>
                  <button onClick={()=>removeProductFromCart(item.product._id)} className='btn border-0 p-0'><i className="fa-regular fa-trash-can text-main"></i> Remove</button>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center align-items-center">
                  <div className="incrementDecrementItem ">
                    <button onClick={()=>updateProductQun(item.product._id,item.count + 1)} className='btn  rounded-1 p-2 py-0'>+</button>
                    <span className='px-2 fw-semibold'>{item.count}</span>
                    <button disabled={item.count <= 1} onClick={()=>updateProductQun(item.product._id,item.count - 1)} className='btn rounded-1 p-2 py-0'>-</button>
                  </div>
              </div>
            </div>
          )
        })}
        <Link to={`/address/${data.data._id}`} className='btn bg-main mb-3 text-white fw-normal'>Payment <i className="fa-solid fa-arrow-right mx-2"></i> {cartPrice} EGP</Link>
      </div>
    </>
  )
}
