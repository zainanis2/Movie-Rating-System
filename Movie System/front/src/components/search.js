import "../styles/search.css";
import logo from "../search.png";
import React, { useState } from "react";

export default function Search({search, setSearch}) {

  const [selectedOption, setSelectedOption] = useState("movies");


  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
    console.log(`Selected ${option}`);
  };
  const handleOnchnage=(e)=>
  {
      setSearch(e.target.value);
  }

  const handleOnClick=()=>
  {
    console.log(search)
  }

  return (
    <>
      <div className="search-container">
        <div className="searchbar">
          <input className="search-box" placeholder="Search" type="text" onChange={handleOnchnage}/>
          <button className="search-btn" id="search-btn" onClick={handleOnClick}>
            <img height={25} src={logo} alt="xys"></img>
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
  
      </div>
    </>
  );
}
