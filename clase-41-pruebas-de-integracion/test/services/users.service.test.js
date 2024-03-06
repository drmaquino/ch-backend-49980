import assert from 'node:assert/strict'

import { UsersService } from '../../src/services/users.service.js'
import { FakeEmailService } from '../../src/services/email/email.service.fake.js'
import { UsersRepository } from '../../src/repositories/users.repository.js'
import { DaoMemory } from '../../src/daos/memory/users.dao.memory.js'

import { expect, should, use } from 'chai'


const emailService = new FakeEmailService()

const usersRepository = new UsersRepository({
  usersDao: new DaoMemory()
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

  describe('Users Service', () => {
    describe('register', () => {
      describe('con datos válidos', () => {

        before(() => {
          // importante! usar funcion comun! no flecha!
          emailService.done = function (emailOptions) {
            // este this es el emailService,
            // al momento de ejecutarse el send!
            this['emailOptions'] = emailOptions
            // le agrego un campo que antes no tenía
            // para dsp chequearlo en el test :-)
          }
        })

        after(() => {
          // dsp de la prueba borro las modificaciones que le hice
          delete emailService['emailOptions']
        })

        it('crear un usuario con un nuevo id ', async () => {
          const user = await usersService.register(mockUserData)
          expect(user._id).to.be.ok
        })

        it('guardar al usuario en persistencia', async () => {
          const user = await usersService.register(mockUserData)
          const encontrado = await usersRepository.findOne({ _id: user._id })
          expect(encontrado).not.to.be.null
        })

        it('enviar un mail al usuario', async () => {
          const user = await usersService.register(mockUserData)
          assert.equal(emailService['emailOptions']?.to, mockUserData.email)
        })

        it('hashear la contraseña', async () => {
          const user = await usersService.register(mockUserData)
          assert.notEqual(user.password, mockUserData.password)
        })
      })
    })
  })
})