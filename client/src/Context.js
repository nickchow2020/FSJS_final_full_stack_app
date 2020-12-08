import React,{Component} from "react";
import Data from "./Data";
import Cookies from "js-cookie";

//Create Context
const Context = React.createContext(); 

//create Provider Component
export class Provider extends Component{

    constructor(){
        super()
        this.data = new Data() // call Data Class
        this.state = {
            //initial Auth USER  to null
            authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
            delete: true
        }
    }
    
    //USER Signin Method
    signIn = (username,password)=>{
        //CALL Data's getUser() method
        const user = this.data.getUser(username,password)
        .then(user =>{
            //Update state property authenticatedUser with authorization User Info
            if(user !== null){
                this.setState({
                    authenticatedUser:user,
                })

                const encryptedPass = btoa(password) // encrypted password
                Cookies.set("userpass",encryptedPass,{expires: 1}) // store encrypted password into cookies
                Cookies.set("authenticatedUser",JSON.stringify(user),{expires: 1}) // store Authorization Data into Cookie
            }else{
                return user
            }
        })
        return user // return Promisee from getUser method
    }

    //USER SignOut method
    signOut = ()=>{
        this.setState({
            authenticatedUser: null // set state's authenticatedUser to null 
        })

        Cookies.remove("authenticatedUser"); // Remove Data from Cookie
        Cookies.remove("userpass"); // Remove Data from Cookie
    }

    //CreateCourse Method
    createCourse = (course)=>{
        
        //get authorization user id from state
        const userId = this.state.authenticatedUser.id;

        //store new data into object with spread operator and User Id value
        const newCourse = {
            ...course,
            userId 
        }   

        //Get Username from Authorization User
        const {
            emailAddress:username
        } = this.state.authenticatedUser;

        //Convert the pass from btoa to atob that retrieve it from cookie
        const password = atob(Cookies.get("userpass"));

        // call and return createCourse Promise
        const addCourses = this.data.createCourse(newCourse,username,password);
        return addCourses;
    }

    //UpdateCourse Method
        updateCourse = async (id,data)=>{
        const {
            //Get User Name
            emailAddress:username
        } = this.state.authenticatedUser

        //Decode Password from Cookies
        const password = atob(Cookies.get("userpass"))

        //Return updateCourse promise
        return await this.data.updateCourse(id,data,username,password)
        .then(data =>{
            return data
        })
    }

    //DeleteCourse method
    deleteCourse = (id,course)=>{
        const {//Get Username
            emailAddress:username
        } = this.state.authenticatedUser

        //Decode Password from Cookies
        const password = atob(Cookies.get("userpass"))

        //Call deleteCourse method
        this.data.deleteCourse(id,course,username,password)
        .then(data =>{
            if(data !== null){
                console.log("deleted!")
            }

        })
    }

    render(){

        //Pass value to Provider
        const value = {
            data: this.data,
            authenticatedUser: this.state.authenticatedUser,
            actions: {
                signIn : this.signIn,
                signOut : this.signOut,
                createCourse: this.createCourse,
                updateCourse: this.updateCourse,
                deleteCourse: this.deleteCourse,
            }
        }

        return(
            //Render Provider with value
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;


//Default Component with createContext
const FunctionConsumer =  (Component)=>{
    return  function (props){
        return(
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        )
    }
}

export default FunctionConsumer