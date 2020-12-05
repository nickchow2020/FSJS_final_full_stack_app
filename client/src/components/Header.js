import React from "react";
import {Link} from "react-router-dom";

const app = (props)=> {
    const {context} = props;

    //get authenticate from context
    const authUser = context.authenticatedUser;
    return(
    <div className="header">
        <div className="bounds">
            <h1 className="header--logo">Courses</h1>
            <nav>
                {
                    authUser ? 
                    <React.Fragment>
                        <span>Hi,there Welcome: {authUser.lastName}</span>
                        <Link className="signout" to="/signOut">Sign Out</Link>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Link className="signup" to="/signUp">Sign Up</Link>
                        <Link className="signin" to="/signIn">Sign In</Link>
                    </React.Fragment>
                }
            </nav>
        </div>
    </div>
    )
}

export default app