import React from "react"
import {Link} from "react-router-dom"

const NotFound = ()=>{
    return (
        <div className="bounds">
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
            <hr />
            <Link className="button" to={`/`}>Go Back</Link>
        </div>
    )
}

export default NotFound;