import React,{Component} from "react" 
import ValidationError from "./ValidationError";
import axios from 'axios';

class UpdateCourse extends Component{
    constructor(){
        super()
        this.state = {
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: "",
            errors: []
        }
    }

    componentDidMount = ()=>{
        //get context
        const {context} = this.props

        //get authenticate user id
        const authID = context.authenticatedUser.id

        //call getCourses method

        const id = this.props.match.params.id;
        axios.get(`http://localhost:5000/api/courses/${id}`)
        .then(data =>{
            const course = data.data.course[0]
            if(course){
                //if course exist grab course properties
                const {
                    title,
                    description,
                    estimatedTime,
                    materialsNeeded,
                    authenticateUser
                } = course;
    
                //set state properties value
                this.setState({
                    title,
                    description,
                    estimatedTime,
                    materialsNeeded,
                })

                //get authenticated user id
                const courseCreatorId = authenticateUser.id

                //check if the course is own by user
                if(authID !== courseCreatorId){
                    this.props.history.push('/forbidden')
                }
                }else{
                    this.props.history.push('/notfound')
                }

        })// handle server error
        .catch(err =>{
            this.props.history.push("/error")
            console.log(err)
        })
    }

    //handle cancel button
    cancel = ()=>{
        const id = this.props.match.params.id;
        this.props.history.push(`/course/${id}`);
    }

    //update states value
    change = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]:value
        })
    }

    //handleSubmit function
    handleSubmit = (e)=>{
        e.preventDefault();

        //get context
        const {context} = this.props;

        // get course properties from state
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state

        //create a new properties object
        const data = {
            title,
            description,
            estimatedTime,
            materialsNeeded
        }

        //get current course id
        const id = this.props.match.params.id

        //call updateCourse method
        context.actions.updateCourse(id,data)
        .then(errors =>{
            //check the validation errors
            if(errors.length > 0){
                this.setState({
                    errors
                })
            }else{
                //push it's back to previous course when cancel
                this.props.history.push(`/course/${id}`)
            }
        })
        .catch(err =>{
            //handle error
            this.props.history.push("/error")
            console.log(err)
        })
    }

    render(){
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state


        const {
            errors
        } = this.state

        // if errors occurs
        const hasErrors = errors.length > 0 

        return(
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                    {
                        hasErrors ? <ValidationError errors={errors} /> : null
                    }
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.change} value={title}/>
                                </div>
                                <p>By Joe Smith</p>
                            </div>
                            <div className="course--description">
                                <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.change} value={description}></textarea></div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" onChange={this.change}
                                            placeholder="Hours" value={estimatedTime}/>
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded} onChange={this.change}></textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Update Course</button>
                            <button className="button button-secondary" onClick={this.cancel} type="button">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default UpdateCourse