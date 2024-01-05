import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()
program
  .option('-p, --prod', 'entorno de ejecucion', false)
  .parse()

const { prod } = program.opts()

dotenv.config({
  path: prod ? './src/config/prod.env' : './src/config/dev.env'
})

export const PORT = process.env.PORT
export const MODE = process.env.MODE
export const CNX_STR = process.env.CNX_STR
