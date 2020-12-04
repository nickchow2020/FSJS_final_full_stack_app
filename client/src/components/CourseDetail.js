import React ,{ Component } from "react"; 
import CourseDetailBtn from "./CourseDetailButtons" // import the buttons components
import Reactmarkdown from "react-markdown";
class CourseDetail extends Component {
    
    constructor(){
        super()
        this.state = {
            course: {}, //initially the course state to an object
            courseAuthorId : ""
        }
    }

    componentDidMount = ()=>{
        // Update all the course to data accordingly with ID 

        const {context} = this.props;
        const id = parseInt(this.props.match.params.id);

        context.data.getCourses()
        .then(data =>{
            const targetCourse = data.find(data => data.id === id);
            this.setState({
                course: targetCourse,
                courseAuthorId : targetCourse.authenticateUser.id
            });
        })
    }

    render(){
        const {context} = this.props;
        const theAuthUser = context.authenticatedUser;
        //Destructed the course properteis,title,description,estimatedTime,materialsNeeded and authenticateUser
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            authenticateUser
        } = this.state.course;

        let author = authenticateUser || {} //initial the authenticateUser to a object
        let detail = description || "" // initial the description to an empty string
        let materials = materialsNeeded || "" // initial the materialsNeeded property to empty string

        const authorName = `${author.firstName} ${author.lastName}` //form the author's name.

        const id = this.props.match.params.id;

        let authId = ""

        if(theAuthUser){
            authId = theAuthUser.id;
        }

        const {courseAuthorId}=this.state;

        const authUser = authId === courseAuthorId;

        return(
            <React.Fragment>
                
                <CourseDetailBtn authUser={authUser} id={id}/>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{title}</h3>
                            <p>By {authorName}</p>
                        </div>
                        <div className="course--description">
                            <Reactmarkdown children={detail}/>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul> 
                                        <Reactmarkdown children={materials}/>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CourseDetail