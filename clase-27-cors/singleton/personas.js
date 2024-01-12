import { MemoryManager } from './MemoryManager.js'

const personas = MemoryManager.getInstance()

console.log(personas.read())