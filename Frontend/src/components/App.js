import React from 'react';
import './App.css';
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
      <div>         
      <Router>
        <Switch>
          <Route path="/" component={Home} />                 
        </Switch>
      </Router>
      </div>
      </header>
    </div>
  );
}

export default App;
