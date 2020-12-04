import React from "react" ;
import {Link} from "react-router-dom";
const Error = ()=>{
    return (
        <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
            <hr />
            <Link className="button" to={`/`}>Go Back</Link>
        </div>
    )
}

export default Error;