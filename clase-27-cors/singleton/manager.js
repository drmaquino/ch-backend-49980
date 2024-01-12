import { MemoryManager } from './MemoryManager.js'

let instance

// MODO viene de config.js

switch (MODO) {
  case 'prod': instance = new FileManager(); break
  case 'dev': instance = new MemoryManager(); break
}
export { instance }

