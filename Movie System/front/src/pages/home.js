import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Navbar from "../components/navbar";
import Search from "../components/search";
import Box from "../components/movieblock";

import defaultPoster from "../img/default.jpeg";
import AngryMenPoster from "../img/12 Angry Men.jpg";
import ShawshankRedemptionPoster from "../img/The Shawshank Redemption.jpg";
import GodfatherPoster from "../img/The Godfather.jpg";
import DarkKnightPoster from "../img/The Dark Knight.jpg";
import GodfatherPartIIPoster from "../img/The Godfather Part II.jpg";
import ReturnOfTheKingPoster from "../img/The Lord of the Rings The Return of the King.jpg";
import PulpFictionPoster from "../img/Pulp Fiction.jpg";

function Main(props) {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [search, setSearch] = useState("");


  useEffect(() => {
    // Fetch movies when the component mounts
    axios
      .get('http://localhost:8081/api/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  // useEffect(() => {
  //   // Fetch movies based on the search criteria when the component mounts
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post('http://localhost:8081/api/movies', {
  //          // Set the desired option ('movie', 'actor', or 'director')
  //         search: 'all', // Set the desired search value
  //       });
  
  //       setMovies(response.data);
  //     } catch (error) {
  //       console.error('Error fetching movies:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, []); // Empty dependency array ensures the effect runs only once
  
  const getPosterForMovie = (title) => {
    const sanitizedTitle = (title ?? "").replace(/\s/g, "_");
    console.log("Sanitized Title:", sanitizedTitle);

    const posterMap = {
      "12_Angry_Men": AngryMenPoster,
      "The_Shawshank_Redemption": ShawshankRedemptionPoster,
      "The_Godfather": GodfatherPoster,
      "The_Dark_Knight": DarkKnightPoster,
      "The_Godfather:_Part_II": GodfatherPartIIPoster,
      "The_Lord_of_the_Rings:_The_Return_of_the_King": ReturnOfTheKingPoster,
      "Pulp_Fiction": PulpFictionPoster,
    };

    const selectedPoster = posterMap[sanitizedTitle];
    console.log("Selected Poster:", selectedPoster);

    return selectedPoster || defaultPoster;
  };


  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  console.log(currentMovies)

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const renderPaginationControls = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`btn ${
            currentPage === i ? "btn-primary" : "btn-secondary"
          }`}
        >
          {i}
        </button>
      );
    }


    return (
      <div className="d-flex justify-content-center mt-3">{pageNumbers}</div>
    );
  };

  if (movies.length === 0) {
    //Show loading state while waiting for movies
    return <p>Loading...</p>;
  }

  return (
    <div>
      {console.log(props.user)}
      <Navbar
        loggedin={props.loggedin}
        user={props.user}
        setLoggedin={props.setLoggedin}
        setUser={props.setUser}

      />
      {/* <Search         search={search}
        setSearch={setSearch} /> */}

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          justifyContent: "center",
          paddingTop: "15px",
        }}
        className="page"
      >
        {currentMovies.map((movie) => (
          <Box
            key={movie.name}
            movie={movie}
            poster={getPosterForMovie(movie.name)}
          />
        ))}
      </div>
      {renderPaginationControls()}
    </div>
  );
}

export default Main;