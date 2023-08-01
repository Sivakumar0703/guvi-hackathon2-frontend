import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../homepage/homePage.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ProductContext } from '../../components/context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import dayjs from 'dayjs'
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)

const Viewproduct = ({ item, from, to, startdate, enddate}) => {


  const [show, setShow] = useState(false);
  const { url } = useContext(ProductContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userName = JSON.parse(localStorage.getItem('user'))?.userName;
  const { state: { cart }, dispatch } = useContext(ProductContext);
  const email = JSON.parse(localStorage.getItem('user'))?.email;
  


  // adding cart items to local storage
  function addCartToLocalStorage(cartitem) {
    
    if (localStorage.getItem('cartArray') === null) {
      localStorage.setItem('cartArray', '[]');
    }

    let previousData = JSON.parse(localStorage.getItem('cartArray')); // already in cart


    let cartItem = {
      productId: cartitem._id,
      productName: cartitem.name,
      type: cartitem.type,
      price: cartitem.price,
      image: cartitem.image,
      quantity: cartitem.quantity,
      startDate: cartitem.fromDate,
     endDate: cartitem.toDate,
      startTime: cartitem.fromTime,
      endTime: cartitem.toTime
    };

    dispatch({
      type: "add to cart",
      payload: cartItem,
    });

    previousData.push(cartItem); // adding new item to existing cart
    localStorage.setItem('cartArray', JSON.stringify(previousData));

    axios.patch(`${url}/cart/updateCart`, { updatedCart:previousData, email }).then().catch(err => toast.error('Not able to add in cart,Try again later'))

  }

  // remove cart items from local storage
  function removeCartFromLocalStorage(cartitem) {

    let previousData = JSON.parse(localStorage.getItem('cartArray')); // items in cart


    previousData.filter((data, index) => {
      if (data.productId === cartitem._id) {

        previousData.splice(index, 1); // removing particular item from cart
        localStorage.setItem('cartArray', JSON.stringify(previousData));
        //const updatedCart = previousData;
        axios.patch(`${url}/cart/updateCart`, { updatedCart:previousData, email })
          .then()
          .catch(err => toast.error('Error occured in removing cart item'))

        dispatch({
          type: "remove from cart",
          payload: cartitem
        });
       
      }
    })
  }


  // add to cart
  function addToCart() {

    const hour = Number(from?.split(':')[0]); // starting Hour
    const minute = Number(from?.split(':')[1]); // starting Minute
    const curHour = moment().hour(); // current hour
    const curMinute = moment().minutes(); // current minute
    const curDate = dayjs(Date.now()).format('YYYY-MM-DD');
    

    if (from && startdate) {
      if ((dayjs(startdate).isSameOrAfter(dayjs(curDate))) ||
        (((hour > curHour) && ((minute <= curMinute) || (minute >= curMinute))) || ((hour === curHour) && (minute >= curMinute)))) {
        item.fromDate = startdate;
        item.toDate = enddate;
        item.fromTime = from;
        item.toTime = to;

        addCartToLocalStorage(item)
      } else {
        toast.error('Please select a valid time');
      }
    } else {
      toast.error('Please select a valid date & time')
    }
  }


  return (

   
      <div className="card  bs product-con" key={item._id}>
      <div className="card-img"> <img className="card-img-top card-image" src={item.image} alt={item.name} /> </div>
      <div className="card-title p-2">  <h5 >{item.name}</h5> </div>
      <div className="card-body p-2">


        {
          cart?.some((prod) => prod?.productId === item._id) ? (

            <button className='btn btn-danger removeCart'

              onClick={() => {
                if(!userName){
                  return toast.error("Please login")
                } else {
                  removeCartFromLocalStorage(item);
                }
                
              }} >
              <RemoveShoppingCartIcon />
            </button>

          ) : (
            <button className='btn btn-primary addCart'

              onClick={() => {
                if(!userName){
                  return toast.error("Please login")
                } else {
                  addToCart();
                }
                
              }
              } >  <AddShoppingCartIcon />
            </button>
          )
        }

        <button className="btn view-btn btn-primary" onClick={handleShow}> <VisibilityIcon />  </button>

        <div>
          <Modal show={show} onHide={handleClose}  >
            <Modal.Header >
              <Modal.Title>{item.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body><img src={item.image} className='modal-img' alt='product img' /></Modal.Body>
            <Modal.Body ><b><p>DESCRIPTION</p></b>{item.description}</Modal.Body>
            <Modal.Body><b><p>PRICE/hr</p></b><span>₹</span>{item.price}</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>

            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>

 

    
  )
}

export default Viewproduct