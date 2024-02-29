import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../utilities/baseUrl';
import { compareDesc, format } from "date-fns";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function AllOrders() {
  const {id} = jwtDecode(localStorage.getItem('token'))
  const [orders, setOrders] = useState([])

  async function getOrders() {
    let { data } = await axios.get(baseURL + 'orders/user/' + id)
      data.sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)));
    setOrders(data);
  }
  useEffect(() => {
    getOrders()
  }, [])
  return (
    <>
      <Helmet>
        <title>All Orders</title>
      </Helmet>
      <div className="container">
        {orders.map(item => {
          return<div key={item.id} className="row">
            <div className="col-md-12">
              <div className="order shadow rounded py-4 my-5 px-4">
                <div className='d-flex justify-content-between algin-item-center'>
                  <h3 className='me-2 fw-bold text-main'>#{item.id}</h3>
                  <h6 className='text-main'>{format(new Date(item.createdAt), 'MMMM dd, yyyy')}</h6>
                </div>
                  <p>You have Ordered<span className='text-main mx-3 fw-bolder'>{item.cartItems.length}</span><span>
                    {item.cartItems.length > 1 ? 'Items' : item.cartItems.length === 1 ? 'Item' : ''}</span>
                  </p>
                  {item.cartItems.map((item) => {
                    return <Link to={'/product-details/' + item.product._id}><img key={item._id} src={item.product.imageCover} className='img-thumbnail m-1' width={100} alt="Cart Item"/></Link>
                  })}
                  <p>Shipping Price : <span className='text-main mx-3 fw-bolder'>{item.shippingPrice}</span></p>
                  <p>Paid :{item.isPaid ?<i className="fa-regular fa-circle-check text-main mx-2"></i>:<i className="fa-regular fa-circle-xmark text-danger mx-2"></i>}</p>
                  <p>Payment Method : <span className='text-main mx-3 fw-bolder'>{ item.paymentMethodType}</span></p>
                  <hr />
                  <p>Total Price : <span className='text-main mx-3 fw-bolder'>{item.totalOrderPrice}</span></p>
              </div>
            </div>
          </div>
        })}
      </div>
    </>
  )
}
