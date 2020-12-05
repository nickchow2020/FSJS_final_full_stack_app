import React,{Component}from "react";
import {Link} from 'react-router-dom';

class UserSignIn extends Component{

    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            errors: [],
            hasAuth: false
        }
    }

    //handle cancel function
    cancel = ()=>{
        this.props.history.push("/")
    }

    //handle submit function
    submit = (e)=>{
        e.preventDefault();
        const {context} = this.props;
        const {username,password} = this.state; 
        //redirect it back to it's previous route
        const {from} = this.props.location.state || {from : {pathname:"/"}};

        //call signIn method
        context.actions.signIn(username,password)
        .then(data =>{
            //push it back to previous course
                if(data !== null){
                    this.props.history.push(from)
                }else{
                    this.setState({
                        hasAuth: !this.state.hasAuth
                    })
                }
            })
        .catch(err =>{
            //push it back to error routes
            this.props.history.push("/error")
            console.log(err)
        })
    }

    //update states value
    change = (e)=>{
        const name = e.target.name;
        const value = e.target.value;   

        this.setState({
            [name]:value
        })
    }

    render(){

        //destruct the username and pass from state
        const {
            username,
            password
        } = this.state

        const {hasAuth} = this.state

        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form onSubmit={this.submit}>
                        <div className="validation-errors">
                        {
                            hasAuth ? <ul><li className="validationError">Password or UserSignIn incorrect</li></ul> : null
                        }
                            
                        </div>
                            <div>
                                <input id="emailAddress" name="username" type="text" placeholder="Email Address" onChange={this.change} value={username}/>
                            </div>
                            <div>
                                <input id="password" name="password" type="password" placeholder="Password" onChange={this.change} value={password}/>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <button className="button button-secondary" type="button" onClick={this.cancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to='/signUp'>Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }
}

export default UserSignIn