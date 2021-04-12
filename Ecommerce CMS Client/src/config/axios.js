import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ecommerce-nyoman.herokuapp.com'
})

export default instance
