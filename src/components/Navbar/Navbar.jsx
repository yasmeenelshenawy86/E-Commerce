import React, { useContext, useEffect} from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink} from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import { wishContext } from '../../context/wishlistContext';
// import { jwtDecode } from 'jwt-decode'
import { tokenContext } from '../../context/tokenContext';

export default function Navbar() {
  const { counter,getCart, setCounter} = useContext(cartContext);
  const { wishlistCounter, setWishlistCounter, getWishList } = useContext(wishContext)
  const { token } = useContext(tokenContext)
  console.log(token);
  // const decode = jwtDecode('token')
  useEffect(() => {
    (async() => {
      let data = await getCart()

      if (data.status === "success") {
        setCounter(data.numOfCartItems)
      }
    })()
   },[])

  useEffect(() => {
    (async() => {
      let data = await getWishList()
      if (data.status === "success") {
        setWishlistCounter(data.count)
      }
    })()
   },[])
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid mx-3 px-">
          <NavLink className="navbar-brand" to="/home">
            <img src={logo} alt="Logo" width='100px' />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/products">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/categories">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " to="/brands">Brands</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 pt-3">
              <li className="nav-item">
                <NavLink className="nav-link position-relative" to="/cart">Cart
                  <i className="cartIcon fa-solid fa-cart-shopping px-2"></i>
                  {counter?<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {counter}
                    <span className="visually-hidden">unread messages</span>
                  </span>:""}
                </NavLink>
              </li>
              <li className="nav-item ps-3 ">
                <NavLink className="nav-link position-relative" to="/wishlist">Wishlist
                  <i className="fa-regular fa-heart ps-1"></i>
                  {wishlistCounter?<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlistCounter}
                    <span className="visually-hidden">unread messages</span>
                  </span>:""}
                </NavLink>
              </li>
              <li className="nav-item ps-2">
                <NavLink className="nav-link ps-3" to="/signin">Signout</NavLink>
              </li>

              <div className="btn-group">
                <button type="button" className="btn-profile btn border-0 user-pro text-main dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                <i class="fa-solid fa-user"></i>
                  {/* {token.name.charAt(0)} */}
                </button>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end rounded-4 p-4">
                 <h5 className='mx-auto text-white fw-bold text-center p-1 mb-4  border border-1 bg-main rounded-3'>User Profile</h5>
                  {/* <li className="mx-auto user-pro text-white fw-bold text-center pt-2">{token.name.charAt(0)}</li> */}
                   {/* <p className="mx-auto text-main fw-bold text-center p-3">{token.email}</p> */}
                   {/* <p className="mx-auto text-main fw-bold text-center p-3">{token.name}</p> */}
                  <li><Link className="dropdown-item"  to="/update-logged-password"><i className="fa-solid fa-lock text-main pe-2"></i>Edit Password</Link></li>
                  <li><Link className="dropdown-item" to="/update-logged-data"><i className="fa-solid fa-pen-to-square text-main pe-2 my-3"></i>Edit Personal Information</Link></li>
                  <li><Link className="dropdown-item" to="/allorders"><i className="fa-solid fa-cart-shopping text-main pe-2 my-3"></i>All Orders</Link></li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
