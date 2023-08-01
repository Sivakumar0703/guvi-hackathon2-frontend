import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../landingPage/landingPage.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import sandClock from './clock.jpg'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    function goHome(){
        navigate('/home')
    }
    return (
        <div>

            <Row>
                <Col >
                    <div className='headContainer' >
                        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                            <Navbar.Brand href="/"> <i className="bi bi-shop-window"></i> </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                                <Nav className="me-auto" style={{ color: 'black', fontSize: 'medium' }}>
                                    <Nav.Link  href="/home">  Home <i className="bi bi-house-door-fill"></i></Nav.Link>
                                    <Nav.Link  href="/contact_us">Contact <i className="bi bi-telephone-fill"></i></Nav.Link>
                                    <Nav.Link  href="/login">Login <i className="bi bi-door-open-fill"></i></Nav.Link>
                                    <Nav.Link  href="#" disabled={true}>About us <i className="bi bi-question-diamond-fill"></i></Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col lg={4} style={{margin:'15px'}}>
                    <p style={{fontSize:'35px' , fontWeight:'bold'}}>WHO ARE WE ?</p>
                    <p style={{textAlign:'justify'}}>
                       From the name itself you have guessed it.You are <span>✔️</span>.
                       <span className='name'>Online</span> <span className='name'>Rental</span> is an online platform Where you can get 
                       things on rent.We offer various kind of products such as furnitures,electronics,electrics,
                       mechanic tools etc.
                    </p>
                    <p style={{textAlign:'justify'}}>
                        Why do you want to buy products Which you need for a short period of time?
                        Instead, you could get those things on rent from us at low cost.Use <span className='name'>Online </span>
                        <span className='name'>Rental</span> and save your hard earned money<span>💵</span>
                    </p>

                    <button className='btn btn-primary' style={{marginLeft:'45%' , marginTop:'10px'}} onClick={goHome}> Explore <i class="bi bi-search"></i> </button>
                </Col>

                <Col className='sandImage' lg={5}>
                   <img src={sandClock} alt='sand clock'/>
                </Col>
            </Row>

          
        </div>
    )
}

export default LandingPage