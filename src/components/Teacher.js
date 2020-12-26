import React from 'react'
import Clock from 'react-live-clock'
//import Moment from 'react-moment'
import "./Teacher.css"

export default function Teacher() {
    return (
        <div>
        <div className='row'>
        <div className='col-10'>
          <h1 style={{textAlign:"center"}} >Good Morning [User]</h1>
            </div>
            <div className="col-2 ml-auto">
            <h4>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Clock 
            format={'HH:mm:ss'} 
            ticking={true}
            />  </h4>
          
          &nbsp;<Clock 
            format={'dddd M MMM YYYY'} 
            ticking={true}
            />  
            </div>
            </div>


{/* Notices Card */}

<br/><br/>
<div className='row'>
<div className='col-lg-3'>
<div class="card border-primary mb-3" style={{maxWidth:"18rem"}}>
  <div class="card-header">Header</div>
  <div class="card-body text-primary">
    <h5 class="card-title">Primary card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
</div>

<div className='col-lg-3'>
<div class="card border-secondary mb-3" style={{maxWidth:"18rem"}}>
  <div class="card-header">Header</div>
  <div class="card-body text-secondary">
    <h5 class="card-title">Secondary card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
</div>

<div className='col-lg-3'>
<div class="card border-success mb-3" style={{maxWidth:"18rem"}}>
  <div class="card-header">Header</div>
  <div class="card-body text-success">
    <h5 class="card-title">Success card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
</div>

<div className='col-lg-3'>
<div class="card border-danger mb-3" style={{maxWidth:"18rem"}}>
  <div class="card-header">Header</div>
  <div class="card-body text-danger">
    <h5 class="card-title">Danger card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
</div>

<div className='col-lg-3'>
<div class="card border-warning mb-3" style={{maxWidth:"18rem"}}>
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Warning card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
</div>

<div className='col-lg-3'>
<div class="card border-info mb-3" style={{maxWidth:"18rem"}}>
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Info card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
</div>

<div className='col-lg-3'>
<div class="card border-light mb-3" style={{maxWidth:"18rem"}}>
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Light card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
</div>

<div className='col-lg-3'>
<div class="card border-dark mb-3" style={{maxWidth:"18rem"}}>
  <div class="card-header">Header</div>
  <div class="card-body text-dark">
    <h5 class="card-title">Dark card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
</div>

</div>

{/* Actions Card */}
<div className='row'>
<div className='col-3'></div>
<div className='col-2'>
             <div className="card text-white bg-primary mb-3" style={{maxWidth:"18rem"}}>
Attendance
  <div className="card-body">
    <img src="group.png" alt='' className='mx-auto d-block img1' style={{width:"50%"}} />
  </div>
</div>
</div>

<div className='col-2'>

<div className="card text-white bg-primary mb-3" style={{maxWidth:"18rem"}}>

<div className='row'>
<div className='col-6'>
Notice
</div>
<div className='col-2'>
  <i className="fas fa-minus-circle" alt="Delete Notice"></i>
  </div>
  <div className='col-2'>
  <i className="fas fa-pen"></i>
  </div>
  <div className='col-2'>
  <i className="fas fa-plus"></i>
  </div>
  </div>
  <div className="card-body">
  <img src="noticeboard.png" alt='' className='mx-auto d-block img2' style={{width:"50%"}} />
  </div>
</div>
</div>

<div className='col-2'>
<div className="card text-white bg-primary mb-3" style={{maxWidth:"18rem"}}>
  <div className="card-header">Teacher</div>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some text Here lorem </p>
  </div>
</div>
</div>
<div className='col-3'></div>
</div>

{/* <img src="edit-form.png" alt=""/> */}

        </div>
    )

}
   
    