import { randomUUID, randomInt } from 'node:crypto'

export function generateRandomNumber() {
  return Number(`${Date.now()}${randomInt(1000, 9999)}`)
}

export function generateUUID() {
  return `${randomUUID()}`
}