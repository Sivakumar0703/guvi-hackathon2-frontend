import React from 'react';
import '../footer/footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useNavigate } from 'react-router-dom';
import { Container , Row , Col} from 'react-bootstrap';

const Footer = () => {

  const navigate = useNavigate();

  function gotoContactus() {
    navigate('/contact_us');
  }

  return (
    <div className='footer'>

      <Container>
        <Row>
          <Col md={4} sm={11} className='footer-section-1'>
          <h4>ONLINE-RENT</h4>
          <p>About us</p>
          <p>Careers</p>
          <p onClick={gotoContactus}>Contact</p>
          <p>Location</p>
          <p>Rent Your Products</p>
          </Col>

          <Col md={4} sm={11} className='footer-section-2'>
          <h4>POLICIES</h4>
          <p>Cancellation & Return</p>
          <p>Privacy Policy</p>
          <p>Terms & Condition</p>
          </Col>

          <Col md={4} sm={11}>
          <h4>FOLLOW US</h4>
          <FacebookIcon className='icon m-1' />
          <TwitterIcon className='icon m-1' />
          <InstagramIcon className='icon m-1' />
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Footer