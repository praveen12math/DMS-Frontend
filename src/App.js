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
    <Route component={PageNotFound} />

    </Switch>  
    </Router>

    </div>
  )
}
