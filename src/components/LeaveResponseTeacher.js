import React,{useEffect, useState} from 'react';
import { acceptLeaveRequest, rejectLeaveRequest, getLeaveByTeacherName } from '../auth/Controller';
import {ToastContainer, toast} from "react-toastify"
import {Link} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';

const LeaveResponseTeacher = () => {

    const [leaveData, setLeaveData] = useState([])

    const auth = JSON.parse(localStorage.getItem("jwt"))

    const fetchData = (auth) => {
        getLeaveByTeacherName(auth)
        .then(res => {
            setLeaveData(res)
        })
    }

    console.log(leaveData);

    useEffect(() => {

        const name = auth.user.name
            const token = auth.token

        const fetchMyData = (name, token) => {
            
            getLeaveByTeacherName({name, token})
            .then(res => {
                setLeaveData(res)
            })
        }

        fetchMyData(name, token)
    },[auth.user.name, auth.token])


    const onAccept = id => {
        acceptLeaveRequest({id, auth})
        .then(res => {
            if(!res){
                return toast("Somthing went wrong", {type:"error"})
            }
            fetchData(auth)
        })
    }

    const onReject = id => {
        rejectLeaveRequest({id, auth})
        .then(res => {
            if(!res){
                return toast("Somthing went wrong", {type:"error"})
            }
            fetchData(auth)
        })
    }

    

    return ( 
        <div style={{backgroundColor: "#2E2F7E", minHeight: "100vh" }}>
        <Link to="/student" className="fa fa-arrow-left ml-2 mt-2 backArrow" ></Link>
        <br/>
        <div className="container">
        <h1 className="text-white">Take Action</h1>

<div className="row">

<ToastContainer/>

{leaveData.map(leave => (
    leave.status === "Pending"?
    <div className="col-lg-4">
    <div className="card border-light mb-3 bg-transparent text-white">
  <div className="card-header bg-white text-warning"><b><i className="fas fa-exclamation-circle"/> {leave.status}  </b>
   <span className="float-right">
   <b>Updated At: {new Date(`${leave.updatedAt}`).toLocaleString()}</b>
   </span>
   </div>
  <div className="card-body">
  Name: {leave.name} <span className="float-right">Roll No: {leave.rollno}</span>
  Applied At: {new Date(`${leave.createdAt}`).toLocaleString()}
    <h5 className="card-title">Subject: {leave.subject}</h5>
    <p className="card-text">Description: {leave.description}</p>
  </div>
  <div className="card-footer">
    <button className="btn btn-danger mr-3"
            onClick={() => onReject(leave._id)} 
    ><b><i class="fas fa-times-circle"/> Reject </b></button> 
    <button className="btn btn-success ml-3"
            onClick={() => onAccept(leave._id)}
    ><b><i class="fas fa-check-circle"/> Accept </b> </button>
  </div>
</div>
</div>
:
""
))
}

</div>


<hr className="bg-white"/>

<h1 className="text-white">History Action</h1>


<div className="row">

    {leaveData.map(leave => (
        leave.status === "Pending" ? "" : 

        <div className="col-lg-4">
    <div className="card border-light mb-3 bg-transparent text-white">
  <div className="card-header bg-white"> {leave.status === "Accept"? <span className="text-success"><b><i class="fas fa-check-circle"/> Accepted</b></span>
  : <span className="text-danger"><b><i class="fas fa-times-circle"/> Rejected </b></span>}
   <span className="float-right text-dark">
   <b>Updated At: {new Date(`${leave.updatedAt}`).toLocaleString()}</b>
   </span>
   </div>
  <div className="card-body">
  Name: {leave.name} <span className="float-right">Roll No: {leave.rollno}</span>
  Applied At: {new Date(`${leave.createdAt}`).toLocaleString()}
    <h5 className="card-title">Subject: {leave.subject}</h5>
    <p className="card-text">{leave.description}</p>
  </div>
</div>
</div>

    ))}

</div>


        </div>
        </div>
     );
}
 
export default LeaveResponseTeacher;