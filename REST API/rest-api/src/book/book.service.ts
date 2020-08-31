import { Injectable } from '@nestjs/common';
import { Book } from './book.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book)
        private readonly model: ReturnModelType<typeof Book>,
    ) {}

    find(filter?: any): Promise<Book[]> {
        return this.model.find(filter).exec();
    }

    findById(id: string): Promise<Book> {
        return this.model.findById(id).exec();
    }

    createBook(dto: Book): Promise<Book> {
        const book = new this.model(dto);
        return book.save();
    }

    updateBook(id: string, dto: Partial<Book>): Promise<Book> {
        return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    deleteBook(id: string): Promise<Book> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
