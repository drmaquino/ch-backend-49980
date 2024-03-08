import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity.js'

@Injectable()
export class UserService {
  private users: User[]

  constructor() {
    this.users = []
  }

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto)
    this.users.push(user)
    return user.toPojo()
  }

  findAll() {
    return this.users.map(u => u.toPojo())
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
