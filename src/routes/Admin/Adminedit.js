import React, { useEffect, useState , useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import Layout from '../../components/layout/layout'
import axios from 'axios'
import Navbar from '../../components/admin navbar/Navbar'
import { ProductContext } from '../../components/context/Context'
import { toast } from 'react-toastify';

const Adminedit = () => {

  let { id } = useParams();
  let productid = { productId: id }
  const [product, setProduct] = useState();
  const [productname, setProductname] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [link, setLink] = useState('')
  const {url } = useContext(ProductContext);
 

  async function savedata() {

    const edited = {
      name: productname,
      description: description,
      type: category,
      price: price,
      image: link
    }

    try {
      await (axios.put(`${url}/products/${id}`, edited));

    } catch (error) {
     // console.log('error in editing product', error)
     toast.error('error in editing product');
    }
    setProductname('')
    setDescription('')
    setCategory('')
    setPrice('')
    setLink('')
  }


  useEffect(() => {

    async function getdatabyid() {
      try {
        const data = await axios.post(`${url}/products/getProductById`, productid).then((res) => (res.data.product))
        setProduct(data)

        setProductname(data.name)
        setDescription(data.description)
        setCategory(data.type)
        setPrice(data.price)
        setLink(data.image)


      } catch (error) {
        console.log(error)
      }
    }
    getdatabyid();

  }, [])


  return (
    <div> <Layout> <Navbar />
      <h1 style={{ textAlign: "center" }}>EDIT PRODUCT</h1>

      <div className='fields' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <TextField className="mb-3" label="Product Name" variant="outlined" color="secondary" value={productname} onChange={(e) => setProductname(e.target.value)} style={{ width: "300px" }} />
        <TextField className="mb-3" label="Product Description" variant="outlined" color="secondary" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "300px" }} />
        <TextField className="mb-3" label="Price/hr" variant="outlined" color="secondary" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "300px" }} />
        <TextField className="mb-3" label="Category" variant="outlined" color="secondary" value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "300px" }} />
        <TextField className="mb-3" label="Image Link" variant="outlined" color="secondary" value={link} onChange={(e) => setLink(e.target.value)} style={{ width: "300px" }} />
        <Button color="secondary" onClick={() => savedata()}>SAVE</Button>
      </div>

    </Layout>  </div>
  )
}

export default Adminedit