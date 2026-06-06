const assert = require('node:assert/strict')
const Module = require('node:module')
const test = require('node:test')

function loadServerWithMocks() {
  const originalLoad = Module._load
  let capturedCorsOptions

  const app = {
    get() {},
    listen() {},
    use() {},
  }

  function express() {
    return app
  }

  express.json = () => (_req, _res, next) => next?.()
  express.urlencoded = () => (_req, _res, next) => next?.()

  Module._load = function mockLoad(request, parent, isMain) {
    if (request === 'express') {
      return express
    }

    if (request === 'cors') {
      return (options) => {
        capturedCorsOptions = options
        return (_req, _res, next) => next?.()
      }
    }

    if (
      request === './config/db' ||
      request === './routes/userRoutes' ||
      request === './routes/articleRoutes'
    ) {
      return (_req, _res, next) => next?.()
    }

    return originalLoad.call(this, request, parent, isMain)
  }

  delete require.cache[require.resolve('../index')]
  require('../index')
  Module._load = originalLoad

  return capturedCorsOptions
}

test('allows the deployed client origin through CORS', () => {
  const options = loadServerWithMocks()

  assert.equal(typeof options.origin, 'function')

  options.origin('https://bitago-client.vercel.app', (error, allowed) => {
    assert.ifError(error)
    assert.equal(allowed, true)
  })
})

test('rejects unconfigured browser origins through CORS', () => {
  const options = loadServerWithMocks()

  assert.equal(typeof options.origin, 'function')

  options.origin('https://unexpected.example.com', (error, allowed) => {
    assert.equal(allowed, false)
    assert.match(error.message, /not allowed by CORS/)
  })
})
