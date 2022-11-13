import React, { useState } from 'react';
import { Divider, Input } from 'antd';

function SearchFood(props) {

  // Destructuring filterFood function
  const {filterFood} = props;

  // Searched input element state
  const [search, setSearch] = useState('');
  
  // Handle search by user
  const handleSearch = (event) => {
    setSearch(event.target.value)
    filterFood(event.target.value)
  }

  return (
    <>
      <Divider>Buscar Comidas</Divider>

      <label htmlFor='query'></label>
      <Input value={search} type="text" name="query" onChange={handleSearch} />
    </>
  )
}

export default SearchFood