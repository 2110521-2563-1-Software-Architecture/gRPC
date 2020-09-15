import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly service: BookService) {}

  @Get()
  findAll(@Query() query) {
    const filter = {};
    if (query.title) {
      filter['title'] = { $regex: query.title, $options: 'i' };
    }
    if (query.author) {
      filter['author'] = { $regex: query.author, $options: 'i' };
    }
    return this.service.find(filter);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  createBook(@Body() dto: Book) {
    return this.service.createBook(dto);
  }

  @Post('multiple')
  createMultipleBooks(@Body() books: Book[]) {
    return this.service.createMultipleBooks(books);
  }

  // @Patch(':id')
  // patchBook(@Param('id') bookId: string, @Body() dto: Partial<Book>) {
  //     return this.service.updateBook(bookId, dto)
  // }

  @Put(':id')
  putBook(@Param('id') bookId: string, @Body() dto: Book) {
    return this.service.updateBook(bookId, dto);
  }

  @Delete(':id')
  deleteBook(@Param('id') bookId: string) {
    return this.service.deleteBook(bookId);
  }

  // TODO 
  // @Delete('all')
  // deleteBooks(@Query() query) {
  //   console.log(query)
  //   return this.service.deleteBooks();
  // }
}
