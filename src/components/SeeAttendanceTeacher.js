import React from 'react';
import {Link} from "react-router-dom"

const SeeAttendanceTeacher = (params) => {

    const attendance = params.location.params.attendance
    const times = params.location.params.times
    const subject = params.location.params.subject

    return ( 
        <div>
 <Link to="/attendance" className="fa fa-arrow-left ml-2 mt-2 backArrow" />
<h3 className="text-white"><b>Total Class: {times}</b>
<b className="ml-5">Class Name: {subject}</b>
</h3>
<table className="table table-dark table-hover">
    <thead>
        <tr>
            <th>RollNo</th>
            <th>Attendance</th>
            <th>Percentage</th>
        </tr>
    </thead>
    <tbody>
    {attendance.map(data => (
    <>
   <tr>
       <th>{data.rollno}</th>
       <th>{data.value}</th>
       <th>{(data.value/times*100).toFixed(2)}%</th>
   </tr>
</>
))}
    </tbody>
</table>

</div>
     );
}
 
export default SeeAttendanceTeacher;