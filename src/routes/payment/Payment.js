import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductContext } from '../../components/context/Context';

const Payment = ({ price }) => {

  const amount = price;
  const [orderId, setOrderId] = useState();
  const cartItems = JSON.parse(localStorage.getItem('cartArray'));
  const userName = JSON.parse(localStorage.getItem('user'))?.userName;
  const email = JSON.parse(localStorage.getItem('user'))?.email;
  const navigate = useNavigate();
  const {url} = useContext(ProductContext);



  useEffect(() => {
    axios.post(`${url}/razor/order`, { amount: amount })
      .then(res => setOrderId(res.data.orderId))
      .catch(err => console.log(err))
  }, [])

  function payment(orderId, totalAmount) {
    const updatedCart = []; // cart reset

    axios.post(`${url}/payment/cartPayment`, {
      orderId,
      totalAmount,
      cartItems,
      userName,
      email
    })
      .then(res => {
        toast.success('Payment Successful')
        localStorage.setItem('cartArray', JSON.stringify(updatedCart));
        const user = JSON.parse(localStorage.getItem('user'));
        user.cartItem = [];
        localStorage.setItem('user', JSON.stringify(user));
        axios.patch(`${url}/cart/updateCart`, { updatedCart, email }) // reset cartitem in dataBase
        navigate('/')
      })
      .catch(err => console.log(err))
  }


  const handleSubmit = () => {
    //   e.preventDefault();
    var options = {
      key: "rzp_test_f3Zt6s7fSoiZSu",
      secret: "ObqLEeSpRqphtxBZI88ju0E7",
      amount: price * 100,
      currency: "INR",
      name: "ONLINE RENTAL",
      order_id: orderId,
      handler: function (response) {
        if (response.razorpay_signature) {
          const totalAmount = price;
          payment(orderId, totalAmount);
        } else {
          toast.error('payment failed');
        }
        //console.log("Payment_ID : ", response.razorpay_payment_id, '|', 'order_id : ', response.razorpay_order_id, '|', 'signature : ', response.razorpay_signature);
      },
      prefill: {
        name: JSON.parse(localStorage.getItem('user')).userName, //your customer's name
        email: JSON.parse(localStorage.getItem('user')).email,
      },
      notes: {
        address: "online rental office address" // company address
      },
      theme: {
        color: "#3399cc"
      }
    };

    var pay = new window.Razorpay(options);
    pay.on('payment.failed', function (response) { // if payment failed
      toast.error('Payment failed.Please try again later');
    });
    pay.open()

  }


  return (
    <div>
      <button className='btn btn-primary' onClick={handleSubmit}>Pay Now &nbsp; <span><i class="bi bi-credit-card-2-back"></i></span></button>
    </div>
  )
}

export default Payment