import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "../components/SingleInfo"
import SingleInfo from '../components/SingleInfo';
import MyPagination from '../components/MyPagination';


function Trending(props) {
    const [page, setPages]=useState([1]);
    const [info, setInfo]=useState([]);
    const [numOfPages, setNumOfPages]=useState();
    const apiKey=process.env.REACT_APP_API_KEY;
    //console.log(REACT_APP_API_KEY)

 /*
    const getTrendingInfo =async ()=>{
        const {data}= await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`);
        
        setInfo(data.results);
        setNumOfPages(data.results.total_pages);
        console.log(data.results.total_pages)
    }
  */
  

      function getTrendingInfo(){      
    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`)
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
        getTrendingInfo();
    }, [page]);
    

    return (
        <div>
           <h1 className='trending text-center'>Trending</h1>
        <div className='trending d-flex flex-wrap justify-content-around'>
           {
          info.map((i) => (
            <SingleInfo
              key={i.id}
              id={i.id}
              poster={i.poster_path}
              title={i.title || i.name}
              date={i.first_air_date || i.release_date}
              media_type={i.media_type}
              vote_average={i.vote_average}
            />
          ))}
          </div>
          <MyPagination setPages={setPages} numOfPages={numOfPages}/>          
            
        </div>
    );
}

export default Trending;