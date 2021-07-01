import React, { useEffect, useState } from 'react';
//import Clock from 'react-live-clock'
import { Link} from 'react-router-dom';
import { addAttendanceModule, getAttendanceModule, removeAttendanceModule } from '../auth/Controller';
import './Attendance.css'

const Attendance = () => {

  const myjwt = JSON.parse(localStorage.getItem("jwt"))

  const [attendanceModule, setAttendaneModule] = useState([])
  const [moduleData, setModuleData] = useState({
    subject: "",
    startRollno: "",
    endRollno: "",
    lateralStart: 0,
    lateralEnd: 0,
    secondId: myjwt.user._id
  })

  const {subject, startRollno, endRollno, lateralStart, lateralEnd} = moduleData


  const handleChange = name => event => {
    setModuleData({...moduleData, [name]:event.target.value})
  }


  const onSubmitModule = () => {
    addAttendanceModule(moduleData)
    .then(
      getModule(myjwt.user._id)
    )
    .catch(err => {
      console.log("Error occured");
    })
  }

  const getModule = (id) => {
    getAttendanceModule(id)
    .then(res => {
      setAttendaneModule(res)
    })
  }

  useEffect(() => {
    getModule(myjwt.user._id)
  },[myjwt.user._id])



    const displayInput = (answer) => {      
        if (answer === "yes") {
      
          document.getElementById('lateralInput').style.display = "block";      
        } else if (answer === "no") {
      
          document.getElementById('lateralInput').style.display = "none";      
        }
      }


      const onRemoveModule = (modalId) => {
        removeAttendanceModule(modalId)
        .then(res => {
          console.log(res);
          getModule(myjwt.user._id)
        })
        .catch(err => {
          console.log("Something went wrong");
        })
      }

    return (
        <>

<div className='row mt-4'>
<div className='col'></div>

<div className="col-lg-2 col-sm-6 block myblockAttendance">
     <i className="fas fa-user-check" style={{fontSize:"400%", color:"#D8A928"}}></i>
         <p className="text-white text-center">Take Attendance</p>
        </div>

<div className="col-lg-2 col-sm-6 block myblockAttendance">
     <i className="fas fa-plus" style={{fontSize:"400%", color:"#D8A928"}} data-bs-toggle="modal" data-bs-target="#exampleModal" />
         <p className="text-white text-center">Create Attendance Module</p>
        </div>

        <div className="col-lg-2 col-sm-6 block myblockAttendance">
     <i className="fas fa-eye" style={{fontSize:"400%", color:"#D8A928"}}></i>
         <p className="text-white text-center">See Attendance</p>
        </div>

<div className='col'></div>

        </div>

<div className="row mt-5">
{attendanceModule.map(modle => (

<div className="col-lg-3 col-sm-12 mb-3">
  <div className="card border-info text-white h-100"
  style={{background:"transparent"}}
  >

  <div className="card-header text-center"><b>{modle.subject}</b>
  <i class="fas fa-trash float-right text-danger" style={{cursor:"pointer"}} 
    onClick={() => onRemoveModule(modle._id)}
  />
  </div>
  <div className="card-body">
    <h5 className="card-title">{modle.startRollno} - {modle.endRollno}</h5>
    {modle.lateralStart === 0 ? "" :
    <h5 className="card-title">Lateral: {modle.lateralStart} - {modle.lateralEnd}</h5>
    }
    <span><b>Total Class: {modle.times}</b></span>
  </div>

<div className="mx-auto">
  <Link className="text-center mb-2 mr-2" to={{pathname: "/takeAttendance", 
        params: {start: modle.startRollno, end: modle.endRollno, lateralStart: modle.lateralStart, 
        lateralEnd: modle.lateralEnd, subject: modle.subject, modalId: modle._id}}} >
        <button className="btn btn-info" >Take Attendance</button></Link>

        <Link className="ml-2"
        to={{pathname: "/seeAttendanceTeacher", 
        params: {attendance: modle.attendance, times: modle.times, subject: modle.subject}}}
        ><button className="btn btn-info">See Attendance</button></Link>
        </div>
</div>
</div>

))}

</div>



        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog text-dark">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Create new attendance modal</h5>

      </div>
      <div className="modal-body">
      <input type="text" placeholder="Subject Name" className="form-control"
      value={subject}
      onChange={handleChange("subject")}
      /><br/>

      <input type="text" placeholder="Starting Rollno" className="form-control"
      value={startRollno}
      onChange={handleChange("startRollno")}
      /><br/>

      <input type="text" placeholder="Ending Rollno" className="form-control"
      value={endRollno}
      onChange={handleChange("endRollno")}
      /><br/>

<h6>Lateral</h6>
<div className="form-check form-check-inline">
<label className="form-check-label" for="exampleRadios1">
    Yes &nbsp;
  </label>
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="yes" 
      onChange={() => displayInput("yes")}
  />
 
  <label className="form-check-label" for="exampleRadios2">
  &nbsp; No &nbsp;
  </label>
  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="no"
      onChange={() => displayInput("no")}
  />
</div>
<br/><br/>

<div id="lateralInput" style={{display:"none"}}>
      <input type="text" placeholder="Lateral Starting Rollno" className="form-control"
      value={lateralStart}
      onChange={handleChange("lateralStart")}
      /><br/>

      <input type="text" placeholder="Lateral Ending Rollno" className="form-control"
      value={lateralEnd}
      onChange={handleChange("lateralEnd")}
      /><br/>
      </div>

  
        
        {/* <div className="form-group">
    <label for="exampleFormControlSelect1">Example select</label>
    <select className="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div> */}

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={onSubmitModule}>Add</button>
      </div>
    </div>
  </div>
</div>





{/* <div 
style={{color:"#218F76", fontSize:"1100%",textAlign:"center"}}>
<Clock
format={'h : mm : ss A'}
ticking={true}
/>
</div>

<div
style={{color:"#218F76", fontSize:"500%",textAlign:"center"}}>
<Clock
format={'dddd DD MMM YYYY'}
ticking={true}
/>
</div> */}


        </>
      )
}

 
export default Attendance;

