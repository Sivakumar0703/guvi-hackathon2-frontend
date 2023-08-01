import React from 'react'
import './nav.css';

const Navbar = () => {

  return (
    <div className='admin-nav'>

      <nav className="navbar navbar-expand-lg navbar-dark admin-nav">
        <div className="container-fluid ">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item active">
                <a className="nav-links" aria-current="page" href="/admin" style={{  fontWeight: "bolder" }}>Dashboard</a>
              </li> &nbsp; &nbsp;
              <li className="nav-item">
                <a className="nav-links" aria-current="page" href="/admin/products" style={{  fontWeight: "bolder" }} >Products</a>
              </li> &nbsp; &nbsp;
              <li className="nav-item">
                <a className="nav-links" href="/admin/addproducts" style={{  fontWeight: "bolder" }} >Add Product</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar

