import axios from 'axios';
import React, { useEffect, useState , useContext } from 'react'
import Layout from '../../components/layout/layout';
import dayjs from 'dayjs';
import '../profile/profile.css';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { ProductContext } from '../../components/context/Context';
import { toast } from 'react-toastify';


export function Mycart() {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const {url} = useContext(ProductContext);


  useEffect(() => {
    async function cart() {
      try {
        const cart = await axios.get(`${url}/payment`)
          .then(res => setCart(res.data.payment))

      } catch (error) {
       toast.error('Server Error, try again later')
      }
    }
    cart();

  }, [])

  return (

    <>
      {cart.map(item => {
        if (item.email === user?.email) {
          const product = item.cartItems.map((cartItem) => cartItem.productName, ',')
          return (
            <div key={item._id} className='bs mr-2 p-2 mb-2 paid-detail'>
              <p>Order ID : {item._id}</p>
              <p>Products : {product}</p>
              <p>No.of.Products : {product.length}</p>
              <p><span>Paid on : {dayjs(item.createdOn).format('DD-MM-YYYY')}</span> </p>
              <p>Amount Paid : ₹ {item.totalAmount}</p>
            </div>
          )
        }
      })}
    </>
  )
}



const Profile = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Layout>
      <div className="profile-container m-5">

        <div className='profile'>

          <h5>PROFILE</h5> <br />
          <p> <span> <PersonIcon /> </span> : {user?.userName}</p>
          <p> <span> <EmailIcon /> </span> : {user?.email}</p>
          <p> <span> <LocalPhoneIcon /> </span> : {user?.mobile}</p> <br /> <br /> <hr />

        </div> <hr />


        <div className='cartDetails'>
          <h4>Your Orders</h4> <hr />
          <Mycart />
        </div>

      </div>
    </Layout>
  )
}

export default Profile