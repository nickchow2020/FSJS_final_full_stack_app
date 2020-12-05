import React,{Component} from "react" 
import {Link} from "react-router-dom"
import ValidationError from "./ValidationError";

class UserSignUp extends Component{
    constructor(){
        super() 
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            confirmPassword: "",
            errors: []
        }
    }

    cancelButton = ()=>{
        //method when the cancel button is on clicks
        this.props.history.push("/")
    };

    handleSubmit = (e)=>{
        //method when from is submit
        e.preventDefault()
        const {context} = this.props;

        const { 
            // get the value from the states
            firstName,
            lastName,
            emailAddress,
            password
            } = this.state

        const user = {
            // create an object from the state
            firstName,
            lastName,
            emailAddress,
            password
        }

        //call Data's createUser method
        context.data.createUser(user)

        //if validation error occurs
        .then(errors => {
            if(errors.length){
                this.setState({errors})
                console.log(errors)
            }else{
                //call signIn method
                context.actions.signIn(emailAddress,password)
                .then(()=>{
                    this.props.history.push('/')
                })
            }
        })
        .catch(err =>{
            //handle errors
            this.props.history.push("/error")
            console.log(err)
        })
    };

    onChange = (e)=>{
            //method that is going to update the user's info to component state
        const name = e.target.name
        const value = e.target.value
            //update the states
        this.setState({
            [name]:value
        })
    }

    render(){

        //destructed properties from this.state
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;

        //get errors array from this.state
        const {errors} = this.state;

        //check if the error occurs
        const hasErrors = errors.length > 0;


        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form onSubmit={this.handleSubmit} >
                            {
                                hasErrors ? <ValidationError errors={errors}/> : null
                            }
                            <div>
                                <input id="firstName" name="firstName" type="text" placeholder="First Name" onChange={this.onChange} value={firstName} />
                            </div>
                            <div>
                                <input id="lastName" name="lastName" type="text" placeholder="Last Name" onChange={this.onChange} value={lastName} />
                            </div>
                            <div>
                                <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" onChange={this.onChange} value={emailAddress} />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" placeholder="Password" onChange={this.onChange} value={password} />
                            </div>
                            <div>
                                <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={this.onChange} value={confirmPassword} />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <button className="button button-secondary" onClick={this.cancelButton}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="signIn">Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }
}

export default UserSignUp;