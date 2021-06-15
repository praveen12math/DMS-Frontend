import {API} from '../backend'



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

