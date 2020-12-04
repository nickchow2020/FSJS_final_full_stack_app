import React from "react"
import {Link} from "react-router-dom";

const CourseDetailButtons = ({authUser,id})=>{
    return(
        <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100">
                { // Hide update Course if needed
                    authUser ?
                    <React.Fragment>
                        <span>
                            <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                            <Link className="button" to={`/courses/${id}/delete`}>Delete Course</Link>
                        </span>
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </React.Fragment>
                }
                </div>
            </div>
        </div>
    )
}

export default CourseDetailButtons;