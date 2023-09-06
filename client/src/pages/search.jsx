import React from 'react'
import { useParams } from 'react-router-dom';

const Search = () => {
  const { query } = useParams();
  return (
    <section>
      <h1>Search</h1>
      <div>{query}</div>
    </section>
  )
}

export default Search;