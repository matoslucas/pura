import Express from 'express'
import config from './config'
import favicon from 'serve-favicon'
import compression from 'compression'
import httpProxy from 'http-proxy'
import path from 'path'
import http from 'http'
import open from 'open'
import basicAuth from 'basic-auth'
import sslRedirect from 'heroku-ssl-redirect'

/*
 * Views
 */
import mainView from './main'

const targetUrl = `http://${config.apiHost}:${config.apiPort}`
const app = new Express()
const server = new http.Server(app)
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: false,
})

app.use(sslRedirect([
  'production',
]))
app.use(compression())
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))

app.use(Express.static(path.join(__dirname, '..', 'static')))

const auth = (req, res, next) => {
  const user = basicAuth(req)

  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    res.sendStatus(401)
  }
  if (user.name === 'strv' && user.pass === 'ui') {
    return next()
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    res.sendStatus(401)
  }
}

app.get('/ui/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/static/dist/ui/build/bundle.js'))
})

app.get('/ui', auth, (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/static/dist/ui/index.html'))
})

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl })
})

proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error)
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' })
  }

  const json = { error: 'proxy_error', reason: error.message }

  res.end(JSON.stringify(json))
})

app.use('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/admin', 'index.html'))
})

app.use(mainView)

if (config.port) {
  server.listen(config.port, err => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort)
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port)
    if (config.openBrowserAfterBuild) {
      setTimeout(() => open('http://localhost:3000'), 2000)
    }
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}
