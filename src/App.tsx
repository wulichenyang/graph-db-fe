import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './assets/css/App.css';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import MainWrapper from './components/MainWrapper/MainWrapper'
import Home from './views/Home';
import About from './views/About';
import Topics from './views/Topics';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        <MainWrapper>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </MainWrapper>

        <Footer />
      </div>
    </Router>
  );
}


export default App;
