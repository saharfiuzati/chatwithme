import React from 'react';
import './App.css';
import ChatApp  from "../ChatApp/ChatApp";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
          <Router>
            <Switch>
              <Route path="/" component={ChatApp} />
            </Switch>
          </Router>
    </div>
  );
}

export default App;
