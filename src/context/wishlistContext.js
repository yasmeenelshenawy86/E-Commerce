import { createContext, useState } from "react"
import { baseURL } from "../utilities/baseUrl";
import axios from "axios";

export let wishContext = createContext(0)

async function addToWishList(productId) {
  return axios.post(baseURL + "wishlist",{ productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

async function getWishList() {
  return axios
    .get(baseURL + "wishlist", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

async function removeFromWishList(productId) {
  return axios
    .delete(baseURL + "wishlist/" + productId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

  function updateLocalStorage(productId, add) {
    let storedWishList = localStorage.getItem("wishListProducts");
    if (!storedWishList) {
      storedWishList = JSON.stringify([]);
    }
    const parsedWishList = JSON.parse(storedWishList);
    if (add) {
      localStorage.setItem(
        "wishListProducts",
        JSON.stringify([...parsedWishList, productId])
      );
    } else {
      const updatedWishList = parsedWishList.filter((id) => id !== productId);
      localStorage.setItem("wishListProducts", JSON.stringify(updatedWishList));
    }
  }
export default function WishlistContextProvider({children}) {
  const [wishlistCounter, setWishlistCounter] = useState(0);

  return (
    <wishContext.Provider
      value={{
        wishlistCounter,
        setWishlistCounter,
        addToWishList,
        getWishList,
        removeFromWishList,
        updateLocalStorage,
      }}
    >
      {children}
    </wishContext.Provider>
  );
}