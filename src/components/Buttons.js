import React, {useEffect} from 'react';
import axios from 'axios';
import { Chip } from '@mui/material';

function Buttons({genres, setGenres, selectedGenres, setSelectedGenres,type,setPages}) {
    const apiKey=process.env.REACT_APP_API_KEY;

/*
    const  addButtons=(genre)=>{
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((i)=> i.id !== genre.id));
        setPages(1);
    };

    const removeButtons=(genre)=>{
        setSelectedGenres(
            selectedGenres.filter((selected)=>selected.id !==genre.id)
        );
        setGenres([...genres, genre]);
        setPages(1) ;
    };
    
*/

function  addButtons(item){
    setSelectedGenres([...selectedGenres, item]);
    setGenres(genres.filter((i)=> i.id !== item.id));
    setPages(1);
};

function removeButtons(item){
    setSelectedGenres(
        selectedGenres.filter((selected)=>selected.id !==item.id)
    );
    setGenres([...genres, item]);
    setPages(1) ;
};


    function getButtons(){          
        
        axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then((res)=>{         
            
           
            setGenres(res.data.genres)

            if (!res.data.genres) {
                return <div>Loading...</div>;
              }
            
        })
        .catch(err=>{
            console.log(err)
        })

        
    };


    useEffect(() => {
        getButtons();
      
      }, []);


    

   

    return (
        <div>

            {selectedGenres.map((item)=>(
                <Chip label={item.name}
                 style={{margin: '5px', }}  
                 size='small'
                 color='primary'
                 key={item.id}
                    clickable
                    onDelete={()=>removeButtons(item)}
                 />
            ))}
            {genres?.map((item)=>(
                <Chip label={item.name}
                key={item.id} 
                 style={{margin: '5px', }} 
                 color= 'primary' 
                 size='small'
                 clickable
                 onClick={()=>addButtons(item)}/>
            ))}
        </div>
    );
}

export default Buttons;