const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())

const router = express.Router()

const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

router
  .post('/more/server2', (req, res) => {
    res.set(cors)
    res.json(req.cookies)
  })
  .get('/more/server2', (req, res) => {
    res.set(cors)
    res.end('此服务支持跨域请求，支持跨域携带 cookies')
  })

app.use(router)

const port = 8088

module.exports = app.listen(port, () => {
  console.log('\u001b[36m' + `Server listening on http://localhost:${port}
    Ctrl+c to stop` + '\u001b[39m')
})