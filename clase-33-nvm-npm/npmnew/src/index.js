import chalk from 'chalk'

export function info(message) {
  console.log(chalk.greenBright(message))
}

export function warn(message) {
  console.log(chalk.yellowBright(message))
}

export function error(message) {
  console.log(chalk.redBright(message))
}

if (process.argv.slice(2)[0] === 'test') {
  info('info')
  warn('warn')
  error('error')
}