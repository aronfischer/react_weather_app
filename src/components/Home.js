import React, { useState } from "react";
import SearchField from "./SearchField";

const Home = props => {
  return (
    <div className={`${props.isLandingPage === true ? "af-center-v" : "mt-3"}`}>
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
