import axios, { AxiosTransformer } from '@/index'
import qs from 'qs'

// axios.defaults.headers.common['test2'] = 123

/**
 * post FromData
 */
// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({ msg: 'say hello!' }),
//   headers: {
//     test: '321'
//   }
// }).then(res => {
//   console.log(res.data)
// })

/**
 * axios 拦截器
 * 
 * 对数据的请求和响应进行拦截
 */
axios({
  transformRequest: [
    (function (data) {
      return qs.stringify(data)
    }),
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function (data) {
      if (typeof data === 'object') {
        data.response_add = 'transformResponse 1'
      }
      return data
    }
  ],
  url: '/config/post',
  method: 'post',
  data: {
    num: 1
  }
}).then(res => {
  console.log(res.data)
})

/**
 * axios.create
 * 通过 axios.create 静态方法创建实例发送请求
 */
const instance = axios.create({
  transformRequest: [
    (function (data) {
      return qs.stringify(data)
    }),
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function (data) {
      if (typeof data === 'object') {
        data.response_add = 'transformResponse 2'
      }
      return data
    }
  ]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    char: 'AxiosStatic'
  }
}).then(res => {
  console.log(res.data)
})