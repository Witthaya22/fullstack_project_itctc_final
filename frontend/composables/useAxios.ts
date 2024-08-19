import axios from "axios"

export default () => {
  const http = axios.create({
    baseURL: 'http://localhost:3000',
    headers: useRequestHeaders(['cookie'])
  })
  return http
}

