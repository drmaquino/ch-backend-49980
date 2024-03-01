import 'dotenv/config'

export const MODE = process.env.MODE ?? 'development'
export const PORT = process.env.PORT ?? 8080
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR ?? 'mongodb://localhost/coderhouse'
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY ?? '123'
export const COOKIE_SECRET = process.env.COOKIE_SECRET ?? '123'

const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

export const EMAIL_CONFIG_GMAIL = {
  service: 'gmail',
  port: 587,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
}

export const EMAIL_CONFIG_ETHEREAL = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.FAKE_EMAIL_USER,
    pass: process.env.FAKE_EMAIL_PASS
  }
}
