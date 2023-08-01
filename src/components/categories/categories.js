import React from 'react';
import '../categories/categories.css';
import WeekendIcon from '@mui/icons-material/Weekend';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TvIcon from '@mui/icons-material/Tv';

const Categories = () => {
  return (
    <div className='categories'>

<div className='cat-1 cat-box'><WeekendIcon className='cat-icon' sx={{ fontSize: 60 }}/><p>Furniture</p></div>

<div className='cat-2 cat-box'><CameraAltIcon className='cat-icon' sx={{ fontSize: 60 }}/><p>Electronics</p></div>

<div className='cat-2 cat-box'><TvIcon className='cat-icon'sx={{ fontSize: 50 }}/><p>Home</p><p>Appliances</p></div>








    </div>
  )
}

export default Categories