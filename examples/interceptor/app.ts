import axios from '@/index'

axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})

let interceptors = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})

axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptors) // 取消第二个拦截响应

axios({
  url: "/interceptor/get",
  method: "get",
  headers: {
    test: ''
  }
}).then(res => {
  console.log(res.data)
})