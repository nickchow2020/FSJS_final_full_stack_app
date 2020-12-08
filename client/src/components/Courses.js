import React,{Component} from "react";
import {Link} from "react-router-dom";
import CourseTitle from "./CourseTitle";
import axios from "axios";

export default class Course extends Component{
    constructor(){
        super()
        //initial allCourses property to empty array
        this.state = {
            allCourses : []
        }
    }
    
    //get courses each time when course component is mounted
    componentDidMount = ()=>{
        axios.get("http://localhost:5000/api/courses/")
        .then(data =>{  
            this.setState({
                allCourses: data.data.allCourses
            })
        })//catch error
        .catch(err =>{
            this.props.history.push("/error")
            console.log(err)
        })
    }

    render(){
        //Retrieve all Courses Data from state
        const courses = this.state.allCourses || [];
        console.log(courses);
        return(
            <div className="bounds">  
                {
                    courses.map((data,index) => <CourseTitle course={data} key={index} />)
                }
                <div className="grid-33">
                    <Link className="course--module course--add--module" to="/courses/create" >
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                    </Link>
                </div>
            </div>
        )
    }
}