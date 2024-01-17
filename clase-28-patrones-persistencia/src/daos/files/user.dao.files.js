import fs from 'fs/promises'

const ruta = './db/users.json'

export const usersFilesDao = {
  guardar: async function (obj) {
    const lines = await fs.readFile(ruta, 'utf-8')
    const users = JSON.parse(lines)
    users.push(obj)
    await fs.writeFile(ruta, JSON.stringify(users, null, 2))
    return obj
  }
}
