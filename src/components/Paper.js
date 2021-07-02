import React, { useEffect, useState } from 'react'
import {ToastContainer, toast} from "react-toastify"
import './Books.css'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { addPaper, getAllPaper, removePaper } from '../auth/Controller';
import firebase from 'firebase';
import {v4 as uuidv4} from "uuid"


const Paper =  () => {

  const [allPaper, setAllPaper] = useState([])
  const [paperLink, setPaperLink] = useState()

  const myjwt = JSON.parse(localStorage.getItem("jwt"))

  const [paperData, setPaperData] = useState({
    subject: "",
    year: "",
    paperCode: ""
  })

  const {subject, year, paperCode} = paperData

  const getPaper = () => {
    getAllPaper()
    .then(res => {
        console.log(res)
      setAllPaper(res)
    })
  }

  useEffect(() => {
    getPaper()
  },[])


const handleChange = name => event => {
  setPaperData({...paperData, [name]:event.target.value})
}


  const onSubmit = event => {
    event.preventDefault()
    addPaper({subject, year, paperCode, paperLink})
    .then(data => {
       if(data.error){

        console.log(data.error);
         return toast("Something went wrong", {type:"danger"})
       }
      toast("Paper added", {type:"success"})
      getPaper()
    })
  }



  const handlePaperFile = async(event) => {
    try {

      const files = event.target.files[0]
      const metadata = {
                contentType: files.type
      }

      const storageRef = await firebase.storage().ref()

      var uploadTask = storageRef.child("paper/" + uuidv4()).put(files, metadata)

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          toast(progress+"%  Please don't click submit while 100% completing")

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
            .then(function (paperLink) {
              setPaperLink(paperLink)
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



  const onDelete = (id, link) => {
      removePaper({id, link})
      .then(res => {
        if(res.error){
          return toast("Somthing went wrong", {type:"error"})
        }
        toast("Paper delete success", {type:"success"})
        getPaper()
      })
  }


  

    return (
        <>
      <Link to="/student" className="fa fa-arrow-left ml-2 mt-2 backArrow" /> 
       <h1 className="text-white text-center">Old Papers</h1>
{myjwt === null? "" :
myjwt.user.role === 0? "" :
<>
     <i className="fas fa-plus float-right mr-3 mt-3" style={{fontSize:"500%", color:"#D8A928", cursor:"pointer"}}
      data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
         </>
}


<ToastContainer/>     
      
     <div className="container portion2"> <br/><br/>
       <div className="row">
      {allPaper.map(paper => (
      
       <div className="col-lg-4">
       {myjwt === null? "" :
myjwt.user.role === 0? "" :
<>
<span className="float-right text-danger" style={{cursor:"pointer"}}><i class="fas fa-trash" 
onClick={() => onDelete(paper._id, paper.paperLink)}></i></span>
         </>
}
        <div className="bookBlock" style={{backgroundColor: "#9dad7f", borderRadius: "0px 0px 25px 0px" }}>
        <div className="cardBody">
          <p className="text-white text-center mt-2"><br/><b>{paper.subject}</b></p>
          <span className="ml-2">Year: {paper.year}</span>
          <p className="ml-2">Paper Code: {paper.paperCode}</p>
          <div className="text-center">
           <button className="btn btn-success mr-2 mb-2"><i className="fa fa-download" ></i></button>   
           <a href={paper.paperLink} target="_blank" rel="noreferrer"><button className="btn btn-warning mb-2"><i className="fa fa-book" style={{color: "white"}} ></i></button> </a>
          </div>  
        </div>
        </div>   
       </div>

      ))}

        

       <br/>    <br/><br/>
      </div>  
     </div>
       <br/>



       {/* Add new book modal */}


       <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog text-dark">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add new Paper</h5>

      </div>
      <div className="modal-body">
      <input type="text" placeholder="Subject" className="form-control"
      value={subject}
      onChange={handleChange("subject")}
      /><br/>
        <input type="text" placeholder="Year" className="form-control" 
        value={year}
        onChange={handleChange("year")}
        />
        <br/>
        <input type="text" placeholder="Paper Code" className="form-control" 
        value={paperCode}
        onChange={handleChange("paperCode")}
        />
<br/>
        <input type="file" className="form-control"
          onChange={(e) => handlePaperFile(e)}
        />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={onSubmit}>Add</button>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default Paper;