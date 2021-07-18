import axios, { AxiosError } from '@/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import qs from 'qs'

document.cookie = 'a=b'

/**
 * 访问当前服务器，不跨域，默认携带 cookie
 */
axios.get('/more/get')
  .then(res => {
    console.log(res)
  })

/**
 * 访问 8088 server2 服务器，跨域，需要设置 withCredentials 为 true。才能携带 cookie
 */
axios.post('http://127.0.0.1:8088/more/server2', {}, { withCredentials: true })
  .then(res => {
    console.log(res)
  })

/**
 * 创建一个防止跨站点(XSRF)攻击的实例
 * 设置其 cookie 名为 XSRF-TOKEN-D
 * 设置其 header 名为 X-XSRF-TOKEN-D
 */
const instance_auth = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance_auth.get('/more/get').then(res => {
  console.log(res)
})

/**
 * =======================
 * 下面是上传下载实例
 * =======================
 */
const instance = axios.create()

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  // 设置开始进程
  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }
  // 设置上传下载进度
  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }
  // 设置结束进程
  const setupStopProgress = () => {
    instance.interceptors.response.use(response => {
      NProgress.done()
      return response
    }, error => {
      NProgress.done()
      return Promise.reject(error)
    })
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')

downloadEl!.addEventListener('click', e => {
  instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
    .then(res => {
      // console.log(res)
      document.getElementById('download-img').setAttribute('src', res.request.responseURL)
    })
})

const uploadEl = document.getElementById('upload')

uploadEl!.addEventListener('click', e => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement

  if (fileEl.files) {
    data.append('file', fileEl.files[0])

    instance.post('/more/upload', data)
  }
})

/**
 * post 添加 auth 鉴权
 */

axios.post('/more/post',
  { say: 'this is a auth api' },
  {
    auth: {
      username: 'Yee',
      password: 'eeY'
    }
  }
).then(res => {
  console.log(res.data)
})

/**
 * 状态码规则验证
 */
axios.get('/more/304').then(res => { // error
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})

axios.get('/more/304', { // right
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})

axios.get('/more/get', {
  params: new URLSearchParams('a=b&c=d')
}).then(res => {
  console.log(res)
})

axios.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
})

const instance_paramsSerializer = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

instance_paramsSerializer.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
})

/**
 * aioxs.create 统一设置 baseURL
 */
const instance_baseURL = axios.create({
  baseURL: 'https://img.mukewang.com/'
})

instance_baseURL.get('5cc01a7b0001a33718720632.jpg')

instance_baseURL.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')


/**
 * 并发请求 axios
 */

function getA() {
  return axios.get('/more/A')
}
function getB() {
  return axios.get('/more/B')
}
axios.all([getA(), getB()])
  .then(axios.spread(function (resA, resB) {
    console.log(resA.data)
    console.log(resB.data)
  }))

axios.all([getA(), getB()])
  .then(([resA, resB]) => {
    console.log(resA.data)
    console.log(resB.data)
  })

const fakeConfig = {
  baseURL: 'https//www.baidu.com',
  url: '/user/123456',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))