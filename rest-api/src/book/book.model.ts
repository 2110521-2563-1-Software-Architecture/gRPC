import { prop, mongoose } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class Book {
  @ApiProperty()
  @prop({ required: true, unique: true })
  id: string;

  @ApiProperty()
  @prop({ required: true })
  title: string;

  @ApiProperty()
  @prop({ required: true })
  author: string;
}
