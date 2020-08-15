import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Jumbotron from './components/Jumbotron';

function App() {
  return (
    <Router>
      <header>
        <Nav />
        <Jumbotron>
          Welcome.
        </Jumbotron>
        <Footer />
      </header>
    </Router>
  );
}

export default App;
