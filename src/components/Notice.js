import React,{useEffect, useState} from 'react';
import { getAllNotice, postNotice, removeNotice } from '../auth/Controller';
import {ToastContainer, toast} from "react-toastify"
import './Notice.css'
import 'react-toastify/dist/ReactToastify.css';

const Notice = () => {

  const myjwt = JSON.parse(localStorage.getItem("jwt"))

  var userD = JSON.parse(localStorage.getItem("jwt"))
  userD = userD.token

  const [noticeData, setNoticeData] = useState({
    title: "",
    description: ""
  })

  const {title, description} = noticeData

  const handleChange = name => event => {
    setNoticeData({...noticeData, [name]:event.target.value})
  }
  const [allNotice, setAllNotice] = useState([])

  const callNotice = (userD) => {
    getAllNotice({userD})
    .then(res => {
      setAllNotice(res)
    })
  }

  useEffect(() => {
    callNotice(userD)
  },[userD])


  const onSubmit = event => {
    event.preventDefault()
    postNotice({title, description, userD})
    .then(data => {
       if(data.error){
         return toast("Something went wrong", {type:"danger"})
       }
      toast("Notice Posted", {type:"success"})
      callNotice(userD)
    })
  }


  const onDelete = (id) => {
    removeNotice({id, userD})
    .then(data => {
      if(data.error){
        return toast("Something went wrong", {type:"danger"})
      }
     toast("Notice Deleted", {type:"success"})
     callNotice(userD)
   })
  }

    return ( 
        <>
<ToastContainer />
<div className='row'>
<div className='col-lg-10'></div>
<div className="col-lg-2 col-sm-6 block myblockAttendance float-right">
{myjwt.user.role === 0? "" :
<>
     <i className="fas fa-plus" style={{fontSize:"500%", color:"#D8A928"}} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
         <p className="text-white text-center">Create Notice</p>
         </>
}
        </div>
        </div>

         <div className="container text-white">
        {/*
        <div className='mb-5'>
  <div type="button" className="btn btn-block btn-info" data-toggle="collapse" data-target="#demo">Submit Exam form 2020-21 Odd Semester</div>
  <div id="demo" className="collapse">
  <br/>
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
  </div> */}

{allNotice.map(notice => (
  <>
  <div className='mb-4 mt-5'>
  <div type="button" className="btn btn-block btn-info" data-toggle="collapse" data-target="#demo2">
  {myjwt.user.role === 0? "" :
  <span className="float-right"><i class="fas fa-trash" onClick={() => onDelete(notice._id)}></i></span>
  }
  {notice.title}</div>  
  <span className="float-right">{new Date(`${notice.updatedAt}`).toLocaleString()}</span>
  <div id="demo2" className="collapse">
  {notice.description}
  </div>
  </div>
  </>
))}





<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog text-dark">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Post new notice</h5>

      </div>
      <div className="modal-body">
      <input type="text" placeholder="Title of notice" className="form-control"
        onChange={handleChange("title")}
        value={title}
      /><br/>
        <textarea placeholder="notice..." className="form-control" 
          onChange={handleChange("description")}
          value={description}
        />
<br/>
        <input type="file" className="form-control" placeholder="Add Image"/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={onSubmit}>Post</button>
      </div>
    </div>
  </div>
</div>

</div>

        </>
     );
}
 
export default Notice;