import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "./react-browser-dom";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className='App'>
        <Route exact path='/' component={Home} />
      </div>
    </Router>
  );
}

export default App;
