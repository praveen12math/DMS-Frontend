import React, { useEffect, useState } from 'react';
import {v4 as uuidv4} from "uuid"
import {ToastContainer, toast} from "react-toastify"
import firebase from 'firebase';
import 'react-toastify/dist/ReactToastify.css';
import { addAssignment, getAllAssignmentStudent } from '../auth/Controller';


const StudentAssignment = () => {

  const [studentAssignment, setStudentAssignment] = useState([])
    const [values, setValues] = useState({
        fileUrl: "",
        teacherName: "",
        title: "",
        rollNo: "",
        name: "",
        sem: "",
        sID: ""
    })

    const userD = JSON.parse(localStorage.getItem("jwt"))

    const {teacherName, title, sem } = values

    const handleChange = name => event => {
        setValues({...values, [name]:event.target.value})
    }


    const onSubmit = event => {
      event.preventDefault()
      addAssignment(values)
      .then(res => {
        if(res.error){
         toast("Somthing went wrong", {type: "error"})
        }
        toast("Assignment Submit success", {type:"success"})

        setValues({...values, 
                    fileUrl:"", 
                    rollNo:"", 
                    name: "", 
                    sID:"",
                    teacherName: "",
                    title: "",
                    sem: "",

                  })

      })
    }


    useEffect(()=> {

      function getData(){
        const id = userD.user._id
        const token = userD.token
      getAllAssignmentStudent({id, token})
      .then(res => {
        setStudentAssignment(res)
      })
    }

    getData()

    },[userD.user._id, userD.token])



    const handleFile = async(event) => {

        try {
    
          const files = event.target.files[0]
          const metadata = {
                    contentType: files.type
          }
    
          const storageRef = await firebase.storage().ref()
    
          var uploadTask = storageRef.child("assignment/" + uuidv4()).put(files, metadata)
    
          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
              var progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                  toast("Paused");
                  break;
                case firebase.storage.TaskState.RUNNING:
                  toast("Uploading");
                  break;
                default:
                  {}
              }
    
              if (progress === 100) {
                toast("Upload complete", { type: "success" });
              }
    
            },
            (error) => {
              toast("something went wrong in state changed", { type: "error" });
            },
            () => {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (imageLink) {
                 setValues({...values, fileUrl:imageLink, rollNo:userD.user.rollno, name: userD.user.name, sID:userD.user._id})
                })
                .catch((err) =>
                  toast("somthing error in showing image", { type: "error" })
                );
            }
          )
          
        } catch (error) {
          console.log(error);
        }
      }

      



    return ( 
        <>
        
<ToastContainer/>

<div className="row">
<div className="col"></div>
<div className="col">
  <i class="fas fa-folder-plus text-warning float-right mr-3 mt-3" 
      style={{fontSize:"500%", cursor:"pointer"}} 
      data-bs-toggle="modal" data-bs-target="#exampleModal"
  ><p className="text-white" style={{fontSize:"30%"}}>Post an Assignment</p></i>
  </div>
  </div>


  <div className="row mt-4">

{studentAssignment[0] == null?
<h1 className="text-white">Nothing to display, Submitted Assignment and status will be updated here.</h1> 
:
<>

{studentAssignment.map(assignment => (
  <div className="col-lg-4">
  <div class="card border-light mb-3 bg-transparent text-white">
  <div class="card-header bg-white text-dark">
     <span className="text-success"><b>Obtain: {assignment.grade} <span className="float-right">Max: 10</span></b></span>  
   <span className="float-right">
   {/* {new Date(`${leave.updatedAt}`).toLocaleString()} */}
   </span>
   </div>
  <div class="card-body">
    <h5 class="card-title">Title: {assignment.title} 
    <span className="float-right">
    <a href={assignment.fileUrl} target="_blank" rel="noreferrer"><i class="far fa-file-alt text-warning" style={{fontSize:"200%", cursor:"pointer"}}></i>
    </a></span></h5>    
    <p class="card-text">Teacher: {assignment.teacherName}</p>
    <p class="card-text">Teacher Advice: {assignment.advise}</p>
    <p class="card-text">Submit on: {new Date(`${assignment.createdAt}`).toLocaleString()}</p>
    <p class="card-text">Last Update on: {new Date(`${assignment.updatedAt}`).toLocaleString()}</p>
  </div>
</div>
</div>
    ))}
 
      </>
  }

  </div>








<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog text-dark">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Submit Assignment</h5>

      </div>
      <div className="modal-body">
      <input type="text" placeholder="Title" className="form-control"
      onChange={handleChange("title")}
      value={title}
      /><br/>

      <input type="text" placeholder="Semester" className="form-control"
      onChange={handleChange("sem")}
      value={sem}
      /><br/>


<input type="text" placeholder="Teacher Name" className="form-control"
onChange={handleChange("teacherName")}
value={teacherName}
      /><br/>

<input type="file" className="form-control" placeholder="Add File"
onChange={(e)=> handleFile(e)}
        />

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onSubmit}>Submit</button>
      </div>
    </div>
  </div>
</div>


        </>
     );
}
 
export default StudentAssignment;