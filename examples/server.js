const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WabpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WabpackConfig)

app
  .use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  }))

  .use(webpackHotMiddleware(compiler))

  .use(express.static(__dirname))

  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

router.get('/simple/get/', (req, res) => {
  res.json({
    msg: 'hello world!!!'
  })
})

app.use(router)

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
  console.log('\u001b[36m' + `Server listening on http://localhost:${port}
    Ctrl+c to stop` + '\u001b[39m')
})