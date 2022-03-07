import {useEffect, useState} from "react";
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";


const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`


const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        const reponse = await fetch(`${API_URL}&s=${title}`)

        const data = await reponse.json()
        console.log(data.Search)

       setMovies(data.Search)
    }
    useEffect(() => {
        searchMovies('spiderman')
    }, [])
    
    return (
        <div className="app">
            <h1>Movie Nights</h1>
            <div className="search">
                <input placeholder="Search for movies"
                    type="text"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img src={SearchIcon}
                    alt="search"
                    onClick={()=>searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map(movie => (
                            <MovieCard movie={movie} key={movie.imdbID}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }


                
        </div>
    )
}

export default App