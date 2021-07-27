import {API} from '../backend'
import firebase from 'firebase';
import {ToastContainer, toast} from "react-toastify"


// DONE    NOTICE Section

//pull all notice
export const getAllNotice = userD => {
    return fetch(`${API}/getNotice`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userD.userD}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


//Add new notice
export const postNotice = notice => {
    return fetch(`${API}/postNotice` , {
        method: "POST",
        headers: {
             Authorization: `Bearer ${notice.userD}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(notice)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return console.log(err);
    })
}



//delete notice
export const removeNotice = id => {

    deleteNoticeImage(id.image)

    return fetch(`${API}/notice/${id.id}` ,{
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${id.userD}`,
            Accept: "application/json",
           "Content-Type": "application/json"
       },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return console.log(err);
    })
}


const deleteNoticeImage = async(imageLink) => {

    const imageRef = await firebase.storage().refFromURL(imageLink)
    imageRef.delete()
    .then(() => {
      toast("Notice file deleted ", {type:"success"})
    })
    .catch((err) => {
        toast("Uh-oh, an error occurred!", {type:"error"})
    })
  }



// DONE     LEAVE Section


//post leave request
export const addLeave = leave => {
    return fetch(`${API}/studentleave`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${leave.userD}`,
            Accept: "application/json",
           "Content-Type": "application/json"
        },
        body: JSON.stringify(leave)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return console.log(err);
    })
}



//get Student leave
export const getStudentLeave = id => {
    return fetch(`${API}/getAllNotice/${id.userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${id.userD}`,
            Accept: "application/json",
           "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return console.log(err);
    })
}

<ToastContainer/>

//get leave by Teacher name
export const getLeaveByTeacherName = name => {
    return fetch(`${API}/getLeaveByTeacher/${name.name}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${name.token}`,
            Accept: "application/json",
           "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return console.log(err);
    })
}



//accept leave
export const acceptLeaveRequest = id => {
    return fetch(`${API}/acceptResponse/${id.id}` , {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${id.auth.token}`,
            Accept: "application/json",
           "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return console.log(err);
    })
}



//reject leave
export const rejectLeaveRequest = id => {
    return fetch(`${API}/rejectResponse/${id.id}` , {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${id.auth.token}`,
            Accept: "application/json",
           "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return console.log(err);
    })
}

//Delete leave
export const removeLeave = data => {
    return fetch(`${API}/deleteLeave/${data.id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${data.token}`,
            Accept: "application/json",
           "Content-Type": "application/json"
        }
    })
    .then(res => {
        return res.json(res)
    })
    .catch(err => {
        console.log(err);
    })
}


// DONE    Book Section

export const getAllBook = () => {
    return fetch(`${API}/getAllBook`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return err
    })
}


export const addBook = book => {
    return fetch(`${API}/addBook`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return err
    })
}



export const removeBook = async(book) => {

    deleteBookFile(book.link)

    return fetch(`${API}/removeBook/${book.id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return err
    })
}


const deleteBookFile = async(bookLink) => {

    const bookRef = await firebase.storage().refFromURL(bookLink)
    bookRef.delete()
    .then(() => {
      toast("Book file deleted ", {type:"success"})
    })
    .catch((err) => {
        toast("Uh-oh, an error occurred!", {type:"error"})
    })
  }



//   DONE   Attendance Section

//Add new Module
export const addAttendanceModule = module  => {
    return fetch(`${API}/addAttendanceModule`, {
        method : "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(module)
    })
    .then(res => {
        return res.json(res)
    })
    .catch(err => {
        console.log(err);
    })
}

//Get attendance module by teacher
export const getAttendanceModule = teacher => {
    return fetch(`${API}/attendanceModule/${teacher.id}`, {
        method: "GET",
        headers:{
            Authorization: `Bearer ${teacher.token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        return res.json(res)
    })
    .catch(err => {
        console.log(err);
    })
}

//Remove Module by teacher
export const removeAttendanceModule = modalId => {
    return fetch(`${API}/removeModule/${modalId}`, {
        method: "DELETE"
    })
    .then(res => {
        return res.json(res)
    })
    .catch(err => {
        console.log(err);
    })
}

//Add new Attendance
export const addAttendance = data => {
    return fetch(`${API}/addAttendance/${data.id}`, {
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
       body: JSON.stringify(data)
    })
    .then(res => {
        return res.json(res)
    })
    .catch(err => {
        console.log(err);
    })
}


//See attendane By Student
export const seeAttendanceStudent = rollno => {
    return fetch(`${API}/getAttendanceStudent/${rollno.rollno}`, {
        method: "GET",
        headers:{
            Authorization: `Bearer ${rollno.token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        return res.json(res)
    })
    .catch(err => {
        console.log(err);
    })
}



// DONE Paper Section

export const getAllPaper = () => {
    return fetch(`${API}/getAllPaper`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return err
    })
}


export const addPaper = paper => {
    return fetch(`${API}/addPaper`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paper)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return err
    })
}



export const removePaper = async(paper) => {

    deletePaperFile(paper.link)

    return fetch(`${API}/removePaper/${paper.id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return err
    })
}


const deletePaperFile = async(paperLink) => {

    const paperRef = await firebase.storage().refFromURL(paperLink)
    paperRef.delete()
    .then(() => {
      toast("Paper file deleted ", {type:"success"})
    })
    .catch((err) => {
        toast("Uh-oh, an error occurred!", {type:"error"})
    })
  }


  //DONE:    Assignment Section

  //Add Assignment by Student
  
  export const addAssignment = assignemnt => {
      return fetch(`${API}/addAssignment`, {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify(assignemnt)
      })
      .then(res => {
          return res.json()
      })
      .catch(err => {
          return err
      })
  }


  //Get all Assignment of Student

  export const getAllAssignmentStudent = data => {
      return fetch(`${API}/getAssignmentOfStudent/${data.id}`, {
          method: "GET",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.token}`
          }
      })
      .then(res => {
            return res.json()
      })
      .catch(err => {
        return err
    })
  }


  //Get all Assignment by Teacher
  export const getAllAssignmentByTeacher = data => {

    return fetch(`${API}/getAssignmentByTeacher/${data.name}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`
        }
    })
    .then(res => {
          return res.json()
    })
    .catch(err => {
      return err
  })
  }


