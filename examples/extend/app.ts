import axios from '@/index'

/**
 * axios 函数 post 请求
 */
axios({
  method: 'post',
  url: '/extend/post',
  data: { say: 'hi' }
})

/**
 * axios.request 函数 post 请求
 */
axios.request({
  method: 'post',
  url: '/extend/post',
  data: { say: 'hello' }
})

/**
 * axios.request 函数 post 请求（url 独立出来）
 */
axios.request('/extend/post', {
  method: 'post',
  data: { say: 'hello1' }
})

axios.get('/extend/get')
axios.options('/extend/options')
axios.head('/extend/head')
axios.delete('/extend/delete')

axios.post('/extend/post', { msg: "post" })
axios.put('/extend/put', { msg: "put" })
axios.patch('/extend/patch', { msg: "patch" })

/**
 * 下面是对响应数据类型推断的示例
 */

interface ResponseData<T = any> {
  msg: string
  success: boolean
  result: T
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}

async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result)
  }
}
test()