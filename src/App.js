import React from 'react'
import Home from './components/Home';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Student from './components/Student';
import Teacher from './components/Teacher';
import Hod from './components/Hod';
import Attendance from './components/Attendance'
import Notice from './components/Notice'
import Account from './components/Account';
import PageNotFound from './components/PageNotFound';
import studentLeave from "./components/studentLeave";
import Books from './components/Books';
import LeaveResponseTeacher from './components/LeaveResponseTeacher';
import firebase from 'firebase';
import {firebaseConfig} from "./config/FirebaseConfig"
import TakeAttendance from './components/TakeAttendance';
import SeeAttendanceTeacher from './components/SeeAttendanceTeacher';
import SeeAttendanceStudent from './components/SeeAttendanceStudent';
import Paper from './components/Paper';


firebase.initializeApp(firebaseConfig)

export default function App() {
  return (
    <div>
      
    <Router>
    <Switch>

    <Route exact path="/" component={Home}/>
    <Route exact path="/student" component={Student}/>
    <Route exact path="/teacher" component={Teacher}/>
    <Route exact path="/hod" component={Hod}/>
    <Route exact path='/attendance' component={Attendance}/>
    <Route exact path='/notice' component={Notice} />
    <Route exact path='/account' component={Account} />
    <Route exact path='/studentLeave' component={studentLeave} />
    <Route exact path='/books' component={Books} />
    <Route exact path='/responseLeave' component={LeaveResponseTeacher} />
    <Route exact path="/takeAttendance" component={TakeAttendance}/>
    <Route exact path="/seeAttendanceTeacher" component={SeeAttendanceTeacher}/>
    <Route exact path="/seeAttendanceStudent" component={SeeAttendanceStudent}/>
    <Route exact path="/paper" component={Paper}/>
    <Route exact path="*" component={PageNotFound} />


    </Switch>  
    </Router>

    </div>
  )
}
