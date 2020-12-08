import React,{Component}from "react" ;
import ValidationError from "./ValidationError";

class CreateCourse extends Component {
    constructor(){
        super()
        this.state = {
            title : "",
            description : "",
            estimatedTime : "",
            materialsNeeded : "",
            errors : []
        }
    }

    //Update the state value according to the input
    change = (e)=>{
        const name = e.target.name
        const value = e.target.value
        
        this.setState({
            [name]: value
        })
    }

    //cancel button that redirect it to home page
    cancel = ()=>{
        this.props.history.push('/');
    }

    //handle Submit function
    handleSubmit = (e)=>{
        e.preventDefault()

        const {context} = this.props

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state

        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded
        }

        context.actions.createCourse(course)
        .then( errors =>{
            if(errors.length > 0){
                this.setState({
                    errors
                })
            }else{
            this.props.history.push("/")
            }
        })
        .catch(err =>{
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

        const {errors} = this.state // get Errors from state

        const hasErrors = errors.length > 0; // if error occurs

        return(
        <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div >
            <form onSubmit={this.handleSubmit}>
            {//show error message if error occurs
                hasErrors ? <ValidationError errors={errors}/> : null
            }
                <div className="grid-66"> 
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div>
                            <input id="title" name="title" type="text" className="input-title course--title--input" onChange={this.change} value={title} placeholder="Course title..." />
                        </div>
                        <p>By Joe Smith</p>
                    </div>
                    <div className="course--description">
                        <div>
                            <textarea id="description" name="description" onChange={this.change} value={description} placeholder="Course description..."></textarea>
                        </div>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <div>
                                    <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" onChange={this.change} value={estimatedTime}
                                    placeholder="Hours" />
                                </div>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <div>
                                    <textarea id="materialsNeeded" name="materialsNeeded" className="" onChange={this.change} value={materialsNeeded} placeholder="List materials..."></textarea>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={this.cancel} type="button" >Cancel</button>
                </div>
            </form>
        </div>
        </div>
        )
    }
}

export default CreateCourse;