import def_img from "../search.png";
import "../styles/movieblock.css";
import { useNavigate } from "react-router-dom";
import "../styles/colors.css";

export default function Box({ movie,poster }) {
  let navigate = useNavigate();

  return (
    <div
      class="card text-white background-purple"
      style={{ width: "18rem", padding: "5px", borderRadius: "30px 30px" }}
    >
      <img
        class="card-img-top"
        src={poster}
        style={{ borderRadius: "30px" }}
        alt={`${movie.name}'s poster`}
      />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title mb-0">{movie.name}</h5>
        <br />
        <p class="card-text">
          Director :{" "}
          {movie.director.map((director, index) => (
            <span key={index}>
              {director}
              {index < movie.director.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <p class="card-text">Release date : {movie.releaseDate}</p>
        <p class="card-text">
          Genres :{" "}
          {movie.genres.map((genre, index) => (
            <span key={index}>
              {genre}
              {index < movie.genres.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <a
          onClick={() => navigate("/moviedetails", { state: { movie , poster } })}
          class="btn purple-btn mt-auto "
          style={{ width: "50%" }}
        >
          View more
        </a>
      </div>
    </div>
  );
}
