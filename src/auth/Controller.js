import {API} from '../backend'
import firebase from 'firebase';
import {ToastContainer, toast} from "react-toastify"


// DONE
//NOTICE

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



// DONE
// LEAVE


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
    return fetch(`${API}/getLeaveByTeacher/${name.user.name}`, {
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


// DONE
//Book Section

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



//   DONE
// Attendance

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
    return fetch(`${API}/attendanceModule/${teacher}`, {
        method: "GET",
        headers:{
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
    return fetch(`${API}/getAttendanceStudent/${rollno}`, {
        method: "GET"
    })
    .then(res => {
        return res.json(res)
    })
    .catch(err => {
        console.log(err);
    })
}