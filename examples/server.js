const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multipart = require('connect-multiparty')
const uuid = require('uuid/v4')
const atob = require('atob')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WabpackConfig = require('./webpack.config')

require('./server2') // 运行 server2 服务

const app = express()
const compiler = webpack(WabpackConfig)

app
  .use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__',
    stats: {
      colors: true,
      chunks: false
    }
  }))

  .use(webpackHotMiddleware(compiler))

  .use(express.static(__dirname, {
    setHeaders(res) { // 向客户端种 cookie
      res.cookie('XSRF-TOKEN-D', 'uuid_' + uuid())
    }
  }))

  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

  .use(cookieParser())

  .use(multipart({
    uploadDir: path.resolve(__dirname, 'upload-file')
  }))

const router = express.Router()

router
  .get('/simple/get', (req, res) => {
    res.json({ msg: 'hello world!!!', success: true })
  })
  .get('/base/get', (req, res) => {
    res.json(req.query)
  })

  .post('/base/post', (req, res) => {
    res.json(req.body)
  })
  .post('/base/buffer', (req, res) => {
    let msg = []
    req.on('data', chunk => {
      if (chunk) msg.push(chunk)
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })

  .get('/error/get', (req, res) => {
    if (Math.random() > 0.5) {
      res.json({ success: true })
    } else {
      res.status(500)
      res.end()
    }
  })
  .get('/error/timeout', (req, res) => {
    setTimeout(() => {
      res.json({ msg: 'timeout ok', success: true })
    }, 3000)
  })

  .get('/extend/get', (req, res) => {
    res.json({ msg: 'extend get ok', success: true })
  })
  .options('/extend/options', (req, res) => {
    res.end()
  })
  .delete('/extend/delete', (req, res) => {
    res.end()
  })
  .head('/extend/head', (req, res) => {
    res.end()
  })

  .post('/extend/post', (req, res) => {
    res.json(req.body)
  })
  .put('/extend/put', (req, res) => {
    res.json(req.body)
  })
  .patch('/extend/patch', (req, res) => {
    res.json(req.body)
  })

  .get('/extend/user', (req, res) => {
    res.json({
      msg: 'ok',
      success: true,
      result: {
        name: 'roy',
        age: 18
      }
    })
  })

  .get('/interceptor/get', (req, res) => {
    res.end('number value: ')
  })

  .post('/config/post', (req, res) => {
    res.json(req.body)
  })

  .get('/cancel/get', (req, res) => {
    setTimeout(() => {
      res.json({ say: 'hello!!!' })
    }, 1000);
  })
  .post('/cancel/post', (req, res) => {
    setTimeout(() => {
      res.json(req.body)
    }, 1000);
  })

  .get('/more/get', (req, res) => {
    res.json(req.cookies)
  })
  // 上传文件
  .post('/more/upload', (req, res) => {
    console.log(req.body, req.files)
    res.end('upload success')
  })
  // auth 鉴权
  .post('/more/post', (req, res) => {
    const auth = req.headers.authorization
    const [type, credentials] = auth.split(' ')
    console.log('auth data: ', atob(credentials))
    const [username, password] = atob(credentials).split(':')
    if (type === 'Basic' && username === 'Yee' && password === 'eeY') {
      res.json(req.body)
    } else {
      res.status(401)
      res.end('UnAuthorization')
    }
  })
  .get('/more/304', (req, res) => {
    res.status(304)
    res.end()
  })

  .get('/more/A',(req,res)=>{
    res.end("A")
  })
  .get('/more/B',(req,res)=>{
    res.end("B")
  })

app.use(router)

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
  console.log('\u001b[36m' + `Server listening on http://localhost:${port}
    Ctrl+c to stop` + '\u001b[39m')
})