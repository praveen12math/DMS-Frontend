import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { addLeave, getAllTeacherName, getStudentLeave, removeLeave } from '../auth/Controller';
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

export default function StudentLeave() {

  var userD = JSON.parse(localStorage.getItem("jwt"))
  var userD2 = JSON.parse(localStorage.getItem("jwt"))
  const userId = userD.user._id
  const [allTeacherName, setAllTeacherName] = useState([])
  userD = userD.token

  const [studentLeave, setStudentLeave] = useState([])
  
  const [values, setValues] = useState({
    name: userD2.user.name,
    rollno: userD2.user.rollno,
    cordinator: "",
    subject: "",
    description: ""
  })

  const {name, rollno, cordinator, subject, description} = values

  const hanndleChange = name => event => {
    setValues({...values, [name]:event.target.value})
  }


  const onSubmit = event => {
    event.preventDefault()
    addLeave({name, rollno, cordinator, subject, description, userD, userId})
    .then(data => {
      if(data.error){
        return toast("Something went wrong", {type:"danger"})
      }
      
      if(data.err){
        return swal({title:data.err, icon:"error"})
      }

      swal({title:data.message, icon:"success"})
      getNotice(userId, userD)

      setValues({...values, 
        cordinator: "",
        subject: "",
        description: ""})
   })

  }


  const getNotice = (userId, userD) => {
    getStudentLeave({userId, userD})
    .then(data => {
      if(!data){
        return toast("Somthing went wrong", {type: "error"})
      }
      setStudentLeave(data)
    })
  }

  useEffect(() => {
    getNotice(userId, userD)

      getAllTeacherName()
      .then(res => {
        setAllTeacherName(res)
      })
  },[userId, userD])


  const onDelete = (id) => {
    const token = userD
    removeLeave({token, id})
    .then(res => {
      if(res.error){
        return swal({title:"Something went wrong", icon:"error"})
      }
      swal({title:"Application Deleted", icon:"success"})
      getNotice(userId, userD)
    })
}

    return (
        <div>
           
           <ToastContainer />
           <div className="row">

           <div className="col-lg-4" style={{backgroundColor: "#2E2F7E"}}>
           <h3 className="text-center text-white mt-2" >History</h3>
           <br/><br/>
           {studentLeave[0] == null?
           <h1 className="text-white">Nothing to display, applied leave application and status will be updated here.</h1> 
           :
           <>
           {studentLeave.map(leave => (

             <div class="card border-light mb-3 bg-transparent text-white">
  <div class="card-header bg-white text-dark">{leave.status === "Pending"?
   <span className="text-warning"><b><i class="fas fa-exclamation-circle"></i> Pending</b></span>
   : leave.status === "Reject"? <span className="text-danger"><b><i class="fas fa-times-circle"></i> Rejected</b></span>
   : leave.status === "Accept"? <span className="text-success"><b><i class="fas fa-check-circle"></i> Accepted</b></span> : ""
   }  
   <span className="float-right">
   <b>Updated At: {new Date(`${leave.updatedAt}`).toLocaleString()}</b>
   </span>
   </div>
  <div class="card-body">
    <h5 class="card-title">Subject: <b>{leave.subject}</b>
    <span className="float-right" style={{ cursor:"pointer"}}><i className="fas fa-trash text-danger float-right" style={{fontSize:"150%"}} 
     onClick={()=> onDelete(leave._id)}
    ></i>
    </span>
    </h5>
    <b>Created At: {new Date(`${leave.createdAt}`).toLocaleString()}</b>
    <p class="card-text">Cordinator: {leave.cordinator}<br/>
    {leave.description}</p>
  </div>
</div>
           ))}
           </>
           }
                    
           </div>

            <div className="col-lg-8" style={{backgroundColor: "white"}}>
         <div className="crossButton">
         <Link to="/student" className="fa fa-times" style={{textDecoration: "none"}}></Link>  
         </div>
      
     

         <h3 className="text-center mt-3">Request for leave</h3> <br/><br/>

         <form>
  <div className="row">
  
  </div> <br/>

  <div className="row">

    <div className="col">
    <label>Cordinator</label>
    <select className="form-select form-control" aria-label="Default select example"
        value={cordinator}
        onChange={hanndleChange("cordinator")}
>
  <option selected>Select Teacher</option>
  {allTeacherName.map(name => (
    <option value={name}>{name}</option>
  ))}
</select>
      {/* <input type="text" className="form-control"
        value={cordinator}
        onChange={hanndleChange("cordinator")}
      /> */}
    </div>
  </div> <br/>
   
   <div className="row">
   <div className="col">
   <label>Subject</label><br/>
  <textarea className="form-control" rows="2"  style={{width: "100%"}}
    onChange={hanndleChange("subject")}
    value={subject}
  />
  </div>
   </div>
    <br/>

  <div className="row">
  <div className="col">
  <label>Application body</label><br/>
  <textarea className="form-control" rows="5"  style={{width: "100%"}}
    onChange={hanndleChange("description")}
    value={description}
  />
 
  </div>  
  </div>
   <br/>

  <div className="text-center"> 
  <button className="btn btn-danger mt-3" onClick={onSubmit}>Apply for leave</button>
  </div>

</form>


            </div>   
           </div>
        </div>
    )
}
