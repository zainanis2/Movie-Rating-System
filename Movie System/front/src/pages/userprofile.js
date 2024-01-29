// UserProfile.jsx
import React, { useState } from "react";
import MovieRatingModal from "../components/MovieRatingModal";
import Navbar from "../components/navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';

function UserProfile({ user, setUser, loggedin, setLoggedin }) {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleAddToWatched = (movie) => {
    // Make a request to the server to add the movie to the Watched list
    axios.post('http://localhost:8081/api/addToWatchedOrDropped', {
      listID: 2,  // Watched list ID
      movieID: movie.movieID,
      userID: user.userID,
    })
    .then(response => {
      console.log(response.data);
  
      // Update the local state accordingly
      setUser((prevUser) => {
        const updatedUser = {
          ...prevUser,
          watching: prevUser.watching.filter((item) => item !== movie),
          watched: [...prevUser.watched, { movieID: movie.movieID, name: movie.name, rating: 0 }],
        };
        return updatedUser;
      });
  
      
    })
    .catch(error => {
      console.error('Error adding to Watched list:', error);
  
      // Check for duplicate entry error
      if (error.response && error.response.status === 400) {
        alert('Error: ' + error.response.data.message);
      } else {
        alert('Error adding to Watched list. Please try again later.');
      }
    });
  };
  
  const handleAddToDropped = (movie) => {
    console.log('Movie Object:', movie);
    console.log('Movie Object:');
    // Make a request to the server to add the movie to the Dropped list
    axios.post('http://localhost:8081/api/addToWatchedOrDropped', {  
      listID: 3,  // Dropped list ID
      movieID: movie.movieID,
      userID: user.userID,
    })
    .then(response => {
      // Handle the success response if needed
      console.log(response.data);
  
      // Update the local state accordingly
      setUser((prevUser) => {
        const updatedUser = {
          ...prevUser,
          watching: prevUser.watching.filter((item) => item !== movie),
          dropped: [...prevUser.dropped, { movieID: movie.movieID, name: movie.name, rating: 0 }],
        };
        return updatedUser;
      });
  
      
    })
    .catch(error => {
      console.error('Error adding to Dropped list:', error);
  
      // Check for duplicate entry error
      if (error.response && error.response.status === 400) {
        alert('Error: ' + error.response.data.message);
      } else {
        alert('Error adding to Dropped list. Please try again later.');
      }
    });
  };
  
  

  const handleAddRating = (movie) => {
    setSelectedMovie(movie);
    setShowRatingModal(true);
  };

  const handleRatingSubmit = (movie, rating) => {
    // Make a request to the server to add the rating
    axios.post('http://localhost:8081/api/addRating', {
      userID: user.userID,
      movieID: movie.movieID,
      rating: rating,
    })
    .then(response => {
      console.log(response.data);
  
      // Update the local state directly without relying on the server response
      setUser((prevUser) => {
        const updatedWatched = prevUser.watched.map((item) =>
          item.movieID === movie.movieID ? { ...item, rating: rating } : item
        );
        const updatedDropped = prevUser.dropped.map((item) =>
          item.movieID === movie.movieID ? { ...item, rating: rating } : item
        );
  
        return { ...prevUser, watched: updatedWatched, dropped: updatedDropped };
      });
  
      setShowRatingModal(false);
    })
    .catch(error => {
      console.error('Error adding rating:', error);
  
      // Handle errors if needed
      // You can also display an alert or message to the user
    });
  };
  
  
  const handleRatingModalClose = () => {
    setShowRatingModal(false);
    setSelectedMovie(null);
  };



  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedin) {
      navigate("/home");
    }
  }, [loggedin, navigate]);

  if (!loggedin) {
    return null;
  }

  return (
    <>
      <Navbar
        loggedin={loggedin}
        user={user}
        setLoggedin={setLoggedin}
        setUser={setUser}
      />
  
      <div className="container mt-5 text-center">
        <h1 className="mb-4">{user.firstname}'s list</h1>
  
        {!showRatingModal && (
          <div className="row justify-content-center">
            <div className="col-md-4">
              <h2>Watching:</h2>
              <ul className="list-group">
                {user.watching &&
                  user.watching.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {item.name} {/* Display movie name */}
                      <div>
                        <button
                          className="btn btn-success btn-sm btn-block mr-2"
                          onClick={() => handleAddToWatched(item)}
                        >
                          Add to Watched
                        </button>
                        <button
                          className="btn btn-danger btn-sm btn-block"
                          onClick={() => handleAddToDropped(item)}
                        >
                          Add to Dropped
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
  
            <div className="col-md-4">
              <h2>Watched:</h2>
              <ul className="list-group">
                {user.watched &&
                  user.watched.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {item.name} {/* Display movie name */}
                      <div>
                       {item.rating ? (
                          <span className="badge badge-primary">
                            Rating: {item.rating}
                          </span>
                        ) : (
                          <button
                            className="btn btn-info btn-sm btn-block mr-2"
                            onClick={() => handleAddRating(item)}
                          >
                          Add Rating
                        </button>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
  
            <div className="col-md-4">
              <h2>Dropped:</h2>
              <ul className="list-group">
                {user.dropped &&
                  user.dropped.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {item.name} {/* Display movie name */}
                      <div>
                       {item.rating ? (
                          <span className="badge badge-primary">
                            Rating: {item.rating}
                          </span>
                        ) : (
                          <button
                            className="btn btn-info btn-sm btn-block mr-2"
                            onClick={() => handleAddRating(item)}
                          >
                          Add Rating
                        </button>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
  
        {showRatingModal && selectedMovie && (
          <MovieRatingModal
            movie={selectedMovie}
            onSubmit={handleRatingSubmit}
            onClose={handleRatingModalClose}
          />
        )}
      </div>
    </>
  );
  
}

export default UserProfile;
