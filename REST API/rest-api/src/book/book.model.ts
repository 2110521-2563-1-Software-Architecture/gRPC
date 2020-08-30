import { prop, mongoose } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class Book {
  _id?: mongoose.Types.ObjectId;

  @ApiProperty()
  @prop({ required: true })
  title: string;

  @ApiProperty()
  @prop({required: true })
  author: string;
}
