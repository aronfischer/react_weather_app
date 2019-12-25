import React, { useState, useEffect } from "react";

const Weather = props => {
  let WINDOW_HEIGHT = "500";
  let WINDOW_WIDTH = "1000";

  const [weatherImg, setWeatherImg] = useState("");
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const [temp, setTemp] = useState();
  const [cityImg, setCityImg] = useState();

  useEffect(() => {
    setTemp({
      main_temp:
        Math.round(
          ((props.weatherObj.main.temp - 273.15) * (9 / 5) + 32) * 100
        ) / 100,
      min_temp:
        Math.round(
          ((props.weatherObj.main.temp_min - 273.15) * (9 / 5) + 32) * 100
        ) / 100,
      max_temp:
        Math.round(
          ((props.weatherObj.main.temp_max - 273.15) * (9 / 5) + 32) * 100
        ) / 100
    });
  }, []);

  const changeToCelcius = () => {
    setIsFahrenheit(false);

    setTemp({
      main_temp: Math.round((props.weatherObj.main.temp - 273.15) * 100) / 100,
      min_temp:
        Math.round((props.weatherObj.main.temp_min - 273.15) * 100) / 100,
      max_temp:
        Math.round((props.weatherObj.main.temp_max - 273.15) * 100) / 100
    });
  };

  const changeToFahrenheit = () => {
    setIsFahrenheit(true);

    setTemp({
      main_temp:
        Math.round(
          ((props.weatherObj.main.temp - 273.15) * (9 / 5) + 32) * 100
        ) / 100,
      min_temp:
        Math.round(
          ((props.weatherObj.main.temp_min - 273.15) * (9 / 5) + 32) * 100
        ) / 100,
      max_temp:
        Math.round(
          ((props.weatherObj.main.temp_max - 273.15) * (9 / 5) + 32) * 100
        ) / 100
    });
  };

  const toggleCelcius = () => {
    if (isFahrenheit) {
      changeToCelcius();
    } else {
      changeToFahrenheit();
    }
  };

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

  const fetchCityPicture = async city => {
    let response = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=d7bd6ff9a65e6750684a516dafd50350d806985ffb4a52979e97f6e0df5affa4&query=${city}`
    );
    let data = await response.json();

    setCityImg(data.results[0].urls.small);
    console.log(data);
    console.log(city);
    console.log(data.results[0].urls.small);
  };

  useEffect(() => {
    fetchCityPicture(props.weatherObj.name);
  }, []);

  return (
    <div className='col-11 col-sm-5 col-md-4'>
      <div className='card af-rounded af-box-shadow mt-5 p-0 '>
        <div className='card-body af-rounded-top af-dark text-white'>
          <div
            className='af-delete'
            onClick={() => props.deleteItem(props.weatherObj.id)}
          >
            <i className='text-white far fa-trash-alt'></i>
          </div>
          <div className='af-city-name'>{props.weatherObj.name}</div>
          <div>{props.weatherObj.sys.country}</div>
        </div>
        <div className='card-header p-0 m-0 rounded-0 border-0'>
          <img
            src={`${cityImg}`}
            alt=''
            className='card-img-top rounded-0 border-0'
          />
        </div>
        <div className='card-img-overlay af-overlay mb-0'>
          {`${temp !== undefined ? temp.main_temp : null} ${
            isFahrenheit === true ? "°F" : "°C"
          }`}
        </div>
        <img
          src={weatherImg}
          alt=''
          className='card-img-overlay af-overlay-sign p-0 col-2 col-sm-3'
        />
        <span
          className='text-white card-img-overlay af-toggle-celsius'
          onClick={toggleCelcius}
        >
          {isFahrenheit === true ? "°C" : "°F"}
        </span>
        <div className='card-body af-dark text-white af-rounded-bottom'>
          <div className='row'>
            <div className='col-6'>
              Min / Max <br />
              {`${temp !== undefined ? temp.min_temp : null} ${
                isFahrenheit === true ? "°F" : "°C"
              } / ${temp !== undefined ? temp.max_temp : null} ${
                isFahrenheit === true ? "°F" : "°C"
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
