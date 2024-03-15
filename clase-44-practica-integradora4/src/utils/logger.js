import { NODE_ENV } from '../config/config.js'

import winston from 'winston'

const devConfig = {
  transports: [
    new winston.transports.Console({
      level: "debug",
    })
  ]
}

const testConfig = {
  transports: [
    new winston.transports.File({
      level: "error",
      filename: 'errors.test.log'
    })
  ]
}

const prodConfig = {
  transports: [
    new winston.transports.File({
      level: "http",
      filename: 'events.log'
    })
  ]
}

export const logger = winston.createLogger(
  NODE_ENV === 'production'
    ? prodConfig
    : NODE_ENV === 'testing'
      ? testConfig
      : devConfig
)
