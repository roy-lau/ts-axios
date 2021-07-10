import axios from '@/index'

/**
 * get -- 数组请求
 */
axios({
  method: 'get',
  url: '/base/get',
  params: {
    list: ['bar', 'baz']
  }
}).then(res => {
  console.log(res)
})

/**
 * get -- 对象请求
 */
axios({
  method: 'get',
  url: '/base/get',
  params: {
    parent: {
      child: 'trump'
    }
  }
}).then(res => {
  console.log(res)
})

const date = new Date()

/**
 * get -- 日期请求
 */
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
}).then(res => {
  console.log(res)
})

/**
 * get -- 特殊字符
 */
axios({
  method: 'get',
  url: '/base/get',
  params: {
    char: '@:$,+[] '
  }
}).then(res => {
  console.log(res)
})

/**
 * get -- 空值 null
 */
axios({
  method: 'get',
  url: '/base/get',
  params: {
    name: 'roy',
    sex: null
  }
}).then(res => {
  console.log(res)
})

/**
 * get -- 带 hash 的情况，去掉 hash
 */
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    name: 'roy'
  }
}).then(res => {
  console.log(res)
})

/**
 * get -- url 上已经有参数的情况
 */
axios({
  method: 'get',
  url: '/base/get?name=roy',
  params: {
    age: 18
  }
}).then(res => {
  console.log(res)
})

/**
 * post -- 对象
 */
axios({
  method: 'post',
  url: '/base/post',
  data: {
    name: 'roy',
    age: 18
  }
}).then(res => {
  console.log(res)
})

/**
 * post -- 定型数组
 */
const arr = new Int32Array([21, 31])
axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
}).then(res => {
  console.log(res)
})


/**
 * post 不带 header -- 对象
 * ts-axios 检测到 data 是对象，
 * 将会自动设置 header 的 'content-type' 为 'application/json; charset=utf-8',
 */

axios({
  method: 'post',
  url: '/base/post',
  data: {
    name: 'roy',
    age: 18
  }
}).then(res => {
  console.log(res)
})


/**
 * post 带 header -- 对象
 */

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  },
  data: {
    name: 'roy',
    age: 18
  }
}).then(res => {
  console.log(res)
})

/**
 * post 不带 header -- URLSearchParams
 * 
 * 如果 post data 发送的是 URLSearchParams，
 * 浏览器会自动设置 header 的 Content-Type 为 application/x-www-form-urlencoded;charset=UTF-8
 * 并转化 data 为 fromData
 */

const paramsString = 'q=URLUtils.seachParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
}).then(res => {
  console.log(res)
})



/**
 * post 设置 responseType
 */

 axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    name: 'roy',
    age: 18
  }
}).then(res => {
  console.log(res)
})