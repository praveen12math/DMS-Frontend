import React from 'react';
import Clock from 'react-live-clock'
import './Attendance.css'

const Attendance = () => {
    return (
        <>
        <div 
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
</div>

<div className='row fixed-bottom'>
<div className='col-3'></div>

<div className="col-lg-2 col-sm-6 block myblockAttendance">
     <i class="fas fa-plus" style={{fontSize:"700%", color:"#D8A928"}}></i>
         <p className="text-white text-center">Create Attendance</p>
        </div>

        <div className="col-lg-2 col-sm-6 block myblockAttendance">
     <i class="fas fa-eye" style={{fontSize:"700%", color:"#D8A928"}}></i>
         <p className="text-white text-center">See Attendance</p>
        </div>

        <div className="col-lg-2 col-sm-6 block myblockAttendance">
     <i class="fas fa-pencil-ruler" style={{fontSize:"700%", color:"#D8A928"}}></i>
         <p className="text-white text-center">Edit Attendance</p>
        </div>

<div className='col-3'></div>

        </div>
        </>
      );
}
 
export default Attendance;