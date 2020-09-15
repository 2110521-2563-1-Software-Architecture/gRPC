import { BadRequestException, Injectable } from '@nestjs/common';
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

  async createBook(dto: Book): Promise<Book> {
    const existed: boolean = await this.model.exists({ id: dto.id });
    if (existed) {
      throw new BadRequestException(`Book id ${dto.id} already existed`);
    }
    const book = new this.model(dto);
    return book.save();
  }

  async createMultipleBooks(books: Book[]): Promise<void> {
    const session = await this.model.db.startSession();
    session.startTransaction();
    try {
      books.forEach(book => this.createBook(book));
    } catch (e) {
      await session.abortTransaction();
      throw e;
    }
    await session.commitTransaction();
  }

  updateBook(id: string, dto: Partial<Book>): Promise<Book> {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  deleteBook(id: string): Promise<Book> {
    return this.model.findByIdAndDelete(id).exec();
  }

  deleteBooks() {
    this.model.deleteMany({ id: { $gte: 0 } }, function(err) {
      console.log(err);
    });
  }
}
