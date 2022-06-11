import Oaxios from 'axios'
import { BACKEND_URL } from 'config'

const axios = Oaxios.create({
  baseURL: BACKEND_URL,
})

export default axios
