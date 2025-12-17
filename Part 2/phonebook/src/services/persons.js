import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  return axios
    .post(baseUrl, newObject)    
    .then(response => {      
      console.log(response.data)
      return response.data
    });
}

const deletePersonRequest = id => {
  return axios
    .delete(`${baseUrl}/${id}`)    
    .then(response => {      
      console.log(response.data)
      return response.data
    });
}

const update = newObject => {
  return axios
    .put(`${baseUrl}/${newObject.id}`, newObject)    
    .then(response => {      
      console.log(response.data)
      return response.data
    });
}

export default { 
  getAll: getAll, 
  create: create,
  deletePersonRequest: deletePersonRequest,
  update, update
}