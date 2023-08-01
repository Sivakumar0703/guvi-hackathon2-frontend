import { TextField } from '@mui/material'
import React, { useContext } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
//import Header from '../../components/header/header';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'; // for form validation schema
import { useFormik } from 'formik';
import bgImage from '../register/register.jpg'
import { ProductContext } from '../../components/context/Context';



const registerSchemaValidation = yup.object({
  userName: yup.string().min(3, 'name should have minimum 3 character').required("Enter Your Name"),
  email: yup.string().email().required("Enter Email"),
  mobile: yup.string().matches(/^[0-9]{10}/, "Enter valid mobile number").required("Enter Mobile Number"),
  password: yup.string().min(8, 'enter minimum 8 character').required('not valid'),
  confirmpassword: yup.string().min(8, 'enter minimum 8 character').oneOf([yup.ref('password')], "Password Not Matched").required('Enter Password to Confirm')

})


const Register = () => {

  const navigate = useNavigate();
  const {url} = useContext(ProductContext);


  // formik function
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      mobile: "",
      password: "",
      confirmpassword: ""
    },

    validationSchema: registerSchemaValidation,
    onSubmit: (newuser) => signup(newuser)

  })



  async function signup(newuser) {

    try {
      const result = await axios.post(`${url}/users/signup`, newuser).data
      toast.success('Registration successful');
      navigate('/login')
    } catch (error) {
      console.log(error)
    }

  }


  return (

    <div className='row signup-registration d-flex justify-content-center align-items-center' style={{ flexDirection: 'column', height: '100vh', backgroundImage: `url(${bgImage})`, height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>

      <div className='form col-md-6 bs ' style={{ borderRadius: "5px", position: 'absolute' }} >

        <h1 style={{ textAlign: "center" }}>REGISTER HERE</h1>

        <form onSubmit={handleSubmit}>

          <TextField id="outlined-basic1" required label="USER NAME" onBlur={handleBlur} variant="outlined" fullWidth margin="normal" name="userName" value={values.userName} onChange={handleChange} /> <br />
          {touched.userName && errors.userName ? <p style={{ color: "red" }}>{errors.userName}</p> : ""}

          <TextField id="outlined-basic2" required label="EMAIL" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="email" value={values.email} onChange={handleChange} /> <br />
          {touched.email && errors.email ? <p style={{ color: "red" }}>{errors.email}</p> : ""}

          <TextField id="outlined-basic3" required label="MOBILE NUMBER" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="mobile" value={values.mobile} onChange={handleChange} /> <br />
          {touched.mobile && errors.mobile ? <p style={{ color: "red" }}>{errors.mobile}</p> : ""}

          <TextField id="outlined-basic4" required label="PASSWORD" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="password" value={values.password} onChange={handleChange} /> <br />
          {touched.password && errors.password ? <p style={{ color: "red" }}>{errors.password}</p> : ""}

          <TextField id="outlined-basic5" required label="CONFIRM PASSWORD" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="confirmpassword" value={values.confirmpassword} onChange={handleChange} />
          {touched.confirmpassword && errors.confirmpassword ? <p style={{ color: "red" }}>{errors.confirmpassword}</p> : ""}

          <button className='btn btn-primary register-btn' type='submit' style={{ position: 'relative', left: '45%' }} onClick={() => console.log('clicked')} >REGISTER</button>

        </form>
      </div>
    </div>
  )
}

export default Register