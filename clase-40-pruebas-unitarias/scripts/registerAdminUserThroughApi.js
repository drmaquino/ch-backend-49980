const userData = {
  username: 'admin',
  password: 'admin',
  displayName: 'admin',
  email: 'admin@admin.com',
  rol: 'admin'
}

const result = await fetch('http://localhost:8080/api/users', {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userData)
})

console.log(result.status)

export { }