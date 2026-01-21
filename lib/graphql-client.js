const path = require('node:path')
const got = require('got')

const TIMEOUT = 30000

const tlsOptions = (() => {
  const conf = (() => {
    /* TODO: Sort of duplicated code from `brain.js`. */
    const conf = require('./configuration').loadConfig({})
    const dataPath = path.resolve(__dirname, '..', conf.brain.dataPath)
    const resolve = file => path.resolve(dataPath, file)

    return {
      certPath: {
        cert: resolve('client.pem'),
        key: resolve('client.key')
      },
      connectionInfoPath: resolve('connection_info.json')
    }
  })()

  const pairing = require('./pairing')
  const cert = pairing.getCert(conf.certPath)
  const connInfo = pairing.connectionInfo(conf.connectionInfoPath)

  return {
    cert: cert.cert,
    key: cert.key,
    ca: connInfo.ca,
    rejectUnauthorized: true
  }
})()

const makeQueryString = params =>
  Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')

const GraphQLClient = (host, port, params) => {
  const url = `https://${host}:${port}/graphql?${makeQueryString(params)}`

  return {
    query: (query, variables = {}) => {
      return got.post(url, {
        ...tlsOptions,
        timeout: TIMEOUT,
        headers: {
          'Content-Type': 'application/json',
          'Date': new Date().toISOString()
        },
        body: { query, variables },
        json: true
      })
        .then(res => {
          if (res.body.errors) {
            return { error: res.body.errors[0], data: null }
          }
          return { data: res.body.data, error: null }
        })
    }
  }
}

module.exports = { GraphQLClient }
