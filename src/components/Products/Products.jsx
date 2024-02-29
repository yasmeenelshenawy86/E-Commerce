import axios from 'axios'
import Loading from"../../components/Loading/Loading";
import Product from '../Product/Product';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet';


export default function Products() {
  // without using react query

  // const [loading, setLoading] = useState(true)
  // const [products, setProducts] = useState([]);

  //  async function getProducts() {
  //    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  //    setProducts(data.data);
  //    setLoading(false)
  //    console.log(data.data);
  //   }
  //   useEffect(() => {
  //     getProducts()
  //   }, [])

  // using react query
  
  function getProducts() {
   return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }
  let { data,isLoading } = useQuery("products", getProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredProducts = data?.data.data.filter(product =>
  product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if(isLoading) return <Loading />
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container mt-5">
        <div>
          <input type="text"
            name="name"
            className="form-control w-75 mx-auto mt-5"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
       </div>
        <div className="row d-flex justify-content-center align-items-center">
          {filteredProducts?.map(item => {
            return <Product item={item} key={item.id}/>
          })}
        </div>
      </div>
    </>
  )
}
