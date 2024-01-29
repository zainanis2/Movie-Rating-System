import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import axios from 'axios';
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

function Newreleases(props) {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch movies when the component mounts
    // axios
    //   .get('http://localhost:8081/api/movies')
    //   .then(response => {
    //     setMovies(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching movies:', error);
    //   });
    setMovies([
      {
        movieID: 8,
        name: "Hotel Transylvania 4: Transformania",
        director: ["Derek Drymon", "Jennifer Kluska"],
        releaseDate: "2022", 
        imdbRating: null, 
        actors: [
          "Andy Samberg",
          "Selena Gomez",
          "Kathryn Hahn",
          "Keegan-Michael Key",
        ],
        genres: ["Animation", "Comedy", "Family"],
        plotSummary:
          "Dracula and his pals try to bring out the monster in his half-human, half-vampire grandson in order to keep Mavis from leaving the hotel.",
      },{
        movieID: 9,
        name: "The 355",
        director: ["Simon Kinberg"],
        releaseDate: "2022", // Update with the correct release year
        imdbRating: null, // You can update this once the movie is rated
        actors: [
          "Jessica Chastain",
          "Diane Kruger",
          "Penélope Cruz",
          "Lupita Nyong'o",
        ],
        genres: ["Action", "Thriller"],
        plotSummary:
          "When a top-secret weapon falls into mercenary hands, wild card CIA agent Mason 'Mace' Brown will need to join forces with rival badass German agent Marie, former MI6 ally and cutting-edge computer specialist Khadijah, and skilled Colombian psychologist Graciela on a lethal, breakneck mission to retrieve it.",
      },
      {
        movieID: 10,
        name: "Scream (I)",
        director: ["Matt Bettinelli-Olpin", "Tyler Gillett"],
        releaseDate: "2022", // Update with the correct release year
        imdbRating: null, // You can update this once the movie is rated
        actors: [
          "Neve Campbell",
          "Courteney Cox",
          "David Arquette",
          "Melissa Barrera",
        ],
        genres: ["Horror", "Mystery", "Thriller"],
        plotSummary:
          "Twenty-five years after the original series of murders in Woodsboro, a new Ghostface emerges, and Sidney Prescott must return to uncover the truth.",
      },
    
      {
        movieID: 11,
        name: "The King's Daughter",
        director: ["Sean McNamara"],
        releaseDate: "2022", // Update with the correct release year
        imdbRating: null, // You can update this once the movie is rated
        actors: [
          "Pierce Brosnan",
          "Kaya Scodelario",
          "Benjamin Walker",
          "Rachel Griffiths",
        ],
        genres: ["Action", "Adventure", "Fantasy"],
        plotSummary:
          "King Louis XIV's quest for immortality leads him to capture and steal a mermaid's life force, a move that is further complicated by his illegitimate daughter's discovery of the creature.",
      },
    ]);
  }, []); // Empty dependency array ensures the effect runs only once

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  console.log(currentMovies);

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
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", 
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }
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

  return (
    <div>
      {console.log(props.user)}
      <Navbar
        loggedin={props.loggedin}
        user={props.user}
        setLoggedin={props.setLoggedin}
        setUser={props.setUser}
      />



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

export default Newreleases;
