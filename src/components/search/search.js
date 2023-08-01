import React from 'react';
import '../search/search.css'
import SearchIcon from '@mui/icons-material/Search';

function Search() {
  return (
    <div className='search-box'>
      <div className='search-area'>
        <input className='input-field' placeholder='search here' />
        <button className='search-btn'><SearchIcon /></button>
      </div>
    </div>
  )
}

export default Search