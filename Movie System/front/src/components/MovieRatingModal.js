import React, { useState } from "react";

const MovieRatingModal = ({ movie, onSubmit, onClose }) => {
  const [rating, setRating] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (event.key === "Backspace" || event.key === "Delete") {
      setRating(value);
    } else {
      const numericValue = parseInt(value, 10);

      if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 10) {
        setRating(numericValue);
      } else {
        console.log(
          "Invalid rating value. Please enter a value between 1 and 10."
        );
      }
    }
  };

  const handleSubmit = () => {
    onSubmit(movie, rating);
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{`Rate ${movie.name}`}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="card">
              <div className="card-body">
                <label>
                  Rating (1-10):
                  <input
                    type="text"
                    value={rating}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (isNaN(parseInt(e.key, 10))) {
                        e.preventDefault();
                      }
                    }}
                    className="form-control"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRatingModal;
