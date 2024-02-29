import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Offline } from "react-detect-offline";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import WishList from "./components/WishList/WishList";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./context/cartContext";
import { ToastContainer } from "react-toastify";
import SpecificBrands from "./components/SpecificBrand/SpecificBrands";
import AllSubCategories from "./components/AllSubCategories/AllSubCategories";
import Address from "./components/Address/Address";
import AllOrders from "./components/AllOrders/AllOrders";
import ForgetPass from "./components/ForgetPass/ForgetPass";

import SpecificSubCat from "./components/SpecificSubCat/SpecificSubCat";
import WishlistContextProvider from "./context/wishlistContext";
import OTPCode from "./components/OTPCode/OTPCode";
import NewPassword from "./components/NewPassword/NewPassword";
import UpdateLoggedPassword from "./components/UpdateLoggedPassword/UpdateLoggedPassword";
import UpdateLoggedData from "./components/UpdateLoggedUserData/UpdateLoggedUserData";
import TokenContextProvider from "./context/tokenContext";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/", element: <MainLayout />, children: [
        { path: "/", element: (<ProtectedRoutes><Home /></ProtectedRoutes>)},
        { path: "home", element: (<ProtectedRoutes><Home /></ProtectedRoutes>)},
        { path: "products",element: (<ProtectedRoutes><Products /></ProtectedRoutes>)},
        { path: "product-details/:id", element: (<ProtectedRoutes><ProductDetails /></ProtectedRoutes>) },
        { path: "categories", element: (<ProtectedRoutes><Categories /></ProtectedRoutes>) },
        { path: "all-sub-categories/:id", element: (<ProtectedRoutes><AllSubCategories /></ProtectedRoutes>) },
        { path: "spe-sub-categories/:id",element:(<ProtectedRoutes><SpecificSubCat/></ProtectedRoutes>)}, 
        { path: "brands",element: (<ProtectedRoutes><Brands /></ProtectedRoutes>)},
        { path: "specific-brand/:id",element: (<ProtectedRoutes><SpecificBrands /></ProtectedRoutes>)},
        { path: "update-logged-password",element: (<ProtectedRoutes><UpdateLoggedPassword/></ProtectedRoutes>)},
        { path: "update-logged-data",element: (<ProtectedRoutes><UpdateLoggedData/></ProtectedRoutes>)},

        { path: "cart",element: (<ProtectedRoutes><Cart /></ProtectedRoutes>)},
        { path: "wishlist",element: (<ProtectedRoutes><WishList /></ProtectedRoutes>)},
        { path: "address/:id",element: (<ProtectedRoutes><Address/></ProtectedRoutes>)},
        { path: "allorders",element: (<ProtectedRoutes><AllOrders/></ProtectedRoutes>)},
        { path: "*", element: <NotFound /> }]
        
      },
      {path: "/",element: <AuthLayout />,children: [
        { path: "signin", element: <Signin /> },
        { path: "signup", element: <Signup /> },
        { path: "forget-password",element: (<ProtectedRoutes><ForgetPass /></ProtectedRoutes>)},
        { path: "otp-code",element: (<ProtectedRoutes><OTPCode/></ProtectedRoutes>)},
        { path: "new-password",element: (<ProtectedRoutes><NewPassword/></ProtectedRoutes>)},
      ]
    }
  ]);
  return (
    <>
      <ToastContainer
        theme="colored"
        autoClose={1000}
        closeOnClick
      ></ToastContainer>
      <TokenContextProvider>

        <CartContextProvider>
          
          <WishlistContextProvider>

            <RouterProvider router={router} />
            
          </WishlistContextProvider>
          
        </CartContextProvider>
        
      </TokenContextProvider>
        <Offline>
          <div className="offline">You Are offline Now!</div>
        </Offline>
    </>
  );
}
