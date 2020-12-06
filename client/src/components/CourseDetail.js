import React ,{ Component } from "react"; // import React
import CourseDetailBtn from "./CourseDetailButtons"; // import the buttons components
import ReactMarkdown from "react-markdown";// import ReactMarkDown
class CourseDetail extends Component {
    
    constructor(){
        super()
        this.state = {
            course: {},//initially the course state to an object
            courseAuthorId : 0 //initial courseAuthId to empty string
        }
    }

    componentDidMount = ()=>{
        // Update all the course to data accordingly with ID 

        const {context} = this.props; // import context
        const id = parseInt(this.props.match.params.id); //convert params id to number with parseInt

        //call Data's getCourse()
        context.data.getCourse(id)
        .then(data =>{
            //if data return not equal to null
            if(data !== null){
            const targetCourse = data;
            if(targetCourse){
                //if responding course exist
                this.setState({
                    course: targetCourse,
                    courseAuthorId : targetCourse.authenticateUser.id
                });
                //if responding course not found
            }else{
                this.props.history.push('/notfound')
            }
        }else{
            //if it's null push to error
            this.props.history.push("/error")
        }
        })
        .catch(err =>{
            //render error component when catch error
            this.props.history.push('/error');
            console.log(err);
        })
    }

    render(){
        const {context} = this.props; // get Authorization User from Context
        const theAuthUser = context.authenticatedUser;

        //Destructed the course properties,title,description,estimatedTime,materialsNeeded and authenticateUser
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

        const id = this.props.match.params.id; // get current Id value

        let authId = "" // initial authId to empty string

        if(theAuthUser){
            //if authorization user id not null
            authId = theAuthUser.id; 
        }

        //Get courseAuthorId from state
        const {courseAuthorId}=this.state;

        //check user authorization 
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
                            <ReactMarkdown children={detail}/>
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
                                        <ReactMarkdown children={materials}/>
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