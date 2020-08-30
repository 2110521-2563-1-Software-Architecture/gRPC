import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('book')
export class BookController {
    constructor(private readonly service: BookService){}

    @Get()
    findAll() {
        return this.service.find();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.service.findById(id);
    }

    @Post()
    createBook(@Body() dto: Book) {
        return this.service.createBook(dto);
    }
}
