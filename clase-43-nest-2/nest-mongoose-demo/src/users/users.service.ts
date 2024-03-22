import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Model } from 'mongoose'
import { User, UsersDocument } from './schema/user.schema.js'
import { InjectModel } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'
import { randomUUID } from 'crypto'

const DEFAULT_USERS_ORDER = 'nombre'

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<UsersDocument>,
    private readonly configService: ConfigService
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.usersModel.create({
      _id: randomUUID(),
      ...createUserDto
    })
  }

  findAll() {
    const field = this.configService.get('USERS_ORDER', DEFAULT_USERS_ORDER)
    return this.usersModel
      .find()
      .sort({
        [field]: 1
      })
  }

  findOne(id: string) {
    return this.usersModel.findById(id)
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersModel.findByIdAndUpdate(id, updateUserDto)
  }

  remove(id: string) {
    return this.usersModel.findByIdAndDelete(id)
  }
}
