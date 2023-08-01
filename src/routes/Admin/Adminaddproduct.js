import React, { useContext, useState } from 'react'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import Layout from '../../components/layout/layout'
import Navbar from '../../components/admin navbar/Navbar'
import axios from 'axios'
import { ProductContext, ProductState } from '../../components/context/Context'

const Adminaddproduct = () => {

  const [productname, setProductname] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [link, setLink] = useState('')
  const {url} = useContext(ProductContext);

  async function savedata() {

    const newproduct = {
      name: productname,
      description: description,
      type: category,
      price: price,
      image: link
    }

    try {
      await (axios.post(`${url}/products/addProducts`, newproduct));

    } catch (error) {
      console.log('error in adding new product', error)
    }

    setProductname('')
    setDescription('')
    setCategory('')
    setPrice('')
    setLink('')

  }



  return (

    <div> <Layout> <Navbar />
      <h1 style={{ textAlign: "center" }}>ADD NEW PRODUCT</h1>

      <div className='fields' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <TextField className="mb-3" label="Product Name" variant="outlined" color="secondary" value={productname} onChange={(e) => setProductname(e.target.value)} style={{ width: "300px" }} />
        <TextField className="mb-3" label="Product Description" variant="outlined" color="secondary" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "300px" }} />
        <TextField className="mb-3" label="Price/hr" variant="outlined" color="secondary" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "300px" }} />
        <TextField className="mb-3" label="Category" variant="outlined" color="secondary" value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "300px" }} />
        <TextField className="mb-3" label="Image Link" variant="outlined" color="secondary" value={link} onChange={(e) => setLink(e.target.value)} style={{ width: "300px" }} />
        <Button className="mb-5" color="secondary" onClick={() => savedata()}>SAVE</Button>
      </div>

    </Layout>  </div>
  )
}

export default Adminaddproduct