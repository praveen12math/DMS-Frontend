import React from 'react'
import './Books.css'
import { Link } from 'react-router-dom';


const Books =  () => {
    return (
        <>


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
       <div className="col-lg-4">
        <div className="bookBlock" style={{backgroundColor: "#9dad7f", borderRadius: "0px 0px 25px 0px" }}>
        <div className="cardBody">
          <p className="text-white text-center mt-2">Introduction to Algorithm</p>
          <span className="ml-2">Author: Thomas H. Korman</span>
          <p className="ml-2">Publication: MC Grawals</p>
          <div className="text-center">
           <button className="btn btn-success mr-2 mb-2"><i className="fa fa-download" ></i></button>   
           <button className="btn btn-warning mb-2"><i className="fa fa-book" style={{color: "white"}} ></i></button>
          </div>  
        </div>
        </div>   
       </div>

       <div className="col-lg-4">
        <div className="bookBlock" style={{backgroundColor: "#9dad7f", borderRadius: "0px 0px 25px 0px" }}>
        <div className="cardBody">
          <p className="text-white text-center mt-2">Introduction to Algorithm</p>
          <span className="ml-2">Author: Thomas H. Korman</span>
          <p className="ml-2">Publication: MC Grawals</p>
          <div className="text-center">
           <button className="btn btn-success mr-2 mb-2"><i className="fa fa-download" ></i></button>   
           <button className="btn btn-warning mb-2"><i className="fa fa-book" style={{color: "white"}} ></i></button>
          </div>  
        </div>
        </div>   
       </div> <div className="col-lg-4">
        <div className="bookBlock" style={{backgroundColor: "#9dad7f", borderRadius: "0px 0px 25px 0px" }}>
        <div className="cardBody">
          <p className="text-white text-center mt-2">Introduction to Algorithm</p>
          <span className="ml-2">Author: Thomas H. Korman</span>
          <p className="ml-2">Publication: MC Grawals</p>
          <div className="text-center">
           <button className="btn btn-success mr-2 mb-2"><i className="fa fa-download" ></i></button>   
           <button className="btn btn-warning mb-2"><i className="fa fa-book" style={{color: "white"}} ></i></button>
          </div>  
        </div>
        </div>   
       </div> <div className="col-lg-4">
        <div className="bookBlock" style={{backgroundColor: "#9dad7f", borderRadius: "0px 0px 25px 0px" }}>
        <div className="cardBody">
          <p className="text-white text-center mt-2">Introduction to Algorithm</p>
          <span className="ml-2">Author: Thomas H. Korman</span>
          <p className="ml-2">Publication: MC Grawals</p>
          <div className="text-center">
           <button className="btn btn-success mr-2 mb-2"><i className="fa fa-download" ></i></button>   
           <button className="btn btn-warning mb-2"><i className="fa fa-book" style={{color: "white"}} ></i></button>
          </div>  
        </div>
        </div>   
       </div> <div className="col-lg-4">
        <div className="bookBlock" style={{backgroundColor: "#9dad7f", borderRadius: "0px 0px 25px 0px" }}>
        <div className="cardBody">
          <p className="text-white text-center mt-2">Introduction to Algorithm</p>
          <span className="ml-2">Author: Thomas H. Korman</span>
          <p className="ml-2">Publication: MC Grawals</p>
          <div className="text-center">
           <button className="btn btn-success mr-2 mb-2"><i className="fa fa-download" ></i></button>   
           <button className="btn btn-warning mb-2"><i className="fa fa-book" style={{color: "white"}} ></i></button>
          </div>  
        </div>
        </div>   
       </div> <div className="col-lg-4">
        <div className="bookBlock" style={{backgroundColor: "#9dad7f", borderRadius: "0px 0px 25px 0px" }}>
        <div className="cardBody">
          <p className="text-white text-center mt-2">Introduction to Algorithm</p>
          <span className="ml-2">Author: Thomas H. Korman</span>
          <p className="ml-2">Publication: MC Grawals</p>
          <div className="text-center">
           <button className="btn btn-success mr-2 mb-2"><i className="fa fa-download" ></i></button>   
           <button className="btn btn-warning mb-2"><i className="fa fa-book" style={{color: "white"}} ></i></button>
          </div>  
        </div>
        </div>   
       </div> <div className="col-lg-4">
        <div className="bookBlock" style={{backgroundColor: "#9dad7f", borderRadius: "0px 0px 25px 0px" }}>
        <div className="cardBody">
          <p className="text-white text-center mt-2">Introduction to Algorithm</p>
          <span className="ml-2">Author: Thomas H. Korman</span>
          <p className="ml-2">Publication: MC Grawals</p>
          <div className="text-center">
           <button className="btn btn-success mr-2 mb-2"><i className="fa fa-download" ></i></button>   
           <button className="btn btn-warning mb-2"><i className="fa fa-book" style={{color: "white"}} ></i></button>
          </div>  
        </div>
        </div>   
       </div> <div className="col-lg-4">
        <div className="bookBlock" style={{backgroundColor: "#9dad7f", borderRadius: "0px 0px 25px 0px" }}>
        <div className="cardBody">
          <p className="text-white text-center mt-2">Introduction to Algorithm</p>
          <span className="ml-2">Author: Thomas H. Korman</span>
          <p className="ml-2">Publication: MC Grawals</p>
          <div className="text-center">
           <button className="btn btn-success mr-2 mb-2"><i className="fa fa-download" ></i></button>   
           <button className="btn btn-warning mb-2"><i className="fa fa-book" style={{color: "white"}} ></i></button>
          </div>  
        </div>
        </div>   
       </div> <div className="col-lg-4">
        <div className="bookBlock" style={{backgroundColor: "#9dad7f", borderRadius: "0px 0px 25px 0px" }}>
        <div className="cardBody">
          <p className="text-white text-center mt-2">Introduction to Algorithm</p>
          <span className="ml-2">Author: Thomas H. Korman</span>
          <p className="ml-2">Publication: MC Grawals</p>
          <div className="text-center">
           <button className="btn btn-success mr-2 mb-2"><i className="fa fa-download" ></i></button>   
           <button className="btn btn-warning mb-2"><i className="fa fa-book" style={{color: "white"}} ></i></button>
          </div>  
        </div>
        </div>   
       </div>
         
   {/* Pagination goes here */}
         
         <div className="text-center">
         <button className="btn btn-success" > <i className="fa fa-arrow-left" ></i> </button> &nbsp;
         <button className="btn btn-success" > <i className="fa fa-arrow-right" ></i> </button>
          </div>

       <br/>    <br/><br/>
      </div>   
     </div>
       <br/>
        </>
    )
}

export default Books;