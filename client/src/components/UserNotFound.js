import React from "react";
import {Link} from "react-router-dom";

const UserNotFound = ()=>{
    return(
        <div className="bounds">
            <h1>User Not Found</h1>
            <p>Sorry! User not found Please Try Enter a new User name and password</p>
            <hr />
            <Link className="button" to={`/signIn`}>Go Back</Link>
        </div>
    )
}

export default UserNotFound;