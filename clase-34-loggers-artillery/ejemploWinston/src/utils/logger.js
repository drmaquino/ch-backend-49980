import { NODE_ENV } from '../config/server.config.js'

import winston from 'winston'

// const levels = {
//     fatal: 0,
//     error: 1,
//     warning: 2,
//     info: 3,
//     debug: 4,
// }

const winstonLoggerDev = winston.createLogger({
  // levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
    })
  ]
})

const winstonLoggerProd = winston.createLogger({
  // levels,
  transports: [
    new winston.transports.File({
      level: "http",
      filename: 'events.log'
    })
  ]
})

export let logger
if (NODE_ENV === 'production') {
  logger = winstonLoggerProd
} else {
  logger = winstonLoggerDev
}