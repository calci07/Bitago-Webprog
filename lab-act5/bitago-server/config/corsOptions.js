const defaultAllowedOrigins = [
  'https://bitago-client.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]

function parseAllowedOrigins(value) {
  if (!value) {
    return defaultAllowedOrigins
  }

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

const allowedOrigins = new Set(parseAllowedOrigins(process.env.CORS_ORIGINS))

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true)
      return
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS.`), false)
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}

module.exports = {
  corsOptions,
  parseAllowedOrigins,
}
