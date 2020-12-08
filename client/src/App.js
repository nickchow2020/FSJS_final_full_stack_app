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
import NotFound from "./components/NotFound"; // import not found!
import UnhandledError from "./components/UnhandledError"; // import not found!
import Forbidden from "./components/Forbidden" // import Forbidden
import withContext from "./Context"; //import Context 
import PrivateRoute from "./AuthorizationRoute"; // import AuthorizationRoute

//All Component with Context
const CoursesWithContext = withContext(Courses); //Course component withContext
const CourseDetailWithContext = withContext(CourseDetail); //CourseDetail component withContext
const UserSignUpWithContext = withContext(UserSignUp); //UserSignUp component withContext
const UserSinInWithContext = withContext(UserSignIn);//UserSignIn component withContext
const CreateCourseWithContext = withContext(CreateCourse); //CreateCourse component withContext
const UpdateCourseWithContext = withContext(UpdateCourse); //UpdateCourse component withContext
const HeaderWithContext = withContext(Header); // Header component withContext
const UserSignOutWithContext = withContext(UserSignOut); // UserSignOut withContext
const DeleteCourseWithContext = withContext(DeleteCourse); // DeleteCourse withContext

//Set export default to a callback function
export default function App(){

  return (
    <Router>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/course/:id" component={CourseDetailWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signin" component={UserSinInWithContext} />
        <Route path='/signout' component={UserSignOutWithContext} />
        <Route path="/courses/:id/delete" component={DeleteCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <Route path="/notfound" component={NotFound} />
        <Route path="/forbidden" component={Forbidden}/>
        <Route path="/error" component={UnhandledError} />
        <Route component={NotFound}/>
      </Switch>
    </Router>
  )
}


