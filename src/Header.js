// Header.js

import React, { useState } from 'react';
import { LuListTodo } from "react-icons/lu";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className='header'>
      <div className='title '>
        <LuListTodo style={{ backgroundColor: 'bisque', color: 'rgba(126, 58, 35, 0.694)' }} /> To Do List
      </div>
      <div className='search'>
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Header;
