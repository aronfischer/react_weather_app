import React, { useState } from "react";

const Weather = props => {
  let WINDOW_HEIGHT = "500";
  let WINDOW_WIDTH = "1000";

  const [weatherImg, setWeatherImg] = useState("");

  const getWeatherCategory = (() => {
    if (weatherImg === "") {
      if (props.weatherObj.weather[0].main === "Rain") {
        setWeatherImg(
          "https://cdn.pixabay.com/photo/2019/10/06/22/46/umbrella-4531349_1280.png"
        );
      } else if (props.weatherObj.weather[0].main === "Clouds") {
        setWeatherImg(
          "https://cdn.pixabay.com/photo/2017/07/01/22/32/cloud-2462977_1280.png"
        );
      } else if (props.weatherObj.weather[0].main === "Sun") {
        setWeatherImg(
          "https://cdn.pixabay.com/photo/2013/11/28/11/29/sun-220186_1280.jpg"
        );
      }
    }
  })();

  return (
    <div className='col-11 col-sm-5 col-md-4'>
      <div className='card af-rounded af-box-shadow mt-5 p-0 '>
        <div className='card-body af-rounded-top af-dark text-white'>
          <div className='af-city-name'>{props.weatherObj.name}</div>
          <div>{props.weatherObj.sys.country}</div>
        </div>
        <div className='card-header p-0 m-0 rounded-0 border-0'>
          <img
            src={`https://unsplash.it/${WINDOW_WIDTH}/${WINDOW_HEIGHT}`}
            alt=''
            className='card-img-top rounded-0 border-0'
          />
        </div>
        <div className='card-img-overlay af-overlay'>
          {`${props.weatherObj.main.temp} ${
            props.isFahrenheit === true ? "°F" : "°C"
          }`}
        </div>
        <img
          src={weatherImg}
          alt=''
          className='card-img-overlay af-overlay-sign p-0 col-2 col-sm-3'
        />
        <div className='card-img-overlay'>°C</div>
        <div className='card-body af-dark text-white af-rounded-bottom'>
          <div className='row'>
            <div className='col-6'>
              Min / Max <br />
              {`${props.weatherObj.main.temp_min} ${
                props.isFahrenheit === true ? "°F" : "°C"
              } / ${props.weatherObj.main.temp_max} ${
                props.isFahrenheit === true ? "°F" : "°C"
              }`}
            </div>
            <div className='col-6'>
              Humidity <br /> {props.weatherObj.main.humidity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
