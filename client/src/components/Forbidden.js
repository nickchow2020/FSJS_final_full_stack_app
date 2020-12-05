import React from "react";
import {Link} from "react-router-dom";
const Forbidden = ()=>{
    return (
        <div class="bounds">
            <h1>Forbidden</h1>
            <p>Oh oh! You can't access this page.</p>
            <hr/>
            <Link className="button" to={`/`}>Go Back</Link>
        </div>
    )
}

export default Forbidden;