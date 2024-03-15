import supertest from 'supertest'
import { cerrarServidor, levantarServidor } from '../../src/app/app.js'
import { connectDb, disconnectDb } from '../../src/database/mongodb.js'
import { expect } from 'chai'

const mockCreateUserData = {
  username: 'maquino',
  password: 'abc123',
  email: 'maria@nito.com',
  displayName: 'marianito'
}

const mockInvalidCreateUserData = {
  username: 'maquino',
  // password: 'abc123',
  // email: 'maria@nito.com',
  displayName: 'marianito'
}

const TEST_PORT = 9000

const baseUrl = `http://localhost:${TEST_PORT}`

const httpClient = supertest(baseUrl)

describe('/api/users', function () {

  this.timeout(100_000)

  before(async () => {
    await connectDb()
    await levantarServidor(TEST_PORT)
  })

  after(async () => {
    await cerrarServidor()
    await disconnectDb()
  })

  describe('POST /', () => {
    describe('con datos validos', () => {
      it('crea un usuario y devuelve 201', async () => {
        const { body } = await httpClient
          .post('/api/users')
          .send(mockCreateUserData)
          .expect(201)

        const user = body.payload
        expect(user).not.be.undefined
        expect(user._id).not.be.undefined
      })

    })
    describe('con datos invalidos', () => {
      it('devuelve 400', async () => {
        const { body } = await httpClient
          .post('/api/users')
          .send(mockInvalidCreateUserData)
      })
    })

  })

  describe('GET /current', () => {
    it('devuelve al usuario logueado sin contraseña', async () => {

      const { body: createdUser } = await httpClient
        .post('/api/users')
        .send(mockCreateUserData)

      const { body: currentUser } = await httpClient
        .get('/api/users/current')

      expect(currentUser).not.to.be.undefined
      expect(currentUser.username).to.equal(createdUser.username)
      expect(currentUser.password).to.be.undefined
    })

  })

})