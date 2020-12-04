import React,{Component} from "react";
import Data from "./Data";
import Cookies from "js-cookie";

//Create Context
const Context = React.createContext(); 

export class Provider extends Component{

    constructor(){
        super()
        this.data = new Data()
        this.state = {
            //initial Auth USER  to null
            authenticatedUser: Cookies.getJSON("authenticatedUser") || null
        }
    }
    
    //USER Signin Method
    signIn = (username,password)=>{
        const user = this.data.getUser(username,password)
        .then(user =>{
            if(user !== null){
                this.setState({
                    authenticatedUser:user,
                    username,
                })

                const encryptedPass = btoa(password)
                Cookies.set("userpass",encryptedPass,{expires: 1})
                Cookies.set("authenticatedUser",JSON.stringify(user),{expires: 1})
            }
        })
        return user
    }

    //USER SignOut method
    signOut = ()=>{
        this.setState({
            authenticatedUser: null
        })

        Cookies.remove("authenticatedUser");
        Cookies.remove("userpass");
    }

    //CreateCourse Method
    createCourse = (course)=>{
        
        const newCourse = {
            ...course,
            userId : 3
        }   

        const {
            emailAddress:username
        } = this.state.authenticatedUser;

        const password = atob(Cookies.get("userpass"));

        const addCourses = this.data.createCourse(newCourse,username,password)
        return addCourses
    }

    //UpdateCourse Method
        updateCourse = async (id,data)=>{
        const {
            emailAddress:username
        } = this.state.authenticatedUser

        const password = atob(Cookies.get("userpass"))

        return await this.data.updateCourse(id,data,username,password)
        .then(data =>{
            return data
        })
    }

    //DeleteCourse method
    deleteCourse = (id)=>{
        const {
            emailAddress:username
        } = this.state.authenticatedUser

        const password = atob(Cookies.get("userpass"))

        this.data.deleteCourse(id,username,password)
        .catch(err =>{
            this.props.history.push("/error")
            console.log(err)
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


//Default Routes with createContext
export default  (Component)=>{
    return  (props)=>{
        return(
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        )
    }
}