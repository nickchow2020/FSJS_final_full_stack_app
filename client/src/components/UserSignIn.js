import React,{Component}from "react"

class UserSignIn extends Component{

    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            errors: []
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
        const {from} = this.props.location.state || {from : {pathname:"/"}};

        context.actions.signIn(username,password)
        .then(() =>{
                this.props.history.push(from)
            })
        .catch(err =>{
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

        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form onSubmit={this.submit}>
                            <div>
                                <input id="emailAddress" name="username" type="text" placeholder="Email Address" onChange={this.change} value={username}/>
                            </div>
                            <div>
                                <input id="password" name="password" type="password" placeholder="Password" onChange={this.change} value={password}/>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
                </div>
            </div>
        )
    }
}

export default UserSignIn