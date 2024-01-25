import { useState, useEffect } from 'react';

import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

const api_url = 'http://www.omdbapi.com?apikey=61cd7a30'

function App() {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${api_url}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }
  useEffect(() => {
    searchMovies('Batman')
  }, [])
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input placeholder='search for movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" />
        <img 
          src={SearchIcon} 
          alt="Search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {    
        movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies available.</h2>
          </div>
        )
      }

    </div>
  );
}

export default App;
