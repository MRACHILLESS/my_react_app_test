/*import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

function Search(props) {
    const[type,setType]=useState(0);

    const darkTheme =createTheme({
        palette:{
            type: "dark",
            primary: {
                main: '#fff',
            },
        }
    })


    return (
        <div>
            <h2 className='search text-center mb-3'  style={{textTransform: "uppercase"}}>Search</h2> 
            <ThemeProvider theme={darkTheme}>
                <TextField
                style={{flex:1}}
                className="searchBox"
                label="Search"
                variant="filled"/>
            </ThemeProvider>
            

        </div>
    );
}

export default Search;*/

import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import SingleInfo from '../components/SingleInfo';
import MyPagination from '../components/MyPagination';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  
  input: {
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.common.dark,
    color: "white",
    borderRadius: '15px',
    width: "100%"
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    }  
},
    icon:{
        backgroundColor: "white",
        width: "50px",
        height: "50px",
        borderRadius:'5px'
    }
}));

function Search() {
  const[type,setType]=useState(0);
  const classes = useStyles();
  const[page, setPages]=useState(1);
  const[searchText, setSearchText]=useState();//""
  const[info, setInfo]=useState();
  const[numOfPages, setNumOfPages] =useState();
  const apiKey=process.env.REACT_APP_API_KEY;



  function searchMovieOrTv(){
    axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${apiKey}&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
    .then((res)=>{         
        
       
        setInfo(res.data.results);
        setNumOfPages(res.data.total_pages);
        console.log(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
  };

  useEffect(()=>{
    window.scroll(0,0);
    searchMovieOrTv();
  },[type, page]);




  return ( <div>
    <div className={classes.root}>
      <TextField
        variant="filled"
        placeholder="Search..."
        className={classes.input}
        style={{color:"white"}}
        onChange={(e)=>setSearchText(e.target.value)}
      />
      <IconButton className={classes.icon}>
        <SearchIcon />
      </IconButton>      
    </div>

    <Tabs className='my-4'
     value={type} 
     textColor='primary' 
     indicatorColor="primary"
     onChange={(e, newValue)=>{
        setType(newValue);
        setPages(1)
     }} >
          <Tab label="Search Movies" style={{width: '50%', color:"white"}} />
          <Tab label="Search TV Series" style={{width: '50%', color:"white"}} />
          
        </Tabs>

        <div className='trending d-flex flex-wrap justify-content-around'>
           {
          info?.map((i) => (
            <SingleInfo
              key={i.id}
              id={i.id}
              poster={i.poster_path}
              title={i.title || i.name}
              date={i.first_air_date || i.release_date}
              media_type={type? 'tv':'movie'}
              vote_average={i.vote_average}
            />
          ))}
            {searchText && !info &&(
                type ?  <h4>No Series found</h4> : <h4>No Movies Found</h4>
            )}
          </div>
          {numOfPages >1 &&(
            <MyPagination setPages={setPages} numOfPages={numOfPages}/> 
          )}   
          
          
    
  </div>
    
    
  );
}
export default Search;