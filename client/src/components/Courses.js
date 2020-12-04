import React,{Component} from "react"; 
import {Link} from "react-router-dom";
import CourseTitle from "./CourseTitle";
export default class Course extends Component{

    constructor(){
        super()
        this.state = {
            allCourses : []
        }

    }

    
    componentDidMount = ()=>{
        const {context} = this.props 

        //call getCourses() when component it mounted
        context.data.getCourses()
        .then(data =>{
            this.setState({
                allCourses: data
            })
        })//catch error
        .catch(err=>{
            this.props.history.push('/error');
            console.log(err);
        })
    }


    render(){
        //Retrieve all Courses Data from context
        const courses = this.state.allCourses
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