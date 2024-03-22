import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

@Schema()
export class User {

  @Prop({ required: true })
  _id: string

  @Prop({ required: true })
  nombre: string

  @Prop({ required: true })
  apellido: string

  @Prop({ required: true, unique: true })
  email: string
}

export type UsersDocument = HydratedDocument<User>

export const UserSchema = SchemaFactory.createForClass(User)