import React, { useState } from "react";
import SearchField from "./SearchField";

const Home = props => {
  return (
    <div
      className={`${props.isLandingPage === true ? "af-center-v" : "af-top-v"}`}
    >
      {props.isLandingPage ? (
        <h1 className='mb-5 af-title text-white py-3'>Weather App</h1>
      ) : null}

      <SearchField
        handleSearch={props.handleSearch}
        onSearchCityChange={props.onSearchCityChange}
        searchCity={props.searchCity}
        onSearchSubmit={props.onSearchSubmit}
      />
    </div>
  );
};

export default Home;
