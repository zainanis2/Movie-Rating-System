import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import axios from 'axios';

export default function Moviedetails({ user, setUser, loggedin, setLoggedin }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { movie,poster } = location.state || {};

  useEffect(() => {
    if (!movie) {
      navigate("/home");
    }
  }, [movie, navigate]);

  if (!movie) {
    return null;
  }

  const {
    movieID,
    name,
    director,
    releaseDate,
    genres,
    posterLink,
    imdbRating,
    actors,
    plotSummary
  } = movie;

  
  const handleAddToList = () => {
    // Make a request to the server to add the movie to the Watching list (listID: 1)
    axios
      .post("http://localhost:8081/api/addToWatchedOrDropped", {
        listID: 1, // Watching list ID
        movieID: movie.movieID,
        userID: user.userID,
      })
      .then(response => {
        // Handle the success response if needed
        console.log(response.data);
        alert(`Added to the list`);
  
        // Update the local state to include the added movie in the watching array
        setUser((prevUser) => {
          const updatedUser = {
            ...prevUser,
            watching: [...prevUser.watching, { movieID: movie.movieID, name: movie.name, rating: 0 }],
          };
          return updatedUser;
        });
      })
      .catch(error => {
        console.error('Error adding to Watching list:', error);
  
        if (error.response.status === 400) {
          // Duplicate entry error
          alert(`Movie already exists in your Watching List`);
        } else {
          // Other errors
          alert(`Error adding to Watching list: ${error.message}`);
        }
      });
  };
  
  
  
  
  

  return (
    <>
      <Navbar
        user={user}
        loggedin={loggedin}
        setLoggedin={setLoggedin}
        setUser={setUser}
      />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={poster}
              alt={`${name} Poster`}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h1>{name}</h1>
            <p className="card-text">
              <strong>Director:</strong>{" "}
              {director.map((director, index) => (
                <span key={index}>
                  {director}
                  {index < movie.director.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p className="card-text">
              <strong>Actors:</strong>{" "}
              {actors.map((actor, index) => (
                <span key={index}>
                  {actor}
                  {index < movie.actors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p>
              <strong>Release Date:</strong> {releaseDate || "N/A"}
            </p>
            <p>
              <strong>Genre:</strong>{" "}
              {genres.map((genre, index) => (
                <span key={index}>
                  {genre}
                  {index < movie.genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p>
              <strong>Rating:</strong> {imdbRating || "N/A"}
            </p>
            <p>
              <strong>Plot Summary:</strong> {plotSummary || "N/A"}
            </p>

            {loggedin ? (
              <button className="btn btn-primary" onClick={handleAddToList}>
                Add to Watching
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
