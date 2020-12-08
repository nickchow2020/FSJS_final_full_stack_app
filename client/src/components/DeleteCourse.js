import React,{Component}from "react";
import Course from "./Courses";

class DeleteCourse extends Component {
    constructor(){
        super()
        this.state = {
            deleteTitle: "",
            title: "",
            description: "",
            estimatedTime:"",
            materialsNeeded:"",
            id:"",
        }
    }

    componentDidMount = ()=>{
        //convert id to number
        const id = parseInt(this.props.match.params.id)
        const {context} = this.props;

        //find the responded course data and updated it to this.state
        context.data.getCourses()
        .then(data => {
            console.log(data)
            const deleteCourse = data.find(data => data.id === id)
            console.log(deleteCourse)
            this.setState({
                title: deleteCourse.title,
                description: deleteCourse.description,
                estimatedTime : deleteCourse.estimatedTime,
                materialsNeeded : deleteCourse.materialsNeeded,
                id: deleteCourse.id
            })
        })//catch errors
        .catch(err =>{
            this.props.history.push("/error")
            console.log(err)
        })
    }

    //update the state course property
    change = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]:value
        })
    }

    //cancel and redirect it back to correct course
    cancel = ()=>{
        const {
            id
        } = this.state

        this.props.history.push(`/course/${id}`)
    }

    //handleSubmit function
    handleDelete = (e)=>{
        e.preventDefault();
        const {context} = this.props;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            id,
            deleteTitle
        } = this.state

        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            id
        }

        if(deleteTitle === title){
            // if titles are match delete the course
            context.actions.deleteCourse(id,course)
            this.props.history.push('/')
        };

        console.log(course)
        console.log(deleteTitle)
    }
    
    render(){

        const {
            deleteTitle
        } = this.state

        //get title from deleteCourse in state
        const deleteCourseTitle = this.state.title

        return(
            <div className="bounds course--detail">
                <h1>Warning!</h1>
                <p>This will delete the "test" course.Once it deleted,it <em>CANNOT</em> be recovered</p>
                <p>Please type he course title below to confirm the deletion.</p>
                <h3>Course Title :{deleteCourseTitle}</h3>

                <form onSubmit={this.handleDelete}>
                    <div>
                        <input name="deleteTitle" placeholder="Enter Title to Confirm Delete" className="deleteFrom" value={deleteTitle} onChange={this.change} />
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Delete Course</button>
                        <button className="button button-secondary" onClick={this.cancel} type="button">Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default DeleteCourse

