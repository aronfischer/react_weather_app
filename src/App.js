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
      isLandingPage: true, //normalerweise true
      API_KEY: "640a389395b55ad1cc223b5e3c81729f",
      searchCity: "",
      weatherData: [],
      backgroundImgUrl: ""
    };

    this.fetchWeather = this.fetchWeather.bind(this);
    this.onSearchCityChange = this.onSearchCityChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.fetchBackgroundImg = this.fetchBackgroundImg.bind(this);
  }

  deleteItem(id) {
    this.state.weatherData.forEach(el => {
      if (el.id === id) {
        let index = this.state.weatherData.indexOf(el);
        this.state.weatherData.splice(index, 1);
        this.setState({
          weatherData: this.state.weatherData.filter(i => i !== index)
        });
      }
    });

    if (this.state.weatherData.length === 0) {
      this.setState({
        isLandingPage: true
      });
    }
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

  onSearchCityChange(searchCity) {
    this.setState({
      searchCity: searchCity.target.value
    });
  }

  handleSearch() {
    this.fetchWeather();
  }

  onSearchSubmit(e) {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  }

  async fetchBackgroundImg(searchTerm) {
    let response = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=d7bd6ff9a65e6750684a516dafd50350d806985ffb4a52979e97f6e0df5affa4&query=${searchTerm}`
    );
    let data = await response.json();

    console.log(data);

    this.setState({
      backgroundImgUrl: `${data.results[3].urls.full}`
    });
  }

  componentDidMount() {
    this.fetchBackgroundImg("weather");
  }

  render() {
    return (
      <Router>
        <div
          className='App'
          style={{ backgroundImage: `url("${this.state.backgroundImgUrl}")` }}
        >
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
                deleteItem={this.deleteItem}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
