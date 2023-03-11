import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Trending from './pages/Trending';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Search from './pages/Search';
import MyBottomNavbar from './components/MyBottomNavbar';
import "./App.css";
import { Container } from '@mui/system';




function App(props) {
  return (
    <div>
      <Header/>
  
      <div className='myBody'> 
      <Container>
        <Switch>
          <Route exact path="/" component={Trending}/>
          <Route exact path="/movies" component={Movies}/>
          <Route exact path="/series" component={Series}/>
          <Route exact path="/search" component={Search}/>
        </Switch>
        </Container>
      
      </div> 
    
      
      
      
      <MyBottomNavbar/>
      

    </div>
  );
}

export default App;