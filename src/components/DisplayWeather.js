import React, { useState } from "react";
import Weather from "./Weather";

const DisplayWeather = props => {
  let WINDOW_HEIGHT = "1000";
  let WINDOW_WIDTH = "1500";

  const [isFahrenheit, setIsFahrenheit] = useState(true);

  const fetchGif = async props => {
    const response = await fetch(
      "https://api.giphy.com/v1/gifs/translate?api_key=JKSrVspEC3mgbeJ3po49DYMShj9VMCjf&s=cats",
      { mode: "cors" }
    );
    response.json().then(function(response) {
      return response.data.images.original.url;
    });
  };

  return (
    <div className='row container mx-auto'>
      {props.isLandingPage === false
        ? props.weatherData.map(weatherObj => (
            <Weather
              key={Math.random()}
              fetchGif={fetchGif} //evt. unnötig
              weatherObj={weatherObj}
              isFahrenheit={isFahrenheit}
            />
          ))
        : null}
    </div>
  );
};

export default DisplayWeather;
