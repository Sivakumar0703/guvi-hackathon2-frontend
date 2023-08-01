import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/layout'
import { ProductContext } from '../../components/context/Context'
import '../cart/mycart.css'
import axios from 'axios'
import dayjs from 'dayjs';
import Payment from '../payment/Payment'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Col, Row } from 'react-bootstrap'

const Mycart = () => {


  const [total, setTotal] = useState();
  let ary = [];
  const [change, setChange] = useState(0)
  const user = JSON.parse(localStorage.getItem('user')); // user data
  const {url , dispatch} = useContext(ProductContext);
  const cartArray = JSON.parse(localStorage.getItem('cartArray'));




  useEffect(() => {

    ary = []
    // const amount = cart?.map((product) => {
      cartArray?.map((product) => {
      ary.push((product.quantity * product.price))
    })


    setTotal(ary.reduce(function (acc, cur) {
      acc = acc + cur;
      return acc;
    }, 0))

  }, [change])

  // monday
 
 // const [cart, setCart] = useState([]);
  const email = user.email;
 // const cartArray = JSON.parse(localStorage.getItem('cartArray'));
 // const[trigger , setTrigger] = useState(false);


  // useEffect(() => {
  //   axios.get(`${url}/users`)
  //     .then(res => {
       

  //       res.data.user.map((data) => {
  //         if (data.email === email) {
  //           setCart(data.cartItem)
  //         }
  //       })

  //     })
  //     .catch(err => console.log(err.message))
  // }, [])

  // useEffect(()=>{
  //   axios.patch(`${url}/cart/updateCart`, { updatedCart:cart, email })
  // },[trigger])


  // remove cart item
  function removeCart(cartItem) {
    let updatedCart = cartArray;
    updatedCart.filter((data, index) => {
      if (data.productId === cartItem.productId) {
        cartArray.splice(index, 1);
        localStorage.setItem('cartArray', JSON.stringify(updatedCart));

       dispatch({
        type: "remove from myCart",
        payload: cartItem
      });
      }
    })
    axios.patch(`${url}/cart/updateCart`, { updatedCart, email })

  }

  // update quantity in cart
  function updateQuantity(cartItem, quantity) {
    const updatedCart = cartArray;
    updatedCart.map((product) => {
      if (product.productId === cartItem.productId) {
        product.quantity = quantity;

        dispatch({
          type:'change quantity',
          payload:{quantity,productId:cartItem.productId}
        })
      }
    })
    
    localStorage.setItem('cartArray',JSON.stringify(updatedCart));
    axios.patch(`${url}/cart/updateCart`, { updatedCart, email })

  }

  // price calculation
  let priceArray = [];
  cartArray?.map((product) => {
    const rentalHour = (Number(product.endTime?.split(':')[0]) - Number(product.startTime?.split(':')[0])) * 60; // converting hours into minutes (per day)
    const rentalMinute = Number(product.endTime?.split(':')[1]) - Number(product.startTime?.split(':')[1]);
    const totalMinute = rentalHour + rentalMinute; // total minutes per day
    const pricePerMinute = (product.price) / 60; // price per minute
    const date1 = dayjs(product.startDate)
    const date2 = dayjs(product.endDate)
    const dateDifference = date2.diff(date1, 'day');
    priceArray.push(pricePerMinute * totalMinute * dateDifference * product.quantity);
  })

  const totalCost = priceArray.reduce((acc, cur) => {
    acc = acc + cur;
    return acc;
  }, 0)


  return (
    <Layout>
      <h1 className='text-center'>My Cart</h1>

      {cartArray?.map((cartitem) => {
        return (
          <div key={cartitem._id} className='bs cart-list m-3'>

            <div className='cart-title'> <h4>{(cartitem?.productName)?.toUpperCase()}</h4> </div>

            <div className='cart-details'>

              <div className='cart-image-div'> <img className="cart-image" src={cartitem?.image} alt={cartitem.productName} /> </div>

              <div>
                <span>Quantity : &nbsp;</span>
                <select value={cartitem?.quantity}

                  onChange={(e) => {
                    updateQuantity(cartitem, e.target.value);
                  }} >
                  {[...Array(10).keys()].map((x) => ( // Array(10) => setting option value to 10
                    <option key={x} value={x + 1} >  {x + 1}   </option>
                  ))}
                </select>
              </div>

              <div> <span>Price/hr :&nbsp;</span>₹ {cartitem.price} &nbsp;

              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>{cartitem?.startDate} / {cartitem?.endDate}</div>
                <div>{cartitem?.startTime} - {cartitem?.endTime}</div>
              </div>

              <div> <button className="cart-button btn" onClick={() => {  setChange(change + 1); removeCart(cartitem) }}> <span> <RemoveCircleIcon style={{ color: 'red' }} /> </span> remove</button>  </div>
            </div>
          </div>
        )
      })}
      <Row className='text-center m-5'>
        <Col>
          <h4>Payment Section</h4>
          <p>Total Amount : {Math.round(totalCost)} </p>
          <Payment price={Math.round(totalCost)} />
        </Col>
      </Row>
    </Layout>
  )
}

export default Mycart










