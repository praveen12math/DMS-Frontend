import React from 'react'
import Home from './components/Home';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Student from './components/Student';
import Teacher from './components/Teacher';
import Hod from './components/Hod';

export default function App() {
  return (
    <div>
      
    <Router>
    <Switch>

    <Route exact path="/" component={Home}/>
    <Route exact path="/student" component={Student}/>
    <Route exact path="/teacher" component={Teacher}/>
    <Route exact path="/hod" component={Hod}/>


    </Switch>  
    </Router>

    </div>
  )
}
