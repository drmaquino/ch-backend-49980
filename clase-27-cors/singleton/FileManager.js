import fs from 'fs'

export class FileManager {

  constructor() {
    console.log('construyendo un manager')
    this.elements = []
  }

  read() {
    return this.elements
  }

  write(element) {
    this.elements.push(element)
  }
}

// // Singleton ----------------
// static instance
// static getInstance() {
//   if (!MemoryManager.instance) {
//     MemoryManager.instance = new MemoryManager()
//   }
//   return MemoryManager.instance
// }
// // --------------------------