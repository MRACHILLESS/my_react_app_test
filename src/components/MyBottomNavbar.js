import React, {useState, useEffect, useRef} from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';
import {useHistory} from "react-router-dom"







//import { makeStyles } from '@material-ui/core/styles';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const history=useHistory()
 
  const handleChange=(event, newValue)=>{
    setValue(newValue)
  }
  
  useEffect(()=>{
    if(value===0) {
      return history.push("/");
    }    
    else if (value===1)  {
      return history.push('/movies');
    }
    else if (value===2)  {
      return history.push('/series');
    }
    else return history.push('/search')
    
  },[value, history])
  


  return (
    
    <Box boxShadow={[ '0px -18px 43px -11px black;']}
    sx={{ width: '100%',
    position: "fixed",
    bottom: 0,
    zIndex:4,
    
    
    
     }}>
      <BottomNavigation  style={{ height: '75px', backgroundColor:"#2F2F51", }}
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction  
        
        style={{ color:"white"}}
         label="Trending" 
         icon={<WhatshotIcon />} />
        <BottomNavigationAction  style={{ color:"white"}} label="Movies" icon={<MovieIcon  />} />
        <BottomNavigationAction style={{ color:"white"}} label="Series" icon={<LiveTvIcon />} />
        <BottomNavigationAction style={{ color:"white"}} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}