import React,{Component}from "react";

class DeleteCourse extends Component {
    constructor(){
        super()
        this.state = {
            title: "",
            deleteCourse : {}
        }
    }

    componentDidMount = ()=>{
        //convert id to number
        const id = parseInt(this.props.match.params.id)
        const {context} = this.props;

        //find the responded course data and updated it to this.state
        context.data.getCourses()
        .then(data => {
            const deleteCourse = data.find(data => data.id === id)
            this.setState({
                deleteCourse
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
        } = this.state.deleteCourse

        this.props.history.push(`/course/${id}`)
    }

    //handleSubmit function
    handleDelete = (e)=>{
        e.preventDefault();
        const {context} = this.props;

        const deleteTitle = this.state.title;//get title from state

        const {title,id} = this.state.deleteCourse; // get title and id from state deleteCourse

        if(deleteTitle === title){
            // if titles are match delete the course
            context.actions.deleteCourse(id)
            this.props.history.push('/')
        };
    }
    
    render(){

        const {
            title
        } = this.state

        //get title from deleteCourse in state
        const deleteCourseTitle = this.state.deleteCourse.title

        return(
            <div className="bounds course--detail">
                <h1>Warning!</h1>
                <p>This will delete the "test" course.Once it deleted,it <em>CANNOT</em> be recovered</p>
                <p>Please type he course title below to confirm the deletion.</p>
                <h3>Course Title :{deleteCourseTitle}</h3>

                <form onSubmit={this.handleDelete}>
                    <div>
                        <input name="title" placeholder="Enter Title to Confirm Delete" className="deleteFrom" value={title} onChange={this.change} />
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

