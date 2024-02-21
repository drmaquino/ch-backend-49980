import 'dotenv/config'

export const MODE = process.env.MODE ?? 'development'
export const PORT = process.env.PORT ?? 8080
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR ?? 'mongodb://localhost/coderhouse'
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
export const COOKIE_SECRET = process.env.COOKIE_SECRET
export const EMAIL_USER = process.env.EMAIL_USER ?? 'marian@profe.com'
export const EMAIL_PASS = process.env.EMAIL_PASS ?? 'abc123'
