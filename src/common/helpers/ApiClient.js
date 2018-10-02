import superagent from 'superagent'
import config from '../../config'

const methods = ['get', 'post', 'put', 'patch', 'delete']

function formatUrl(path, req) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path
  const isServer = !adjustedPath.indexOf('/server/') // check if /server/ is in path

  if (isServer) {
    const serverURL = req ? `${req.protocol}://${req.get('host')}` : ''

    return serverURL + adjustedPath.slice(7) // remove /server/ from path
  }
  const url = config.apiURL + adjustedPath

  return url
}

/*
* This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
* See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
*
* Remove it at your own risk.
*/

class ApiClient_ {
  constructor(req, res) {
    methods.forEach(
      method =>
        this[method] = (path, { params, data, token, file } = {}) =>
          new Promise((resolve, reject) => {
            const request = superagent[method](formatUrl(path, req))

            if (params) {
              request.query(params)
            }

            if (__SERVER__ && req.get('cookie')) {
              request.set('cookie', req.get('cookie'))
            }

            if (this.token || token) {
              const tokenData = this.token || token

              request.set('Authorization', `Bearer ${tokenData}`)
            }

            if (file && file.blob && file.name) {
              request.attach(file.name, file.blob)
            }

            if (data) {
              request.send(data)
            }

            request.timeout(10000)

            request.end((err, { body, statusCode, headers } = {}) => {
              if (headers && headers['set-cookie']) {
                try {
                  res.set('Set-Cookie', headers['set-cookie'])
                } catch (e) {
                  console.error('failed to write cookie')
                }
              }
              if (body) {
                body.statusCode = statusCode
              }
              return err ? reject(body || err) : resolve(body)
            })
          })
    )
  }
}

const ApiClient = ApiClient_

export default ApiClient
