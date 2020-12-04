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
        const id = parseInt(this.props.match.params.id)
        const {context} = this.props;

        context.data.getCourses()
        .then(data => {
            const deleteCourse = data.find(data => data.id === id)
            this.setState({
                deleteCourse
            })
        })
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

        const deleteTitle = this.state.title;

        const {title,id} = this.state.deleteCourse;


        if(deleteTitle === title){
            context.actions.deleteCourse(id)
            this.props.history.push('/')
        };
    }
    
    render(){

        const {
            title
        } = this.state

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
                        <button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default DeleteCourse

