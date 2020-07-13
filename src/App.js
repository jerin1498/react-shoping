import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import { Route, Link, Switch } from 'react-router-dom';


const HatsPage = () => (
  <div>
    <h1>hate page</h1>
  </div>
)


function App() {
  return (
    <div>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/shop/hats' component={HatsPage}/>
    </div>
  );
}


export default App;
