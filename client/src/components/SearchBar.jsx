import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearch}
      fullWidth
      style={{ marginBottom: '20px' }}
    />
  );
};

export default SearchBar;
