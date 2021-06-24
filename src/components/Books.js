import React, { useEffect, useState } from 'react'
import {ToastContainer, toast} from "react-toastify"
import './Books.css'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { addBook, getAllBook, removeBook } from '../auth/Controller';
import firebase from 'firebase';
import {v4 as uuidv4} from "uuid"


const Books =  () => {

  const [allBook, setAllBook] = useState([])
  const [bookLink, setBookLink] = useState()

  const myjwt = JSON.parse(localStorage.getItem("jwt"))

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publication: ""
  })

  const {title, author, publication} = bookData

  const getBook = () => {
    getAllBook()
    .then(res => {
      setAllBook(res)
    })
  }

  useEffect(() => {
    getBook()
  },[])

var userD

if(!myjwt === null){
  userD = userD.token
}


const handleChange = name => event => {
  setBookData({...bookData, [name]:event.target.value})
}


  const onSubmit = event => {
    event.preventDefault()
    addBook({title, author, publication, bookLink})
    .then(data => {
       if(data.error){

        console.log(data.error);
         return toast("Something went wrong", {type:"danger"})
       }
      toast("Book added", {type:"success"})
    })
  }



  const handleBookFile = async(event) => {
    try {

      const files = event.target.files[0]
      const metadata = {
                contentType: files.type
      }

      const storageRef = await firebase.storage().ref()

      var uploadTask = storageRef.child("books/" + uuidv4()).put(files, metadata)

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
            .then(function (bookLink) {
              setBookLink(bookLink)
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
      removeBook({id, link})
      .then(res => {
        if(res.error){
          return toast("Somthing went wrong", {type:"error"})
        }
        toast("Book delete success", {type:"success"})
      })
  }








  

    return (
        <>
{myjwt === null? "" :
myjwt.user.role === 0? "" :
<>
     <i className="fas fa-plus float-right mr-3 mt-3" style={{fontSize:"500%", color:"#D8A928", cursor:"pointer"}}
      data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
         </>
}

<ToastContainer/>


<div className="portion1">
<Link to="/student" className="fa fa-arrow-left ml-2 mt-2 backArrow" ></Link>
<h1 className="text1">Book Ocean</h1>
            <br/><br/>


<div className="row">
<div className="col-lg-8 offset-lg-2">
<div className="input-group mb-3">
<input type="text" className="form-control" 
placeholder="Search from the ocean of books" 
aria-label="Recipient's username" aria-describedby="basic-addon2"/>
<div className="input-group-append">
<button className="btn btn-primary" type="button"> <i className="fa fa-search"></i></button>
</div>
</div>
</div> 
</div> <br/>

<div className="row w-100 stats">
        <div className="col-md-3">
            <div className="card border-info mx-sm-1 p-3">
                <div className="card border-info shadow text-info p-3 my-card" ><span className="fa fa-book" aria-hidden="true"></span></div>
                <div className="text-info text-center mt-3"><h4>Books</h4></div>
                <div className="text-info text-center mt-2"><h1>284</h1></div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="card border-success mx-sm-1 p-3">
                <div className="card border-success shadow text-success p-3 my-card"><span className="fa fa-user" aria-hidden="true"></span></div>
                <div className="text-success text-center mt-3"><h4>User</h4></div>
                <div className="text-success text-center mt-2"><h1>932</h1></div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="card border-danger mx-sm-1 p-3">
                <div className="card border-danger shadow text-danger p-3 my-card" ><span className="fa fa-download" aria-hidden="true"></span></div>
                <div className="text-danger text-center mt-3"><h4>Downloads</h4></div>
                <div className="text-danger text-center mt-2"><h1>1346</h1></div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="card border-warning mx-sm-1 p-3">
                <div className="card border-warning shadow text-warning p-3 my-card" ><span className="fa fa-eye" aria-hidden="true"></span></div>
                <div className="text-warning text-center mt-3"><h4>Reads</h4></div>
                <div className="text-warning text-center mt-2"><h1>2546</h1></div>
            </div>
        </div>
     </div>

 <div className="row">
 <div className="col-lg-8 offset-2">
 <p className="thought">
 "Reading is a good taste, not everyone have it."
 </p>
 </div>  
 </div>

 </div>
        

        
      
     <div className="container portion2"> <br/><br/>
      <div className="row">
      {allBook[0] == null? "" : <>
      {allBook.map(book => (
      
       <div className="col-lg-4">
       {myjwt === null? "" :
myjwt.user.role === 0? "" :
<>
<span className="float-right text-danger" style={{cursor:"pointer"}}><i class="fas fa-trash" 
onClick={() => onDelete(book._id, book.bookLink)}></i></span>
         </>
}
        <div className="bookBlock" style={{backgroundColor: "#9dad7f", borderRadius: "0px 0px 25px 0px" }}>
        <div className="cardBody">
          <p className="text-white text-center mt-2"><br/><b>{book.title}</b></p>
          <span className="ml-2">Author: {book.author}</span>
          <p className="ml-2">Publication: {book.publication}</p>
          <div className="text-center">
           <button className="btn btn-success mr-2 mb-2"><i className="fa fa-download" ></i></button>   
           <a href={book.bookLink} target="_blank"><button className="btn btn-warning mb-2"><i className="fa fa-book" style={{color: "white"}} ></i></button> </a>
          </div>  
        </div>
        </div>   
       </div>

      ))}
     </>  }

         
   {/* Pagination goes here */}
         
         {/* <div className="text-center">
         <button className="btn btn-success" > <i className="fa fa-arrow-left" ></i> </button> &nbsp;
         <button className="btn btn-success" > <i className="fa fa-arrow-right" ></i> </button>
          </div> */}

       <br/>    <br/><br/>
      </div>   
     </div>
       <br/>



       {/* Add new book modal */}


       <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog text-dark">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add new Book</h5>

      </div>
      <div className="modal-body">
      <input type="text" placeholder="Title of book" className="form-control"
      value={title}
      onChange={handleChange("title")}
      /><br/>
        <input type="text" placeholder="Author of book" className="form-control" 
        value={author}
        onChange={handleChange("author")}
        />
        <br/>
        <input type="text" placeholder="Publication" className="form-control" 
        value={publication}
        onChange={handleChange("publication")}
        />
<br/>
        <input type="file" className="form-control"
          onChange={(e) => handleBookFile(e)}
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

export default Books;