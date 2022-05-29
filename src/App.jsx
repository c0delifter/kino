import React from 'react';
import { useEffect, useState } from 'react';
import "./App.css";
import MovieCard from './components/MovieCard';
import SearchIcon from './search.svg';

const {REACT_APP_API_KEY, REACT_APP_API_URL} = process.env;
const API_URL = `${REACT_APP_API_URL}${REACT_APP_API_KEY}`;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const searchMovies = async (searchTitle) => {
        const response = await fetch(`${API_URL}&s=${searchTitle}`);
        const data = await response.json();
        setMovies(data.Search);
        setIsLoading(false);
    };

    useEffect(() => {
        searchMovies(searchTerm);
    }, []);

    return (
        <div className="app">
            <h1>KINO</h1>
            <div className="search">
                <input
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={(e) => { 
                        setIsLoading(true);
                        setSearchTerm(e.target.value);
                        searchMovies(e.target.value);
                    }}
                />
                <img src={SearchIcon}
                     alt="Search"
                />
            </div>

            {
                isLoading === true
                ?
                    <div className="empty">
                        <h2>Loading...</h2>
                    </div>
                :
                <>
                {movies?.length > 0 ? (
                    <div className="container">
                    {movies
                        .map((movie) => (
                            <MovieCard movie={movie} key={movie.imdbID}/>
                    ))}
                    </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies found...</h2>
                        </div>
                    )}
                </>
            }
        </div>
    );
};

export default App;