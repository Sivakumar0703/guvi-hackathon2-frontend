
import React, { useEffect, useState, useContext } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ProductContext } from '../../components/context/Context';
import '../../App.css'

const Adminonrental = () => {

    const [data, setData] = useState(); // payment data
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [detail, setDetail] = useState(); // retrived user data from payment collection
    const {url} = useContext(ProductContext);


    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (user.role === 'user') {
            window.location.href = '/'
        }

        async function getpayment() {
            try {
                const paymentData = await axios.get(`${url}/payment`).then((res) => res.data.payment)
                setData(paymentData);
            } catch (error) {
                console.log(error, 'error in getting all payments data')
            }
        }
        getpayment();

    }, [])


    function showDetail(order) {
        setDetail(data.filter((info) => info.orderId === order))
        console.log(detail);
        handleShow();
    }

    const bg = {
        backgroundColor: "#f876de",
        backgroundImage: 'linear-gradient(315deg, #f876de 0%, #b9d1eb 74%)'
    }


    return (

        
            <Container>
                <div className='d-flex'>
                    <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div> <hr />

                {/* purchased detail - Modal */}
                <>
                    <Modal show={show} onHide={handleClose}>
                        {detail?.map((data) => {
                            return (
                                <>
                                    <Modal.Header style={bg} >
                                        <Modal.Title style={{ margin: 'auto' }}>{data.userName.toUpperCase()}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={bg}>{data.cartItems?.map((i) => {
                                        return (
                                            <div style={{ backgroundColor: 'aliceblue', marginBottom: '8px', padding: '5px', borderRadius: '8px' }} key={i._id}>
                                                <p><b>Product Name</b> : {i.productName}</p>
                                                <p><b>Quantity</b> :{i.quantity}</p>
                                                <p><b>Date</b> :{i.startDate} - {i.endDate}</p>
                                                <p><b>Time</b> :{i.startTime} - {i.endTime}</p>
                                            </div>
                                        )
                                    })}</Modal.Body>
                                    <Modal.Footer style={bg}>
                                        <Button variant="danger" onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </>
                            )
                        })}
                    </Modal>
                </>

                {/* payment details */}
                <Table striped responsive className='mb-3 mt-3'>
                    <thead>
                        <tr>
                            <th>SI.NO</th>
                            <th>User Name</th>
                            <th>Order ID</th>
                            <th>View</th>
                            <th>Amount Paid</th>
                        </tr>
                    </thead>
                    <tbody>{data && data.filter(item => {
                        if (search === '') {
                            return item
                        } else if (item.userName.toLowerCase().includes(search.toLowerCase())) {
                            return item
                        } else if (item.orderId.toLowerCase().includes(search.toLowerCase())) {
                            return item
                        } else if (item.totalAmount.toString().includes(search)) {
                            return item
                        }

                    })

                        .map((item, index) => {
                            return (
                                <tr key={item.orderId}>
                                    <td> {index + 1}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.orderId}</td>
                                    <td> <i className="bi bi-eye-fill admin-view" onClick={() => showDetail(item.orderId)}></i> </td>
                                    <td>{item.totalAmount}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
      


    )
}

export default Adminonrental