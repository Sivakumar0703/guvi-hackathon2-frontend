import { TextField } from '@mui/material'
import React, {useState, useContext, useEffect } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../components/context/Context';
import bgImage from '../login/login.webp';
import "../../App.css";



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [triggerLogin , setTriggerLogin] = useState(false);
    const navigate = useNavigate();
    let {url , dispatch } = useContext(ProductContext);
    

    async function login() {

        if(email === ''){
            return toast.error('Please enter your Email')
        }

        const user = {
            email,
            password,
        }
       

        try {
             await axios.post(`${url}/users/login`, user)
                .then(res => {
                    
                    localStorage.setItem('user', JSON.stringify(res.data.userData));

                    axios.post(`${url}/cart/getCart`, { email })
                    .then(res => {
                     // dispatch({ type: "setCart", payload:res.data.cart })
                     
                      console.log('object login',res.data.cart)
                      localStorage.setItem('cartArray', JSON.stringify(res.data.cart))
                      //cart = JSON.parse(localStorage.getItem('cartArray'))
                      dispatch({type:"setCart"})
                    })
                    .catch(err => console.log(err))

                })
            if (JSON.parse(localStorage.getItem('user'))) {
                navigate('/home')
            }
            toast.success('Login successful');
        } catch (error) {
            console.log('error : ', error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function demoLogin(guestEmail){
        setEmail(() => guestEmail);
        setPassword('sivakumar');
        setTriggerLogin(true);
    }

    useEffect(()=>{
        if(triggerLogin){
            login();
            setTriggerLogin(false);
        }
    },[triggerLogin])



    return (
        <div style={{ backgroundImage: `url(${bgImage})`, height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', flexDirection: 'column' }} className='d-flex justify-content-center align-items-center'>


            <h1 style={{ textAlign: "center", color: 'white', marginBottom: '20px' }}>LOGIN HERE</h1>


            <Box sx={{ '& > :not(style)': { m: 1 }, input: { color: 'white' }, '& label': { color: 'white' } }}>
                <TextField
                    id="input-with-icon-textfield"
                    label="EMAIL"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon style={{ color: 'white' }} />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard" fullWidth
                    value={email} onChange={(e) => setEmail(e.target.value)}

                />   <br />


                <FormControl sx={{ m: 1 }} variant="standard" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} >
                    <InputLabel htmlFor="standard-adornment-password" >Password</InputLabel>
                    <Input

                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}

                        startAdornment={
                            <InputAdornment position="start">
                                <VpnKeyIcon style={{ color: 'white' }} />
                            </InputAdornment>
                        }

                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff style={{ color: 'white' }} /> : <Visibility style={{ color: 'white' }} />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

            </Box>

            <a href='/register' style={{ textDecoration: 'none', color: 'white' }} className='m-1'>Click here to create an account</a> <br /> <br />

           <div className='btn-group'>
           <button className='btn btn-primary mb-3 login' onClick={login} >LOGIN</button>
            <button className='btn btn-danger mb-3 login' onClick={() => demoLogin('admin@onlinerental.com')} >ADMIN</button>
            <button className='btn btn-success mb-3 login' onClick={() => demoLogin('guest@onlinerental.com')} >GUEST</button>
           </div>

        </div>


    )
}

export default Login