import 'dotenv/config'

export const NODE_ENV = process.env.NODE_ENV ?? 'development'
export const PORT = process.env.PORT ?? 8080
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR ?? 'mongodb://localhost/coderhouse'
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY ?? '123'
export const COOKIE_SECRET = process.env.COOKIE_SECRET ?? '123'
export const EMAIL_USER = process.env.EMAIL_USER ?? 'marian@profe.com'
export const EMAIL_PASS = process.env.EMAIL_PASS ?? 'abc123'
