import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  //const config = {
  //  headers: { Authorization: token },
  //}
  //const request = axios.get(baseUrl, config)
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('blogService.create newObject:', newObject)
  console.log('blogService.create config:', config)
  const response = await axios.post(baseUrl, newObject, config)
  //const response = await axios.post(baseUrl, newObject)
  console.log('blogService.create response:', response)
  return response.data
}

const update = async (id, newObject) => {
  console.log('blogService.updateBlog id:', id)
  console.log('blogService.updateBlog newObject:', newObject)
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  console.log('blogService.removeBlog id:', id)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

export default { getAll, create, update, remove, setToken }