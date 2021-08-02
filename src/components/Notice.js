import React,{useEffect, useState} from 'react';
import { getAllNotice, postNotice, removeNotice } from '../auth/Controller';
import {ToastContainer, toast} from "react-toastify"
import firebase from 'firebase';
import {v4 as uuidv4} from "uuid"
import {Link} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import './Notice.css'

const Notice = () => {

  const myjwt = JSON.parse(localStorage.getItem("jwt"))

  var userD = JSON.parse(localStorage.getItem("jwt"))
  userD = userD.token

  const [imageLink, setImageLink] = useState()

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
    postNotice({title, description, imageLink, userD})
    .then(data => {
       if(data.error){
         return toast("Something went wrong", {type:"danger"})
       }
      toast("Notice Posted", {type:"success"})
      callNotice(userD)

      setNoticeData({...noticeData, 
        title: "",
        description: ""
      })
    })
  }


  const onDelete = (id, image) => {
    removeNotice({id, image, userD})
    .then(data => {
      if(data.error){
        return toast("Something went wrong", {type:"danger"})
      }
     toast("Notice Deleted", {type:"success"})
     callNotice(userD)
   })
  }



  const handleImage = async(event) => {
    try {

      const files = event.target.files[0]
      const metadata = {
                contentType: files.type
      }

      const storageRef = await firebase.storage().ref()

      var uploadTask = storageRef.child("noticeImg/" + uuidv4()).put(files, metadata)

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          toast(progress+"%  Please don't submit while 100% completing")

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
              setImageLink(imageLink)
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


var kkdd = ""
  const getRandomString = () => {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 4; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    kkdd = result;
}





    return ( 
        <>
        <Link to="/student" className="fa fa-arrow-left ml-2 mt-2 backArrow bg-dark" ></Link>
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
  {getRandomString()}
  <div type="button" className="btn btn-block btn-info" data-toggle="collapse" data-target={`#${kkdd}`}>
  {myjwt.user.role === 0? "" :
  <span className="float-right"><i class="fas fa-trash" onClick={() => onDelete(notice._id, notice.imageLink)}></i></span>
  }
  {notice.title}</div>  
  <span className="float-right"> &nbsp;<b> | {new Date(`${notice.updatedAt}`).toLocaleString()}</b></span>
  <div id={`${kkdd}`} className="collapse">
  {notice.imageLink?
  <embed src={notice.imageLink} style={{height:"100vh", width:"100%"}}/>
  : ""}
  <br/>
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
        <input type="file" className="form-control" placeholder="Add Image"
          onChange={(e) => handleImage(e)}
        />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onSubmit}>Post</button>
      </div>
    </div>
  </div>
</div>

</div>

        </>
     );
}
 
export default Notice;