import { randomUUID } from 'crypto'

export class Id extends String {
  constructor() {
    super(randomUUID())
  }
}