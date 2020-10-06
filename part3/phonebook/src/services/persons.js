import axios from 'axios'
const baseURL = 'https://stark-cliffs-82679.herokuapp.com/api/persons'

const getAll = ()=> {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}
const create = (newPerson) => {
    const request = axios.post(baseURL,newPerson)
    return request.then(response => response.data)
}
const del = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}
const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}
export default {getAll,create, del,update} 
