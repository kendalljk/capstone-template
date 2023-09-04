import React from 'react'
import { useParams } from 'react-router-dom';

const Search = () => {
  const { query } = useParams();
  return (
    <div>{query}</div>
  )
}

export default Search;