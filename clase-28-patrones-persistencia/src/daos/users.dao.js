const MODO = process.env.MODO || 'offine'

let usersDao

if (MODO === 'online') {
  const { usersMongooseDao } = await import('./mongoose/user.dao.mongoose.js')
  usersDao = usersMongooseDao
} else {
  const { usersFilesDao } = await import('./files/user.dao.files.js')
  usersDao = usersFilesDao
}

export { usersDao }