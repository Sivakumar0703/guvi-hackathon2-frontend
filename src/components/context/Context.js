
import React, { createContext, useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import { Reducer } from './Reducer';
import { toast } from 'react-toastify';


export const ProductContext = createContext();

const MyContext = ({ children }) => {

  const [products, setProducts] = useState();
  const url = 'https://online-rental-backend-webcode2.onrender.com';

  // use reducer
  // useReducer(reducer , action) | action is an obj here {product:product , cart:[]}
  const [state, dispatch] = useReducer(Reducer, {
    products: products,
    cart: JSON.parse(localStorage.getItem('cartArray'))
  })


  useEffect(() => {

    async function getproducts() {
      try {
        const items = (await axios.get(`${url}/products`)).data
        setProducts(items.products)
        
        dispatch({ type: 'data', payload: items.products })
      } catch (error) {
        toast.error('Fetching product data')
      }
    }
    getproducts();

  }, [])


  return (


    <ProductContext.Provider value={{ state, dispatch, products, url }} >

      {children}

    </ProductContext.Provider>

  )
}

export default MyContext




