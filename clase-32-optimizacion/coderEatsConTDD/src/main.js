import { app } from './app/app.js'
import { MODE, PORT } from './config/config.js'

console.log('ejecución en modo: ' + MODE)

app.listen(PORT, () => { console.log(`servidor escuchando en puerto ${PORT}`) })
