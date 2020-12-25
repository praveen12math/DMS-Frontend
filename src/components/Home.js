import React, {useState} from 'react'
import './Home.css'

export default function Home() {
    
  const[status,setStatus]=useState(true);
    
    return (
        <>
        <div id="header" className="header myBg">
        <div className="header-content">
            
        <div className="row">
        <div className="col-lg-6">
        <div style={{backgroundColor: "#dee0e6", height: "100vh", borderRadius: "0px 0px 180px 0px", border: "1px solid seagreen"}}>
        <p className="heading1">Department management System</p>
                     
        <div className="row">
        <div className="col-8 offset-2">

      

     {(status)?
     
        <div className="card">  
        <div className="row">
        <div className="div col-lg-10 offset-1">
        <form>
        <div className="form-group">
        <label className="mt-4">Name</label>
        <input 
        type="text" 
        className="form-control" 
        placeholder="Ex: Random Gupta"/>
        </div>

        <div className="form-group">
        <label>Email</label>
        <input 
        type="email" 
        className="form-control"
        placeholder="Ex: randomgupta@email.com"/>
        </div>

        <div className="form-group">
        <label>Roll Number</label>
        <input 
        type="text" 
        className="form-control" 
        placeholder="Ex: 175550"/>
        </div>

        <div class="form-group">
        <label for="exampleFormControlSelect1">Role</label>
        <select class="form-control" id="exampleFormControlSelect1">
        <option>Student</option>
        <option>HOD</option>
        <option>Teacher</option>
        </select>
        </div>



        <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>

        <div className="text-center mb-3">
        <button type="submit" class="btn btn-primary btn-block">Create an account</button>
        </div>  

       </form>   

       </div>    
      </div>
          
      </div>

     :
     
     <div className="card">  
        <div className="row">
        <div className="div col-lg-10 offset-1">
        <form>
        <div className="form-group">
        <label className="mt-4">Name</label>
        <input 
        type="text" 
        className="form-control" 
        placeholder="Ex: Random Gupta"/>
        </div>

        <div className="form-group">
        <label>Email</label>
        <input 
        type="email" 
        className="form-control"
        placeholder="Ex: randomgupta@email.com"/>
        </div>

        <div className="form-group">
        <label>Roll Number</label>
        <input 
        type="text" 
        className="form-control" 
        placeholder="Ex: 175550"/>
        </div>

        <div class="form-group">
        <label for="exampleFormControlSelect1">Role</label>
        <select class="form-control" id="exampleFormControlSelect1">
        <option>Student</option>
        <option>HOD</option>
        <option>Teacher</option>
        </select>
        </div>



        <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>

        <div className="text-center mb-3">
        <button type="submit" class="btn btn-success btn-block">Signin</button>
        </div>  

       </form>   

       </div>    
      </div>
          
      </div>

     }

      <br/>

                     <div className="card">
                     {(status)?
                        <p className="text1">Already a member? <strong onClick={() => setStatus(false)}>Signin</strong></p>                        
                     :
                     <p className="text1">Not a member? <strong onClick={() => setStatus(true)}>Signup</strong></p>                        
                     }
    
                     </div>
                     </div>    
                     </div>
                     
                    
                        </div>
                    </div> 
                    <div className="col-lg-6">
                        <div className="image-container">
                            <img className="image1" src="header-teamwork.svg" alt="alternative"/>
                        </div> 
                    </div> 
                </div> 
            
        </div> 
    </div>


        </>
    )
}
