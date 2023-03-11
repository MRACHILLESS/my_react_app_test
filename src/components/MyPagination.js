import Pagination from '@mui/material/Pagination';
import React from 'react';




function MyPagination({setPages, numOfPages=10}) {
    const handlePageChange=(page)=>{
        setPages(page);
        window.scroll(0,0);
    };

    return (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
        }}>
            <Pagination
            count={numOfPages}
             onChange={(e)=> handlePageChange(e.target.textContent)}/>
        </div>
    );
}

export default MyPagination;