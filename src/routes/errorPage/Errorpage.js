import React from 'react'
import { useNavigate } from 'react-router-dom';

const Errorpage = () => {

    const navigate = useNavigate()

    function gotoHome(){
        navigate('/home')
    }

  return (
    <div className='container'>

        <div className='frown-image' style={{display:'flex' , flexDirection:'column' , justifyContent:'center' , marginTop:'50px'}}>
            <div style={{margin:'auto'}}><i className="bi bi-emoji-frown-fill" style={{fontSize:'150px' , color:'gray'}}></i></div>

            <p style={{fontSize:'100px' , color:'gray' , display:'flex' , justifyContent:'center' }}>404</p>

            <p style={{fontSize:'50px' , color:'gray' , display:'flex' , justifyContent:'center' }}>PAGE NOT FOUND</p>

            <button onClick={gotoHome} className='btn btn-primary' style={{width:'200px',margin:'auto'}}>Click here to go Home &nbsp;<span><i className="bi bi-house-heart-fill"></i></span></button>
           

            

        </div>
        
    </div>
  )
}

export default Errorpage