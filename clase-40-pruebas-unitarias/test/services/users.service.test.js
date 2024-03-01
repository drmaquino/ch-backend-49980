import { UsersService } from '../../src/services/users.service.js'
import { FakeEmailService } from '../../src/services/email/email.service.fake.js'
import { UsersRepository } from '../../src/repositories/users.repository.js'
import { connectDb, disconnectDb } from '../../src/database/mongodb.js'
import { DaoMemory } from '../../src/daos/memory/users.dao.memory.js'
import { usersDaoMongoose } from '../../src/daos/mongoose/users.dao.mongoose.js'
import assert from 'node:assert/strict'

import { expect, should } from 'chai'


const emailService = new FakeEmailService()

const usersRepository = new UsersRepository({
  // usersDao: new DaoMemory()
  usersDao: usersDaoMongoose
})

const mockUserData = {
  username: 'marian',
  password: '123',
  email: 'marian@profe.com',
  displayName: 'profe marian'
}

const usersService = new UsersService({
  usersRepository,
  emailService
})

describe('Sistema', () => {

  before(async () => {
    await connectDb()
  })

  // beforeEach()

  // afterEach()

  after(async () => {
    await disconnectDb()
  })

  describe('Users Service', () => {
    describe('register', () => {
      describe('con datos válidos', () => {
        it('crear un usuario con un nuevo id ', async () => {
          const user = await usersService.register(mockUserData)
          // assert.ok(user._id)
          expect(user._id).to.be.ok
        })

        it('guardar al usuario en persistencia', async () => {
          const user = await usersService.register(mockUserData)
          const encontrado = await usersDaoMongoose.readOne({ _id: user._id })
          expect(encontrado).not.to.be.null
        })

        it('enviar un mail al usuario', async () => {
          // aca va la prueba
        })

        it('hashear la contraseña', async () => {
          const user = await usersService.register(mockUserData)
          assert.notEqual(user.password, mockUserData.password)
        })
      })
    })
  })
})