import React from 'react';

function Header(props) {
    return (

        <div className='header'>
            <header onClick={()=>window.scroll(0,0)} className="d-flex justify-content-center align-items-center">
                <span>🎥 intertainment hub 📽️ </span>
            </header>            
        </div>
    );
}

export default Header;