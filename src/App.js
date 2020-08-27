import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import './App.css';
import Home from './pages/Home'
import CurrentWeather from './pages/CurrentWeather'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />

          <Route path='/weather/:city' component={CurrentWeather} />


        </Switch>
      </div>
    </Router>
  );
}


export default App;
