import React from 'react';
import Trending from '../pages/Trending';
import {img_300, unavailable} from './links1';
import "./SingleInfo.css";
import {Badge} from "@material-ui/core";


function SingleInfo  ({id, title, poster, date, media_type, vote_average,})

{
    return (
        <div className='myCard'>
            <Badge overlap="rectangular" badgeContent={vote_average} color={vote_average>6?'primary':'secondary'}/>
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable}/>
            <h4 className='title'>{title}</h4>
            <div className="titleInner">
                {media_type==='tv'?'TV Series':'Movie'}
                <div className='date'>{date}</div>
            </div>
        </div>
    );
}

export default SingleInfo;