import { PORT } from './config/config.js'
import { app } from './app/app.js'

app.listen(PORT, () => { console.log(`escuchando en puerto ${PORT}`) })