//Update Grade By Teacher
export const updateGradeByTeacher = data => {

    return fetch(`${API}/responseAssignment/${data.gradeId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.userD.token}`
        },
        body: JSON.stringify(data)
    })
    .then(res => {
          return res.json()
    })
    .catch(err => {
      return err
  })
}





export const removeAssignment = async(assignment) => {

    console.log(assignment.user.token);

    deleteAssignmentFile(assignment.link)

    return fetch(`${API}/removeAssignment/${assignment.id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${assignment.user.token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return err
    })
}


const deleteAssignmentFile = async(assignmentLink) => {

    const assignmentRef = await firebase.storage().refFromURL(assignmentLink)
    assignmentRef.delete()
    .then(() => {
      toast("Assignment file deleted ", {type:"success"})
    })
    .catch((err) => {
        toast("Uh-oh, an error occurred!", {type:"error"})
    })
  }


  //DONE   Get All teacher Name
  export const getAllTeacherName = () => {
      return fetch(`${API}/getAllTeacherName`, {
          method: "GET"
      })
      .then(response => {
        return response.json()
    })
    .catch(err => {
        return err
    })
  }


  // DONE  Password Recovery

  //request for password recovery
  export const requestForPasswordRecovery = email => {
      return fetch(`${API}/resetPassword`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(email)
      })
      .then(res => {
        return res.json()
    })
    .catch(err => {
    return err
})
  }

  export const resetPassword = data => {
      return fetch(`${API}/resetPassword/${data.token}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      .then(res => {
        return res.json()
    })
    .catch(err => {
    return err
})
  }


  //DONE  Add Teacher

export const addTeacher = data => {
    return fetch(`${API}/addTeacher`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`
        },

        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return err
    })
}


export const editTeacher = data => {
    return fetch(`${API}/editTeacher/${data.id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`
        },

        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return err
    })
}