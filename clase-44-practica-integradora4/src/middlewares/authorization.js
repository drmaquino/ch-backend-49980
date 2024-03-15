const listOfRolesForAdminContent = ['admin']

const listOfRolesForUserContent = ['user', 'admin']

export async function authorizeUsersOnly(req, res, next) {
  if (!listOfRolesForUserContent.includes(req.user['rol'])) {
    return next(new Error('not authorized'))
  }
  next()
}

export async function adminsOnly(req, res, next) {
  if (!listOfRolesForAdminContent.includes(req.user['rol'])) {
    return next(new Error('not authorized'))
  }
  next()
}
