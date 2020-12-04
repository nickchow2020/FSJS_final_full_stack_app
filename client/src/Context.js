import React,{Component} from "react";
import Data from "./Data";
import Cookies from "js-cookie";

const Context = React.createContext();

export class Provider extends Component{

    constructor(){
        super()
        this.data = new Data()
        this.state = {
            authenticatedUser: Cookies.getJSON("authenticatedUser") || null
        }
    }
    

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

    signOut = ()=>{
        this.setState({
            authenticatedUser: null
        })

        Cookies.remove("authenticatedUser");
        Cookies.remove("userpass");
    }

    createCourse = (course)=>{
        
        const newCourse = {
            ...course,
            userId : 3
        }   

        const {
            emailAddress:username
        } = this.state.authenticatedUser

        const password = atob(Cookies.get("userpass"))

        const addCourses = this.data.createCourse(newCourse,username,password)
        return addCourses
    }

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

    deleteCourse = (id)=>{
        const {
            emailAddress:username
        } = this.state.authenticatedUser

        const password = atob(Cookies.get("userpass"))

        this.data.deleteCourse(id,username,password)
    }

    render(){

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
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;


export default  (Component)=>{
    return  (props)=>{
        return(
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        )
    }
}