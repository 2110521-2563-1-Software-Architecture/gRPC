import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Book } from './book.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: Book,
        schemaOptions: { timestamps: true },
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
