import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import DisplayWeather from "./components/DisplayWeather";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLandingPage: false, //normalerweise true
      API_KEY: "640a389395b55ad1cc223b5e3c81729f",
      searchCity: "",
      weatherData: []
    };

    this.fetchWeather = this.fetchWeather.bind(this);
    this.onSearchCityChange = this.onSearchCityChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.displayWeather = this.displayWeather.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  async fetchWeather() {
    let response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.searchCity}&APPID=${this.state.API_KEY}`,
      { mode: "cors" }
    );

    const data = await response.json();

    if (this.state.isLandingPage) {
      this.setState({
        isLandingPage: false
      });
    }

    if (data) {
      this.setState({
        weatherData: this.state.weatherData.concat([data])
      });
    }
    console.log(data);
  }

  displayWeather() {
    console.log(this.state.weatherData);
    if (this.state.weatherData.weather[0].main === "Rain") {
      this.setState({
        weatherImg:
          "https://cdn.pixabay.com/photo/2019/10/06/22/46/umbrella-4531349_1280.png"
      });
    } else if (this.state.weatherData.weather[0].main === "Clouds") {
      this.setState({
        weatherImg:
          "https://cdn.pixabay.com/photo/2014/04/03/11/56/cloud-312648_1280.png"
      });
    } else if (this.state.weatherData.weather[0].main === "Sun") {
      this.setState({
        weatherImg:
          "https://cdn.pixabay.com/photo/2013/11/28/11/29/sun-220186_1280.jpg"
      });
    } else {
      console.log("other weather type");
    }
  }

  onSearchCityChange(searchCity) {
    this.setState({
      searchCity: searchCity.target.value
    });
  }

  handleSearch() {
    this.fetchWeather();
    // this.displayWeather();
  }

  onSearchSubmit(e) {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Route
            exact
            path='/'
            render={() => (
              <Home
                handleSearch={this.handleSearch}
                isLandingPage={this.state.isLandingPage}
                onSearchCityChange={this.onSearchCityChange}
                searchCity={this.state.searchCity}
                onSearchSubmit={this.onSearchSubmit}
              />
            )}
          />
          <Route
            path='/'
            render={() => (
              <DisplayWeather
                isLandingPage={this.state.isLandingPage}
                weatherData={this.state.weatherData}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
