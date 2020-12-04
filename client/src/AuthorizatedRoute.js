import React from "react";
import {Route,Redirect} from "react-router-dom";
import { Consumer } from "./Context";

const PrivideRoute = ({component:Component,...rest})=>{
    return(
        //Add Consumer to the Private Route
        <Consumer>
            {
                context =>(
                    <Route 
                        {...rest}
                        render={props => context.authenticatedUser ? (
                            <Component {...props} />
                        ):(
                            <Redirect to={{
                                pathname: '/signin',
                                state: { from:props.location }
                            }} />
                        )}
                    />
                )
                
            }
        </Consumer>
    )
}

export default PrivideRoute;
