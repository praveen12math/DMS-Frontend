import React from 'react';
import './Notice.css'

const Notice = () => {
    return ( 
        <>

<div className='row'>
<div className='col-lg-10'></div>
<div className="col-lg-2 col-sm-6 block myblockAttendance float-right">
     <i className="fas fa-plus" style={{fontSize:"500%", color:"#D8A928"}}></i>
         <p className="text-white text-center">Create Notice</p>
        </div>
        </div>

        <div className="container text-white">
        
        <div className='mb-5'>
  <div type="button" class="btn btn-block btn-info" data-toggle="collapse" data-target="#demo">Submit Exam form 2020-21 Odd Semester</div>
  <div id="demo" class="collapse">
  IT IS TO NOTIFY ALL STUDENTS FOR ONLINE SUBMISSION OF
EXAMINATION FORM FOR ODD SEMESTER EXAMINATION
(DEC 2020).
STUDENTS ARE ADVISED TO GO TO THE WBUT WEBSITE <a href={'http://vbspuexams.com/'} target={"_blank"} rel="noreferrer">
www.vbspuexams.com </a>, FILL UP THE ONLINE EXAMINATION FORM
AND MAKE ONLINE SUBMISSION OF THE SAME. THEY ARE
ALSO ADVISED TO TAKE A PRINT OUT OF THE SUBMITTED
FILLED IN EXAMINATION FORM AND SUBMIT THE SAME
ALONG WITH THE EXAMINATION FEES OF Rs.2000/- (REGULAR)
AND Rs.600/- (BACKLOG)
  </div>
  </div>

<div className='mb-5'>
  <div type="button" class="btn btn-block btn-info" data-toggle="collapse" data-target="#demo1">Notice for Hosteler 25/10/2020</div>
  <div id="demo1" class="collapse">
  <img className='img-fluid mx-auto d-block' src="noticeHostel.jpeg" alt=''/>
  </div>
  </div>

  <div className='mb-5'>
  <div type="button" class="btn btn-block btn-info" data-toggle="collapse" data-target="#demo2">Notice for Scholarship 2020</div>
  <div id="demo2" class="collapse">
  <img className='img-fluid mx-auto d-block' src="scholarship.jpeg" alt=''/>
  </div>
  </div>

<div className='mb-5'>
  <div type="button" class="btn btn-block btn-info" data-toggle="collapse" data-target="#demo3">First Sessional Test Odd Semester Date Sheet 2020 </div>
  <div id="demo3" class="collapse">
  
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Subject</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">B.Tech CsE 3rd SEM</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">B.Tech CsE 5th SEM</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">B.Tech CsE 7th SEM</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>

  </div>
  </div>

</div>

        </>
     );
}
 
export default Notice;