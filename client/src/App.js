import React from "react"; // import React 
import {  //import BrowserRouter,Route and Switch From React
  BrowserRouter as Router,
  Route,
  Switch
}from "react-router-dom";
import Header from "./components/Header";//import Header component
import Courses from "./components/Courses"; // import Courses component
import CourseDetail from "./components/CourseDetail"; //import CourseDetail component
import UserSignUp from "./components/UserSignUp";// import UserSignUp component
import UserSignIn from "./components/UserSignIn" // import UserSignIn component
import CreateCourse from "./components/CreateCourse" // import UserSignIn component
import UpdateCourse from "./components/UpdateCourse" // import UpdateCourse component
import UserSignOut from "./components/UserSignOut" // import UserSignOut component
import DeleteCourse from './components/DeleteCourse' // import DeleteCourse component

import Authenticated from "./components/Authenticated" 

import withContext from "./Context";
import PrivideRoute from "./AuthorizatedRoute";

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSinInWithContext = withContext(UserSignIn);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);
const DeleteCourseWithContext = withContext(DeleteCourse)
//Set export default to a callback function
export default function App(){

  return (
    <Router>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/course/:id" component={CourseDetailWithContext} />
        <Route path="/signUp" component={UserSignUpWithContext} />
        <Route path="/signIn" component={UserSinInWithContext} />
        <Route path='/signOut' component={UserSignOutWithContext} />
        <Route path="/courses/:id/delete" component={DeleteCourseWithContext} />
        <PrivideRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <PrivideRoute path="/courses/create" component={CreateCourseWithContext} />
      </Switch>
    </Router>
  )

}


