import React from 'react';
import './App.css';
import ChatApp  from "./ChatApp";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
        <div>         
          <Router>
            <Switch>
              <Route path="/" component={ChatApp} />
            </Switch>
          </Router>
        </div>
      </header>
    </div>
  );
}

export default App;
