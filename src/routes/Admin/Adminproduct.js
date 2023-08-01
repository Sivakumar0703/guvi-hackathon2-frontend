import React, { useEffect, useContext } from 'react'
import Navbar from '../../components/admin navbar/Navbar'
import Layout from '../../components/layout/layout'
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ProductContext } from '../../components/context/Context';

const Adminproduct = () => {

    const navigate = useNavigate();
    const {state:{products}} = useContext(ProductContext);
    

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (user.role === 'user') {
            window.location.href = '/'
        }

    }, [])


    return (
        <Layout>
            <Navbar />
            <Container>

                <h1>PRODUCTS</h1>

                {products?.map((data) => {

                    return (
                        <div className="card bs product-con today " key={data._id}>
                            <img src={data.image} className="card-img-top card-img" alt="img" />
                            <div className="card-body">
                                <h5 className="card-title">{data.name}  </h5>  <EditIcon onClick={() => { navigate(`/admin/editproduct/${data._id}`) }} />
                            </div>
                        </div>

                    )
                }
                )}

            </Container>

        </Layout>
    )
}

export default Adminproduct