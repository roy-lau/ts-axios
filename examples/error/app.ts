import axios, { AxiosError } from '@/index'

/**
 * get -- url 错误
 */
axios({
  method: 'get',
  url: '/error/get1'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})

/**
 * get -- 50% 几率发生错误
 */
axios({
  method: 'get',
  url: '/error/get'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})

/**
 * get -- 模拟网络错误
 */
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.error(err)
  })
}, 5000)

/**
 * get -- 超时
 */
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.error(err.message)
  console.error(err.config)
  console.error(err.code)
  console.error(err.request)
  console.error(err.isAxiosError)
})

