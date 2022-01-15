import axios from 'axios'

const API_URL = 'https://navedex-api.herokuapp.com/v1'

const Api = axios.create({
  baseURL: API_URL
})

export default Api