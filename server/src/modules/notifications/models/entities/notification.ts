import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type NotificationDocument = Notification & Document

@Schema({
  autoIndex: true,
  timestamps: true
})
export class Notification {
  @Prop({ required: true })
  content: string

  @Prop()
  recipient_id: string

  @Prop()
  read: boolean
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)
