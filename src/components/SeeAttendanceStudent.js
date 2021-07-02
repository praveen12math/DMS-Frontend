import React, { useEffect, useState } from 'react';
import { seeAttendanceStudent } from '../auth/Controller';
import { Doughnut } from 'react-chartjs-2';
import {Link} from "react-router-dom"

const SeeAttendanceStudent = (params) => {

  const myjwt = JSON.parse(localStorage.getItem("jwt"))

     const rollno = myjwt.user.rollno
     const [myData, setMyData] = useState([])


    const seeAttendance = (rollno, token) => {
      seeAttendanceStudent({rollno, token})
         .then(res => {
             setMyData(res)
         })
    }

     useEffect(() => {
      seeAttendance(rollno, myjwt.token)
     },[rollno, myjwt.token])




    return ( 
    <div className="text-white">
    <Link to="/student" className="fa fa-arrow-left ml-2 mt-2 backArrow" />
    <div className="container">
        <h1 className="text-white">Attendance Student</h1>
            {myData.map(list => (
    <>
    {list.attendance.map(myData => (
        <>
    {myData.rollno === rollno?
    <>
    <div className="row mt-5">
        <div className="col-lg-6">
        
        <h4>Subject: {list.subject}</h4>
        <h4>Rollno: {myData.rollno}</h4>
        <h4>Total Class: {list.times}</h4>
        <h4>Attendance: {myData.value/list.times*100}%</h4>
        </div>

        <div className="col-lg-6">
        <Doughnut data={{
        labels: ['Absent','Present'],
        datasets: [
          {
            label: '# of Votes',
            data: [list.times-myData.value, myData.value],
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(75, 192, 192)',
            ],
            borderColor: [
              'rgba(255, 99, 132)',
              'rgba(75, 192, 192)',
            ],
            borderWidth: 1,
          },
        ],
      }} width={400} height={400} options={{ maintainAspectRatio: false ,responsive:false }} />
        </div>
    </div>
      </>
            :""}
        </>
    ))}
    </>
))} 

          
            </div>
            </div>
     );
}
 
export default SeeAttendanceStudent;