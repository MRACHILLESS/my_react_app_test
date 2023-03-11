import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MyPagination from '../components/MyPagination';
import SingleInfo from '../components/SingleInfo';
import Buttons from '../components/Buttons';
import useGenre from '../components/hooks/useGenre';

function Movies(props) {
  const [page, setPages]=useState([1]);
  const [info, setInfo]=useState([]);
  const [numOfPages, setNumOfPages]=useState();
  const [genres, setGenres]=useState();
  const [selectedGenres, setSelectedGenres]=useState([]);

  const genreforUrl=useGenre(selectedGenres)
  const apiKey=process.env.REACT_APP_API_KEY;
  
  
  
  function getMovieInfo(){      
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforUrl}`)
    .then((res)=>{         
        
       
        setInfo(res.data.results);
        setNumOfPages(res.data.total_pages);
        //console.log(res.data.total_pages)
        //console.log(res.data)
    })
    .catch(err=>{
        console.log(err)
    })
};



useEffect(()=>{        
  getMovieInfo();
  
}, [page, genreforUrl]);
  
  
  return (     

        <div>

          <h2 className='movies text-center mb-3'  style={{textTransform: "uppercase"}}>Movies</h2> 

          <Buttons type='movie'          
          genres={genres}
          setGenres={setGenres}
          setPages={setPages}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          />


          <div className='trending d-flex flex-wrap justify-content-around'>
           {
          info.map((i) => (
            <SingleInfo
              key={i.id}
              id={i.id}
              poster={i.poster_path}
              title={i.title || i.name}
              date={i.first_air_date || i.release_date}
              media_type="movie"
              vote_average={i.vote_average}
              
            />
          ))}
          </div>
          <MyPagination setPages={setPages} numOfPages={numOfPages}/>  
        </div>
    );
}

export default Movies;