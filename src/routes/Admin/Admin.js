import React, { useEffect } from 'react'
import Navbar from '../../components/admin navbar/Navbar'
import Layout from '../../components/layout/layout';
import Doughnutchart from '../../components/chart/Doughnut';
import { Container, Row, Col } from 'react-bootstrap';
import Adminonrental from './Adminonrental';


const Admin = () => {

  useEffect(() => { // to stop users to access admin page
    const user = JSON.parse(localStorage.getItem("user"));

    if (user.role === 'user') {
      window.location.href = '/home'
    }

  }, [])






  return (
    <Layout>


      <Navbar /> 

      <h1 style={{ textAlign: "center" }}>DASHBOARD</h1>


      <Container>
        <Row>
          <Col md={4} sm={8}>
            <Doughnutchart />
          </Col>
        </Row>

        <Row className='m-4'>
          <Col md={12} sm={12}>
            <h5 className='text-center' style={{ background: 'aliceblue' }}>PRODUCTS ON RENTAL </h5>
            <Adminonrental />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Admin